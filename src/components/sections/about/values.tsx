import { renderEmphasis } from '@/components/elements/emphasis';
import { Icon } from '@/components/elements/icon';
import type { ValuesContent } from '@/lib/about';

// Our values — adapted from @shadcnblocks/feature26: heading, a masked hairline
// rule, then icon-and-text rows up to three columns. Kept borderless (unlike
// the bordered cards in the beliefs section directly above) so two six-item
// grids in a row stay visually distinct.
//
// Titles run through renderEmphasis so Arabic terms carry _underscore_ italics
// on first use, per the brand voice guide (`_Niyyah_ (sincere intention)`).
function Values({ content }: { content: ValuesContent }) {
  const { heading, lead, items } = content;
  const values = items.filter((i) => i.title);

  return (
    <section
      id="values"
      className="section-padding scroll-mt-24 overflow-hidden"
    >
      <div className="container">
        <div className="flex max-w-3xl flex-col gap-5">
          {heading && (
            <h2 className="text-4xl leading-[1.05] font-light tracking-tight text-balance md:text-5xl">
              {heading}
            </h2>
          )}
          {lead && (
            <p className="text-muted-foreground leading-relaxed text-pretty">
              {lead}
            </p>
          )}
        </div>

        {values.length > 0 && (
          <>
            <div
              className="bg-border my-12 h-px w-full shrink-0 mask-[linear-gradient(90deg,transparent,black_15%,black_85%,transparent)]"
              role="separator"
            />
            <ul className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 lg:gap-12">
              {values.map((item, i) => (
                <li key={i} className="flex gap-4">
                  <span className="bg-muted flex size-10 shrink-0 items-center justify-center overflow-hidden rounded-lg">
                    <Icon name={item.icon} className="text-foreground size-5" />
                  </span>
                  <div>
                    <h3 className="mb-1 text-lg font-medium text-pretty">
                      {renderEmphasis(item.title)}
                    </h3>
                    {item.body && (
                      <p className="text-muted-foreground text-sm leading-relaxed text-pretty">
                        {item.body}
                      </p>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          </>
        )}
      </div>
    </section>
  );
}

export default Values;
