import { type ReactNode } from 'react';

import { cn } from '@/lib/utils';

// The site's viewfinder ornament: two accent corner brackets — top-right and
// bottom-left — framing a piece of content. Used on the contact heading, the
// hero eyebrow, the "why build" card categories and the partner tier frames.
// Span-based so it is valid inside headings and paragraphs; give the wrapper
// padding via className so the brackets clear the content.
export function CornerBrackets({
  children,
  className,
  cornerClassName = 'size-2.5',
}: {
  children: ReactNode;
  className?: string;
  cornerClassName?: string;
}) {
  return (
    <span className={cn('relative inline-block', className)}>
      <span
        aria-hidden
        className={cn(
          'border-accent absolute top-0 right-0 border-t-2 border-r-2',
          cornerClassName,
        )}
      />
      <span
        aria-hidden
        className={cn(
          'border-accent absolute bottom-0 left-0 border-b-2 border-l-2',
          cornerClassName,
        )}
      />
      {children}
    </span>
  );
}
