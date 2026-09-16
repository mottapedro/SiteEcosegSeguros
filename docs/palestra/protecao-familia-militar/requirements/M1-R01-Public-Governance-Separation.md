# M1-R01 — Public × Governance Context Separation

**Incremento:** M1_PUBLIC_GOVERNED_EXPERIENCE  
**Origem:** VV-M0-02  
**Status:** SPECIFIED · SPECIFICATION CLOSED  
**Implementação:** NOT AUTHORIZED

## Requirement

A superfície pública da palestra MUST apresentar exclusivamente informações destinadas ao participante, enquanto metadados de desenvolvimento, homologação, versionamento, governança editorial e gates MUST permanecer disponíveis ao sistema sem serem projetados na experiência pública.

A separação é de exposição, não necessariamente de armazenamento.

## Contextos

```text
Presentation Domain
├── Governance Context
│   ├── version
│   ├── status
│   ├── validation state
│   ├── referenceIds
│   ├── legal gates
│   └── publishing eligibility
└── Public Experience
    ├── ECOSEG
    ├── tema
    ├── público
    ├── narrativa
    ├── conteúdo validado
    ├── fontes apropriadas
    └── próximo passo
```

## Invariante

```text
REMOVE_GOVERNANCE_DATA=NO
HIDE_GOVERNANCE_FROM_PUBLIC_SURFACE=YES
PRESERVE_DOMAIN_METADATA=YES
PRESERVE_PUBLISHABILITY_GATES=YES
```

## Landing

Não devem ser apresentados ao participante: Marco 0, Versão de homologação, versão técnica, status editorial, Primeiro vertical slice, gates de validação e linguagem de ensaio.

A landing deve comunicar identidade ECOSEG, tema, finalidade da conversa, jornada de orientação e acesso à apresentação.

CTA preferencial: **Acompanhar a apresentação**.

## PresentationDeck

O palco não deve projetar versão, DRAFT, Marco, status de homologação ou vocabulário de desenvolvimento. A identificação da ECOSEG permanece.

## Disclaimer

O disclaimer de desenvolvimento deve evoluir para disclaimer público de responsabilidade. Formulação semanticamente admissível:

> Conteúdo informativo. Situações individuais podem depender de condições específicas e devem ser analisadas de forma individualizada.

A redação definitiva permanece sujeita à governança jurídica.

## Critérios de aceitação

1. **AC-01 Landing:** nenhum termo interno definido neste requisito é visível ao participante.
2. **AC-02 Deck:** nenhum metadado de versionamento ou homologação aparece no palco.
3. **AC-03 Governance preservation:** version, status, publishability e referenceIds continuam suportados.
4. **AC-04 Public copy:** landing comunica ECOSEG, tema, finalidade, jornada e acesso sem explicar arquitetura.
5. **AC-05 Disclaimer:** disclaimer público existe e linguagem de desenvolvimento não é visível.
6. **AC-06 Brand Voice:** sem alarmismo, urgência comercial, promessa de direito/cobertura/benefício ou recomendação automática.

## Evidência esperada

```text
M1_R01_PUBLIC_GOVERNANCE_SEPARATION=PASS
LANDING_INTERNAL_METADATA_VISIBLE=NO
DECK_INTERNAL_METADATA_VISIBLE=NO
VERSION_METADATA_PRESERVED=YES
STATUS_METADATA_PRESERVED=YES
PUBLISHABILITY_GATE_PRESERVED=YES
REFERENCE_IDS_PRESERVED=YES
PUBLIC_ECOSEG_IDENTITY=YES
PUBLIC_PRESENTATION_PURPOSE=YES
PUBLIC_CTA=YES
PUBLIC_DISCLAIMER=YES
DEVELOPMENT_LANGUAGE_LEAKAGE=NONE
```

## Arquivos inicialmente afetados

- `src/app/palestra/protecao-familia-militar/page.tsx`
- `src/components/presentation/presentation-deck.tsx`
- `src/content/presentations/military-family-protection.ts`
- contrato de apresentação somente se estritamente necessário.

## Fora de escopo

Conteúdo jurídico, redesign do deck, mudança do sistema de cores, correção de dark theme, VIS-001, produto, lead capture e diagnóstico individual não são autorizados por M1-R01.

## Gate

```text
REQUIREMENT=M1-R01
SOURCE_FINDING=VV-M0-02
REQUIREMENT_STATUS=SPECIFIED
SPECIFICATION=CLOSED
IMPLEMENTATION_AUTHORIZED=NO
NEXT=M1-R02
```
