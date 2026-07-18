import { BadgeCheck, MoveRight } from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import type { PartnerTiersContent } from '@/lib/partner';
import { isExternal } from '@/lib/utils';

// Partnership tiers — adapted from @shadcnblocks/pricing57: dashed-border
// cards with mono plan-id badges and tight feature lists. The block's price
// row and billing toggle are deleted by design (user decision: the 2024
// prices never ship; current pricing travels in the prospectus reply), which
// also removes its only state — this render is fully static.
//
// The mono badge carries the deck's tier subtitle (HEADLINE / PARTNER /
// EXHIBITOR), mapping the deck's "Platinum — Headline" naming onto the site's
// mono micro-label idiom. No tier is highlighted: Platinum leads by order, and
// nothing here is "most popular".
function Tiers({ content }: { content: PartnerTiersContent }) {
  const { heading, lead, items, note, cta, ctaCaption } = content;
  const tiers = items.filter((t) => t.name);

  return (
    <section
      id="tiers"
      className="border-border bg-muted/30 section-padding scroll-mt-24 overflow-hidden border-y"
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

        {tiers.length > 0 && (
          <ul className="mt-12 grid gap-4 md:mt-16 md:grid-cols-3 md:gap-6">
            {tiers.map((tier, i) => (
              <li
                key={i}
                className="border-border bg-background flex flex-col gap-5 rounded-lg border border-dashed p-6 lg:p-7"
              >
                <div>
                  <Badge
                    variant="outline"
                    className="font-mono text-[10px] tracking-[0.18em] uppercase"
                  >
                    {tier.code || tier.name}
                  </Badge>
                  <h3 className="mt-4 text-lg font-semibold tracking-tight">
                    {tier.name}
                  </h3>
                  {tier.tagline && (
                    <p className="text-muted-foreground mt-1 text-sm text-pretty">
                      {tier.tagline}
                    </p>
                  )}
                </div>
                {tier.benefits.length > 0 && (
                  <ul className="border-border space-y-2.5 border-t border-dashed pt-5 text-sm">
                    {tier.benefits.map((benefit, j) => (
                      <li key={j} className="flex gap-2.5">
                        <BadgeCheck
                          aria-hidden
                          className="text-muted-foreground mt-0.5 size-4 shrink-0"
                        />
                        <span className="text-pretty">{benefit}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        )}

        {note && (
          <p className="text-muted-foreground mt-10 max-w-3xl leading-relaxed text-pretty">
            {note}
          </p>
        )}

        {cta.label && cta.href && (
          <div className="mt-10 flex flex-col items-start gap-3">
            <Button size="lg" asChild>
              <a
                href={cta.href}
                {...(isExternal(cta.href)
                  ? { target: '_blank', rel: 'noopener noreferrer' }
                  : {})}
              >
                {cta.label}
                <MoveRight
                  aria-hidden
                  className="size-4 transition-transform duration-200 group-hover/button:translate-x-0.5"
                />
              </a>
            </Button>
            {ctaCaption && (
              <p className="text-muted-foreground text-sm">{ctaCaption}</p>
            )}
          </div>
        )}
      </div>
    </section>
  );
}

export default Tiers;
