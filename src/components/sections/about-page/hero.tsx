"use client"

import { motion } from "motion/react"

import Eyebrow from "@/components/elements/eyebrow"
import { cn } from "@/lib/utils"

const EASE_OUT = [0.23, 1, 0.32, 1] as const

type Cell =
  | { type: "stat"; eyebrow: string; value: string; body: string }
  | { type: "image"; src: string; alt: string }

const ROW_DARK: Cell[] = [
  {
    type: "stat",
    eyebrow: "Cases",
    value: "200+",
    body: "Cases successfully resolved — showing our experience and the steady results we deliver.",
  },
  {
    type: "image",
    src: "/images/about/hero-1.webp",
    alt: "",
  },
  {
    type: "stat",
    eyebrow: "Clients",
    value: "100+",
    body: "Clients served with personal attention, clear advice, and dedicated support from start to finish.",
  },
  {
    type: "image",
    src: "/images/about/hero-2.webp",
    alt: "",
  },
]

const ROW_WARM: Cell[] = [
  {
    type: "image",
    src: "/images/about/team.webp",
    alt: "",
  },
  {
    type: "stat",
    eyebrow: "Commitment",
    value: "110%",
    body: "We go above and beyond on every case — giving each client the care and focus they deserve.",
  },
  {
    type: "image",
    src: "/images/about/hero-3.webp",
    alt: "",
  },
  {
    type: "stat",
    eyebrow: "Results",
    value: "100%",
    body: "Focused on real outcomes, real protection, and real peace of mind — every time.",
  },
]

function AboutHero() {
  return (
    <section>
      <div className="hero-padding container">
        <div className="grid items-end gap-10 lg:grid-cols-[1.8fr_1fr] lg:gap-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.85, ease: EASE_OUT }}
          >
            <Eyebrow>About</Eyebrow>
            <h1 className="mt-8 text-5xl leading-[0.95] font-light tracking-tight md:text-7xl lg:text-8xl">
              Leading with <br className="hidden md:block" />
              integrity &amp; purpose.
            </h1>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.85, ease: EASE_OUT, delay: 0.15 }}
            className="max-w-md text-base leading-relaxed text-muted-foreground md:text-lg"
          >
            Years of experience and a steady commitment to honest, careful work
            — for clients who need legal help they can truly trust.
          </motion.p>
        </div>
      </div>

      <CellRow tone="dark" cells={ROW_DARK} />
      <CellRow tone="warm" cells={ROW_WARM} />
    </section>
  )
}

function CellRow({ tone, cells }: { tone: "dark" | "warm"; cells: Cell[] }) {
  const isDark = tone === "dark"
  return (
    <div
      className={cn(
        "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4",
        isDark
          ? "dark bg-background text-foreground"
          : "bg-[oklch(0.92_0.04_75)] text-foreground"
      )}
    >
      {cells.map((cell, i) =>
        cell.type === "stat" ? (
          <StatCell key={i} cell={cell} index={i} />
        ) : (
          <ImageCell key={i} cell={cell} index={i} />
        )
      )}
    </div>
  )
}

function StatCell({
  cell,
  index,
}: {
  cell: Extract<Cell, { type: "stat" }>
  index: number
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{ duration: 0.7, ease: EASE_OUT, delay: index * 0.08 }}
      className="flex aspect-square flex-col justify-between gap-10 p-8 md:p-10 lg:p-12"
    >
      <Eyebrow tone="muted">{cell.eyebrow}</Eyebrow>
      <div>
        <p className="text-5xl leading-none font-light tracking-tight md:text-6xl lg:text-7xl">
          {cell.value}
        </p>
        <p className="mt-6 max-w-[32ch] text-sm leading-relaxed text-foreground/70 md:text-base">
          {cell.body}
        </p>
      </div>
    </motion.div>
  )
}

function ImageCell({
  cell,
  index,
}: {
  cell: Extract<Cell, { type: "image" }>
  index: number
}) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.97 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{ duration: 0.75, ease: EASE_OUT, delay: index * 0.08 }}
      className="relative aspect-square overflow-hidden"
    >
      <img
        src={cell.src}
        alt={cell.alt}
        sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
        className="absolute inset-0 size-full object-cover"
      />
    </motion.div>
  )
}

export default AboutHero
