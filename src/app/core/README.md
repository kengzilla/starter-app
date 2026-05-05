# `core/`

Global infrastructure: guards, interceptors, app-wide services, shared models.

- **Rules:** `core` must not import from `features/`, `shared/`, or `integration/` (see ESLint when layer rules are enabled).
- **HTTP:** Prefer a small `ApiService` (or equivalent) here for base URL and error mapping; feature services call it.

Add subfolders as needed: `guards/`, `interceptors/`, `services/`, `models/`.
