"use client"

import { useState } from "react"
import { MoveUpRight, Plus } from "lucide-react"

import SectionHeader from "@/components/elements/section-header"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { cn } from "@/lib/utils"

const services = [
  {
    roman: "I",
    slug: "business-law",
    title: "Business Law",
    summary:
      "Contracts, deals, partnerships, and everyday legal help to keep your business running smoothly.",
    image: "/images/services/i-corporate.webp",
  },
  {
    roman: "II",
    slug: "lawsuits-disputes",
    title: "Lawsuits & Disputes",
    summary:
      "Strong defense for business disputes, regulator cases, and group lawsuits — from the first filing to the final ruling.",
    image: "/images/services/ii-litigation.webp",
  },
  {
    roman: "III",
    slug: "compliance-rules",
    title: "Compliance & Rules",
    summary:
      "Clear plans, regulator support, and steady guidance to keep your business on the right side of the law.",
    image: "/images/services/iii-compliance.webp",
  },
  {
    roman: "IV",
    slug: "intellectual-property",
    title: "Intellectual Property",
    summary:
      "Patents, trade secrets, brand protection, and licensing for the ideas that make your business valuable.",
    image: "/images/services/iv-ip.webp",
  },
  {
    roman: "V",
    slug: "restructuring-recovery",
    title: "Restructuring & Recovery",
    summary:
      "Bankruptcy support, out-of-court deals, and creditor protection for businesses going through hard times.",
    image: "/images/services/v-restructuring.webp",
  },
]

const EASE_LAYOUT = "cubic-bezier(0, 0, 0.2, 1)"

function Services() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [hoverIndex, setHoverIndex] = useState<number | null>(null)

  const shownIndex = hoverIndex ?? activeIndex
  const gridTemplate = services
    .map((_, i) => (i === shownIndex ? "3fr" : "1fr"))
    .join(" ")

  return (
    <section id="practice-areas" className="section-padding">
      <div className="container">
        <SectionHeader
          badge="Our Services"
          heading={
            <>
              Trusted{" "}
              <span className="relative isolate inline-block">
                <span
                  aria-hidden
                  className="absolute inset-x-0 bottom-[0.05em] -z-10 h-[0.4em] bg-foreground/15"
                />
                legal services
              </span>{" "}
              across five key areas
            </>
          }
          description={
            <>
              Every business hits moments where good legal advice really
              matters. Our five service areas are each led by senior lawyers
              &mdash; ready to protect what&apos;s yours and help you plan
              what&apos;s next.
            </>
          }
          mark={
            <Plus
              aria-hidden
              className="size-10 text-foreground/30"
              strokeWidth={1}
            />
          }
        />

        <div className="dark mt-12 hidden overflow-hidden rounded-xl bg-background text-foreground md:mt-16 md:block lg:mt-20">
          <ul
            role="tablist"
            aria-label="Practice areas"
            className="relative grid h-[28rem] gap-[3px] motion-safe:transition-[grid-template-columns] motion-safe:duration-500 md:h-[36rem]"
            style={{
              gridTemplateColumns: gridTemplate,
              transitionTimingFunction: EASE_LAYOUT,
            }}
            onMouseLeave={() => setHoverIndex(null)}
          >
            {services.map((s, i) => {
              const isActive = i === activeIndex
              const isShown = i === shownIndex
              return (
                <li
                  key={s.roman}
                  className="relative h-full min-w-0 overflow-hidden"
                >
                  <button
                    type="button"
                    role="tab"
                    aria-selected={isActive}
                    aria-label={`Volume ${s.roman}: ${s.title}`}
                    onClick={() => setActiveIndex(i)}
                    onMouseEnter={() => setHoverIndex(i)}
                    onFocus={() => setHoverIndex(i)}
                    onBlur={() => setHoverIndex(null)}
                    className="relative block size-full text-left focus-visible:ring-2 focus-visible:ring-foreground/40 focus-visible:outline-none focus-visible:ring-inset"
                  >
                    <span
                      aria-hidden
                      className={cn(
                        "absolute inset-0 z-10 bg-linear-to-b from-card via-card to-background transition-opacity duration-300 ease-out",
                        isShown
                          ? "pointer-events-none opacity-0"
                          : "opacity-100"
                      )}
                    >
                      <span
                        aria-hidden
                        className="absolute inset-y-0 left-0 w-px bg-foreground/15"
                      />
                      <span
                        aria-hidden
                        className="absolute inset-y-0 right-0 w-px bg-background/40"
                      />
                      <span
                        aria-hidden
                        className="absolute inset-x-2 top-10 h-px bg-foreground/15"
                      />
                      <span
                        aria-hidden
                        className="absolute inset-x-2 top-12 h-px bg-foreground/15"
                      />
                      <span
                        aria-hidden
                        className="absolute inset-x-2 bottom-10 h-px bg-foreground/15"
                      />
                      <span
                        aria-hidden
                        className="absolute inset-x-2 bottom-12 h-px bg-foreground/15"
                      />

                      <span className="absolute top-16 left-1/2 -translate-x-1/2 text-xl font-light tracking-widest text-foreground/70 md:text-2xl">
                        {s.roman}
                      </span>

                      <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rotate-180 text-sm font-light tracking-[0.25em] whitespace-nowrap text-foreground/90 uppercase [writing-mode:vertical-rl] md:text-base">
                        {s.title}
                      </span>

                      <span className="absolute bottom-16 left-1/2 -translate-x-1/2 font-mono text-[0.625rem] tracking-widest text-foreground/40">
                        VERDICT &middot; {String(i + 1).padStart(2, "0")}
                      </span>
                    </span>

                    <span aria-hidden={!isShown} className="absolute inset-0">
                      <img
                        src={s.image}
                        alt=""
                        sizes="(min-width: 768px) 60vw, 100vw"
                        className="absolute inset-0 size-full object-cover"
                      />
                      <span
                        aria-hidden
                        className="absolute inset-0 [mask-image:linear-gradient(to_top,black,transparent_85%)] backdrop-blur-md"
                      />
                      <span
                        aria-hidden
                        className="absolute inset-0 bg-linear-to-t from-background/85 via-background/40 to-transparent"
                      />
                      <span className="absolute inset-x-0 bottom-0 overflow-hidden">
                        <span
                          className={cn(
                            "block space-y-2 p-5 transition-transform duration-500 ease-out",
                            isShown
                              ? "translate-y-0"
                              : "motion-safe:translate-y-full"
                          )}
                        >
                          <span
                            className={cn(
                              "block font-mono text-[0.625rem] tracking-widest text-foreground/60 uppercase transition-[opacity,transform] duration-500 ease-out",
                              isShown
                                ? "translate-y-0 opacity-100 delay-100"
                                : "opacity-0 motion-safe:translate-y-6"
                            )}
                          >
                            {isActive ? "Selected" : "Volume"} {s.roman}
                          </span>
                          <span
                            className={cn(
                              "block text-xl leading-tight font-medium tracking-tight transition-[opacity,transform] duration-500 ease-out md:text-2xl",
                              isShown
                                ? "translate-y-0 opacity-100"
                                : "opacity-0 motion-safe:translate-y-8"
                            )}
                          >
                            {s.title}
                          </span>
                          <span
                            className={cn(
                              "block max-w-md text-xs leading-snug text-foreground/75 transition-[opacity,transform] duration-500 ease-out md:text-sm",
                              isShown
                                ? "translate-y-0 opacity-100 delay-200"
                                : "opacity-0 motion-safe:translate-y-8"
                            )}
                          >
                            {s.summary}
                          </span>
                        </span>
                      </span>
                    </span>
                  </button>

                  {isShown && (
                    <a
                      href={`/services/${s.slug}`}
                      aria-label={`Read more about ${s.title}`}
                      className="group/cta absolute top-5 right-5 z-10 grid size-10 place-items-center rounded-full bg-foreground/10 text-foreground backdrop-blur-sm transition-colors hover:bg-foreground/20 focus-visible:ring-2 focus-visible:ring-foreground/40 focus-visible:outline-none"
                    >
                      <MoveUpRight
                        className="size-4 transition-transform group-hover/cta:translate-x-0.5 group-hover/cta:-translate-y-0.5"
                        strokeWidth={1.5}
                      />
                    </a>
                  )}
                </li>
              )
            })}
          </ul>

          <div
            aria-hidden
            className="relative mt-1 h-2 bg-linear-to-b from-foreground/30 via-foreground/10 to-transparent"
          />
        </div>

        <div className="dark mt-12 overflow-hidden rounded-xl bg-background text-foreground md:hidden">
          <ServicesAccordion
            activeIndex={activeIndex}
            onSelect={setActiveIndex}
          />
        </div>

        <p className="mt-12 hidden max-w-md font-mono text-[0.625rem] tracking-widest text-muted-foreground uppercase md:block">
          &mdash; Hover to preview. Click to select.
        </p>
        <p className="mt-8 max-w-md font-mono text-[0.625rem] tracking-widest text-muted-foreground uppercase md:hidden">
          &mdash; Tap to select.
        </p>
      </div>
    </section>
  )
}

type MobileProps = {
  activeIndex: number
  onSelect: (i: number) => void
}

function ServicesAccordion({ activeIndex, onSelect }: MobileProps) {
  const activeValue = services[activeIndex]?.roman ?? services[0].roman
  return (
    <Accordion
      type="single"
      value={activeValue}
      onValueChange={(v) => {
        if (!v) return
        const i = services.findIndex((s) => s.roman === v)
        if (i >= 0) onSelect(i)
      }}
      className="rounded-none border-0"
    >
      {services.map((s) => (
        <AccordionItem
          key={s.roman}
          value={s.roman}
          className="border-foreground/10"
        >
          <AccordionTrigger className="items-center gap-4 px-5 py-5 text-base font-medium tracking-tight hover:no-underline">
            <span className="inline-block min-w-[1.75rem] shrink-0 font-mono text-xs tracking-widest text-foreground/55 group-aria-expanded/accordion-trigger:text-foreground">
              {s.roman}
            </span>
            <span className="flex-1 text-left text-foreground/80 group-aria-expanded/accordion-trigger:text-foreground">
              {s.title}
            </span>
          </AccordionTrigger>
          <AccordionContent className="px-0 pb-0">
            <div className="relative aspect-[16/10] w-full">
              <img
                src={s.image}
                alt=""
                sizes="100vw"
                className="absolute inset-0 size-full object-cover"
              />
              <a
                href={`/services/${s.slug}`}
                aria-label={`Read more about ${s.title}`}
                className="group/cta absolute top-4 right-4 z-10 grid size-10 place-items-center rounded-full bg-foreground/10 text-foreground backdrop-blur-sm transition-colors hover:bg-foreground/20 focus-visible:ring-2 focus-visible:ring-foreground/40 focus-visible:outline-none"
              >
                <MoveUpRight
                  className="size-4 transition-transform group-hover/cta:translate-x-0.5 group-hover/cta:-translate-y-0.5"
                  strokeWidth={1.5}
                />
              </a>
            </div>
            <div className="space-y-3 p-5">
              <span className="block font-mono text-[0.625rem] tracking-widest text-foreground/55 uppercase">
                Selected &middot; Volume {s.roman}
              </span>
              <p className="text-sm leading-relaxed text-foreground/80">
                {s.summary}
              </p>
            </div>
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  )
}

export default Services
