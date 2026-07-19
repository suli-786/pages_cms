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

/**
 * The partner-tier vocabulary, highest first — the fixed columns of the tiers
 * comparison matrix (tiers.tsx): `name` heads the column, `badge` is its mono
 * micro-label, and the cell fields in partnerTiersSchema are keyed by `value`.
 * (Display tiers of the partners section — headline/supporting/regular — are
 * a separate vocabulary owned by the shared partnersSchema in lib/content.)
 */
export const PARTNER_TIERS = [
  { value: 'platinum', name: 'Platinum', badge: 'Headline', label: 'Platinum — Headline' },
  { value: 'gold', name: 'Gold', badge: 'Partner', label: 'Gold — Partner' },
  { value: 'silver', name: 'Silver', badge: 'Exhibitor', label: 'Silver — Exhibitor' },
] as const;
export type PartnerTier = (typeof PARTNER_TIERS)[number]['value'];

export const partnerWhySchema = z.object({
  visible,
  heading: str,
  items: list(z.object({ icon: iconName, title: str, body: str })),
});

/**
 * The tier comparison matrix (tiers.tsx). Columns are the fixed PARTNER_TIERS
 * vocabulary above — not CMS data — so each row carries one cell per tier by
 * name. A cell is '' (not included), a tick word ("yes"), or short text shown
 * as-is ("1", "8", "Premium"). No prices by standing decision: current
 * pricing travels in the prospectus reply.
 */
export const partnerTiersSchema = z.object({
  visible,
  heading: str,
  lead: str,
  groups: list(
    z.object({
      heading: str,
      rows: list(
        z.object({ label: str, platinum: str, gold: str, silver: str }),
      ),
    }),
  ),
});

const partnerSchema = z.object({
  // The shared intro band — schema and IntroContent type live in lib/content.
  intro: introSchema,
  why: partnerWhySchema,
  // The shared partners section (components/sections/partners.tsx), same
  // design as the homepage's but holding the CURRENT partners — previous
  // partners never appear here (user decision, 2026-07-18). partner.astro
  // hides the whole section while the list is empty: an empty "current
  // partners" section on a sponsor page is anti-social-proof.
  partners: partnersSchema,
  tiers: partnerTiersSchema,
  // The shared contact section (one form, four enquiry types) — schema and
  // ContactContent type live in lib/content; the section component is
  // components/sections/contact.tsx, same as the homepage.
  contact: contactSchema,
});

export type PartnerWhyContent = z.infer<typeof partnerWhySchema>;
export type PartnerTiersContent = z.infer<typeof partnerTiersSchema>;
export type PartnerContent = z.infer<typeof partnerSchema>;

export const partner: PartnerContent = parseContent(
  partnerSchema,
  data,
  'src/content/partner.json',
  'Partner page content model',
);
