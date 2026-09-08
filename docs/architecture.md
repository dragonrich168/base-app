# Architecture

base-app follows a simple, layered architecture that keeps HTTP concerns
separate from domain logic. The goal is a template you can grow without the
layers turning into a tangle.

## Request flow

```
Client
  └─> Express app (app.ts)
       ├─ helmet        security headers
       ├─ cors          cross-origin policy
       ├─ express.json  body parsing
       ├─ requestId     x-request-id correlation
       ├─ requestLogger per-request structured log
       └─ /api/v1 router
            └─ resource router (e.g. items)
                 ├─ validate   zod body/query/params
                 ├─ controller thin request→response mapping
                 └─ service    business logic + errors
```

## Layer responsibilities

| Layer | Responsibility | Where |
| ----- | -------------- | ----- |
| Config | Validate and own all environment settings | `src/config` |
| Middleware | Cross-cutting concerns (logging, validation, errors) | `src/middleware` |
| Routes | Mount handlers and their validation | `src/routes` |
| Controllers | Map HTTP requests to service calls and shape responses | `src/controllers` |
| Services | Own business rules and orchestration | `src/services` |
| Data | Persistence; `InMemoryStore` is swappable for a real DB | `src/data` |
| Utils | Framework-agnostic helpers | `src/utils` |

## Design decisions

- **Validation at the edge** — every external input is parsed with zod before
  it reaches a handler, so controllers never trust raw request data.
- **Services own errors** — domain operations throw `ApiError` with an HTTP
  status; controllers stay thin and the central error handler formats them.
- **Config is centralized** — nothing reads `process.env` outside
  `src/config/env.ts`, keeping the rest of the app testable.
- **In-memory by default** — `InMemoryStore` lets the base app run with zero
  infrastructure. To add persistence, back the same service API with a real
  store rather than touching the HTTP layer.
