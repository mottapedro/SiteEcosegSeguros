# ADR-B-003 — Primary Color Reassignment

**Marca:** EcoSeg Seguros

**Identificador:** ADR-B-003

**Categoria:** Brand Architecture Decision Record

**Status:** Accepted

**Versão:** 1.0

---

## Decision

Green Eco becomes the Institutional Primary Color.

Blue becomes Institutional Secondary.

Amber remains Decision/Alert.

Charcoal remains Structural Neutral.

Cream remains Surface Neutral.

## Context

This supersedes the color-role assignment in `DES-004 §1` (Color Tokens) and `docs/brand/brand-guidelines.md`, both of which had Azul Institucional as `--primary` and Verde Eco as `--accent`. That assignment is not being amended — it is being replaced by this decision.

## Mapping to Implementation Tokens

| Brand Role                    | Token                                                                                              | Value                                                                                                                                                                                                                                                                                                                                                       | Status                                                                       |
| ----------------------------- | -------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------- |
| Institutional Primary         | `--primary`                                                                                        | `#1f7a5c` (Verde Eco light) / `#3fa382` (dark)                                                                                                                                                                                                                                                                                                              | Confirmed — reuses the hex already validated for Verde Eco as accent         |
| Institutional Secondary       | `--secondary`-adjacent role, applied where `--primary` previously governed (buttons, header, hero) | `#0b3d63` (Azul Institucional light) / `#6fa8d6` (dark)                                                                                                                                                                                                                                                                                                     | Confirmed — reuses existing Azul hex, role changes from primary to secondary |
| Decision/Alert                | new token, not previously in the system                                                            | **Not specified.** Proposed provisional value: `#b3823a` (light) / `#d1a05c` (dark) — an amber consistent with the palette's warmth and separated from `--destructive` (error red) and `--accent`. **Requires confirmation before treated as final.**                                                                                                       | Provisional                                                                  |
| Structural Neutral (Charcoal) | `--muted-foreground` / `--border` (already graphite-toned per original "Cinza Grafite" role)       | `#5b6169` (light) / `#98a0a8` (dark) — unchanged                                                                                                                                                                                                                                                                                                            | Confirmed, no new value needed                                               |
| Surface Neutral (Cream)       | `--background` / `--muted`                                                                         | **Not specified as an exact hex.** Current values are near-pure white/near-black (`#ffffff` / `#14181d`), not literally cream. Proposed provisional value: `#faf8f3` (light) — a warm off-white — keeping dark mode unchanged (`#14181d`) since "cream" implies a light-mode warmth, not a dark surface. **Requires confirmation before treated as final.** | Provisional                                                                  |

## Consequences

**Positive**

- Verde Eco, already carrying the "Eco" association in the brand name, becomes the dominant color across buttons, header, and hero — strengthening brand recall.
- Blue is not discarded — it remains institutional, just secondary.

**Negative / Trade-offs**

- Two of five roles (Decision/Alert, Surface Neutral) have no confirmed hex value. Implementing this ADR in code today means shipping provisional values for those two roles. If the provisional values are rejected later, this ADR's own Mapping table must be updated — status is not "fully Accepted at the hex level" until both are confirmed.
- All existing screenshots, exported assets, and any external documentation referencing "blue as primary" (e.g. earlier conversation history, `docs/brand/brand-guidelines.md` before this ADR) become outdated and must be treated as historical, not current.

## Traceability

Supersedes: `DES-004 §1` (Color Tokens table), `docs/brand/brand-guidelines.md` (Tokens section).

Affects: `src/app/globals.css` (implementation — updated in this same change set for the two confirmed roles; Decision/Alert and Surface Neutral implemented provisionally, pending confirmation), `DES-006` (Visual Language, wherever it references "Azul Institucional" as dominant).

Items em aberto:

- Confirmar valor hex definitivo para Decision/Alert (Amber).
- Confirmar valor hex definitivo para Surface Neutral (Cream), incluindo se o modo escuro também deve receber um tom "cream-adjacent" ou permanecer neutro escuro como está.

## References

- DES-004 — Design System (§1, tabela superseded por este documento)
- `docs/brand/brand-guidelines.md`
- `src/app/globals.css` — implementação

---

© EcoSeg Seguros
