'use client';

import { useEffect, useState } from 'react';

import { CalendarDays, MapPin, type LucideIcon } from 'lucide-react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';

import { CtaButton } from '@/components/elements/cta-button';
import { renderEmphasis } from '@/components/elements/emphasis';
import { SocialGlyph } from '@/components/elements/social-icons';
import { SocialLinks } from '@/components/elements/social-links';
import type { ResolvedHeroContent, ResolvedImage } from '@/lib/images';
import type { SocialLink } from '@/lib/site';
import { cn, isExternal } from '@/lib/utils';

// Adapted from @shadcnblocks/hero272: a split layout with a stacked, divided
// left column and a nine-cell photo grid that rotates on a timer. The three
// left bands carry the conference's pitch — the bracket-framed statement, the
// ticket CTA with the date/venue beside it, and "stay connected" (the WhatsApp
// community invite + social links). Social links come from Site settings so
// the whole site shares one list.
const GRID_SIZE = 9;
const ROTATION_INTERVAL = 7000; // ms

// Icons for the event-details strip, matched to eventDetails by position.
const detailIcons: LucideIcon[] = [CalendarDays, MapPin];

function Hero({
  content,
  socials = [],
}: {
  content: ResolvedHeroContent;
  socials?: SocialLink[];
}) {
  const {
    title,
    eventDetails = [],
    primaryCta,
    community,
    socialsLabel,
    gallery = [],
  } = content;

  const galleryImages = gallery.filter((g) => g.src);
  const hasGallery = galleryImages.length > 0;
  const hasCommunity = Boolean(community.body || community.cta.label);
  // The `whatsapp` CMS token is already resolved to a real URL by lib/home.ts.
  const communityHref = community.cta.href;

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

            {/* Band 2 — the ticket CTA and when/where, left-packed on one line
                like the bands above and below it. Even gaps throughout — no
                justify-between, which stranded the venue at the far edge with
                dead space between. The row still wraps as a safety net rather
                than clipping: the band is half the grid from lg, so its width
                doesn't track the viewport's and a hard breakpoint would be
                wrong at some size. On a phone the details stack to keep the
                whole band on one line (see below); that holds down to 360px,
                and 320px falls back to wrapping — the content is 270px wide
                against 238px of band there, so nothing can straighten it. */}
            <div className="flex flex-1 flex-col justify-center p-6 md:p-8">
              <div className="flex flex-wrap items-center gap-x-5 gap-y-6 sm:gap-x-10">
                <CtaButton
                  size="lg"
                  className="shrink-0 px-4 text-[13px] sm:px-6 sm:text-sm"
                  cta={primaryCta}
                />
                {eventDetails.length > 0 && (
                  // On a phone the two details stack into the button's own
                  // height (h-12, justify-between spreads them top and bottom),
                  // so the band reads as one line: CTA, then when/where beside
                  // it. From sm there is room to lay them out side by side and
                  // the height constraint is dropped.
                  <ul className="flex h-12 flex-col justify-between sm:h-auto sm:flex-row sm:items-center sm:gap-x-10">
                    {eventDetails.map((d, i) => {
                      const Icon = detailIcons[i] ?? CalendarDays;
                      return (
                        <li
                          key={`${d.label}-${i}`}
                          className="flex items-center gap-2 sm:gap-2.5"
                        >
                          <Icon
                            aria-hidden
                            className="text-accent size-4 shrink-0 sm:size-5"
                            strokeWidth={1.5}
                          />
                          {/* The label is an eyebrow above the value from sm,
                              where both items then share one silhouette. On a
                              phone there is no room for a second line inside
                              the button's height, so it stays for screen
                              readers only and the icon carries it visually. */}
                          <span>
                            <span className="sm:text-foreground/55 sr-only sm:not-sr-only sm:block sm:text-[11px] sm:tracking-[0.16em] sm:uppercase">
                              {d.label}
                            </span>
                            <span className="block text-[13px] font-medium whitespace-nowrap sm:text-sm">
                              {d.value}
                            </span>
                          </span>
                        </li>
                      );
                    })}
                  </ul>
                )}
              </div>
            </div>

            {/* Band 3 — stay connected: the WhatsApp community invite moved down
                to sit with the social links. */}
            {((hasCommunity && community.cta.label && communityHref) ||
              socials.length > 0) && (
              <div className="flex flex-1 flex-col justify-center gap-4 p-6 md:p-8">
                {socialsLabel && (
                  <p className="text-foreground/70 text-sm font-medium tracking-tight">
                    {socialsLabel}
                  </p>
                )}
                {community.body && (
                  <p className="text-foreground/70 max-w-md text-sm text-pretty">
                    {community.body}
                  </p>
                )}
                {/* The WhatsApp community leads as a labelled pill — it's the
                    year-round invite, not one more platform icon — with the
                    Site-settings socials beside it. The row wraps between the
                    two; the icons themselves never wrap (`wrap={false}`), so
                    they hold one line at every width. Measured floors below sm
                    (size-8 icons, 1.5 gap, inside this band's padding): six
                    icons need a 304px viewport, seven need 342px, eight 380px.
                    Six is what Site settings ships, so a seventh platform
                    breaks 320px phones unless social-links.tsx' `md` sizes
                    come down with it. */}
                <div className="flex flex-wrap items-center gap-x-6 gap-y-4">
                  {hasCommunity && community.cta.label && communityHref && (
                    // Shrinkable, and the label wraps rather than being held on
                    // one line: at its natural width the pill is wider than the
                    // band's content box on a 320px phone, and pinning it would
                    // eat the band's right padding. Flex only shrinks it once
                    // the icons have wrapped to their own line, so the two never
                    // squeeze each other.
                    <a
                      href={communityHref}
                      {...(isExternal(communityHref)
                        ? { target: '_blank', rel: 'noopener noreferrer' }
                        : {})}
                      className="border-foreground/15 text-foreground hover:border-accent hover:bg-accent/10 focus-visible:ring-ring inline-flex min-h-11 max-w-full min-w-0 items-center gap-2 rounded-4xl border px-4 py-2 text-[13px] font-medium transition-colors outline-none focus-visible:ring-2 sm:gap-2.5 sm:px-5 sm:text-sm"
                    >
                      <SocialGlyph
                        platform="whatsapp"
                        className="text-accent size-4 shrink-0 sm:size-[18px]"
                      />
                      {community.cta.label}
                    </a>
                  )}
                  {socials.length > 0 && (
                    <SocialLinks socials={socials} size="md" wrap={false} />
                  )}
                </div>
              </div>
            )}
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
