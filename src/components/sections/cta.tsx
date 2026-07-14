import { MoveUpRight } from "lucide-react"

import Eyebrow from "@/components/elements/eyebrow"
import { Button } from "@/components/ui/button"
import type { FinalCtaContent } from "@/lib/home"

function Cta({ content }: { content: FinalCtaContent }) {
  const { eyebrow, heading, body, cta, image } = content

  const hasImage = Boolean(image.src)

  return (
    <section className="section-padding bg-muted">
      <div className="container">
        <div
          className={
            hasImage
              ? "grid gap-10 overflow-hidden rounded-lg border border-foreground/10 bg-background shadow-md md:grid-cols-[1.2fr_1fr]"
              : "grid gap-10 overflow-hidden rounded-lg border border-foreground/10 bg-background shadow-md"
          }
        >
          <div className="flex flex-col justify-between p-8 md:p-14">
            <Eyebrow>{eyebrow}</Eyebrow>

            <div className="mt-10 md:mt-14">
              <h2 className="text-4xl leading-[1.05] font-light tracking-tight md:text-5xl lg:text-6xl">
                {heading}
              </h2>
              <p className="mt-8 max-w-md text-base leading-relaxed text-muted-foreground md:text-lg">
                {body}
              </p>
            </div>

            {cta.label && cta.href && (
              <div className="mt-12 md:mt-16">
                <Button size="lg" asChild>
                  <a href={cta.href}>
                    {cta.label}
                    <MoveUpRight className="size-4" strokeWidth={1.5} />
                  </a>
                </Button>
              </div>
            )}
          </div>

          {hasImage && (
            <div className="relative min-h-72 md:min-h-[32rem]">
              <img
                src={image.src}
                alt={image.alt}
                sizes="(min-width: 768px) 45vw, 100vw"
                className="absolute inset-0 size-full object-cover"
              />
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

export default Cta
