import { WhyColumns } from '@/components/elements/why-columns';
import type { WhyContent } from '@/lib/about';

// Why we exist — the shared column-band layout (see why-columns.tsx). These
// are four simultaneous conditions, not a sequence, so nothing here is
// numbered. The block's framing paragraphs before and after the band were
// removed (user decision, 2026-07-19): the section is the heading and the
// four conditions, each self-contained.
function Why({ content }: { content: WhyContent }) {
  return (
    <section id="why" className="section-padding scroll-mt-24 overflow-hidden">
      <WhyColumns heading={content.heading} items={content.items} />
    </section>
  );
}

export default Why;
