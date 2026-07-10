"use client"

import { useState } from "react"
import { Maximize2, Quote, X } from "lucide-react"
import { AnimatePresence, motion } from "motion/react"
import { Dialog as DialogPrimitive } from "radix-ui"

import SectionHeader from "@/components/elements/section-header"
import {
  Dialog,
  DialogClose,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
} from "@/components/ui/dialog"
import { cn } from "@/lib/utils"

function AffordanceHint() {
  return (
    <span
      aria-hidden
      className="pointer-events-none absolute top-2 right-2 z-20 grid size-7 place-items-center rounded-full bg-background/80 text-foreground/80 ring-1 ring-foreground/10 backdrop-blur transition-transform duration-300 group-hover:scale-110"
    >
      <Maximize2 className="size-3.5" strokeWidth={1.5} />
    </span>
  )
}

export const endorsements = [
  {
    quote:
      "They built our plan before the case even started, and every step had a clear purpose. By the time we were in court, our defense had been tested in every way we could think of.",
    role: "Head of Legal",
    sector: "Fortune 100 Energy",
    sectorShort: "Energy",
    matter: "New York · 2024",
    portrait: "/images/testimonials/client-01.webp",
  },
  {
    quote:
      "I have worked with three of the biggest firms in the country. None of them matched the care I got here. A senior lawyer read every single document we sent out.",
    role: "Deputy Head of Legal",
    sector: "Public Pharma Company",
    sectorShort: "Life Sciences",
    matter: "D.C. · 2023",
    portrait: "/images/testimonials/client-02.webp",
  },
  {
    quote:
      "The recovery they got for our creditor group was much more than we expected. The strategy was patient and the work was relentless.",
    role: "Head of Special Situations",
    sector: "Global Investment Bank",
    sectorShort: "Banking",
    matter: "U.S. Bankruptcy · 2024",
    portrait: "/images/testimonials/client-03.webp",
  },
  {
    quote:
      "They told us where our case was weak before they told us where it was strong. That kind of honesty is rare — and it's why we trust them even when the law isn't on our side.",
    role: "CEO",
    sector: "Top Tech Company",
    sectorShort: "Technology",
    matter: "U.S. Trade Comm. · 2025",
    portrait: "/images/testimonials/client-04.webp",
  },
  {
    quote:
      "I called them on a Friday afternoon and a senior lawyer had the case on his desk by Monday morning. That isn't normal — and it's why we keep coming back.",
    role: "Board Member",
    sector: "NYSE-listed Industrial",
    sectorShort: "Industrial",
    matter: "2025",
    portrait: "/images/testimonials/client-05.webp",
  },
  {
    quote:
      "When the regulators asked for more, the team had a full answer ready in two weeks. It wasn't just speed — it was preparation. They had already seen it coming.",
    role: "Chief Legal Officer",
    sector: "Life Sciences",
    sectorShort: "Life Sciences",
    matter: "2023",
    portrait: "/images/testimonials/client-06.webp",
  },
]

type Endorsement = (typeof endorsements)[number]

const EASE_OUT = [0.23, 1, 0.32, 1] as const
const EASE_IN_OUT = [0.77, 0, 0.175, 1] as const

/*
 * 5×3 wall, equal aspect-square cells. Cells in row-major order.
 * Endorsements are reachable from 3 portraits + 2 quote chips + 1 stat tile
 * (6 entries total). Other stats and the scene/empty cells are decorative.
 */
type Cell =
  | { kind: "portrait"; index: number }
  | { kind: "stat"; idx: number }
  | { kind: "chip"; index: number }
  | { kind: "scene"; idx: number }
  | { kind: "empty" }

const CELLS: Cell[] = [
  { kind: "portrait", index: 0 }, // Energy
  { kind: "empty" },
  { kind: "chip", index: 3 }, // "Honesty is rare." → Tech
  { kind: "stat", idx: 0 }, // $1.2B → Banking (idx 2)
  { kind: "portrait", index: 1 }, // Pharma
  { kind: "empty" },
  { kind: "scene", idx: 0 }, // pretrial photo
  { kind: "empty" },
  { kind: "portrait", index: 4 }, // Industrial
  { kind: "empty" },
  { kind: "chip", index: 5 }, // "Two weeks." → Life Sciences
  { kind: "stat", idx: 1 }, // 47 verdicts (decorative)
  { kind: "empty" },
  { kind: "scene", idx: 1 }, // verdict courtroom
  { kind: "stat", idx: 2 }, // 100% senior-led (decorative)
]

const STATS = [
  {
    number: "$1.2B",
    label: "Recovered",
    sub: "New York · 2024",
    tone: "brass" as const,
    linkTo: 2,
  },
  {
    number: "47",
    label: "Court wins",
    sub: "At trial",
    tone: "dark" as const,
  },
  {
    number: "100%",
    label: "Senior-led",
    sub: "Every case",
    tone: "card" as const,
  },
]

const CHIPS: Array<{ text: string; tone: "card" | "dark" }> = [
  // chip index 3 — Tech endorsement: "told us where the case would lose"
  { text: "“Honest from day one.”", tone: "card" },
  // chip index 5 — Life Sciences endorsement: "response ready in two weeks"
  { text: "“Ready in two weeks.”", tone: "dark" },
]

const SCENES = [
  { src: "/images/process/004-pretrial.webp", caption: "Federal · D.C." },
  { src: "/images/testimonials/result-scene.webp", caption: "The result" },
]

function Endorsements() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null)
  const active = activeIndex !== null ? endorsements[activeIndex] : null

  return (
    <section id="testimonials" className="section-padding overflow-hidden">
      <div className="container">
        <SectionHeader
          badge="Testimonials"
          heading={<>What our clients say.</>}
          description="Most of our work stays private. With permission, these are some of the clients we've helped — in their own words."
          mark={
            <Quote aria-hidden className="size-10 text-foreground/30" strokeWidth={1} />
          }
        />
      </div>

      <div className="container mt-12 md:mt-16 lg:mt-20">
        <div className="grid grid-cols-3 gap-2.5 md:grid-cols-5 md:gap-3">
          {CELLS.map((cell, i) => {
            const delay = (i % 5) * 0.04 + Math.floor(i / 5) * 0.06
            if (cell.kind === "portrait") {
              return (
                <PortraitTile
                  key={i}
                  index={cell.index}
                  activeIndex={activeIndex}
                  onOpen={setActiveIndex}
                  staggerDelay={delay}
                />
              )
            }
            if (cell.kind === "stat") {
              const s = STATS[cell.idx]
              const linkTo = "linkTo" in s ? s.linkTo : undefined
              return (
                <StatTile
                  key={i}
                  number={s.number}
                  label={s.label}
                  sub={s.sub}
                  tone={s.tone}
                  layoutId={
                    linkTo !== undefined ? `endorsement-${linkTo}` : undefined
                  }
                  onClick={
                    linkTo !== undefined
                      ? () => setActiveIndex(linkTo)
                      : undefined
                  }
                  isActive={linkTo !== undefined && activeIndex === linkTo}
                  isDimmed={
                    linkTo !== undefined &&
                    activeIndex !== null &&
                    activeIndex !== linkTo
                  }
                  staggerDelay={delay}
                  showHint={linkTo !== undefined}
                />
              )
            }
            if (cell.kind === "chip") {
              const c = CHIPS[cell.index === 3 ? 0 : 1]
              return (
                <ChipTile
                  key={i}
                  index={cell.index}
                  text={c.text}
                  tone={c.tone}
                  activeIndex={activeIndex}
                  onOpen={setActiveIndex}
                  staggerDelay={delay}
                />
              )
            }
            if (cell.kind === "scene") {
              const s = SCENES[cell.idx]
              return (
                <SceneTile
                  key={i}
                  src={s.src}
                  caption={s.caption}
                  staggerDelay={delay}
                />
              )
            }
            return <EmptyCell key={i} />
          })}
        </div>
      </div>

      <Dialog
        open={activeIndex !== null}
        onOpenChange={(open) => {
          if (!open) setActiveIndex(null)
        }}
      >
        <DialogPortal forceMount>
          <AnimatePresence>
            {active && activeIndex !== null && (
              <QuoteModal e={active} index={activeIndex} />
            )}
          </AnimatePresence>
        </DialogPortal>
      </Dialog>
    </section>
  )
}

/* ────────────────────  TILES  ──────────────────── */

function PortraitTile({
  index,
  activeIndex,
  onOpen,
  staggerDelay,
}: {
  index: number
  activeIndex: number | null
  onOpen: (i: number) => void
  staggerDelay: number
}) {
  const e = endorsements[index]
  const isActive = activeIndex === index
  const isDimmed = activeIndex !== null && !isActive

  return (
    <motion.button
      type="button"
      layoutId={`endorsement-${index}`}
      onClick={() => onOpen(index)}
      aria-pressed={isActive}
      aria-label={`Endorsement from ${e.role}, ${e.sector}`}
      initial={{ opacity: 0, y: 6 }}
      whileInView={{ opacity: 1, y: 0 }}
      animate={{ opacity: isDimmed ? 0.3 : 1 }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{
        opacity: { duration: 0.3, ease: EASE_OUT },
        y: { duration: 0.4, ease: EASE_OUT, delay: staggerDelay },
        layout: { duration: 0.5, ease: EASE_IN_OUT },
      }}
      whileHover={{ scale: isActive ? 1 : 1.05 }}
      whileTap={{ scale: 0.96 }}
      className="group relative aspect-square cursor-pointer overflow-hidden rounded-xl ring-1 ring-foreground/8 outline-none focus-visible:ring-2 focus-visible:ring-ring"
    >
      <motion.div
        layoutId={`endorsement-image-${index}`}
        transition={{ duration: 0.5, ease: EASE_IN_OUT }}
        className="absolute inset-0 overflow-hidden"
      >
        <motion.img
          layout
          src={e.portrait}
          alt=""
          transition={{ duration: 0.5, ease: EASE_IN_OUT }}
          className="size-full object-cover grayscale transition-[filter] duration-300 group-hover:grayscale-0"
        />
      </motion.div>
      <div
        aria-hidden
        className="absolute inset-0 bg-linear-to-t from-black/70 via-black/0 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"
      />
      <span
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-1.5 text-center font-mono text-[0.5rem] tracking-[0.2em] text-white uppercase opacity-0 transition-opacity duration-300 group-hover:opacity-100"
      >
        {e.sectorShort}
      </span>
      <AffordanceHint />
    </motion.button>
  )
}

function StatTile({
  number,
  label,
  sub,
  tone,
  layoutId,
  onClick,
  isActive,
  isDimmed,
  staggerDelay,
  showHint,
}: {
  number: string
  label: string
  sub?: string
  tone: "brass" | "dark" | "card"
  layoutId?: string
  onClick?: () => void
  isActive?: boolean
  isDimmed?: boolean
  staggerDelay: number
  showHint?: boolean
}) {
  const Cmp = onClick ? motion.button : motion.div
  return (
    <Cmp
      type={onClick ? "button" : undefined}
      layoutId={layoutId}
      onClick={onClick}
      aria-label={onClick ? `${label} — open quote` : undefined}
      initial={{ opacity: 0, y: 6 }}
      whileInView={{ opacity: 1, y: 0 }}
      animate={{ opacity: isDimmed ? 0.3 : 1 }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{
        opacity: { duration: 0.3, ease: EASE_OUT },
        y: { duration: 0.4, ease: EASE_OUT, delay: staggerDelay },
        layout: { duration: 0.5, ease: EASE_IN_OUT },
      }}
      whileHover={onClick ? { scale: isActive ? 1 : 1.015 } : undefined}
      whileTap={onClick ? { scale: 0.985 } : undefined}
      className={cn(
        "group relative flex aspect-square flex-col justify-between rounded-xl p-4 text-left ring-1 outline-none md:p-5",
        onClick &&
          "cursor-pointer focus-visible:ring-2 focus-visible:ring-ring",
        tone === "brass" &&
          "bg-[oklch(0.78_0.04_75)] text-foreground ring-foreground/10",
        tone === "dark" && "bg-black text-white ring-white/10",
        tone === "card" && "bg-card text-foreground ring-foreground/8"
      )}
    >
      <span
        className={cn(
          "font-mono text-[0.5rem] tracking-[0.25em] uppercase",
          tone === "dark" ? "text-white/65" : "text-foreground/65"
        )}
      >
        {label}
      </span>
      <span className="text-4xl leading-[0.85] font-light tracking-tight md:text-5xl lg:text-6xl">
        {number}
      </span>
      {sub && (
        <span
          className={cn(
            "flex items-center gap-1.5 font-mono text-[0.5rem] tracking-[0.2em] uppercase",
            tone === "dark" ? "text-white/65" : "text-foreground/65"
          )}
        >
          <span
            aria-hidden
            className={cn(
              "block h-px w-4",
              tone === "dark" ? "bg-accent" : "bg-foreground/40"
            )}
          />
          {sub}
        </span>
      )}
      {showHint && <AffordanceHint />}
    </Cmp>
  )
}

function ChipTile({
  index,
  text,
  tone,
  activeIndex,
  onOpen,
  staggerDelay,
}: {
  index: number
  text: string
  tone: "card" | "dark"
  activeIndex: number | null
  onOpen: (i: number) => void
  staggerDelay: number
}) {
  const e = endorsements[index]
  const isActive = activeIndex === index
  const isDimmed = activeIndex !== null && !isActive
  const isDark = tone === "dark"

  return (
    <motion.button
      type="button"
      layoutId={`endorsement-${index}`}
      onClick={() => onOpen(index)}
      aria-pressed={isActive}
      aria-label={`Endorsement from ${e.role}, ${e.sector}`}
      initial={{ opacity: 0, y: 6 }}
      whileInView={{ opacity: 1, y: 0 }}
      animate={{ opacity: isDimmed ? 0.3 : 1 }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{
        opacity: { duration: 0.3, ease: EASE_OUT },
        y: { duration: 0.4, ease: EASE_OUT, delay: staggerDelay },
        layout: { duration: 0.5, ease: EASE_IN_OUT },
      }}
      whileHover={{ scale: isActive ? 1 : 1.015 }}
      whileTap={{ scale: 0.985 }}
      className={cn(
        "group relative flex aspect-square cursor-pointer flex-col justify-between rounded-xl p-4 text-left ring-1 outline-none focus-visible:ring-2 focus-visible:ring-ring md:p-5",
        isDark
          ? "bg-black text-white ring-white/10"
          : "bg-card text-foreground ring-foreground/8"
      )}
    >
      <span
        aria-hidden
        className={cn(
          "block leading-none font-light",
          isDark ? "text-accent" : "text-foreground/70"
        )}
        style={{ fontSize: "1.5rem" }}
      >
        &ldquo;
      </span>
      <span
        className={cn(
          "text-base leading-snug font-light lg:text-lg",
          isDark ? "text-white" : "text-foreground"
        )}
      >
        {text}
      </span>
      <span
        className={cn(
          "flex items-center gap-1.5 font-mono text-[0.5rem] tracking-[0.2em] uppercase",
          isDark ? "text-white/65" : "text-foreground/65"
        )}
      >
        <span
          aria-hidden
          className={cn(
            "block h-px w-4",
            isDark ? "bg-accent" : "bg-foreground/40"
          )}
        />
        {e.sectorShort}
      </span>
      <AffordanceHint />
    </motion.button>
  )
}

function SceneTile({
  src,
  caption,
  staggerDelay,
}: {
  src: string
  caption: string
  staggerDelay: number
}) {
  return (
    <motion.figure
      initial={{ opacity: 0, y: 6 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{ duration: 0.4, ease: EASE_OUT, delay: staggerDelay }}
      className="group relative aspect-square overflow-hidden rounded-xl ring-1 ring-foreground/8"
    >
      <motion.img
        src={src}
        alt=""
        whileHover={{ scale: 1.04 }}
        transition={{ duration: 0.4, ease: EASE_OUT }}
        className="absolute inset-0 size-full object-cover"
      />
      <div
        aria-hidden
        className="absolute inset-0 bg-linear-to-t from-black/90 via-black/20 to-transparent"
      />
      <figcaption className="absolute inset-x-0 bottom-0 flex items-center gap-1.5 p-3 font-mono text-[0.5rem] tracking-[0.2em] text-white/85 uppercase md:p-4">
        <span aria-hidden className="block h-px w-3 bg-accent" />
        {caption}
      </figcaption>
    </motion.figure>
  )
}

function EmptyCell() {
  return (
    <div
      aria-hidden
      className="aspect-square rounded-xl ring-1 ring-foreground/[0.07]"
    />
  )
}

/* ────────────────────  QUOTE MODAL  ──────────────────── */

function QuoteModal({ e, index }: { e: Endorsement; index: number }) {
  return (
    <>
      <DialogOverlay asChild forceMount>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25, ease: EASE_OUT }}
          className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm"
        />
      </DialogOverlay>

      <DialogPrimitive.Content
        asChild
        forceMount
        aria-describedby={undefined}
        onOpenAutoFocus={(ev) => ev.preventDefault()}
      >
        <motion.article
          layoutId={`endorsement-${index}`}
          transition={{ layout: { duration: 0.5, ease: EASE_IN_OUT } }}
          className="fixed top-1/2 left-1/2 z-50 w-full max-w-2xl -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-xl bg-foreground shadow-2xl ring-1 ring-foreground/10 outline-none"
        >
          <DialogTitle className="sr-only">
            Endorsement from {e.role}, {e.sector}
          </DialogTitle>

          <motion.div
            layoutId={`endorsement-image-${index}`}
            className="absolute inset-0 overflow-hidden"
            transition={{ duration: 0.5, ease: EASE_IN_OUT }}
          >
            <motion.img
              layout
              src={e.portrait}
              alt=""
              transition={{ duration: 0.5, ease: EASE_IN_OUT }}
              className="size-full object-cover object-top"
            />
          </motion.div>

          {/* Progressive blur: stacked layers, each blurrier and reaching less
              far up, so the bottom is heavily frosted and eases off smoothly.
              Confined to the lower portion so it ends before the face. */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-x-0 bottom-0 h-1/2 max-h-[400px]"
          >
            <div className="absolute inset-0 mask-t-from-58% backdrop-blur-[1px]" />
            <div className="absolute inset-0 mask-t-from-38% backdrop-blur-[3px]" />
            <div className="absolute inset-0 mask-t-from-20% backdrop-blur-[5px]" />
            <div className="absolute inset-0 mask-t-from-6% backdrop-blur-[8px]" />
            <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/45 via-45% to-transparent" />
          </div>

          <DialogClose
            aria-label="Close"
            className="absolute top-4 right-4 z-20 grid size-9 place-items-center rounded-full bg-white/15 text-white shadow-md ring-1 ring-white/25 backdrop-blur transition-transform duration-150 hover:bg-white/25 active:scale-95"
          >
            <X aria-hidden className="size-4" strokeWidth={1.5} />
          </DialogClose>

          <div className="relative flex flex-col justify-end">
            <div aria-hidden className="aspect-[16/9]" />
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, ease: EASE_OUT, delay: 0.2 }}
              className="p-8 md:p-12"
            >
              <span
                aria-hidden
                className="block text-5xl leading-none font-light text-accent md:text-6xl lg:text-7xl"
              >
                &ldquo;
              </span>
              <blockquote className="mt-2 text-lg leading-snug font-light text-white md:text-xl lg:text-2xl">
                {e.quote}
              </blockquote>
              <footer className="mt-8 flex items-center gap-4">
                <span aria-hidden className="block h-px w-10 bg-accent" />
                <div className="space-y-1">
                  <div className="font-mono text-[0.625rem] tracking-[0.2em] text-white uppercase">
                    {e.role}
                  </div>
                  <div className="font-mono text-[0.5625rem] tracking-[0.2em] text-white/60 uppercase">
                    {e.sector} &middot; {e.matter}
                  </div>
                </div>
              </footer>
            </motion.div>
          </div>
        </motion.article>
      </DialogPrimitive.Content>
    </>
  )
}

export default Endorsements
