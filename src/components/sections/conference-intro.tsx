// Conference intro + Why Attend — adapted from @shadcnblocks/feature71 (pro).
// Upper band: uppercase tagline, heading, body and paired CTAs. Below: a mixed
// grid alternating wide photo tiles with solid benefit cells (the "why join"
// content). Everything comes from src/content/home.json via the `content`
// prop. No state/hooks → renders as static HTML (no client directive).

import { ArrowDown, ArrowRight } from "lucide-react"

import { Button } from "@/components/ui/button"
import type { ConferenceContent } from "@/lib/home"
import { cn } from "@/lib/utils"

function ConferenceIntro({ content }: { content: ConferenceContent }) {
  const {
    tagline,
    heading,
    body,
    primaryCta,
    secondaryCta,
    tiles = [],
    benefits = [],
  } = content

  const [tileOne, tileTwo] = tiles.filter((t) => t.image.src)

  return (
    <section id="event" className="section-padding scroll-mt-24">
      <div className="container flex flex-col items-center gap-16 lg:px-16">
        <div className="flex flex-col items-center text-center">
          {tagline && (
            <p className="mb-6 text-xs font-medium tracking-wider uppercase">
              {tagline}
            </p>
          )}
          <h2 className="mb-3 text-3xl text-pretty md:mb-4 md:text-4xl lg:mb-6 lg:max-w-3xl lg:text-5xl">
            {heading}
          </h2>
          {body && (
            <p className="mb-8 text-muted-foreground lg:max-w-2xl lg:text-lg">
              {body}
            </p>
          )}
          <div className="flex w-full flex-col justify-center gap-2 sm:flex-row">
            {primaryCta.label && primaryCta.href && (
              <Button className="w-full sm:w-auto" asChild>
                <a href={primaryCta.href}>
                  <ArrowDown aria-hidden className="size-4" />
                  {primaryCta.label}
                </a>
              </Button>
            )}
            {secondaryCta.label && secondaryCta.href && (
              <Button variant="outline" className="w-full sm:w-auto" asChild>
                <a href={secondaryCta.href}>{secondaryCta.label}</a>
              </Button>
            )}
          </div>
        </div>

        {(tileOne || benefits.length > 0) && (
          <div className="grid w-full grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4 lg:gap-8">
            {tileOne && <PhotoTile tile={tileOne} wide="sm:aspect-3/2" />}

            {benefits.map((benefit, i) => (
              <div
                key={`${benefit.title}-${i}`}
                className={cn(
                  "flex flex-col justify-between rounded-lg bg-accent p-4 text-accent-foreground md:p-6 lg:p-10",
                  i < 2 && "sm:justify-end"
                )}
              >
                <p className="mb-8 text-2xl tracking-tight sm:mb-2 lg:text-4xl">
                  {benefit.title}
                </p>
                <p className="text-xs md:text-sm lg:text-base">
                  {benefit.description}
                </p>
              </div>
            ))}

            {tileTwo && <PhotoTile tile={tileTwo} wide="sm:aspect-2/1" />}
          </div>
        )}
      </div>
    </section>
  )
}

function PhotoTile({
  tile,
  wide,
}: {
  tile: NonNullable<ConferenceContent["tiles"][number]>
  wide: string
}) {
  const { image, caption, href, linkLabel } = tile

  const inner = (
    <>
      <img
        src={image.src}
        alt={image.alt}
        className="absolute h-full w-full object-cover object-center"
      />
      <div
        className={cn(
          "relative flex h-full w-full flex-col items-start justify-between bg-black/60 p-4 transition-colors md:p-6 lg:p-10",
          href && "group-hover:bg-black/70",
          wide
        )}
      >
        <p className="mb-12 text-xl font-semibold text-white md:text-2xl">
          {caption}
        </p>
        {href && linkLabel && (
          <span className="flex items-center text-xs font-medium text-white md:text-base lg:text-lg">
            {linkLabel}{" "}
            <ArrowRight
              aria-hidden
              className="ml-2 size-4 transition-transform group-hover:translate-x-1"
            />
          </span>
        )}
      </div>
    </>
  )

  const tileClass =
    "group relative col-span-2 overflow-clip rounded-lg sm:max-lg:col-span-1"

  return href ? (
    <a href={href} className={tileClass}>
      {inner}
    </a>
  ) : (
    <div className={tileClass}>{inner}</div>
  )
}

export default ConferenceIntro
