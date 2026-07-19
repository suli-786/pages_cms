// Build-time image resolution for the About page.
//
// Sibling of lib/images.ts, which owns the asset globs and the primitives
// (resolveImage / resolveMedia / the ResolvedImage types). Only the policy
// table and the page-shaped resolver live here, because a policy's widths and
// `sizes` are derived from that page's real rendered layout — there is no
// generic answer, which is why this is a per-page file rather than a recursive
// walker. Import ONLY from server code (about.astro); components may use
// `import type` for the Resolved* types.
import type {
  AboutContent,
  JoinContent,
  StoryContent,
  TeamContent,
} from '@/lib/about';
import { type Policy, type ResolvedMedia, resolveMedia } from '@/lib/images';

// Rendered sizes derived from the actual layout (container maxes out at
// 1432px): timeline milestone photos cap at 440px on desktop and run
// near-full width on mobile; team photos sit in a 2/3-column grid; the join
// photo is full-bleed behind a scrim. 2× variants cover retina.
const POLICIES = {
  milestonePhoto: {
    widths: [480, 880],
    sizes: '(min-width: 768px) 440px, 90vw',
  },
  teamPhoto: {
    widths: [480, 880],
    sizes: '(min-width: 768px) 33vw, 50vw',
  },
  // The closing join grid: full width (1 col) below sm, 2 cols to md, 3 above.
  joinPhoto: {
    widths: [480, 960],
    sizes: '(min-width: 768px) 33vw, (min-width: 640px) 50vw, 100vw',
  },
} satisfies Record<string, Policy>;

export type ResolvedMilestone = Omit<
  StoryContent['milestones'][number],
  'image'
> & { image: ResolvedMedia };
export type ResolvedStoryContent = Omit<StoryContent, 'milestones'> & {
  milestones: ResolvedMilestone[];
};
export type ResolvedTeamContent = Omit<TeamContent, 'photos'> & {
  photos: ResolvedMedia[];
};
export type ResolvedJoinContent = Omit<JoinContent, 'photos'> & {
  photos: ResolvedMedia[];
};
export type ResolvedAboutContent = Omit<
  AboutContent,
  'story' | 'team' | 'join'
> & {
  story: ResolvedStoryContent;
  team: ResolvedTeamContent;
  join: ResolvedJoinContent;
};

/** Resolve every image path in the About content. Call from about.astro. */
export async function resolveAboutImages(
  about: AboutContent,
): Promise<ResolvedAboutContent> {
  const [milestones, teamPhotos, joinPhotos] = await Promise.all([
    Promise.all(
      about.story.milestones.map(async (m) => ({
        ...m,
        image: await resolveMedia(m.image, POLICIES.milestonePhoto),
      })),
    ),
    Promise.all(
      about.team.photos.map((photo) =>
        resolveMedia(photo, POLICIES.teamPhoto),
      ),
    ),
    Promise.all(
      about.join.photos.map((photo) =>
        resolveMedia(photo, POLICIES.joinPhoto),
      ),
    ),
  ]);

  return {
    ...about,
    story: { ...about.story, milestones },
    team: { ...about.team, photos: teamPhotos },
    join: { ...about.join, photos: joinPhotos },
  };
}
