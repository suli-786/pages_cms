'use client';

import { type ReactNode } from 'react';

import { Loader2, MoveUpRight } from 'lucide-react';

import { SocialLinks } from '@/components/elements/social-links';
import { UmmahMark, UmmahWordmark } from '@/components/layout/logo';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { NAV_LINKS } from '@/consts';
import { useFakeSubmit } from '@/hooks/use-fake-submit';
import type { SocialLink } from '@/lib/site';
import { cn, isExternal } from '@/lib/utils';

// The site's foundational verse — moved here from the About page's removed
// "Rooted in faith" section (user decision, 2026-07-20) so it stands under
// every page, set in the quote treatment that section established: accent
// quote bar, text face, mono citation.
const VERSE =
  'Cooperate with one another in goodness and righteousness, and do not cooperate in sin and transgression. And be mindful of Allah. Surely Allah is severe in punishment.';
const VERSE_CITATION = "Qur'an 5:2";

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
    { label: 'hello@ummahtech.net', href: 'mailto:hello@ummahtech.net' },
    { label: 'WhatsApp community', href: whatsapp || '#' },
    { label: 'Get tickets', href: '/#contact' },
  ];

  return (
    <footer className="dark bg-background text-foreground pt-14 pb-8 md:pt-20 md:pb-10">
      <div className="container">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr_1.5fr]">
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
            <figure className="max-w-sm">
              <blockquote className="border-accent border-s-2 ps-4">
                <p className="font-text text-foreground/80 text-sm leading-relaxed text-pretty">
                  {VERSE}
                </p>
              </blockquote>
              <figcaption className="text-foreground/55 mt-2.5 ps-4 font-mono text-[10px] tracking-[0.18em] uppercase">
                <cite className="not-italic">{VERSE_CITATION}</cite>
              </figcaption>
            </figure>
          </div>

          <FooterColumn label="Explore">
            <ul className="space-y-3 text-sm">
              {NAV_LINKS.map((l) => (
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

        <Baseline socials={socials} />
      </div>
    </footer>
  );
}

// Compact one-field signup. Shares the placeholder submit with the main form
// (src/hooks/use-fake-submit.ts) — wire both when a backend exists.
function NewsletterForm() {
  const { status, busy, onSubmit } = useFakeSubmit();
  const locked = busy || status === 'success';

  return (
    <form className="mt-5" onSubmit={onSubmit}>
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
  return (
    <a
      href={href}
      {...(isExternal(href)
        ? { target: '_blank', rel: 'noopener noreferrer' }
        : {})}
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

// The legal line + socials (user decision, 2026-07-20: socials replaced the
// location line down here, and the NPC registration sits with the copyright
// so one line carries both the notice and the registered entity). The
// registration number is verbatim from the 2024 partner proposal
// (working/content-triage.md #8) and this footer is its single published
// location on the site.
function Baseline({ socials = [] }: { socials?: SocialLink[] }) {
  return (
    <div className="border-foreground/12 mt-10 flex flex-col gap-4 border-t pt-6 sm:flex-row sm:items-center sm:justify-between md:mt-12">
      <span className="text-foreground/70 text-xs">
        © 2026 Ummah Tech NPC · 2024/095025/08
      </span>
      {socials.length > 0 && <SocialLinks socials={socials} size="sm" />}
    </div>
  );
}

export default Footer;
