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
- `app/components/` — Shared components (`Navbar`, `NavItem`, `ThemeSwitcher`)
- `app/welcome/` — Welcome/hero section component (dual mobile/desktop layouts)
- `app/context/` — React context providers (`ThemeContext` with blue/pink/green/yellow themes)
- `app/assets/` — SVG blobs and other static assets
- `app/data/` — Lottie animation JSON (cat animations per theme: `cat.json`, `cat-pink.json`, `cat-green.json`, `cat-yellow.json`)
- `app/app.css` — Global styles with Tailwind `@theme` directive, custom color palette, CSS keyframe animations

### Path Alias

`~/` maps to `./app/` (configured in tsconfig.json, resolved by vite-tsconfig-paths).

### Styling

Tailwind CSS v4 with custom theme in `app/app.css`:
- Custom color scale: `dark-blue-50` through `dark-blue-950`
- Theme CSS variables: `--theme-primary`, `--theme-text`, `--theme-text-light`, `--theme-button`, `--theme-button-hover`, `--theme-muted`, `--theme-credit`, `--theme-blob-opacity` — set per `[data-theme]`
- Tailwind utility colors: `theme-primary`, `theme-text`, `theme-text-light`, `theme-button`, etc.
- Font families: `--font-sans` (Merriweather serif), `--font-merriweather-sans` (Merriweather Sans)

### Mobile vs Desktop Layout

The home page (`app/welcome/welcome.tsx`) uses **two completely separate layout blocks** toggled via `md:hidden` / `hidden md:flex`:

**Mobile** (`md:hidden`):
- CSS Grid layout: `grid-cols-[1fr_auto] grid-rows-[auto_1fr]`
- Left column: title, description list (4 items), CTA button — all using theme colors
- Right column: string (vertical line) + ball (circle button, triggers mobile nav)
- Bottom-right: Lottie cat animation (30rem wide, bleeds off-screen)
- Ball click opens nav overlay: dark backdrop (theme-primary/85) with fade + white blurred header (11.4375rem) with slide-down animation
- Ball drops with bounce keyframe animation on open, slides back up on close
- Nav links rendered inline (not using `Navbar` component) with `NavLink` for active state

**Desktop** (`hidden md:flex`):
- 3x3 CSS Grid with string+ball centered top, Lottie cat center, descriptors around edges
- `Navbar` component used for desktop nav (horizontal link row)
- Ball click triggers pendulum sway animation (2s, dampened oscillation from top pivot)
- String+ball container at z-20 (above grid at z-10) to remain clickable

### CSS Animations (in `app/app.css`)

- `animate-pendulum` — Desktop ball sway, `transform-origin: top center`, 2s ease-out
- `animate-bounce-drop` — Mobile ball drop with bounce (2s), settles at `translateY(150px)`
- `animate-bounce-drop-up` — Mobile ball return, 0.3s ease-in back to origin
- `animate-nav-slide` — Mobile nav header slides down from `-100%`, 0.4s
- `animate-nav-overlay` — Mobile nav dark backdrop fade-in, 0.3s

### ThemeSwitcher

- Mobile: fixed bottom-left, horizontal row, 25px dots, 15px gap
- Desktop: fixed bottom-right, vertical column, 40px dots, 12px gap
- Responsive switch at `md:` breakpoint

### Vite Plugins

Plugins in `vite.config.ts`: tailwindcss, reactRouter, tsconfigPaths, svgr (for importing SVGs as React components).
