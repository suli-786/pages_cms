'use client';

import { useEffect, useState } from 'react';

import { CalendarDays, MapPin, type LucideIcon } from 'lucide-react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';

import { CtaButton } from '@/components/elements/cta-button';
import { renderEmphasis } from '@/components/elements/emphasis';
import type { ResolvedHeroContent, ResolvedImage } from '@/lib/images';
import { cn } from '@/lib/utils';

// Adapted from @shadcnblocks/hero272, restructured (user decision, 2026-08-03).
//
// The frame is a plate + a rail:
//   plate → the bracket-framed statement (left) and the rotating photo grid
//           (right), side by side from lg
//   rail  → a full-frame-width row beneath both, carrying the hard facts and
//           the action as hairline-divided cells: DATE | VENUE | Get Tickets
//
// Why the rail spans the whole frame rather than sitting in the left column,
// as it used to: the left column is HALF the grid from lg, so it is *narrower*
// at 1024px (430px) than at 768px (670px) — the band lost width exactly as the
// screen gained it. One line of date + venue + button needs ~619px at the
// sizes we want, which never fit that column below 1536px. Spanning the frame
// turns 430px into ~990px at 1024px and makes the available width grow
// monotonically with the viewport, so the cliff stops existing and the type
// can get bigger on desktop instead of smaller.
//
// DOM order is headline → rail → photos, which is also the mobile visual
// order: the ticket CTA stays above the fold instead of being buried under the
// photo grid. From lg the three are placed explicitly onto a 2×2 grid. The
// photo grid is decorative and aria-hidden, so keeping it last costs nothing
// for assistive tech and puts the CTA earlier in the tab order.
const GRID_SIZE = 9;
const ROTATION_INTERVAL = 7000; // ms

// Icons for the event-details strip, matched to eventDetails by position.
const detailIcons: LucideIcon[] = [CalendarDays, MapPin];

function Hero({ content }: { content: ResolvedHeroContent }) {
  const { title, eventDetails = [], primaryCta, gallery = [] } = content;

  const galleryImages = gallery.filter((g) => g.src);
  const hasGallery = galleryImages.length > 0;

  return (
    <section className="dark bg-background text-foreground relative overflow-hidden">
      <div className="container pt-28 pb-14 md:pt-36 md:pb-16 lg:pt-40 lg:pb-20">
        <div
          className={
            hasGallery
              ? 'border-foreground/10 lg:divide-foreground/10 grid border lg:grid-cols-2 lg:divide-x'
              : 'border-foreground/10 grid border'
          }
        >
          <div className="divide-foreground/10 flex min-w-0 flex-col divide-y">
            {/* Band 1 — the statement inside a large viewfinder frame: two long
                accent arms (roughly half the frame each, like the partners
                spotlight device) pinned to the frame's top-right and
                bottom-left corners. The heading sits centred between them —
                equal padding on every side — and the padding also guarantees
                the arms never touch the text at any width. */}
            <div className="flex flex-1 flex-col justify-center p-6 md:p-8">
              <div className="relative p-5 sm:p-7 md:p-9">
                <h1 className="text-foreground/60 max-w-3xl text-4xl tracking-tight text-balance md:text-5xl lg:text-6xl">
                  {renderEmphasis(title)}
                </h1>
                <span
                  aria-hidden
                  className="border-accent absolute top-0 right-0 h-[46%] w-[26%] border-t-2 border-r-2"
                />
                <span
                  aria-hidden
                  className="border-accent absolute bottom-0 left-0 h-[46%] w-[26%] border-b-2 border-l-2"
                />
              </div>
            </div>

            {/* Band 2 — date, venue and the ticket button, always on one line.
                No dividers: this is one row of the band, not a table.

                Everything here sizes off the BAND's own width (@container/band)
                rather than the viewport, because the two disagree: the band is
                half the grid from lg, so it is 670px wide at a 768px viewport
                but only 430px at 1024px. It gets NARROWER as the screen gets
                wider. A viewport breakpoint would therefore set the type from
                the wrong number and overflow at exactly 1024px; a container
                query reads the space that actually exists.

                Thresholds, against measured band widths
                (320→238, 360→278, 375→293, 640→558, 768→670, 900→802,
                1023→925, 1024→430, 1280→558, 1440→634, 1536→634):
                  <400px  short values ("7 Nov 2026" / "JHB"), 14px, no arrow
                  ≥400px  full values, 14px      — this is the 1024px case
                  ≥520px  full values, 16px
                  ≥600px  full values, 20px      — this is the common
                          1440-1920px desktop case (band plateaus at 634px:
                          used width at this tier measures 532px, so 102px of
                          margin — was previously stuck one tier down at 16px
                          only because the old 660px threshold missed 634px by
                          26px, wasting that headroom)
                  ≥800px  full values, 20px, larger icon/button chrome — the
                          768-1023px single-column zone, which has 270-390px
                          to spare even at the 600px tier
                Below ~340px of band there is no arrangement that fits, so the
                row wraps rather than overflowing — horizontal scroll at 320px
                would fail WCAG 1.4.10 Reflow; wrapping does not. */}
            <div className="@container/band flex flex-col justify-center p-6 md:p-8">
              <div className="flex flex-wrap items-center gap-x-2 gap-y-4 @[400px]/band:gap-x-3 @[520px]/band:gap-x-6 @[600px]/band:gap-x-8 @[800px]/band:gap-x-10">
                {eventDetails.length > 0 && (
                  <ul className="flex shrink-0 items-center gap-x-2 @[400px]/band:gap-x-3 @[520px]/band:gap-x-6 @[600px]/band:gap-x-8 @[800px]/band:gap-x-10">
                    {eventDetails.map((d, i) => {
                      const Icon = detailIcons[i] ?? CalendarDays;
                      return (
                        <li
                          key={`${d.label}-${i}`}
                          className="flex items-center gap-1.5 @[400px]/band:gap-2 @[520px]/band:gap-3 @[800px]/band:gap-4"
                        >
                          <Icon
                            aria-hidden
                            className="text-accent size-4 shrink-0 @[520px]/band:size-5 @[600px]/band:size-6 @[800px]/band:size-7"
                            strokeWidth={1.5}
                          />
                          <span>
                            <span className="text-foreground/55 block text-[10px] tracking-[0.16em] uppercase @[520px]/band:text-[11px]">
                              {d.label}
                            </span>
                            {/* The short form is a separate element rather than
                                a swapped string: `hidden` drops the unused one
                                out of the accessibility tree, so a screen
                                reader reads exactly one value, never both.
                                Falls back to the full value when the CMS has
                                no short form. */}
                            <span className="block text-sm font-medium whitespace-nowrap @[520px]/band:text-base @[600px]/band:text-xl">
                              <span className="@[400px]/band:hidden">
                                {d.short || d.value}
                              </span>
                              <span className="hidden @[400px]/band:inline">
                                {d.value}
                              </span>
                            </span>
                          </span>
                        </li>
                      );
                    })}
                  </ul>
                )}
                {/* The arrow only appears once the band can afford it — it
                    costs ~24px, which is the difference between fitting and
                    not at 360px. h-11 keeps a 44px touch target at every
                    width (WCAG 2.5.8). */}
                <CtaButton
                  size="lg"
                  className="h-11 shrink-0 px-2.5 text-sm [&_svg]:hidden @[400px]/band:px-3 @[400px]/band:[&_svg]:inline @[400px]/band:[&_svg]:size-4 @[520px]/band:h-12 @[520px]/band:px-6 @[600px]/band:h-14 @[600px]/band:px-8 @[600px]/band:text-base @[600px]/band:[&_svg]:size-5 @[800px]/band:h-16 @[800px]/band:px-10 @[800px]/band:[&_svg]:size-6"
                  cta={primaryCta}
                />
              </div>
            </div>
          </div>

          {/* Rotating photo grid — ambient event imagery, hidden from AT */}
          {hasGallery && (
            <div
              aria-hidden
              className="max-lg:border-foreground/10 min-w-0 max-lg:border-t"
            >
              <PhotoGrid gallery={galleryImages} />
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

function PhotoGrid({ gallery }: { gallery: ResolvedImage[] }) {
  const [startIndex, setStartIndex] = useState(0);
  const reducedMotion = useReducedMotion();

  const canRotate = !reducedMotion && gallery.length > GRID_SIZE;

  useEffect(() => {
    if (!canRotate) return;
    const id = setInterval(() => {
      setStartIndex((prev) => (prev + GRID_SIZE) % gallery.length);
    }, ROTATION_INTERVAL);
    return () => clearInterval(id);
  }, [canRotate, gallery.length]);

  return (
    // Flush cells (no inner padding): the gallery can carry a 9-tile logo
    // mosaic (images/Home-carousal-logo) that must assemble seamlessly when
    // the rotation lands on it — padding visibly slices it apart. The 1px
    // hairline gap stays, matching the site's divider language.
    <div className="bg-foreground/10 grid h-full grid-cols-3 gap-px perspective-[1200px]">
      {Array.from({ length: GRID_SIZE }).map((_, cell) => {
        const img = gallery[(startIndex + cell) % gallery.length];
        return (
          // bg-background at FULL opacity, not /40. The grid behind carries
          // bg-foreground/10 to draw the 1px gap hairlines, and at 40% the
          // cell let that pale colour flood the whole tile — the logo SVGs are
          // transparent, so they sat on rgb(25,26,58) against a hero of
          // rgb(11,12,46) and read as nine lighter panels (user report,
          // 2026-07-20). Solid here, so only the gaps show the hairline.
          // Photos are unaffected either way: they cover the cell.
          <div key={cell} className="bg-background overflow-hidden">
            <div className="relative aspect-square h-full w-full">
              <AnimatePresence initial={false}>
                {/* Above the fold: stays eager so React 19's SSR preloads
                    these cells — now as small WebPs with imagesrcset. */}
                <motion.img
                  key={`${cell}-${img.src}`}
                  src={img.src}
                  srcSet={img.srcSet}
                  sizes={img.sizes}
                  alt=""
                  // Photos crop to fill; SVG mosaic tiles must map edge-to-edge
                  // instead — cells go non-square at many viewports, and cover
                  // would crop each tile differently, breaking the assembled
                  // logo's seams. Uniform stretch keeps them aligned.
                  className={cn(
                    'absolute inset-0 size-full',
                    img.src.endsWith('.svg') ? 'object-fill' : 'object-cover',
                  )}
                  initial={
                    reducedMotion ? { opacity: 1 } : { rotateY: 15, opacity: 0 }
                  }
                  animate={{ rotateY: 0, opacity: 1 }}
                  exit={
                    reducedMotion
                      ? { opacity: 0 }
                      : { rotateY: -10, opacity: 0 }
                  }
                  transition={{
                    duration: 0.6,
                    ease: 'easeInOut',
                    delay: reducedMotion ? 0 : cell * 0.09,
                  }}
                />
              </AnimatePresence>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default Hero;
