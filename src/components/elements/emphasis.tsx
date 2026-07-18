import { Fragment } from 'react';

// Renders the CMS inline markers (documented in .pages.yml):
//
//   *text*  → full-contrast italics. The site's emphasis grammar is inverted:
//             surrounding copy is muted and the emphasised run is the one at
//             full contrast, so this carries a colour bump as well as italics.
//   _text_  → plain italics, no colour change. Used for Arabic terms on first
//             use (*niyyah* would shout; the brand voice guide asks for italics
//             only). Keep the two markers distinct for exactly that reason.
//
// Used by the hero title, the final-CTA heading and the About sections. The
// vision section has its own richer variant (renderRich) that nests highlight
// phrases inside these runs — it splits on the SAME pattern, so if you add a
// marker here, add it there too.
export const EMPHASIS_PATTERN = /(\*[^*]+\*|_[^_]+_)/g;

/** Classes for a marked run, or null when the text isn't a marker. */
export function emphasisClass(part: string): string | null {
  if (/^\*[^*]+\*$/.test(part)) return 'text-foreground italic';
  if (/^_[^_]+_$/.test(part)) return 'italic';
  return null;
}

/** Strip the surrounding marker characters. */
export const unwrapEmphasis = (part: string) => part.slice(1, -1);

export function renderEmphasis(text: string) {
  return text.split(EMPHASIS_PATTERN).map((part, i) => {
    const className = emphasisClass(part);
    return className ? (
      <em key={i} className={className}>
        {unwrapEmphasis(part)}
      </em>
    ) : (
      <Fragment key={i}>{part}</Fragment>
    );
  });
}
