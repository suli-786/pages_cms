import { Icon } from '@/components/elements/icon';
import type { PartnerWhyContent } from '@/lib/partner';

// Why partner — adapted from @shadcnblocks/feature203: a two-column grid of
// muted rounded cards, each an icon tile, title and short body. The block's
// per-card checklists are dropped — the pillars are single arguments, not
// feature lists. Bordered-card treatment deliberately differs from the About
// page's why (column band) so the two pages don't blur together.
function Why({ content }: { content: PartnerWhyContent }) {
  const { heading, items } = content;
  const pillars = items.filter((i) => i.title);

  return (
    <section id="why" className="section-padding scroll-mt-24 overflow-hidden">
      <div className="container">
        {heading && (
          <h2 className="max-w-3xl text-4xl leading-[1.05] font-light tracking-tight text-balance md:text-5xl">
            {heading}
          </h2>
        )}

        {pillars.length > 0 && (
          <ul className="mt-12 grid gap-6 md:mt-16 md:grid-cols-2 md:gap-8">
            {pillars.map((item, i) => (
              <li
                key={i}
                className="bg-muted flex flex-col gap-6 rounded-xl p-8 lg:p-9"
              >
                <span className="bg-primary flex size-10 items-center justify-center rounded-xl">
                  <Icon
                    name={item.icon}
                    className="text-primary-foreground size-5"
                  />
                </span>
                <div className="flex flex-col gap-2.5">
                  <h3 className="text-xl font-medium tracking-tight text-pretty md:text-2xl">
                    {item.title}
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
        )}
      </div>
    </section>
  );
}

export default Why;
