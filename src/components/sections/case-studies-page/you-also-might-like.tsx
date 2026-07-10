import { MoveUpRight } from "lucide-react"

import type { CaseStudyFrontmatter } from "@/lib/types"

function YouAlsoMightLike({ next }: { next: CaseStudyFrontmatter | null }) {
  if (!next) return null

  return (
    <section className="section-padding">
      <div className="container">
        <h2 className="text-2xl leading-tight font-light tracking-tight md:text-3xl">
          You also might like.
        </h2>

        <a
          href={`/case-studies/${next.slug}`}
          className="group/card relative mt-10 block overflow-hidden rounded-xl md:mt-14"
        >
          <div className="relative aspect-[4/3] md:aspect-[21/9]">
            <img
              src={next.image}
              alt=""
              sizes="100vw"
              className="absolute inset-0 size-full object-cover transition-transform duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover/card:scale-[1.02]"
            />
            <div
              aria-hidden
              className="absolute inset-0 bg-linear-to-r from-black/85 via-black/55 to-transparent"
            />
          </div>

          <div className="absolute inset-y-0 left-0 flex w-full max-w-md flex-col justify-start p-7 text-white md:max-w-lg md:justify-between md:p-12 lg:max-w-xl">
            <span className="font-mono text-[0.625rem] tracking-[0.25em] text-white/75 uppercase md:text-xs">
              {next.sector}
            </span>

            <div className="mt-4 md:mt-0">
              <h3 className="text-xl leading-tight font-light tracking-tight md:text-2xl lg:text-3xl">
                {next.title}
              </h3>
              <p className="mt-4 hidden max-w-sm text-sm leading-relaxed text-white/80 md:block">
                {next.description}
              </p>
            </div>

            <div className="mt-auto inline-flex items-center gap-2 text-sm tracking-tight md:mt-0">
              <span className="border-b border-white/40 pb-0.5 transition-colors group-hover/card:border-white">
                Read full story
              </span>
              <MoveUpRight className="size-3.5 transition-transform group-hover/card:translate-x-0.5 group-hover/card:-translate-y-0.5" />
            </div>
          </div>
        </a>
      </div>
    </section>
  )
}

export default YouAlsoMightLike
