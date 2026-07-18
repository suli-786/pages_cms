// Build-time image resolution for CMS content.
//
// Content JSON stores images as plain `/images/...` path strings (written by
// Pages CMS — see the `media` block in .pages.yml). The files themselves live
// in src/assets/images so Astro's image pipeline can optimize them. This
// module bridges the two at build time: it maps each content path onto the
// real asset, runs it through `getImage` (resize + WebP + srcset) and hands
// the sections plain serializable props — so the React islands never touch
// astro:assets and client bundles stay clean. Import ONLY from server code
// (index.astro); components may use `import type` for the Resolved* types.
//
// Missing files fail the build loudly with the offending path — same
// philosophy as the schema errors in lib/home.ts.
import type { ImageMetadata } from 'astro';
import { getImage } from 'astro:assets';

import type {
  ConferenceContent,
  FinalCtaContent,
  HeroContent,
  HomeContent,
  PartnerLogo,
  PartnersContent,
  Speaker,
  SpeakersContent,
} from '@/lib/home';

// Every raster in the CMS media tree, eagerly imported as ImageMetadata.
// Uppercase variants guard legacy uploads; `rename: safe` in .pages.yml
// slugifies (and lowercases) everything uploaded from now on.
const rasters = import.meta.glob<{ default: ImageMetadata }>(
  '/src/assets/images/**/*.{png,PNG,jpg,JPG,jpeg,JPEG,webp,WEBP,avif,AVIF,gif,GIF}',
  { eager: true },
);

// SVGs pass through untouched — hashed URL only, no resize/re-encode.
const svgs = import.meta.glob<string>('/src/assets/images/**/*.{svg,SVG}', {
  eager: true,
  query: '?url',
  import: 'default',
});

/** Serializable optimized image, ready to spread onto an `<img>`. */
export type ResolvedImage = {
  /** Optimized fallback URL — '' when the CMS field was cleared. */
  src: string;
  /** Absent for SVGs and external URLs. */
  srcSet?: string;
  sizes?: string;
  /** Intrinsic dimensions of the fallback rendition (CLS hint). */
  width?: number;
  height?: number;
};

/** A media field ({ src, alt }) with the src resolved. */
export type ResolvedMedia = ResolvedImage & { alt: string };

/**
 * Output widths + the `sizes` attribute for one usage. Widths above the
 * source's intrinsic width are dropped (never upscale); widths are ascending.
 */
export type Policy = { widths: number[]; sizes?: string };

// Rendered sizes derived from the actual layout (container maxes out at
// 1432px): hero gallery cell = half container / 3 cols ≈ 233px; speaker cards
// are 3/4/5-across; framed partner logos are 128/160px boxes; marquee boxes
// 128×96; conference tiles span 2 of 4 grid columns ≈ 660px; the CTA photo is
// full-bleed behind a scrim. 2× variants cover retina.
const POLICIES = {
  heroCell: {
    widths: [256, 512, 768],
    sizes: '(min-width: 1024px) 233px, 33vw',
  },
  speaker: {
    widths: [280, 560, 840],
    sizes: '(min-width: 1024px) 268px, (min-width: 768px) 24vw, 32vw',
  },
  partnerFrame: { widths: [160, 320], sizes: '(min-width: 768px) 160px, 128px' },
  partnerMarquee: { widths: [128, 256], sizes: '128px' },
  tile: {
    widths: [480, 720, 1080],
    sizes: '(min-width: 1024px) 660px, 100vw',
  },
  ctaBackground: { widths: [640, 1080], sizes: '100vw' },
} satisfies Record<string, Policy>;

/** '/images/foo/bar.png' → '/src/assets/images/foo/bar.png' */
const toKey = (path: string) => '/src/assets/images/' + path.slice('/images/'.length);

export async function resolveImage(
  path: string,
  policy?: Policy,
): Promise<ResolvedImage> {
  // Cleared CMS field — sections already guard on a truthy src.
  if (!path) return { src: '' };
  // External or non-CMS URL: pass through untouched.
  if (!path.startsWith('/images/')) return { src: path };

  const key = toKey(path);
  if (key in svgs) return { src: svgs[key] };

  const mod = rasters[key];
  if (!mod) {
    throw new Error(
      `Image referenced by content is missing: "${path}" — expected a file at ` +
        `"${key.slice(1)}". Re-upload it via Pages CMS or fix the path in ` +
        `src/content/*.json.`,
    );
  }

  const meta = mod.default;
  const widths = (policy?.widths ?? [meta.width]).filter(
    (w) => w <= meta.width,
  );
  if (widths.length === 0) widths.push(meta.width);

  const img = await getImage({
    src: meta,
    widths,
    width: widths[widths.length - 1],
    format: 'webp',
  });

  return {
    src: img.src,
    srcSet: img.srcSet.attribute || undefined,
    sizes: policy?.sizes,
    width: Number(img.attributes.width) || undefined,
    height: Number(img.attributes.height) || undefined,
  };
}

/** Single small rendition as a bare URL (vision hover previews). */
export async function resolveUrl(path: string, width: number): Promise<string> {
  const resolved = await resolveImage(path, { widths: [width] });
  return resolved.src;
}

export const resolveMedia = async (
  media: { src: string; alt: string },
  policy: Policy,
): Promise<ResolvedMedia> => ({
  ...(await resolveImage(media.src, policy)),
  alt: media.alt,
});

// ------------------------------------------------------------------ overlays
// Pure type overlays on the zod-inferred content types from lib/home.ts (which
// stays the single source of truth for the raw JSON shape).

export type ResolvedHeroContent = Omit<HeroContent, 'gallery'> & {
  gallery: ResolvedImage[];
};
export type ResolvedSpeaker = Omit<Speaker, 'portrait'> & {
  portrait: ResolvedImage;
};
export type ResolvedSpeakersContent = Omit<SpeakersContent, 'items'> & {
  items: ResolvedSpeaker[];
};
export type ResolvedPartnerLogo = Omit<PartnerLogo, 'src'> & {
  src: ResolvedImage;
};
export type ResolvedPartnersContent = Omit<PartnersContent, 'items'> & {
  items: ResolvedPartnerLogo[];
};
export type ResolvedConferenceTile = Omit<
  ConferenceContent['tiles'][number],
  'image'
> & { image: ResolvedMedia };
export type ResolvedConferenceContent = Omit<ConferenceContent, 'tiles'> & {
  tiles: ResolvedConferenceTile[];
};
export type ResolvedFinalCtaContent = Omit<FinalCtaContent, 'image'> & {
  image: ResolvedMedia;
};
export type ResolvedHomeContent = Omit<
  HomeContent,
  'hero' | 'conference' | 'speakers' | 'partners' | 'finalCta'
> & {
  hero: ResolvedHeroContent;
  conference: ResolvedConferenceContent;
  speakers: ResolvedSpeakersContent;
  partners: ResolvedPartnersContent;
  finalCta: ResolvedFinalCtaContent;
};

/** Resolve every image path in the homepage content. Call from index.astro. */
export async function resolveHomeImages(
  home: HomeContent,
): Promise<ResolvedHomeContent> {
  const [gallery, speakerItems, partnerItems, tiles, ctaImage, highlights] =
    await Promise.all([
      Promise.all(
        home.hero.gallery.map((src) => resolveImage(src, POLICIES.heroCell)),
      ),
      Promise.all(
        home.speakers.items.map(async (s) => ({
          ...s,
          portrait: await resolveImage(s.portrait, POLICIES.speaker),
        })),
      ),
      Promise.all(
        home.partners.items.map(async (p) => ({
          ...p,
          src: await resolveImage(
            p.src,
            p.tier === 'regular'
              ? POLICIES.partnerMarquee
              : POLICIES.partnerFrame,
          ),
        })),
      ),
      Promise.all(
        home.conference.tiles.map(async (t) => ({
          ...t,
          image: await resolveMedia(t.image, POLICIES.tile),
        })),
      ),
      resolveMedia(home.finalCta.image, POLICIES.ctaBackground),
      // Vision hover previews render at 200×125 CSS px — one 400w (2×)
      // rendition as a bare URL keeps vision.tsx/link-preview.tsx unchanged.
      Promise.all(
        home.vision.highlights.map(async (h) => ({
          ...h,
          image: h.image ? await resolveUrl(h.image, 400) : h.image,
        })),
      ),
    ]);

  return {
    ...home,
    hero: { ...home.hero, gallery },
    vision: { ...home.vision, highlights },
    conference: { ...home.conference, tiles },
    speakers: { ...home.speakers, items: speakerItems },
    partners: { ...home.partners, items: partnerItems },
    finalCta: { ...home.finalCta, image: ctaImage },
  };
}
