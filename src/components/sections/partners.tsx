// Partners — one flat, unranked set of logos in the counter-scrolling marquee
// (from @shadcnblocks/logos20). The heading itself is CMS copy: the homepage
// frames this as last year's partners, the Partner page as the current list.
//
// There is deliberately no tier hierarchy (user decision, 2026-08-03): every
// partner is a regular partner and they all get identical treatment. The
// earlier headline/supporting spotlight frames were removed with it.
//
// Logos come from the CMS (src/content/{home,partner}.json). The scrolling
// strips are decorative duplicates, hidden from AT — a visually-hidden list
// carries the partner names instead. The marquee is non-clickable (moving
// targets), pauses on hover, and holds still entirely under
// prefers-reduced-motion (global.css); there is no manual pause control.

import { FramedCta } from '@/components/elements/framed-cta';
import SectionHeader from '@/components/elements/section-header';
import { Marquee } from '@/components/ui/marquee';
import type {
  ResolvedPartnerLogo,
  ResolvedPartnersContent,
} from '@/lib/images';

function Partners({ content }: { content: ResolvedPartnersContent }) {
  const { heading, description, cta, items = [] } = content;

  // Two counter-scrolling rows only once there are enough logos to fill them;
  // below that a split just makes the marquee's repetition obvious.
  const splitRows = items.length >= 6;
  const topRow = splitRows ? items.filter((_, i) => i % 2 === 0) : items;
  const bottomRow = splitRows ? items.filter((_, i) => i % 2 === 1) : [];

  return (
    <section
      id="partners"
      className="section-padding scroll-mt-24 overflow-hidden"
    >
      {/* Same heading treatment as Speakers (user decision, 2026-08-03):
          left-aligned SectionHeader with the framed CTA on the right — only
          the header changed, the marquee below is untouched. */}
      <div className="container">
        <SectionHeader
          heading={heading}
          description={description}
          mark={
            cta.label && cta.href ? (
              <FramedCta label={cta.label} href={cta.href} />
            ) : undefined
          }
        />
      </div>

      {items.length > 0 && (
        <div className="mt-12 flex w-full flex-col gap-6 md:mt-14">
          {/* Accessible list for the marquee (the strips are decorative). */}
          <ul className="sr-only">
            {items.map((logo, i) => (
              <li key={`${logo.alt}-${i}`}>{logo.alt}</li>
            ))}
          </ul>

          <div aria-hidden>
            <MarqueeRow logos={topRow} />
          </div>
          {bottomRow.length > 0 && (
            <div aria-hidden>
              <MarqueeRow logos={bottomRow} reverse />
            </div>
          )}
        </div>
      )}
    </section>
  );
}

function MarqueeRow({
  logos,
  reverse = false,
}: {
  logos: ResolvedPartnerLogo[];
  reverse?: boolean;
}) {
  if (logos.length === 0) return null;

  return (
    <div className="relative w-full">
      <Marquee
        reverse={reverse}
        pauseOnHover
        className="p-0 [--duration:40s] [--gap:0px]"
      >
        {logos.map((logo, i) => (
          <div
            key={`${logo.src.src}-${i}`}
            className="mx-8 flex h-24 w-32 items-center justify-center lg:mx-10"
          >
            <img
              src={logo.src.src}
              srcSet={logo.src.srcSet}
              sizes={logo.src.sizes}
              loading="lazy"
              decoding="async"
              alt=""
              className="max-h-full max-w-full object-contain"
            />
          </div>
        ))}
      </Marquee>
      <div className="from-background pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-linear-to-r to-transparent" />
      <div className="from-background pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-linear-to-l to-transparent" />
    </div>
  );
}

export default Partners;
