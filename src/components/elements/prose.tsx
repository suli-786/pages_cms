import { Fragment } from 'react';

import { renderEmphasis } from '@/components/elements/emphasis';

// Paragraph handling for the CMS's multi-line `text` fields, which carry no
// markup: a blank line starts a new paragraph and a single newline breaks a
// line inside one. That is how an editor controls where lines land.
//
// Lifted out of vision.tsx so every prose section shares one implementation.

/** Blank line → new paragraph. Single newline → line break inside a paragraph. */
export const paragraphsOf = (text: string) =>
  text
    .split(/\n\s*\n/)
    .map((p) =>
      p
        .split('\n')
        .map((line) => line.trim())
        .filter(Boolean),
    )
    .filter((p) => p.length > 0);

/**
 * Render a multi-line CMS text field as paragraphs, with `*emphasis*` and
 * `_italics_` markers resolved. A paragraph that spans several lines renders
 * each as a block span (styleable, unlike <br>); a single-line paragraph stays
 * inline so it can wrap and balance normally.
 */
export function Prose({
  text,
  className,
  paragraphClassName,
}: {
  text: string;
  className?: string;
  paragraphClassName?: string;
}) {
  const paragraphs = paragraphsOf(text);
  if (paragraphs.length === 0) return null;

  return (
    <div className={className}>
      {paragraphs.map((lines, pIndex) => (
        <p key={pIndex} className={paragraphClassName}>
          {lines.map((line, i) =>
            lines.length > 1 ? (
              <span key={i} className="block">
                {renderEmphasis(line)}
              </span>
            ) : (
              <Fragment key={i}>{renderEmphasis(line)}</Fragment>
            ),
          )}
        </p>
      ))}
    </div>
  );
}
