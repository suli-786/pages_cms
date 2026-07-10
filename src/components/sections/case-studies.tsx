import { MoveRight, TrendingUp } from "lucide-react"

import SectionHeader from "@/components/elements/section-header"
import FolioList from "@/components/sections/case-studies-page/folio-list"
import { Button } from "@/components/ui/button"
import type { CaseStudyFrontmatter } from "@/lib/types"

function CaseStudies({ cases }: { cases: CaseStudyFrontmatter[] }) {
  const featured = cases.slice(0, 4)

  return (
    <section className="section-padding overflow-x-clip">
      <div className="container">
        <SectionHeader
          badge="Featured Case Studies"
          heading={<>Real cases. Real results for our clients.</>}
          description="A look at recent work across our service areas. Some names are kept private to respect client confidentiality. These are the cases we were hired to win — and what the court decided."
          mark={
            <TrendingUp aria-hidden className="size-10 text-foreground/30" strokeWidth={1} />
          }
        />
      </div>

      <div className="container">
        <FolioList cases={featured} stacked />

        <div className="mt-10 flex justify-center md:mt-14">
          <Button size="lg" variant="secondary" asChild>
            <a href="/case-studies">
              See all case studies
              <MoveRight className="size-5" strokeWidth={1.25} />
            </a>
          </Button>
        </div>
      </div>
    </section>
  )
}

export default CaseStudies
