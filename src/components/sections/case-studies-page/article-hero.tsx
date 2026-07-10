import { type ReactNode } from "react"
import { MoveUpRight } from "lucide-react"

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Button } from "@/components/ui/button"
import type { CaseStudyFrontmatter } from "@/lib/types"
import { formatDate } from "@/lib/utils"

function CaseStudyArticleHero({
  frontmatter,
  children,
}: {
  frontmatter: CaseStudyFrontmatter
  children?: ReactNode
}) {
  return (
    <article className="hero-padding">
      <div className="container">
        <Breadcrumb className="overflow-hidden">
          <BreadcrumbList className="flex-nowrap">
            <BreadcrumbItem className="shrink-0">
              <BreadcrumbLink asChild>
                <a href="/case-studies">Case Studies</a>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator className="shrink-0" />
            <BreadcrumbItem className="min-w-0 flex-1">
              <BreadcrumbPage className="block truncate">
                {frontmatter.title}
              </BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <header className="mt-10 max-w-4xl md:mt-14">
          <h1 className="text-3xl leading-[1.05] font-light tracking-tight md:text-5xl lg:text-[3.5rem]">
            {frontmatter.title}
          </h1>
          <div className="mt-6 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-muted-foreground">
            <time dateTime={frontmatter.date}>
              {formatDate(frontmatter.date)}
            </time>
            <span aria-hidden className="block h-3 w-px bg-foreground/20" />
            <span>{frontmatter.practice}</span>
          </div>
        </header>

        <div className="mt-10 grid grid-cols-1 items-start gap-4 lg:grid-cols-[1fr_22rem] lg:gap-6">
          <div className="min-w-0">
            <figure className="relative aspect-[16/9] overflow-hidden rounded-xl">
              <img
                src={frontmatter.image}
                alt=""
                sizes="(min-width: 1024px) 70rem, 100vw"
                className="absolute inset-0 size-full object-cover"
              />
            </figure>

            {children && (
              <div className="mt-14 max-w-2xl md:mt-20">{children}</div>
            )}
          </div>

          <aside>
            <CtaCard />
          </aside>
        </div>
      </div>
    </article>
  )
}

function CtaCard() {
  return (
    <div className="flex flex-col rounded-xl bg-muted/60 p-7 md:p-8">
      <h2 className="text-xl leading-tight font-light tracking-tight md:text-2xl">
        Need counsel on a matter like this?
      </h2>
      <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
        A senior partner takes the first call. Conflicts cleared within the
        hour, a strategy memo on your desk inside seventy-two.
      </p>
      <Button asChild className="mt-6 w-fit">
        <a href="/contact">
          Get in touch
          <MoveUpRight />
        </a>
      </Button>
    </div>
  )
}

export default CaseStudyArticleHero
