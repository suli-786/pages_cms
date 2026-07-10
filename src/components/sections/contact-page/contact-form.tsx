"use client"

import { type FormEvent, type ReactNode, useCallback, useState } from "react"
import { AlertCircle, CheckCircle2, Loader2, MoveUpRight } from "lucide-react"
import { motion } from "motion/react"

import { Button } from "@/components/ui/button"
import { Field, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { SUPPORT_EMAIL } from "@/lib/contact"
import { cn } from "@/lib/utils"

export const SUCCESS_MESSAGE =
  "Brief received. A senior member of our team will respond within seventy-two hours."

export const ERROR_MESSAGE = `We couldn't transmit your brief. Please try again, or write to ${SUPPORT_EMAIL} directly.`

const EASE_OUT = [0.23, 1, 0.32, 1] as const

export type Status = "idle" | "submitting" | "success" | "error"

export type ContactFormTone = "light" | "dark"

function ContactForm({
  tone = "light",
  submitLabel = "Send message",
}: {
  tone?: ContactFormTone
  submitLabel?: string
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

  const isDark = tone === "dark"
  const locked = status === "submitting" || status === "success"

  return (
    <form onSubmit={onSubmit} className="space-y-5">
      <fieldset
        disabled={locked}
        className="space-y-4 transition-opacity disabled:opacity-60"
      >
        <Field>
          <FieldLabel htmlFor="name" className="sr-only">
            Name
          </FieldLabel>
          <Input id="name" name="name" placeholder="Name" required />
        </Field>

        <Field>
          <FieldLabel htmlFor="email" className="sr-only">
            Email
          </FieldLabel>
          <Input
            id="email"
            name="email"
            type="email"
            placeholder="Email"
            required
          />
        </Field>

        <Field>
          <FieldLabel htmlFor="message" className="sr-only">
            Message
          </FieldLabel>
          <Textarea
            id="message"
            name="message"
            rows={5}
            placeholder="Message"
            required
            className="resize-none"
          />
        </Field>
      </fieldset>

      <div className="space-y-4 pt-1">
        {status === "success" && (
          <Banner tone="success" isDark={isDark}>
            {SUCCESS_MESSAGE}
          </Banner>
        )}
        {status === "error" && (
          <Banner tone="error" isDark={isDark}>
            {ERROR_MESSAGE}
          </Banner>
        )}

        <SubmitButton status={status} label={submitLabel} />
      </div>
    </form>
  )
}

function Banner({
  tone,
  isDark,
  children,
}: {
  tone: "success" | "error"
  isDark?: boolean
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
          ? isDark
            ? "border-accent/40 bg-accent/15 text-foreground"
            : "border-accent/30 bg-accent/10 text-foreground"
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

function SubmitButton({ status, label }: { status: Status; label: string }) {
  const busy = status === "submitting"
  const locked = busy || status === "success"

  return (
    <Button type="submit" size="lg" disabled={locked} className="w-full">
      {busy ? (
        <>
          <Loader2 className="animate-spin" />
          Transmitting…
        </>
      ) : (
        <>
          {label}
          <MoveUpRight />
        </>
      )}
    </Button>
  )
}

export default ContactForm
