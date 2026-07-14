"use client"

// Our Partners — adapted from @shadcnblocks/logos20 (pro): two logo rows
// scrolling in opposite directions under a shared heading. Logos come from
// src/content/home.json via the `content` prop and are split alternately
// across the rows. The scrolling strips are decorative duplicates (the CSS
// marquee repeats its children), so they are hidden from assistive tech; a
// visually-hidden list carries the partner names instead (names only — links
// in an sr-only list would be invisible tab stops). A pause button covers
// touch/keyboard users (WCAG 2.2.2). Hydrated with client:visible.

import { useState } from "react"

import { MarqueePause } from "@/components/elements/marquee-pause"
import { Marquee } from "@/components/ui/marquee"
import type { PartnerLogo, PartnersContent } from "@/lib/home"

function Partners({ content }: { content: PartnersContent }) {
  const { heading, description, items = [] } = content
  const [paused, setPaused] = useState(false)

  const topRow = items.filter((_, i) => i % 2 === 0)
  const bottomRow = items.filter((_, i) => i % 2 === 1)

  return (
    <section id="partners" className="section-padding scroll-mt-24 overflow-hidden">
      <div className="container text-center">
        {heading && (
          <h2 className="text-2xl tracking-tight text-balance md:text-3xl lg:text-4xl">
            {heading}
          </h2>
        )}
        {description && (
          <p className="mt-3 text-lg text-muted-foreground">{description}</p>
        )}
      </div>

      {/* Accessible partner list (the marquee below is decorative). */}
      <ul className="sr-only">
        {items.map((logo, i) => (
          <li key={`${logo.alt}-${i}`}>{logo.alt}</li>
        ))}
      </ul>

      {items.length > 0 && (
        <div
          className="mt-10 flex w-full flex-col gap-8"
          data-marquee-paused={paused || undefined}
        >
          <div aria-hidden>
            <MarqueeRow logos={topRow} />
          </div>
          <div aria-hidden>
            <MarqueeRow logos={bottomRow} reverse />
          </div>
          <div className="container flex justify-center">
            <MarqueePause
              paused={paused}
              onToggle={() => setPaused((p) => !p)}
              className="text-muted-foreground"
            />
          </div>
        </div>
      )}
    </section>
  )
}

function MarqueeRow({
  logos,
  reverse = false,
}: {
  logos: PartnerLogo[]
  reverse?: boolean
}) {
  if (logos.length === 0) return null

  return (
    <div className="relative w-full">
      <Marquee reverse={reverse} pauseOnHover className="p-0 [--duration:40s] [--gap:0px]">
        {logos.map((logo, i) => (
          <div
            key={`${logo.src}-${i}`}
            className="mx-8 flex aspect-3/1 w-28 items-center justify-center sm:w-32 lg:mx-10"
          >
            <img
              src={logo.src}
              alt=""
              className="h-auto max-h-9 w-auto object-contain"
            />
          </div>
        ))}
      </Marquee>
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-linear-to-r from-background to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-linear-to-l from-background to-transparent" />
    </div>
  )
}

export default Partners
