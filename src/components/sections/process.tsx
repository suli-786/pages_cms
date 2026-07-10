"use client"

import { useEffect, useRef, useState } from "react"
import {
  AnimatePresence,
  motion,
  useInView,
  useMotionValue,
} from "motion/react"
import { ChevronsRight } from "lucide-react"

import SectionHeader from "@/components/elements/section-header"
import { cn } from "@/lib/utils"

const phases = [
  {
    title: "First call",
    body: "A senior lawyer takes your call — never an assistant. We listen, ask the right questions, and decide together if we're the right fit for your case.",
    image: {
      src: "/images/process/001-intake.webp",
      className: "object-right -scale-x-100 md:object-center md:scale-x-100",
    },
  },
  {
    title: "Strategy",
    body: "We build a clear plan before the case gets going. Timeline, witnesses, the result we're aiming for — mapped out so every step has a purpose.",
    image: { src: "/images/process/002-strategy.webp" },
  },
  {
    title: "Preparation",
    body: "We read every document, interview the witnesses, and work with the experts. Nothing reaches the courtroom that your senior lawyer hasn't already seen.",
    image: { src: "/images/process/003-discovery.webp" },
  },
  {
    title: "Pre-trial",
    body: "We file the right motions, push for early wins, and try to settle when it makes sense. Every argument the other side might use is tested first.",
    image: {
      src: "/images/process/004-pretrial.webp",
      className: "object-[50%_30%]",
    },
  },
  {
    title: "Final result",
    body: "Your case goes to court. A clear story, strong witnesses, and a record built to last. The result is delivered.",
    image: { src: "/images/process/005-verdict.webp" },
  },
]

const EASE_OUT = [0, 0, 0.2, 1] as const
const EASE_CURTAIN = [0.65, 0, 0.35, 1] as const
const EASE_SETTLE = [0.22, 1, 0.36, 1] as const
const STEP_MS = 5000
const CURTAIN = 0.55
const IMAGE_SCALE = 1.05

function Process() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [hoverIndex, setHoverIndex] = useState<number | null>(null)

  const panelRef = useRef<HTMLDivElement>(null)
  const inView = useInView(panelRef, { amount: 0.7 })

  const shownIndex = hoverIndex ?? activeIndex
  const shown = phases[shownIndex]
  const isPaused = hoverIndex !== null || !inView
  const progress = useMotionValue(0)

  useEffect(() => {
    if (isPaused) return
    let raf = 0
    let last = performance.now()
    const tick = (now: number) => {
      const next = progress.get() + (now - last) / STEP_MS
      last = now
      if (next >= 1) {
        progress.set(0)
        setActiveIndex((prev) => (prev + 1) % phases.length)
        return
      }
      progress.set(next)
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [activeIndex, isPaused, progress])

  return (
    <section className="section-padding">
      <div className="container">
        <SectionHeader
          badge="Our Process"
          heading={<>Five clear steps from first call to final result.</>}
          description="Five steps. Same care, every case. The same senior team is with you from the very first call all the way to the result."
          mark={
            <ChevronsRight
              aria-hidden
              className="size-10 text-foreground/30"
              strokeWidth={1}
            />
          }
        />

        <div
          ref={panelRef}
          className="relative mt-12 overflow-hidden rounded-xl ring-1 ring-foreground/10 md:mt-16 lg:mt-20"
          onMouseLeave={() => setHoverIndex(null)}
        >
          <div className="relative aspect-[4/5] md:aspect-[16/9]">
            {phases.map((p, i) => {
              const isShown = i === shownIndex
              return (
                <motion.div
                  key={p.title}
                  aria-hidden={!isShown}
                  initial={false}
                  animate={{
                    clipPath: isShown
                      ? "inset(0% 0% 0% 0%)"
                      : "inset(0% 0% 0% 100%)",
                  }}
                  transition={{ duration: CURTAIN, ease: EASE_CURTAIN }}
                  className="absolute inset-0 will-change-[clip-path]"
                >
                  <motion.img
                    src={p.image.src}
                    alt=""
                    initial={false}
                    animate={{ scale: isShown ? 1 : IMAGE_SCALE }}
                    transition={{
                      duration: isShown ? CURTAIN * 1.25 : CURTAIN,
                      ease: EASE_SETTLE,
                    }}
                    className={cn("size-full object-cover", p.image.className)}
                  />
                </motion.div>
              )
            })}

            <AnimatePresence>
              <motion.span
                key={`sweep-${shown.title}`}
                aria-hidden
                initial={{ left: "-2px", opacity: 0 }}
                animate={{
                  left: "calc(100% + 2px)",
                  opacity: [0, 1, 1, 0],
                }}
                transition={{
                  duration: CURTAIN,
                  ease: EASE_CURTAIN,
                  opacity: { times: [0, 0.15, 0.85, 1] },
                }}
                className="pointer-events-none absolute inset-y-0 z-10 w-px bg-accent/90"
              />
            </AnimatePresence>

            <div
              aria-hidden
              className="absolute inset-0 bg-linear-to-t from-black/75 via-black/20 to-transparent"
            />
            <div
              aria-hidden
              className="absolute inset-y-0 left-0 w-2/3 bg-linear-to-r from-black/35 to-transparent"
            />

            <AnimatePresence mode="wait">
              <motion.div
                key={`copy-${shown.title}`}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.45, ease: EASE_OUT }}
                className="absolute right-5 bottom-6 left-5 text-white md:right-16 md:bottom-14 md:left-16"
              >
                <div className="flex items-center gap-3 text-white/60">
                  <span aria-hidden className="h-px w-8 bg-current md:w-10" />
                  <span className="text-xs tracking-widest md:text-sm">
                    Step {shownIndex + 1} of {phases.length}
                  </span>
                </div>
                <h3 className="mt-3 text-5xl leading-[0.95] font-medium tracking-tight md:mt-6 md:text-7xl lg:text-8xl">
                  {shown.title}
                </h3>
                <p className="mt-4 max-w-lg text-sm leading-snug font-medium text-white/85 md:mt-8 md:text-base md:leading-relaxed lg:text-lg">
                  {shown.body}
                </p>
              </motion.div>
            </AnimatePresence>
          </div>

          <ol className="dark grid grid-cols-5 border-t border-foreground/10 bg-card text-foreground">
            {phases.map((p, i) => {
              const isActive = i === activeIndex
              const isShown = i === shownIndex
              return (
                <li key={p.title} className="relative">
                  <button
                    type="button"
                    onClick={() => setActiveIndex(i)}
                    onMouseEnter={() => setHoverIndex(i)}
                    onFocus={() => setHoverIndex(i)}
                    onBlur={() => setHoverIndex(null)}
                    aria-current={isActive ? "step" : undefined}
                    className={cn(
                      "group relative flex h-16 w-full flex-col items-center justify-center gap-1 px-3 text-center transition-colors outline-none md:h-20 md:gap-1.5",
                      isActive
                        ? "text-foreground"
                        : isShown
                          ? "text-foreground/85"
                          : "text-muted-foreground hover:text-foreground/85"
                    )}
                  >
                    <span className="font-mono text-[0.5625rem] tracking-[0.2em] text-foreground/45 uppercase md:text-[0.625rem]">
                      Step {i + 1}
                    </span>
                    <span className="hidden text-sm font-medium tracking-tight md:inline md:text-base">
                      {p.title}
                    </span>
                    <span
                      aria-hidden
                      className="pointer-events-none absolute inset-x-0 top-0 h-px overflow-hidden bg-foreground/10"
                    >
                      {isActive && (
                        <motion.span
                          style={{ scaleX: progress }}
                          className="block size-full origin-left bg-accent"
                        />
                      )}
                    </span>
                  </button>
                </li>
              )
            })}
          </ol>
        </div>
      </div>
    </section>
  )
}

export default Process
