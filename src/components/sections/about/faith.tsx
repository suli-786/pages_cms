import { CornerBrackets } from '@/components/elements/corner-brackets';
import { Prose } from '@/components/elements/prose';
import type { FaithContent } from '@/lib/about';

// Rooted in faith — bespoke. The registry has no pull-quote/scripture block
// (searched), and the site already owns the right ornament: the corner-bracket
// viewfinder that frames the hero eyebrow reads as a frame around the verse.
//
// <figure>/<figcaption> rather than a <footer> inside <blockquote>: the citation
// is about the quotation, not part of it, which is the pairing <figcaption> is
// for. Same structure as the figure in not-found.tsx.
function Faith({ content }: { content: FaithContent }) {
  const { heading, lead, quote, body } = content;

  return (
    <section
      id="faith"
      className="section-padding scroll-mt-24 overflow-hidden"
    >
      <div className="container max-w-3xl">
        {heading && (
          <h2 className="text-4xl leading-[1.05] font-light tracking-tight text-balance md:text-5xl">
            {heading}
          </h2>
        )}

        <Prose
          text={lead}
          className="mt-8 space-y-6"
          paragraphClassName="text-muted-foreground leading-relaxed text-pretty"
        />

        {quote.text && (
          // The bracket box hugs the verse: no text-balance (so the lines fill
          // the measure and the corners sit near real text, not white space)
          // and padding just wide enough for the arms to clear the glyphs.
          <figure className="mt-10 max-w-2xl">
            <CornerBrackets
              className="block px-5 py-6 md:px-6 md:py-7"
              cornerClassName="size-3.5"
            >
              <blockquote>
                <p className="font-text text-xl leading-snug font-light tracking-tight text-pretty md:text-2xl">
                  {quote.text}
                </p>
              </blockquote>
            </CornerBrackets>
            {quote.attribution && (
              <figcaption className="text-muted-foreground mt-4 ps-5 font-mono text-xs tracking-[0.18em] uppercase md:ps-6">
                <cite className="not-italic">{quote.attribution}</cite>
              </figcaption>
            )}
          </figure>
        )}

        <Prose
          text={body}
          className="mt-10 space-y-6"
          paragraphClassName="text-muted-foreground leading-relaxed text-pretty"
        />
      </div>
    </section>
  );
}

export default Faith;
