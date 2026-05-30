# Design Document — Tony Litchfield Personal Website

> Version 1.0 — May 29, 2026

---

## 1. Project Overview

### Purpose

A personal website for Tony Litchfield, a software developer. The site serves as a professional home — introducing Tony to visitors, showcasing selected work, and publishing blog articles.

### Goals

- Present a clear, honest picture of who Tony is and what he builds.
- Provide a curated Gallery of projects that links out to live demos or source repositories.
- Host long-form writing in a comfortable, distraction-free reading environment.
- Maintain a timeless, minimalistic aesthetic that ages well.

### Success Criteria

- Visitor can learn who Tony is and how to contact him within 30 seconds of landing.
- Gallery entries are easy to scan and link directly to external projects.
- Blog articles render cleanly with proper code highlighting and tag-based filtering.
- Site passes WCAG 2.1 AA accessibility audit.
- Lighthouse scores ≥ 90 across Performance, Accessibility, Best Practices, and SEO.

---

## 2. Target Audience

| Persona                            | Goal                                                          |
| ---------------------------------- | ------------------------------------------------------------- |
| **Potential employer / recruiter** | Quickly assess Tony's skills, background, and work samples.   |
| **Fellow developer**               | Read technical articles, explore projects, maybe collaborate. |
| **General visitor**                | Understand who Tony is and what he cares about.               |

---

## 3. Feature List

### MVP (Phase 1–3)

| #   | Feature                                            | Priority |
| --- | -------------------------------------------------- | -------- |
| 1   | About / Home page (bio, skills, interests)         | P0       |
| 2   | Site-wide navigation with logo / name              | P0       |
| 3   | Light / Dark mode (OS preference + manual toggle)  | P0       |
| 4   | Gallery page — magazine-style project cards        | P1       |
| 5   | Individual gallery item page                       | P1       |
| 6   | Blog index page (list of articles with tags)       | P1       |
| 7   | Individual blog post page with syntax highlighting | P1       |
| 8   | Tag filtering on blog index                        | P2       |

### Future / Post-MVP

| Feature                       | Notes                                                          |
| ----------------------------- | -------------------------------------------------------------- |
| Contact form                  | Requires a form backend (e.g. Formspree, Resend).              |
| Social / Open Graph meta tags | Per-page OG images for link previews.                          |
| RSS feed                      | Static XML generated at build time from blog markdown.         |
| Search                        | Client-side full-text search across blog posts (e.g. Fuse.js). |
| Reading progress indicator    | Visual bar on long blog posts.                                 |
| Table of contents             | Auto-generated from headings for long posts.                   |

---

## 4. Architecture

### Directory Structure

```
src/
  components/       # Shared UI components (Nav, ThemeToggle, Tag, etc.)
  layouts/          # Page wrapper layouts (SiteLayout, BlogLayout)
  machines/         # XState machines (themeMachine)
  pages/            # Route-level page components
    Home.tsx
    Gallery.tsx
    GalleryItem.tsx
    Blog.tsx
    BlogPost.tsx
  content/
    gallery/        # Per-project metadata (JSON or TS)
    blog/           # Markdown files (.md) with frontmatter
  styles/           # Global CSS, CSS custom properties (tokens)
  assets/           # Images, fonts (ES-module imported)
design/
  DESIGN_DOCUMENT.md
  example-blog-page.png
```

### Routing

Use **React Router v7** (or TanStack Router v1) for client-side routing.

| Route            | Component         | Notes                 |
| ---------------- | ----------------- | --------------------- |
| `/`              | `Home.tsx`        | About page            |
| `/gallery`       | `Gallery.tsx`     | Project list          |
| `/gallery/:slug` | `GalleryItem.tsx` | Single project detail |
| `/blog`          | `Blog.tsx`        | Article index         |
| `/blog/:slug`    | `BlogPost.tsx`    | Single post           |

All routes are rendered under a `SiteLayout` that provides the global nav and footer.

### State Management

| Concern            | Approach                                                                                                              |
| ------------------ | --------------------------------------------------------------------------------------------------------------------- |
| Theme (light/dark) | XState machine (`themeMachine`) — persists choice to `localStorage`, syncs with `prefers-color-scheme` on first load. |
| Blog/gallery data  | Static — imported from markdown/JSON at build time via Vite. No runtime state needed.                                 |
| Navigation state   | Handled by the router.                                                                                                |

### Data Flow — Blog

```
src/content/blog/*.md
  └─ Vite plugin (vite-plugin-markdown or custom glob import)
       └─ Transforms frontmatter → metadata object + HTML/AST body
            └─ BlogPost.tsx renders body via react-markdown
```

### Data Flow — Gallery

```
src/content/gallery/index.ts   ← typed array of ProjectEntry objects
  └─ Gallery.tsx iterates and renders ProjectCard components
  └─ GalleryItem.tsx renders detail view for a single entry
```

---

## 5. API & Integrations

| Integration               | Purpose                            | Notes                           |
| ------------------------- | ---------------------------------- | ------------------------------- |
| GitHub (external link)    | Gallery items link to repos        | No API call — plain `<a>` links |
| Live demo URLs (external) | Gallery items link to hosted demos | Plain links                     |
| No backend                | Blog and gallery are fully static  | Content lives in the repo       |

### Markdown Pipeline

- **`vite-plugin-md`** or **custom `import.meta.glob`** to load `.md` files.
- **`remark-frontmatter`** + **`remark-parse`** for frontmatter parsing.
- **`react-markdown`** for rendering markdown to React components.
- **`rehype-highlight`** (using highlight.js) for fenced code block syntax highlighting.
- **`remark-gfm`** for GitHub Flavored Markdown (tables, strikethrough, etc.).

### Blog Post Frontmatter Schema

```yaml
---
title: "Post Title"
date: "YYYY-MM-DD"
tags: ["tag1", "tag2"]
description: "One-sentence summary shown on the blog index."
---
```

### Gallery Entry Schema (TypeScript)

```ts
type ProjectEntry = {
  slug: string;
  title: string;
  description: string; // Short teaser (1–2 sentences)
  body: string; // Longer paragraph shown on detail page
  imageUrl: string; // ES-module imported asset path
  imageAlt: string;
  githubUrl?: string;
  liveUrl?: string;
  tags: string[];
};
```

---

## 6. Authentication & Authorization

None required. The site is fully public and read-only. Content is authored locally by Tony and deployed via GitHub Pages on push to `main`.

---

## 7. UI/UX Guidelines

### Design Aesthetic

Minimalistic editorial. Inspired by the provided `example-blog-page.png`. Key principles:

- Generous white space; let content breathe.
- A single neutral typeface for body copy; a slightly contrasting face for headings (or the same at different weights).
- One accent color used sparingly (links, active states, tags).
- No decorative flourishes — structure comes from spacing and typography, not chrome.

### Color Tokens (CSS Custom Properties)

```css
:root {
  --color-bg: #ffffff;
  --color-surface: #f5f5f5;
  --color-border: #e0e0e0;
  --color-text: #1a1a1a;
  --color-text-muted: #6b6b6b;
  --color-accent: #2d6a4f; /* example — to be refined against example-blog-page.png */
  --color-accent-hover: #1b4332;
}

[data-theme="dark"] {
  --color-bg: #111111;
  --color-surface: #1e1e1e;
  --color-border: #2e2e2e;
  --color-text: #e8e8e8;
  --color-text-muted: #9e9e9e;
  --color-accent: #52b788;
  --color-accent-hover: #74c69d;
}
```

> Accent color to be finalized once the example-blog-page.png is inspected in Phase 1.

### Typography

- **Body**: System font stack or a clean serif/sans-serif (e.g. _Inter_, _Lora_, or _Source Serif 4_) — decide in Phase 1.
- **Code**: Monospace system stack or _JetBrains Mono_.
- Base font size: `16px`. Line height: `1.7` for prose.
- Max content width: `72ch` (blog posts), `1100px` (gallery grid).

### Gallery Layout — Magazine Style

Each project is a horizontal card:

```
┌──────────────────────────────────────────────────┐
│  [Hero image, ~40% width]  │  Title              │
│  (alternates left/right    │  Short description  │
│   on successive cards)     │  [GitHub] [Live →]  │
└──────────────────────────────────────────────────┘
```

Clicking the card or a "View project →" link navigates to `/gallery/:slug`.

### Blog Index Layout

Chronological list of posts. Each entry shows: title, date, tags, and description. Tag pills are clickable to filter the list.

### Responsive Strategy

| Breakpoint              | Behaviour                                                                                   |
| ----------------------- | ------------------------------------------------------------------------------------------- |
| `< 640px` (mobile)      | Single-column. Gallery cards stack vertically. Nav collapses to hamburger or stacked links. |
| `640px–1024px` (tablet) | Gallery cards remain single-column but wider.                                               |
| `> 1024px` (desktop)    | Gallery two-column magazine layout. Blog posts capped at `72ch`.                            |

### Accessibility

- All interactive elements have visible focus rings.
- Images have descriptive `alt` text.
- Color contrast meets WCAG AA (4.5:1 for body text).
- Theme toggle announces state change via `aria-label`.
- Semantic HTML throughout (`<nav>`, `<main>`, `<article>`, `<aside>`, `<header>`, `<footer>`).

---

## 8. Phase Plan

### Phase 0 — Clean Slate

- Run `npm run remove-template-examples` to remove hello-world boilerplate.
- Verify dev server still starts cleanly.
- Commit: `chore: remove template examples`.

### Phase 1 — Core Layout & About Page

Deliverables:

- `SiteLayout` component (global nav, footer).
- `ThemeToggle` component + `themeMachine` (XState).
- CSS custom property token system (light + dark themes).
- `Home.tsx` — bio paragraph, skills list, interests section.
- Routing setup (React Router or TanStack Router) with placeholder routes for Gallery and Blog.
- Responsive nav bar with Tony's name/logo and page links.

### Phase 2 — Gallery

Deliverables:

- `ProjectEntry` type and seed data for 2–3 initial projects.
- `Gallery.tsx` — magazine-style alternating hero cards.
- `GalleryItem.tsx` — full detail page (larger image, full description, links).
- Asset imports for project images.

### Phase 3 — Blog

Deliverables:

- Markdown pipeline configured (glob imports + frontmatter parsing).
- `Blog.tsx` — article index with tag filter.
- `BlogPost.tsx` — rendered markdown with syntax highlighting.
- First blog post authored as proof-of-concept.

### Phase 4 — Polish & Launch

Deliverables:

- SEO meta tags (`<title>`, `<meta description>`) per page.
- Open Graph tags for link previews.
- Accessibility audit and fixes.
- Lighthouse ≥ 90 on all categories.
- Final copy review and content pass.
- Deploy to GitHub Pages via existing CI/CD.

---

## 9. Open Questions

| #   | Question                                                                                                                             | Owner | Status                                                    |
| --- | ------------------------------------------------------------------------------------------------------------------------------------ | ----- | --------------------------------------------------------- |
| 1   | What accent color and typeface best match `example-blog-page.png`?                                                                   | Tony  | Resolve in Phase 1 by inspecting the example image.       |
| 2   | Which router — React Router v7 or TanStack Router v1? Check `package.json` after `remove-template-examples` to see what's installed. | Dev   | Resolve in Phase 1.                                       |
| 3   | Should gallery items have their own `.md` files (richer body copy) or stay as TypeScript data?                                       | Tony  | Markdown files are more flexible for longer descriptions. |
| 4   | Will a contact link (email `mailto:`) be sufficient, or is a contact form needed at launch?                                          | Tony  | Post-MVP for now.                                         |
| 5   | Should the `/gallery/:slug` detail page re-use the same image or support a gallery of multiple images?                               | Tony  | Assumed single image at MVP.                              |
