import { WhyColumns } from '@/components/elements/why-columns';
import type { PartnerWhyContent } from '@/lib/partner';

// Why partner — the shared column-band layout (see why-columns.tsx), same
// treatment as the About page's "Our Why" (user decision, 2026-08-03; the two
// previously used different layouts on purpose, to keep the pages visually
// distinct — that decision was reversed).
function Why({ content }: { content: PartnerWhyContent }) {
  return (
    <section id="why" className="section-padding scroll-mt-24 overflow-hidden">
      <WhyColumns heading={content.heading} items={content.items} />
    </section>
  );
}

export default Why;
