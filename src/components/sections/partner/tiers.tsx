'use client';

import { useState } from 'react';

import { Check } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  PARTNER_TIERS,
  type PartnerTier,
  type PartnerTiersContent,
} from '@/lib/partner';

// Partnership tiers — adapted from @shadcnblocks/pricing23: a benefit
// comparison matrix instead of the previous three benefit cards (user
// decision, 2026-07-19, from the prospectus deck's tier table). Prices stay
// off the site by standing decision — current pricing travels in the
// prospectus reply — so the block's plan headers carry only the tier name
// with its subtitle as a mono micro-label (no badge pill — user decision),
// and its per-plan buttons are dropped entirely: the section has no CTA, the
// contact form below the wall is the page's single ask.
//
// Columns are the fixed PARTNER_TIERS vocabulary (same source as the wall's
// grouping); rows come from the CMS as groups of label + one cell per tier.
// A cell is either empty (not included), a tick word ("yes"), or short text
// shown as-is ("1", "8", "Premium").
//
// Desktop renders a real <table> (the block's div grid loses tabular
// semantics); mobile swaps the block's collapsible plan picker for a
// three-button segmented switcher — same job, one tap, no new dependency —
// showing one tier's column with every row label still visible. The switcher
// is the only state, so the page hydrates this island on mobile only
// (client:media in partner.astro).

/** Cell words that render as a tick rather than as text. */
const TICK = /^(yes|y|true|✓)$/i;

function Cell({ value }: { value: string }) {
  const v = value.trim();
  if (!v)
    return (
      <>
        <span aria-hidden className="text-muted-foreground/60">
          –
        </span>
        <span className="sr-only">Not included</span>
      </>
    );
  if (TICK.test(v))
    return (
      <>
        <Check aria-hidden className="text-accent size-4.5" />
        <span className="sr-only">Included</span>
      </>
    );
  return <span>{v}</span>;
}

function Tiers({ content }: { content: PartnerTiersContent }) {
  const { heading, lead, groups } = content;
  const sections = groups
    .map((g) => ({ ...g, rows: g.rows.filter((r) => r.label) }))
    .filter((g) => g.rows.length > 0);
  const [selected, setSelected] = useState<PartnerTier>(PARTNER_TIERS[0].value);
  const mobileTier = PARTNER_TIERS.find((t) => t.value === selected)!;

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

        {sections.length > 0 && (
          <>
            {/* Desktop — the full matrix */}
            <table className="mt-12 w-full table-fixed text-sm max-md:hidden md:mt-16">
              <caption className="sr-only">
                What each partnership tier includes
              </caption>
              <colgroup>
                <col className="w-[34%]" />
                <col span={3} />
              </colgroup>
              <thead>
                <tr>
                  <td />
                  {PARTNER_TIERS.map((tier) => (
                    <th key={tier.value} scope="col" className="px-4 pb-2">
                      <span className="flex flex-col items-center gap-2">
                        <span className="text-muted-foreground font-mono text-[10px] font-medium tracking-[0.18em] uppercase">
                          {tier.badge}
                        </span>
                        <span className="text-lg font-semibold tracking-tight">
                          {tier.name}
                        </span>
                      </span>
                    </th>
                  ))}
                </tr>
              </thead>
              {sections.map((group, gi) => (
                <tbody key={gi}>
                  {group.heading && (
                    <tr>
                      <th
                        colSpan={4}
                        scope="colgroup"
                        className={`text-muted-foreground pb-3 text-left font-mono text-xs font-medium tracking-[0.18em] uppercase ${gi === 0 ? 'pt-6' : 'pt-12'}`}
                      >
                        {group.heading}
                      </th>
                    </tr>
                  )}
                  {group.rows.map((row, ri) => (
                    <tr key={ri} className="border-border border-b">
                      <th
                        scope="row"
                        className="py-3.5 pr-4 text-left font-normal text-pretty"
                      >
                        {row.label}
                      </th>
                      {PARTNER_TIERS.map((tier) => (
                        <td key={tier.value} className="px-4 py-3.5">
                          <span className="flex justify-center">
                            <Cell value={row[tier.value]} />
                          </span>
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              ))}
            </table>

            {/* Mobile — one tier's column at a time, every row still listed */}
            <div className="mt-10 md:hidden">
              <div
                role="group"
                aria-label="Choose a tier to compare"
                className="grid grid-cols-3 gap-2"
              >
                {PARTNER_TIERS.map((tier) => (
                  <Button
                    key={tier.value}
                    type="button"
                    variant={tier.value === selected ? 'default' : 'outline'}
                    aria-pressed={tier.value === selected}
                    onClick={() => setSelected(tier.value)}
                  >
                    {tier.name}
                  </Button>
                ))}
              </div>
              <p className="text-muted-foreground mt-6 font-mono text-xs tracking-[0.18em] uppercase">
                {mobileTier.name} — {mobileTier.badge}
              </p>

              {sections.map((group, gi) => (
                <div key={gi} className="mt-7 first-of-type:mt-4">
                  {group.heading && (
                    <h3 className="text-muted-foreground font-mono text-xs font-medium tracking-[0.18em] uppercase">
                      {group.heading}
                    </h3>
                  )}
                  <dl className="mt-2">
                    {group.rows.map((row, ri) => (
                      <div
                        key={ri}
                        className="border-border flex items-center justify-between gap-4 border-b py-3 text-sm"
                      >
                        <dt className="text-pretty">{row.label}</dt>
                        <dd className="shrink-0">
                          <Cell value={row[selected]} />
                        </dd>
                      </div>
                    ))}
                  </dl>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </section>
  );
}

export default Tiers;
