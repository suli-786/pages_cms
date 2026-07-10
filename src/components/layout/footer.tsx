import { type ReactNode } from "react"

import { VerdictLogo } from "@/components/layout/logo"
import {
  OFFICES,
  PRIMARY_OFFICE,
  SUPPORT_EMAIL,
  SUPPORT_EMAIL_HREF,
} from "@/lib/contact"

const STATEMENT =
  "We do the work to know — and to say — what others are still trying to figure out."

const FIRM_LINKS = [
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Case studies", href: "/case-studies" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
]

const CONTACT_LINKS = [
  { label: SUPPORT_EMAIL, href: SUPPORT_EMAIL_HREF },
  { label: PRIMARY_OFFICE.phone.display, href: PRIMARY_OFFICE.phone.href },
  { label: "LinkedIn", href: "#" },
  { label: "Chambers", href: "#" },
]

function Footer() {
  return (
    <footer className="dark bg-background pt-16 pb-10 text-foreground md:pt-24 md:pb-14">
      <div className="container">
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-[1.5fr_0.8fr_1.1fr_1fr] lg:gap-10">
          <div className="flex flex-col gap-5">
            <a href="/" className="flex w-fit items-center gap-2.5">
              <VerdictLogo className="size-8 text-accent" />
              <span className="text-xl font-semibold tracking-tight">
                Verdict
              </span>
            </a>
            <p className="max-w-xs text-sm leading-relaxed text-foreground/60">
              {STATEMENT}
            </p>
          </div>

          <FooterColumn label="Firm">
            <ul className="space-y-3 text-sm">
              {FIRM_LINKS.map((l) => (
                <li key={l.label}>
                  <FooterLink href={l.href}>{l.label}</FooterLink>
                </li>
              ))}
            </ul>
          </FooterColumn>

          <FooterColumn label="Offices">
            <ul className="space-y-5">
              {OFFICES.map((o) => (
                <li key={o.city}>
                  <p className="text-sm text-foreground/85">{o.city}</p>
                  <p className="mt-1 text-sm leading-relaxed text-foreground/45">
                    {o.address.line1}, {o.address.line2}
                  </p>
                </li>
              ))}
            </ul>
          </FooterColumn>

          <FooterColumn label="Contact">
            <ul className="space-y-3 text-sm">
              {CONTACT_LINKS.map((l) => (
                <li key={l.label}>
                  <FooterLink href={l.href}>{l.label}</FooterLink>
                </li>
              ))}
            </ul>
          </FooterColumn>
        </div>

        <Baseline />
      </div>
    </footer>
  )
}

function FooterColumn({
  label,
  children,
}: {
  label: string
  children: ReactNode
}) {
  return (
    <div>
      <p className="text-xs tracking-[0.2em] text-foreground/45 uppercase">
        {label}
      </p>
      <div className="mt-5">{children}</div>
    </div>
  )
}

function FooterLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <a
      href={href}
      className="group relative inline-flex w-fit text-foreground/65 transition-colors hover:text-foreground"
    >
      {children}
      <span
        aria-hidden
        className="absolute inset-x-0 -bottom-0.5 h-px origin-left scale-x-0 bg-accent transition-transform duration-500 ease-out group-hover:scale-x-100"
      />
    </a>
  )
}

function Baseline() {
  return (
    <div className="mt-16 flex flex-col gap-3 border-t border-foreground/12 pt-6 text-xs text-foreground/40 sm:flex-row sm:items-center sm:justify-between md:mt-20">
      <span>© Verdict LLP · Attorney advertising</span>
      <span className="flex items-center gap-2">
        <span
          aria-hidden
          className="size-1.5 animate-pulse rounded-full bg-accent"
        />
        Licensed in New York &amp; Washington D.C.
      </span>
    </div>
  )
}

export default Footer
