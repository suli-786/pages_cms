import { MoveUpRight } from "lucide-react"

import { resolveServiceIcon } from "@/components/sections/services-page/data"
import { Card } from "@/components/ui/card"
import type { ServiceFrontmatter } from "@/lib/types"
import { cn } from "@/lib/utils"

const TOP_CROP_SLUGS = new Set(["lawsuits-disputes", "restructuring-recovery"])

function MoreServices({ services }: { services: ServiceFrontmatter[] }) {
  if (services.length === 0) return null

  return (
    <section className="section-padding border-t">
      <div className="container">
        <div className="flex items-baseline justify-between gap-4">
          <h2 className="text-2xl leading-tight font-light tracking-tight md:text-3xl">
            Other practices.
          </h2>
          <a
            href="/services"
            className="group/all inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            View all
            <MoveUpRight className="size-3.5 transition-transform group-hover/all:translate-x-0.5 group-hover/all:-translate-y-0.5" />
          </a>
        </div>

        <ul className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 md:mt-14 md:gap-5 lg:grid-cols-4">
          {services.map((s) => {
            const Icon = resolveServiceIcon(s.icon)
            return (
              <li key={s.slug}>
                <Card asChild className="h-full">
                  <a href={`/services/${s.slug}`}>
                    <div className="relative aspect-[16/10] overflow-hidden rounded-lg">
                      <img
                        src={s.image}
                        alt=""
                        sizes="(min-width: 1024px) 22vw, 50vw"
                        className={cn(
                          "absolute inset-0 size-full object-cover transition duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] will-change-transform group-hover/card:scale-[1.04]",
                          TOP_CROP_SLUGS.has(s.slug) && "object-[50%_30%]"
                        )}
                      />
                    </div>
                    <div className="mt-5 flex flex-1 flex-col">
                      <div className="flex items-start justify-between gap-3">
                        <span className="grid size-9 place-items-center rounded-full bg-muted/60 text-foreground/85">
                          <Icon className="size-4" strokeWidth={1.5} />
                        </span>
                        <span className="font-mono text-xs text-muted-foreground tabular-nums">
                          {s.id}
                        </span>
                      </div>
                      <h3 className="mt-4 text-lg leading-tight font-light tracking-tight md:text-xl">
                        {s.name}.
                      </h3>
                      <p className="mt-2 text-sm leading-snug text-muted-foreground">
                        {s.tagline}
                      </p>
                    </div>
                  </a>
                </Card>
              </li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}

export default MoreServices
