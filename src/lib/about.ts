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
  contactSchema,
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

/** Timeline milestones (timeline14 in story.tsx) — one dated beat each. */
export const storySchema = z.object({
  visible,
  heading: str,
  milestones: list(
    z.object({ date: str, title: str, body: str, image: mediaSchema }),
  ),
});

export const whySchema = z.object({
  visible,
  heading: str,
  items: list(z.object({ icon: iconName, title: str, body: str })),
});

/**
 * What we stand for — the merged propositions + values list (user decision,
 * 2026-07-20: the former separate values section repeated what the intro
 * mission, the faith verse and these propositions already say).
 */
export const beliefsSchema = z.object({
  visible,
  heading: str,
  lead: str,
  items: list(z.object({ title: str, body: str })),
});

/** A plain photo wall — hidden by team.tsx while the list is empty. */
export const teamSchema = z.object({
  visible,
  heading: str,
  photos: list(mediaSchema),
});

/**
 * The closing "join the community" section (components/sections/about/join.tsx)
 * — heading, body, the WhatsApp call and a secondary link, above a reveal grid
 * of community photos. Its own component since 2026-07-20 (was the shared
 * cta.tsx countdown band).
 */
export const joinSchema = z.object({
  visible,
  heading: str,
  body: str,
  cta: ctaSchema,
  secondaryCta: ctaSchema,
  photos: list(mediaSchema),
});

const aboutSchema = z.object({
  // The shared intro band — schema and IntroContent type live in lib/content.
  intro: introSchema,
  story: storySchema,
  why: whySchema,
  beliefs: beliefsSchema,
  team: teamSchema,
  join: joinSchema,
  // The shared contact section (one form, four enquiry types) — schema and
  // ContactContent type live in lib/content; the section component is
  // components/sections/contact.tsx, same as the homepage and Partner page.
  contact: contactSchema,
});

export type StoryContent = z.infer<typeof storySchema>;
export type WhyContent = z.infer<typeof whySchema>;
export type BeliefsContent = z.infer<typeof beliefsSchema>;
export type TeamContent = z.infer<typeof teamSchema>;
export type JoinContent = z.infer<typeof joinSchema>;
export type AboutContent = z.infer<typeof aboutSchema>;

export const about: AboutContent = parseContent(
  aboutSchema,
  data,
  'src/content/about.json',
  'About page content model',
);
