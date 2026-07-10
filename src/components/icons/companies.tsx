// Client logos rendered as CSS-mask silhouettes from the Simple Icons CDN
// (CC0 SVG art) paired with the brand name. The mask + `bg-current` pattern
// lets each mark inherit `currentColor` from its surrounding text, so the
// marquee's muted tone applies to both the icon and the wordmark.
//
// IMPORTANT: Trademarks belong to the brands shown. Before going live, the
// firm must confirm logo-usage permission for each client displayed.

const companies = [
  { name: "Shopify", slug: "shopify", href: "https://shopify.com" },
  { name: "Linear", slug: "linear", href: "https://linear.app" },
  { name: "Notion", slug: "notion", href: "https://notion.so" },
  { name: "Vercel", slug: "vercel", href: "https://vercel.com" },
  { name: "Figma", slug: "figma", href: "https://figma.com" },
  { name: "Discord", slug: "discord", href: "https://discord.com" },
]

export function CompanyLogos() {
  return (
    <>
      {companies.map(({ name, slug, href }) => {
        const maskUrl = `url(https://cdn.simpleicons.org/${slug})`
        return (
          <a
            key={slug}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={name}
            className="inline-flex items-center gap-3 transition-opacity hover:opacity-70"
          >
            <span
              aria-hidden
              className="block size-7 bg-current mask-contain mask-center mask-no-repeat"
              style={{ maskImage: maskUrl, WebkitMaskImage: maskUrl }}
            />
            <span className="text-xl font-semibold tracking-tight">{name}</span>
          </a>
        )
      })}
    </>
  )
}
