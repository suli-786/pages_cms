import { MoveRight } from 'lucide-react';

import { cn } from '@/lib/utils';

// Viewfinder-framed CTA: four corner brackets that spread and take the accent
// colour on hover. Used as the `mark` in SectionHeader — the Speakers and
// Partners sections' "Interested in speaking? / Partner with us" links.
export function FramedCta({ label, href }: { label: string; href: string }) {
  const corner =
    'absolute size-3 border-foreground/40 transition-all duration-300 group-hover:size-4 group-hover:border-accent';
  return (
    <a
      href={href}
      className="group focus-visible:ring-ring relative inline-flex items-center gap-2.5 px-6 py-5 font-mono text-xs tracking-[0.18em] uppercase outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
    >
      <span
        aria-hidden
        className={cn(corner, 'top-0 left-0 border-t border-l')}
      />
      <span
        aria-hidden
        className={cn(corner, 'top-0 right-0 border-t border-r')}
      />
      <span
        aria-hidden
        className={cn(corner, 'bottom-0 left-0 border-b border-l')}
      />
      <span
        aria-hidden
        className={cn(corner, 'right-0 bottom-0 border-r border-b')}
      />
      {label}
      <MoveRight
        aria-hidden
        className="size-4 transition-transform duration-300 group-hover:translate-x-1"
        strokeWidth={1.25}
      />
    </a>
  );
}
