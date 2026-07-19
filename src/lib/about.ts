// Typed access to the About page content edited via Pages CMS
// (src/content/about.json). Schemas mirror the `about` block in .pages.yml 1:1
// — if the CMS model changes, change both.
//
// Field primitives and the parse-or-throw helper come from lib/content.ts,
// which documents the forgiving-parse philosophy these rely on.
//
// Each section schema is a named export so it can be composed into a
// discriminated union later without editing, if the page ever moves to the
// Pages CMS `block` page-builder field (see context/pages-cms-best-practices.md
// §1 — the decision to stay with fixed sections is recorded in
// working/about-build-plan.md §3).
import { z } from 'astro/zod';

import { DEFAULT_ICON, ICON_NAMES } from '@/components/elements/icon';
import data from '@/content/about.json';
import {
  ctaSchema,
  enumOr,
  introSchema,
  list,
  mediaSchema,
  parseContent,
  str,
  visible,
} from '@/lib/content';

/**
 * Icon choice from the allowlist in components/elements/icon.tsx, mirrored by
 * a `select` in .pages.yml — enumOr documents the forgiving-fallback posture.
 */
const iconName = enumOr(ICON_NAMES, DEFAULT_ICON);

export const storySchema = z.object({
  visible,
  label: str,
  heading: str,
  body: str,
  cta: ctaSchema,
  photos: list(mediaSchema),
});

export const whySchema = z.object({
  visible,
  heading: str,
  lead: str,
  items: list(z.object({ icon: iconName, title: str, body: str })),
  closing: str,
});

export const faithSchema = z.object({
  visible,
  heading: str,
  lead: str,
  quote: z
    .object({ text: str, attribution: str })
    .nullish()
    .transform((v) => v ?? { text: '', attribution: '' }),
  body: str,
});

export const beliefsSchema = z.object({
  visible,
  label: str,
  heading: str,
  lead: str,
  items: list(z.object({ title: str, body: str })),
});

export const valuesSchema = z.object({
  visible,
  heading: str,
  lead: str,
  items: list(z.object({ icon: iconName, title: str, body: str })),
});

export const teamSchema = z.object({
  visible,
  heading: str,
  body: str,
  cta: ctaSchema,
});

/**
 * The closing CTA. Deliberately the same shape as the homepage's finalCta so it
 * renders through the shared components/sections/cta.tsx, plus an optional
 * secondary link (this page has two asks: join, or speak/volunteer/partner).
 */
export const joinSchema = z.object({
  visible,
  eyebrow: str,
  heading: str,
  body: str,
  // Countdown target (YYYY-MM-DD); empty hides the countdown.
  date: str,
  cta: ctaSchema,
  secondaryCta: ctaSchema,
  image: mediaSchema,
});

const aboutSchema = z.object({
  // The shared intro band — schema and IntroContent type live in lib/content.
  intro: introSchema,
  story: storySchema,
  why: whySchema,
  faith: faithSchema,
  beliefs: beliefsSchema,
  values: valuesSchema,
  team: teamSchema,
  join: joinSchema,
});

export type StoryContent = z.infer<typeof storySchema>;
export type WhyContent = z.infer<typeof whySchema>;
export type FaithContent = z.infer<typeof faithSchema>;
export type BeliefsContent = z.infer<typeof beliefsSchema>;
export type ValuesContent = z.infer<typeof valuesSchema>;
export type TeamContent = z.infer<typeof teamSchema>;
export type JoinContent = z.infer<typeof joinSchema>;
export type AboutContent = z.infer<typeof aboutSchema>;

export const about: AboutContent = parseContent(
  aboutSchema,
  data,
  'src/content/about.json',
  'About page content model',
);
