"use client"

import * as React from "react"
import { AnimatePresence, motion, useReducedMotion } from "motion/react"
import { HoverCard } from "radix-ui"

import { cn } from "@/lib/utils"

// Static-image hover preview, forked from the shadcnblocks/Aceternity
// LinkPreview and reduced to local images only (no microlink screenshots —
// previews come from Pages CMS uploads). The preview is a visual enhancement:
// with no href the trigger stays a plain, non-focusable span so keyboard and
// AT users aren't handed an interactive element that only shows a picture.
type LinkPreviewProps = {
  children: React.ReactNode
  imageSrc: string
  imageAlt?: string
  href?: string
  width?: number
  height?: number
  className?: string
}

export function LinkPreview({
  children,
  imageSrc,
  imageAlt = "",
  href,
  width = 200,
  height = 125,
  className,
}: LinkPreviewProps) {
  const [isOpen, setOpen] = React.useState(false)
  const [isMounted, setIsMounted] = React.useState(false)
  const reducedMotion = useReducedMotion()

  React.useEffect(() => {
    setIsMounted(true)
  }, [])

  const triggerClass = cn(
    "font-medium text-foreground underline decoration-accent decoration-2 underline-offset-4",
    className
  )

  return (
    <>
      {/* Preload so the card doesn't pop in empty on first hover. */}
      {isMounted ? (
        <div className="hidden" aria-hidden>
          <img src={imageSrc} width={width} height={height} alt="" />
        </div>
      ) : null}

      <HoverCard.Root openDelay={50} closeDelay={100} onOpenChange={setOpen}>
        <HoverCard.Trigger asChild>
          {href ? (
            <a href={href} className={triggerClass}>
              {children}
            </a>
          ) : (
            <span className={triggerClass}>{children}</span>
          )}
        </HoverCard.Trigger>

        <HoverCard.Portal>
          <HoverCard.Content
            aria-hidden
            side="top"
            align="center"
            sideOffset={10}
            className="z-50 [transform-origin:var(--radix-hover-card-content-transform-origin)]"
          >
            <AnimatePresence>
              {isOpen && (
                <motion.div
                  initial={
                    reducedMotion
                      ? { opacity: 0 }
                      : { opacity: 0, y: 20, scale: 0.6 }
                  }
                  animate={{
                    opacity: 1,
                    y: 0,
                    scale: 1,
                    transition: reducedMotion
                      ? { duration: 0.15 }
                      : { type: "spring", stiffness: 260, damping: 20 },
                  }}
                  exit={
                    reducedMotion
                      ? { opacity: 0 }
                      : { opacity: 0, y: 20, scale: 0.6 }
                  }
                  className="rounded-xl shadow-xl"
                >
                  <span className="block rounded-xl border border-border bg-background p-1">
                    <img
                      src={imageSrc}
                      width={width}
                      height={height}
                      alt={imageAlt}
                      className="rounded-lg object-cover"
                    />
                  </span>
                </motion.div>
              )}
            </AnimatePresence>
          </HoverCard.Content>
        </HoverCard.Portal>
      </HoverCard.Root>
    </>
  )
}
