import { CornerBrackets } from '@/components/elements/corner-brackets';
import { renderEmphasis } from '@/components/elements/emphasis';
import { Prose } from '@/components/elements/prose';

// Page intro — the opening band shared by the inner pages (About, Partner):
// mono eyebrow inside corner brackets, the page's only h1, prose body. The
// idiom follows hero.tsx band 1; promoted out of sections/about/ once the
// Partner page needed the identical shape.
//
// Padding clears the fixed navbar (same values as hero.tsx) — section-padding
// alone is not enough. Deliberately NOT a `.dark` band: the navbar only
// switches to light text when the page passes darkHero, so a dark first
// section here would render the nav links nearly invisible at scroll-top.
export type PageIntroContent = {
  eyebrow: string;
  title: string;
  body: string;
};

function PageIntro({ content }: { content: PageIntroContent }) {
  const { eyebrow, title, body } = content;

  return (
    <section
      id="intro"
      className="scroll-mt-24 overflow-hidden pt-28 pb-14 md:pt-36 md:pb-16 lg:pt-40 lg:pb-20"
    >
      <div className="container max-w-4xl">
        {/* px/py so the bracket arms clear the glyphs — the brackets are
            absolutely positioned to the wrapper's edges, so without padding
            they sit on top of the text. Same values as the CTA eyebrow. */}
        {eyebrow && (
          <CornerBrackets className="text-muted-foreground mb-8 inline-block px-3.5 py-2.5 font-mono text-xs tracking-[0.18em] uppercase">
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

export default PageIntro;
