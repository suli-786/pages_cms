import type { ResolvedPartnerWallContent } from '@/lib/images-partner';
import { isExternal } from '@/lib/utils';

// Current partners, grouped by tier — adapted from @shadcnblocks/logos28 (a
// static logo grid with heading and subtitle), rendered once per tier group.
// Deliberately quieter than the homepage's counter-scrolling marquee wall:
// that wall is the homepage's identity and shows previous partners, which
// never appear here (user decision, 2026-07-18).
//
// THE WHOLE SECTION RENDERS NOTHING WHILE EMPTY. An empty "current partners"
// block on a sponsor page is anti-social-proof — it announces that nobody has
// committed yet at the exact moment the page asks someone to be first. The
// moment an admin adds the first partner in Pages CMS, the section appears.
const TIER_ORDER = ['platinum', 'gold', 'silver'] as const;
const TIER_LABELS: Record<(typeof TIER_ORDER)[number], string> = {
  platinum: 'Platinum — Headline',
  gold: 'Gold — Partner',
  silver: 'Silver — Exhibitor',
};

function PartnerWall({ content }: { content: ResolvedPartnerWallContent }) {
  const { heading, lead, items } = content;
  const partners = items.filter((p) => p.logo.src || p.name);
  if (partners.length === 0) return null;

  const groups = TIER_ORDER.map((tier) => ({
    tier,
    label: TIER_LABELS[tier],
    entries: partners.filter((p) => p.tier === tier),
  })).filter((g) => g.entries.length > 0);

  return (
    <section
      id="partners"
      className="section-padding scroll-mt-24 overflow-hidden"
    >
      <div className="container">
        <div className="max-w-3xl">
          {heading && (
            <h2 className="text-4xl leading-[1.05] font-light tracking-tight text-balance md:text-5xl">
              {heading}
            </h2>
          )}
          {lead && (
            <p className="text-muted-foreground mt-6 leading-relaxed text-pretty">
              {lead}
            </p>
          )}
        </div>

        <div className="mt-12 space-y-12 md:mt-16">
          {groups.map((group) => (
            <div key={group.tier}>
              <h3 className="text-muted-foreground font-mono text-xs tracking-[0.18em] uppercase">
                {group.label}
              </h3>
              <ul className="mt-6 grid grid-cols-2 gap-x-8 gap-y-6 sm:grid-cols-3 md:grid-cols-4 lg:gap-12">
                {group.entries.map((partner, i) => {
                  const logo = partner.logo.src ? (
                    <img
                      src={partner.logo.src}
                      srcSet={partner.logo.srcSet}
                      sizes={partner.logo.sizes}
                      width={partner.logo.width}
                      height={partner.logo.height}
                      loading="lazy"
                      decoding="async"
                      alt={partner.logo.alt || partner.name}
                      className="h-auto max-h-12 w-auto object-contain"
                    />
                  ) : (
                    <span className="text-foreground text-lg font-medium">
                      {partner.name}
                    </span>
                  );
                  return (
                    <li
                      key={i}
                      className="flex aspect-3/1 items-center justify-start"
                    >
                      {partner.href && partner.href !== '#' ? (
                        <a
                          href={partner.href}
                          className="focus-visible:ring-ring rounded-sm focus-visible:ring-2 focus-visible:outline-none"
                          {...(isExternal(partner.href)
                            ? { target: '_blank', rel: 'noopener noreferrer' }
                            : {})}
                          aria-label={partner.name || partner.logo.alt}
                        >
                          {logo}
                        </a>
                      ) : (
                        logo
                      )}
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default PartnerWall;
