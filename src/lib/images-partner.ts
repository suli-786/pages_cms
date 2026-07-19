// Build-time image resolution for the Partner page — sibling of
// lib/images-about.ts; see lib/images.ts for why resolution is per-page.
// Import ONLY from server code (partner.astro).
import {
  type ResolvedPartnersContent,
  resolvePartnerLogos,
} from '@/lib/images';
import type { PartnerContent } from '@/lib/partner';

export type ResolvedPartnerContent = Omit<PartnerContent, 'partners'> & {
  partners: ResolvedPartnersContent;
};

/** Resolve every image path in the Partner content. Call from partner.astro. */
export async function resolvePartnerImages(
  partner: PartnerContent,
): Promise<ResolvedPartnerContent> {
  // The current-partners logos, with the same tier-appropriate policies as
  // the homepage's partners section (the two render identically).
  const items = await resolvePartnerLogos(partner.partners.items);
  return { ...partner, partners: { ...partner.partners, items } };
}
