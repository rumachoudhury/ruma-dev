# Ruma Choudhury: Portfolio

A 3D portfolio built with **Next.js (App Router)**, **React**, **TypeScript** and **three.js**.

- 3D WebGL hero: a floating stack of glass layers (Browser, API, Database, Tests) with data packets travelling through it
- CSS 3D project cards that tilt toward the cursor, a rotating 3D tech ring, and a spinning 3D cube
- Light and dark mode, scroll-reveal animations, and full `prefers-reduced-motion` support

## Run it in VS Code

1. Install [Node.js](https://nodejs.org) 20 or newer.
2. Open this folder in VS Code (`File > Open Folder`, or run `code .` inside it).
3. Open the terminal (`Ctrl+` ` or `View > Terminal`) and run:

```bash
npm install
npm run dev
```

4. Open http://localhost:3000. The page reloads every time you save a file.

Other commands:

```bash
npm run build       # production build
npm run start       # serve the production build
npm run typecheck   # check TypeScript without building
```

## Where to edit things

Most changes are in `src/data`, so you rarely need to touch the components.

| I want to change...                      | Edit this file                  |
| ---------------------------------------- | ------------------------------- |
| Name, email, LinkedIn, availability text | `src/data/profile.ts`           |
| Projects (featured cards, "More projects") | `src/data/projects.ts`        |
| The 3D tech ring and skills lists        | `src/data/skills.ts`            |
| About text                               | `src/components/About.tsx`      |
| Colors, fonts, spacing, animations       | `src/app/globals.css` (`:root` at the top) |
| The 3D hero scene                        | `src/components/HeroScene.tsx`  |

### Add a real screenshot to a project card

The card visuals in `src/components/visuals.tsx` are stylized illustrations. To use a real screenshot, put the image in `public/` (for example `public/bright-path.png`) and replace the visual in `ProjectCard.tsx` with:

```tsx
import Image from "next/image";
<Image src="/bright-path.png" alt="Bright Path Therapy screenshot" width={800} height={600} />
```

## Project structure

```
src/
  app/
    layout.tsx        page shell, fonts, theme script
    page.tsx          puts the sections together
    globals.css       all styles and design tokens
    icon.svg          favicon
  components/
    Header.tsx  Hero.tsx  HeroScene.tsx  Projects.tsx  ProjectCard.tsx
    visuals.tsx  StackRing.tsx  About.tsx  Contact.tsx
    Reveal.tsx  ScrollProgress.tsx  ThemeToggle.tsx
  data/               profile, projects and skills content
  hooks/              useRevealOnce, useActiveSection, cssVars
```

## Deploy

Push the folder to GitHub, then import the repo on [Vercel](https://vercel.com) or [Netlify](https://netlify.com). Both detect Next.js automatically, so no settings are needed.

## Notes

- `three` is pinned to `0.128.0` on purpose. Newer versions of three.js use different light units, so the hero would need its light intensities retuned before you upgrade.
- Fonts (Outfit and DM Sans) load from Google Fonts in `src/app/layout.tsx`, so the first load needs an internet connection.
- If a visitor's browser doesn't support WebGL, the 3D hero is hidden and the rest of the page still works.
