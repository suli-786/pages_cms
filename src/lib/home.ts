// Typed access to the homepage content edited via Pages CMS (src/content/home.json).
// Schemas mirror .pages.yml 1:1 — if the CMS model changes, change both.
//
// Parsing philosophy (learned from commit 7dbd234): editors can clear any
// optional field or list in Pages CMS, which writes null/undefined into the
// JSON. Optional values therefore coerce to safe defaults instead of failing
// the build; only a structurally broken file (missing section, wrong type
// that can't be coerced) fails — loudly, at build time, with the field path.
import { z } from 'astro/zod';

import data from '@/content/home.json';
import { site } from '@/lib/site';

/** Optional string → '' when cleared. */
const str = z
  .string()
  .nullish()
  .transform((v) => v ?? '');

/**
 * Link field. The literal token `whatsapp` (documented in .pages.yml) resolves
 * to the single WhatsApp community URL from Site settings — resolved here, at
 * parse time, so every link field on the site gets it without each component
 * having to remember to. Falls back to `#` until the URL is filled in.
 */
const link = z
  .string()
  .nullish()
  .transform((v) => {
    const href = v ?? '';
    return href === 'whatsapp' ? site.whatsapp || '#' : href;
  });

/** Section visibility toggle; missing/cleared = shown. */
const visible = z
  .boolean()
  .nullish()
  .transform((v) => v ?? true);

/**
 * Optional list → [] when cleared (Pages CMS writes null for emptied lists);
 * null/undefined items (an added-but-never-filled list row) are dropped
 * before validation instead of failing the build.
 */
const list = <T extends z.ZodTypeAny>(item: T) =>
  z.preprocess(
    (v) => (Array.isArray(v) ? v.filter((x) => x != null) : []),
    z.array(item),
  );

/** List of plain strings; cleared/empty items are dropped entirely. */
const strList = z.preprocess(
  (v) => (Array.isArray(v) ? v.filter((x) => x != null && x !== '') : []),
  z.array(z.string()),
);

const ctaSchema = z
  .object({ label: str, href: link })
  .nullish()
  .transform((v) => v ?? { label: '', href: '' });

const mediaSchema = z
  .object({ src: str, alt: str })
  .nullish()
  .transform((v) => v ?? { src: '', alt: '' });

const heroSchema = z.object({
  visible,
  eyebrow: str,
  title: z.string(), // required in .pages.yml; a hero without a title is a broken build
  eventDetails: list(z.object({ label: str, value: str })),
  primaryCta: ctaSchema,
  community: z
    .object({ body: str, cta: ctaSchema })
    .nullish()
    .transform((v) => v ?? { body: '', cta: { label: '', href: '' } }),
  socialsLabel: str,
  gallery: strList,
});

const visionSchema = z.object({
  visible,
  heading: str,
  statement: str,
  highlights: list(z.object({ phrase: str, image: str, href: link })),
});

const conferenceSchema = z.object({
  visible,
  tagline: str,
  heading: str,
  body: str,
  tiles: list(
    z.object({
      image: mediaSchema,
      caption: str,
      href: link,
      linkLabel: str,
    }),
  ),
  benefits: list(z.object({ category: str, title: str, body: str })),
});

const speakerSchema = z.object({
  name: str,
  role: str,
  theme: str,
  portrait: str,
});

const speakersSchema = z.object({
  visible,
  heading: str,
  description: str,
  cta: ctaSchema,
  items: list(speakerSchema),
});

const partnerLogoSchema = z.object({
  src: str,
  alt: str,
  href: link,
  // Anything unrecognised (cleared select, legacy items) lands in `regular`.
  tier: z.preprocess(
    (v) => (v === 'headline' || v === 'supporting' ? v : 'regular'),
    z.enum(['headline', 'supporting', 'regular']),
  ),
});

const partnersSchema = z.object({
  visible,
  heading: str,
  description: str,
  items: list(partnerLogoSchema),
});

const finalCtaSchema = z.object({
  visible,
  eyebrow: str,
  heading: str,
  body: str,
  // Conference date (YYYY-MM-DD) the countdown counts to; empty hides it.
  date: str,
  cta: ctaSchema,
  image: mediaSchema,
});

const contactSchema = z.object({
  visible,
  heading: str,
  description: str,
  successMessage: str,
});

const homeSchema = z.object({
  hero: heroSchema,
  vision: visionSchema,
  conference: conferenceSchema,
  speakers: speakersSchema,
  partners: partnersSchema,
  finalCta: finalCtaSchema,
  contact: contactSchema,
});

export type CtaLink = z.infer<typeof ctaSchema>;
export type Media = z.infer<typeof mediaSchema>;
export type HeroContent = z.infer<typeof heroSchema>;
export type VisionContent = z.infer<typeof visionSchema>;
export type ConferenceContent = z.infer<typeof conferenceSchema>;
export type Speaker = z.infer<typeof speakerSchema>;
export type SpeakersContent = z.infer<typeof speakersSchema>;
export type PartnerLogo = z.infer<typeof partnerLogoSchema>;
export type PartnersContent = z.infer<typeof partnersSchema>;
export type FinalCtaContent = z.infer<typeof finalCtaSchema>;
export type ContactContent = z.infer<typeof contactSchema>;
export type HomeContent = z.infer<typeof homeSchema>;

const parsed = homeSchema.safeParse(data);

if (!parsed.success) {
  const issues = parsed.error.issues
    .map((i) => `  • ${i.path.join('.') || '(root)'} — ${i.message}`)
    .join('\n');
  throw new Error(
    `src/content/home.json does not match the homepage content model.\n` +
      `Fix these fields (usually via Pages CMS):\n${issues}`,
  );
}

export const home: HomeContent = parsed.data;
