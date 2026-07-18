// Shared building blocks for every page's content model (home, about, …).
//
// Each page module (lib/home.ts, lib/about.ts) owns its own section schemas and
// its own `import data from '@/content/<page>.json'`; this module owns the
// pieces they all repeat — the forgiving field primitives and the parse-or-throw
// helper. Schemas here mirror the reusable `components:` groups in .pages.yml —
// if the CMS model changes, change both.
//
// Parsing philosophy (learned from commit 7dbd234): editors can clear any
// optional field or list in Pages CMS, which writes null/undefined into the
// JSON. Optional values therefore coerce to safe defaults instead of failing
// the build; only a structurally broken file (missing section, wrong type that
// can't be coerced) fails — loudly, at build time, with the field path.
//
// Note: lib/site.ts deliberately keeps its own copy of the parse-or-throw block
// rather than importing `parseContent` from here. This module imports `site`
// (for the `whatsapp` token in `link`), so a site.ts → content.ts import would
// close a cycle. Settings sit at the root of the content graph; everything else
// depends on them.
import { z } from 'astro/zod';

import { site } from '@/lib/site';

/** Optional string → '' when cleared. */
export const str = z
  .string()
  .nullish()
  .transform((v) => v ?? '');

/**
 * Link field. The literal token `whatsapp` (documented in .pages.yml) resolves
 * to the single WhatsApp community URL from Site settings — resolved here, at
 * parse time, so every link field on the site gets it without each component
 * having to remember to. Falls back to `#` until the URL is filled in.
 */
export const link = z
  .string()
  .nullish()
  .transform((v) => {
    const href = v ?? '';
    return href === 'whatsapp' ? site.whatsapp || '#' : href;
  });

/** Section visibility toggle; missing/cleared = shown. */
export const visible = z
  .boolean()
  .nullish()
  .transform((v) => v ?? true);

/**
 * Optional list → [] when cleared (Pages CMS writes null for emptied lists);
 * null/undefined items (an added-but-never-filled list row) are dropped
 * before validation instead of failing the build.
 */
export const list = <T extends z.ZodTypeAny>(item: T) =>
  z.preprocess(
    (v) => (Array.isArray(v) ? v.filter((x) => x != null) : []),
    z.array(item),
  );

/** List of plain strings; cleared/empty items are dropped entirely. */
export const strList = z.preprocess(
  (v) => (Array.isArray(v) ? v.filter((x) => x != null && x !== '') : []),
  z.array(z.string()),
);

/** Mirrors the `cta` component in .pages.yml. */
export const ctaSchema = z
  .object({ label: str, href: link })
  .nullish()
  .transform((v) => v ?? { label: '', href: '' });

/** Mirrors the `picture` component in .pages.yml. */
export const mediaSchema = z
  .object({ src: str, alt: str })
  .nullish()
  .transform((v) => v ?? { src: '', alt: '' });

export type CtaLink = z.infer<typeof ctaSchema>;
export type Media = z.infer<typeof mediaSchema>;

/**
 * Parse a content JSON file against its schema, or fail the build with the
 * offending field paths. Called at module scope by each page's content module,
 * so a bad CMS commit breaks the build with a readable message instead of
 * rendering a broken page.
 */
export function parseContent<T extends z.ZodTypeAny>(
  schema: T,
  data: unknown,
  file: string,
  model: string,
): z.infer<T> {
  const parsed = schema.safeParse(data);

  if (!parsed.success) {
    const issues = parsed.error.issues
      .map((i) => `  • ${i.path.join('.') || '(root)'} — ${i.message}`)
      .join('\n');
    throw new Error(
      `${file} does not match the ${model}.\n` +
        `Fix these fields (usually via Pages CMS):\n${issues}`,
    );
  }

  return parsed.data;
}
