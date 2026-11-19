# Design

Where design work starts. Decision contracts in `docs/decisions/` own every
rule; this file holds values and points at the contract that owns each element.

## Values

Source: `app/globals.css`. Update this section when that source changes.

| Token | Light | Dark |
| --- | --- | --- |
| `background` | `oklch(1 0 0)` | `oklch(0.145 0 0)` |
| `foreground` | `oklch(0.145 0 0)` | `oklch(0.985 0 0)` |
| `card` | `oklch(1 0 0)` | `oklch(0.205 0 0)` |
| `primary` | `oklch(0.205 0 0)` | `oklch(0.922 0 0)` |
| `primary-foreground` | `oklch(0.985 0 0)` | `oklch(0.205 0 0)` |
| `secondary` | `oklch(0.97 0 0)` | `oklch(0.269 0 0)` |
| `muted` | `oklch(0.97 0 0)` | `oklch(0.269 0 0)` |
| `muted-foreground` | `oklch(0.556 0 0)` | `oklch(0.708 0 0)` |
| `accent` | `oklch(0.97 0 0)` | `oklch(0.269 0 0)` |
| `destructive` | `oklch(0.577 0.245 27.325)` | `oklch(0.704 0.191 22.216)` |
| `border` | `oklch(0.922 0 0)` | `oklch(1 0 0 / 10%)` |
| `input` | `oklch(0.922 0 0)` | `oklch(1 0 0 / 15%)` |
| `ring` | `oklch(0.708 0 0)` | `oklch(0.556 0 0)` |

Radius: `--radius` `0.625rem`.

## Components

Source: `components/ui/`. Update this section when it changes.

- `Button`
- `Card`
- `Input`
- `Label`

## Rejected patterns

- Per-screen color overrides instead of semantic tokens → [ui-composition](docs/decisions/ui-composition.md)
- Hand-made markup for UI that shadcn already provides → [ui-composition](docs/decisions/ui-composition.md)
- Light/dark theme toggle → [visual-identity](docs/decisions/visual-identity.md)
- Colors outside the red, cream, maroon, ink families → [visual-identity](docs/decisions/visual-identity.md)
- Faux-bold Gloock or other typefaces → [visual-identity](docs/decisions/visual-identity.md)
- Tilted stamps → [visual-identity](docs/decisions/visual-identity.md)
- Ticket, perforated, or envelope-shaped buttons → [visual-identity](docs/decisions/visual-identity.md)
- Emoji padlocks → [visual-identity](docs/decisions/visual-identity.md)
- More than one way back to the first screen on a screen → [visual-identity](docs/decisions/visual-identity.md)

## Map

- Page shell, layout width, and responsive stacking → [ui-composition](docs/decisions/ui-composition.md)
- Loading, empty, error, and disabled states → [ui-composition](docs/decisions/ui-composition.md)
- Inputs, dialogs, tabs, and toasts → [ui-composition](docs/decisions/ui-composition.md)
- Color palette and paper grain → [visual-identity](docs/decisions/visual-identity.md)
- Typefaces → [visual-identity](docs/decisions/visual-identity.md)
- Sheep illustration → [visual-identity](docs/decisions/visual-identity.md)
- Stamps and postmarks → [visual-identity](docs/decisions/visual-identity.md)
- Postcard back and reply card → [visual-identity](docs/decisions/visual-identity.md)
- Locked (private) postcard and wax seal → [visual-identity](docs/decisions/visual-identity.md)
- Primary and destructive action buttons → [visual-identity](docs/decisions/visual-identity.md)
- Letter-pile navigation → [visual-identity](docs/decisions/visual-identity.md)
- Back navigation (`←`) → [visual-identity](docs/decisions/visual-identity.md)
- Vertical placement on sparse screens → [visual-identity](docs/decisions/visual-identity.md)
- Interaction animation and reduced motion → [visual-identity](docs/decisions/visual-identity.md)
