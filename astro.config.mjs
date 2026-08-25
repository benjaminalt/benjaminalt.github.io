// @ts-check
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import expressiveCode from 'astro-expressive-code';
import pagefind from 'astro-pagefind';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import { unified } from '@astrojs/markdown-remark';

import { SITE } from './src/consts.js';

export default defineConfig({
  site: SITE.url,
  // Reproduces Jekyll's URL shape exactly: /blog/2026/foo/index.html
  trailingSlash: 'always',
  build: { format: 'directory' },

  integrations: [
    // expressiveCode MUST precede mdx
    expressiveCode({
      themes: ['github-light', 'github-dark'],
      themeCssSelector: (theme) => `[data-code-theme='${theme.name}']`,
      styleOverrides: { borderRadius: '4px', borderWidth: '1px' },
    }),
    mdx(),
    sitemap({ filter: (page) => !page.includes('/404') }),
    pagefind(),
  ],

  markdown: {
    /* Astro 7 ships a new default Markdown processor; remark/rehype plugins
       require opting into the unified processor explicitly. */
    processor: unified({
      remarkPlugins: [remarkMath],
      rehypePlugins: [[rehypeKatex, { strict: false, trust: false }]],
      gfm: true,
      smartypants: true,
    }),
    shikiConfig: { wrap: true },
  },

  image: {
    // sharp is the default service; responsive widths are set per-component
  },
});
