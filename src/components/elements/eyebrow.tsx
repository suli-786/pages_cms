import { type ReactNode } from "react"

import { cn } from "@/lib/utils"

type EyebrowTone = "default" | "muted"

function Eyebrow({
  children,
  className,
  tone = "default",
}: {
  children: ReactNode
  className?: string
  tone?: EyebrowTone
}) {
  const muted = tone === "muted"
  return (
    <div
      data-tone={tone}
      className={cn(
        "flex items-center gap-3 font-mono text-[0.6875rem] tracking-[0.25em] uppercase",
        muted ? "text-foreground/65" : "text-accent",
        className
      )}
    >
      <span
        aria-hidden
        className={cn("h-px w-8", muted ? "bg-foreground/30" : "bg-accent")}
      />
      {children}
    </div>
  )
}

export default Eyebrow
