# M1-R03 — Presentation Types

**Marco:** M1 — Public Governed Experience  
**Requirement:** M1-R03  
**Status:** SPECIFIED / CLOSED  
**Implementation:** NOT AUTHORIZED  
**Source finding:** VV-M0-04 — apresentação excessivamente uniforme

---

## 1. Purpose

Define an explicit semantic taxonomy for sections of the ECOSEG presentation domain so that the presentation layer can render each narrative function appropriately without moving lecture content, legal rules, editorial decisions, or governance into visual components.

This requirement materializes ECOSEG's governed experience architecture in the lecture channel. It is not merely a layout variation requirement.

## 2. Institutional authority chain

```text
Brand Foundation
      ↓
Brand Decisions — ADR-B-XXX
      ↓
Visual System
      ↓
DES-000 — Digital Experience Constitution
      ↓
M1-R01 — Public × Governance Context Separation
      ↓
M1-R02 — Landing Public Experience
      ↓
M1-R03 — Presentation Types
      ↓
Presentation
```

The lecture is a consumer of ECOSEG identity and experience architecture; it does not create a parallel identity.

Relevant constitutional principles inherited from DES-000:

- Artigo I — Clareza antes da Persuasão.
- Artigo II — Contexto antes da Decisão.
- Artigo III — Compreensão antes da Conversão.
- Artigo IV — Consistência Visual.
- Artigo V — Acessibilidade como Requisito.
- Artigo VI — Confiança Construída por Transparência.

Brand decision records use the authoritative `ADR-B-XXX` naming. The historical `ARC` proposal is superseded.

ADR-B-003 remains authoritative for institutional color roles. M1-R03 does not change color tokens and MUST NOT introduce local hard-coded color workarounds. Visual hierarchy belongs to M1-R05 and theme-token consistency belongs to M1-R06.

## 3. Problem

The Marco 0 presentation domain is effectively uniform:

```text
eyebrow
title
summary
talkingPoints[]
```

This structure makes semantically different moments of the lecture appear structurally equivalent. VV-M0-04 identified the visible symptom; the governed Brand → DES architecture establishes why the presentation must preserve narrative function explicitly.

## 4. Core requirement

The presentation domain MUST declare the narrative function of every section explicitly.

`PresentationDeck` MUST be able to project structures appropriate to that function without owning lecture-specific content, legal interpretation, editorial approval, or publication decisions.

Conceptually:

```text
PresentationSection
    type
    content
    referenceIds[]
```

The exact implementation shape is intentionally deferred to the implementation gate.

## 5. Authorized taxonomy

M1-R03 defines exactly six presentation types:

```text
PresentationSection
│
├── OPENING
├── CONTEXT
├── EVIDENCE
├── EXPLANATION
├── METHOD
└── CTA
```

### 5.1 OPENING

Establishes the opening question, proposition, or human context of the presentation.

It MUST support an opening that does not depend on the generic three-talking-points structure.

### 5.2 CONTEXT

Organizes circumstances and facts needed before a conclusion can be understood.

It MUST NOT imply a recommendation merely because context has been presented.

### 5.3 EVIDENCE

Provides a semantic structure for governed evidence and its traceability.

`EVIDENCE` is a presentation function, not a declaration of legal authority or permission to publish.

```text
PRESENTATION_TYPE ≠ LEGAL_AUTHORITY
PRESENTATION_TYPE ≠ PUBLICATION_PERMISSION
PRESENTATION_TYPE ≠ PRODUCT_RECOMMENDATION
```

Concrete integration of MIL-PEN-001 and MIL-REM-001 belongs to M1-R04.

### 5.4 EXPLANATION

Transforms complexity into accessible comprehension while preserving the distinction between sourced fact and ECOSEG explanation.

It MUST NOT convert interpretation into evidence.

### 5.5 METHOD

Explains the ECOSEG consultative method and may represent the governed sequence:

```text
Ouvir → Compreender → Orientar → Recomendar
```

The method describes how ECOSEG works; it does not itself recommend a product.

### 5.6 CTA

Indicates a concrete next step without pressure or automatic conversion.

For the military-family vertical, the intended progression is conceptually:

```text
palestra → conversa presencial → análise individual
```

It MUST NOT imply:

```text
palestra → contratação automática
```

## 6. Narrative flow

The canonical cognitive progression supported by the taxonomy is:

```text
OPENING
   ↓
CONTEXT
   ↓
EVIDENCE
   ↓
EXPLANATION
   ↓
METHOD
   ↓
CTA
```

This is a narrative model, not a requirement that every future presentation contain exactly one section of each type or always use a rigid six-slide sequence.

It operationalizes the DES-000 principles of context before decision and comprehension before conversion.

## 7. Evidence traceability boundary

M1-R03 preserves `referenceIds[]` as the presentation-domain connection point for governed evidence.

Future integration may produce relationships such as:

```text
EVIDENCE
   ↓
referenceIds[]
   ↓
MIL-PEN-001
MIL-REM-001
```

M1-R03 does not populate those relationships with new legal content and does not alter the legal publication gate.

## 8. Invariants

```text
ONE_PRESENTATION_DOMAIN=YES
ONE_PRESENTATION_DECK_ARCHITECTURE=YES
SECTION_TYPE_EXPLICIT=YES
SECTION_TYPE_DRIVES_PRESENTATION_STRUCTURE=YES
CONTENT_REMAINS_OUTSIDE_VISUAL_COMPONENT=YES
LEGAL_RULES_IN_COMPONENTS=NO
REFERENCE_IDS_PRESERVED=YES
EDITORIAL_STATUS_PRESERVED=YES
PUBLISHABILITY_GATE_PRESERVED=YES
DES_000_CONTEXT_BEFORE_DECISION=YES
DES_000_COMPREHENSION_BEFORE_CONVERSION=YES
PRODUCT_RECOMMENDATION=BLOCKED
LEGAL_CONTENT_INTEGRATION=BLOCKED
IMPLEMENTATION_AUTHORIZED=NO
```

Brand-specific invariants:

```text
BRAND_GOVERNANCE=INHERITED
ADR_NAMING=ADR-B-XXX
ADR-B-003=AUTHORITATIVE
GREEN_PRIMARY=INVARIANT
COLOR_IMPLEMENTATION_CHANGE=OUT_OF_SCOPE
COLOR_HARDCODE_IN_PRESENTATION=FORBIDDEN
VISUAL_CORRECTION_OWNER=M1-R05
TOKEN_CONSISTENCY_OWNER=M1-R06
```

## 9. Acceptance criteria

### AC-01 — Explicit type

Every presentation section MUST declare one authorized M1-R03 type.

### AC-02 — Exhaustive rendering

The future `PresentationDeck` implementation MUST explicitly handle every authorized type. Unknown types MUST NOT silently fall back to a generic presentation structure.

### AC-03 — Semantic differentiation

At minimum `OPENING`, `EVIDENCE`, `METHOD`, and `CTA` MUST be capable of producing semantically different presentation structures. A change limited to color, icon, or decorative styling does not satisfy this criterion.

### AC-04 — Content separation

Lecture-specific text MUST remain outside `PresentationDeck`. Presentation components render domain content; they do not become the content source.

### AC-05 — Governance preservation

Version, editorial status, `referenceIds`, and publishability controls MUST remain domain/governance concerns and MUST NOT be discarded by the presentation-type evolution.

### AC-06 — Legal boundary

Assigning `type=EVIDENCE` MUST NOT automatically qualify content as legally validated or publicly publishable.

### AC-07 — Interaction preservation

The future implementation MUST NOT regress existing Marco 0 presentation capabilities, including keyboard navigation, progress, fullscreen behavior, reduced-motion handling, and isolation from ordinary site chrome.

### AC-08 — DES-000 compliance

No presentation type may introduce persuasion before clarity, decision before context, or a CTA that implies automatic contracting before comprehension and individual analysis.

## 10. Expected future implementation impact

Implementation is not authorized by this requirement.

When a separate implementation gate is approved, expected impact is limited primarily to:

```text
src/contracts/presentation*
src/components/presentation/presentation-deck.tsx
src/content/presentations/military-family-protection.ts
```

Exact file/type locations MUST be verified against the repository at implementation time. Architecture MUST NOT be rewritten merely for convenience.

## 11. Out of scope

```text
MIL_PEN_001_CONTENT_INTEGRATION=NO
MIL_REM_001_CONTENT_INTEGRATION=NO
LEGAL_COPY_CHANGE=NO
LEGAL_PUBLICATION_GATE_CHANGE=NO
LANDING_REDESIGN=NO
CONTACT_DATA_UPDATE=NO
COLOR_SYSTEM_CHANGE=NO
DARK_THEME_FIX=NO
VIS_001_IMPLEMENTATION=NO
PRODUCT_CATALOG=NO
PRODUCT_RECOMMENDATION=NO
LEAD_CAPTURE=NO
INDIVIDUAL_DIAGNOSIS=NO
SAAS_IMPLEMENTATION=NO
```

## 12. Business/narrative input boundary

The validated lecture journey and ECOSEG consultative positioning are legitimate business and narrative inputs to this requirement.

They do not replace legal authority. Legal evidence remains governed by its own source and publication controls.

## 13. Closure

```text
M1-R03=PRESENTATION_TYPES
SOURCE_FINDING=VV-M0-04
DES_000_AUTHORITY=INHERITED
M1_R01_BASELINE=INHERITED
M1_R02_BASELINE=INHERITED
PRESENTATION_TYPE_COUNT=6
OPENING=DEFINED
CONTEXT=DEFINED
EVIDENCE=DEFINED
EXPLANATION=DEFINED
METHOD=DEFINED
CTA=DEFINED
AC_COUNT=8
LEGAL_AUTHORITY_BOUNDARY=PRESERVED
REFERENCE_TRACEABILITY=PRESERVED
MARCO_0_INTERACTION_CAPABILITIES=PRESERVED
IMPLEMENTATION_AUTHORIZED=NO
SPECIFICATION_STATUS=CLOSED
NEXT=M1-R04_GOVERNED_LEGAL_EVIDENCE
```

---

© ECOSEG
