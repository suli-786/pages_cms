import { Icon } from '@/components/elements/icon';
import type { WhyContent } from '@/lib/about';

// Why we exist — adapted from @shadcnblocks/feature76: a horizontal band of
// columns, each with an icon tile that overlaps the top rule, plus vertical
// guide lines on wide layouts. The rules echo the hero's divide-x idiom, which
// is why this block was chosen over the numbered alternatives — these are four
// simultaneous conditions, not a sequence, so nothing here is numbered.
// The block's framing paragraphs before and after the band were removed
// (user decision, 2026-07-19): the section is the heading and the four
// conditions, each self-contained.
//
// Rendered as a <ul> because it is a list of items; the block's plain divs
// carry no semantics.
function Why({ content }: { content: WhyContent }) {
  const { heading, items } = content;
  const challenges = items.filter((i) => i.title);

  return (
    <section id="why" className="section-padding scroll-mt-24 overflow-hidden">
      <div className="relative container">
        {heading && (
          <h2 className="max-w-3xl text-4xl leading-[1.05] font-light tracking-tight text-balance md:text-5xl">
            {heading}
          </h2>
        )}

        {challenges.length > 0 && (
          <div className="relative mt-16 md:mt-20">
            <div className="bg-border absolute end-0 start-0 top-0 h-px" />
            <ul className="divide-border grid md:grid-cols-4 md:divide-x">
              {challenges.map((item, i) => (
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
    </section>
  );
}

export default Why;
