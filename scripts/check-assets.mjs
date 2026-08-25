/* Catches the failure mode where math renders but its stylesheet is missing
   because a post forgot `math: true`. */
import { readdirSync, readFileSync } from 'node:fs';
import path from 'node:path';

const DIST = 'dist';
const pages = [];
(function walk(d) {
  for (const e of readdirSync(d, { withFileTypes: true })) {
    const p = path.join(d, e.name);
    if (e.isDirectory()) walk(p);
    else if (e.name === 'index.html') pages.push(p);
  }
})(DIST);

const problems = [];
for (const file of pages) {
  const html = readFileSync(file, 'utf8');
  const url = '/' + path.relative(DIST, file).replace(/index\.html$/, '');
  if (html.includes('class="katex') && !html.includes('katex.min.css')) {
    problems.push(`${url} renders math but does not load katex.min.css — add \`math: true\` to its frontmatter`);
  }
}

console.log(`checked ${pages.length} pages for asset/markup mismatches`);
if (problems.length) {
  problems.forEach((p) => console.log('   !', p));
  process.exit(1);
}
console.log('no mismatches.');
