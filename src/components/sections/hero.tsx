'use client';

import { useEffect, useState } from 'react';

import { CalendarDays, MapPin, type LucideIcon } from 'lucide-react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';

import { CtaButton } from '@/components/elements/cta-button';
import { renderEmphasis } from '@/components/elements/emphasis';
import type { ResolvedHeroContent, ResolvedImage } from '@/lib/images';
import { cn } from '@/lib/utils';

// Adapted from @shadcnblocks/hero272: a split layout with a stacked, divided
// left column and a nine-cell photo grid that rotates on a timer. The two left
// bands carry the conference's pitch — the bracket-framed statement, and the
// ticket CTA with the date/venue beside it.
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

            {/* Band 2 — when/where, then the ticket CTA as the band's closing
                action. Removing band 3 gave this band roughly half the column
                instead of a third, so everything steps up: the details read as
                real typography rather than a caption, and the button is
                unmistakably the hero's primary action.

                The details and the button take separate rows rather than
                sharing one wrapping line. At these sizes a single row
                overflows the band from lg (the band is half the grid, so its
                width doesn't track the viewport) and would wrap at some widths
                but not others — two rows behave identically at every width and
                give the button its own weight.

                Phone: details stack vertically above a full-width button —
                side-by-side details need ~269px against the 238px of band
                available at 320px, so stacking is what keeps 320px free of
                horizontal scroll. From sm the details sit on one line. */}
            <div className="flex flex-1 flex-col justify-center p-6 md:p-8">
              <div className="flex flex-col items-stretch gap-6 sm:items-start md:gap-8">
                {eventDetails.length > 0 && (
                  <ul className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-x-10 md:gap-x-14">
                    {eventDetails.map((d, i) => {
                      const Icon = detailIcons[i] ?? CalendarDays;
                      return (
                        <li
                          key={`${d.label}-${i}`}
                          className="flex items-center gap-2.5 sm:gap-3"
                        >
                          <Icon
                            aria-hidden
                            className="text-accent size-5 shrink-0 sm:size-6 md:size-7"
                            strokeWidth={1.5}
                          />
                          {/* Label as an eyebrow above the value. It is now
                              visible at every width — the vertical stack on a
                              phone has the room the old single-line band did
                              not, so the icon no longer has to carry the
                              meaning alone visually. */}
                          <span>
                            <span className="text-foreground/55 block text-[11px] tracking-[0.16em] uppercase sm:text-xs">
                              {d.label}
                            </span>
                            <span className="block text-base font-medium whitespace-nowrap sm:text-lg md:text-xl">
                              {d.value}
                            </span>
                          </span>
                        </li>
                      );
                    })}
                  </ul>
                )}
                {/* Full-width on a phone (a 52px-tall edge-to-edge target),
                    natural width from sm. The arrow is scaled up with the
                    button — CtaButton hard-codes size-4 on it, which reads as
                    undersized next to text-lg. */}
                <CtaButton
                  size="lg"
                  className="h-13 w-full px-6 text-sm [&_svg]:size-5 sm:h-14 sm:w-auto sm:px-8 sm:text-base md:h-16 md:px-10 md:text-lg md:[&_svg]:size-6"
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
