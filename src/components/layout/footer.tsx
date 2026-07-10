import { type ReactNode } from "react"

import { SiteLogo } from "@/components/layout/logo"

const STATEMENT =
  "A growing community nurturing collaboration, innovation and skills among Muslim technologists — for the benefit of the Ummah and humanity."

const EXPLORE_LINKS = [
  { label: "Home", href: "/" },
  { label: "Events", href: "/events" },
  { label: "Partner With Us", href: "/partner" },
  { label: "About", href: "/about" },
]

// TODO: replace with the real community contact details.
const CONNECT_LINKS = [
  { label: "Join the mailing list", href: "/#newsletter" },
  { label: "hello@ummahtech.org", href: "mailto:hello@ummahtech.org" },
  { label: "LinkedIn", href: "#" },
]

function Footer() {
  return (
    <footer className="dark bg-background pt-16 pb-10 text-foreground md:pt-24 md:pb-14">
      <div className="container">
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-[1.6fr_1fr_1fr] lg:gap-10">
          <div className="flex flex-col gap-5">
            <a href="/" className="flex w-fit items-center gap-2.5">
              <SiteLogo className="size-8 text-accent" />
              <span className="text-xl font-semibold tracking-tight">
                Ummah Tech
              </span>
            </a>
            <p className="max-w-xs text-sm leading-relaxed text-foreground/60">
              {STATEMENT}
            </p>
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
              {CONNECT_LINKS.map((l) => (
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
      <span>© 2026 Ummah Tech</span>
      <span className="flex items-center gap-2">
        <span
          aria-hidden
          className="size-1.5 animate-pulse rounded-full bg-accent"
        />
        Johannesburg &amp; Cape Town, South Africa
      </span>
    </div>
  )
}

export default Footer
