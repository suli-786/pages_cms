// Conference intro + Why Attend — adapted from @shadcnblocks/feature71 (pro).
// Upper band: heading + body. Below: a mosaic that alternates wide photo tiles
// with text cards (the "why build" reasons). Everything comes from
// src/content/home.json via the `content` prop. No state/hooks → static HTML.

import { ArrowRight } from 'lucide-react';

import type { ConferenceContent } from '@/lib/home';
import { cn } from '@/lib/utils';

/** Only real URLs open in a new tab — a placeholder `#` must not. */
const isExternal = (href: string) => /^https?:\/\//.test(href);

function ConferenceIntro({ content }: { content: ConferenceContent }) {
  const { tagline, heading, body, tiles = [], benefits = [] } = content;

  const [tileOne, tileTwo] = tiles.filter((t) => t.image.src);

  return (
    <section id="event" className="section-padding scroll-mt-24">
      <div className="container flex flex-col items-center gap-16 lg:px-16">
        <div className="flex max-w-3xl flex-col items-center text-center">
          {tagline && (
            <p className="mb-5 text-xs font-medium tracking-wider uppercase">
              {tagline}
            </p>
          )}
          <h2 className="text-3xl text-pretty md:text-4xl lg:text-5xl">
            {heading}
          </h2>
          {body && (
            <p className="text-muted-foreground mt-6 text-base text-pretty md:mt-7 lg:text-lg">
              {body}
            </p>
          )}
        </div>

        {(tileOne || benefits.length > 0) && (
          <div className="grid w-full grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4 lg:gap-8">
            {tileOne && <PhotoTile tile={tileOne} wide="sm:aspect-3/2" />}

            {benefits.map((benefit, i) => (
              <article
                key={`${benefit.title}-${i}`}
                className="border-border bg-muted flex flex-col gap-3 rounded-lg border p-6 lg:p-8"
              >
                {benefit.category && (
                  <p className="text-primary flex items-center gap-2.5 text-xs font-medium tracking-wider uppercase">
                    <span aria-hidden className="bg-accent h-px w-5" />
                    {benefit.category}
                  </p>
                )}
                {benefit.title && (
                  <h3 className="text-xl tracking-tight md:text-2xl">
                    {benefit.title}
                  </h3>
                )}
                {benefit.body && (
                  <p className="text-muted-foreground text-sm leading-relaxed text-pretty md:text-base">
                    {benefit.body}
                  </p>
                )}
              </article>
            ))}

            {tileTwo && <PhotoTile tile={tileTwo} wide="sm:aspect-2/1" />}
          </div>
        )}
      </div>
    </section>
  );
}

function PhotoTile({
  tile,
  wide,
}: {
  tile: NonNullable<ConferenceContent['tiles'][number]>;
  wide: string;
}) {
  // The `whatsapp` CMS token is already resolved to a real URL by lib/home.ts.
  const { image, caption, href, linkLabel } = tile;

  const inner = (
    <>
      <img
        src={image.src}
        alt={image.alt}
        className="absolute h-full w-full object-cover object-center"
      />
      <div
        className={cn(
          'relative flex h-full w-full flex-col items-start justify-between bg-black/60 p-4 transition-colors md:p-6 lg:p-10',
          href && 'group-hover:bg-black/70',
          wide,
        )}
      >
        <p className="mb-12 text-xl font-semibold text-white md:text-2xl">
          {caption}
        </p>
        {href && linkLabel && (
          <span className="flex items-center text-xs font-medium text-white md:text-base lg:text-lg">
            {linkLabel}{' '}
            <ArrowRight
              aria-hidden
              className="ml-2 size-4 transition-transform group-hover:translate-x-1"
            />
          </span>
        )}
      </div>
    </>
  );

  const tileClass = 'group relative col-span-2 overflow-clip rounded-lg';

  return href ? (
    <a
      href={href}
      className={tileClass}
      {...(isExternal(href)
        ? { target: '_blank', rel: 'noopener noreferrer' }
        : {})}
    >
      {inner}
    </a>
  ) : (
    <div className={tileClass}>{inner}</div>
  );
}

export default ConferenceIntro;
