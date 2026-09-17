# M1 — Public Governed Experience

**Incremento:** M1_PUBLIC_GOVERNED_EXPERIENCE  
**Estado:** Approved for Specification  
**Implementação:** Não autorizada

## Objetivo

Transformar o vertical slice de homologação em primeira experiência pública governada, preservando a arquitetura já validada.

## Cadeia de autoridade

Miro Discovery → Brand Authority → Digital Experience Constitution → VV-M0 Evidence → M1 Requirements → Legal Evidence → Implementation → Validation.

`DES-000 — Digital Experience Constitution` passa a integrar formalmente a cadeia normativa do M1 como ponto constitucional de citação para decisões de experiência digital. Ele não substitui as autoridades de marca, visuais ou de domínio das quais deriva.

## Heritage / Requirement Evolution

O M1 não substitui o backlog mestre do Marco 0. Ele é um incremento de maturidade derivado da implementação e da homologação do primeiro vertical slice previsto pelo M0-001.

```text
ADR-0005 — Evolução da ECOSEG
        ↓
M0-001 — Backlog de Desenvolvimento da Palestra ECOSEG
        ↓
Iterações 0–2 / primeiro vertical slice
        ↓
feat/marco-0-palestra
        ↓
VV-M0 — evidência da implementação real
        ↓
M1_PUBLIC_GOVERNED_EXPERIENCE
        ↓
continuação governada do M0-001
```

**Autoridade histórica:** commit `ba372bce87724b4570d5bc52ccf9917003cb2764`, branch `docs/adr-0005-ecoseg-evolution`.

### Matriz de refinamento

| Origem M0-001 | Evidência posterior | Refinamento M1 |
|---|---|---|
| Iteração 1 / US-M0-001 — página oficial | VV-M0-02 e VV-M0-05 | M1-R01 e M1-R02 |
| Iteração 2 / US-M0-002 e US-M0-003 — modo apresentação | VV-M0-04 | M1-R03 |
| Iteração 3 / US-M0-004 e US-M0-005 — publicação e fontes | MIL-PEN-001 e MIL-REM-001 | M1-R04 |
| Identidade reutilizada pela experiência | BD-001, BD-002, ADR-B-003 e VV-M0-01 | M1-R05 |
| Design tokens existentes | VV-M0-03 | M1-R06 |

### Refinamento explícito de US-M0-001

O M0-001 previa `versão` e `data de revisão` visíveis na página pública. A VV-M0 demonstrou que esses conceitos precisam ser separados:

- **versionamento técnico/editorial interno:** preservado para governança, mas não projetado como metadado de engenharia ao participante;
- **data de revisão jurídica/editorial de uma fonte pública:** pode permanecer visível quando for informação útil para transparência e atualidade do conteúdo.

Esse refinamento é governado por M1-R01 e deve ser respeitado por M1-R02.

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
| M1-R02 | Landing Public Experience | SPECIFIED |
| M1-R03 | Presentation Types | PENDING |
| M1-R04 | Governed Legal Evidence | PENDING |
| M1-R05 | Visual Hierarchy / Brand | PENDING |
| M1-R06 | Theme Token Consistency | PENDING |

### M1-R02 — autoridade executável

M1-R02 herda a fronteira Public × Governance fechada por M1-R01 e aplica `DES-000` diretamente à landing pública, especialmente os Artigos I, II, III e VI: clareza antes da persuasão, contexto antes da decisão, compreensão antes da conversão e confiança construída por transparência.

A especificação executável está em:

`docs/palestra/protecao-familia-militar/requirements/M1-R02-Landing-Public-Experience.md`

Sua especificação está fechada; a implementação permanece bloqueada até autorização explícita.

## Conteúdo jurídico elegível

- MIL-PEN-001 — elegível para integração governada.
- MIL-REM-001 — elegível para integração governada.
- conteúdo jurídico não validado permanece bloqueado.

## Invariantes

```text
ARCHITECTURE_REWRITE=NO
M0_001_MASTER_BACKLOG=PRESERVED
M1_PARALLEL_ROADMAP=NO
DES_000_CONSTITUTIONAL_AUTHORITY=ACTIVE
PRODUCT_RECOMMENDATION=BLOCKED
INDIVIDUAL_DIAGNOSIS_ON_STAGE=NO
VIS_001=OPEN
VIS_001_BLOCKS_M1=NO
M1_R02=SPECIFIED
M1_R02_IMPLEMENTATION_AUTHORIZED=NO
```
