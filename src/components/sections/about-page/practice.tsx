"use client"

import { MoveUpRight } from "lucide-react"
import { motion } from "motion/react"

import Eyebrow from "@/components/elements/eyebrow"
import {
  Avatar,
  AvatarFallback,
  AvatarGroup,
  AvatarImage,
} from "@/components/ui/avatar"

const EASE_OUT = [0.23, 1, 0.32, 1] as const

const PRACTICE_AREAS = [
  {
    roman: "I",
    slug: "business-law",
    title: "Business Law",
    summary: "Contracts, deals, and partnerships.",
    image: "/images/services/i-corporate.webp",
  },
  {
    roman: "II",
    slug: "lawsuits-disputes",
    title: "Lawsuits & Disputes",
    summary: "From first filing to final ruling.",
    image: "/images/services/ii-litigation.webp",
  },
  {
    roman: "III",
    slug: "compliance-rules",
    title: "Compliance & Rules",
    summary: "Steady guidance with regulators.",
    image: "/images/services/iii-compliance.webp",
  },
  {
    roman: "IV",
    slug: "intellectual-property",
    title: "Intellectual Property",
    summary: "Patents, secrets, and brands.",
    image: "/images/services/iv-ip.webp",
  },
  {
    roman: "V",
    slug: "restructuring-recovery",
    title: "Restructuring & Recovery",
    summary: "Workouts and creditor protection.",
    image: "/images/services/v-restructuring.webp",
  },
]

const TEAM = [
  { name: "Jane Anderson", src: "/images/partners/01-anderson.webp" },
  { name: "Marcus Klein", src: "/images/partners/02-klein.webp" },
  { name: "Rachel Lee", src: "/images/partners/03-lee.webp" },
  { name: "Tom Singh", src: "/images/partners/04-singh.webp" },
]

function AboutPractice() {
  return (
    <section className="section-padding bg-card">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-15%" }}
          transition={{ duration: 0.8, ease: EASE_OUT }}
          className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between"
        >
          <div>
            <Eyebrow>What We Do</Eyebrow>
            <h2 className="mt-8 max-w-2xl text-4xl leading-[1.05] font-light tracking-tight md:text-5xl">
              When we put our name on a case,{" "}
              <span className="text-accent">we mean it.</span>
            </h2>
          </div>
          <p className="max-w-sm text-base leading-relaxed text-muted-foreground md:text-right">
            Five practice areas, one standard — honest, careful, and ours.
          </p>
        </motion.div>

        <ul className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 md:mt-16 lg:grid-cols-3">
          {PRACTICE_AREAS.map((area, i) => (
            <motion.li
              key={area.slug}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-8%" }}
              transition={{ duration: 0.6, ease: EASE_OUT, delay: i * 0.06 }}
            >
              <a
                href={`/services/${area.slug}`}
                className="group/card flex h-full flex-col overflow-hidden rounded-xl bg-background ring-1 ring-foreground/10 transition-colors hover:ring-foreground/25"
              >
                <div className="relative aspect-[3/2] overflow-hidden">
                  <img
                    src={area.image}
                    alt=""
                    sizes="(min-width: 1024px) 30vw, (min-width: 640px) 50vw, 100vw"
                    className="absolute inset-0 size-full object-cover transition-transform duration-700 group-hover/card:scale-105"
                  />
                  <span className="absolute top-4 left-4 font-display text-sm leading-none font-light text-background">
                    {area.roman}
                  </span>
                </div>
                <div className="flex flex-1 items-start justify-between gap-4 p-6">
                  <div>
                    <h3 className="text-lg leading-tight font-light tracking-tight transition-colors group-hover/card:text-accent md:text-xl">
                      {area.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                      {area.summary}
                    </p>
                  </div>
                  <MoveUpRight
                    className="size-5 shrink-0 text-foreground/30 transition-all group-hover/card:translate-x-0.5 group-hover/card:-translate-y-0.5 group-hover/card:text-accent"
                    strokeWidth={1.5}
                  />
                </div>
              </a>
            </motion.li>
          ))}

          <motion.li
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-8%" }}
            transition={{ duration: 0.6, ease: EASE_OUT, delay: 0.3 }}
          >
            <a
              href="#team"
              className="group/people flex h-full flex-col justify-between gap-8 rounded-xl bg-foreground p-6 text-background transition-colors hover:bg-foreground/90"
            >
              <p className="text-lg leading-snug font-light tracking-tight transition-transform duration-300 group-hover/people:-translate-y-0.5 md:text-xl">
                Meet the team behind the verdicts.
              </p>
              <div className="flex items-center justify-between gap-4">
                <AvatarGroup className="translate-x-1 opacity-0 transition-all duration-300 group-hover/people:translate-x-0 group-hover/people:opacity-100">
                  {TEAM.map((p) => (
                    <Avatar key={p.name} size="sm">
                      <AvatarImage src={p.src} alt={p.name} />
                      <AvatarFallback>
                        {p.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                  ))}
                </AvatarGroup>

                <span className="inline-flex items-center gap-3 text-sm tracking-tight">
                  Our people
                  <span className="grid size-10 place-items-center rounded-full bg-accent text-accent-foreground transition-transform group-hover/people:translate-x-0.5 group-hover/people:-translate-y-0.5">
                    <MoveUpRight className="size-4" strokeWidth={1.5} />
                  </span>
                </span>
              </div>
            </a>
          </motion.li>
        </ul>
      </div>
    </section>
  )
}

export default AboutPractice
