// Build-time image resolution for the About page.
//
// Sibling of lib/images.ts, which owns the asset globs and the primitives
// (resolveImage / resolveMedia / the ResolvedImage types). Only the policy
// table and the page-shaped resolver live here, because a policy's widths and
// `sizes` are derived from that page's real rendered layout — there is no
// generic answer, which is why this is a per-page file rather than a recursive
// walker. Import ONLY from server code (about.astro); components may use
// `import type` for the Resolved* types.
import type { AboutContent, GalleryContent, StoryContent } from '@/lib/about';
import { type Policy, type ResolvedMedia, resolveMedia } from '@/lib/images';

// Rendered sizes derived from the actual layout (container maxes out at
// 1432px): timeline milestone photos cap at 440px on desktop and run
// near-full width on mobile. 2× variants cover retina.
const POLICIES = {
  milestonePhoto: {
    widths: [480, 880],
    sizes: '(min-width: 768px) 440px, 90vw',
  },
  // The community photo ring. Each photo is sized by width alone (its height
  // follows its own aspect ratio), and that width is a share of the container:
  // 13–19% from md, 34–36% below it. The container caps at 1432px, so the
  // widest photo renders around 272px; 320/640 covers that at 1× and 2×.
  galleryPhoto: {
    widths: [320, 640],
    sizes: '(min-width: 768px) 19vw, 36vw',
  },
} satisfies Record<string, Policy>;

export type ResolvedMilestone = Omit<
  StoryContent['milestones'][number],
  'image'
> & { image: ResolvedMedia };
export type ResolvedStoryContent = Omit<StoryContent, 'milestones'> & {
  milestones: ResolvedMilestone[];
};
export type ResolvedGalleryContent = Omit<GalleryContent, 'photos'> & {
  photos: ResolvedMedia[];
};
export type ResolvedAboutContent = Omit<AboutContent, 'story' | 'gallery'> & {
  story: ResolvedStoryContent;
  gallery: ResolvedGalleryContent;
};

/** Resolve every image path in the About content. Call from about.astro. */
export async function resolveAboutImages(
  about: AboutContent,
): Promise<ResolvedAboutContent> {
  const [milestones, galleryPhotos] = await Promise.all([
    Promise.all(
      about.story.milestones.map(async (m) => ({
        ...m,
        image: await resolveMedia(m.image, POLICIES.milestonePhoto),
      })),
    ),
    Promise.all(
      about.gallery.photos.map((photo) =>
        resolveMedia(photo, POLICIES.galleryPhoto),
      ),
    ),
  ]);

  return {
    ...about,
    story: { ...about.story, milestones },
    gallery: { ...about.gallery, photos: galleryPhotos },
  };
}
