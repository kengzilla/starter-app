# Shared components vs PrimeNG

**Default:** use **[PrimeNG](https://primeng.org)** in feature modules. Import standalone directives/components from `primeng/...` (tree-shakable).

**`shared/components/`:** add thin wrappers here only when you need a repeated composition or a team-specific API. Use the normal **`app-`** selector prefix for Angular components (see ESLint).

## Common UI → PrimeNG

| UI need | Element / import | Documentation |
| --- | --- | --- |
| Button | `<p-button />`, `import { Button } from 'primeng/button'` | [Button](https://primeng.org/button) |
| Card | `<p-card>`, `primeng/card` | [Card](https://primeng.org/card) |
| Chip | `p-chip`, `primeng/chip` | [Chip](https://primeng.org/chip) |
| Input + label | Float label, `p-inputtext`, messages | [InputText](https://primeng.org/inputtext), [FloatLabel](https://primeng.org/floatlabel) |

Request a design review before adding new wrappers to this folder.
