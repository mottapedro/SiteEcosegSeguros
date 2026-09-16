# M1 — Public Governed Experience

**Incremento:** M1_PUBLIC_GOVERNED_EXPERIENCE  
**Estado:** Approved for Specification  
**Implementação:** Não autorizada

## Objetivo

Transformar o vertical slice de homologação em primeira experiência pública governada, preservando a arquitetura já validada.

## Cadeia de autoridade

Miro Discovery → Brand Authority → VV-M0 Evidence → M1 Requirements → Legal Evidence → Implementation → Validation.

## Escopo

- separar experiência pública de governança interna;
- evoluir a landing para linguagem pública;
- suportar múltiplos tipos de quadro no PresentationDeck;
- integrar somente evidência jurídica validada;
- usar `referenceIds` como vínculo entre apresentação e fonte governada;
- realinhar hierarquia cromática ao ADR-B-003;
- corrigir consistência dos tokens de tema;
- preservar o método consultivo, sem recomendação de produto ou diagnóstico individual no palco.

## Matriz de requisitos

| ID | Requisito | Estado |
|---|---|---|
| M1-R01 | Public × Governance Context Separation | SPECIFIED |
| M1-R02 | Landing Public Experience | PENDING |
| M1-R03 | Presentation Types | PENDING |
| M1-R04 | Governed Legal Evidence | PENDING |
| M1-R05 | Visual Hierarchy / Brand | PENDING |
| M1-R06 | Theme Token Consistency | PENDING |

## Conteúdo jurídico elegível

- MIL-PEN-001 — elegível para integração governada.
- MIL-REM-001 — elegível para integração governada.
- conteúdo jurídico não validado permanece bloqueado.

## Invariantes

```text
ARCHITECTURE_REWRITE=NO
PRODUCT_RECOMMENDATION=BLOCKED
INDIVIDUAL_DIAGNOSIS_ON_STAGE=NO
VIS_001=OPEN
VIS_001_BLOCKS_M1=NO
```
