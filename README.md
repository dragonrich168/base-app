# base-app

A production-grade REST API **starter kit** built with **TypeScript**, **Node.js**, and **Express**.
It provides a clean, layered project structure, sensible defaults, and quality tooling out of the box —
so you can focus on shipping your own domain logic instead of wiring up boilerplate.

> This is a living, open-source "base build". It grows incrementally, in public,
> commit by commit.

## Features

- ⚡ **TypeScript** strict mode with build + typecheck scripts
- 🧱 Layered architecture — `config` → `middleware` → `routes` → `controllers` → `services`
- 🔐 Security headers via [`helmet`](https://www.npmjs.com/package/helmet)
- 🌐 Configurable CORS
- ✅ Request validation with [`zod`](https://zod.dev)
- 🧪 Unit/integration tests with [Vitest](https://vitest.dev) + Supertest
- 🔍 Linting & formatting via ESLint + Prettier
- 🚀 Zero-config local dev with hot reload (`tsx watch`)
- 🤖 GitHub Actions CI on every push / PR

## Quick start

```bash
# install dependencies
npm install

# copy the environment template
cp .env.example .env

# run the dev server (hot reload)
npm run dev
```

Then open <http://localhost:3000/api/v1/health> — you should see a healthy JSON response.

## Scripts

| Script               | Description                              |
| -------------------- | ---------------------------------------- |
| `npm run dev`        | Start dev server with hot reload         |
| `npm run build`      | Compile TypeScript to `dist/`            |
| `npm run start`      | Run the compiled server                  |
| `npm run typecheck`  | Type-check without emitting              |
| `npm test`           | Run the test suite                       |
| `npm run lint`       | Lint the source                          |
| `npm run format`     | Auto-format source with Prettier         |
| `npm run check`      | typecheck + lint + test in one go        |

## Project layout

```
src/
├── config/       # environment & app configuration
├── middleware/   # Express middleware (logging, validation, errors)
├── routes/       # route definitions
├── controllers/  # request handlers
├── services/     # business logic
├── utils/        # shared helpers (logger, etc.)
├── types/        # shared TypeScript types
├── app.ts        # Express app assembly
└── index.ts      # server entry point
```

## License

[MIT](./LICENSE)
