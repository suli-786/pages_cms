'use client';

import { useState, type ReactNode } from 'react';

import {
  AlertCircle,
  CheckCircle2,
  HandHeart,
  Handshake,
  Loader2,
  MessagesSquare,
  Mic,
  MoveUpRight,
} from 'lucide-react';
import { motion } from 'motion/react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { useFakeSubmit } from '@/hooks/use-fake-submit';
import type { ContactContent } from '@/lib/home';
import { cn } from '@/lib/utils';

// Contact — adapted from @shadcnblocks/contact18: a two-column block with
// bracket ornaments on the headline, icon rows on the left and a muted rounded
// form on the right. Adapted to this site: the ornaments use the viewfinder
// corner device (speakers CTA / partner frames), the form keeps the codebase's
// hand-rolled submit pattern (no react-hook-form/zod), and one shared form
// serves four functions via the "reaching out about" select below.
const FUNCTIONS = [
  {
    value: 'contact',
    label: 'Contact Us',
    icon: MessagesSquare,
    line: 'Questions, ideas or anything else.',
  },
  {
    value: 'speaker',
    label: 'Apply To Be A Speaker',
    icon: Mic,
    line: 'Share your work on the 2026 stage.',
  },
  {
    value: 'volunteer',
    label: 'Apply To Be A Volunteer',
    icon: HandHeart,
    line: 'Help make the conference happen.',
  },
  {
    value: 'partner',
    label: 'Partner With Us',
    icon: Handshake,
    line: 'Back the community as an organisation.',
  },
];

const EMAIL = 'hello@ummahtech.net';

const ERROR_MESSAGE = 'Something went wrong. Please try again in a moment.';

const EASE_OUT = [0.23, 1, 0.32, 1] as const;

function Contact({ content }: { content: ContactContent }) {
  const { heading, description, successMessage } = content;

  return (
    <section
      id="contact"
      className="section-padding relative scroll-mt-24 overflow-hidden"
    >
      <div className="container">
        <div className="flex flex-col justify-between gap-14 lg:flex-row lg:gap-10">
          {/* Left — headline with corner brackets, the four functions, email */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-12%' }}
            transition={{ duration: 0.7, ease: EASE_OUT }}
            className="flex w-full max-w-lg flex-col gap-12"
          >
            <div className="relative w-fit">
              <h2 className="pr-6 text-4xl leading-[1.05] font-light tracking-tight md:text-5xl lg:text-6xl">
                {heading}
              </h2>
              <span
                aria-hidden
                className="border-accent absolute -top-3 -right-1 size-5 border-t-2 border-r-2"
              />
              <span
                aria-hidden
                className="border-accent absolute -bottom-3 -left-4 size-5 border-b-2 border-l-2"
              />
            </div>

            {description && (
              <p className="text-muted-foreground max-w-md text-base">
                {description}
              </p>
            )}

            <ul className="space-y-5">
              {FUNCTIONS.map((f) => (
                <li key={f.value} className="flex items-center gap-4">
                  <span className="bg-accent/10 text-accent flex size-9 shrink-0 items-center justify-center rounded-md">
                    <f.icon
                      aria-hidden
                      className="size-4.5"
                      strokeWidth={1.75}
                    />
                  </span>
                  <span className="text-sm">
                    <span className="block font-medium">{f.label}</span>
                    <span className="text-muted-foreground block text-xs">
                      {f.line}
                    </span>
                  </span>
                </li>
              ))}
            </ul>

            <a
              href={`mailto:${EMAIL}`}
              className="group hover:text-accent flex w-fit items-center gap-3 text-2xl font-medium tracking-tight transition-colors md:text-3xl"
            >
              {EMAIL}
              <MoveUpRight
                aria-hidden
                className="size-5 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </a>
          </motion.div>

          {/* Right — the shared form */}
          <div className="w-full lg:max-w-xl lg:pl-10">
            <ContactForm successMessage={successMessage} />
          </div>
        </div>
      </div>
    </section>
  );
}

const fieldClass =
  'h-14 rounded-xl border-0 bg-muted shadow-none placeholder:text-foreground/35 placeholder:text-xs placeholder:tracking-[0.18em] placeholder:uppercase';

function ContactForm({ successMessage }: { successMessage: string }) {
  const [about, setAbout] = useState(FUNCTIONS[0].value);
  const { status, busy, onSubmit } = useFakeSubmit({
    onSuccess: (form) => {
      form.reset();
      setAbout(FUNCTIONS[0].value);
    },
  });

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-2.5">
      {status === 'success' && <Banner tone="success">{successMessage}</Banner>}
      {status === 'error' && <Banner tone="error">{ERROR_MESSAGE}</Banner>}

      <label htmlFor="contact-about" className="sr-only">
        What are you reaching out about?
      </label>
      <Select value={about} onValueChange={setAbout} disabled={busy}>
        <SelectTrigger
          id="contact-about"
          className={cn(
            fieldClass,
            'w-full text-xs tracking-[0.18em] uppercase data-[size=default]:h-14',
          )}
        >
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {FUNCTIONS.map((f) => (
            <SelectItem key={f.value} value={f.value}>
              {f.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <fieldset
        disabled={busy}
        className="flex flex-col gap-2.5 transition-opacity disabled:opacity-60"
      >
        <label htmlFor="contact-name" className="sr-only">
          Full name
        </label>
        <Input
          id="contact-name"
          name="name"
          placeholder="Name"
          autoComplete="name"
          required
          className={fieldClass}
        />

        <label htmlFor="contact-email" className="sr-only">
          Email address
        </label>
        <Input
          id="contact-email"
          name="email"
          type="email"
          placeholder="Email"
          autoComplete="email"
          required
          className={fieldClass}
        />

        <label htmlFor="contact-phone" className="sr-only">
          Phone number (optional)
        </label>
        <Input
          id="contact-phone"
          name="phone"
          type="tel"
          placeholder="Phone (optional)"
          autoComplete="tel"
          className={fieldClass}
        />

        <label htmlFor="contact-message" className="sr-only">
          Message
        </label>
        <Textarea
          id="contact-message"
          name="message"
          placeholder="Message"
          required
          className={cn(fieldClass, 'h-auto min-h-44 py-4')}
        />

        <Button type="submit" size="lg" className="mt-1 w-full rounded-xl">
          {busy ? (
            <>
              <Loader2 aria-hidden className="size-4 animate-spin" />
              Sending…
            </>
          ) : (
            <>
              Send message
              <MoveUpRight aria-hidden className="size-4" />
            </>
          )}
        </Button>
      </fieldset>
    </form>
  );
}

function Banner({
  tone,
  children,
}: {
  tone: 'success' | 'error';
  children: ReactNode;
}) {
  const success = tone === 'success';
  return (
    <motion.div
      role="status"
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: EASE_OUT }}
      className={cn(
        'flex items-start gap-3 rounded-xl border p-4 text-sm',
        success
          ? 'border-accent/30 bg-accent/10 text-foreground'
          : 'border-destructive/30 bg-destructive/10 text-destructive',
      )}
    >
      {success ? (
        <CheckCircle2
          aria-hidden
          className="text-accent mt-0.5 size-4 shrink-0"
        />
      ) : (
        <AlertCircle aria-hidden className="mt-0.5 size-4 shrink-0" />
      )}
      <span>{children}</span>
    </motion.div>
  );
}

export default Contact;
