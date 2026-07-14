# Pages CMS — Best Practices, Gotchas & Integration Research

Developer-focused companion to [pages-cms-system.md](pages-cms-system.md) (editor basics). Researched 2026-07-14 via multi-source sweep (official docs, GitHub issues, practitioner writeups) with adversarial claim verification. Claims marked **[verified]** survived a 3-vote adversarial check against the cited source; **[likely]** means the source quote exists but the verification pass didn't run (session limit).

Version context: Pages CMS is MIT-licensed, actively maintained (latest release **2.1.8, 2026-06-08**; ~3.8k stars). The hosted app (app.pagescms.org) is free as of late 2025; maintainer has said paid plans for heavy users may come. **[likely]**

> Field-type doc URLs follow `pagescms.org/docs/configuration/fields/<type>/` — older `/<type>-field/` links 404.

---

## 1. The headline finding: the `block` field (page-builder pattern)

This is the answer to "how do we compose pages from shadcn blocks."

- **[verified]** Pages CMS has a dedicated `type: block` field for **polymorphic lists** — each list item can be a *different* schema, chosen by the editor from a menu ("page-builder style sections where each item can be a different schema"). Shipped ~May 2025 ([issue #200](https://github.com/pages-cms/pages-cms/issues/200), [docs](https://pagescms.org/docs/configuration/fields/block/)).
- **[verified]** Each saved item carries a **discriminator key** naming the chosen block: `blockKey`, default `_block`, configurable (e.g. `blockKey: type`). In Astro this maps directly onto a zod `discriminatedUnion`.
- **[verified]** Block definitions can be inline `fields` **or references to reusable top-level `components`** (`blocks: [{ name: hero, component: hero }]`), with field-level overrides when referencing.
- **[likely]** Gotcha: a block's root shape can't itself be "repeated structured data" — nest a `list` field inside the block's object (matters for FAQ lists, logo grids inside a section).

Sketch of the page-builder shape:

```yaml
components:
  hero:
    label: Hero
    type: object
    fields: [ ... ]
  logoGrid:
    label: Logo grid
    type: object
    fields:
      - { name: items, label: Logos, type: object, list: true, fields: [ ... ] }

content:
  - name: pages
    type: collection
    path: src/content/pages
    fields:
      - name: sections
        label: Page sections
        type: block
        list: true
        blockKey: type
        blocks:
          - { name: hero, component: hero }
          - { name: logoGrid, component: logoGrid }
```

```json
// committed JSON per item:
{ "sections": [ { "type": "hero", "title": "..." }, { "type": "logoGrid", "items": [] } ] }
```

**Two architectures for the shadcn-blocks plan** (decision pending — full scoring when we design):

| | Fixed per-section objects (current `home.json`) | `block` list (page builder) |
|---|---|---|
| Editor freedom | Can edit content only — can't add/reorder/remove sections | Can add, reorder, remove sections |
| Safety | High — layout can't be broken | Lower — every block must render safely in any order/count |
| Astro side | One component per key, static composition | Switch on `blockKey`, zod discriminated union |
| Reuse across pages | Duplicated field defs (fixable with `components`) | One block library shared by all pages |
| Fits | A single known homepage | Several pages (Events, About, Partner With Us) sharing a section library |

Either way, **`components` should be adopted**: define each shadcn-derived section's fields once, reference everywhere. **[verified]** ([docs](https://pagescms.org/docs/configuration/components/))

---

## 2. Field-type reference (what exists beyond the basics)

**[verified]** 14 built-in types: `block`, `boolean`, `code`, `date`, `file`, `image`, `number`, `object`, `reference`, `rich-text`, `select`, `string`, `text`, `uuid`.

Notes on the non-obvious ones:

- **`object`** — no options of its own; shape comes entirely from nested `fields`. With `list: true`, collapsible entries via `list.collapsible.summary` supporting `{index}` and `{fields.<name>}` tokens (already used for speakers/partners); without a summary the editor shows generic "Item #n". **[verified]**
- **`select`** — static `values` only (strings or `{name, label}` objects); `multiple: true` with `min`/`max`. Use for shadcn block *variants* (layout, theme, alignment) as constrained editor choices. Dynamic options require `reference`. **[verified]**
- **`reference`** — editor searches and links entries from another collection. **Collection-backed only**: `type: file` entries can't be referenced. `multiple`/`min`/`max`; `value`/`label` templates with `{path}`, `{name}`, `{primary}`, `{fields.<path>}`; `search` sets lookup fields. **[verified]** → if speakers/partners ever need to appear on multiple pages, promote them to collections and reference them.
- **`code`** — code editor input; **`uuid`** — auto identifier (useful as a stable id when filenames rename).
- **Custom field types** — drop `fields/custom/<name>/index.tsx` into the Pages CMS codebase; the folder name becomes the `type`, auto-registered at build time. Exports: `label`, `schema` (zod), `defaultValue`, `read`/`write`, `EditComponent`, `ViewComponent`. Build-time discovery ⇒ **only practical on a self-hosted instance**, not app.pagescms.org. ([guide](https://pagescms.org/docs/guides/creating-custom-field/))

Content entry types: `collection`, `file`, and **`group`** (navigation-only folder in the sidebar — useful once the config grows past a few entries). A `type: file` with `list` can store the whole file as a top-level array.

### 2b. Full feature inventory (verified against v2.1.x source, 2026-07-14)

Dashboard surfaces (one per repo **and branch** — routes: `/{owner}/{repo}/{branch}/…`):

- **Collection browser** — table with configurable columns/sort/search (`view: { fields, primary, sort, search, default }`), tree mode (`view.node`) for nested folders, `subfolders`, `exclude`.
- **Entry editor** — form generated from `.pages.yml`; rich-text is TipTap-based with Notion-style **slash commands** and tables, saving markdown or HTML; per-entry **history** (commit list with authors, links to GitHub).
- **Media browser** — per named media source; upload, folders, rename; `extensions`/`categories` filters.
- **Configuration editor** — edit `.pages.yml` inside the app with schema-validation errors.
- **Collaborators** — GitHub users or email-invited editors (OTP/magic-link, no GitHub account needed).
- **Actions** — config-defined buttons that trigger **GitHub Actions workflows** (`workflow_dispatch`): optional input fields (text/textarea/select/checkbox/number), confirm dialogs, `scope: collection | entry`, run status with cancel/rerun. E.g. a "Rebuild site" button for editors.
- **Cache admin** (opt-in via config) — refresh/flush the server-side cache.
- **Settings**, **branch switcher**, instance **admin panel** (self-host), light/dark theme.

File `format` values (what editing UI a content entry gets): `yaml-frontmatter` / `json-frontmatter` / `toml-frontmatter` (form + body), `yaml` / `json` / `toml` (pure-data form — `home.json` is this), `datagrid` (spreadsheet grid; auto-applied to `.csv`), `code` (code editor; auto for code extensions), `raw` (plain text). `delimiters` customizes frontmatter fences (e.g. `+++`, `["<!--", "-->"]`). Defaults are inferred from the file extension.

---

## 3. Gotchas (ranked by relevance to this repo)

1. **Cleared list fields commit `null`** — already bitten (commit `7dbd234` guards homepage sections). Treat every CMS-written value as untrusted at build time; see §5 zod validation.
2. **Validation was not enforced before 2.0.0** — `required: true` on an image field saved the literal string `"undefined"`; `minlength` wasn't enforced ([#250](https://github.com/pages-cms/pages-cms/issues/250), fixed 2026-03-16 in 2.0.0). **[verified]** Hosted app now runs 2.x, but the lesson stands: **CMS-side validation is a UX nicety, not a guarantee** — the repo can always contain invalid content (direct commits, old files, bugs). Defensive rendering + build-time schema checks are the real safety net.
3. **Pages CMS is not purely git-derived** — it keeps a **server-side DB cache** of repo entries (for team-shared caching, GitHub API limits, future search/API). **[likely]** ([#330](https://github.com/pages-cms/pages-cms/issues/330))
   - **Force-push / history rewrite desyncs the cache**: ghost entries that can't be opened or deleted. **[likely]** Avoid rebasing/force-pushing the branch Pages CMS edits (for this repo: `main`).
   - Files/folders committed **outside** the CMS (e.g. images pushed via git) could be missing from the media browser under 1.x ([#301](https://github.com/pages-cms/pages-cms/issues/301)). 2.0.0 improved cache recovery from missed webhooks and added an **opt-in cache admin page** (config flag reported as `cache: true` in one maintainer comment and `settings.cache: true` in another — check current docs for the exact key). **[likely]**
4. **Single-vs-list storage shape mismatches** — e.g. `list.max` on an image field threw "Expected array, received string" ([#260](https://github.com/pages-cms/pages-cms/issues/260)). When toggling a field between single and `list`, existing content keeps the old shape; migrate the JSON or guard both shapes.
5. **Optional objects skip child validation** — `required` on children of an optional `object` only kicks in once the object "has meaningful content". **[likely]** A section left empty can commit with all-empty children.
6. **Renames change filenames change URLs** — with `filename: '{primary}.md'`-style templates (collection concern; already noted in the basics doc). `uuid` fields or stable slugs mitigate.
7. **`.pages.yml` is read per repo *and per branch*** — a branch with a stale config shows a stale editor. Edits commit to whichever branch the editor has open. **[likely]**
8. **`readonly` on an object locks the whole subtree.** **[likely]**

---

## 4. Editor UX & media config best practices

**Editor UX** (from [content config](https://pagescms.org/docs/configuration/content/)):

- `view`: list settings — `primary`, `sort`, `order`, `fields` (columns), search, tree mode. Set on every collection.
- `list.collapsible.summary` on object lists (already done here — keep doing it; it's the difference between "Item #3" and "Dr. Aisha Patel").
- `description` on any field — inline editor help (used on `settings.logo`; use liberally, editors don't read external docs).
- `operations` — per-entry **create/rename/delete controls**: lock down deletes/renames on critical entries so an editor can't remove the homepage.
- `commit` — custom commit-message templates per entry/media (cleaner history than "Update … (via Pages CMS)").
- `group` content type to organize the sidebar once there are >4–5 entries.
- Editors without GitHub accounts can be **invited by email (passwordless magic link)** — the right path for conference staff. **[likely]**

**Media** (from [media config](https://pagescms.org/docs/configuration/media/)):

- Media can be a **list of named sources** (`name`, `label`, `input`, `output`), and image/file fields can select a source — e.g. a `partners` source pointing at `public/images/partners` so logo uploads land in the right folder.
- `extensions: [png, jpg, webp, svg]` or `categories: [image]` — filter what editors can upload. Currently unrestricted here.
- `rename`: `false` (keep original), `safe` (slugify), `random`. The repo already has a `public/images/images (1).jpg` committed via the CMS — `rename: safe` prevents exactly that.
- Alt text: Pages CMS has no built-in alt handling — keep pairing every `image` field with an explicit alt `string` field (Astro's `<Image>` hard-errors without `alt`).

---

## 5. Astro integration patterns

**Images: the pipeline tradeoff.**
- **[likely]** Files in `public/` are copied to the build **byte-for-byte — zero optimization**. Everything uploaded via the current media config bypasses Astro's image pipeline (no resizing, no webp/avif, no CLS-safe dimensions).
- The alternative: point `media.input` at `src/` (e.g. `src/assets/images`) and validate paths with the `image()` helper inside a content-collection schema — Astro then optimizes CMS-uploaded images. Costs: home.json must become a content collection, and image paths need to resolve relative to the content file. Worth doing for hero/speaker photos if Lighthouse scores matter; medium confidence on friction-free setup — prototype before committing.

**Schema validation (do this regardless).**
- Astro has **no built-in zod validation for a single standalone JSON file** ([roadmap #806](https://github.com/withastro/roadmap/discussions/806)). Options:
  1. **Manual `z.object(...).parse(home)` at the top of `index.astro`** — simplest; build fails loudly on bad CMS commits instead of rendering broken sections. Recommended first step; it converts the `7dbd234` class of bug from runtime guard to build-time error.
  2. `file()` loader collection — loads entries from one JSON file, but each entry needs a unique `id`; a `parser()` can extract a nested/singleton shape. More ceremony, buys `getEntry()` typing and `image()` support.
  3. Astro's own docs advise **against** collections for "one or a few distinct pages" — plain import + manual parse is idiomatic for the current single-page setup. **[likely]**
- Best practice from the field: **mirror `.pages.yml` fields 1:1 in a zod schema** so the CMS config and the renderer can't drift ([Lexington Themes writeup](https://lexingtonthemes.com/blog/posts/how-to-use-pagescms-with-astro)). If the block field is adopted: `z.discriminatedUnion(blockKey, [...])`.
- Canonical reference repo: [pages-cms/astro-blog-template](https://github.com/pages-cms/astro-blog-template). **[likely]**

---

## 6. Cloudflare deployment & build triggers

- **Pages CMS never triggers builds** — it only commits. Deployment is whatever CI reacts to the push. **[likely]**
- With Cloudflare Pages **Git integration**, every push to a connected branch auto-builds — so every CMS **Save = one commit = one build**. Watch the free-tier build quota (500 builds/month) with chatty editors; each image upload is also a commit.
- Levers if build noise becomes a problem:
  - **Skip flags**: `[CI Skip]` / `[CF-Pages-Skip]` in commit messages skip builds — combinable with Pages CMS `commit` message templates (e.g. on media-only commits; the file still lands in the repo and ships with the *next* build).
  - **Deploy Hooks**: unauthenticated POST URL that triggers a build — decouple by disabling auto-build on the branch and batching. The URL is the secret; don't commit it. Don't wire a hook *and* auto-build on the same branch (duplicate builds).
- Constraints: a Git-integrated Pages project **can't later switch to Direct Upload** (wrangler-only), and one repo can't be connected to Pages projects in two Cloudflare accounts. **[likely]**
- When a CMS save doesn't deploy: usually the Cloudflare GitHub App (stale/suspended install, repo missing from its access list) — and Cloudflare occasionally misses push events platform-side; an empty commit re-triggers. ([troubleshooting](https://developers.cloudflare.com/pages/configuration/git-integration/troubleshooting/))

---

## 7. Hosting model & permissions

- **Hosted (app.pagescms.org)** — recommended path; free; runs the current 2.x line. Trust tradeoff: the shared Pages CMS GitHub App gets read/write to the repos you grant it (scope it to just this repo). **[likely]**
- **Self-host** — Next.js app; needs PostgreSQL (`DATABASE_URL`; Supabase Session Pooler recommended for migrations), `BETTER_AUTH_SECRET`, `CRYPTO_KEY`, `BASE_URL`, optional `ADMIN_EMAILS`; own GitHub App created via `npm run setup:github-app`; stable HTTPS URL behind a reverse proxy. Only needed for custom field types or data-sovereignty concerns. **[likely]**
- Maintainer direction (late 2025): a version that runs entirely on Cloudflare incl. D1; dev.pagescms.org previews upcoming features. **[likely]**

---

## 8. Recommended actions for this repo

Ordered; 1–3 are cheap and address demonstrated failure modes.

1. **Harden media config**: `categories: [image]` (or explicit `extensions`) + `rename: safe` — prevents the next `images (1).jpg`. *(high confidence)*
2. **Zod-parse `home.json` + `settings.json` at build time**, schema mirroring `.pages.yml` — turns bad CMS commits into build failures instead of broken sections. *(high confidence)*
3. **Adopt `components`** for field groups already duplicated in `.pages.yml` (cta objects, image+alt objects) — less drift as pages are added. *(high confidence)*
4. **Decide fixed-sections vs block-field** when designing the shadcn-block pages — see §1 table; lean fixed for the homepage, block-field once multiple pages share a section library. *(decision open — to be scored properly at design time)*
5. **Named media sources** per asset class (partners, speakers) once those sections are CMS-managed. *(medium)*
6. Consider **`src/` images + `image()` helper** for hero/speaker photos if image performance matters — prototype first. *(medium; adds complexity)*
7. Never force-push `main` (CMS cache desync); if history surgery is ever unavoidable, expect ghost entries and use the cache-admin flag / support. *(high confidence on the risk, [likely] on details)*

---

## 9. Sources

Official: [configuration overview](https://pagescms.org/docs/configuration/) · [content](https://pagescms.org/docs/configuration/content/) · [media](https://pagescms.org/docs/configuration/media/) · [fields/block](https://pagescms.org/docs/configuration/fields/block/) · [fields/object](https://pagescms.org/docs/configuration/fields/object/) · [fields/reference](https://pagescms.org/docs/configuration/fields/reference/) · [fields/select](https://pagescms.org/docs/configuration/fields/select/) · [custom-fields guide](https://pagescms.org/docs/guides/creating-custom-field/) · [self-host](https://pagescms.org/docs/guides/installing/self-host/) · [repo](https://github.com/pages-cms/pages-cms)

Issues: [#200 blocks/components](https://github.com/pages-cms/pages-cms/issues/200) · [#250 validation](https://github.com/pages-cms/pages-cms/issues/250) · [#260 image list.max](https://github.com/pages-cms/pages-cms/issues/260) · [#301 media cache](https://github.com/pages-cms/pages-cms/issues/301) · [#330 force-push cache](https://github.com/pages-cms/pages-cms/issues/330)

Astro: [content collections](https://docs.astro.build/en/guides/content-collections/) · [images](https://docs.astro.build/en/guides/images/) · [Pages CMS guide (stub)](https://docs.astro.build/en/guides/cms/pages-cms/) · [roadmap #806 (single-JSON zod)](https://github.com/withastro/roadmap/discussions/806)

Cloudflare: [git integration](https://developers.cloudflare.com/pages/configuration/git-integration/) · [deploy hooks](https://developers.cloudflare.com/pages/configuration/deploy-hooks/) · [troubleshooting](https://developers.cloudflare.com/pages/configuration/git-integration/troubleshooting/)

Practitioner: [CSS-Tricks](https://css-tricks.com/using-pages-cms-for-static-site-content-management/) · [Lexington Themes](https://lexingtonthemes.com/blog/posts/how-to-use-pagescms-with-astro) · [HN launch thread](https://news.ycombinator.com/item?id=39467132)
