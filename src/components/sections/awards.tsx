"use client"

import { Fragment, useState } from "react"
import { Award } from "lucide-react"
import { motion } from "motion/react"

import SectionHeader from "@/components/elements/section-header"
import { cn } from "@/lib/utils"

const EASE_OUT = [0.16, 1, 0.3, 1] as const

const AWARDS = [
  {
    id: "chambers",
    title: "Chambers USA — Top Rated for Lawsuits",
    year: 2024,
    image: "/images/awards/01-chambers.webp",
  },
  {
    id: "legal500",
    title: "The Legal 500 — Top Tier in Finance Law",
    year: 2024,
    image: "/images/awards/02-legal500.webp",
  },
  {
    id: "benchmark",
    title: "Benchmark Litigation — Top Tier Firm",
    year: 2025,
    image: "/images/awards/03-benchmark.webp",
  },
  {
    id: "amlaw",
    title: "The American Lawyer — Litigation Team of the Year",
    year: 2024,
    image: "/images/awards/04-amlaw.webp",
  },
  {
    id: "law360",
    title: "Law360 — Practice Group of the Year",
    year: 2023,
    image: "/images/awards/05-law360.webp",
  },
] as const

function Awards() {
  const [active, setActive] = useState(0)

  return (
    <section className="section-padding overflow-hidden">
      <div className="container">
        <SectionHeader
          badge="Our Awards"
          heading={<>Awards that reflect our work.</>}
          description="Top rankings from the guides that lawyers actually trust — earned year after year."
          mark={<AwardsMark />}
        />
      </div>

      <div className="container mt-12 md:mt-16 lg:mt-20">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-[1fr_2.6fr] md:gap-16">
          <div className="relative hidden aspect-square w-full self-end overflow-hidden rounded-xl md:block">
            {AWARDS.map((a, i) => (
              <img
                key={a.id}
                src={a.image}
                alt={a.title}
                sizes="(min-width: 768px) 400px, 100vw"
                className={cn(
                  "absolute inset-0 size-full object-cover transition-[opacity,transform] duration-300 ease-out",
                  active === i
                    ? "translate-y-0 opacity-100"
                    : "translate-y-2 opacity-0"
                )}
              />
            ))}
          </div>

          <ol className="flex flex-col">
            {AWARDS.map((a, i) => (
              <Fragment key={a.id}>
                {i > 0 && (
                  <div
                    aria-hidden
                    className={cn(
                      "mx-3 h-px transition-opacity duration-300",
                      active === i || active === i - 1
                        ? "bg-transparent"
                        : "bg-foreground/10"
                    )}
                  />
                )}
                <li className="relative">
                  {active === i && (
                    <motion.span
                      aria-hidden
                      layoutId="awards-roster-bg"
                      transition={{ duration: 0.45, ease: EASE_OUT }}
                      className="absolute inset-0 -z-10 rounded-lg bg-foreground"
                    />
                  )}
                  <button
                    type="button"
                    onMouseEnter={() => setActive(i)}
                    onFocus={() => setActive(i)}
                    onClick={() => setActive(i)}
                    aria-pressed={active === i}
                    className={cn(
                      "relative grid w-full grid-cols-[3rem_minmax(0,1fr)_auto] items-center gap-4 rounded-lg px-4 py-6 text-left transition-colors duration-300 md:gap-6 md:px-6 md:py-7 lg:py-8",
                      active === i ? "text-background" : "text-foreground"
                    )}
                  >
                    <span
                      className={cn(
                        "text-lg tabular-nums transition-colors duration-300 md:text-xl lg:text-2xl",
                        active === i ? "text-background/65" : "text-accent"
                      )}
                    >
                      {String(i + 1).padStart(2, "0")}.
                    </span>
                    <span className="text-lg leading-snug tracking-tight md:text-xl lg:text-2xl">
                      {a.title}
                    </span>
                    <span
                      className={cn(
                        "text-lg tabular-nums transition-colors duration-300 md:text-xl lg:text-2xl",
                        active === i
                          ? "text-background/65"
                          : "text-foreground/55"
                      )}
                    >
                      {a.year}
                    </span>
                  </button>

                  {active === i && (
                    <div className="animate-in px-4 pb-4 duration-300 ease-out fade-in slide-in-from-bottom-2 md:hidden">
                      <div className="relative aspect-[4/5] w-full overflow-hidden rounded-md">
                        <img
                          src={a.image}
                          alt={a.title}
                          sizes="100vw"
                          className="absolute inset-0 size-full object-cover"
                        />
                      </div>
                    </div>
                  )}
                </li>
              </Fragment>
            ))}
          </ol>
        </div>
      </div>
    </section>
  )
}

function AwardsMark() {
  return <Award aria-hidden className="size-10 text-foreground/30" strokeWidth={1} />
}

export default Awards
