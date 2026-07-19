// Typed access to the homepage content edited via Pages CMS (src/content/home.json).
// Schemas mirror .pages.yml 1:1 — if the CMS model changes, change both.
//
// The field primitives (str, link, list, …) and the parse-or-throw helper are
// shared with the other pages — see lib/content.ts, which also documents the
// forgiving-parse philosophy these rely on.
import { z } from 'astro/zod';

import data from '@/content/home.json';
import {
  contactSchema,
  ctaSchema,
  link,
  list,
  mediaSchema,
  parseContent,
  partnersSchema,
  str,
  strList,
  visible,
} from '@/lib/content';

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

const homeSchema = z.object({
  hero: heroSchema,
  vision: visionSchema,
  conference: conferenceSchema,
  speakers: speakersSchema,
  partners: partnersSchema,
  finalCta: finalCtaSchema,
  contact: contactSchema,
});

export type HeroContent = z.infer<typeof heroSchema>;
export type VisionContent = z.infer<typeof visionSchema>;
export type ConferenceContent = z.infer<typeof conferenceSchema>;
export type Speaker = z.infer<typeof speakerSchema>;
export type SpeakersContent = z.infer<typeof speakersSchema>;
export type FinalCtaContent = z.infer<typeof finalCtaSchema>;
export type HomeContent = z.infer<typeof homeSchema>;

export const home: HomeContent = parseContent(
  homeSchema,
  data,
  'src/content/home.json',
  'homepage content model',
);
