import { type ReactNode } from 'react';

import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

type SectionHeaderProps = {
  badge?: ReactNode;
  heading: ReactNode;
  description: ReactNode;
  mark?: ReactNode;
};

// Shared section header. With a badge it keeps the two-column layout (badge
// left, heading right). Without one the heading spans the container and the
// mark sits on its right — the layout the Speakers section uses for its
// framed CTA. `mark` can be any node: decoration or a functional element.
function SectionHeader({
  badge,
  heading,
  description,
  mark,
}: SectionHeaderProps) {
  return (
    <div
      className={cn(
        'grid grid-cols-1 gap-10',
        badge && 'md:grid-cols-[1fr_2.6fr] md:gap-16',
      )}
    >
      {badge && (
        <div className="flex items-center justify-between gap-4 md:block">
          <Badge variant="outline" size="lg">
            <span className="bg-foreground/40 size-1 rounded-full" />
            {badge}
            <span className="bg-foreground/40 size-1 rounded-full" />
          </Badge>
          {mark && <div className="md:hidden">{mark}</div>}
        </div>
      )}
      <div>
        <div className="flex items-start justify-between gap-x-10">
          <h2 className="text-4xl leading-[1.05] font-light tracking-tight md:text-5xl lg:text-6xl">
            {heading}
          </h2>
          {mark && <div className="hidden shrink-0 md:block">{mark}</div>}
        </div>
        <p className="text-muted-foreground mt-8 max-w-2xl text-base">
          {description}
        </p>
        {/* Badge-less mobile: the mark has no badge row to share, so it sits
            under the description instead. */}
        {mark && !badge && <div className="mt-8 md:hidden">{mark}</div>}
      </div>
    </div>
  );
}

export default SectionHeader;
