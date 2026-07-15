# How Pages CMS Works (the editor)

How an editor changes content in **Pages CMS** — the web UI where you edit words and pictures, which commits your changes back to GitHub as flat files. Verified against live docs 2026-06-19.

> **Naming trap:** "**Pages CMS**" (pagescms.org — the open-source editor) and "**Cloudflare Pages**" (a host) are unrelated products that both say "Pages". Throughout, "Pages CMS" = the editor.

---

## 1. What Pages CMS is

Pages CMS is an **open-source, Git-based CMS**: a web UI over a GitHub repo, driven by one config file. Its job is to give non-Git editors a form to edit content, and commit their changes back to the repo as flat files. There is no separate content database — the GitHub repo *is* the content store.

---

## 2. Editing is a Git round-trip

Pages CMS is **Git-native**: it has no separate content database. When an editor opens an entry, Pages CMS reads that file from GitHub (via its GitHub App) and renders a form from it. When they save, Pages CMS writes the file and **commits it straight back to the configured branch** — no pull request by default. So the CMS is really a UI that does two things: *read a file to fill a form*, and *commit the file on save*. The form fields it shows, and how it validates them, come entirely from one config file (`.pages.yml`, §3).

---

## 3. The config file — `.pages.yml`

One file at the repo root defines everything the editor sees. Pages CMS reads it per repo and per branch. Example:

```yaml
# .pages.yml  (repository root)
media:
  input: public/media      # where uploaded files are stored in the repo
  output: /media           # the path written into content (see §5)

content:
  - name: products
    label: Products
    type: collection
    path: src/content/products      # folder in the repo where these content files live
    filename: '{primary}.md'         # new files named from the primary field
    view:
      fields: [name, price, sku]     # columns in the list view
      primary: name
    fields:
      - { name: name,        label: Name,        type: string,   required: true }
      - { name: image,       label: Image,       type: image }
      - { name: description, label: Description, type: rich-text }
```

- `type: collection` = a folder of many like-shaped files (e.g. products); `type: file` = a single editable file (use that for site-wide settings).
- Each field's **`type`** (string, number, boolean, date, image, rich-text, object, select, …) drives the form input Pages CMS renders. For a words-and-pictures test the ones that matter are **`string`** and **`rich-text`** (words) and **`image`** (pictures).
- Each field's **`name`** becomes the key written into the file's front-matter. `required: true` makes the editor fill it before saving.

---

## 4. Connect Pages CMS

1. Commit `.pages.yml` to the repo root.
2. Go to **app.pagescms.org** and sign in with GitHub.
3. Install the Pages CMS **GitHub App** on the account/org that owns the repo — you can scope it to just this one repository.
4. Open the repo in Pages CMS; it reads `.pages.yml` and shows your collection. Editors can now Add Entry / edit / Save, and each Save commits a file to the branch.

---

## 5. Media (pictures)

Set media `input: public/media` and `output: /media`. This makes committed image paths resolve as `/media/...` (servable) instead of `/public/media/...`. When an editor uploads a picture through an `image` field, Pages CMS stores the file under `input` and writes the `output` path into the content file.

---

## 6. Editor gotchas

- **Renames change the URL.** With `primary: name`, renaming an entry changes its filename — and the filename is what the site uses to build the entry's URL, so the old URL 404s. If entries get renamed often, consider a stable `primary` (e.g. an id/SKU field) instead.
- **Required fields are enforced.** A field marked `required: true` must be filled before Pages CMS will save.

---

## 7. How THIS site's homepage model works (2026-07-14 rebuild)

Editor-facing notes for the Ummah Tech homepage (`Homepage` in the CMS sidebar):

- **Show section toggles.** Every section has a "Show section" switch. Off = hidden on the site, content kept.
- **Emphasis markers.** In the hero *Title*, the vision *Heading* / *Statement*, wrap words in `*asterisks*` to emphasise them (e.g. `We're building *what's worth inheriting.*`).
- **Vision highlights.** Each "Highlighted phrase" must appear word-for-word in the vision *Heading* or *Statement*; it renders in full colour, and if it has a photo it shows on hover. If the phrase no longer matches, it simply renders as normal text.
- **Hero photo grid.** Nine images fill the 3×3 wall; more than nine cycle on a timer.
- **Social links.** Entered once under *Site settings → Social links* and shown as icons in the hero and the footer.
- **Uploads are renamed.** Media config uses `rename: safe` + images only, so filenames like `photo (1).jpg` become slugs automatically.
- **Cleared fields are safe.** Emptying an optional field or list hides that piece; only clearing the hero Title (required) or structurally breaking the file fails the build — with a field-path error message.

Developer contract: `.pages.yml` mirrors the zod schema in `src/lib/home.ts` — change both together. See [pages-cms-best-practices.md](pages-cms-best-practices.md) for the wider Pages CMS research.

---

## 8. Sources (verified 2026-06-19)

- **`.pages.yml` structure (media, content, collection/file types, fields), reads per repo/branch:** pagescms.org/docs/configuration ("Overview"); pagescms.org/docs/configuration/media (media sources).
- **Git-native (no content DB), reads file on open, commits on Save, GitHub App install + sign-in:** pagescms.org/docs ("Introduction"); css-tricks.com/using-pages-cms-for-static-site-content-management (the `input`/`output` note and the Save→commit behaviour).
