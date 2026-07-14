"use client"

import { Fragment, useEffect, useState } from "react"
import {
  CalendarDays,
  MapPin,
  MoveRight,
  Ticket,
  type LucideIcon,
} from "lucide-react"
import { AnimatePresence, motion, useReducedMotion } from "motion/react"

import { MarqueePause } from "@/components/elements/marquee-pause"
import { Avatar, AvatarFallback, AvatarGroup, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Marquee } from "@/components/ui/marquee"
import type { HeroContent, PartnerLogo, Speaker } from "@/lib/home"

// Adapted from @shadcnblocks/hero272: split layout with a stacked, divided
// left column and a nine-cell photo grid that rotates on a timer. The three
// left bands are repurposed for the conference — headline + event details,
// featured speakers + CTAs, partner logo marquee. Speakers and partner logos
// are cross-fed from their own CMS sections (no duplicate content entry).
const GRID_SIZE = 9
const ROTATION_INTERVAL = 7000 // ms

// Icons for the event-details strip, matched to eventDetails by position.
const detailIcons: LucideIcon[] = [CalendarDays, MapPin, Ticket]

/** Renders `*text*` markers as emphasized words (documented in .pages.yml). */
function renderEmphasis(text: string) {
  return text.split(/\*([^*]+)\*/g).map((part, i) =>
    i % 2 === 1 ? (
      <em key={i} className="text-foreground italic">
        {part}
      </em>
    ) : (
      <Fragment key={i}>{part}</Fragment>
    )
  )
}

function Hero({
  content,
  speakers = [],
  partners = [],
}: {
  content: HeroContent
  speakers?: Speaker[]
  partners?: PartnerLogo[]
}) {
  const {
    eyebrow,
    title,
    subtitle,
    eventDetails = [],
    speakersLabel,
    primaryCta,
    secondaryCta,
    partnersLabel,
    gallery = [],
  } = content

  const featuredSpeakers = speakers.filter((s) => s.portrait).slice(0, 6)
  const galleryImages = gallery.filter(Boolean)
  const hasGallery = galleryImages.length > 0
  const hasPartnerBand = partnersLabel !== "" && partners.length > 0
  const [marqueePaused, setMarqueePaused] = useState(false)

  return (
    <section className="dark relative overflow-hidden bg-background text-foreground">
      <div className="container pt-28 pb-14 md:pt-36 md:pb-16 lg:pt-40 lg:pb-20">
        <div
          className={
            hasGallery
              ? "grid border border-foreground/10 lg:grid-cols-2 lg:divide-x lg:divide-foreground/10"
              : "grid border border-foreground/10"
          }
        >
          {/* min-w-0: keep the marquee's intrinsic width from stretching the column */}
          <div className="flex min-w-0 flex-col divide-y divide-foreground/10">
            {/* Band 1 — headline, subtitle, event details */}
            <div className="flex flex-1 flex-col justify-center p-6 md:p-8">
              {eyebrow && (
                <p className="mb-6 flex items-center gap-3 text-sm text-foreground/70">
                  <MoveRight aria-hidden className="size-5" strokeWidth={1.25} />
                  {eyebrow}
                </p>
              )}
              <h1 className="max-w-3xl text-4xl tracking-tight text-foreground/60 md:text-5xl lg:text-6xl">
                {renderEmphasis(title)}
              </h1>
              {subtitle && (
                <p className="mt-5 max-w-xl text-balance text-lg text-foreground/75">
                  {subtitle}
                </p>
              )}
              {eventDetails.length > 0 && (
                <ul className="mt-8 flex flex-wrap gap-x-8 gap-y-4">
                  {eventDetails.map((d, i) => {
                    const Icon = detailIcons[i] ?? CalendarDays
                    return (
                      <li key={`${d.label}-${i}`} className="flex items-center gap-2.5">
                        <Icon
                          aria-hidden
                          className="size-5 text-accent"
                          strokeWidth={1.5}
                        />
                        <span className="text-sm">
                          <span className="block font-medium">{d.value}</span>
                          <span className="block text-xs text-foreground/55">
                            {d.label}
                          </span>
                        </span>
                      </li>
                    )
                  })}
                </ul>
              )}
            </div>

            {/* Band 2 — featured speakers + CTAs */}
            <div className="flex flex-1 flex-col justify-center p-6 md:p-8">
              {featuredSpeakers.length > 0 && (
                <>
                  {speakersLabel && (
                    <p className="mb-3 text-sm font-medium tracking-tight text-foreground/70">
                      {speakersLabel}
                    </p>
                  )}
                  <AvatarGroup className="grayscale">
                    {featuredSpeakers.map((s) => (
                      <Avatar
                        key={`${s.name}-${s.portrait}`}
                        className="size-12 ring-2 ring-background"
                      >
                        <AvatarImage src={s.portrait} alt={s.name} />
                        <AvatarFallback>{s.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                    ))}
                  </AvatarGroup>
                </>
              )}
              <div className="mt-8 flex flex-wrap items-center gap-3">
                {primaryCta.label && primaryCta.href && (
                  <Button size="lg" asChild>
                    <a href={primaryCta.href}>{primaryCta.label}</a>
                  </Button>
                )}
                {secondaryCta.label && secondaryCta.href && (
                  <Button size="lg" variant="outline" asChild>
                    <a href={secondaryCta.href}>{secondaryCta.label}</a>
                  </Button>
                )}
              </div>
            </div>

            {/* Band 3 — partner logo marquee (decorative teaser; the Partners
                section carries the accessible list) */}
            {hasPartnerBand && (
              <div
                className="flex flex-1 flex-col justify-center p-6 md:p-8"
                data-marquee-paused={marqueePaused || undefined}
              >
                <div className="mb-4 flex items-center justify-between gap-3">
                  <p className="text-sm font-medium tracking-tight text-foreground/70">
                    {partnersLabel}
                  </p>
                  <MarqueePause
                    paused={marqueePaused}
                    onToggle={() => setMarqueePaused((p) => !p)}
                    className="text-foreground/70"
                  />
                </div>
                <div
                  aria-hidden
                  className="relative w-full overflow-hidden mask-x-from-80%"
                >
                  <Marquee pauseOnHover className="[--gap:1.5rem] p-0">
                    {partners.map((p, i) => (
                      <span
                        key={`${p.src}-${i}`}
                        className="flex h-12 w-24 items-center justify-center rounded-md bg-white/95 p-1.5"
                      >
                        <img
                          src={p.src}
                          alt=""
                          className="max-h-9 w-auto max-w-full object-contain"
                        />
                      </span>
                    ))}
                  </Marquee>
                </div>
              </div>
            )}
          </div>

          {/* Rotating photo grid — ambient event imagery, hidden from AT */}
          {hasGallery && (
            <div aria-hidden className="min-w-0 max-lg:border-t max-lg:border-foreground/10">
              <PhotoGrid gallery={galleryImages} />
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

function PhotoGrid({ gallery }: { gallery: string[] }) {
  const [startIndex, setStartIndex] = useState(0)
  const reducedMotion = useReducedMotion()

  const canRotate = !reducedMotion && gallery.length > GRID_SIZE

  useEffect(() => {
    if (!canRotate) return
    const id = setInterval(() => {
      setStartIndex((prev) => (prev + GRID_SIZE) % gallery.length)
    }, ROTATION_INTERVAL)
    return () => clearInterval(id)
  }, [canRotate, gallery.length])

  return (
    <div className="grid h-full grid-cols-3 gap-px bg-foreground/10 perspective-[1200px]">
      {Array.from({ length: GRID_SIZE }).map((_, cell) => {
        const src = gallery[(startIndex + cell) % gallery.length]
        return (
          <div key={cell} className="overflow-hidden bg-background/40 p-1">
            <div className="relative aspect-square h-full w-full">
              <AnimatePresence initial={false}>
                <motion.img
                  key={`${cell}-${src}`}
                  src={src}
                  alt=""
                  className="absolute inset-0 size-full object-cover"
                  initial={
                    reducedMotion ? { opacity: 1 } : { rotateY: 15, opacity: 0 }
                  }
                  animate={{ rotateY: 0, opacity: 1 }}
                  exit={
                    reducedMotion ? { opacity: 0 } : { rotateY: -10, opacity: 0 }
                  }
                  transition={{
                    duration: 0.6,
                    ease: "easeInOut",
                    delay: reducedMotion ? 0 : cell * 0.09,
                  }}
                />
              </AnimatePresence>
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default Hero
