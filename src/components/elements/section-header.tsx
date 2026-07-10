import { type ReactNode } from "react"

import { Badge } from "@/components/ui/badge"

type SectionHeaderProps = {
  badge: ReactNode
  heading: ReactNode
  description: ReactNode
  mark?: ReactNode
}

function SectionHeader({
  badge,
  heading,
  description,
  mark,
}: SectionHeaderProps) {
  return (
    <div className="grid grid-cols-1 gap-10 md:grid-cols-[1fr_2.6fr] md:gap-16">
      <div className="flex items-center justify-between gap-4 md:block">
        <Badge variant="outline" size="lg">
          <span className="size-1 rounded-full bg-foreground/40" />
          {badge}
          <span className="size-1 rounded-full bg-foreground/40" />
        </Badge>
        {mark && <div className="md:hidden">{mark}</div>}
      </div>
      <div className="relative">
        {mark && (
          <div className="absolute top-0 right-0 hidden md:block">{mark}</div>
        )}
        <h2 className="text-4xl leading-[1.05] font-light tracking-tight md:pr-14 md:text-5xl lg:text-6xl">
          {heading}
        </h2>
        <p className="mt-8 max-w-2xl text-base text-muted-foreground">
          {description}
        </p>
      </div>
    </div>
  )
}

export default SectionHeader
