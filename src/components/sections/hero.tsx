'use client';

import { Fragment, useEffect, useState } from 'react';

import { CalendarDays, MapPin, MoveRight, type LucideIcon } from 'lucide-react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';

import { SocialGlyph, socialLabel } from '@/components/elements/social-icons';
import { Button } from '@/components/ui/button';
import type { HeroContent } from '@/lib/home';
import type { SocialLink } from '@/lib/site';

// Adapted from @shadcnblocks/hero272: a split layout with a stacked, divided
// left column and a nine-cell photo grid that rotates on a timer. The three
// left bands carry the conference's pitch — the statement + event details, the
// ticket CTA + WhatsApp community invite, and the social links. Social links
// come from Site settings so the whole site shares one list.
const GRID_SIZE = 9;
const ROTATION_INTERVAL = 7000; // ms

// Icons for the event-details strip, matched to eventDetails by position.
const detailIcons: LucideIcon[] = [CalendarDays, MapPin];

/** Only real URLs open in a new tab — a placeholder `#` must not. */
const isExternal = (href: string) => /^https?:\/\//.test(href);

/** Renders `*text*` markers as emphasized words (documented in .pages.yml). */
function renderEmphasis(text: string) {
  return text.split(/\*([^*]+)\*/g).map((part, i) =>
    i % 2 === 1 ? (
      <em key={i} className="text-foreground italic">
        {part}
      </em>
    ) : (
      <Fragment key={i}>{part}</Fragment>
    ),
  );
}

function Hero({
  content,
  socials = [],
}: {
  content: HeroContent;
  socials?: SocialLink[];
}) {
  const {
    eyebrow,
    title,
    eventDetails = [],
    primaryCta,
    community,
    socialsLabel,
    gallery = [],
  } = content;

  const galleryImages = gallery.filter(Boolean);
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
            {/* Band 1 — the statement and when/where. The event name sits inside
                the h1 so the page heading names the event, not just the pitch. */}
            <div className="flex flex-1 flex-col justify-center p-6 md:p-8">
              <h1 className="max-w-3xl">
                {eyebrow && (
                  <span className="text-accent font-text font-weight-text mb-6 flex items-center gap-3 text-sm tracking-tight">
                    <span aria-hidden className="bg-accent h-px w-8" />
                    {eyebrow}
                  </span>
                )}
                <span className="text-foreground/60 block text-4xl tracking-tight text-balance md:text-5xl lg:text-6xl">
                  {renderEmphasis(title)}
                </span>
              </h1>

              {eventDetails.length > 0 && (
                <ul className="mt-8 flex flex-wrap gap-x-10 gap-y-4">
                  {eventDetails.map((d, i) => {
                    const Icon = detailIcons[i] ?? CalendarDays;
                    return (
                      <li
                        key={`${d.label}-${i}`}
                        className="flex items-center gap-2.5"
                      >
                        <Icon
                          aria-hidden
                          className="text-accent size-5"
                          strokeWidth={1.5}
                        />
                        <span className="text-sm">
                          <span className="block font-medium">{d.value}</span>
                          <span className="text-foreground/55 block text-xs">
                            {d.label}
                          </span>
                        </span>
                      </li>
                    );
                  })}
                </ul>
              )}
            </div>

            {/* Band 2 — the one CTA, plus the WhatsApp community invite */}
            <div className="flex flex-1 flex-col justify-center gap-6 p-6 md:p-8">
              {community.body && (
                <p className="text-foreground/70 max-w-md text-sm text-pretty">
                  {community.body}
                </p>
              )}
              <div className="flex flex-wrap items-center gap-3">
                {primaryCta.label && primaryCta.href && (
                  <Button size="lg" asChild>
                    <a href={primaryCta.href}>
                      {primaryCta.label}
                      <MoveRight
                        aria-hidden
                        className="size-4 transition-transform duration-200 group-hover/button:translate-x-0.5"
                      />
                    </a>
                  </Button>
                )}
                {hasCommunity && community.cta.label && communityHref && (
                  <Button size="lg" variant="outline" asChild>
                    <a
                      href={communityHref}
                      {...(isExternal(communityHref)
                        ? { target: '_blank', rel: 'noopener noreferrer' }
                        : {})}
                    >
                      <SocialGlyph platform="whatsapp" className="size-4" />
                      {community.cta.label}
                    </a>
                  </Button>
                )}
              </div>
            </div>

            {/* Band 3 — social links (from Site settings) */}
            {socials.length > 0 && (
              <div className="flex flex-1 flex-col justify-center gap-4 p-6 md:p-8">
                {socialsLabel && (
                  <p className="text-foreground/70 text-sm font-medium tracking-tight">
                    {socialsLabel}
                  </p>
                )}
                <ul className="flex flex-wrap items-center gap-2">
                  {socials.map((s) => (
                    <li key={s.platform}>
                      <a
                        href={s.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={socialLabel(s.platform)}
                        className="border-foreground/15 text-foreground/70 hover:border-accent hover:bg-accent/10 hover:text-foreground focus-visible:ring-ring grid size-10 place-items-center rounded-full border transition-colors outline-none focus-visible:ring-2"
                      >
                        <SocialGlyph
                          platform={s.platform}
                          className="size-[18px]"
                        />
                      </a>
                    </li>
                  ))}
                </ul>
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

function PhotoGrid({ gallery }: { gallery: string[] }) {
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
    <div className="bg-foreground/10 grid h-full grid-cols-3 gap-px perspective-[1200px]">
      {Array.from({ length: GRID_SIZE }).map((_, cell) => {
        const src = gallery[(startIndex + cell) % gallery.length];
        return (
          <div key={cell} className="bg-background/40 overflow-hidden p-1">
            <div className="relative aspect-square h-full w-full">
              <AnimatePresence initial={false}>
                <motion.img
                  key={`${cell}-${src}`}
                  src={src}
                  alt=""
                  className="absolute inset-0 size-full object-cover"
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
