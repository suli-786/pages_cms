// Typed access to the Partner page content edited via Pages CMS
// (src/content/partner.json). Schemas mirror the `partner` block in .pages.yml
// 1:1 — if the CMS model changes, change both.
//
// Field primitives and the parse-or-throw helper come from lib/content.ts,
// which documents the forgiving-parse philosophy these rely on.
import { z } from 'astro/zod';

import { DEFAULT_ICON, ICON_NAMES } from '@/components/elements/icon';
import data from '@/content/partner.json';
import {
  contactSchema,
  enumOr,
  introSchema,
  list,
  parseContent,
  partnersSchema,
  str,
  visible,
} from '@/lib/content';

/** Same posture as lib/about.ts — unknown/cleared icon lands on the default. */
const iconName = enumOr(ICON_NAMES, DEFAULT_ICON);

export const partnerWhySchema = z.object({
  visible,
  heading: str,
  items: list(z.object({ icon: iconName, title: str, body: str })),
});

const partnerSchema = z.object({
  // The shared intro band — schema and IntroContent type live in lib/content.
  intro: introSchema,
  why: partnerWhySchema,
  // The shared partners section (components/sections/partners.tsx), same
  // unranked marquee as the homepage's but holding the CURRENT partners.
  // partner.astro hides the whole section while the list is empty: an empty
  // "current partners" section on a sponsor page is anti-social-proof.
  partners: partnersSchema,
  // The shared contact section (one form, four enquiry types) — schema and
  // ContactContent type live in lib/content; the section component is
  // components/sections/contact.tsx, same as the homepage.
  contact: contactSchema,
});

export type PartnerWhyContent = z.infer<typeof partnerWhySchema>;
export type PartnerContent = z.infer<typeof partnerSchema>;

export const partner: PartnerContent = parseContent(
  partnerSchema,
  data,
  'src/content/partner.json',
  'Partner page content model',
);
