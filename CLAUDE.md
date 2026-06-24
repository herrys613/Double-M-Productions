# Double M Productions — Project Guide

> Context file for Claude Code sessions. Read this first.

## Overview

Custom rebuild of the **doublempro.com** website (a music production company:
recording studio, live show production, and an upcoming community event called
"The Music Mingle"). The current live site runs on the **EzyCourse** platform;
this project replaces it with a self-owned React codebase so we control the code
and can plug in our own backend.

## Tech Stack

| Concern       | Choice                                       |
|---------------|----------------------------------------------|
| Framework     | React 18 + TypeScript                        |
| Bundler       | Vite                                         |
| UI components | shadcn/ui (Radix primitives + Tailwind)      |
| Primitives    | Radix UI — `@radix-ui/react-navigation-menu`, `@radix-ui/react-slot` |
| Styling       | Tailwind CSS                                 |
| Routing       | react-router-dom v6                          |
| Animation     | Motion (`motion`) + tailwindcss-animate      |
| Icons         | lucide-react                                 |
| Forms         | react-hook-form + zod                        |
| Backend       | Supabase (Phase 2) — @supabase/supabase-js   |

## Design System — Colors

Dark theme with a warm **amber** accent (recording-studio vibe). Pulled from the
brand mockup: near-black backgrounds, amber primary, muted gray text.

| Token              | Hex       | Role                                          |
|--------------------|-----------|-----------------------------------------------|
| Primary / Accent   | `#F4A62A` | Amber — icons, headings, borders, CTA buttons |
| Primary (deep)     | `#E8941A` | Hover / gradient end of the amber             |
| Background         | `#0A0A0B` | Page background (near-black)                   |
| Card / Surface     | `#161618` | Cards, panels (subtle gradient to `#1C1C1F`)  |
| Border             | `#2A2A2D` | Default card/divider border                   |
| Border (accent)    | `#F4A62A` | Amber border on hover / active cards          |
| Foreground         | `#FAFAFA` | Primary text                                  |
| Muted foreground   | `#A1A1AA` | Body / secondary text                         |
| Faint              | `#52525B` | De-emphasized labels (e.g. "Step #1")         |

### shadcn / Tailwind CSS variables (HSL)

shadcn themes use HSL channels in `src/index.css`. Map the palette to the dark theme:

```css
:root {
  --background: 240 6% 4%;        /* #0A0A0B */
  --foreground: 0 0% 98%;         /* #FAFAFA */
  --card: 240 4% 9%;              /* #161618 */
  --card-foreground: 0 0% 98%;
  --primary: 38 90% 56%;          /* #F4A62A amber */
  --primary-foreground: 240 6% 4%;
  --muted: 240 4% 13%;
  --muted-foreground: 240 4% 65%; /* #A1A1AA */
  --border: 240 4% 17%;           /* #2A2A2D */
  --input: 240 4% 17%;
  --ring: 38 90% 56%;             /* amber focus ring */
  --radius: 0.75rem;
}
```

This is a dark-first design — treat the dark palette above as the default theme.

## Commands

```bash
npm run dev        # start dev server
npm run build      # type-check + production build
npm run lint       # eslint
npm run preview    # preview production build
npx shadcn@latest add <component>   # add a shadcn/ui primitive
```

## Route Map

Clean slugs replace the original EzyCourse paths (`/en/...-temp`).

| Page             | Route (URL)                     | Phase 1 status            |
|------------------|----------------------------------|---------------------------|
| Home / Landing   | `/`                              | Full build                |
| Music Studio     | `/studio`                        | Full build                |
| Book a Session   | `/studio/book`                   | Scaffold + mock form      |
| Audio Library    | `/studio/audio-library`          | Scaffold + mock list      |
| Audio item       | `/studio/audio-library/:slug`    | Scaffold                  |
| Live Shows       | `/live-shows`                    | Full build                |
| Summer Shows     | `/live-shows/summer-shows`       | Scaffold (placeholder)    |
| Concerts         | `/live-shows/concerts`           | Scaffold (placeholder)    |
| The Music Mingle | `/music-mingle`                  | Scaffold ("Coming Soon")  |
| Clients          | `/clients`                       | Scaffold + mock grid      |
| Contact          | `/contact`                       | Full build + mock form    |
| 404              | `*`                              | Full build                |

Primary nav (header + footer): Home · Music Studio · Live Shows · The Music Mingle ·
Contact — defined once in `src/config/site.ts`.

## Folder Structure

```
src/
├── routes/        # createBrowserRouter route tree
├── pages/         # one component per route
├── components/
│   ├── ui/        # shadcn-generated primitives
│   ├── layout/    # RootLayout, Navbar, Footer
│   └── shared/    # cross-page blocks (Hero, SectionHeading, SocialLinks...)
├── features/      # feature-scoped components (studio, audio-library, live-shows, clients)
├── data/          # === the swap-to-Supabase seam ===
│   ├── types.ts   # domain models
│   ├── mock/      # placeholder data
│   └── services/  # service interfaces + mock impls
├── hooks/
├── lib/utils.ts   # shadcn cn() helper
└── config/site.ts # site name, nav links, contact info, socials
```

## Conventions

- **Data-service seam:** Components/hooks import only service *interface instances*
  (e.g. `audioService.list()`), never the mock data directly. To go live in Phase 2,
  swap each mock implementation in `src/data/services/*` for a Supabase one — component
  code stays untouched. Never import from `src/data/mock/*` outside `src/data/services/*`.
- **shadcn/ui** for primitives (button, card, input...). Compose them in `features/`
  and `components/shared/`, not by editing the generated `components/ui/` files.
- **Animation:** use **tailwindcss-animate** (ships with shadcn) for small UI
  transitions — hovers, the mobile menu sheet, accordions. Use **Motion** (`motion`)
  for showcase moments — hero entrance, scroll-reveal sections, staggered grids, page
  transitions. Reach for Motion only where CSS transitions aren't enough.
- **Path alias:** `@/` → `src/`.
- **Mock-first:** all dynamic content (audio tracks, shows, clients, bookings) flows
  through the data layer so it can be backed by Supabase later.

## Site Facts (from the live doublempro.com)

- Phone: +1 (347) 201-1386
- Socials: Twitter @doublempro1, Instagram @double_m_pro, YouTube, Facebook, WhatsApp
- Services: recording/music studio, live show production, audio library, Music Mingle event

## Phase 1 — Frontend (current)

Step 1 (done): static routes — every page in the Route Map exists as a "Coming
Soon" page under `src/pages/`, wired up in `src/App.tsx`.

Step 2 (next): build out each page's real UI, starting from the navbar that's
already in place — Home/Landing, then Music Studio, Live Shows, Contact, etc.

All content stays placeholder/mock so it can be backed by Supabase in Phase 2.

## Phase 2 — Supabase (later)

- Add `@supabase/supabase-js`, a `src/lib/supabase.ts` client, and `.env` with
  `VITE_SUPABASE_URL` / `VITE_SUPABASE_ANON_KEY`.
- Replace mock service implementations with Supabase queries/storage calls.
- Tables to plan: `audio_tracks`, `shows`, `clients`, `bookings`, `contact_messages`.