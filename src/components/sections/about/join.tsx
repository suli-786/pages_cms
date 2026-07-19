'use client';

import { motion, useReducedMotion } from 'motion/react';

import { CtaButton } from '@/components/elements/cta-button';
import { renderEmphasis } from '@/components/elements/emphasis';
import type { ResolvedJoinContent } from '@/lib/images-about';
import { isExternal } from '@/lib/utils';

// Join the community — the About page's closing conversion (user decision,
// 2026-07-20, replacing the shared cta.tsx full-bleed countdown band, an
// eyesore): the "find your people" message and the WhatsApp call sit above a
// reveal grid of community photos that fade and rise into place as the
// section scrolls in. Built from the site's own idiom — motion/react
// whileInView, the reveal the contact section already uses — not a registry
// gallery block (the animated ones were product/marquee treatments that would
// echo the homepage partners row).
//
// CSS-columns masonry so the varied photo aspect ratios tile without cropping;
// the whole grid is decorative to the section's message, so an empty photo
// list simply drops it and the copy still stands on its own.
const EASE_OUT = [0.23, 1, 0.32, 1] as const;

function Join({ content }: { content: ResolvedJoinContent }) {
  const { heading, body, cta, secondaryCta, photos } = content;
  const shots = photos.filter((p) => p.src);
  const reduce = useReducedMotion();

  return (
    <section
      id="join"
      className="dark bg-background text-foreground section-padding scroll-mt-24 overflow-hidden"
    >
      <div className="container">
        <div className="mx-auto flex max-w-2xl flex-col items-center gap-8 text-center">
          {heading && (
            <h2 className="text-4xl leading-[1.05] font-light tracking-tight text-balance md:text-5xl">
              {renderEmphasis(heading)}
            </h2>
          )}
          {body && (
            <p className="text-foreground/75 max-w-xl text-lg leading-relaxed text-pretty">
              {body}
            </p>
          )}
          {(cta.label || secondaryCta.label) && (
            <div className="flex flex-col items-center gap-5">
              <CtaButton size="lg" className="h-13 px-8" cta={cta} />
              {secondaryCta.label && secondaryCta.href && (
                <a
                  href={secondaryCta.href}
                  className="text-foreground/85 hover:text-foreground focus-visible:ring-ring rounded-sm text-sm underline underline-offset-4 transition-colors focus-visible:ring-2 focus-visible:outline-none"
                  {...(isExternal(secondaryCta.href)
                    ? { target: '_blank', rel: 'noopener noreferrer' }
                    : {})}
                >
                  {secondaryCta.label}
                </a>
              )}
            </div>
          )}
        </div>

        {shots.length > 0 && (
          <ul className="mt-14 gap-4 sm:columns-2 md:mt-20 md:columns-3 lg:gap-6">
            {shots.map((photo, i) => (
              <li key={i} className="mb-4 break-inside-avoid lg:mb-6">
                <motion.img
                  src={photo.src}
                  srcSet={photo.srcSet}
                  sizes={photo.sizes}
                  width={photo.width}
                  height={photo.height}
                  loading="lazy"
                  decoding="async"
                  alt={photo.alt}
                  className="w-full rounded-lg"
                  initial={reduce ? false : { opacity: 0, y: 28 }}
                  whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-10%' }}
                  transition={{
                    duration: 0.6,
                    ease: EASE_OUT,
                    delay: (i % 3) * 0.08,
                  }}
                />
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}

export default Join;
