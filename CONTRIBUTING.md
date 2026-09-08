# Contributing

Thanks for your interest in base-app! We build in the open, incrementally.

## Getting started

```bash
npm install
cp .env.example .env
npm run dev
```

## Before you submit

Run the full quality gate — it must pass clean:

```bash
npm run check   # typecheck + lint + test
npm run format  # prettier
```

## Commit conventions

We use [Conventional Commits](https://www.conventionalcommits.org/):

- `feat:` a new capability
- `fix:` a bug fix
- `test:` tests
- `docs:` documentation
- `refactor:` behavior-preserving code change
- `chore:` tooling, deps, build

Keep commits focused and meaningful. Prefer small, reviewable changes that
each describe one coherent step over large bundles.

## Running tests & lint

```bash
npm test
npm run typecheck
npm run lint
```

## Questions

Open an issue for bugs or feature requests. PRs welcome.
