import { getCollection, type CollectionEntry } from 'astro:content';

export type Post = CollectionEntry<'posts'>;
export type NewsItem = CollectionEntry<'news'>;

/** Jekyll took the URL year from the frontmatter date. Keep that, with an
 *  explicit override for the two posts whose filename and date disagree. */
export const postYear = (p: Post): number => p.data.urlYear ?? p.data.date.getUTCFullYear();

export const postUrl = (p: Post): string => `/blog/${postYear(p)}/${p.id}/`;
export const newsUrl = (n: NewsItem): string => `/news/${n.id}/`;

const byDateDesc = (a: { data: { date: Date } }, b: { data: { date: Date } }) =>
  b.data.date.valueOf() - a.data.date.valueOf();

export async function allPosts(): Promise<Post[]> {
  const posts = await getCollection('posts', ({ data }) => !data.draft);
  return posts.sort(byDateDesc);
}

export async function allNews(): Promise<NewsItem[]> {
  const news = await getCollection('news');
  return news.sort(byDateDesc);
}

/** `2026-07-05` — mono, sortable, unambiguous across locales. */
export const isoDate = (d: Date): string => d.toISOString().slice(0, 10);

/** `Jul 2026` — for places where a full date is too much. */
export const shortDate = (d: Date): string =>
  d.toLocaleDateString('en-GB', { month: 'short', year: 'numeric', timeZone: 'UTC' });

export const slugifyTag = (t: string): string =>
  t.toLowerCase().normalize('NFC').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
