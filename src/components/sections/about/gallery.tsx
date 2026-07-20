'use client';

import { motion, useReducedMotion } from 'motion/react';

import type { ResolvedGalleryContent } from '@/lib/images-about';

// Adapted from @shadcnblocks/gallery30 (user pick, 2026-07-20): a centred
// statement with community photos scattered around it, each one draggable.
// The block's furniture is kept — the type treatment, the entrance spring, the
// drag — but the arrangement is ours (user direction, 2026-07-20: "spread the
// photos out more, the text should be visible… make it where the photos form
// an unorganized circle"). The block's own layout was a fixed-pixel scatter
// anchored to the section's edges, which meant the tiles closed in on the
// statement as the viewport narrowed and sat on top of it by 1024px.
//
// TWO IDEAS DO THE WORK HERE.
//
// 1. A ring, not a scatter. Every photo is placed by its CENTRE at a
//    percentage of the container, out on a rough ellipse around the middle.
//    Percentages, not pixels, so the ring breathes with the container instead
//    of collapsing inward — the clear middle stays proportionally the same at
//    every width, which is what keeps the text readable. The angles and radii
//    are deliberately uneven (that is the "unorganized" part); a regular
//    polygon of photos reads as a clock face.
//
// 2. Photos keep their own shape. The block forced every photo into a fixed
//    w×h box with object-cover, which hard-crops landscape event photography
//    into portrait slots — heads sliced off, rooms reduced to a wall. Here
//    only the WIDTH is set and the height follows the image's intrinsic
//    ratio, so each photo is shown as it was taken and the ring gets its
//    irregular silhouette from the pictures themselves rather than from
//    arbitrary crop boxes. Intrinsic width/height still go on the <img>, so
//    the space is reserved before the pixels land (no layout shift).
//
// Widths are percentages of the container too, so the whole composition
// scales as one. Below md only the first four show, placed above and below
// the statement rather than around it — at phone widths the text fills the
// middle and there is no ring to be had.
//
// If you re-tune a position, re-check that no photo overlaps the heading or
// the paragraph across the width range; that is the constraint the whole
// arrangement exists to satisfy.
// NOTE the percentages are of the CONTAINER, not the section — the section's
// vertical padding is outside it. On a phone that padding takes a big bite, so
// the section carries a tall min-height below md purely to give the four
// photos somewhere to sit clear of the statement.
const RING = [
  'left-[22%] top-[11%] w-[40%] -rotate-6 md:left-[12%] md:top-[19%] md:w-[15%]',
  'left-[76%] top-[18%] w-[38%] rotate-5 md:left-[33%] md:top-[9%] md:w-[18%]',
  'left-[20%] top-[89%] w-[38%] rotate-3 md:left-[64%] md:top-[11%] md:w-[13%]',
  'left-[78%] top-[82%] w-[40%] -rotate-4 md:left-[88%] md:top-[24%] md:w-[17%]',
  'hidden md:block md:left-[92%] md:top-[63%] md:w-[14%] -rotate-5',
  'hidden md:block md:left-[72%] md:top-[88%] md:w-[19%] rotate-3',
  'hidden md:block md:left-[36%] md:top-[90%] md:w-[16%] -rotate-7',
  'hidden md:block md:left-[9%] md:top-[68%] md:w-[14%] rotate-6',
];

function Gallery({ content }: { content: ResolvedGalleryContent }) {
  const { heading, body, photos } = content;
  const reduce = useReducedMotion();

  // Photos fill the ring in CMS order. The block shuffled them on mount, so
  // the arrangement changed on every visit and the editor's ordering meant
  // nothing (user decision, 2026-07-20: fixed order). Without the shuffle
  // there is no state or effect, so the ring is server-rendered rather than
  // appearing only once the island hydrates.
  const shots = photos.filter((p) => p.src).slice(0, RING.length);

  return (
    <section
      id="gallery"
      className="relative flex min-h-[780px] scroll-mt-24 flex-col overflow-hidden py-24 md:h-svh md:max-h-[1100px] md:py-32"
    >
      {/* flex-1, not h-full: below md the section has only a min-height, and a
          percentage height resolves against the parent's HEIGHT — which is
          auto there, so h-full silently collapsed this to the text's own 140px
          and every ring percentage was computed against that. Growing as a
          flex child gives it a real height at every width. */}
      <div className="relative container flex w-full flex-1 items-center justify-center">
        {/* The ring sits under the statement; `inset-0` makes the container the
            positioning context so every left/top percentage is a share of it. */}
        <ul className="absolute inset-0">
          {shots.map((photo, i) => (
            <li
              key={`${photo.src}-${i}`}
              // -translate-*-1/2 centres the photo on its coordinate, so a
              // position reads as "where this photo sits", not "where its
              // top-left corner lands" — much easier to reason about on a ring.
              className={`absolute -translate-x-1/2 -translate-y-1/2 ${RING[i]}`}
            >
              <motion.div
                drag
                initial={reduce ? false : { opacity: 0, scale: 0.85 }}
                // `animate`, not `whileInView`: the in-view variant drives the
                // same transform the drag gesture writes to, so with
                // whileInView the photos simply would not drag (verified — the
                // element got motion's drag styles but never a transform). The
                // island is client:visible, so it hydrates as the section
                // scrolls in and the entrance still plays on cue.
                animate={{ opacity: 1, scale: 1 }}
                transition={
                  reduce
                    ? { duration: 0 }
                    : {
                        duration: 0.5,
                        type: 'spring',
                        bounce: 0.2,
                        delay: i * 0.06,
                      }
                }
                whileDrag={{ zIndex: 20 }}
              >
                <img
                  src={photo.src}
                  srcSet={photo.srcSet}
                  sizes={photo.sizes}
                  width={photo.width}
                  height={photo.height}
                  loading="lazy"
                  decoding="async"
                  alt={photo.alt}
                  // Images are natively draggable, and that native drag-and-drop
                  // hijacks the pointer before motion's gesture ever starts —
                  // the photos looked draggable and weren't. The block dodged
                  // this by making the img pointer-events-none; turning the
                  // native behaviour off keeps the grab cursor on the photo.
                  draggable={false}
                  className="h-auto w-full cursor-grab rounded-sm shadow-lg active:cursor-grabbing"
                />
              </motion.div>
            </li>
          ))}
        </ul>

        <div className="relative z-10 flex flex-col items-center justify-center gap-5">
          {heading && (
            <h2 className="max-w-xl text-center text-4xl font-medium tracking-tighter uppercase lg:text-6xl">
              {heading}
            </h2>
          )}
          {body && (
            // The block sets text-muted-foreground/70, which lands at 3.36:1 on
            // white — under the 4.5:1 minimum, and it is body copy at 14/16px.
            // Dropping the /70 takes it to 6.75:1.
            <p className="text-muted-foreground max-w-md text-center text-sm lg:text-base">
              {body}
            </p>
          )}
        </div>
      </div>
    </section>
  );
}

export default Gallery;
