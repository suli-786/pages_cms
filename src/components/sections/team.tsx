"use client"

import { useState } from "react"
import { MoveRight, Scan } from "lucide-react"
import { motion } from "motion/react"

import SectionHeader from "@/components/elements/section-header"
import { Button } from "@/components/ui/button"
import type { Speaker, SpeakersContent } from "@/lib/home"
import { cn } from "@/lib/utils"

const EASE = [0.22, 1, 0.36, 1] as const

function Team({ content }: { content: SpeakersContent }) {
  const { badge, heading, description, cta, items = [] } = content
  const speakers = items.filter((p) => p.portrait)

  return (
    <section id="speakers" className="section-padding scroll-mt-24 overflow-hidden">
      <div className="container">
        <SectionHeader
          badge={badge}
          heading={heading}
          description={description}
          mark={
            <Scan
              aria-hidden
              className="size-10 text-foreground/30"
              strokeWidth={1}
            />
          }
        />
      </div>

      <div className="container mt-12 md:mt-16 lg:mt-20">
        {/* Even, gap-free grid: every card the same size, no reserved empty
            cells — scales cleanly from 6 to 15+ speakers. */}
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:gap-4 lg:grid-cols-5">
          {speakers.map((p, i) => (
            <MemberCard key={`${p.name}-${i}`} p={p} index={i} />
          ))}
        </div>

        {cta.label && cta.href && (
          <div className="mt-10 flex justify-center md:mt-14">
            <Button size="lg" variant="secondary" asChild>
              <a href={cta.href}>
                {cta.label}
                <MoveRight className="size-5" strokeWidth={1.25} />
              </a>
            </Button>
          </div>
        )}
      </div>
    </section>
  )
}

function MemberCard({
  p,
  index,
  className,
}: {
  p: Speaker
  index: number
  className?: string
}) {
  const [hovered, setHovered] = useState(false)

  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{ duration: 0.7, ease: EASE, delay: (index % 5) * 0.06 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocus={() => setHovered(true)}
      onBlur={() => setHovered(false)}
      tabIndex={0}
      aria-label={`${p.name}, ${p.role} — ${p.theme}`}
      className={cn(
        "group relative aspect-[3/4] overflow-hidden rounded-lg outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
        className
      )}
    >
      <motion.img
        src={p.portrait}
        alt={p.name}
        animate={{ scale: hovered ? 1.04 : 1 }}
        transition={{ duration: 0.3, ease: EASE }}
        className="absolute inset-0 size-full object-cover"
      />

      <div
        aria-hidden
        className="absolute inset-0 bg-linear-to-t from-black/95 via-black/30 to-transparent"
      />

      <div className="absolute inset-x-0 bottom-0 p-3 text-white md:p-4">
        <motion.div
          animate={{ y: hovered ? -6 : 0 }}
          transition={{ duration: 0.5, ease: EASE }}
        >
          <h3 className="text-base leading-tight font-light tracking-tight md:text-lg">
            {p.name}
          </h3>
          <p className="mt-1.5 font-mono text-[0.55rem] tracking-[0.18em] text-white/70 uppercase">
            {p.role}
          </p>
        </motion.div>

        <motion.div
          aria-hidden={!hovered}
          initial={false}
          animate={{
            height: hovered ? "auto" : 0,
            opacity: hovered ? 1 : 0,
            marginTop: hovered ? "0.6rem" : 0,
          }}
          transition={{ duration: 0.45, ease: EASE }}
          className="overflow-hidden"
        >
          <div className="flex items-center gap-2 font-mono text-[0.55rem] tracking-[0.18em] text-white/85 uppercase">
            <span aria-hidden className="block h-px w-5 bg-accent" />
            {p.theme}
          </div>
        </motion.div>
      </div>
    </motion.article>
  )
}

export default Team
