"use client"

import { Star } from "lucide-react"

import { endorsements } from "@/components/sections/endorsements"
import { Marquee } from "@/components/ui/marquee"
import { cn } from "@/lib/utils"

type Platform = {
  name: string
  logo: { src: string; width: number; height: number }
}

function ReviewsRow() {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
        <span className="inline-flex items-center gap-1.5">
          <span className="text-sm font-semibold tabular-nums">4.9</span>
          <Stars />
        </span>
        <span aria-hidden className="hidden h-4 w-px bg-border sm:block" />
        <ul className="flex flex-wrap items-center gap-x-4 gap-y-2">
          {PLATFORMS.map((p) => (
            <li key={p.name}>
              <img
                src={p.logo.src}
                alt={p.name}
                width={p.logo.width}
                height={p.logo.height}
                className="h-4 w-auto max-w-20 object-contain"
              />
            </li>
          ))}
        </ul>
      </div>

      <Marquee pauseOnHover className="mask-x-from-88% [--duration:50s]">
        {endorsements.map((e) => (
          <a
            key={e.portrait}
            href="#testimonials"
            className="group flex w-80 items-center gap-2.5"
          >
            <img
              src={e.portrait}
              alt=""
              width={28}
              height={28}
              className="size-7 shrink-0 rounded-full object-cover grayscale transition-[filter] duration-200 group-hover:grayscale-0"
            />
            <p className="truncate text-xs text-muted-foreground">
              <span className="text-foreground">&ldquo;{e.quote}&rdquo;</span> —{" "}
              {e.sectorShort}
            </p>
          </a>
        ))}
      </Marquee>
    </div>
  )
}

function Stars({ className }: { className?: string }) {
  return (
    <div className={cn("flex gap-0.5 text-chart-1", className)}>
      {Array.from({ length: 5 }).map((_, i) => (
        <Star key={i} className="size-3" fill="currentColor" strokeWidth={0} />
      ))}
    </div>
  )
}

const PLATFORMS: Platform[] = [
  {
    name: "Google",
    logo: { src: "/images/reviews/google.svg", width: 272, height: 92 },
  },
  {
    name: "Yelp",
    logo: { src: "/images/reviews/yelp.svg", width: 131, height: 53 },
  },
  {
    name: "Avvo",
    logo: { src: "/images/reviews/avvo.svg", width: 73, height: 22 },
  },
  {
    name: "Martindale",
    logo: { src: "/images/reviews/martindale.svg", width: 437, height: 64 },
  },
]

export default ReviewsRow
