import { Icon, type IconName } from '@/components/elements/icon';

// Shared "why" band — adapted from @shadcnblocks/feature76: a horizontal band
// of columns, each with an icon tile that overlaps the top rule, plus
// vertical guide lines on wide layouts. The rules echo the hero's divide-x
// idiom. Used by both the About page's "Our Why" and the Partner page's "Why
// partner with Ummah Tech" (user decision, 2026-08-03: the two previously had
// different treatments — cards on Partner, this band on About — specifically
// to keep the pages visually distinct; that decision was reversed, so both
// now render through this one component instead of two near-duplicates that
// could drift out of sync).
//
// Rendered as a <ul> because it is a list of items; the plain divs carry no
// semantics.
export function WhyColumns({
  heading,
  items,
}: {
  heading: string;
  items: { icon: IconName; title: string; body: string }[];
}) {
  const rows = items.filter((i) => i.title);

  return (
    <div className="relative container">
      {heading && (
        <h2 className="max-w-3xl text-4xl leading-[1.05] font-light tracking-tight text-balance md:text-5xl">
          {heading}
        </h2>
      )}

      {rows.length > 0 && (
        <div className="relative mt-16 md:mt-20">
          <div className="bg-border absolute end-0 start-0 top-0 h-px" />
          <ul className="divide-border grid md:grid-cols-4 md:divide-x">
            {rows.map((item, i) => (
              <li key={i} className="relative px-0 pb-12 md:px-6 md:pb-10">
                {/* Per-item rule on mobile, where the columns stack. */}
                <div className="bg-border absolute end-0 start-0 top-0 h-px md:hidden" />
                <div className="bg-background relative -mt-6 mb-8 flex aspect-square w-12 items-center justify-center md:-mt-10 md:mb-10 md:w-20">
                  <Icon
                    name={item.icon}
                    className="text-foreground size-5 md:size-6"
                  />
                </div>
                <h3 className="mb-3 text-lg font-medium tracking-tight text-balance md:mb-4 md:text-xl">
                  {item.title}
                </h3>
                {item.body && (
                  <p className="text-muted-foreground text-sm leading-relaxed text-pretty">
                    {item.body}
                  </p>
                )}
              </li>
            ))}
          </ul>
          <div className="bg-border absolute bottom-0 end-0 start-0 h-px" />
        </div>
      )}
    </div>
  );
}
