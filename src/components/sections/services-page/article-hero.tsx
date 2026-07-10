import { createElement, type ReactNode } from "react"
import { MoveUpRight } from "lucide-react"

import { resolveServiceIcon } from "@/components/sections/services-page/data"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Button } from "@/components/ui/button"
import type { ServiceFrontmatter } from "@/lib/types"
import { cn } from "@/lib/utils"

const TOP_CROP_SLUGS = new Set(["lawsuits-disputes", "restructuring-recovery"])

function ServiceArticleHero({
  frontmatter,
  children,
}: {
  frontmatter: ServiceFrontmatter
  children?: ReactNode
}) {
  return (
    <article className="hero-padding">
      <div className="container">
        <Breadcrumb className="overflow-hidden">
          <BreadcrumbList className="flex-nowrap">
            <BreadcrumbItem className="shrink-0">
              <BreadcrumbLink asChild>
                <a href="/services">Services</a>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator className="shrink-0" />
            <BreadcrumbItem className="min-w-0 flex-1">
              <BreadcrumbPage className="block truncate">
                {frontmatter.name}
              </BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <header className="mt-10 max-w-4xl md:mt-14">
          <div className="flex items-center gap-3 font-mono text-xs text-muted-foreground tabular-nums">
            <span className="grid size-9 place-items-center rounded-full bg-muted/60 text-foreground/85">
              {createElement(resolveServiceIcon(frontmatter.icon), {
                className: "size-4",
                strokeWidth: 1.5,
              })}
            </span>
            Practice {frontmatter.id}
          </div>
          <h1 className="mt-6 text-3xl leading-[1.05] font-light tracking-tight md:text-5xl lg:text-[3.5rem]">
            {frontmatter.name}.
          </h1>
          <p className="mt-6 max-w-2xl text-base text-muted-foreground md:text-lg">
            {frontmatter.tagline}
          </p>
        </header>

        <div className="mt-10 grid grid-cols-1 items-start gap-4 lg:grid-cols-[1fr_22rem] lg:gap-6">
          <div className="min-w-0">
            <figure className="relative aspect-[16/9] overflow-hidden rounded-xl">
              <img
                src={frontmatter.image}
                alt=""
                sizes="(min-width: 1024px) 70rem, 100vw"
                className={cn(
                  "absolute inset-0 size-full object-cover",
                  TOP_CROP_SLUGS.has(frontmatter.slug) && "object-[50%_30%]"
                )}
              />
            </figure>

            {children && (
              <div className="mt-14 max-w-2xl md:mt-20">{children}</div>
            )}
          </div>

          <aside>
            <SidebarCard frontmatter={frontmatter} />
          </aside>
        </div>
      </div>
    </article>
  )
}

function SidebarCard({ frontmatter }: { frontmatter: ServiceFrontmatter }) {
  return (
    <div className="flex flex-col gap-7 rounded-xl bg-muted/60 p-7 md:p-8">
      <div>
        <div className="text-xs text-muted-foreground">What we cover</div>
        <ul className="mt-4 space-y-2 text-base text-foreground">
          {frontmatter.subAreas.map((sub) => (
            <li
              key={sub}
              className="flex items-baseline gap-2.5 before:block before:size-1 before:rounded-full before:bg-accent"
            >
              {sub}
            </li>
          ))}
        </ul>
      </div>

      <div className="border-t pt-5">
        <div className="text-xs text-muted-foreground">Lead partner</div>
        <div className="mt-2 text-base font-light text-foreground">
          {frontmatter.partner.name}
        </div>
        <div className="mt-1 text-sm text-muted-foreground">
          {frontmatter.partner.role}
        </div>
      </div>

      <div className="border-t pt-5">
        <div className="text-xs text-muted-foreground">Representative case</div>
        <div className="mt-3 text-sm leading-snug font-light text-foreground">
          {frontmatter.representativeCase.title}
        </div>
        <div className="mt-5 flex flex-wrap items-baseline justify-between gap-3 border-t pt-4">
          <div>
            <div className="text-2xl leading-none font-light">
              {frontmatter.representativeCase.metric}
            </div>
            <div className="mt-1.5 text-[0.625rem] tracking-widest text-muted-foreground uppercase">
              {frontmatter.representativeCase.metricLabel}
            </div>
          </div>
          <Button asChild variant="ghost" size="sm">
            <a href={`/case-studies/${frontmatter.representativeCase.slug}`}>
              Open
              <MoveUpRight />
            </a>
          </Button>
        </div>
      </div>

      <Button asChild className="mt-2">
        <a href="/contact">
          Brief our team
          <MoveUpRight />
        </a>
      </Button>
    </div>
  )
}

export default ServiceArticleHero
