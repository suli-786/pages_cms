import { MoveRight } from 'lucide-react';

import { Prose } from '@/components/elements/prose';
import { Button } from '@/components/ui/button';
import type { ResolvedStoryContent } from '@/lib/images-about';
import { cn, isExternal } from '@/lib/utils';

// Our story — adapted from @shadcnblocks/about6: story copy in one column, a
// staggered photo grid in the other. The block's six-photo double-stack is
// reduced to the CMS list (first three used): one tall lead photo beside a
// stacked pair, which is the block's own rhythm at half the volume.
//
// Photos are optional — with none, the prose runs full width at reading measure
// rather than leaving a hole where the grid was.
const ASPECTS = ['aspect-[0.75]', 'aspect-[1.1]', 'aspect-[0.85]'];

function Story({ content }: { content: ResolvedStoryContent }) {
  const { label, heading, body, cta, photos } = content;
  const shots = photos.filter((p) => p.src).slice(0, 3);
  const [lead, ...rest] = shots;

  return (
    <section
      id="story"
      className="section-padding scroll-mt-24 overflow-hidden"
    >
      <div className="container">
        <div
          className={cn(
            'flex flex-col gap-12 lg:gap-16',
            shots.length > 0 && 'lg:flex-row lg:items-start',
          )}
        >
          <div
            className={cn(
              'flex flex-col items-start',
              shots.length > 0 ? 'lg:w-1/2' : 'max-w-3xl',
            )}
          >
            {label && (
              <p className="text-muted-foreground mb-6 font-mono text-xs tracking-[0.18em] uppercase">
                {label}
              </p>
            )}

            {heading && (
              <h2 className="text-4xl leading-[1.05] font-light tracking-tight text-balance md:text-5xl">
                {heading}
              </h2>
            )}

            <Prose
              text={body}
              className="mt-8 space-y-6"
              paragraphClassName="text-muted-foreground leading-relaxed text-pretty"
            />

            {cta.label && cta.href && (
              <Button variant="outline" className="mt-10" asChild>
                <a
                  href={cta.href}
                  {...(isExternal(cta.href)
                    ? { target: '_blank', rel: 'noopener noreferrer' }
                    : {})}
                >
                  {cta.label}
                  <MoveRight
                    className="transition-transform group-hover/button:translate-x-0.5"
                    data-icon="inline-end"
                  />
                </a>
              </Button>
            )}
          </div>

          {shots.length > 0 && (
            <div className="flex w-full flex-col gap-6 sm:flex-row lg:w-1/2 lg:pt-16">
              {lead && (
                <img
                  {...lead}
                  className={cn(
                    'w-full rounded-lg object-cover sm:w-1/2',
                    ASPECTS[0],
                  )}
                  loading="lazy"
                  decoding="async"
                />
              )}
              {rest.length > 0 && (
                <div className="flex w-full flex-col gap-6 sm:w-1/2">
                  {rest.map((shot, i) => (
                    <img
                      key={i}
                      {...shot}
                      className={cn(
                        'w-full rounded-lg object-cover',
                        ASPECTS[i + 1],
                      )}
                      loading="lazy"
                      decoding="async"
                    />
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export default Story;
