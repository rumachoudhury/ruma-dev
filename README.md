# Ruma Choudhury — Developer Portfolio

A modern portfolio built with **Next.js**, **React**, **TypeScript**, and **Three.js**. It showcases my work, experience, and technical skill set in a responsive product-style layout with interactive 3D elements.

## Live

- Portfolio: [ruma-dev.vercel.app](https://ruma-dev.vercel.app/)
- GitHub: [github.com/rumachoudhury/ruma-dev](https://github.com/rumachoudhury/ruma-dev)

## Features

- Interactive 3D WebGL hero scene
- Rotating technology ring and 3D cube visuals
- Tilt-based project cards
- Light and dark mode
- Reveal-on-scroll animations
- Responsive layout for desktop, tablet, and mobile
- Reduced-motion accessibility support
- Graceful fallback when WebGL is unavailable

## Tech stack

- Next.js
- React
- TypeScript
- Three.js
- CSS
- Node.js / npm
- GitHub

## Getting started

### Prerequisites

- Node.js 20+
- npm
- VS Code recommended

### Installation

```bash
git clone https://github.com/rumachoudhury/ruma-dev.git
cd ruma-dev
npm install
npm run dev
```

Then open:

```text
http://localhost:3000
```

## Available scripts

```bash
npm run dev
```
Start the local development server.

```bash
npm run build
```
Create a production build.

```bash
npm run start
```
Run the production build locally.

```bash
npm run typecheck
```
Check TypeScript without building.

## Project structure

```text
src/
├── app/
│   ├── globals.css
│   ├── layout.tsx
│   ├── page.tsx
│   └── icon.svg
├── components/
│   ├── About.tsx
│   ├── Contact.tsx
│   ├── Footer.tsx
│   ├── Header.tsx
│   ├── Hero.tsx
│   ├── HeroScene.tsx
│   ├── ProjectCard.tsx
│   ├── Projects.tsx
│   ├── Reveal.tsx
│   ├── Resume.tsx
│   ├── ScrollProgress.tsx
│   ├── StackRing.tsx
│   ├── ThemeToggle.tsx
│   └── visuals.tsx
├── data/
│   ├── profile.ts
│   ├── projects.ts
│   └── skills.ts
├── hooks/
│   ├── cssVars.ts
│   ├── useActiveSection.ts
│   └── useRevealOnce.ts
└──
```

## Where to edit content

- Profile details: `src/data/profile.ts`
- Projects: `src/data/projects.ts`
- Skills and ring data: `src/data/skills.ts`
- About section: `src/components/About.tsx`
- Styling and design tokens: `src/app/globals.css`
- Hero scene: `src/components/HeroScene.tsx`

## Deployment

This project is set up for easy deployment on **Vercel**. The production deployment is currently live at:

**[ruma-dev.vercel.app](https://ruma-dev.vercel.app/)**

## About me

I’m a full-stack developer focused on building responsive, user-friendly web applications with React, Next.js, TypeScript, and modern backend tools. I enjoy creating polished digital experiences and continuously expanding my technical skill set through practical, product-driven work.

## Connect

- Portfolio: [ruma-dev.vercel.app](https://ruma-dev.vercel.app/)
- GitHub: [github.com/rumachoudhury](https://github.com/rumachoudhury)
- LinkedIn: [linkedin.com/in/ruma-choudhury](https://www.linkedin.com/in/ruma-choudhury)

---

© 2026 Ruma Choudhury
