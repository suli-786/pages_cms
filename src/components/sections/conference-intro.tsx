// Conference intro — adapted from @shadcnblocks/feature125 (pro).
// Content (heading, body, facts, image, cta) comes from src/content/home.json
// via the `content` prop; layout, spacing and the cross-pattern mask are the
// template's. No state/hooks → renders as static HTML (no client directive).

import { Check, ChevronRight } from "lucide-react"

import { Button } from "@/components/ui/button"
import type { ConferenceContent } from "@/lib/home"

const PATTERN =
  "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/patterns/cross-pattern.svg"

function ConferenceIntro({ content }: { content: ConferenceContent }) {
  const { heading, body, facts = [], image, cta } = content

  return (
    <section id="event" className="section-padding scroll-mt-24 overflow-hidden">
      <div className="container flex flex-col items-start gap-16 md:flex-row md:items-center md:gap-20">
        {/* Media — left */}
        <div className="relative order-last flex h-[430px] w-full pt-4 pl-4 md:order-first md:w-[55%]">
          <div
            aria-hidden
            className="absolute inset-0 bg-primary/10 [mask-repeat:repeat] [mask-size:32px_32px]"
            style={{ maskImage: `url('${PATTERN}')`, WebkitMaskImage: `url('${PATTERN}')` }}
          />
          <div className="absolute inset-0 z-1 bg-[radial-gradient(ellipse_at_center,var(--tw-gradient-stops))] from-transparent to-background opacity-70" />
          <div className="relative mt-auto ml-auto w-[80%]">
            <img
              src={image.src}
              alt={image.alt}
              className="aspect-video w-full rounded-lg border object-cover object-top-left"
            />
          </div>
          <div className="absolute inset-0 z-50 bg-linear-to-l from-background via-transparent via-15%" />
          <div className="absolute inset-0 z-50 bg-linear-to-t from-background via-transparent via-15%" />
        </div>

        {/* Copy — right */}
        <div className="w-full md:w-[45%]">
          <h2 className="text-3xl leading-[1.1] font-medium tracking-tight md:text-4xl lg:text-5xl">
            {heading}
          </h2>
          <p className="mt-6 max-w-xl text-base text-muted-foreground">{body}</p>
          <ul className="mt-8 flex flex-col gap-2 text-muted-foreground">
            {facts.map((fact) => (
              <li className="flex items-start gap-2" key={fact}>
                <Check className="mt-0.5 size-5 shrink-0 text-accent" />
                <span>{fact}</span>
              </li>
            ))}
          </ul>
          <Button variant="outline" className="mt-8" asChild>
            <a href={cta.href}>
              {cta.label}
              <ChevronRight className="ml-2 size-4" />
            </a>
          </Button>
        </div>
      </div>
    </section>
  )
}

export default ConferenceIntro
