import { renderEmphasis } from '@/components/elements/emphasis';
import { Prose } from '@/components/elements/prose';
import type { IntroContent } from '@/lib/content';

// Page intro — the opening band shared by the inner pages (About, Partner):
// the page's only h1 framed by the viewfinder corner brackets, then the prose
// body. The bracket treatment copies the homepage contact headline (no
// eyebrow — user decision, 2026-07-19: the brackets belong on the heading).
// Promoted out of sections/about/ once the Partner page needed the identical
// shape. Content is typed by the shared introSchema in lib/content.ts, which
// both page schemas reuse.
//
// Padding clears the fixed navbar (same values as hero.tsx) — section-padding
// alone is not enough. Deliberately NOT a `.dark` band: the navbar only
// switches to light text when the page passes darkHero, so a dark first
// section here would render the nav links nearly invisible at scroll-top.
function PageIntro({ content }: { content: IntroContent }) {
  const { title, body } = content;

  return (
    <section
      id="intro"
      className="scroll-mt-24 overflow-hidden pt-28 pb-14 md:pt-36 md:pb-16 lg:pt-40 lg:pb-20"
    >
      <div className="container max-w-4xl">
        {/* Same bracket geometry as the homepage contact headline: w-fit so
            the frame hugs the text, pr-6 so the top-right arm clears the last
            glyph, and a smaller left poke on mobile — at -left-4 the bracket
            lands on the viewport edge (the heading sits flush to the
            container's gutter) and the section's overflow-hidden clips it. */}
        <div className="relative w-fit">
          <h1 className="text-foreground/60 pr-6 text-4xl leading-[1.05] font-light tracking-tight text-balance md:text-5xl lg:text-6xl">
            {renderEmphasis(title)}
          </h1>
          <span
            aria-hidden
            className="border-accent absolute -top-3 -right-1 size-5 border-t-2 border-r-2"
          />
          <span
            aria-hidden
            className="border-accent absolute -bottom-3 -left-2 size-5 border-b-2 border-l-2 md:-left-4"
          />
        </div>

        <Prose
          text={body}
          className="mt-10 space-y-6 md:mt-12"
          paragraphClassName="text-muted-foreground text-lg leading-relaxed text-pretty md:text-xl"
        />
      </div>
    </section>
  );
}

export default PageIntro;
