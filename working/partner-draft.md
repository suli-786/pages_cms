# Partner page — copy draft v2 (for review)

v1: synthesized 2026-07-18 from a 3-draft / 3-judge workflow (commercial base — won credibility 9/10 + conversion 9/10). v2: user's answers folded in — ~200 attendance published, current-partners-by-tier section (hidden while empty), email-only prospectus flow, no previous partners, no named contact.

**Sources:** `working/source-docs/partner.md` + `working/source-docs/Ummah Tech-Strategic-Partner-Proposal.pdf` (2024 deck) + user-supplied 2025 attendance.

**Decisions applied:** no prices/slots/ticket-counts (2024 figures) · NPC registration published once · prospectus sent by email reply · previous partners never mentioned · no political/About-page content.

---

## 1 · intro
**Eyebrow:** Partner With Us

### Put your brand *where the builders are.*

Ummah Tech is a movement of Muslim technologists, founders and creatives, growing out of South Africa — an annual flagship conference and a year-round community of roundtables in between.

Partnership places your organisation inside that network: on stage, on the venue floor and across our channels — alongside a movement that builds with purpose. Here is what partnering looks like, and how to start the conversation.

## 2 · why
### Why partner with Ummah Tech

- **Reach a network of tech leaders.** Visibility among Muslim technologists, entrepreneurs, developers and innovators shaping the future of technology.
- **Align with Islamic values.** Demonstrate a commitment to ethical innovation and socially responsible technology — integrity, sincerity, positive contribution.
- **Showcase your brand.** A direct line to an engaged audience of professionals, entrepreneurs and decision-makers across the tech industry.
- **Grow the community.** Help build the space where Muslim professionals collaborate and innovate — solutions that serve the Ummah and society as a whole.

## 3 · reach
### Who you reach

Around 200 attendees joined Ummah Tech 2025 — engineers, designers, business owners and startup founders, tech entrepreneurs to seasoned professionals. A dense room of builders and decision-makers, not a trade-show hall.

Behind that audience stands an institution, not a one-off event:

- **Registered non-profit.** Ummah Tech NPC · 2024/095025/08.
- **Annual flagship.** The Ummah Tech Conference, first held in Johannesburg in November 2024, rotating between Johannesburg and Cape Town.
- **Year-round community.** Roundtables and collaboration continue between conferences.
- **Next edition.** 7 November 2026 · Johannesburg.

> ⚑ Attendance wording: "Around 200" renders your "about 200" faithfully. Alternatives if you prefer: "some 200 attendees" / "close to 200". I'd avoid "200+" unless the count was confirmed above 200. The "dense room" sentence frames the number as quality-of-audience — cut it if it reads as spin to you.

## 4 · tiers
### Partnership tiers

Three tiers, scaled by prominence. Each includes everything in the tier below it, and complimentary tickets come with all three.

**Platinum — Headline** · *The lead partner of the conference.*
- Speaker slot or panel discussion
- Lanyard branding
- Premium placement at the venue

**Gold — Partner** · *A visible presence at the event and in the run-up to it.*
- Placement at the venue
- Propose a topic and speaker
- Branding on the ticketing website
- Branding on social media posts

**Silver — Exhibitor** · *The foundation every tier builds on.*
- Exhibition table
- Branding on the event website
- Partnership announcement across social media and the WhatsApp community

The tiers are a starting point, not a limit — we're open to discussing partnership shapes beyond them.

**Request the partnership prospectus** — write to [hello@ummahtech.net](mailto:hello@ummahtech.net) and we'll send it over with current tiers, pricing and availability.

> Internal to-do (not a page blocker): the deck the team replies with needs 2026 numbers — the only one on file is the 2024 edition with old pricing.

## 5 · partners
### Our 2026 partners

*(Section is built and CMS-editable but renders NOTHING until the first partner is added — an empty "current partners" block on a sponsor page is anti-social-proof. The moment an admin adds a partner in Pages CMS, the section appears, grouped by tier.)*

Copy when populated — heading + one line:

The organisations partnering with Ummah Tech 2026, at every tier.

**CMS model:** one list, each entry = logo + alt, organisation name, link, tier (Platinum / Gold / Silver). Rendered grouped by tier, Platinum first. Adding a partner = one CMS entry; no code changes.

> Deferred: when the first 2026 partner signs, ask them for a one-line quote — peer testimony slots in here.

## 6 · contact
### Start the *conversation.*

Write to **[hello@ummahtech.net](mailto:hello@ummahtech.net)** — tell us who you are and what you have in mind, and we'll come back with the prospectus and a proposal shaped around it. Or use the [contact form](/#contact) and choose the partnership option; it reaches the same team.

Every partnership advances one mission: to nurture collaboration, inspire innovation and build skills among Muslims in the technology sector, for the benefit of the Ummah and humanity. We'd be glad to build it with you.

---

## BUILT — 2026-07-18

`/partner` is live in the repo and building. **New:** `src/pages/partner.astro` · `src/content/partner.json` · `src/lib/partner.ts` · `src/lib/images-partner.ts` · `src/components/sections/partner/{why,reach,tiers,partner-wall,contact}.tsx` · shared `sections/page-intro.tsx` (promoted from About's intro; `sections/about/intro.tsx` deleted, about.astro updated). **Modified:** `.pages.yml` (Partner entry, 6 sections) · `src/consts.ts` (Partner With Us → `/partner`).

**Blocks:** feature203 (why) · stats8 (reach, as a `<dl>`) · pricing57 (tiers — price row + billing toggle deleted, mono tier badges kept) · logos28 (wall, grouped by tier) · cta3 (contact channel cards). The registry pulled `card/toggle/toggle-group/separator` primitives as side-effects — all removed; `ui/` stays at the 7 curated primitives. shadcn's clobbering of button/badge/utils reverted again.

**Verified:** `astro check` 0 errors (+ palette contract check now active and passing) · eslint clean · 1 `<h1>`, canonical + sitemap · **no price/slot/ticket/venue leakage** (grep-checked) · NPC number + "Around 200" + prospectus CTA present · **wall hidden while empty, appears grouped with tier label when a partner is added (exercised both ways)** · null lists build text-only · zero page JS beyond navbar/footer · no 320px overflow · no console errors · home + about token-diffs show only the intended `/#partners`→`/partner` nav change.

## Build notes
- Partner-tier select values (platinum/gold/silver) are a NEW enum — do not reuse the homepage wall's (headline/supporting/regular); different pages, different data. The homepage wall keeps its own list (user: previous partners never appear on this page).
- Verify the contact form's partner option label in `contact.tsx` before shipping the "choose the partnership option" line.
- Whole page static — no countdown, no client directives anticipated at all.
- ~2-minute read maintained; judges' bans hold (no prices, NPC number once, mission once).
