"use client"

import { Pause, Play } from "lucide-react"

import { cn } from "@/lib/utils"

// Pause/play control for auto-scrolling marquees (WCAG 2.2.2: moving content
// needs a pause mechanism that doesn't depend on hover — touch and keyboard
// users have none). The parent owns the state and sets `data-marquee-paused`
// on the wrapper; global.css pauses the animation inside it.
export function MarqueePause({
  paused,
  onToggle,
  className,
}: {
  paused: boolean
  onToggle: () => void
  className?: string
}) {
  return (
    <button
      type="button"
      onClick={onToggle}
      aria-pressed={paused}
      className={cn(
        "inline-flex min-h-9 items-center gap-1.5 rounded-md border border-current/25 px-2.5 text-xs font-medium transition-colors outline-none hover:border-current/60 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
        className
      )}
    >
      {paused ? (
        <Play aria-hidden className="size-3.5" strokeWidth={2} />
      ) : (
        <Pause aria-hidden className="size-3.5" strokeWidth={2} />
      )}
      {paused ? "Play" : "Pause"}
      <span className="sr-only"> logo animation</span>
    </button>
  )
}
