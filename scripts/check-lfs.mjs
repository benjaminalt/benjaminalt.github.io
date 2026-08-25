/* Fail loudly if the LFS'd PDFs are pointer stubs, rather than letting the
   build produce a site with 21 broken paper links. */
import { readdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';

const dir = 'public/assets/pdf';
let stubs;
try {
  stubs = readdirSync(dir).filter(
    (f) => f.endsWith('.pdf') && readFileSync(join(dir, f), 'latin1').startsWith('version https://git-lfs')
  );
} catch {
  console.error(`\n  ${dir} is missing.\n`);
  process.exit(1);
}

if (stubs.length) {
  console.error(`\n  ${stubs.length} Git LFS pointer stub(s) in ${dir}.`);
  console.error(`  Run:  git lfs install && git lfs pull\n`);
  process.exit(1);
}
