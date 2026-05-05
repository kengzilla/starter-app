# `shared/`

Reusable UI (`me-*` primitives), directives, pipes, validators.

- **Rules:** No feature-specific business logic. Prefer `@Input()` / `@Output()` only on primitives. Do not import from `features/`.
- **Catalog:** See `components/README.md` for planned and shipped `me-*` components.

## Importing

```typescript
import { MeButtonComponent } from './components';
```
