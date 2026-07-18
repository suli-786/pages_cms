# /about — block selection & build plan

Companion to [about-draft.md](about-draft.md) (the copy) and [content-triage.md](content-triage.md) (why this page exists).
Researched 2026-07-16 against the live `@shadcnblocks` registry + a full codebase map.

---

## 1. Block selection

**Verified for every candidate below: none pull a new shadcn UI primitive.** They are single-file blocks whose only dependency is `lucide-react` (already installed at 1.18.0). No Card / Accordion / Carousel / Avatar installs. This was the main risk and it's clear.

| § | Section | Pick | Why |
|---|---|---|---|
| 1 | intro | **bespoke** | No registry block does "brand statement, no photo, no CTA". The idiom already exists in `hero.tsx` band 1 — reuse `CornerBrackets` + `renderEmphasis`. Carries the page's only `<h1>`. |
| 2 | story | **`@shadcnblocks/about6`** | Two-column story + staggered photos. Copy is 3 flowing paragraphs; photos optional. |
| 3 | why | **`@shadcnblocks/feature76`** | 4 columns, icon tile overlapping a top border, vertical guide lines — echoes the hero's `divide-x` idiom. |
| 4 | faith | **bespoke** | Searched the registry specifically: **there is no pull-quote / scripture block**. Build a `<figure>` + `<blockquote>` framed with `CornerBrackets` — the site's viewfinder ornament is exactly right for a verse. |
| 5 | beliefs | **`@shadcnblocks/feature362`** | Sticky left column + *literally six* bordered cards. Swap the per-card icon for a mono numeric index (`font-mono text-xs tracking-[0.18em]`) so the "six propositions" numbering is honoured and no icon picker is needed. |
| 6 | values | **`@shadcnblocks/feature26`** | Six icon-led items, up to 3 columns — exact fit for 6 term + one-liner pairs. |
| 7 | team | **bespoke, minimal** | Two paragraphs of honest interim copy. `team15` is the pick for **later**, when real bios land. Deliberately NOT adding an empty `members` list to the CMS now — empty fields invite a half-filled roster. |
| 8 | join | **reuse existing `src/components/sections/cta.tsx`** | Already does emphasis heading, `CornerBrackets` eyebrow, full-bleed photo + scrim, countdown that self-hides on an empty date. Needs one addition: an optional `secondaryCta` (the copy has two asks). |

**Rejected, with reasons:**
- `timeline8` / `timeline14` for **story** — the signed-off copy is prose, not dated milestones. Forcing a timeline means rewriting approved copy. These become right once the Events recaps supply real dates.
- `feature53` / `feature207` for **why** — both number their items. The four bullets are a list of grievances, not a sequence; numbering implies an order the copy doesn't have.
- `about1` / `about2` for **intro** — both bundle stats/logo strips/testimonials this page doesn't have.

**Net: 4 blocks ported, 3 sections bespoke, 1 section reuses an existing component.**

---

## 2. Design risk to watch

`beliefs` (6 cards) sits immediately before `values` (6 items). Two six-item grids back to back can read as one undifferentiated wall. Mitigated by making them structurally different — beliefs = bordered cards + sticky left column + numbers; values = borderless, 3-col, icon-led, tighter type. **Must be checked visually before calling the page done.** Cheap fix if it still reads flat: reorder to `faith → values → beliefs`.

---

## 3. Architecture decision: fixed sections, not the CMS `block` field

`context/pages-cms-best-practices.md` §8 item 4 recorded this as open, and §1 leans toward the `block` page-builder for "several pages sharing a section library". **Recommendation: stay with fixed per-section objects (the `home.json` pattern). Confidence: high.**

The reasoning that overturns §1: those pages don't actually share sections. Of About's 8 sections, exactly two have reuse potential (an intro band and a CTA band) — and the CTA is *already* a shared component. A polymorphic block library is heavy machinery for a two-block overlap. Meanwhile the Events collection — the case §1 was anticipating — is N instances of **one** shape, which is what Pages CMS `type: collection` with fixed fields is for. `type: block` solves "one page, unknown composition", which describes none of the confirmed pages.

Three concrete costs in this codebase: it breaks the `Resolved*` overlay type model in `images.ts`; arbitrary section ordering is a real failure mode because `.dark` is a *static island* (two dark sections dragged adjacent merge into one band); and it contradicts the repo's posture that the CMS must not be able to produce a silently-wrong page.

**Not a trap, because the migration path is cheap and touches zero components:** every section takes `{ content }` and nothing else, so fixed → block is ~200 lines across 3 files per page (reshape JSON, rewrite the `.pages.yml` entry, swap `z.object` for `z.discriminatedUnion`, swap static composition for `sections.map()`).

**Decision trigger:** re-score when designing the `/events/<area>` hub pages — the first genuinely composed, unknown-shape pages on the roadmap.

---

## 4. Blockers to resolve before/while building

1. **`whatsapp` is empty in `settings.json`.** The `link` schema resolves the token `whatsapp` → `'#'`. The join CTA is this page's entire conversion goal — shipping it inert is worse than not shipping the section. Need the invite URL, or the button suppresses itself when `href === '#'`.
2. **The story copy links to `/events`, which doesn't exist yet**, and body fields carry no link syntax. Options: cut the sentence for v1, point at `/#event`, or add a `cta` field to the story section.
3. **Story photos: yes or no?** If text-only, an entire file (`images-about.ts`) disappears from the build.
4. **`_Niyyah_` italics** — the repo has no underscore convention. Either extend `renderEmphasis` to handle `_…_` (serves the whole site, but note `emphasis.tsx` and `vision.tsx`'s `renderRich` are two independent copies of the same parser and would diverge), or render it plain.

---

## 5. Notable codebase findings

- **Palette is `indigo`** (light canvas), not black. This makes the navbar bug live, not latent: `navbar.tsx` hardcodes `isDarkHero = pathname === '/'`, so any `.dark` first section on `/about` gets near-black nav text on a dark band — invisible. Fix: /about's first section stays light, **and** generalise `isDarkHero` into a `darkHero` prop now (~6 lines, 3 files, zero visual change today) because the Events pages will want dark photo heroes.
- **Shared-code extraction needed first:** the zod helpers (`str`, `link`, `visible`, `list`) are module-private in `home.ts`, and the `safeParse`+throw is duplicated in `home.ts` and `site.ts` (About would be a third copy). Extract to `src/lib/content.ts`.
- **`resolveHomeImages` is homepage-shape-specific**; `resolveUrl` / `resolveMedia` / `POLICIES` are module-private. Add a sibling `images-about.ts` rather than a generic walker — the policies (widths/`sizes` per section's measured layout) are the value of that file and a generic resolver can't pick one.
- **`SHADCNBLOCKS_API_KEY` lives in `~/.bashrc`**, which non-interactive shells don't source — `npx shadcn add` will fail auth from an agent shell unless exported inline.
- Ported blocks arrive with demo content and may import `next/image`/`next/link`; every image must become a plain `<img>` fed by `src/lib/images.ts` (islands must never touch `astro:assets`).

---

## BUILT — 2026-07-18

`/about` is live in the repo and building. What shipped:

**New files:** `src/pages/about.astro` · `src/content/about.json` · `src/lib/about.ts` · `src/lib/images-about.ts` · `src/lib/content.ts` (shared) · `src/components/elements/{prose,icon}.tsx` · `src/components/sections/about/{intro,story,why,faith,beliefs,values,team}.tsx`

**Modified:** `.pages.yml` (About entry, 8 sections) · `src/lib/home.ts` (uses shared helpers) · `src/lib/images.ts` (exported `Policy`/`resolveUrl`/`resolveMedia`) · `src/components/elements/emphasis.tsx` (added `_italics_`) · `src/components/sections/vision.tsx` (uses the shared parser — the two copies can no longer diverge) · `src/components/sections/cta.tsx` (optional `secondaryCta`) · `src/consts.ts` (About → `/about`) · `navbar.tsx` + `DefaultLayout.astro` + `index.astro` (`darkHero` prop replaces the hardcoded `pathname === '/'`)

**Verified:** `astro check` 0 errors (only 2 pre-existing hints) · `eslint` clean · build produces `/about/index.html` · 1 `<h1>`, 7 `<h2>`, `<ol>` for propositions, `<figure>`/`<blockquote>` for the verse · canonical + sitemap entry · no horizontal overflow at 320px · no console errors · homepage HTML byte-identical apart from the intended nav href and the CTA wrapper div.

**Failure paths exercised (all behaved):** required `intro.title: null` → build fails naming the field · missing image path → build fails naming the file · cleared lists (`photos`/`items` = null) → build **succeeds**, renders text-only (the `7dbd234` bug class).

**Fixed during visual review:** faith blockquote's corner brackets were framing a wide box instead of the verse (tightened, dropped `text-balance`) · `why` bodies had orphaned leading em-dashes · `beliefs` label duplicated its heading verbatim.

### Outstanding
1. **`whatsapp` is still empty** → the join CTA renders `href="#"`. Highest priority; it's the page's conversion goal.
2. `[PENDING]` content: team names/photos, 2025 edition details, join mechanics — retrieval list §3.
3. **Pre-existing, unrelated:** `DefaultLayout.astro` has no palette wiring (`lib/theme.ts` is imported by nothing but the settings validator), so the CMS `palette` setting currently has no effect — the site always renders `:root`. Left untouched as in-flight work.

---

## 6. Sequencing

- **Phase 0** — resolve the 4 blockers above.
- **Phase 1** — shared code: `content.ts`, `images.ts` exports, `prose.tsx` (lift `paragraphsOf` out of `vision.tsx`), optional emphasis marker. Homepage output must stay byte-identical.
- **Phase 2** — CMS model: `.pages.yml` About entry + `about.json` + `lib/about.ts`. Exercise the zod failure path.
- **Phase 3** — UI: 7 section components + `about.astro`, one block at a time. `cta.tsx` `secondaryCta` last, then re-verify the homepage.
- **Phase 4** — wiring: `consts.ts` nav (`About → /about`), navbar `darkHero` prop, meta.
- **Phase 5** — verify: `npm run check`, `npm run build`, both palettes, the `beliefs`/`values` adjacency, keyboard + mobile drawer.

Phase 1 is independently mergeable and independently valuable.
