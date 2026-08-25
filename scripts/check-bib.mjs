/* Guards the publication pipeline: the custom BibTeX fields are the part that
   silently disappears if the parser is ever swapped. */
import { readFileSync, existsSync } from 'node:fs';
import { parse } from '@retorquere/bibtex-parser';
import path from 'node:path';

const BIB = 'src/data/publications.bib';
const EXPECT = { pdf: 19, arxiv: 17, selected: 3, html: 1, abstract: 26 };

const bib = parse(readFileSync(BIB, 'utf8'));
const problems = [];

const counts = Object.fromEntries(Object.keys(EXPECT).map((k) => [k, 0]));
for (const e of bib.entries) {
  const f = e.fields;
  for (const k of Object.keys(EXPECT)) if (f[k] != null) counts[k]++;

  if (f.file != null) problems.push(`${e.key}: 'file' field present — leaks a local path`);

  const title = String(f.title ?? '');
  if (!title) problems.push(`${e.key}: empty title`);
  if (/[{}]/.test(title)) problems.push(`${e.key}: unresolved braces in title`);
  if (/\\[a-zA-Z]/.test(title)) problems.push(`${e.key}: un-decoded LaTeX in title`);

  for (const a of f.author ?? []) {
    const fam = a.lastName ?? a.name ?? '';
    if (!fam) problems.push(`${e.key}: author with empty surname`);
    if (/[{}\\]/.test(fam)) problems.push(`${e.key}: unresolved markup in "${fam}"`);
    /* The parser emits NFD; the loader normalises. Asserted on built output below. */
  }

  if (f.pdf && !String(f.pdf).includes('://')) {
    const p = path.join('public/assets/pdf', String(f.pdf));
    if (!existsSync(p)) problems.push(`${e.key}: pdf not found — ${p}`);
  }
}

for (const [k, want] of Object.entries(EXPECT)) {
  if (counts[k] !== want) problems.push(`field '${k}': expected ${want}, got ${counts[k]}`);
}

/* End-to-end: the rendered pages must carry NFC, not decomposed, names.
   A stray combining mark renders fine but breaks search and string equality. */
if (existsSync('dist/publications/index.html')) {
  const html = readFileSync('dist/publications/index.html', 'utf8');
  const decomposed = html.match(/[a-zA-Z][\u0300-\u036f]/g);
  if (decomposed) {
    problems.push(
      `dist/publications: ${decomposed.length} decomposed (NFD) character(s) — loader must .normalize('NFC')`
    );
  } else {
    console.log('built publications page is NFC-normalised.');
  }
} else {
  console.log('(no dist/ yet — skipping the built-output NFC check)');
}

console.log(`${bib.entries.length} entries · ${JSON.stringify(counts)}`);
if (problems.length) {
  console.log(`\nPROBLEMS (${problems.length}):`);
  problems.forEach((p) => console.log('   !', p));
  process.exit(1);
}
console.log('bibliography OK.');
