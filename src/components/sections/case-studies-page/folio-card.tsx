"use client"

import { useMemo } from "react"
import { MoveUpRight } from "lucide-react"
import { motion, useReducedMotion } from "motion/react"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import type { CaseStudyFrontmatter } from "@/lib/types"
import { cn } from "@/lib/utils"

const EASE = [0.22, 1, 0.36, 1] as const
const IMAGE_EASE = [0.16, 1, 0.3, 1] as const

const buildVariants = (reduce: boolean) => ({
  container: {
    hidden: {},
    show: { transition: { staggerChildren: 0.05, delayChildren: 0.18 } },
  },
  item: {
    hidden: reduce
      ? { opacity: 0 }
      : { opacity: 0, y: 10, filter: "blur(4px)" },
    show: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: { duration: reduce ? 0.3 : 0.4, ease: EASE },
    },
  },
  image: {
    hidden: reduce
      ? { opacity: 0 }
      : { opacity: 0, scale: 1.06, filter: "blur(8px)" },
    show: {
      opacity: 1,
      scale: 1,
      filter: "blur(0px)",
      transition: { duration: reduce ? 0.3 : 0.7, ease: IMAGE_EASE },
    },
  },
  line: {
    hidden: { scaleX: 0 },
    show: {
      scaleX: 1,
      transition: { duration: reduce ? 0 : 0.5, ease: EASE, delay: 0.1 },
    },
  },
})

function FolioCard({
  c,
  index,
  total,
  linkable = true,
  stacked = false,
}: {
  c: CaseStudyFrontmatter
  index: number
  total: number
  linkable?: boolean
  stacked?: boolean
}) {
  const isReverse = index % 2 === 1
  const reduce = useReducedMotion()
  const v = useMemo(() => buildVariants(!!reduce), [reduce])
  const href = `/case-studies/${c.slug}`

  // Stacked (homepage) renumbers cards sequentially by position; the full
  // listing keeps each case's own id.
  const displayId = stacked ? String(index + 1).padStart(2, "0") : c.id

  return (
    <li
      className={stacked ? "sticky" : "relative"}
      style={{
        ...(stacked ? { top: `${5 + index * 1.5}rem`, zIndex: index + 1 } : {}),
        marginBottom: index === total - 1 ? 0 : "5rem",
      }}
    >
      <motion.article
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-15%" }}
        variants={v.container}
        className="relative pt-10 md:pt-12"
      >
        <motion.div
          aria-hidden
          variants={v.item}
          className={cn(
            "absolute top-0 z-0 flex h-12 items-center gap-4 rounded-t-md bg-[oklch(0.78_0.04_75)] px-5 shadow-md md:h-14 md:gap-5 md:px-7",
            isReverse ? "right-6 md:right-12" : "left-6 md:left-12"
          )}
        >
          <span className="font-mono text-[0.625rem] tracking-[0.25em] uppercase md:text-xs">
            Case &middot; {c.year}
          </span>
          <span aria-hidden className="block h-3 w-px bg-foreground/30" />
          <span className="text-xl leading-none font-medium tracking-tighter md:text-2xl">
            {displayId}
          </span>
        </motion.div>

        <Card
          variant="image"
          className={cn(
            "relative z-10 md:h-[42rem] md:flex-row",
            isReverse && "md:flex-row-reverse"
          )}
        >
          <div
            className={cn(
              "relative flex flex-col justify-between p-6 pt-8 md:order-none md:basis-[45%] md:p-10",
              isReverse ? "order-1" : "order-2"
            )}
          >
            <div className="relative z-10">
              <motion.div
                variants={v.item}
                className="flex flex-wrap items-center gap-x-3 gap-y-2 font-mono text-[0.625rem] tracking-widest text-muted-foreground uppercase"
              >
                <span
                  aria-hidden
                  className="block h-px w-6 bg-current md:w-8"
                />
                <span>{c.sector}</span>
                <span aria-hidden className="block h-3 w-px bg-foreground/15" />
                <span className="text-foreground/70">{c.practice}</span>
              </motion.div>
              <motion.h3
                variants={v.item}
                className="mt-5 text-xl leading-[1.15] font-medium tracking-tight md:mt-7 md:text-2xl lg:text-3xl"
              >
                {linkable ? (
                  <a
                    href={href}
                    className="transition-colors outline-none hover:text-foreground/85 focus-visible:text-foreground/85"
                  >
                    {c.description}
                  </a>
                ) : (
                  c.description
                )}
              </motion.h3>
            </div>
            <div className="relative z-10">
              <motion.p
                variants={v.item}
                className="text-sm leading-snug font-medium text-foreground/85 md:text-base"
              >
                {c.outcome}
              </motion.p>
              <motion.div
                variants={v.item}
                className="mt-5 flex items-center gap-4 font-mono text-[0.625rem] tracking-widest text-muted-foreground uppercase"
              >
                <span>{c.forum}</span>
                <span aria-hidden className="block h-3 w-px bg-foreground/15" />
                <span>{c.year}</span>
              </motion.div>
              <motion.div
                aria-hidden
                variants={v.line}
                style={{ transformOrigin: "left" }}
                className="mt-5 h-px w-24 bg-accent md:mt-6 md:w-32"
              />
              {linkable && (
                <motion.div variants={v.item} className="mt-5 md:mt-6">
                  <Button asChild>
                    <a href={href}>
                      Read the full case study
                      <MoveUpRight />
                    </a>
                  </Button>
                </motion.div>
              )}
            </div>
          </div>

          <div
            className={cn(
              "relative aspect-video overflow-hidden md:order-none md:aspect-auto md:basis-[55%]",
              isReverse ? "order-2" : "order-1"
            )}
          >
            <motion.div
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-15%" }}
              variants={v.image}
              className="absolute inset-0"
            >
              <img
                src={c.image}
                alt=""
                sizes="(min-width: 768px) 50vw, 100vw"
                className="absolute inset-0 size-full object-cover"
              />
            </motion.div>
          </div>
        </Card>
      </motion.article>
    </li>
  )
}

export default FolioCard
