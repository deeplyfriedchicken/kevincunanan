# AGENTS.md

This file provides guidance for AI agents (and contributors) working in this repository.

## Commands

```bash
npm run dev          # Start dev server with HMR (localhost:5173)
npm run build        # Production build
npm run start        # Run production server (serves from build/)
npm run typecheck    # TypeScript type checking + react-router typegen
npm run test         # Run unit tests (Vitest)
npm run test:e2e     # Run E2E tests (Playwright)
```

## Verification

After making changes, always run the following checks:

```bash
npm run lint         # Biome linting (must pass with zero errors)
npm run typecheck    # TypeScript type checking
npm run test         # Unit tests (Vitest)
```

If the changes touch **more than one file**, also run:

```bash
npm run test:e2e     # Playwright E2E tests
```

All checks must pass before considering work complete.

## Testing Paradigms

When writing or modifying tests, follow these principles:

### Test behavior, not implementation
- Assert what the user **sees and experiences**, not internal state
- Use Testing Library queries that reflect how users interact: `getByRole`, `getByText`, `getByLabelText`
- Never assert on state variables (e.g. `isOpen`), CSS class names, or component internals
- Ask: "Would this test break if I refactored the component without changing its behavior?" If yes, the test is too coupled

### Keep tests independent and isolated
- Each test should set up its own state — never depend on the order of other tests
- Use factories (`tests/factories/`) to generate test data rather than hardcoding objects inline
- Shared fixtures live in `tests/fixtures/` — import them, don't copy-paste

### Prefer realistic rendering
- Wrap components in `ThemeProvider` and router context as needed (use the shared `renderWithTheme` helper in `tests/setup.ts`)
- Test components as close to how they're mounted in the real app as possible

### E2E tests are happy-path only
- Playwright tests cover critical user flows, not edge cases
- Edge cases and conditional logic belong in unit tests
- E2E tests should use fixture data from `tests/fixtures/`, not live Notion data

### Shared types
- The `TProject` type lives in `types/notion.ts` and is the single source of truth
- Both `app/` and `scripts/` import from this shared location
- Test factories must match this shape exactly
