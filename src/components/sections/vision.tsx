'use client';

import { Fragment } from 'react';

import {
  EMPHASIS_PATTERN,
  emphasisClass,
  unwrapEmphasis,
} from '@/components/elements/emphasis';
import { paragraphsOf } from '@/components/elements/prose';
import { LinkPreview } from '@/components/ui/link-preview';
import type { VisionContent } from '@/lib/home';

// Vision — adapted from @shadcnblocks/feature288: a centred statement in muted
// type where key phrases stand out in full contrast and reveal a photo preview
// on hover. Phrases and their images come from the CMS `highlights` list and
// are matched inside the text; a phrase that no longer appears anywhere simply
// renders as plain text, and one with no photo yet renders in full contrast
// without a hover preview.
//
// Two CMS fields: `heading` (the opening declaration, and the section's h2) and
// `statement` (everything after it). Every block is set at one size — see
// BLOCK_TYPE — so the emphasis lands on the highlighted phrases, not on a type
// scale. Inside `statement`, a blank line starts a new paragraph and a single
// newline breaks a line, which is how the editor controls where lines land.
//
// Parsing order matters: *emphasis* markers are resolved first, then highlight
// phrases are matched inside each resulting run — so a phrase that is itself
// emphasised ("*challenge assumptions*") nests cleanly instead of leaving stray
// asterisks. Phrases spanning an emphasis boundary don't match (by design).
type Highlight = VisionContent['highlights'][number];

type Segment = { text: string; highlight?: Highlight };

const escapeRegExp = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

function segmentText(text: string, highlights: Highlight[]): Segment[] {
  let segments: Segment[] = [{ text }];
  for (const h of highlights) {
    if (!h.phrase) continue;
    // Case-insensitive match on the original string (regex index/length refer
    // to the source text, so locale case-mapping can't shift the boundaries).
    const pattern = new RegExp(escapeRegExp(h.phrase), 'i');
    segments = segments.flatMap((seg) => {
      if (seg.highlight) return [seg];
      const m = pattern.exec(seg.text);
      if (!m) return [seg];
      return [
        { text: seg.text.slice(0, m.index) },
        { text: m[0], highlight: h },
        { text: seg.text.slice(m.index + m[0].length) },
      ].filter((s) => s.text !== '');
    });
  }
  return segments;
}

function renderSegments(
  text: string,
  highlights: Highlight[],
  keyPrefix: string,
) {
  return segmentText(text, highlights).map((seg, i) =>
    seg.highlight ? (
      seg.highlight.image ? (
        // No horizontal padding: it would push the punctuation that follows the
        // phrase away from it ("built with purpose ." instead of "…purpose.").
        // alt = the phrase, so a screen reader user who opens the preview hears
        // what the photo illustrates rather than an unlabelled image.
        <LinkPreview
          key={`${keyPrefix}-${i}`}
          imageSrc={seg.highlight.image}
          imageAlt={seg.text}
          href={seg.highlight.href || undefined}
        >
          {seg.text}
        </LinkPreview>
      ) : (
        <span key={`${keyPrefix}-${i}`} className="text-foreground">
          {seg.text}
        </span>
      )
    ) : (
      <Fragment key={`${keyPrefix}-${i}`}>{seg.text}</Fragment>
    ),
  );
}

/**
 * Emphasis markers first, then highlight phrases within each run. Splits on the
 * shared EMPHASIS_PATTERN so this stays in step with renderEmphasis — the two
 * used to be independent copies of the same parser and silently diverged.
 */
function renderRich(text: string, highlights: Highlight[], keyPrefix: string) {
  return text.split(EMPHASIS_PATTERN).map((part, i) => {
    const className = emphasisClass(part);
    return className ? (
      <em key={`${keyPrefix}-${i}`} className={className}>
        {renderSegments(unwrapEmphasis(part), highlights, `${keyPrefix}-${i}`)}
      </em>
    ) : (
      <Fragment key={`${keyPrefix}-${i}`}>
        {renderSegments(part, highlights, `${keyPrefix}-${i}`)}
      </Fragment>
    );
  });
}

// One type scale for the whole section. The hierarchy comes from contrast, not
// size: the heading and the highlighted phrases sit in full colour against
// muted body text.
const BLOCK_TYPE =
  'text-2xl leading-snug font-semibold tracking-tight text-balance md:text-3xl lg:text-4xl';

function Vision({ content }: { content: VisionContent }) {
  const { heading, statement, highlights = [] } = content;

  const paragraphs = paragraphsOf(statement);

  return (
    <section
      id="vision"
      className="section-padding scroll-mt-24 overflow-hidden"
    >
      <div className="container flex max-w-5xl flex-col items-center text-center">
        {/* font-text overrides the global display face on headings, so the
            heading sits at the same weight and scale as the paragraphs. */}
        {heading && (
          <h2 className={`text-foreground font-text ${BLOCK_TYPE}`}>
            {heading}
          </h2>
        )}

        {paragraphs.length > 0 && (
          <div className="mt-10 space-y-10 md:mt-14">
            {paragraphs.map((linesInParagraph, pIndex) => (
              <p key={pIndex} className={`text-muted-foreground ${BLOCK_TYPE}`}>
                {linesInParagraph.map((line, i) => (
                  <span key={i} className="block">
                    {renderRich(line, highlights, `${pIndex}-${i}`)}
                  </span>
                ))}
              </p>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

export default Vision;
