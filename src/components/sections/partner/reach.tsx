import { Prose } from '@/components/elements/prose';
import type { PartnerReachContent } from '@/lib/partner';

// Who you reach — adapted from @shadcnblocks/stats8: heading and description
// above a four-column fact grid. The block's oversized stat numerals become
// labelled facts (mono micro-label over the value), because the credibility
// rows here are textual — the one real number lives in the body paragraph.
//
// A <dl>: these are label/value pairs, so the semantics say so.
function Reach({ content }: { content: PartnerReachContent }) {
  const { heading, body, facts } = content;
  const rows = facts.filter((f) => f.label || f.value);

  return (
    <section
      id="reach"
      className="section-padding scroll-mt-24 overflow-hidden"
    >
      <div className="container">
        <div className="max-w-3xl">
          {heading && (
            <h2 className="text-4xl leading-[1.05] font-light tracking-tight text-balance md:text-5xl">
              {heading}
            </h2>
          )}
          <Prose
            text={body}
            className="mt-8 space-y-6"
            paragraphClassName="text-muted-foreground leading-relaxed text-pretty"
          />
        </div>

        {rows.length > 0 && (
          <dl className="divide-border border-border mt-12 grid divide-y border-y md:mt-16 md:grid-cols-4 md:divide-x md:divide-y-0">
            {rows.map((fact, i) => (
              <div
                key={i}
                className="flex flex-col gap-3 py-6 md:px-6 md:py-8 md:first:ps-0 md:last:pe-0"
              >
                <dt className="text-muted-foreground font-mono text-xs tracking-[0.18em] uppercase">
                  {fact.label}
                </dt>
                <dd className="text-foreground leading-relaxed text-pretty">
                  {fact.value}
                </dd>
              </div>
            ))}
          </dl>
        )}
      </div>
    </section>
  );
}

export default Reach;
