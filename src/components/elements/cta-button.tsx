import type { ComponentProps } from 'react';

import { MoveRight } from 'lucide-react';

import { Button } from '@/components/ui/button';
import type { CtaLink } from '@/lib/content';
import { isExternal } from '@/lib/utils';

// The site's CMS-driven CTA idiom, in one place instead of a copy per
// section: a Button-styled anchor whose arrow nudges on hover (via the
// `group/button` class Button always carries), opening external URLs in a new
// tab. Renders nothing until both label and link are filled in, so callers
// only need their own guard when they wrap extra markup around it.
type ButtonProps = ComponentProps<typeof Button>;

export function CtaButton({
  cta,
  variant,
  size,
  className,
}: {
  cta: CtaLink;
  variant?: ButtonProps['variant'];
  size?: ButtonProps['size'];
  className?: string;
}) {
  if (!cta.label || !cta.href) return null;

  return (
    <Button variant={variant} size={size} className={className} asChild>
      <a
        href={cta.href}
        {...(isExternal(cta.href)
          ? { target: '_blank', rel: 'noopener noreferrer' }
          : {})}
      >
        {cta.label}
        <MoveRight
          aria-hidden
          className="size-4 transition-transform duration-200 group-hover/button:translate-x-0.5"
        />
      </a>
    </Button>
  );
}
