import type { ImageMetadata } from 'astro';
import { posix } from 'node:path';
import type { Post } from './content';

const assets = import.meta.glob<{ default: ImageMetadata }>(
  '/src/assets/**/*.{jpg,jpeg,png,webp,avif}',
  { eager: true },
);

/** The image a post opens with, if its first block (after MDX imports) is a
 *  `<Figure src={…}>` or a markdown `![…](…)`. Used as the social preview card
 *  when the frontmatter sets no `image`, so a banner doubles as the card. */
export function bannerImage(post: Post): ImageMetadata | undefined {
  const body = post.body ?? '';
  const filePath = post.filePath;
  if (!filePath) return undefined;

  const imports = new Map<string, string>();
  for (const m of body.matchAll(/^import\s+(\w+)\s+from\s+['"]([^'"]+)['"];?\s*$/gm)) {
    imports.set(m[1], m[2]);
  }

  const first = body
    .split('\n')
    .map((l) => l.trim())
    .find((l) => l !== '' && !l.startsWith('import '));
  if (!first) return undefined;

  const spec =
    imports.get(first.match(/^<Figure\b[^>]*\bsrc=\{(\w+)\}/)?.[1] ?? '') ??
    first.match(/^!\[[^\]]*\]\(([^)\s]+)/)?.[1];
  if (!spec || !spec.startsWith('.')) return undefined;

  const resolved = '/' + posix.normalize(posix.join(posix.dirname(filePath), spec));
  return assets[resolved]?.default;
}
