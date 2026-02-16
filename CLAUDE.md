# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev          # Start dev server with HMR (localhost:5173)
npm run build        # Production build
npm run start        # Run production server (serves from build/)
npm run typecheck    # TypeScript type checking + react-router typegen
```

No test runner or lint CLI script is configured. Biome is used for linting/formatting via VS Code extension with auto-fix on save.

## Architecture

Personal portfolio site built with React Router 7 (SSR enabled), React 19, Vite, TypeScript, and Tailwind CSS v4.

### Key Structure

- `app/root.tsx` — Root layout with HTML shell, error boundary, Google Fonts (Merriweather/Merriweather Sans)
- `app/routes.ts` — Route definitions using `@react-router/fs-routes` pattern (currently single index route)
- `app/routes/` — Route components (e.g., `home.tsx`)
- `app/components/` — Shared components (`Navbar`, `NavItem`)
- `app/welcome/` — Welcome/hero section component
- `app/assets/` — SVG blobs and other static assets
- `app/data/` — Lottie animation JSON
- `app/app.css` — Global styles with Tailwind `@theme` directive defining custom `dark-blue` color palette and font families

### Path Alias

`~/` maps to `./app/` (configured in tsconfig.json, resolved by vite-tsconfig-paths).

### Styling

Tailwind CSS v4 with custom theme in `app/app.css`:
- Custom color scale: `dark-blue-50` through `dark-blue-950`
- Font families: `--font-sans` (Merriweather serif), `--font-merriweather-sans` (Merriweather Sans)

### Vite Plugins

Plugins in `vite.config.ts`: tailwindcss, reactRouter, tsconfigPaths, svgr (for importing SVGs as React components).
