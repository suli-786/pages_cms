import { type ReactNode } from "react"
import { MoveUpRight } from "lucide-react"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import type { BlogFrontmatter, ServiceFrontmatter } from "@/lib/types"
import { formatDate, initialsOf } from "@/lib/utils"

function BlogArticleHero({
  frontmatter,
  services,
  children,
}: {
  frontmatter: BlogFrontmatter
  services: ServiceFrontmatter[]
  children?: ReactNode
}) {
  return (
    <article className="hero-padding">
      <div className="container">
        <Breadcrumb className="overflow-hidden">
          <BreadcrumbList className="flex-nowrap">
            <BreadcrumbItem className="shrink-0">
              <BreadcrumbLink asChild>
                <a href="/blog">Blog</a>
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
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-muted-foreground">
            <span>{frontmatter.category}</span>
            <span aria-hidden className="block h-3 w-px bg-foreground/20" />
            <time dateTime={frontmatter.date}>
              {formatDate(frontmatter.date)}
            </time>
            {frontmatter.readTime && (
              <>
                <span aria-hidden className="block h-3 w-px bg-foreground/20" />
                <span>{frontmatter.readTime}</span>
              </>
            )}
          </div>

          <h1 className="mt-6 text-3xl leading-[1.05] font-light tracking-tight md:text-5xl lg:text-[3.5rem]">
            {frontmatter.title}
          </h1>

          <p className="mt-6 text-base text-muted-foreground md:text-lg">
            {frontmatter.excerpt}
          </p>

          <div className="mt-8 flex items-center gap-3">
            <Avatar size="lg">
              {frontmatter.author.avatar && (
                <AvatarImage src={frontmatter.author.avatar} alt="" />
              )}
              <AvatarFallback>
                {initialsOf(frontmatter.author.name)}
              </AvatarFallback>
            </Avatar>
            <div className="leading-tight">
              <div className="text-base font-light text-foreground">
                {frontmatter.author.name}
              </div>
              <div className="mt-1 text-sm text-muted-foreground">
                {frontmatter.author.role}
              </div>
            </div>
          </div>
        </header>

        <div className="mt-10 grid grid-cols-1 items-start gap-8 md:mt-14 lg:grid-cols-[1fr_22rem] lg:gap-10">
          <div className="min-w-0">
            <figure className="relative aspect-[16/9] overflow-hidden rounded-xl">
              <img
                src={frontmatter.image}
                alt=""
                sizes="(min-width: 1024px) 60rem, 100vw"
                className="absolute inset-0 size-full object-cover"
              />
            </figure>

            {children && (
              <div className="mt-12 max-w-2xl md:mt-16">{children}</div>
            )}
          </div>

          <aside className="lg:sticky lg:top-24">
            <ServicesAside services={services} />
          </aside>
        </div>
      </div>
    </article>
  )
}

function ServicesAside({ services }: { services: ServiceFrontmatter[] }) {
  if (services.length === 0) return null

  return (
    <div className="rounded-xl bg-muted/50 p-6 md:p-7">
      <div className="font-mono text-xs tracking-wider text-muted-foreground uppercase">
        Practices
      </div>
      <h2 className="mt-3 text-xl leading-tight font-light tracking-tight md:text-2xl">
        How we work.
      </h2>

      <ul className="-mx-2 mt-5 flex flex-col">
        {services.map((s) => (
          <li key={s.slug}>
            <a
              href={`/services/${s.slug}`}
              className="group/svc flex items-start justify-between gap-4 rounded-md px-2 py-3 transition-colors hover:bg-foreground/5"
            >
              <div className="min-w-0">
                <div className="flex items-baseline gap-2">
                  <span className="font-mono text-xs text-muted-foreground tabular-nums">
                    {s.id}
                  </span>
                  <span className="text-base leading-tight font-light text-foreground">
                    {s.name}.
                  </span>
                </div>
                <p className="mt-1.5 line-clamp-2 text-xs leading-relaxed text-muted-foreground">
                  {s.tagline}
                </p>
              </div>
              <MoveUpRight className="mt-1 size-3.5 shrink-0 text-muted-foreground transition-transform group-hover/svc:translate-x-0.5 group-hover/svc:-translate-y-0.5" />
            </a>
          </li>
        ))}
      </ul>

      <a
        href="/services"
        className="group/all mt-5 inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
      >
        View all practices
        <MoveUpRight className="size-3.5 transition-transform group-hover/all:translate-x-0.5 group-hover/all:-translate-y-0.5" />
      </a>
    </div>
  )
}

export default BlogArticleHero
