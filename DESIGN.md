# Design

Where design work starts. Decision contracts in `docs/decisions/` own every
rule; this file holds values and points at the contract that owns each element.

## Values

Source: `app/globals.css`. Update this section when that source changes.

One look only, no dark theme.

| Token | Value |
| --- | --- |
| `background` | `#1d1816` (ink table) |
| `foreground` | `#f3ece0` |
| `card` | `#f8f1e4` (cream paper) |
| `card-foreground` | `#1d1816` |
| `primary` | `#c8322b` (vermilion red) |
| `primary-foreground` | `#f8f1e4` |
| `secondary` | `#2a2320` |
| `muted` | `#2c2522` |
| `muted-foreground` | `#a89a8c` |
| `accent` | `#2f5bd3` (small ornaments only) |
| `destructive` | `#e0574f` |
| `border` | `#3a312d` |
| `input` | `#d6c8b3` |
| `ring` | `rgb(200 50 43 / 45%)` |
| `maroon` / `cream` / `ink` / `pink` | `#5b2219` / `#f3ead9` / `#1d1816` / `#f2a7b9` |

Fonts: Gloock (`--font-gloock`, Latin and numerals) and Pretendard (Hangul and body).
Core surfaces (stamps, postcards, envelopes, postbox, letter pile) live in `app/postcard.css`.

Radius: `--radius` `0.375rem`.

## Components

Source: `components/ui/`. Update this section when it changes.

- `AlertDialog`
- `Button` (adds `postal`, `postal-secondary`, `postal-danger` variants)
- `Card`
- `Input`
- `Label`
- `Sonner` (toasts)
- `Tabs`

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
