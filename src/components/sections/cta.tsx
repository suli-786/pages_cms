'use client';

import { useEffect, useState } from 'react';

import { MoveRight } from 'lucide-react';

import { CornerBrackets } from '@/components/elements/corner-brackets';
import { renderEmphasis } from '@/components/elements/emphasis';
import { Button } from '@/components/ui/button';
import type { ResolvedFinalCtaContent } from '@/lib/images';

// Final CTA — the countdown finale. Skeleton from @shadcnblocks/cta46 (an
// edge-to-edge photo with a vignette that spotlights centred copy), countdown
// mechanics as in the registry's waitlist2/promo-banner blocks, both adapted
// to the brand: deep-indigo scrim, corner-bracket eyebrow, `*emphasis*`
// heading, live countdown to the conference date, one ticket button.
//
// The only full-bleed photo and the only live element on the page — this
// section is the close, not another card.

/** A date-only CMS value counts down to 08:00 SAST on the day. */
function parseTarget(date: string): number | null {
  if (!date) return null;
  const iso = /^\d{4}-\d{2}-\d{2}$/.test(date)
    ? `${date}T08:00:00+02:00`
    : date;
  const t = new Date(iso).getTime();
  return Number.isNaN(t) ? null : t;
}

type Parts = { days: number; hours: number; minutes: number; seconds: number };

function partsUntil(target: number): Parts | null {
  const ms = target - Date.now();
  if (ms <= 0) return null;
  const s = Math.floor(ms / 1000);
  return {
    days: Math.floor(s / 86400),
    hours: Math.floor((s % 86400) / 3600),
    minutes: Math.floor((s % 3600) / 60),
    seconds: s % 60,
  };
}

// SSR renders placeholders; real values fill in after mount so the server and
// client HTML always agree. An empty, invalid or past date renders nothing.
function Countdown({ date }: { date: string }) {
  const target = parseTarget(date);
  const [parts, setParts] = useState<Parts | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    if (target == null) return;
    setMounted(true);
    const tick = () => setParts(partsUntil(target));
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [target]);

  if (target == null || (mounted && parts == null)) return null;

  const units = [
    { label: 'Days', value: parts?.days },
    { label: 'Hours', value: parts?.hours },
    { label: 'Minutes', value: parts?.minutes },
    { label: 'Seconds', value: parts?.seconds },
  ];

  return (
    // A human-readable label instead of a live region — announcing every
    // second would drown a screen reader. The ticking digits are decorative.
    <div
      role="img"
      aria-label={
        parts
          ? `The conference starts in ${parts.days} days, ${parts.hours} hours and ${parts.minutes} minutes`
          : 'Countdown to the conference'
      }
    >
      <div aria-hidden className="flex items-start justify-center">
        {units.map((u, i) => (
          <div key={u.label} className="flex items-start">
            {i > 0 && (
              <span className="text-accent px-3 text-3xl font-light tabular-nums md:px-5 md:text-5xl">
                :
              </span>
            )}
            <span className="flex w-16 flex-col items-center gap-2 md:w-24">
              <span className="text-3xl font-light tracking-tight tabular-nums md:text-5xl">
                {u.value == null ? '––' : String(u.value).padStart(2, '0')}
              </span>
              <span className="text-foreground/85 font-mono text-[0.6rem] tracking-[0.18em] uppercase">
                {u.label}
              </span>
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

function Cta({ content }: { content: ResolvedFinalCtaContent }) {
  const { eyebrow, heading, body, cta, image, date } = content;

  return (
    <section className="dark text-foreground relative isolate overflow-hidden">
      {/* Full-bleed backdrop: photo under an indigo scrim plus a radial
          vignette, so the centred copy clears contrast on any image.
          lazy: far below the fold; absolutely positioned, so width/height
          are CLS hints only. */}
      {image.src && (
        <img
          src={image.src}
          srcSet={image.srcSet}
          sizes={image.sizes}
          width={image.width}
          height={image.height}
          loading="lazy"
          decoding="async"
          alt={image.alt}
          aria-hidden
          className="absolute inset-0 -z-20 size-full object-cover"
        />
      )}
      {/* 65% scrim keeps the photo readable while full-Mist text still clears
          4.5:1 even over a pure-white photo region; the vignette only darkens
          the far edges. Text opacities below are chosen against that worst
          case — don't lower them without redoing the contrast math.

          --background, not a literal: this div is inside the `dark` island
          opened above, so the token already resolves to the selected palette's
          dark canvas. The contrast promise holds across palettes because
          src/styles/themes.css requires every palette's dark --background to
          sit under 0.03 relative luminance. If color-mix is unsupported the
          vignette drops and the flat 65% scrim still renders. */}
      <div
        aria-hidden
        className="bg-background/65 absolute inset-0 -z-10 [background-image:radial-gradient(ellipse_at_center,transparent_0%,color-mix(in_srgb,var(--background)_50%,transparent)_80%)]"
      />

      <div className="container flex flex-col items-center gap-10 py-28 text-center md:gap-12 md:py-36 lg:py-44">
        {eyebrow && (
          <p className="flex">
            {/* Mist text, accent brackets: Cornflower text itself is 1.45:1
                over a bright photo region — the accent lives in the frame. */}
            <CornerBrackets className="px-3.5 py-2.5 font-mono text-xs tracking-[0.18em] uppercase md:text-sm">
              {eyebrow}
            </CornerBrackets>
          </p>
        )}

        {heading && (
          <h2 className="text-foreground max-w-4xl text-4xl tracking-tight text-balance md:text-6xl lg:text-7xl">
            {renderEmphasis(heading)}
          </h2>
        )}

        {body && (
          <p className="text-foreground/85 max-w-xl text-base text-pretty md:text-lg">
            {body}
          </p>
        )}

        <Countdown date={date} />

        {cta.label && cta.href && (
          <Button size="lg" className="h-13 px-8" asChild>
            <a href={cta.href}>
              {cta.label}
              <MoveRight
                aria-hidden
                className="size-4 transition-transform duration-200 group-hover/button:translate-x-0.5"
              />
            </a>
          </Button>
        )}
      </div>
    </section>
  );
}

export default Cta;
