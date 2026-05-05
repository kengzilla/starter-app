# `shared/`

Thin reusable pieces: optional wrappers around third-party UI, directives, pipes, validators.

- **UI library:** **starter-app** uses **[PrimeNG](https://primeng.org)** for primitives. Import components in **feature** code from `primeng/...` (e.g. `primeng/button`). Add a component under `shared/components/` only when the team needs a stable custom API or repeated composition.
- **Rules:** No feature-specific business logic. Prefer `@Input()` / `@Output()` on wrappers. Do not import from `features/`.
- **Catalog:** See `components/README.md` for a PrimeNG → element map.

## Importing

There is no barrel export for components; import wrapper modules directly from their paths, for example:

```typescript
import { SomethingComponent } from './components/something/something';
```
