import type { LucideIcon } from "lucide-react"
import { Gavel, Handshake, Layers, Lightbulb, Shield } from "lucide-react"

/**
 * Icon registry keyed by the `icon` value in each service MDX file's
 * frontmatter. Add a new lucide import here when a new service goes in.
 */
export const SERVICE_ICONS: Record<string, LucideIcon> = {
  Gavel,
  Handshake,
  Layers,
  Lightbulb,
  Shield,
}

export function resolveServiceIcon(name: string): LucideIcon {
  return SERVICE_ICONS[name] ?? Handshake
}
