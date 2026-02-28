# Testing Strategy

This document outlines the recommended testing approach for this portfolio site. No tests are implemented yet — this is a living strategy doc to guide future test authoring.

---

## Recommended Stack

| Layer | Tool | Purpose |
|-------|------|---------|
| Unit / Component | [Vitest](https://vitest.dev/) | Native Vite integration, TypeScript out of the box |
| Component interaction | [@testing-library/react](https://testing-library.com/docs/react-testing-library/intro/) + [@testing-library/user-event](https://testing-library.com/docs/user-event/intro/) | Render components and simulate user interactions |
| Integration / E2E | [Playwright](https://playwright.dev/) | Full browser happy-path flows |
| Test data — fake values | [@faker-js/faker](https://fakerjs.dev/) | Generate realistic strings, URLs, colors, etc. |
| Test data — factories | [rosie](https://github.com/rosiejs/rosie) | FactoryBot-style object factories for `TProject` and similar shapes |

### Installation (when ready)

```bash
# Unit + component testing
npm install --save-dev vitest @testing-library/react @testing-library/user-event @vitejs/plugin-react jsdom @testing-library/jest-dom

# Test data
npm install --save-dev @faker-js/faker rosie @types/rosie

# E2E
npm install --save-dev @playwright/test
npx playwright install
```

### Config files to create

| File | Purpose |
|------|---------|
| `vitest.config.ts` | Extends `vite.config.ts`, sets `environment: 'jsdom'`, `setupFiles: ['./tests/setup.ts']` |
| `tests/setup.ts` | Imports `@testing-library/jest-dom` matchers |
| `playwright.config.ts` | `baseURL: 'http://localhost:5173'`, test dir `tests/e2e/` |

### npm scripts to add

```json
"test": "vitest",
"test:ui": "vitest --ui",
"test:e2e": "playwright test",
"test:coverage": "vitest --coverage"
```

---

## Unit Tests — Dynamic Components

Priority components to test (all have meaningful interactive state):

### `ThemeSwitcher` (`app/components/ThemeSwitcher.tsx`)

| Test case | What to assert |
|-----------|---------------|
| Renders 4 theme dots | 4 buttons present in the DOM |
| Active dot is highlighted | Button for current theme has active styling |
| Clicking a dot calls `setTheme` | After click, theme context value updates |
| Mobile vs desktop positioning | Correct fixed-position class applied at each breakpoint |

### `InnerNavbar` (`app/components/InnerNavbar.tsx`)

| Test case | What to assert |
|-----------|---------------|
| Mobile menu is closed by default | Dropdown not in DOM |
| Hamburger click opens menu | Dropdown appears, X icon shown |
| Clicking a nav link closes menu | `isOpen` returns to false |
| `variant="dark"` applies white text classes | `text-white` present on nav elements |
| GitHub icon link present | `<a>` with correct `href` rendered |

### `ThemeContext` (`app/context/ThemeContext.tsx`)

| Test case | What to assert |
|-----------|---------------|
| Default theme is `blue` | Initial context value is `"blue"` |
| `setTheme("pink")` updates context | Consumers re-render with new theme |

### `ProjectCard` (`app/components/ProjectCard.tsx`)

| Test case | What to assert |
|-----------|---------------|
| Renders title and description | Text content visible |
| Renders tags as `TechTag` components | Each tag in DOM |
| Renders icon when `iconPath` provided | `<img>` with correct `src` |
| Hides icon when `iconPath` is empty string | No `<img>` in DOM |

---

## Unit Tests — `/scripts` (heavy coverage priority)

Scripts currently execute logic at the top level. A light refactor to **export pure functions** will make them independently testable without running the full script.

### `scripts/fetch-notion.ts`

**Functions to extract and export:**

```ts
export function getNotionProperty(property: PageObjectResponse["properties"][string]): string | string[] | undefined
export function slugify(text: string): string
export function buildIconPath(coverUrl: string, titleSlug: string): string
```

**Test cases:**

| Function | Input | Expected output |
|----------|-------|----------------|
| `getNotionProperty` | `{ type: "title", title: [{ plain_text: "Hello" }] }` | `"Hello"` |
| `getNotionProperty` | `{ type: "multi_select", multi_select: [{ name: "React" }, { name: "TS" }] }` | `["React", "TS"]` |
| `getNotionProperty` | empty array value | `undefined` |
| `slugify` | `"Hello World!"` | `"hello-world"` |
| `slugify` | `"GraphQL & REST"` | `"graphql--rest"` |
| `buildIconPath` | valid URL + slug | `/images/projects/my-project.png` |

### `scripts/fetch-capacities.ts`

**Functions to extract and export:**

```ts
export function validatePortfolioItem(item: unknown): { valid: boolean; errors: string[] }
```

**Test cases using Rosie + Faker:**

```ts
// tests/factories/project.factory.ts
import { Factory } from 'rosie';
import { faker } from '@faker-js/faker';

Factory.define('project')
  .attr('title', () => faker.commerce.productName())
  .attr('slug', () => faker.helpers.slugify(faker.commerce.productName()).toLowerCase())
  .attr('description', () => faker.lorem.sentence())
  .attr('tags', () => [faker.word.noun(), faker.word.noun()])
  .attr('color', () => faker.color.rgb())
  .attr('content', () => faker.lorem.paragraphs(3))
  .attr('iconPath', () => `/images/projects/${faker.system.fileName()}`);
```

| Test case | Setup | Expected |
|-----------|-------|---------|
| Valid item passes | `Factory.build('project')` | `{ valid: true, errors: [] }` |
| Missing `slug` fails | `Factory.build('project', { slug: undefined })` | `valid: false`, errors include `"slug"` |
| Missing `title` fails | `Factory.build('project', { title: "" })` | `valid: false` |
| Invalid `tags` (not array) | `Factory.build('project', { tags: "React" })` | `valid: false` |

---

## Integration / E2E Tests (Playwright)

Happy-path flows in `tests/e2e/`:

### `home.spec.ts`
- Home page loads without errors
- All 4 theme dots visible
- Clicking each theme dot changes `data-theme` attribute on `<html>`
- Desktop nav links visible; mobile hamburger shown on narrow viewport

### `projects.spec.ts`
- Navigate to `/projects` — project cards render
- Each card shows title, description, and at least one tag
- Clicking a card navigates to `/projects/:slug`

### `project-detail.spec.ts`
- Navigate to a known project URL
- Hero section renders with colored background
- **Project icon is visible and not hidden behind hero** (validates the z-index fix)
- TOC renders for projects with headings
- Markdown content renders in the right column

### `navigation.spec.ts`
- Clicking "home" nav link navigates to `/`
- Clicking "about" navigates to `/about`
- Clicking "projects" navigates to `/projects`
- Active nav item has bottom border on desktop
- GitHub icon link has correct `href` and `target="_blank"`

---

## File Structure (when implemented)

```
tests/
├── setup.ts                          # jest-dom matchers
├── factories/
│   └── project.factory.ts            # Rosie + Faker factory
├── unit/
│   ├── ThemeSwitcher.test.tsx
│   ├── InnerNavbar.test.tsx
│   ├── ThemeContext.test.tsx
│   ├── ProjectCard.test.tsx
│   └── scripts/
│       ├── fetch-notion.test.ts
│       └── fetch-capacities.test.ts
└── e2e/
    ├── home.spec.ts
    ├── projects.spec.ts
    ├── project-detail.spec.ts
    └── navigation.spec.ts
vitest.config.ts
playwright.config.ts
```
