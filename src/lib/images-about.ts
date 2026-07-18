// Build-time image resolution for the About page.
//
// Sibling of lib/images.ts, which owns the asset globs and the primitives
// (resolveImage / resolveMedia / the ResolvedImage types). Only the policy
// table and the page-shaped resolver live here, because a policy's widths and
// `sizes` are derived from that page's real rendered layout — there is no
// generic answer, which is why this is a per-page file rather than a recursive
// walker. Import ONLY from server code (about.astro); components may use
// `import type` for the Resolved* types.
import type { AboutContent, JoinContent, StoryContent } from '@/lib/about';
import { type Policy, type ResolvedMedia, resolveMedia } from '@/lib/images';

// Rendered sizes derived from the actual layout (container maxes out at
// 1432px): story photos sit in a staggered grid taking ~40% of the container on
// desktop and near-full width on mobile; the join photo is full-bleed behind a
// scrim. 2× variants cover retina.
const POLICIES = {
  storyPhoto: {
    widths: [400, 800, 1200],
    sizes: '(min-width: 1024px) 40vw, 90vw',
  },
  joinBackground: { widths: [640, 1080], sizes: '100vw' },
} satisfies Record<string, Policy>;

export type ResolvedStoryContent = Omit<StoryContent, 'photos'> & {
  photos: ResolvedMedia[];
};
export type ResolvedJoinContent = Omit<JoinContent, 'image'> & {
  image: ResolvedMedia;
};
export type ResolvedAboutContent = Omit<AboutContent, 'story' | 'join'> & {
  story: ResolvedStoryContent;
  join: ResolvedJoinContent;
};

/** Resolve every image path in the About content. Call from about.astro. */
export async function resolveAboutImages(
  about: AboutContent,
): Promise<ResolvedAboutContent> {
  const [photos, joinImage] = await Promise.all([
    Promise.all(
      about.story.photos.map((photo) =>
        resolveMedia(photo, POLICIES.storyPhoto),
      ),
    ),
    resolveMedia(about.join.image, POLICIES.joinBackground),
  ]);

  return {
    ...about,
    story: { ...about.story, photos },
    join: { ...about.join, image: joinImage },
  };
}
