import { Fragment } from 'react';

// Renders the CMS `*text*` emphasis markers (documented in .pages.yml) as
// full-contrast italics. Used by the hero title and the final-CTA heading;
// the vision section has its own richer variant that nests highlights.
export function renderEmphasis(text: string) {
  return text.split(/\*([^*]+)\*/g).map((part, i) =>
    i % 2 === 1 ? (
      <em key={i} className="text-foreground italic">
        {part}
      </em>
    ) : (
      <Fragment key={i}>{part}</Fragment>
    ),
  );
}
