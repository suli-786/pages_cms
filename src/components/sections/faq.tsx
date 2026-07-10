"use client"

import { CircleHelp, MoveUpRight } from "lucide-react"
import { motion } from "motion/react"

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Badge } from "@/components/ui/badge"

const FAQS = [
  {
    q: "How does our first meeting work?",
    a: "A senior partner takes the first call — never an assistant. We use the call to check for conflicts, understand your case, and decide together if we're the right fit. The first conversation is free.",
  },
  {
    q: "What will it be like working with our team?",
    a: "The same team that builds your plan also runs your case in court. You'll know exactly who is working on your case, and they'll know your story before they pick up the phone.",
  },
  {
    q: "How long do different types of cases take?",
    a: "We send a first plan within three days. Court dates depend on the court's schedule, but we'll give you an honest look at the next 90 days before you sign anything.",
  },
  {
    q: "How does pricing and billing work?",
    a: "Most cases are billed by the hour with a clear budget agreed up front and checked at each step. We can also talk about other options — like fixed fees or success bonuses — when they make sense.",
  },
  {
    q: "How do we keep your information safe?",
    a: "We sign a confidentiality agreement from the very first call. Your information stays in a secure system, and only the people who need to see it on your case will.",
  },
  {
    q: "Do we handle appeals and follow-up work?",
    a: "Yes. Our appeals team writes strong briefs based on the same case record we helped build. We also handle collecting on judgments and any motions after the verdict.",
  },
]

const EASE_OUT = [0.23, 1, 0.32, 1] as const

function Faq() {
  return (
    <section id="faq" className="section-padding">
      <div className="container">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1fr_1.4fr] lg:gap-16">
          <FaqHeader />
          <FaqList />
        </div>
      </div>
    </section>
  )
}

function FaqHeader() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-15%" }}
      transition={{ duration: 0.7, ease: EASE_OUT }}
      className="relative lg:sticky lg:top-28 lg:self-start"
    >
      <div className="flex items-start justify-between gap-4">
        <Badge variant="outline" size="lg">
          <span className="size-1 rounded-full bg-foreground/40" />
          FAQ
          <span className="size-1 rounded-full bg-foreground/40" />
        </Badge>
        <FaqMark />
      </div>

      <h2 className="mt-8 text-3xl leading-[1.05] font-light tracking-tight md:text-4xl lg:text-5xl">
        Answers to your legal questions.
      </h2>

      <p className="mt-6 max-w-md text-base text-muted-foreground">
        We know legal questions can feel a lot to handle — especially when
        you&apos;re not sure where to start. Here are the questions clients ask
        us most often before getting in touch.
      </p>

      <ContactBridge />
    </motion.div>
  )
}

function ContactBridge() {
  return (
    <div className="mt-10 border-t pt-6">
      <p className="text-sm text-muted-foreground">
        Don&apos;t see your question?
      </p>
      <a
        href="/contact"
        className="group/bridge mt-1.5 inline-flex items-center gap-2 text-sm tracking-tight text-foreground transition-colors"
      >
        <span className="border-b border-transparent transition-colors group-hover/bridge:border-foreground">
          Talk to a lawyer directly
        </span>
        <MoveUpRight className="size-3.5 text-accent transition-transform group-hover/bridge:translate-x-0.5 group-hover/bridge:-translate-y-0.5" />
      </a>
    </div>
  )
}

function FaqList() {
  return (
    <Accordion
      type="single"
      collapsible
      defaultValue="item-0"
      variant="stacked"
    >
      {FAQS.map((f, i) => (
        <AccordionItem key={i} value={`item-${i}`}>
          <AccordionTrigger>{f.q}</AccordionTrigger>
          <AccordionContent>{f.a}</AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  )
}

function FaqMark() {
  return (
    <CircleHelp aria-hidden className="size-6 text-foreground/40" strokeWidth={1} />
  )
}

export default Faq
