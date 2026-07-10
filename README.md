# Ummah Tech Conference

Marketing site for the **Ummah Tech Conference** (annual conference — 7 November 2026, Johannesburg, South Africa), built with Astro and made content-editable through [Pages CMS](https://pagescms.org).

## Getting Started

```bash
# Install dependencies (requires Node >= 22.12)
npm install

# Run the development server
npm run dev
```

Open [http://localhost:4321](http://localhost:4321) to view it.

## Editing content

Homepage copy and images live in `src/content/home.json` and are edited through Pages CMS (see `.pages.yml`). Editing there commits back to this repo; a deploy rebuilds the site.

## Tech Stack

- Astro 6
- Tailwind CSS 4
- shadcn/ui
- Pages CMS
