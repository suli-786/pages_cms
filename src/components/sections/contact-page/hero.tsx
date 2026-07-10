"use client"

import { Mail, Phone } from "lucide-react"
import { motion } from "motion/react"

import ContactForm from "@/components/sections/contact-page/contact-form"
import { Badge } from "@/components/ui/badge"
import {
  PRIMARY_OFFICE,
  SUPPORT_EMAIL,
  SUPPORT_EMAIL_HREF,
} from "@/lib/contact"

const EASE_OUT = [0.23, 1, 0.32, 1] as const

const QUOTE = {
  text: "The first call should reach a partner. Not an assistant, not a queue.",
  author: "Jane Anderson",
  role: "Managing Partner",
}

function ContactHero() {
  return (
    <section className="relative overflow-hidden">
      <div className="grid grid-cols-1 lg:grid-cols-2">
        <PortraitPanel />
        <FormPanel />
      </div>
    </section>
  )
}

function PortraitPanel() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1, ease: EASE_OUT }}
      className="relative aspect-[4/5] w-full lg:aspect-square lg:w-auto"
    >
      <img
        src="/images/contact/portrait.webp"
        alt=""
        sizes="(min-width: 1024px) 50vw, 100vw"
        className="absolute inset-0 size-full object-cover object-[70%_center]"
      />

      {/* Soften the top of the photo so the (dark) navbar stays legible over it. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-28 bg-linear-to-b from-background/85 via-background/30 to-transparent md:h-32"
      />

      <motion.figure
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: EASE_OUT, delay: 0.4 }}
        className="absolute bottom-6 left-6 max-w-[20rem] rounded-xl bg-background/75 p-6 ring-1 ring-foreground/5 backdrop-blur-md md:bottom-10 md:left-10 md:max-w-sm md:p-7"
      >
        <span aria-hidden className="block text-3xl leading-none text-accent">
          “
        </span>
        <blockquote className="mt-2 text-base leading-snug font-light tracking-tight text-foreground md:text-lg">
          {QUOTE.text}
        </blockquote>
        <figcaption className="mt-5 text-sm leading-tight">
          <div className="font-light text-foreground">{QUOTE.author}</div>
          <div className="mt-1 text-xs text-muted-foreground md:text-sm">
            {QUOTE.role}
          </div>
        </figcaption>
      </motion.figure>
    </motion.div>
  )
}

function FormPanel() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: EASE_OUT, delay: 0.15 }}
      className="flex flex-col justify-center bg-muted/30 px-6 py-16 md:px-14 md:py-24 lg:px-20 lg:py-28"
    >
      <div className="mx-auto w-full max-w-md">
        <Badge variant="outline" size="lg">
          <span className="size-1 rounded-full bg-foreground/40" />
          Contact
          <span className="size-1 rounded-full bg-foreground/40" />
        </Badge>

        <h1 className="mt-7 text-4xl leading-[1.02] font-light tracking-tight md:text-5xl">
          Get in touch.
        </h1>

        <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm">
          <a
            href={PRIMARY_OFFICE.phone.href}
            className="group/contact inline-flex items-center gap-2 text-foreground transition-colors hover:text-accent"
          >
            <Phone className="size-3.5 text-accent" />
            {PRIMARY_OFFICE.phone.display}
          </a>
          <a
            href={SUPPORT_EMAIL_HREF}
            className="group/contact inline-flex items-center gap-2 text-foreground transition-colors hover:text-accent"
          >
            <Mail className="size-3.5 text-accent" />
            {SUPPORT_EMAIL}
          </a>
        </div>

        <div className="mt-10">
          <ContactForm submitLabel="Send message" />
        </div>
      </div>
    </motion.div>
  )
}

export default ContactHero
