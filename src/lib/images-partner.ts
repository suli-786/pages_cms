// Build-time image resolution for the Partner page — sibling of
// lib/images-about.ts; see lib/images.ts for why resolution is per-page.
// Import ONLY from server code (partner.astro).
import { type Policy, type ResolvedMedia, resolveMedia } from '@/lib/images';
import type { PartnerContent, PartnerWallContent } from '@/lib/partner';

// Partner logos render in ~160px boxes in the tier wall (same envelope as the
// homepage's framed logos); 2× for retina. SVG logos pass through untouched.
const POLICIES = {
  partnerLogo: {
    widths: [160, 320],
    sizes: '(min-width: 768px) 160px, 128px',
  },
} satisfies Record<string, Policy>;

export type ResolvedPartnerWallEntry = Omit<
  PartnerWallContent['items'][number],
  'logo'
> & { logo: ResolvedMedia };
export type ResolvedPartnerWallContent = Omit<PartnerWallContent, 'items'> & {
  items: ResolvedPartnerWallEntry[];
};
export type ResolvedPartnerContent = Omit<PartnerContent, 'partners'> & {
  partners: ResolvedPartnerWallContent;
};

/** Resolve every image path in the Partner content. Call from partner.astro. */
export async function resolvePartnerImages(
  partner: PartnerContent,
): Promise<ResolvedPartnerContent> {
  const items = await Promise.all(
    partner.partners.items.map(async (p) => ({
      ...p,
      logo: await resolveMedia(p.logo, POLICIES.partnerLogo),
    })),
  );

  return { ...partner, partners: { ...partner.partners, items } };
}
