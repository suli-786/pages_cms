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

/** Optional string → '' when cleared. */
const str = z
  .string()
  .nullish()
  .transform((v) => v ?? '');

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

const ctaSchema = z.object({ label: str, href: str }).nullish().transform(
  (v) => v ?? { label: '', href: '' },
);

const mediaSchema = z.object({ src: str, alt: str }).nullish().transform(
  (v) => v ?? { src: '', alt: '' },
);

const heroSchema = z.object({
  visible,
  eyebrow: str,
  title: z.string(), // required in .pages.yml; a hero without a title is a broken build
  subtitle: str,
  eventDetails: list(z.object({ label: str, value: str })),
  speakersLabel: str,
  primaryCta: ctaSchema,
  secondaryCta: ctaSchema,
  partnersLabel: str,
  gallery: strList,
});

const visionSchema = z.object({
  visible,
  badge: str,
  heading: str,
  statement: str,
  highlights: list(z.object({ phrase: str, image: str, href: str })),
});

const conferenceSchema = z.object({
  visible,
  tagline: str,
  heading: str,
  body: str,
  primaryCta: ctaSchema,
  secondaryCta: ctaSchema,
  tiles: list(
    z.object({
      image: mediaSchema,
      caption: str,
      href: str,
      linkLabel: str,
    }),
  ),
  benefits: list(z.object({ title: str, description: str })),
});

const speakerSchema = z.object({
  name: str,
  role: str,
  theme: str,
  portrait: str,
});

const speakersSchema = z.object({
  visible,
  badge: str,
  heading: str,
  description: str,
  cta: ctaSchema,
  items: list(speakerSchema),
});

const partnerLogoSchema = z.object({ src: str, alt: str, href: str });

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
  cta: ctaSchema,
  image: mediaSchema,
});

const newsletterSchema = z.object({
  visible,
  badge: str,
  heading: str,
  description: str,
  formEyebrow: str,
  formHeading: str,
  successMessage: str,
  perksCard: z
    .object({ eyebrow: str, heading: str, perks: strList })
    .nullish()
    .transform((v) => v ?? { eyebrow: '', heading: '', perks: [] }),
});

const homeSchema = z.object({
  hero: heroSchema,
  vision: visionSchema,
  conference: conferenceSchema,
  speakers: speakersSchema,
  partners: partnersSchema,
  finalCta: finalCtaSchema,
  newsletter: newsletterSchema,
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
export type NewsletterContent = z.infer<typeof newsletterSchema>;
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
