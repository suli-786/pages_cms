"use client"

import { motion } from "motion/react"

import Eyebrow from "@/components/elements/eyebrow"

const EASE_OUT = [0.23, 1, 0.32, 1] as const

const TEAM = [
  {
    name: "Jane Anderson",
    role: "Lawsuits & Disputes",
    portrait: "/images/partners/01-anderson.webp",
  },
  {
    name: "Marcus Klein",
    role: "Business Law",
    portrait: "/images/partners/02-klein.webp",
  },
  {
    name: "Rachel Lee",
    role: "Intellectual Property",
    portrait: "/images/partners/03-lee.webp",
  },
  {
    name: "Tom Singh",
    role: "Restructuring & Recovery",
    portrait: "/images/partners/04-singh.webp",
  },
  {
    name: "Anna Petrova",
    role: "Compliance & Rules",
    portrait: "/images/partners/05-petrova.webp",
  },
  {
    name: "Daniel Okonkwo",
    role: "Tax & Wealth Planning",
    portrait: "/images/partners/06-okonkwo.webp",
  },
]

function AboutTeam() {
  return (
    <section
      id="team"
      className="dark section-padding bg-background text-foreground"
    >
      <div className="container">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-[1fr_2.6fr] md:gap-16">
          <Eyebrow>Our Team</Eyebrow>

          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-15%" }}
            transition={{ duration: 0.8, ease: EASE_OUT }}
            className="text-4xl leading-[1.05] font-light tracking-tight md:text-5xl lg:text-6xl"
          >
            The minds behind your legal success.
          </motion.h2>
        </div>

        <ul className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 md:mt-16 md:grid-cols-3 lg:mt-20">
          {TEAM.map((p, i) => (
            <motion.li
              key={p.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{
                duration: 0.75,
                ease: EASE_OUT,
                delay: (i % 3) * 0.1,
              }}
              className="group relative aspect-[3/4] overflow-hidden rounded-xl ring-1 ring-foreground/10"
            >
              <img
                src={p.portrait}
                alt={p.name}
                sizes="(min-width: 768px) 33vw, 100vw"
                className="absolute inset-0 size-full object-cover transition-transform duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:scale-[1.04]"
              />

              <div
                aria-hidden
                className="pointer-events-none absolute inset-x-0 bottom-0 h-1/2 max-h-[280px]"
              >
                <div className="absolute inset-0 mask-t-from-58% backdrop-blur-[0.5px]" />
                <div className="absolute inset-0 mask-t-from-38% backdrop-blur-[1.5px]" />
                <div className="absolute inset-0 mask-t-from-20% backdrop-blur-[2.5px]" />
                <div className="absolute inset-0 mask-t-from-6% backdrop-blur-[4px]" />
                <div className="absolute inset-0 bg-linear-to-t from-background/90 via-background/45 via-45% to-transparent" />
              </div>

              <div className="absolute inset-x-0 bottom-0 p-6 text-foreground md:p-7">
                <h3 className="text-2xl leading-tight font-light tracking-tight md:text-3xl">
                  {p.name}
                </h3>
                <p className="mt-2 flex items-center gap-2 font-mono text-[0.625rem] tracking-[0.2em] text-foreground/75 uppercase">
                  <span aria-hidden className="block h-px w-4 bg-accent" />
                  {p.role}
                </p>
              </div>
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  )
}

export default AboutTeam
