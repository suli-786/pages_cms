import type { BeliefsContent } from '@/lib/about';

// What we stand for — adapted from @shadcnblocks/feature362: a sticky left
// column (label, heading, intro) beside a grid of bordered cards. The block
// ships an icon tile per card; here that becomes a mono numeric index, because
// the copy asserts "six propositions" and numbering them honours that without
// asking an editor to pick six icons.
//
// An <ol> — these are numbered and their order is meaningful, so the numbering
// comes from real list semantics rather than only a rendered glyph.
//
// Deliberately structured to contrast with the values section that follows it
// (six items there too): bordered cards + sticky column + numbers here,
// borderless icon rows there, so the two don't read as one undifferentiated
// wall of twelve.
function Beliefs({ content }: { content: BeliefsContent }) {
  const { label, heading, lead, items } = content;
  const propositions = items.filter((i) => i.title);

  return (
    <section
      id="beliefs"
      className="section-padding scroll-mt-24 overflow-hidden"
    >
      <div className="container">
        <div className="grid items-start gap-12 lg:grid-cols-3 lg:gap-16">
          <div className="flex flex-col gap-5 lg:sticky lg:top-28">
            {label && (
              <p className="text-muted-foreground font-mono text-xs tracking-[0.18em] uppercase">
                {label}
              </p>
            )}
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

          {propositions.length > 0 && (
            <ol className="grid gap-6 sm:grid-cols-2 lg:col-span-2 lg:grid-cols-3">
              {propositions.map((item, i) => (
                <li
                  key={i}
                  className="border-border flex flex-col gap-3 rounded-lg border p-5"
                >
                  <span
                    className="text-muted-foreground font-mono text-xs tracking-[0.18em]"
                    aria-hidden="true"
                  >
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <h3 className="font-medium tracking-tight text-pretty">
                    {item.title}
                  </h3>
                  {item.body && (
                    <p className="text-muted-foreground text-sm leading-relaxed text-pretty">
                      {item.body}
                    </p>
                  )}
                </li>
              ))}
            </ol>
          )}
        </div>
      </div>
    </section>
  );
}

export default Beliefs;
