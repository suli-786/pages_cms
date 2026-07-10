// Our Partners — adapted from @shadcnblocks/logos17 (pro).
// Logos come from src/content/home.json via the `content` prop and are split
// into two rows; each row's column count is derived from its length (inline
// style) so adding/removing a logo in the CMS stays laid out. The mobile
// marquee uses the template's CSS `Marquee`. Pure CSS → renders as static HTML.

import { Marquee } from "@/components/ui/marquee"
import type { PartnerLogo, PartnersContent } from "@/lib/home"
import { cn } from "@/lib/utils"

function LogoImg({ logo }: { logo: PartnerLogo }) {
  return (
    <img
      src={logo.src}
      alt={logo.alt}
      className="h-auto max-h-7 w-auto object-contain dark:invert"
    />
  )
}

function LogoRow({ logos, reverse }: { logos: PartnerLogo[]; reverse?: boolean }) {
  if (logos.length === 0) return null

  return (
    <>
      {/* Desktop: static grid */}
      <div className="hidden w-full md:block">
        <div
          className="grid items-center justify-items-center gap-x-20 lg:gap-x-28"
          style={{
            gridTemplateColumns: `repeat(${logos.length}, minmax(0, 1fr))`,
          }}
        >
          {logos.map((logo, i) => (
            <div
              key={`${logo.src}-${i}`}
              className="flex aspect-3/1 w-28 items-center justify-center sm:w-32"
            >
              <LogoImg logo={logo} />
            </div>
          ))}
        </div>
      </div>

      {/* Mobile: CSS marquee */}
      <div className="w-full md:hidden">
        <Marquee pauseOnHover reverse={reverse} className="py-2">
          {logos.map((logo, i) => (
            <div
              key={`${logo.src}-${i}`}
              className="flex aspect-3/1 w-28 items-center justify-center"
            >
              <LogoImg logo={logo} />
            </div>
          ))}
        </Marquee>
      </div>
    </>
  )
}

function Partners({ content }: { content: PartnersContent }) {
  const { heading, description, items } = content
  const mid = Math.floor(items.length / 2)
  const topRow = items.slice(0, mid)
  const bottomRow = items.slice(mid)

  return (
    <section className="section-padding overflow-hidden">
      <div className="container space-y-10 lg:space-y-16">
        <div className="text-center">
          <h2 className="text-xl font-medium tracking-tight text-balance md:text-2xl lg:text-3xl">
            {heading}
          </h2>
          <p className="mt-2 text-lg text-muted-foreground">{description}</p>
        </div>

        <div className="flex w-full flex-col items-center gap-8">
          <LogoRow logos={topRow} />
          <LogoRow logos={bottomRow} reverse />
        </div>
      </div>
    </section>
  )
}

export default Partners
