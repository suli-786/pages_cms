// Why Attend — adapted from @shadcnblocks/feature124 (pro).
// Content (heading, benefits, image, cta) comes from src/content/home.json via
// the `content` prop; layout, spacing and the cross-pattern mask are the
// template's. No state/hooks → renders as static HTML.

import { Check, ChevronRight } from "lucide-react"

import { Button } from "@/components/ui/button"
import type { WhyAttendContent } from "@/lib/home"

const PATTERN =
  "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/patterns/cross-pattern.svg"

function WhyAttend({ content }: { content: WhyAttendContent }) {
  const { heading, benefits = [], image, cta } = content

  return (
    <section className="section-padding overflow-hidden">
      <div className="container">
        <div className="flex flex-col items-start gap-16 md:flex-row md:items-center md:gap-20">
          <div className="w-full md:w-[45%]">
            <h2 className="mb-8 text-3xl leading-[1.1] font-medium tracking-tight md:text-4xl lg:text-5xl">
              {heading}
            </h2>
            <ul className="mb-8 flex flex-col gap-3 text-base text-muted-foreground">
              {benefits.map((benefit) => (
                <li className="flex items-start gap-3" key={benefit}>
                  <Check className="mt-0.5 size-5 shrink-0 text-accent" />
                  <span>{benefit}</span>
                </li>
              ))}
            </ul>
            <Button variant="outline" asChild>
              <a href={cta.href}>
                {cta.label}
                <ChevronRight className="ml-2 size-4" />
              </a>
            </Button>
          </div>

          <div className="relative flex h-[430px] w-full items-center md:w-[55%]">
            <div className="pointer-events-none absolute -top-12 -right-12 bottom-0 left-0 [mask-image:radial-gradient(ellipse_at_60%_60%,black_30%,transparent_70%)]">
              <div
                aria-hidden
                className="absolute inset-0 bg-primary/20 [mask-repeat:repeat] [mask-size:32px_32px]"
                style={{ maskImage: `url('${PATTERN}')`, WebkitMaskImage: `url('${PATTERN}')` }}
              />
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,var(--tw-gradient-stops))] from-transparent to-background opacity-30" />
            </div>
            <div className="relative z-10 ml-auto w-[80%]">
              <img
                src={image.src}
                alt={image.alt}
                className="aspect-video max-h-[350px] w-full rounded-lg border object-cover object-top-left shadow-[0_8px_16px_-6px_rgba(0,0,0,0.1)]"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default WhyAttend
