# Source docs — raw dump zone

This folder is **outside** the Astro build (`src/`), so nothing here ships to the live site.
It exists so we can see the whole pile of material in one place before deciding what's relevant.

## How to use it

- **Dump everything. Do NOT pre-filter.** If you're unsure whether something's relevant, it goes in.
  Deciding relevance is the triage step — don't do it by eye up front.
- One document per file is fine. Loose names are fine (`old-mission-notes.md`, `2025-recap.docx`, `sponsor-deck.pdf`).
- Accepted: `.md`, `.txt`, `.docx`, `.pdf`, exported Notion folders, pasted-in text files.
- Google Docs: `File → Share → Publish to web` and send the links in chat instead of downloading, if easier.

## What happens next

1. I inventory every file into atoms of information.
2. Each atom gets triaged: **Essential / Trust / Archive / Cut**, against the site's primary goal
   (grow the year-round community) and each audience's job-to-be-done.
3. Survivors get mapped to a sitemap — only then do we decide which pages exist.
4. We draft page by page, in the voice already set in `src/content/home.json`.

> Add `working/` to `.gitignore` if you don't want this pile in version control.
