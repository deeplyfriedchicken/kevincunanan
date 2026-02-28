# AGENTS.md

This file provides guidance for AI agents (and contributors) working in this repository.

## Changesets

This project uses [Changesets](https://github.com/changesets/changesets) to track version changes and generate changelogs.

### Workflow

**Always add a changeset before committing a feature or fix:**

```bash
npm run changeset
```

This prompts you to:
1. Select a bump type:
   - `patch` — bug fix or minor tweak (e.g. CSS adjustment, copy edit)
   - `minor` — new feature or non-breaking addition
   - `major` — breaking change
2. Write a short summary of the change (this becomes the changelog entry)

The command creates a `.changeset/*.md` file — commit this alongside your changes.

### Release Automation

When a changeset-containing branch merges to `main`, the `Release` GitHub Action automatically opens a **"Version Packages"** pull request that:
- Bumps the version in `package.json`
- Updates `CHANGELOG.md` with all accumulated changeset summaries

Merging that PR completes the release.

### PR Bot

The [changeset-bot](https://github.com/apps/changeset-bot) is installed on this repo and will comment on PRs that are missing a changeset file, reminding contributors to add one.

## Commands

```bash
npm run dev          # Start dev server with HMR (localhost:5173)
npm run build        # Production build
npm run start        # Run production server (serves from build/)
npm run typecheck    # TypeScript type checking + react-router typegen
npm run changeset    # Add a changeset for the current change
npm run version      # Apply pending changesets (bump versions + update CHANGELOG)
npm run release      # Publish (not used for this site — reserved for future npm packages)
```
