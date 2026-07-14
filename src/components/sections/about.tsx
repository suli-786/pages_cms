"use client"

import { Fragment } from "react"

import { Badge } from "@/components/ui/badge"
import { LinkPreview } from "@/components/ui/link-preview"
import type { VisionContent } from "@/lib/home"

// Vision — adapted from @shadcnblocks/feature288: one large centered statement
// in muted type where key phrases stand out in full contrast and reveal a
// photo preview on hover. Phrases and their images come from the CMS
// `highlights` list and are matched inside the statement text; a phrase that
// no longer appears in the statement simply renders as plain text.
//
// Parsing order matters: *emphasis* markers are resolved first, then highlight
// phrases are matched inside each resulting run — so a phrase that is itself
// emphasised ("*inspire innovation*") nests cleanly instead of leaving stray
// asterisks. Phrases spanning an emphasis boundary don't match (by design).
type Highlight = VisionContent["highlights"][number]

type Segment = { text: string; highlight?: Highlight }

const escapeRegExp = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")

function segmentText(text: string, highlights: Highlight[]): Segment[] {
  let segments: Segment[] = [{ text }]
  for (const h of highlights) {
    if (!h.phrase) continue
    // Case-insensitive match on the original string (regex index/length refer
    // to the source text, so locale case-mapping can't shift the boundaries).
    const pattern = new RegExp(escapeRegExp(h.phrase), "i")
    segments = segments.flatMap((seg) => {
      if (seg.highlight) return [seg]
      const m = pattern.exec(seg.text)
      if (!m) return [seg]
      return [
        { text: seg.text.slice(0, m.index) },
        { text: m[0], highlight: h },
        { text: seg.text.slice(m.index + m[0].length) },
      ].filter((s) => s.text !== "")
    })
  }
  return segments
}

function renderSegments(text: string, highlights: Highlight[], keyPrefix: string) {
  return segmentText(text, highlights).map((seg, i) =>
    seg.highlight ? (
      seg.highlight.image ? (
        <LinkPreview
          key={`${keyPrefix}-${i}`}
          imageSrc={seg.highlight.image}
          href={seg.highlight.href || undefined}
          className="px-1"
        >
          {seg.text}
        </LinkPreview>
      ) : (
        <span key={`${keyPrefix}-${i}`} className="text-foreground">
          {seg.text}
        </span>
      )
    ) : (
      <Fragment key={`${keyPrefix}-${i}`}>{seg.text}</Fragment>
    )
  )
}

/** `*text*` emphasis first, then highlight phrases within each run. */
function renderParagraph(paragraph: string, highlights: Highlight[], pIndex: number) {
  return paragraph.split(/\*([^*]+)\*/g).map((part, i) =>
    i % 2 === 1 ? (
      <em key={`${pIndex}-${i}`} className="text-foreground italic">
        {renderSegments(part, highlights, `${pIndex}-${i}`)}
      </em>
    ) : (
      <Fragment key={`${pIndex}-${i}`}>
        {renderSegments(part, highlights, `${pIndex}-${i}`)}
      </Fragment>
    )
  )
}

function About({ content }: { content: VisionContent }) {
  const { badge, heading, statement, highlights = [] } = content

  const paragraphs = statement
    .split(/\n\s*\n/)
    .map((p) => p.trim())
    .filter(Boolean)

  return (
    <section id="vision" className="section-padding scroll-mt-24 overflow-hidden">
      <div className="container flex max-w-5xl flex-col items-center text-center">
        {badge && (
          <Badge variant="outline" size="lg">
            <span className="size-1 rounded-full bg-foreground/40" />
            {badge}
            <span className="size-1 rounded-full bg-foreground/40" />
          </Badge>
        )}
        {heading && (
          <h2 className="mt-6 text-sm tracking-[0.2em] text-muted-foreground uppercase">
            {heading}
          </h2>
        )}

        <div className="mt-10 space-y-10 md:mt-14">
          {paragraphs.map((paragraph, pIndex) => (
            <p
              key={pIndex}
              className="text-2xl leading-snug font-semibold tracking-tight text-balance text-muted-foreground md:text-3xl lg:text-4xl"
            >
              {renderParagraph(paragraph, highlights, pIndex)}
            </p>
          ))}
        </div>
      </div>
    </section>
  )
}

export default About
