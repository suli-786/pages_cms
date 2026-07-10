import {
  ArrowDown,
  CalendarDays,
  MapPin,
  MoveRight,
  Ticket,
  type LucideIcon,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import type { HeroContent } from "@/lib/home"

// Icons for the event-details strip, matched to eventDetails by position.
const detailIcons: LucideIcon[] = [CalendarDays, MapPin, Ticket]

function Hero({ content }: { content: HeroContent }) {
  const {
    eyebrow,
    title,
    subtitle,
    backgroundImage,
    facts,
    primaryCta,
    secondaryCta,
    footnote,
    saveDate,
    eventDetails,
  } = content

  return (
    <section className="dark relative flex min-h-[max(100svh,800px)] flex-col bg-background text-foreground">
      <div className="relative isolate flex flex-1 flex-col overflow-hidden">
        <div
          aria-hidden
          className="absolute inset-0 -z-10 bg-background bg-cover bg-[position:65%_50%] md:bg-center"
          style={{ backgroundImage: `url(${backgroundImage})` }}
        />
        <div
          aria-hidden
          className="absolute inset-0 -z-10 bg-linear-to-r from-background via-background/75 to-background/10 [mask-image:radial-gradient(ellipse_60%_70%_at_70%_55%,transparent_30%,black_95%)]"
        />
        <div
          aria-hidden
          className="absolute inset-x-0 bottom-0 -z-10 h-40 bg-linear-to-b from-transparent to-background"
        />

        <div className="container flex flex-1 flex-col">
          <div className="hero-padding max-w-5xl">
            <div className="flex items-center gap-3 text-sm">
              <MoveRight className="size-5" strokeWidth={1.25} />
              <span>{eyebrow}</span>
            </div>

            <h1 className="mt-8 text-5xl leading-[1.05] font-medium tracking-tight md:text-6xl lg:text-7xl">
              {title}
            </h1>
            <p className="mt-6 max-w-2xl text-xl text-foreground/80 md:text-2xl">
              {subtitle}
            </p>

            <ul className="mt-10 space-y-3 text-lg">
              {facts.map((fact) => (
                <li key={fact} className="flex items-center gap-3">
                  <span className="size-1.5 rounded-full bg-foreground" />
                  {fact}
                </li>
              ))}
            </ul>

            <div className="mt-10 flex flex-wrap gap-3">
              <Button size="lg" asChild>
                <a href={primaryCta.href}>{primaryCta.label}</a>
              </Button>
              <Button size="lg" variant="secondary" asChild>
                <a href={secondaryCta.href}>{secondaryCta.label}</a>
              </Button>
            </div>
          </div>

          <div className="mt-auto flex justify-between gap-2 border-t border-foreground/10 py-6 text-sm">
            <div className="flex items-center gap-3">
              <span className="size-1.5 rounded-full bg-foreground" />
              <span>{footnote}</span>
            </div>
            <div className="flex flex-col items-center gap-1 text-foreground/60">
              <span>Scroll to explore</span>
              <ArrowDown className="size-4" strokeWidth={1.25} />
            </div>
          </div>
        </div>
      </div>

      <div className="bg-card">
        <div className="container grid grid-cols-1 items-center gap-10 py-10 lg:grid-cols-[1fr_2fr]">
          <div className="space-y-4">
            <p className="text-base">
              <span className="font-semibold">{saveDate.label}</span>
              <span className="ml-3 text-foreground/80">{saveDate.value}</span>
            </p>
            <Button size="lg" asChild>
              <a href={saveDate.cta.href}>{saveDate.cta.label}</a>
            </Button>
          </div>

          <ul className="grid grid-cols-3 text-center lg:w-fit lg:justify-self-end lg:text-end">
            {eventDetails.map((d, i) => {
              const Icon = detailIcons[i] ?? CalendarDays
              return (
                <li
                  key={d.label}
                  className="relative px-3 last:pr-0 sm:px-5 md:px-6 lg:px-8"
                >
                  {i > 0 && (
                    <span
                      aria-hidden
                      className="pointer-events-none absolute inset-y-0 left-0 w-px bg-linear-to-b from-transparent from-15% via-foreground via-50% to-transparent to-85%"
                    />
                  )}
                  <Icon
                    aria-hidden
                    className="mx-auto size-6 text-foreground/60 lg:mr-0"
                    strokeWidth={1.5}
                  />
                  <p className="mt-3 text-2xl font-medium tracking-tight md:text-3xl">
                    {d.value}
                  </p>
                  <p className="mt-2 text-xs text-muted-foreground sm:text-sm">
                    {d.label}
                  </p>
                </li>
              )
            })}
          </ul>
        </div>
      </div>
    </section>
  )
}

export default Hero
