/* Every root-relative href/src in the built site must resolve to a real file. */
import { readdirSync, readFileSync, existsSync, statSync } from 'node:fs';
import path from 'node:path';

const DIST = 'dist';
const CI_GENERATED = ['/assets/pdf/cv.pdf', '/assets/pdf/resume.pdf'];

const html = [];
(function walk(d) {
  for (const e of readdirSync(d, { withFileTypes: true })) {
    const p = path.join(d, e.name);
    if (e.isDirectory()) walk(p);
    else if (e.name.endsWith('.html')) html.push(p);
  }
})(DIST);

const resolves = (url) => {
  const clean = url.split('#')[0].split('?')[0];
  if (!clean || clean === '/') return existsSync(path.join(DIST, 'index.html'));
  const asFile = path.join(DIST, clean);
  if (existsSync(asFile) && statSync(asFile).isFile()) return true;
  return existsSync(path.join(asFile, 'index.html'));
};

const broken = new Map();
for (const file of html) {
  const src = readFileSync(file, 'utf8');
  for (const m of src.matchAll(/(?:href|src)="(\/[^"]*)"/g)) {
    const url = m[1];
    if (CI_GENERATED.includes(url) && process.env.CI !== 'true') continue;
    if (!resolves(url)) {
      const from = '/' + path.relative(DIST, file).replace(/index\.html$/, '');
      if (!broken.has(url)) broken.set(url, new Set());
      broken.get(url).add(from);
    }
  }
}

console.log(`checked ${html.length} pages`);
if (broken.size === 0) {
  console.log('all internal links resolve.');
  process.exit(0);
}
console.log(`\nBROKEN (${broken.size}):`);
for (const [url, from] of broken) console.log(`   ! ${url}\n       from: ${[...from].slice(0, 3).join(', ')}`);
process.exit(1);
