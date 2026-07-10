"use client"

import { Mail, Phone } from "lucide-react"
import { motion } from "motion/react"

import {
  PRIMARY_OFFICE,
  SUPPORT_EMAIL,
  SUPPORT_EMAIL_HREF,
} from "@/lib/contact"

const EASE_OUT = [0.23, 1, 0.32, 1] as const

function ContactBanner() {
  return (
    <section className="dark bg-background text-foreground">
      <div className="container py-16 md:py-20">
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-15%" }}
          transition={{ duration: 0.7, ease: EASE_OUT }}
          className="grid grid-cols-1 items-center gap-8 md:grid-cols-[1fr_auto] md:gap-12"
        >
          <h2 className="text-3xl leading-tight font-light tracking-tight md:text-4xl lg:text-5xl">
            Speak with counsel.
          </h2>

          <div className="flex flex-wrap items-center gap-x-8 gap-y-3 text-sm md:text-base">
            <a
              href={PRIMARY_OFFICE.phone.href}
              className="group/row inline-flex items-center gap-2.5 text-foreground/85 transition-colors hover:text-foreground"
            >
              <Phone className="size-4 text-accent" />
              {PRIMARY_OFFICE.phone.display}
            </a>
            <a
              href={SUPPORT_EMAIL_HREF}
              className="group/row inline-flex items-center gap-2.5 text-foreground/85 transition-colors hover:text-foreground"
            >
              <Mail className="size-4 text-accent" />
              {SUPPORT_EMAIL}
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default ContactBanner
