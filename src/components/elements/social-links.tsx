import { SocialGlyph, socialLabel } from '@/components/elements/social-icons';
import type { SocialLink } from '@/lib/site';
import { cn } from '@/lib/utils';

// The round social-icon buttons rendered in the hero's third band and the
// footer's brand column. Two fixed size variants, kept as full literal class
// strings (not interpolated) so Tailwind sees them and the markup stays
// byte-identical with the previous inline copies. `md` shrinks to size-8 on
// phones so all seven platforms keep to one row in the hero's narrow band.
const SIZES = {
  md: {
    link: 'border-foreground/15 text-foreground/70 hover:border-accent hover:bg-accent/10 hover:text-foreground focus-visible:ring-ring grid size-8 place-items-center rounded-full border transition-colors outline-none focus-visible:ring-2 sm:size-10',
    glyph: 'size-4 sm:size-[18px]',
  },
  sm: {
    link: 'border-foreground/15 text-foreground/70 hover:border-accent hover:bg-accent/10 hover:text-foreground focus-visible:ring-ring grid size-9 place-items-center rounded-full border transition-colors outline-none focus-visible:ring-2',
    glyph: 'size-4',
  },
} as const;

export function SocialLinks({
  socials,
  size = 'md',
  wrap = true,
}: {
  socials: SocialLink[];
  size?: keyof typeof SIZES;
  /** Allow the row to wrap. Off in the hero, where it must stay one line. */
  wrap?: boolean;
}) {
  return (
    <ul
      className={cn(
        'flex items-center',
        wrap ? 'flex-wrap gap-2' : 'gap-1.5 sm:gap-2',
      )}
    >
      {socials.map((s) => (
        <li key={s.platform}>
          <a
            href={s.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={socialLabel(s.platform)}
            className={SIZES[size].link}
          >
            <SocialGlyph platform={s.platform} className={SIZES[size].glyph} />
          </a>
        </li>
      ))}
    </ul>
  );
}
