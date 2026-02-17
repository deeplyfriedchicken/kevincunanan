# Portfolio Build-Out Progress — 2026-02-16

## Figma Analysis
- Used Figma API with token `figd_gfZpP2oQlfNSItMGhQ0uz-wkSD1G1JDcf6_GyW54` to extract design data
- File ID: `5Rm7fTIGAcbXKp8aYcVv5S`
- Extracted all text content, colors, layout structure, and theme variants

## Theme Color Map (from Figma)

| Token | Blue (default) | Pink | Green | Yellow |
|-------|---------------|------|-------|--------|
| primary | `#32384c` | `#e8b9ab` | `#adbca5` | `#f6d8ae` |
| text | `#32384c` | `#ce9584` | `#adbca5` | `#dba559` |
| button | `#32384c` | `#e8b9ab` | `#adbca5` | `#f2bf78` |
| button-hover | `#202331` | `#ce9584` | `#8fa085` | `#dba559` |
| muted | `#cfcfdf` | `#e5d8d4` | `#d4e3cb` | `#e3dacc` |
| credit | `#2e3445` | `#ce9584` | `#adbca5` | `#dba559` |

Theme switcher dots: `#32384c`, `#e8b9ab`, `#adbca5`, `#f6d8ae`

## Completed

1. **Installed lucide-react** for icons
2. **Theme system**: CSS custom properties in app.css, ThemeContext with localStorage persistence, blocking script to prevent FOUC, ThemeSwitcher component (fixed bottom-right, 4 colored dots)
3. **SVG blobs**: Changed fill to currentColor, rendered inline instead of CSS background-image
4. **Home page updates**: Theme tokens, inline blobs, subtitles around cat ("full stack developer", "react subject matter expert", "maker of cool things", "verified cat enthusiast"), "Los Angeles", nav links updated
5. **Shared components**: InnerNavbar (kev.dev + links), Footer (dark bg + blobs + email CTA), TechTag (pill), ProjectCard (image + info)
6. **Routes**: inner-layout.tsx with InnerNavbar + Outlet + Footer, about.tsx, projects.tsx, resume.tsx
7. **Build verified**: typecheck passes, production build succeeds

## Session 1 - Additional Completions

- Mobile responsive: InnerNavbar has hamburger menu (lucide Menu/X icons)
- ThemeSwitcher: Smaller on mobile (w-8/h-8 vs w-10/h-10)
- Smooth transitions: Global CSS transition on color/bg-color/border-color
- Resume page: Pulled out of inner-layout (own InnerNavbar dark variant, no Footer)
- Routes: inner-layout wraps about + projects only; resume is standalone

## Session 2 - Themed Cat Lottie Animations

- Generated 3 new Lottie JSON variants (`cat-pink.json`, `cat-green.json`, `cat-yellow.json`) via Python script that remaps colors in the original `cat.json`
- Original `cat.json` (blue theme) kept as-is
- Color mapping per variant:

| Original (Blue) | Pink | Green | Yellow | Part |
|---|---|---|---|---|
| `#33394e` | `#ce9584` | `#8fa085` | `#dba559` | Primary body/outline |
| `#282d3c` | `#b87a6a` | `#7a8b70` | `#c49042` | Darker shade |
| `#202331` | `#a06555` | `#65765b` | `#a87830` | Darkest shade |
| `#d9deec` | `#f5e0d8` | `#e2ebda` | `#fbeed8` | Light fill |
| `#b9c1d7` | `#e8c5b8` | `#c8d4be` | `#f2d9b5` | Mid light fill |
| `#9898c1` | `#d49e90` | `#a0b095` | `#e0b878` | Muted accent |
| `#020100` | `#020100` | `#020100` | `#020100` | Black (unchanged) |

- `welcome.tsx` uses `<Lottie key={theme} animationData={catAnimations[theme]} />` to swap animation on theme change
- `key={theme}` forces remount so the Lottie component re-renders with new color data
- Switched from `useLottie` hook to `<Lottie>` component (default import from lottie-react) since `useLottie` doesn't expose `setAnimationData`
- Files: `app/data/cat.json`, `app/data/cat-pink.json`, `app/data/cat-green.json`, `app/data/cat-yellow.json`

## Session 3 - Font Sizing, Blob Fix, Color Readability

### Fluid REM Typography
- Added `font-size: clamp(0.875rem, 0.75rem + 0.357vw, 1.125rem)` on `<html>` — scales base from 14px (320px viewport) to 18px (1440px viewport)
- Converted all hardcoded Tailwind `text-*`, `p-*`, `gap-*`, `w-*`, `h-*` sizing to `rem` units across every component (`[2rem]`, `[1.125rem]`, etc.)
- All sizing now scales proportionally with the fluid base font size

### SVG Blob Clipping Fix
- Root cause: `overflow-hidden` on `<main>` was clipping the absolutely-positioned blobs at the top-right
- Fix: Moved blob container to a `fixed inset-0` wrapper with `overflow-hidden` and `z-0`, independent of the main content flow. Content sits at `z-10` above it.

### WCAG-Accessible Text Colors
- Original Figma colors for pink/green/yellow themes all **failed** WCAG AA (contrast ratios 2.0–2.5:1 on white)
- Darkened all text colors to meet WCAG AA thresholds using HSV value reduction with slight saturation boost
- Added new `--theme-text-light` token for large decorative headings (3:1 threshold — AA large text)
- `--theme-text` used for body text (4.5:1 threshold — AA normal text)

**Updated color map (WCAG-compliant):**

| Token | Blue | Pink | Green | Yellow | Target |
|-------|------|------|-------|--------|--------|
| text | `#32384c` (11.6:1) | `#9a6a5c` (4.6:1) | `#6c7866` (4.7:1) | `#996d30` (4.6:1) | 4.5:1 |
| text-light | `#4b597e` (6.9:1) | `#b28a7e` (3.1:1) | `#8a9883` (3.0:1) | `#a78f6e` (3.1:1) | 3.0:1 |
| button | `#32384c` (11.6:1) | `#b28a7e` (3.1:1) | `#8a9883` (3.0:1) | `#b78c50` (3.1:1) | 3.0:1 |
| muted | `#9393a0` (3.0:1) | `#9b918e` (3.1:1) | `#8c9885` (3.0:1) | `#9a9388` (3.0:1) | 3.0:1 |

- `primary` kept at original Figma values (used for blob fills, not text)

### Files Changed
- `app/app.css` — fluid font-size, updated theme vars, added `text-light` token
- `app/welcome/welcome.tsx` — fixed blob container, rem units, `text-light` for decorative text
- `app/components/InnerNavbar.tsx` — rem units
- `app/components/NavItem.tsx` — rem units
- `app/components/ProjectCard.tsx` — rem units
- `app/components/TechTag.tsx` — rem units
- `app/components/Footer.tsx` — rem units
- `app/routes/about.tsx` — rem units, `text-light` for headings
- `app/routes/projects.tsx` — rem units, `text-light` for heading
- `app/routes/resume.tsx` — rem units

## Session 4 - Blob Visibility Fix (Partial) & Clipping Still Unresolved

### Blob Visibility on Non-Blue Themes — FIXED
- Blobs were invisible on pink/green/yellow themes because of hardcoded `opacity="0.025"` on the `<path>` elements inside both SVGs (`leftBlob.svg`, `rightBlob.svg`)
- Combined with the light primary colors of non-blue themes, effective opacity was too low to see
- Fix: Removed hardcoded `opacity="0.025"` from SVG path elements so fill is pure `currentColor`
- Added `--theme-blob-opacity` CSS custom property per theme, applied via inline `style={{ opacity: "var(--theme-blob-opacity)" }}` on the blob wrapper divs
- Opacity values: blue `0.03`, pink `0.12`, green `0.1`, yellow `0.1`
- Also added `overflow: "visible"` style to SVG components to prevent internal clipping

### Right Blob Clipping on Top-Right — STILL UNRESOLVED
- The right blob SVG (`rightBlob.svg`) is still clipping on the top-right of the home page
- Root cause analysis: The SVG `viewBox="0 0 620 621"` but the actual path coordinates extend far beyond: x ranges from -24 to 1166, y ranges from -557 to 636
- The viewBox crops the rendering to a 620x621 box, cutting off the top and right portions of the blob shape
- `overflow: "visible"` was added to the SVG element but this alone may not be sufficient
- **Possible next steps to try:**
  1. Expand the SVG viewBox to encompass full path bounds (e.g., `viewBox="-25 -558 1200 1200"`)
  2. Or remove viewBox entirely and use CSS sizing to control dimensions
  3. Same analysis may be needed for `leftBlob.svg` (viewBox `0 0 949 1024`, path extends beyond)

### Files Changed
- `app/assets/leftBlob.svg` — removed `opacity="0.025"` from path
- `app/assets/rightBlob.svg` — removed `opacity="0.025"` from path
- `app/app.css` — added `--theme-blob-opacity` per theme
- `app/welcome/welcome.tsx` — blob wrappers use `var(--theme-blob-opacity)`, SVGs get `overflow: "visible"`
- `app/components/Footer.tsx` — SVGs get `overflow: "visible"`

## Session 5 - SSR Hydration Fix, Button Wrapping, Center Line

### SSR "Element type is invalid" & Hydration Mismatch — FIXED
- **Root cause**: Multiple client-only libraries (`lottie-react`, `vite-plugin-svgr` `?react` imports) return module objects instead of components during Vite's dev SSR. `import Lottie from 'lottie-react'` returns `{ LottiePlayer, default, useLottie, ... }` and SVG `?react` imports similarly resolve as objects, not React components. This caused: "Element type is invalid: expected a string or class/function but got: object"
- **Initial attempt**: `React.lazy(() => import("lottie-react"))` with `<Suspense fallback={null}>` — fixed Lottie but SVG imports still broke SSR
- **Final fix**: Disabled SSR entirely by setting `ssr: false` in `react-router.config.ts`. This switches to SPA mode — server sends a minimal HTML shell, all rendering happens on the client. For a portfolio site, SSR provides no real benefit and was the source of all CJS/ESM interop issues.
- Reverted the `React.lazy`/`Suspense` workaround — no longer needed with SPA mode
- Also removed all `localStorage` persistence for theme (blocking script in `<head>` and read/write in `ThemeContext`). Theme resets to blue on page load.
- Added `data-theme="blue"` directly on `<html>` in `root.tsx` so CSS vars apply immediately.
- Simplified `ThemeContext` — state initializes as `"blue"`, single `useEffect` syncs `data-theme` attribute on changes.

### "Check out my work" Button Wrapping — FIXED
- Button text was wrapping badly at smaller browser widths
- Fix: Added `whitespace-nowrap` to the Link className

### Vertical Center Line with Ball — ADDED
- Decorative vertical line running from top of viewport down to above the cat animation
- Absolutely positioned at `left-1/2 -translate-x-1/2`, from `top: 0` to `bottom: calc(50% + 125px)`
- 10px wide rounded bar + 48px circle (ball) at the bottom end
- Uses `bg-theme-text-light` so it adapts to theme changes
- Hidden on mobile (`hidden md:flex`), `pointer-events-none`

### Files Changed
- `react-router.config.ts` — `ssr: false` (SPA mode)
- `app/welcome/welcome.tsx` — direct Lottie import (no lazy/Suspense), whitespace-nowrap on button, vertical center line element
- `app/context/ThemeContext.tsx` — removed localStorage read/write, simplified to plain `useState("blue")`
- `app/root.tsx` — removed blocking theme script, added `data-theme="blue"` on `<html>`

## Remaining / Known Issues

- **BLOB CLIPPING (top-right)**: Still unresolved — see Session 4 notes above
- Project detail pages (user decision to skip for now)

## Key Decisions

- Route stays `/resume` but visually shows "contact" content
- Project detail pages skipped for now
- Using lucide-react for icons
- Layout route pattern: inner pages share InnerNavbar + Footer via inner-layout.tsx
- Home page has standalone layout (no shared navbar)
- **SSR disabled** (`ssr: false`) — SPA mode avoids CJS/ESM interop issues with `lottie-react` and `vite-plugin-svgr`
