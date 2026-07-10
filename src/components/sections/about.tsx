import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import type { VisionContent } from "@/lib/home"

function About({ content }: { content: VisionContent }) {
  const { badge, heading, lead, learnMore, card, paragraphs } = content

  return (
    <section id="vision" className="section-padding scroll-mt-24">
      <div className="container space-y-12 md:space-y-16">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-[1fr_2.6fr] md:gap-16">
          <div>
            <Badge variant="outline" size="lg">
              <span className="size-1 rounded-full bg-foreground/40" />
              {badge}
              <span className="size-1 rounded-full bg-foreground/40" />
            </Badge>
          </div>

          <div>
            <h2 className="text-4xl leading-[1.1] font-medium tracking-tight md:text-5xl lg:text-6xl">
              {heading}
            </h2>
            <p className="mt-8 max-w-3xl text-base text-muted-foreground">
              {lead}
            </p>
            <a
              href={learnMore.href}
              className="mt-10 inline-flex items-center gap-1.5 text-sm underline underline-offset-4 transition-colors hover:text-muted-foreground"
            >
              {learnMore.label}
            </a>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-10 md:grid-cols-[1fr_2.6fr] md:gap-16">
          <div className="dark relative flex flex-col overflow-hidden rounded-xl bg-card text-foreground">
            <div
              aria-hidden
              className="relative aspect-[4/3] bg-cover bg-center"
              style={{ backgroundImage: `url(${card.image})` }}
            >
              <div className="absolute inset-0 bg-linear-to-t from-card via-card/40 to-transparent" />
            </div>

            <div className="space-y-6 p-6">
              <div>
                <p className="text-lg font-medium">{card.title}</p>
                <p className="mt-1 text-sm text-muted-foreground">
                  {card.subtitle}
                </p>
              </div>
              <Button asChild size="lg" className="w-full">
                <a href={card.cta.href}>{card.cta.label}</a>
              </Button>
            </div>
          </div>

          <div className="flex min-w-0 flex-col justify-center gap-6">
            {paragraphs.map((paragraph) => (
              <p
                key={paragraph}
                className="max-w-2xl text-lg leading-relaxed text-muted-foreground"
              >
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default About
