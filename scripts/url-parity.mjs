/* Compares the deployed URL set (origin/gh-pages) against a fresh dist/.
   Any URL that existed and no longer does is a regression, unless it is on
   the intentional-removal list below. */
import { readdirSync, readFileSync, statSync } from 'node:fs';
import path from 'node:path';

const BASELINE = 'scripts/urls-baseline.txt';
const DIST = 'dist';

/** URLs deliberately dropped in the redesign. */
const INTENTIONAL = [
  '/repositories/',      // replaced by a footer link; a refresh stub still serves it
  '/_pages/cv/',         // artifact of the old nav-dropdown page
  '/Claude.md',          // writing style guide, was never meant to be published
  '/requirements.txt',
  '/sitemap.xml',        // now /sitemap-index.xml
  /^\/submodules\//,     // LaTeX build artifacts
];

const norm = (u) => {
  let s = u.startsWith('/') ? u : '/' + u;
  s = s.replace(/index\.html$/, '');
  return s;
};

const walk = (dir, base = dir, acc = []) => {
  for (const e of readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) walk(p, base, acc);
    else acc.push('/' + path.relative(base, p).split(path.sep).join('/'));
  }
  return acc;
};

const oldUrls = new Set(
  readFileSync(BASELINE, 'utf8').split('\n').filter(Boolean).map(norm)
);
const newUrls = new Set(walk(DIST).map(norm));

/* Built by xu-cheng/latex-action in CI from the private cv submodule, and
   gitignored locally. Missing locally is expected; missing in CI is a break. */
const CI_GENERATED = ['/assets/pdf/cv.pdf', '/assets/pdf/resume.pdf'];
const inCI = process.env.CI === 'true';

const excused = (u) => INTENTIONAL.some((r) => (r instanceof RegExp ? r.test(u) : r === u));

const allMissing = [...oldUrls].filter((u) => !newUrls.has(u) && !excused(u)).sort();
const ciOnly = allMissing.filter((u) => CI_GENERATED.includes(u) && !inCI);
const missing = allMissing.filter((u) => !ciOnly.includes(u));
const dropped = [...oldUrls].filter((u) => !newUrls.has(u) && excused(u)).sort();
const added = [...newUrls].filter((u) => !oldUrls.has(u)).sort();

const interesting = added.filter((u) => !/^\/(_astro|pagefind|katex)\//.test(u));

console.log(`baseline ${oldUrls.size} URLs   ·   built ${newUrls.size} files\n`);
if (dropped.length) {
  console.log(`intentionally removed (${dropped.length}):`);
  dropped.forEach((u) => console.log('   -', u));
  console.log();
}
console.log(`new URLs (${interesting.length}):`);
interesting.forEach((u) => console.log('   +', u));
console.log();

if (ciOnly.length) {
  console.log(`built in CI, absent locally (${ciOnly.length}):`);
  ciOnly.forEach((u) => console.log('   ~', u));
  console.log();
}

if (missing.length) {
  console.log(`REGRESSIONS (${missing.length}) — these existed and no longer do:`);
  missing.forEach((u) => console.log('   !', u));
  process.exit(1);
}
console.log('No regressions. Every baseline URL is present.');
