// Partners — three tiers (the heading itself is CMS copy; the homepage frames
// this as last year's partners, the Partner page as the current 2026 list):
//   headline   → a square spotlight frame: square logo, corner-bracket arms
//                exactly half the logo's length, the word HEADLINE as the
//                top-left corner and PARTNER as the bottom-right (the speakers
//                section's viewfinder device with typographic corners)
//   supporting → the same square frame, cornered SUPPORTING instead
//   regular    → the counter-scrolling marquee rows (from @shadcnblocks/logos20)
//
// Logos come from src/content/home.json; each carries a `tier` set in Pages
// CMS. Static-tier logos link out when their href is a real URL; the marquee
// stays non-clickable (moving targets). The scrolling strips are decorative
// duplicates, hidden from AT — a visually-hidden list carries those partner
// names instead. The marquee pauses on hover and holds still entirely under
// prefers-reduced-motion (global.css); there is no manual pause control.

import { Marquee } from '@/components/ui/marquee';
import type {
  ResolvedPartnerLogo,
  ResolvedPartnersContent,
} from '@/lib/images';
import { cn, isExternal } from '@/lib/utils';

/** One square logo box. The current logo files are 500×500 canvases, so they
 *  fill the box; a non-square upload letterboxes inside it. */
function Logo({
  logo,
  boxClass,
}: {
  logo: ResolvedPartnerLogo;
  boxClass: string;
}) {
  // No width/height: the img sizes via object-contain inside a fixed box, so
  // there is no CLS to prevent. lazy keeps React SSR from preloading logos.
  const img = (
    <img
      src={logo.src.src}
      srcSet={logo.src.srcSet}
      sizes={logo.src.sizes}
      loading="lazy"
      decoding="async"
      alt={logo.alt}
      className="max-h-full max-w-full object-contain"
    />
  );
  const box = cn('flex items-center justify-center', boxClass);
  return isExternal(logo.href) ? (
    <a
      href={logo.href}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        box,
        'focus-visible:ring-ring rounded-sm opacity-90 transition-opacity outline-none hover:opacity-100 focus-visible:ring-2 focus-visible:ring-offset-2',
      )}
    >
      {img}
    </a>
  ) : (
    <span className={box}>{img}</span>
  );
}

// The square spotlight frame with typographic corners. Proportions are locked
// to the logo: the logo is a square (80px, 96px from md), each bracket arm
// runs half the logo's length (40/48px), and the padding makes the whole
// element a square too (136px / 160px per side). Change one and change all
// three, or the arms stop reading as half the logo. The logo now matches the
// marquee tier's 96px at md rather than towering over it — these are the same
// brand marks at different tiers, and the corner words carry the ranking, so
// scale doesn't have to (user decision, 2026-07-20, tightened twice). The tier
// word replaces the top-left bracket and "Partner" the bottom-right one; both
// are decorative — the group's aria-label names the tier for AT.
const cornerWord =
  'absolute font-mono text-xs tracking-[0.18em] uppercase text-muted-foreground md:text-sm';

function FramedLogo({
  tier,
  logo,
}: {
  tier: string;
  logo: ResolvedPartnerLogo;
}) {
  return (
    <li className="relative p-7 md:p-8">
      <span
        aria-hidden
        className="border-accent absolute top-0 right-0 size-10 border-t-2 border-r-2 md:size-12"
      />
      <span
        aria-hidden
        className="border-accent absolute bottom-0 left-0 size-10 border-b-2 border-l-2 md:size-12"
      />
      <span aria-hidden className={cn(cornerWord, 'top-0 left-0')}>
        {tier}
      </span>
      <span aria-hidden className={cn(cornerWord, 'right-0 bottom-0')}>
        Partner
      </span>
      <Logo logo={logo} boxClass="size-20 md:size-24" />
    </li>
  );
}

function Partners({ content }: { content: ResolvedPartnersContent }) {
  const { heading, description, items = [] } = content;

  const headline = items.filter((p) => p.tier === 'headline');
  const supporting = items.filter((p) => p.tier === 'supporting');
  const regular = items.filter((p) => p.tier === 'regular');

  // Two counter-scrolling rows only once there are enough logos to fill them;
  // below that a split just makes the marquee's repetition obvious.
  const splitRows = regular.length >= 6;
  const topRow = splitRows ? regular.filter((_, i) => i % 2 === 0) : regular;
  const bottomRow = splitRows ? regular.filter((_, i) => i % 2 === 1) : [];

  return (
    <section
      id="partners"
      className="section-padding scroll-mt-24 overflow-hidden"
    >
      <div className="container text-center">
        {heading && (
          <h2 className="text-2xl tracking-tight text-balance md:text-3xl lg:text-4xl">
            {heading}
          </h2>
        )}
        {description && (
          <p className="text-muted-foreground mt-3 text-lg">{description}</p>
        )}
      </div>

      {(headline.length > 0 || supporting.length > 0) && (
        <div className="container mt-12 md:mt-16">
          {/* Stacked tiers: the headline frame(s) on top, supporting under. */}
          <div className="flex flex-col items-center gap-y-10 md:gap-y-12">
            {headline.length > 0 && (
              <ul
                aria-label="Headline partners"
                className="flex flex-wrap items-center justify-center gap-x-14 gap-y-10"
              >
                {headline.map((logo, i) => (
                  <FramedLogo
                    key={`${logo.src.src}-${i}`}
                    tier="Headline"
                    logo={logo}
                  />
                ))}
              </ul>
            )}
            {supporting.length > 0 && (
              <ul
                aria-label="Supporting partners"
                className="flex flex-wrap items-center justify-center gap-x-14 gap-y-10"
              >
                {supporting.map((logo, i) => (
                  <FramedLogo
                    key={`${logo.src.src}-${i}`}
                    tier="Supporting"
                    logo={logo}
                  />
                ))}
              </ul>
            )}
          </div>
        </div>
      )}

      {regular.length > 0 && (
        <div className="mt-12 flex w-full flex-col gap-6 md:mt-14">
          {/* No tier caption above this row (user decision, 2026-07-20): the
              framed tiers name themselves in their corners, so a bare
              "Partners" label here just repeated the section heading. */}

          {/* Accessible list for the marquee tier (the strips are decorative). */}
          <ul className="sr-only">
            {regular.map((logo, i) => (
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
