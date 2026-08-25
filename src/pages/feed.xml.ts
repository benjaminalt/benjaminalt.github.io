/* Must stay at /feed.xml — that is where existing subscribers point.
   (Every @astrojs/rss example names this file rss.xml.ts.) */
import rss from '@astrojs/rss';
import type { APIContext } from 'astro';
import { allPosts, postUrl } from '../lib/content';
import { SITE } from '../consts';

export async function GET(context: APIContext) {
  const posts = await allPosts();
  return rss({
    title: SITE.title,
    description: SITE.description,
    site: context.site ?? SITE.url,
    items: posts.map((post) => ({
      title: post.data.title,
      description: post.data.description,
      pubDate: post.data.date,
      // GUID stays the full post URL, so readers don't re-notify every post.
      link: postUrl(post),
      categories: post.data.tags,
    })),
    customData: '<language>en</language>',
  });
}
