/* One-shot Liquid -> MDX codemod. Reviewed by hand afterwards. */
import { readdirSync, readFileSync, writeFileSync, renameSync, rmSync } from 'node:fs';
import path from 'node:path';

const DIRS = ['src/content/posts', 'src/content/news'];
const stats = { figure: 0, video: 0, gpx: 0, bib: 0, rowUnwrap: 0, caption: 0, mdx: 0, icon: 0 };

/** assets/img/spi/overview.png -> ../../assets/img/spi/overview.png (from src/content/<c>/) */
const importPath = (p) => '../../assets/' + p.replace(/^assets\//, '');
const varName = (p) =>
  'img_' + p.replace(/^assets\/img\//, '').replace(/\.[a-z0-9]+$/i, '').replace(/[^a-zA-Z0-9]+/g, '_');

function attrs(s) {
  const out = {};
  for (const m of s.matchAll(/(\w+)\s*=\s*"([^"]*)"/g)) out[m[1]] = m[2];
  for (const m of s.matchAll(/(\w+)\s*=\s*(true|false)\b/g)) out[m[1]] = m[2] === 'true';
  return out;
}

for (const dir of DIRS) {
  for (const file of readdirSync(dir).filter((f) => f.endsWith('.md'))) {
    const full = path.join(dir, file);
    let src = readFileSync(full, 'utf8');
    const imports = new Map();
    const used = new Set();

    // --- strip Jekyll-only frontmatter keys ---
    src = src.replace(/^---\n([\s\S]*?)\n---/, (_m, fm) => {
      const kept = fm
        .split('\n')
        .filter((l) => !/^(layout|related_posts|inline|giscus_comments|gpx_map|featured|thumbnail):/.test(l));
      return `---\n${kept.join('\n')}\n---`;
    });

    // --- figure ---
    src = src.replace(/\{%\s*include figure\.liquid([\s\S]*?)%\}/g, (_m, raw) => {
      const a = attrs(raw);
      const p = a.path;
      if (!p) return '';
      const v = varName(p);
      imports.set(v, importPath(p));
      used.add('Figure');
      stats.figure++;
      const cls = a.class ?? '';
      const width = /w-50|w-75/.test(cls) ? 'narrow' : 'bleed';
      const bits = [`src={${v}}`];
      if (a.alt) bits.push(`alt="${a.alt.replace(/"/g, '&quot;')}"`);
      if (a.caption) bits.push(`caption="${a.caption.replace(/"/g, '&quot;')}"`);
      bits.push(`width="${width}"`);
      if (a.loading === 'eager') bits.push('loading="eager"');
      return `<Figure ${bits.join(' ')} />`;
    });

    // --- video ---
    src = src.replace(/\{%\s*include video\.liquid([\s\S]*?)%\}/g, (_m, raw) => {
      const a = attrs(raw);
      const id = (a.path ?? '').match(/embed\/([A-Za-z0-9_-]+)/)?.[1];
      if (!id) return '';
      used.add('Video');
      stats.video++;
      return `<Video id="${id}" />`;
    });

    // --- gpx map ---
    src = src.replace(/\{%\s*include gpx-map\.liquid([\s\S]*?)%\}/g, (_m, raw) => {
      const a = attrs(raw);
      used.add('GpxMap');
      stats.gpx++;
      return `<GpxMap file="${a.file ?? 'sfbay.gpx'}"${a.topo ? ' topo' : ''} />`;
    });

    // --- inline bibliography ---
    src = src.replace(/\{%\s*bibliography\s+--file\s+\S+\s*%\}/g, () => {
      used.add('Bibliography');
      stats.bib++;
      return `<Bibliography collection="readingList" />`;
    });

    // --- unwrap bootstrap grid wrappers around the above ---
    src = src.replace(
      /<div class="row[^"]*">\s*<div class="col-sm[^"]*"(?:\s+style="[^"]*")?>\s*([\s\S]*?)\s*<\/div>\s*<\/div>/g,
      (_m, inner) => { stats.rowUnwrap++; return inner.trim(); }
    );

    // --- <div class="caption">…</div> following a figure -> caption prop ---
    src = src.replace(
      /(<Figure [^>]*?)(\s*\/>)\s*\n<div class="caption">\s*([\s\S]*?)\s*<\/div>/g,
      (_m, head, close, cap) => {
        stats.caption++;
        const clean = cap.replace(/\s+/g, ' ').replace(/"/g, '&quot;').trim();
        return head.includes('caption=') ? head + close : `${head} caption="${clean}"${close}`;
      }
    );

    // --- font-awesome <i> -> plain text/arrow ---
    src = src.replace(/<i class="fa[^"]*"><\/i>/g, () => { stats.icon++; return '↗'; });

    // --- MDX correctness fixes ---
    src = src.replace(/<A(\s+href=)/g, '<a$1').replace(/<\/A>/g, '</a>');
    src = src.replace(/<img\s+([^>]*?)\s*\/?>/g, (_m, a) => `<img ${a.trim()} />`);
    src = src.replace(/\sclass=/g, ' className=');

    const needsMdx = used.size > 0 || /<\w+[^>]*className=/.test(src);
    if (needsMdx) {
      const lines = [...used].sort().map((c) => `import ${c} from '../../components/${c}.astro';`);
      for (const [v, p] of imports) lines.push(`import ${v} from '${p}';`);
      src = src.replace(/^(---\n[\s\S]*?\n---\n)/, `$1\n${lines.join('\n')}\n`);
      const out = full.replace(/\.md$/, '.mdx');
      writeFileSync(out, src);
      renameSync(full, full + '.bak');
      stats.mdx++;
    } else {
      writeFileSync(full, src);
    }
  }
}

// drop the .md originals that became .mdx
for (const dir of DIRS)
  for (const f of readdirSync(dir).filter((f) => f.endsWith('.bak')))
    rmSync(path.join(dir, f));
console.log(stats);
