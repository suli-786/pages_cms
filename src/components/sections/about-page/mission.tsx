"use client"

import { Check } from "lucide-react"
import { motion } from "motion/react"

import Eyebrow from "@/components/elements/eyebrow"

const EASE_OUT = [0.23, 1, 0.32, 1] as const

const VALUE_PAIRS = [
  "Integrity. Excellence. Justice.",
  "Trust. Commitment. Results.",
  "Respect. Care. Honesty.",
  "Compassion. Patience. Calm.",
  "Service. Skill. Empathy.",
  "Honesty. Reliability. Clarity.",
]

function AboutMission() {
  return (
    <section className="section-padding">
      <div className="container">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-[1fr_1.2fr] lg:gap-16">
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-12%" }}
            transition={{ duration: 0.85, ease: EASE_OUT }}
            className="relative aspect-[4/3] overflow-hidden rounded-xl ring-1 ring-foreground/10"
          >
            <img
              src="/images/about/team-photo.webp"
              alt=""
              sizes="(min-width: 1024px) 40vw, 100vw"
              className="absolute inset-0 size-full object-cover"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-15%" }}
            transition={{ duration: 0.8, ease: EASE_OUT }}
          >
            <Eyebrow>Our Mission</Eyebrow>

            <h2 className="mt-8 text-3xl leading-[1.05] font-light tracking-tight md:text-4xl lg:text-5xl">
              Guided by purpose, driven by principle, dedicated to making
              justice real.
            </h2>

            <p className="mt-8 max-w-xl text-base leading-relaxed text-muted-foreground md:text-lg">
              Our mission is simple — the law should serve people, protect them,
              and give them a clear path forward. We go beyond the courtroom to
              build trust, real relationships, and outcomes our clients can
              stand behind.
            </p>

            <ul className="mt-10 grid grid-cols-1 gap-x-8 gap-y-4 sm:grid-cols-2">
              {VALUE_PAIRS.map((pair, i) => (
                <motion.li
                  key={pair}
                  initial={{ opacity: 0, x: -8 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-10%" }}
                  transition={{
                    duration: 0.5,
                    ease: EASE_OUT,
                    delay: i * 0.06,
                  }}
                  className="flex items-center gap-3"
                >
                  <span className="grid size-5 shrink-0 place-items-center rounded-full bg-accent/15 text-accent">
                    <Check className="size-3" strokeWidth={2.5} />
                  </span>
                  <span className="text-sm tracking-tight text-foreground/85 md:text-base">
                    {pair}
                  </span>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default AboutMission
