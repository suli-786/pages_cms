'use client';

import { useState, type ReactNode } from 'react';

import { Loader2, MoveUpRight } from 'lucide-react';

import { SocialGlyph, socialLabel } from '@/components/elements/social-icons';
import { UmmahMark, UmmahWordmark } from '@/components/layout/logo';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import type { SocialLink } from '@/lib/site';
import { cn } from '@/lib/utils';

const STATEMENT =
  'A growing community nurturing collaboration, innovation and skills among Muslim technologists — for the benefit of the Ummah and humanity.';

const EXPLORE_LINKS = [
  { label: 'Home', href: '/' },
  { label: 'Events', href: '/#event' },
  { label: 'Partner With Us', href: '/#partners' },
  { label: 'About', href: '/#vision' },
];

function Footer({
  socials = [],
  whatsapp = '',
}: {
  socials?: SocialLink[];
  whatsapp?: string;
}) {
  // Falls back to `#` until the invite URL is set in Site settings — same
  // placeholder behaviour as the hero and conference WhatsApp buttons.
  const connectLinks = [
    { label: 'hello@ummahtech.org', href: 'mailto:hello@ummahtech.org' },
    { label: 'WhatsApp community', href: whatsapp || '#' },
    { label: 'Get tickets', href: '/#contact' },
  ];

  return (
    <footer className="dark bg-background text-foreground pt-16 pb-10 md:pt-24 md:pb-14">
      <div className="container">
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr_1.5fr] lg:gap-10">
          {/* Brand — same lockup as the navbar */}
          <div className="flex flex-col gap-6">
            <a
              href="/"
              aria-label="Ummah Tech, home"
              className="focus-visible:ring-ring flex w-fit items-center gap-3.5 rounded-full outline-none focus-visible:ring-2"
            >
              <UmmahMark aria-hidden className="h-9 w-auto" />
              <UmmahWordmark aria-hidden className="h-[18px] w-auto" />
            </a>
            <p className="text-foreground/60 max-w-xs text-sm leading-relaxed">
              {STATEMENT}
            </p>
            {socials.length > 0 && (
              <ul className="flex flex-wrap items-center gap-2">
                {socials.map((s) => (
                  <li key={s.platform}>
                    <a
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={socialLabel(s.platform)}
                      className="border-foreground/15 text-foreground/70 hover:border-accent hover:bg-accent/10 hover:text-foreground focus-visible:ring-ring grid size-9 place-items-center rounded-full border transition-colors outline-none focus-visible:ring-2"
                    >
                      <SocialGlyph platform={s.platform} className="size-4" />
                    </a>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <FooterColumn label="Explore">
            <ul className="space-y-3 text-sm">
              {EXPLORE_LINKS.map((l) => (
                <li key={l.label}>
                  <FooterLink href={l.href}>{l.label}</FooterLink>
                </li>
              ))}
            </ul>
          </FooterColumn>

          <FooterColumn label="Connect">
            <ul className="space-y-3 text-sm">
              {connectLinks.map((l) => (
                <li key={l.label}>
                  <FooterLink href={l.href}>{l.label}</FooterLink>
                </li>
              ))}
            </ul>
          </FooterColumn>

          <FooterColumn label="Newsletter">
            <p className="text-foreground/60 text-sm leading-relaxed">
              Conference updates, speaker announcements and ticket news. No
              spam, unsubscribe anytime.
            </p>
            <NewsletterForm />
          </FooterColumn>
        </div>

        <Baseline />
      </div>
    </footer>
  );
}

// Compact one-field signup. Mirrors the main form's submit behaviour
// (src/components/sections/contact.tsx) — wire both when a backend exists.
function NewsletterForm() {
  const [status, setStatus] = useState<
    'idle' | 'submitting' | 'success' | 'error'
  >('idle');
  const busy = status === 'submitting';
  const locked = busy || status === 'success';

  return (
    <form
      className="mt-5"
      onSubmit={(e) => {
        e.preventDefault();
        const email = String(new FormData(e.currentTarget).get('email') ?? '');
        setStatus('submitting');
        window.setTimeout(() => {
          setStatus(email.toLowerCase().includes('fail') ? 'error' : 'success');
        }, 1200);
      }}
    >
      <label htmlFor="footer-email" className="sr-only">
        Email address
      </label>
      <div className="flex gap-2">
        <Input
          id="footer-email"
          name="email"
          type="email"
          required
          placeholder="you@example.com"
          autoComplete="email"
          disabled={locked}
          className="min-w-0 flex-1"
        />
        <Button type="submit" disabled={locked} className="shrink-0">
          {busy ? (
            <Loader2 aria-hidden className="size-4 animate-spin" />
          ) : (
            <>
              Join
              <MoveUpRight aria-hidden className="size-4" />
            </>
          )}
        </Button>
      </div>
      <p
        role="status"
        className={cn(
          'mt-3 min-h-5 text-sm',
          status === 'success' && 'text-accent',
          status === 'error' && 'text-destructive',
        )}
      >
        {status === 'success' && "Thanks — you're on the list."}
        {status === 'error' && 'Something went wrong. Please try again.'}
      </p>
    </form>
  );
}

function FooterColumn({
  label,
  children,
}: {
  label: string;
  children: ReactNode;
}) {
  return (
    <div>
      <p className="text-foreground/70 text-xs tracking-[0.2em] uppercase">
        {label}
      </p>
      <div className="mt-5">{children}</div>
    </div>
  );
}

function FooterLink({ href, children }: { href: string; children: ReactNode }) {
  const external = /^https?:\/\//.test(href);
  return (
    <a
      href={href}
      {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      className="group text-foreground/65 hover:text-foreground relative inline-flex w-fit transition-colors"
    >
      {children}
      <span
        aria-hidden
        className="bg-accent absolute inset-x-0 -bottom-0.5 h-px origin-left scale-x-0 transition-transform duration-500 ease-out group-hover:scale-x-100"
      />
    </a>
  );
}

function Baseline() {
  return (
    <div className="border-foreground/12 text-foreground/70 mt-16 flex flex-col gap-3 border-t pt-6 text-xs sm:flex-row sm:items-center sm:justify-between md:mt-20">
      <span>© 2026 Ummah Tech</span>
      <span className="flex items-center gap-2">
        <span
          aria-hidden
          className="bg-accent size-1.5 animate-pulse rounded-full"
        />
        Johannesburg &amp; Cape Town, South Africa
      </span>
    </div>
  );
}

export default Footer;
