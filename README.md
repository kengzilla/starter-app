# Starter App

Angular 21 web app starter. No Ionic, no Capacitor — pure Angular for the browser.

## Stack

- Angular 21 (standalone components)
- Angular Router (lazy-loaded feature routes)
- Angular Reactive Forms (add per feature)
- Angular HttpClient (`provideHttpClient` in `app.config.ts`)
- **Global theme:** plain CSS variables in `src/theme/tokens.css` (no Tailwind)
- TypeScript 5.9 (strict mode)
- Vitest (unit tests via `ng test`)
- ESLint (`angular-eslint`) with `app` / `me-*` selector rules and basic layer import rules for `core` / `shared`

## Project Structure

```
src/
├── app/
│   ├── core/           Global infrastructure — guards, interceptors, services, models (see README inside)
│   ├── shared/         Reusable UI (`me-*`), directives, pipes, utils
│   ├── features/       Business domains — one folder per feature (`home` is a minimal shell only)
│   ├── layout/         Shell with header and child `router-outlet`
│   ├── app.ts          Root component
│   ├── app.config.ts   Bootstrap
│   └── app.routes.ts   Top-level routes (lazy layout + feature routes)
├── theme/
│   └── tokens.css      Design tokens (colors, spacing, typography)
└── environments/       `environment.ts` / `environment.prod.ts` (`apiUrl`, etc.)
```

## Layer Rules

```
features/   ← safe to modify per feature
shared/     ← request via catalog before adding new primitives (see shared/components/README.md)
core/       ← tech lead review for app-wide changes
```

- Features must not import from other features (enforce further with `eslint-plugin-boundaries` if needed).
- `shared` and `core` must not import from `features` (ESLint `no-restricted-imports` patterns).

## Getting Started

```bash
npm install
ng serve
```

App runs at `http://localhost:4200` and redirects to **`/home`** (placeholder shell).

## Proxy (development)

`proxy.config.ts` forwards `/api` → `http://localhost:8080`. Use empty `apiUrl` in `environment.ts` so calls can target `/api/...` during `ng serve`.

## Run Tests

```bash
ng test
```

## Lint

```bash
ng lint
```

## Build

```bash
ng build
```

Output: `dist/starterapp/`. Production build replaces `environment.ts` with `environment.prod.ts`.

## Adding a New Feature

1. Create `src/app/features/your-feature/`
2. Add `your-feature.routes.ts` exporting a `Routes` array
3. Lazy-load it from `app.routes.ts` (under the main layout `children`)
4. Add pages under `features/your-feature/pages/`

No auth example ships in this repo; add `features/auth` when you are ready.

## Shared Components

See [src/app/shared/components/README.md](src/app/shared/components/README.md). **`me-button`** is implemented; other rows are planned.
