/* One-shot: downscale + re-encode the source images.
   Astro still generates responsive variants at build time; this just stops us
   committing 4000px camera originals as the masters. */
import sharp from 'sharp';
import { readdir, mkdir, stat } from 'node:fs/promises';
import path from 'node:path';

const SRC = 'assets/img';
const DEST = 'src/assets/img';
const MAX_W = 2560;

async function* walk(dir) {
  for (const e of await readdir(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) yield* walk(p);
    else yield p;
  }
}

let before = 0, after = 0, n = 0;
for await (const file of walk(SRC)) {
  const rel = path.relative(SRC, file);
  const out = path.join(DEST, rel);
  await mkdir(path.dirname(out), { recursive: true });

  before += (await stat(file)).size;
  const img = sharp(file, { failOn: 'none' }).rotate(); // honour EXIF orientation
  const meta = await img.metadata();
  const resized = meta.width && meta.width > MAX_W ? img.resize({ width: MAX_W }) : img;

  if (/\.png$/i.test(file)) await resized.png({ compressionLevel: 9, palette: true }).toFile(out);
  else await resized.jpeg({ quality: 82, mozjpeg: true }).toFile(out);

  const sz = (await stat(out)).size;
  after += sz;
  n++;
  const pct = Math.round((1 - sz / (await stat(file)).size) * 100);
  console.log(`${String(pct).padStart(3)}%  ${rel}`);
}
const mb = (b) => (b / 1048576).toFixed(1);
console.log(`\n${n} images: ${mb(before)} MB -> ${mb(after)} MB (${Math.round((1 - after / before) * 100)}% smaller)`);
