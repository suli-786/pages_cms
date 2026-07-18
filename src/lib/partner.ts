// Typed access to the Partner page content edited via Pages CMS
// (src/content/partner.json). Schemas mirror the `partner` block in .pages.yml
// 1:1 — if the CMS model changes, change both.
//
// Field primitives and the parse-or-throw helper come from lib/content.ts,
// which documents the forgiving-parse philosophy these rely on.
import { z } from 'astro/zod';

import {
  DEFAULT_ICON,
  ICON_NAMES,
  type IconName,
} from '@/components/elements/icon';
import data from '@/content/partner.json';
import {
  ctaSchema,
  link,
  list,
  mediaSchema,
  parseContent,
  str,
  strList,
  visible,
} from '@/lib/content';

/** Same posture as lib/about.ts — unknown/cleared icon lands on the default. */
const iconName = z.preprocess(
  (v) =>
    typeof v === 'string' && (ICON_NAMES as readonly string[]).includes(v)
      ? v
      : DEFAULT_ICON,
  z.enum(ICON_NAMES as unknown as [IconName, ...IconName[]]),
);

export const partnerIntroSchema = z.object({
  visible,
  eyebrow: str,
  // Required in .pages.yml; the page's only h1.
  title: z.string(),
  body: str,
});

export const partnerWhySchema = z.object({
  visible,
  heading: str,
  items: list(z.object({ icon: iconName, title: str, body: str })),
});

export const partnerReachSchema = z.object({
  visible,
  heading: str,
  body: str,
  facts: list(z.object({ label: str, value: str })),
});

export const partnerTiersSchema = z.object({
  visible,
  heading: str,
  lead: str,
  items: list(
    z.object({
      name: str,
      // The deck's tier subtitle (Headline / Partner / Exhibitor) — rendered
      // as the card's mono plan-id badge.
      code: str,
      tagline: str,
      benefits: strList,
    }),
  ),
  note: str,
  cta: ctaSchema,
  ctaCaption: str,
});

/**
 * Current partners, grouped by tier in the section component. The whole
 * section renders nothing while the list is empty — an empty "current
 * partners" wall on a sponsor page is anti-social-proof (user decision,
 * 2026-07-18). Deliberately a different enum from the homepage wall's
 * headline/supporting/regular: different page, different data (the homepage
 * wall shows previous partners, which never appear here).
 */
export const partnerWallSchema = z.object({
  visible,
  heading: str,
  lead: str,
  items: list(
    z.object({
      name: str,
      logo: mediaSchema,
      href: link,
      tier: z.preprocess(
        (v) => (v === 'platinum' || v === 'gold' ? v : 'silver'),
        z.enum(['platinum', 'gold', 'silver']),
      ),
    }),
  ),
});

export const partnerContactSchema = z.object({
  visible,
  heading: str,
  body: str,
  email: str,
  formCta: ctaSchema,
  formNote: str,
});

const partnerSchema = z.object({
  intro: partnerIntroSchema,
  why: partnerWhySchema,
  reach: partnerReachSchema,
  tiers: partnerTiersSchema,
  partners: partnerWallSchema,
  contact: partnerContactSchema,
});

export type PartnerIntroContent = z.infer<typeof partnerIntroSchema>;
export type PartnerWhyContent = z.infer<typeof partnerWhySchema>;
export type PartnerReachContent = z.infer<typeof partnerReachSchema>;
export type PartnerTiersContent = z.infer<typeof partnerTiersSchema>;
export type PartnerWallContent = z.infer<typeof partnerWallSchema>;
export type PartnerWallEntry = PartnerWallContent['items'][number];
export type PartnerContactContent = z.infer<typeof partnerContactSchema>;
export type PartnerContent = z.infer<typeof partnerSchema>;

export const partner: PartnerContent = parseContent(
  partnerSchema,
  data,
  'src/content/partner.json',
  'Partner page content model',
);
