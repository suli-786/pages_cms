import { renderEmphasis } from '@/components/elements/emphasis';
import type { BeliefsContent } from '@/lib/about';

// What we stand for — adapted from @shadcnblocks/feature207 (user pick,
// 2026-07-20, replacing the feature362 card grid: five cards in a three-column
// grid left a permanent hole, and equal boxes flattened what should read as
// doctrine): numbered full-width rows between hairline rules, title beside
// body from md up. The block's <Separator /> becomes the site's
// border-y/divide-y rules (no ui/separator in this repo) and its overline
// slot is dropped (no eyebrows — user decision, 2026-07-19). Carries the
// merged propositions + values (user decision, 2026-07-20).
//
// An <ol> because the order is meaningful, and the numerals are real text —
// Tailwind preflight strips list markers, and Safari/VoiceOver drops list
// semantics entirely for unstyled lists, so the visible "01" is the only
// numbering many screen-reader users get.
//
// Titles run through renderEmphasis so Arabic terms carry _underscore_
// italics on first use, per the brand voice guide (`_Niyyah_`).
function Beliefs({ content }: { content: BeliefsContent }) {
  const { heading, lead, items } = content;
  const propositions = items.filter((i) => i.title);

  return (
    <section
      id="beliefs"
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

        {propositions.length > 0 && (
          <ol className="divide-border border-border mt-12 divide-y border-y md:mt-14">
            {propositions.map((item, i) => (
              <li key={i} className="py-8">
                <div className="flex gap-4 md:items-center">
                  <span className="text-muted-foreground mt-0.5 font-mono md:mt-0">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  {/* flex-1, unlike the block: without it the grid shrinks to
                      its content, so every row computes its own column split
                      and the bodies start at a different x per row. */}
                  <div className="grid flex-1 items-center gap-3 md:grid-cols-2 md:gap-8">
                    <h3 className="text-2xl tracking-tight text-pretty">
                      {renderEmphasis(item.title)}
                    </h3>
                    {item.body && (
                      <p className="text-muted-foreground leading-relaxed text-pretty">
                        {item.body}
                      </p>
                    )}
                  </div>
                </div>
              </li>
            ))}
          </ol>
        )}
      </div>
    </section>
  );
}

export default Beliefs;
