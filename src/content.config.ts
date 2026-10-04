import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';
import { bibtexLoader } from './loaders/bibtex';

/** Jekyll wrote tags/categories as space-separated bare words, which YAML
 *  parses as a single string. Normalise both shapes without touching content. */
const listish = z
  .union([z.string(), z.array(z.string())])
  .transform((v) => (typeof v === 'string' ? v.split(/\s+/).filter(Boolean) : v))
  .default([]);

/** Strip Jekyll's `YYYY-MM-DD-` prefix so the id equals Jekyll's `:title` slug. */
const stripDate = ({ entry }: { entry: string }) =>
  entry.replace(/\.mdx?$/, '').replace(/^\d{4}-\d{2}-\d{2}-/, '');

const posts = defineCollection({
  loader: glob({ base: './src/content/posts', pattern: '**/*.{md,mdx}', generateId: stripDate }),
  schema: ({ image }) => z.object({
    title: z.string(),
    date: z.coerce.date(),
    description: z.string().optional(),
    /** Social preview card (og:image); ~1200×628 reads best. Without it, the post's
     *  opening <Figure> is used (src/lib/banner.ts), then the portrait. */
    image: image().optional(),
    tags: listish,
    categories: listish,
    /** Escape hatch: pin the URL year if a frontmatter date is ever corrected. */
    urlYear: z.number().int().optional(),
    /** Provenance for co-authored or cross-posted pieces, and any thanks owed.
     *  Both render above the contents; inline HTML is allowed so they can link. */
    note: z.string().optional(),
    acknowledgements: z.string().optional(),
    math: z.boolean().default(false),
    toc: z.boolean().default(false),
    draft: z.boolean().default(false),
  }),
});

const news = defineCollection({
  loader: glob({ base: './src/content/news', pattern: '**/*.{md,mdx}', generateId: stripDate }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
  }),
});

const owner = { first: 'Benjamin', last: 'Alt' };

const publications = defineCollection({
  loader: bibtexLoader({ file: './src/data/publications.bib', owner }),
});

const readingList = defineCollection({
  loader: bibtexLoader({ file: './src/data/icra-2021-reading-list.bib', owner }),
});

export const collections = { posts, news, publications, readingList };
