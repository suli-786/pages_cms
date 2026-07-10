"use client"

import { MoveUpRight } from "lucide-react"
import { motion } from "motion/react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import type { ServiceFrontmatter } from "@/lib/types"
import { cn } from "@/lib/utils"

const EASE_OUT = [0.23, 1, 0.32, 1] as const

// Rhythm default: tile indexes 1 and 2 sit grayscale at rest (the diagonal pair
// from top-right of the featured row to bottom-left of the secondary row).
// On hover of any tile, the hovered one becomes color and the rest grayscale —
// handled via `group-has-[a:hover]/tiles:` + `group-hover/tile:` overrides.
const RHYTHM_GRAYSCALE_INDEXES = new Set([1, 2])

function ServicesFeatured({ services }: { services: ServiceFrontmatter[] }) {
  const featured = services.slice(0, 2)
  const secondary = services.slice(2)

  return (
    <section className="hero-padding overflow-hidden">
      <div className="container grid grid-cols-1 gap-12 lg:grid-cols-3 lg:gap-16">
        <FeaturedHeader />

        <div className="group/tiles grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-5 lg:col-span-2">
          {featured.map((s, i) => (
            <ServiceTile
              key={s.slug}
              service={s}
              variant="featured"
              delay={i * 0.06}
              defaultGrayscale={RHYTHM_GRAYSCALE_INDEXES.has(i)}
            />
          ))}

          <div className="col-span-full grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-5">
            {secondary.map((s, i) => {
              const isLast = i === secondary.length - 1
              const absoluteIndex = i + 2
              return (
                <ServiceTile
                  key={s.slug}
                  service={s}
                  variant="secondary"
                  delay={absoluteIndex * 0.06}
                  isWide={isLast}
                  defaultGrayscale={RHYTHM_GRAYSCALE_INDEXES.has(absoluteIndex)}
                />
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}

function FeaturedHeader() {
  return (
    <motion.div
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-15%" }}
      variants={{ show: { transition: { staggerChildren: 0.08 } } }}
      className="flex flex-col justify-between lg:col-span-1"
    >
      <div>
        <motion.div
          variants={{
            hidden: { opacity: 0, y: 14 },
            show: { opacity: 1, y: 0 },
          }}
          transition={{ duration: 0.6, ease: EASE_OUT }}
        >
          <Badge variant="outline" size="lg">
            <span className="size-1 rounded-full bg-foreground/40" />
            Services
            <span className="size-1 rounded-full bg-foreground/40" />
          </Badge>
        </motion.div>
        <motion.h1
          variants={{
            hidden: { opacity: 0, y: 18 },
            show: { opacity: 1, y: 0 },
          }}
          transition={{ duration: 0.7, ease: EASE_OUT }}
          className="mt-8 text-4xl leading-[1.02] font-light tracking-tight md:text-5xl lg:text-6xl"
        >
          What we do.
        </motion.h1>
        <motion.p
          variants={{
            hidden: { opacity: 0, y: 14 },
            show: { opacity: 1, y: 0 },
          }}
          transition={{ duration: 0.7, ease: EASE_OUT }}
          className="mt-6 max-w-sm text-base text-muted-foreground md:text-lg"
        >
          Six practice areas the firm accepts work in. Every engagement is
          partner-led from the first call.
        </motion.p>
      </div>

      <motion.div
        variants={{
          hidden: { opacity: 0, y: 12 },
          show: { opacity: 1, y: 0 },
        }}
        transition={{ duration: 0.6, ease: EASE_OUT }}
        className="mt-10 lg:mt-12"
      >
        <Button asChild variant="outline" size="lg">
          <a href="/contact">
            Brief our team
            <MoveUpRight />
          </a>
        </Button>
      </motion.div>
    </motion.div>
  )
}

function ServiceTile({
  service,
  variant,
  delay,
  isWide = false,
  defaultGrayscale = false,
}: {
  service: ServiceFrontmatter
  variant: "featured" | "secondary"
  delay: number
  isWide?: boolean
  defaultGrayscale?: boolean
}) {
  const isFeatured = variant === "featured"
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{ duration: 0.6, ease: EASE_OUT, delay }}
      className={cn(isWide && "sm:col-span-2")}
    >
      <a
        href={`/services/${service.slug}`}
        className="group/tile block overflow-hidden rounded-xl outline-none focus-visible:ring-2 focus-visible:ring-ring/40"
        aria-label={service.name}
      >
        <Card
          variant="image"
          className={cn(
            "relative isolate ring-0",
            isFeatured
              ? "aspect-[3/4]"
              : isWide
                ? "aspect-[21/9]"
                : "aspect-[4/3]"
          )}
        >
          <img
            src={service.image}
            alt=""
            sizes={
              isFeatured
                ? "(min-width: 768px) 30vw, 100vw"
                : isWide
                  ? "(min-width: 768px) 44vw, 100vw"
                  : "(min-width: 768px) 22vw, 100vw"
            }
            className={cn(
              "absolute inset-0 size-full object-cover transition duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] will-change-transform group-hover/tile:scale-[1.04]",
              service.slug === "restructuring-recovery" && "object-[50%_30%]",
              defaultGrayscale && "grayscale",
              "group-has-[a:hover]/tiles:grayscale",
              "group-hover/tile:!grayscale-0"
            )}
          />
          <div
            aria-hidden
            className="absolute inset-0 bg-linear-to-t from-black/80 via-black/15 to-black/35"
          />

          <div
            className={cn(
              "absolute inset-0 flex flex-col justify-between text-white",
              isFeatured ? "p-6 md:p-8" : "p-5 md:p-6"
            )}
          >
            <div className="flex items-start justify-end">
              <span className="grid size-9 place-items-center rounded-full bg-white/12 text-white ring-1 ring-white/25 backdrop-blur-sm transition-transform duration-300 group-hover/tile:translate-x-0.5 group-hover/tile:-translate-y-0.5">
                <MoveUpRight className="size-4" strokeWidth={1.5} />
              </span>
            </div>

            <div>
              <h3
                className={cn(
                  "leading-tight font-light tracking-tight",
                  isFeatured
                    ? "text-2xl md:text-3xl lg:text-4xl"
                    : "text-lg md:text-xl"
                )}
              >
                {service.name}.
              </h3>
              <p
                className={cn(
                  "mt-2 max-w-xs leading-snug text-white/85",
                  isFeatured ? "text-sm md:text-base" : "text-xs md:text-sm"
                )}
              >
                {service.tagline}
              </p>
            </div>
          </div>
        </Card>
      </a>
    </motion.div>
  )
}

export default ServicesFeatured
