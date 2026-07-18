import { CornerBrackets } from '@/components/elements/corner-brackets';
import { renderEmphasis } from '@/components/elements/emphasis';
import { Prose } from '@/components/elements/prose';
import type { IntroContent } from '@/lib/about';

// About intro — bespoke, following the hero's opening band: mono eyebrow inside
// corner brackets, then the statement. No registry block fits "brand statement,
// no photo, no CTA", and the idiom already exists in hero.tsx.
//
// This carries the page's only h1. Padding clears the fixed navbar (same values
// as hero.tsx) — section-padding alone is not enough. Deliberately NOT a `.dark`
// band: the navbar only switches to light text on the homepage, so a dark first
// section here would render the nav links nearly invisible at scroll-top.
function Intro({ content }: { content: IntroContent }) {
  const { eyebrow, title, body } = content;

  return (
    <section
      id="intro"
      className="scroll-mt-24 overflow-hidden pt-28 pb-14 md:pt-36 md:pb-16 lg:pt-40 lg:pb-20"
    >
      <div className="container max-w-4xl">
        {eyebrow && (
          <CornerBrackets className="text-muted-foreground mb-8 inline-block font-mono text-xs tracking-[0.18em] uppercase">
            {eyebrow}
          </CornerBrackets>
        )}

        <h1 className="text-foreground/60 text-4xl leading-[1.05] font-light tracking-tight text-balance md:text-5xl lg:text-6xl">
          {renderEmphasis(title)}
        </h1>

        <Prose
          text={body}
          className="mt-10 space-y-6 md:mt-12"
          paragraphClassName="text-muted-foreground text-lg leading-relaxed text-pretty md:text-xl"
        />
      </div>
    </section>
  );
}

export default Intro;
