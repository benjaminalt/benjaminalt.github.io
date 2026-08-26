import { readFile } from 'node:fs/promises';
import path from 'node:path';
import type { Loader } from 'astro/loaders';
import { parse } from '@retorquere/bibtex-parser';

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const PROCEEDINGS = new Set(['inproceedings', 'incollection', 'conference']);
const THESIS = new Set(['thesis', 'mastersthesis', 'phdthesis']);
/** Footnote markers authors carry in surnames (equal contribution, etc.). */
const MARKERS = /([*∗†‡§¶‖&^]+)/;

/** The parser returns NFD (decomposed) Unicode: "Jäkel" is 6 code points, not
 *  5. It renders identically but breaks string equality, which the owner check
 *  and the search index both depend on. Normalise everything on the way out. */
const nfc = (s: unknown): string => (typeof s === 'string' ? s.normalize('NFC').trim() : '');

export interface Author {
  given: string;
  family: string;
  /** Surname with footnote markers removed, for comparison. */
  familyClean: string;
  /** Footnote markers split off, for rendering as <sup>. */
  marker: string;
  isOwner: boolean;
}

export interface Publication {
  key: string;
  order: number;
  entryType: string;
  title: string;
  authors: Author[];
  year: number | null;
  month: string | null;
  venue: { kind: 'journal' | 'proceedings' | 'thesis' | 'preprint' | 'patent' | 'other'; name: string | null };
  address: string | null;
  doi: string | null;
  pdf: string | null;
  arxiv: string | null;
  html: string | null;
  abstract: string | null;
  annotation: string | null;
  /** `note = {recommend}` renders the title bold (used by the reading list). */
  recommended: boolean;
  selected: boolean;
}

interface Options {
  file: string;
  owner: { first: string; last: string };
}

export function bibtexLoader({ file, owner }: Options): Loader {
  return {
    name: 'bibtex-loader',
    load: async ({ store, logger, generateDigest, watcher }) => {
      const abs = path.resolve(file);

      const run = async () => {
        const bib = parse(await readFile(abs, 'utf8'));
        store.clear();

        bib.entries.forEach((entry, order) => {
          const f = entry.fields as Record<string, any>;
          const type = String(entry.type ?? 'misc').toLowerCase();

          const authors: Author[] = (f.author ?? []).map((a: any) => {
            const family = nfc(a.lastName ?? a.name);
            const given = nfc(a.firstName);
            const familyClean = family.replace(MARKERS, '').trim();
            return {
              given,
              family,
              familyClean,
              marker: (family.match(MARKERS)?.[1] ?? '').trim(),
              isOwner: familyClean === owner.last && (given === owner.first || given === `${owner.first[0]}.`),
            };
          });

          const year = f.year != null ? Number(String(f.year).match(/\d{4}/)?.[0]) : null;
          /* The parser resolves BibTeX month macros to numbers ("may" -> "5"),
             but a hand-written .bib may still hold a name. Accept both. */
          const monthRaw = String(f.month ?? '').trim().toLowerCase();
          const monthNum = Number(monthRaw);
          const monthIdx = Number.isInteger(monthNum) && monthNum >= 1 && monthNum <= 12
            ? monthNum - 1
            : MONTHS.findIndex((m) => m.toLowerCase() === monthRaw.slice(0, 3));

          /* Every entry gets a venue line: a bare title with no context reads as
             an oversight. Zotero exports unpublished work as @misc with an
             `eprint`, so name the preprint server rather than leaving it blank. */
          const preprintServer = nfc(f.archiveprefix) || nfc(f.publisher);
          const venue: Publication['venue'] =
            type === 'article'
              ? { kind: 'journal', name: nfc(f.journal) || null }
              : PROCEEDINGS.has(type)
                ? { kind: 'proceedings', name: nfc(f.booktitle) || null }
                : THESIS.has(type)
                  ? { kind: 'thesis', name: nfc(f.school) || null }
                  : type === 'patent'
                    ? { kind: 'patent', name: `Patent ${nfc(f.number)}`.trim() }
                    : nfc(f.eprint)
                      ? { kind: 'preprint', name: `${preprintServer || 'Preprint'} preprint`.trim() }
                      : { kind: 'other', name: nfc(f.publisher) || nfc(f.howpublished) || null };

          const data: Publication = {
            key: entry.key,
            order,
            entryType: type,
            title: nfc(f.title),
            authors,
            year: Number.isFinite(year) ? (year as number) : null,
            month: monthIdx >= 0 ? MONTHS[monthIdx] : null,
            venue,
            address: nfc(f.address) || null,
            doi: nfc(f.doi) || null,
            pdf: nfc(f.pdf) || null,
            arxiv: nfc(f.arxiv) || null,
            html: nfc(f.html) || null,
            abstract: nfc(f.abstract) || null,
            annotation: nfc(f.annotation) || null,
            recommended: nfc(f.note).toLowerCase() === 'recommend',
            selected: f.selected === true || String(f.selected).toLowerCase() === 'true',
            // `file` is deliberately never copied — it holds local Zotero paths.
          };

          store.set({ id: data.key, data: data as unknown as Record<string, unknown>, digest: generateDigest(data) });
        });

        logger.info(`Parsed ${bib.entries.length} entries from ${path.basename(abs)}`);
      };

      await run();
      watcher?.add(abs);
      watcher?.on('change', (changed) => {
        if (path.resolve(changed) === abs) void run();
      });
    },
  };
}
