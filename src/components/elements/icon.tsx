import {
  Building2,
  Compass,
  Cpu,
  Globe,
  Handshake,
  Heart,
  Lightbulb,
  MicOff,
  Network,
  Scale,
  Server,
  ShieldCheck,
  Sprout,
  Users,
  type LucideIcon,
} from 'lucide-react';

// A small allowlist of Lucide icons an editor can pick per list item.
//
// Deliberately a closed set, mirrored by a `select` field in .pages.yml and a
// z.enum in the section schemas: an open text field would let a typo render
// nothing (or crash), and the icon set is a design decision, not content. Keep
// this list short — every entry is a choice the editor has to reason about.
//
// These sections are static (no client: directive), so none of this reaches a
// client bundle.
export const ICON_NAMES = [
  'building-2',
  'compass',
  'cpu',
  'globe',
  'handshake',
  'heart',
  'lightbulb',
  'mic-off',
  'network',
  'scale',
  'server',
  'shield-check',
  'sprout',
  'users',
] as const;

export type IconName = (typeof ICON_NAMES)[number];

const ICONS: Record<IconName, LucideIcon> = {
  'building-2': Building2,
  compass: Compass,
  cpu: Cpu,
  globe: Globe,
  handshake: Handshake,
  heart: Heart,
  lightbulb: Lightbulb,
  'mic-off': MicOff,
  network: Network,
  scale: Scale,
  server: Server,
  'shield-check': ShieldCheck,
  sprout: Sprout,
  users: Users,
};

export const DEFAULT_ICON: IconName = 'sprout';

export function Icon({
  name,
  className,
}: {
  name: IconName;
  className?: string;
}) {
  const Glyph = ICONS[name] ?? ICONS[DEFAULT_ICON];
  return <Glyph className={className} aria-hidden="true" />;
}
