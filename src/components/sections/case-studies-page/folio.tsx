"use client"

import { motion } from "motion/react"

import FolioList from "@/components/sections/case-studies-page/folio-list"
import { Badge } from "@/components/ui/badge"
import type { CaseStudyFrontmatter } from "@/lib/types"

const EASE_OUT = [0.23, 1, 0.32, 1] as const

function CaseStudiesFolio({ cases }: { cases: CaseStudyFrontmatter[] }) {
  return (
    <section className="hero-padding overflow-hidden">
      <div className="container">
        <FolioIntro />

        <FolioList cases={cases} />
      </div>
    </section>
  )
}

function FolioIntro() {
  return (
    <motion.div
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-15%" }}
      variants={{ show: { transition: { staggerChildren: 0.08 } } }}
      className="max-w-4xl"
    >
      <motion.div
        variants={{ hidden: { opacity: 0, y: 14 }, show: { opacity: 1, y: 0 } }}
        transition={{ duration: 0.6, ease: EASE_OUT }}
      >
        <Badge variant="outline" size="lg">
          <span className="size-1 rounded-full bg-foreground/40" />
          Case Studies
          <span className="size-1 rounded-full bg-foreground/40" />
        </Badge>
      </motion.div>
      <motion.h1
        variants={{ hidden: { opacity: 0, y: 18 }, show: { opacity: 1, y: 0 } }}
        transition={{ duration: 0.7, ease: EASE_OUT }}
        className="mt-8 text-4xl leading-[1.02] font-light tracking-tight md:text-6xl lg:text-7xl"
      >
        Real cases. Real results for our clients.
      </motion.h1>
      <motion.p
        variants={{ hidden: { opacity: 0, y: 14 }, show: { opacity: 1, y: 0 } }}
        transition={{ duration: 0.7, ease: EASE_OUT }}
        className="mt-8 max-w-2xl text-base text-muted-foreground md:text-lg"
      >
        A full record of recent work across our service areas. Some names are
        kept private to respect client confidentiality. These are the cases we
        were hired to win — and what the court decided.
      </motion.p>
    </motion.div>
  )
}

export default CaseStudiesFolio
