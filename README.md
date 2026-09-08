# Base App

A public builder workspace for projects, tasks, notes, and activity.

This repository is **public** so tools like [Guild.xyz](https://guild.xyz) can see the commit history. Only public commits are tracked.

## Stack

- Vite
- React 18
- TypeScript
- Local-first data (browser `localStorage`)

## Run locally

```bash
npm install
npm run dev
```

The dev server binds to `0.0.0.0:5173`.

## Scripts

| Command | What it does |
| --- | --- |
| `npm run dev` | Start the workspace |
| `npm run build` | Typecheck and production build |
| `npm run preview` | Serve the production build |

## Workspace

Open `/app` after launch for:

- Overview stats
- Projects with status and tags
- A four-column task board
- Pinned notes
- Activity log
- JSON export in Settings

Seed data loads on first visit. Reset from Settings to restore it.

## Building in the open

Commits in this repo are authored on the public GitHub repository [dragonrich168/base-app](https://github.com/dragonrich168/base-app). Private repository commits cannot be counted by Guild.xyz.
