"use client"

import { MoveUpRight, Star } from "lucide-react"
import { motion } from "motion/react"

import Eyebrow from "@/components/elements/eyebrow"
import {
  Avatar,
  AvatarFallback,
  AvatarGroup,
  AvatarImage,
} from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"

const EASE_OUT = [0.23, 1, 0.32, 1] as const

type Part =
  | { type: "word"; text: string }
  | { type: "image"; src: string; alt: string }

const HEADLINE_PARTS: Part[] = [
  { type: "word", text: "From" },
  { type: "word", text: "a" },
  { type: "word", text: "small" },
  { type: "word", text: "office" },
  { type: "word", text: "downtown," },
  {
    type: "image",
    src: "/images/process/001-intake.webp",
    alt: "",
  },
  { type: "word", text: "to" },
  { type: "word", text: "courts" },
  {
    type: "image",
    src: "/images/process/005-verdict.webp",
    alt: "",
  },
  { type: "word", text: "across" },
  { type: "word", text: "the" },
  { type: "word", text: "country" },
  { type: "word", text: "—" },
  { type: "word", text: "our" },
  { type: "word", text: "work" },
  { type: "word", text: "is" },
  { type: "word", text: "built" },
  { type: "word", text: "on" },
  { type: "word", text: "trust," },
  { type: "word", text: "honest" },
  { type: "word", text: "advice," },
  {
    type: "image",
    src: "/images/about/hero-1.webp",
    alt: "",
  },
  { type: "word", text: "and" },
  { type: "word", text: "results" },
  { type: "word", text: "we" },
  { type: "word", text: "stand" },
  { type: "word", text: "by." },
]

const TRUST_AVATARS = [
  { name: "Jane Anderson", src: "/images/partners/01-anderson.webp" },
  { name: "Marcus Klein", src: "/images/partners/02-klein.webp" },
  { name: "Rachel Lee", src: "/images/partners/03-lee.webp" },
  { name: "Tom Singh", src: "/images/partners/04-singh.webp" },
  { name: "Anna Petrova", src: "/images/partners/05-petrova.webp" },
]

const containerVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.04, delayChildren: 0.1 } },
}

const wordVariants = {
  hidden: { opacity: 0, y: 10 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: EASE_OUT },
  },
}

const imageVariants = {
  hidden: { opacity: 0, scale: 0.6 },
  show: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.55, ease: EASE_OUT },
  },
}

function AboutStory() {
  return (
    <section className="section-padding bg-card">
      <div className="container">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-15%" }}
          variants={containerVariants}
          className="mx-auto max-w-4xl text-center"
        >
          <motion.div variants={wordVariants}>
            <Eyebrow className="justify-center">Our Story</Eyebrow>
          </motion.div>

          <h2 className="mt-8 flex flex-wrap items-center justify-center gap-x-3 gap-y-3 text-3xl leading-[1.15] font-light tracking-tight md:gap-x-4 md:text-4xl lg:text-5xl">
            {HEADLINE_PARTS.map((p, i) => {
              if (p.type === "image") {
                return (
                  <motion.span
                    key={i}
                    variants={imageVariants}
                    className="relative inline-block h-10 w-14 overflow-hidden rounded-full ring-1 ring-foreground/10 md:h-12 md:w-20 lg:h-14 lg:w-24"
                  >
                    <img
                      src={p.src}
                      alt={p.alt}
                      sizes="96px"
                      className="absolute inset-0 size-full object-cover"
                    />
                  </motion.span>
                )
              }
              return (
                <motion.span key={i} variants={wordVariants}>
                  {p.text}
                </motion.span>
              )
            })}
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-15%" }}
          transition={{ duration: 0.7, ease: EASE_OUT, delay: 0.2 }}
          className="mt-8 flex flex-col items-center md:mt-10"
        >
          <div className="flex items-center gap-4">
            <AvatarGroup>
              {TRUST_AVATARS.map((a) => (
                <Avatar key={a.name}>
                  <AvatarImage src={a.src} alt={a.name} />
                  <AvatarFallback>
                    {a.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
              ))}
            </AvatarGroup>

            <div className="flex flex-col gap-1">
              <div className="flex gap-0.5 text-chart-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className="size-3.5"
                    fill="currentColor"
                    strokeWidth={0}
                  />
                ))}
              </div>
              <span className="font-mono text-[0.625rem] tracking-[0.2em] text-foreground/65 uppercase">
                Top-rated lawyers
              </span>
            </div>
          </div>

          <Button asChild size="lg" className="mt-14 md:mt-16">
            <a href="/contact">
              Book a consultation
              <MoveUpRight className="size-4" strokeWidth={1.5} />
            </a>
          </Button>
        </motion.div>
      </div>
    </section>
  )
}

export default AboutStory
