'use client';

import { useEffect, useRef, useState } from 'react';

import type { ResolvedStoryContent } from '@/lib/images-about';
import { cn } from '@/lib/utils';

// The story so far — adapted from @shadcnblocks/timeline14 (user pick,
// 2026-07-19, replacing the about6 prose-and-photos layout): full-width
// milestone rows under a sticky index/date bar; scrolling drives the bar's
// counter and the rows' emphasis. Adaptations: the block's h1 becomes the
// section h2 (the page's h1 lives in the intro band), the block's
// IntersectionObserver is replaced by a rAF-throttled scroll measure (the
// observer flagged rows at mid-viewport, so the bar named a row half a
// screen below itself — user bug report, 2026-07-19), and each row carries
// an sr-only date — the block shows dates only in the bar, which a screen
// reader linearises away from the rows.
function Story({ content }: { content: ResolvedStoryContent }) {
  const { heading, milestones } = content;
  const rows = milestones.filter((m) => m.title);
  const [activeIndex, setActiveIndex] = useState(0);
  const itemRefs = useRef<(HTMLLIElement | null)[]>([]);

  useEffect(() => {
    // Active row = the LAST one whose top edge has passed 40% of the
    // viewport height — the row whose content the reader is looking at.
    // A fixed line just under the bar lags perceptibly: rows meet padding-to-
    // padding, so a ~160px dead zone of whitespace sits under the bar while
    // the next row's image and heading already fill the screen. Deterministic
    // where an IntersectionObserver band is not: two tall rows can straddle a
    // band at once, and whichever crossed an edge last would win. Above the
    // timeline the index clamps to 0, so scrolling to the top always lands
    // on the first year.
    let raf = 0;
    const update = () => {
      raf = 0;
      const line = window.innerHeight * 0.4;
      let index = 0;
      itemRefs.current.slice(0, rows.length).forEach((ref, i) => {
        if (ref && ref.getBoundingClientRect().top <= line) index = i;
      });
      setActiveIndex(index);
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };

    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [rows.length]);

  return (
    // No overflow-hidden on this shell, unlike the other section shells: an
    // overflow-hidden ancestor disables position:sticky and would kill the
    // date bar below.
    <section id="story" className="section-padding scroll-mt-24">
      <div className="container">
        {heading && (
          <h2 className="max-w-3xl text-4xl leading-[1.05] font-light tracking-tight text-balance md:text-5xl">
            {heading}
          </h2>
        )}
      </div>

      {rows.length > 0 && (
        <div className="relative mt-10 md:mt-12">
          {/* Sticky counter: item index left, its date right. Pinned to the
              very top of the viewport (user decision, 2026-07-19): when the
              floating navbar reappears on upward scroll it sits INSIDE this
              bar — 86px = the navbar's 12px offset + its 62px pill + an equal
              12px below (measured from navbar.tsx: mt-3 + p-2.5 + size-10
              content + borders). Change the pill, re-measure this. */}
          <div
            aria-hidden
            className="border-border bg-background sticky top-0 z-10 h-[86px] border-y"
          >
            <div className="container flex h-full items-center justify-between gap-4 font-mono text-2xl md:text-4xl">
              <p className="text-muted-foreground">
                {String(activeIndex + 1).padStart(2, '0')}
              </p>
              <p>{rows[activeIndex]?.date}</p>
            </div>
          </div>

          <div className="container">
            <ol className="flex flex-col">
              {rows.map((milestone, index) => (
                <li
                  key={index}
                  ref={(el) => {
                    itemRefs.current[index] = el;
                  }}
                  className="flex flex-col items-center gap-7 py-14 md:flex-row md:gap-10 md:py-20"
                >
                  {/* The block dims whole inactive rows to 50%; here the photo
                      takes the full dim but the text floor is 85% — 50% drops
                      muted-foreground body copy to ~2.2:1 against the canvas,
                      under the 4.5:1 minimum, and the pre-hydration HTML ships
                      rows 2+ in the inactive state. 85% clears 4.5:1 on every
                      palette (checked); don't lower it without redoing the
                      contrast math. */}
                  {milestone.image.src && (
                    <img
                      src={milestone.image.src}
                      srcSet={milestone.image.srcSet}
                      sizes={milestone.image.sizes}
                      loading="lazy"
                      decoding="async"
                      alt={milestone.image.alt}
                      className={cn(
                        'border-border aspect-[16/12] w-full rounded-lg border object-cover opacity-50 transition-opacity duration-300 md:w-1/3 md:max-w-[440px]',
                        index === activeIndex && 'opacity-100',
                      )}
                    />
                  )}
                  <div
                    className={cn(
                      'opacity-85 transition-opacity duration-300',
                      index === activeIndex && 'opacity-100',
                    )}
                  >
                    <h3 className="mb-3 text-2xl font-medium tracking-tight text-pretty md:mb-4 md:text-4xl">
                      <span className="sr-only">{milestone.date}: </span>
                      {milestone.title}
                    </h3>
                    {milestone.body && (
                      <p className="text-muted-foreground leading-relaxed text-pretty md:text-balance">
                        {milestone.body}
                      </p>
                    )}
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      )}
    </section>
  );
}

export default Story;
