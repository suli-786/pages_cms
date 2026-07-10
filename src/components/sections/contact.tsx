"use client"

import { type FormEvent, type ReactNode, useCallback, useState } from "react"
import { AlertCircle, CheckCircle2, Loader2, Mail, MoveUpRight } from "lucide-react"
import { motion } from "motion/react"

import SectionHeader from "@/components/elements/section-header"
import { Button } from "@/components/ui/button"
import { Field, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import type { NewsletterContent } from "@/lib/home"
import { cn } from "@/lib/utils"

const ERROR_MESSAGE = "Something went wrong. Please try again in a moment."

const EASE_OUT = [0.23, 1, 0.32, 1] as const

type Status = "idle" | "submitting" | "success" | "error"

/* ────────────────────  ROOT  ──────────────────── */

function Contact({ content }: { content: NewsletterContent }) {
  const {
    badge,
    heading,
    description,
    formEyebrow,
    formHeading,
    successMessage,
    perksCard,
  } = content

  return (
    <section
      id="newsletter"
      className="section-padding relative scroll-mt-24 overflow-hidden"
    >
      <div className="container">
        <SectionHeader
          badge={badge}
          heading={heading}
          description={description}
          mark={
            <Mail aria-hidden className="size-10 text-foreground/30" strokeWidth={1} />
          }
        />
      </div>

      <div className="container mt-12 md:mt-16 lg:mt-20">
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-[1.4fr_1fr] lg:gap-5">
          <div className="rounded-xl border p-7 md:p-10">
            <SignupForm
              eyebrow={formEyebrow}
              heading={formHeading}
              successMessage={successMessage}
            />
          </div>
          <PerksCard content={perksCard} />
        </div>
      </div>
    </section>
  )
}

/* ────────────────────  PERKS CARD  ──────────────────── */

function PerksCard({
  content,
}: {
  content: NewsletterContent["perksCard"]
}) {
  return (
    <div className="brass-mesh dark relative flex min-h-[30rem] flex-col justify-between overflow-hidden rounded-xl p-8 text-foreground md:p-12">
      <div
        aria-hidden
        className="absolute inset-0 bg-linear-to-t from-black/55 via-black/10 to-transparent"
      />
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-12%" }}
        transition={{ duration: 0.7, ease: EASE_OUT }}
        className="relative"
      >
        <Eyebrow className="text-foreground/80">{content.eyebrow}</Eyebrow>
        <h3 className="mt-6 text-4xl leading-[1.04] font-light tracking-tight md:text-5xl">
          {content.heading}
        </h3>
      </motion.div>

      <ul className="relative mt-12 divide-y divide-white/10 border-t border-white/10">
        {(content.perks ?? []).map((perk) => (
          <li
            key={perk}
            className="flex items-center gap-3 py-4 text-sm font-light tracking-tight text-foreground/90"
          >
            <span aria-hidden className="block h-px w-5 shrink-0 bg-accent" />
            {perk}
          </li>
        ))}
      </ul>
    </div>
  )
}

/* ────────────────────  FORM  ──────────────────── */

function SignupForm({
  eyebrow,
  heading,
  successMessage,
}: {
  eyebrow: string
  heading: string
  successMessage: string
}) {
  const [status, setStatus] = useState<Status>("idle")

  const onSubmit = useCallback((e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const email = String(new FormData(e.currentTarget).get("email") ?? "")
    setStatus("submitting")
    window.setTimeout(() => {
      setStatus(email.toLowerCase().includes("fail") ? "error" : "success")
    }, 1200)
  }, [])

  return (
    <>
      <Eyebrow>{eyebrow}</Eyebrow>
      <h3 className="mt-4 text-2xl leading-tight font-light tracking-tight md:text-3xl">
        {heading}
      </h3>

      <form onSubmit={onSubmit} className="mt-8">
        <FormFields locked={status === "submitting" || status === "success"} />
        <div className="mt-6 space-y-4">
          {status === "success" && (
            <Banner tone="success">{successMessage}</Banner>
          )}
          {status === "error" && <Banner tone="error">{ERROR_MESSAGE}</Banner>}
          <SubmitButton status={status} />
        </div>
      </form>
    </>
  )
}

function Banner({
  tone,
  children,
}: {
  tone: "success" | "error"
  children: ReactNode
}) {
  const success = tone === "success"
  return (
    <motion.div
      role="status"
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: EASE_OUT }}
      className={cn(
        "flex items-start gap-3 rounded-md border p-4 text-sm",
        success
          ? "border-accent/30 bg-accent/10 text-foreground"
          : "border-destructive/30 bg-destructive/10 text-destructive"
      )}
    >
      {success ? (
        <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-accent" />
      ) : (
        <AlertCircle className="mt-0.5 size-4 shrink-0" />
      )}
      <span>{children}</span>
    </motion.div>
  )
}

function SubmitButton({ status }: { status: Status }) {
  const busy = status === "submitting"
  const locked = busy || status === "success"
  return (
    <Button type="submit" size="lg" disabled={locked}>
      {busy ? (
        <>
          <Loader2 className="size-4 animate-spin" />
          Signing up…
        </>
      ) : (
        <>
          Join the list
          <MoveUpRight />
        </>
      )}
    </Button>
  )
}

const labelClass =
  "gap-2 text-[0.5625rem] tracking-[0.25em] text-foreground/65 uppercase"

function FormFields({ locked }: { locked?: boolean }) {
  return (
    <fieldset
      disabled={locked}
      className="grid grid-cols-1 gap-6 transition-opacity disabled:opacity-60 sm:grid-cols-2"
    >
      <Field>
        <FieldLabel htmlFor="firstName" className={labelClass}>
          <FieldTick /> First name <Required />
        </FieldLabel>
        <Input
          id="firstName"
          name="firstName"
          placeholder="First name"
          autoComplete="given-name"
          required
        />
      </Field>

      <Field>
        <FieldLabel htmlFor="lastName" className={labelClass}>
          <FieldTick /> Last name <Required />
        </FieldLabel>
        <Input
          id="lastName"
          name="lastName"
          placeholder="Last name"
          autoComplete="family-name"
          required
        />
      </Field>

      <Field>
        <FieldLabel htmlFor="email" className={labelClass}>
          <FieldTick /> Email address <Required />
        </FieldLabel>
        <Input
          id="email"
          name="email"
          type="email"
          placeholder="you@email.com"
          autoComplete="email"
          required
        />
      </Field>

      <Field>
        <FieldLabel htmlFor="phone" className={labelClass}>
          <FieldTick /> Phone number <Required />
        </FieldLabel>
        <Input
          id="phone"
          name="phone"
          type="tel"
          placeholder="+27 …"
          autoComplete="tel"
          required
        />
      </Field>

      <Field className="sm:col-span-full">
        <FieldLabel htmlFor="linkedin" className={labelClass}>
          <FieldTick /> LinkedIn profile
        </FieldLabel>
        <Input
          id="linkedin"
          name="linkedin"
          type="url"
          placeholder="https://linkedin.com/in/…"
          autoComplete="url"
        />
      </Field>
    </fieldset>
  )
}

function FieldTick() {
  return <span aria-hidden className="block h-px w-4 bg-accent" />
}

function Required() {
  return (
    <span aria-hidden className="text-accent">
      *
    </span>
  )
}

/* ────────────────────  SHARED  ──────────────────── */

function Eyebrow({
  children,
  className,
}: {
  children: ReactNode
  className?: string
}) {
  return (
    <span
      className={cn(
        "flex items-center gap-2.5 text-[0.5625rem] tracking-[0.25em] text-foreground/65 uppercase",
        className
      )}
    >
      <span aria-hidden className="block h-px w-5 bg-accent" />
      {children}
    </span>
  )
}

export default Contact
