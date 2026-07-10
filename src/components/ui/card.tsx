import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { Slot } from "radix-ui"

import { cn } from "@/lib/utils"

const cardVariants = cva(
  "group/card flex flex-col overflow-hidden rounded-xl outline-none focus-visible:ring-2 focus-visible:ring-ring/40",
  {
    variants: {
      variant: {
        muted: "bg-muted/50 p-5 transition-colors hover:bg-muted md:p-6",
        image:
          "bg-card shadow-md ring-1 ring-foreground/5 dark:ring-foreground/10 *:[img:first-child]:rounded-t-xl *:[img:last-child]:rounded-b-xl",
      },
    },
    defaultVariants: {
      variant: "muted",
    },
  }
)

function Card({
  className,
  variant,
  asChild = false,
  ...props
}: React.ComponentProps<"div"> &
  VariantProps<typeof cardVariants> & { asChild?: boolean }) {
  const Comp = asChild ? Slot.Root : "div"

  return (
    <Comp
      data-slot="card"
      data-variant={variant ?? "muted"}
      className={cn(cardVariants({ variant }), className)}
      {...props}
    />
  )
}

export { Card, cardVariants }
