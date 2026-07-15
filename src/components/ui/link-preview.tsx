"use client"

import * as React from "react"
import { motion, useReducedMotion } from "motion/react"
import { Popover } from "radix-ui"

import { cn } from "@/lib/utils"

// Static-image preview of a highlighted phrase. Forked from the shadcnblocks/
// Aceternity LinkPreview and reduced to local images (previews come from Pages
// CMS uploads — no microlink screenshots).
//
// Input-agnostic, unlike a pure hover card: on a mouse it opens on hover; on
// touch it opens on tap; with a keyboard the phrase is a real button (Enter /
// Space to open, Escape to close). So the preview is reachable for everyone,
// which is why the phrase is a genuine control and the image carries alt text.
//
// A phrase that is also a link (`href`) stays a link: it previews on hover for
// mouse users, and a tap follows the link instead of opening the preview.
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
  const [open, setOpen] = React.useState(false)
  const [isMounted, setIsMounted] = React.useState(false)
  const [hoverCapable, setHoverCapable] = React.useState(false)
  const reducedMotion = useReducedMotion()
  const closeTimer = React.useRef<ReturnType<typeof setTimeout> | undefined>(
    undefined
  )

  React.useEffect(() => {
    setIsMounted(true)
    setHoverCapable(window.matchMedia("(hover: hover)").matches)
    return () => clearTimeout(closeTimer.current)
  }, [])

  // Hover to preview on pointer devices; tap/click/keyboard works everywhere.
  // On touch there is no hover, so only an explicit tap toggles it. The card is
  // a passive image (no controls), so closing on pointer-leave is fine — there
  // is nothing on it to move the pointer onto. The small delay avoids flicker.
  const hoverProps = hoverCapable
    ? {
        onPointerEnter: () => {
          clearTimeout(closeTimer.current)
          setOpen(true)
        },
        onPointerLeave: () => {
          closeTimer.current = setTimeout(() => setOpen(false), 80)
        },
      }
    : {}

  const triggerClass = cn(
    "font-medium text-foreground underline decoration-accent decoration-2 underline-offset-4",
    className
  )

  return (
    <Popover.Root open={open} onOpenChange={setOpen}>
      {/* Preload so the card doesn't pop in empty on first open. A <span>, not a
          <div>: this sits inside <p>, which can't contain block elements. */}
      {isMounted && (
        <span className="hidden" aria-hidden>
          <img src={imageSrc} width={width} height={height} alt="" />
        </span>
      )}

      {href ? (
        <Popover.Anchor asChild>
          <a href={href} className={triggerClass} {...hoverProps}>
            {children}
          </a>
        </Popover.Anchor>
      ) : (
        <Popover.Trigger
          className={cn(
            triggerClass,
            "inline cursor-pointer bg-transparent p-0 align-baseline outline-none focus-visible:rounded-sm focus-visible:ring-2 focus-visible:ring-ring"
          )}
          // Escape closes explicitly: the card takes no focus (see
          // onOpenAutoFocus), so focus stays on this button and Radix's own
          // Escape handling doesn't fire — close it ourselves.
          onKeyDown={(e) => {
            if (e.key === "Escape" && open) {
              e.preventDefault()
              setOpen(false)
            }
          }}
          {...hoverProps}
        >
          {children}
        </Popover.Trigger>
      )}

      {/* No forceMount: with several previews on one page it would keep every
          dismissable layer mounted at once, and Escape / click-outside would hit
          the wrong one. Radix mounts this only while open, so the enter
          animation still plays; there is just no exit animation. */}
      <Popover.Portal>
        <Popover.Content
          side="top"
          align="center"
          sideOffset={10}
          collisionPadding={12}
          // The card is a decorative preview; keep focus on the phrase so the
          // reading position doesn't jump.
          onOpenAutoFocus={(e) => e.preventDefault()}
          className="z-50 [transform-origin:var(--radix-popover-content-transform-origin)]"
        >
          <motion.span
            className="block rounded-xl shadow-xl"
            initial={
              reducedMotion ? { opacity: 0 } : { opacity: 0, y: 20, scale: 0.6 }
            }
            animate={{
              opacity: 1,
              y: 0,
              scale: 1,
              transition: reducedMotion
                ? { duration: 0.15 }
                : { type: "spring", stiffness: 260, damping: 20 },
            }}
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
          </motion.span>
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  )
}
