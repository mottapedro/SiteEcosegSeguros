# M1-R02 — Landing Public Experience

**Incremento:** M1_PUBLIC_GOVERNED_EXPERIENCE  
**Origem:** VV-M0-05 · M0-001 Iteração 1 / US-M0-001  
**Herança:** M1-R01 — Public × Governance Context Separation  
**Status:** SPECIFIED · SPECIFICATION CLOSED  
**Implementação:** NOT AUTHORIZED

## Objetivo

Evoluir `/palestra/protecao-familia-militar` de uma superfície de homologação para a entrada pública governada da palestra ECOSEG, preservando a arquitetura existente e aplicando a separação Public × Governance já fechada em M1-R01.

A landing MUST preparar o participante para compreender o contexto e a finalidade da conversa antes de solicitar qualquer avanço para o modo apresentação.

## Cadeia de autoridade

```text
ADR-0005 — Evolução da ECOSEG
        ↓
M0-001 — Backlog de Desenvolvimento da Palestra
        ↓
Iteração 1 / US-M0-001 — Página oficial da palestra
        ↓
VV-M0-05 — Landing ainda orientada à homologação
        ↓
M1-R01 — Public × Governance Context Separation
        ↓
DES-000 — Digital Experience Constitution
        ↓
M1-R02 — Landing Public Experience
```

Autoridades de marca e experiência aplicáveis: `BD-001`, `BD-002`, `ADR-B-003` e `DES-000`.

### DES-000 aplicado ao requisito

- **Artigo I — Clareza antes da Persuasão:** a landing explica antes de tentar conduzir; CTAs nomeiam a ação real.
- **Artigo II — Contexto antes da Decisão:** o participante recebe tema, contexto e finalidade antes do CTA principal.
- **Artigo III — Compreensão antes da Conversão:** acessar a apresentação é continuação da compreensão, não mecanismo de pressão comercial.
- **Artigo IV — Consistência Visual:** a landing continua pertencendo ao sistema visual ECOSEG; M1-R02 não cria linguagem visual paralela.
- **Artigo V — Acessibilidade como Requisito:** a estrutura pública deve preservar leitura e navegação compatíveis com o piso WCAG 2.2 AA estabelecido pela constituição.
- **Artigo VI — Confiança Construída por Transparência:** não usar urgência, promessa, medo, prova social artificial ou pressão de conversão.

## Requirement

A rota pública `/palestra/protecao-familia-militar` MUST funcionar como porta de entrada da experiência "Proteção da Família Militar", comunicando de forma clara:

1. identidade ECOSEG;
2. tema da palestra;
3. contexto e finalidade da conversa;
4. jornada de orientação que o participante percorrerá;
5. caráter informativo e individualizável do conteúdo;
6. ação explícita para acompanhar a apresentação.

A página MUST NOT explicar sua arquitetura, estágio de desenvolvimento, homologação, gates internos ou estrutura de software.

## Contrato semântico da landing

```text
LandingPublicExperience
├── BrandIdentity
│   └── ECOSEG
├── LectureIdentity
│   └── Proteção da Família Militar
├── Context
│   ├── direitos e mudanças de contexto
│   ├── expectativas de proteção
│   └── decisões que podem afetar a família
├── OrientationJourney
│   ├── compreender expectativa
│   ├── comparar expectativa e realidade
│   └── identificar próximo passo responsável
├── ResponsibilityNotice
│   └── análise individual pode ser necessária
└── PrimaryAction
    └── Acompanhar a apresentação
```

Esse contrato é semântico. M1-R02 não obriga criação de um novo tipo TypeScript nem alteração do contrato de domínio existente se a implementação atual puder expressá-lo adequadamente.

## Hierarquia pública obrigatória

### 1. Identificação

A primeira área significativa MUST permitir reconhecer imediatamente ECOSEG e o tema **Proteção da Família Militar**.

Não usar `Marco 0`, `M1`, `vertical slice`, `homologação`, `DRAFT`, versão técnica ou status editorial.

### 2. Contexto antes da ação

Antes do CTA principal, a página MUST explicar por que a conversa existe. Intenção semântica admissível:

> Uma conversa sobre direitos, mudanças de contexto e decisões que podem afetar a proteção e o planejamento da família.

A frase é referência de intenção, não copy imutável.

### 3. Jornada de orientação

A landing MUST tornar compreensível que a experiência não começa por produto. A jornada deve representar, no mínimo:

```text
Expectativa da família
        ↓
Compreensão do contexto
        ↓
Orientação para o próximo passo
```

A formulação final pode evoluir editorialmente, desde que preserve o método consultivo ECOSEG e os Artigos II e III do DES-000.

### 4. CTA principal

O CTA MUST nomear a ação real. Formulação preferencial:

**Acompanhar a apresentação**

Não utilizar como CTA público: `Iniciar ensaio`, `Abrir homologação`, `Testar apresentação` ou linguagem equivalente.

O CTA leva à rota existente:

`/palestra/protecao-familia-militar/apresentacao`

### 5. Responsabilidade pública

A landing MUST possuir ou herdar de forma claramente acessível um aviso público de responsabilidade compatível com M1-R01.

Intenção semântica admissível:

> Conteúdo informativo. Situações individuais podem depender de condições específicas e devem ser analisadas de forma individualizada.

A redação definitiva permanece sujeita à governança jurídica/editorial.

## Regras editoriais

A landing MUST:

- falar com o participante, não com a equipe de desenvolvimento;
- orientar antes de recomendar;
- explicar antes de solicitar avanço;
- usar linguagem objetiva, serena e didática;
- evitar juridiquês quando ele não for necessário para a compreensão;
- distinguir conteúdo informativo de análise individual.

A landing MUST NOT:

- prometer direito, benefício, cobertura ou resultado;
- afirmar perda jurídica individual sem diagnóstico;
- recomendar produto;
- criar urgência comercial;
- utilizar medo como mecanismo de avanço;
- iniciar captação de lead como condição para acompanhar a palestra.

## Relação com conteúdo jurídico

`MIL-PEN-001` e `MIL-REM-001` são elegíveis para integração governada no M1, mas **não são integrados por M1-R02**.

M1-R02 pode comunicar que a palestra trata de direitos e mudanças de contexto em nível temático. Afirmações jurídicas específicas, fontes, `referenceIds` e quadros de evidência pertencem a M1-R04.

```text
LEGAL_TOPIC_CONTEXT=ALLOWED
SPECIFIC_LEGAL_CLAIM_INTEGRATION=NO
MIL_PEN_001_INTEGRATION=NO
MIL_REM_001_INTEGRATION=NO
```

## Relação com identidade visual

M1-R02 MUST reutilizar o sistema ECOSEG existente e MUST NOT criar uma identidade exclusiva para a palestra.

A correção da hierarquia cromática observada em VV-M0-01 pertence a M1-R05. A inconsistência de tokens dark observada em VV-M0-03 pertence a M1-R06.

M1-R02 não autoriza hardcode de cores, novos tokens ou redesign sistêmico.

## Critérios de aceitação

1. **AC-01 — Public identity:** a landing identifica ECOSEG e `Proteção da Família Militar` sem vocabulário interno.
2. **AC-02 — Purpose before action:** contexto e finalidade são apresentados antes do CTA principal.
3. **AC-03 — Orientation journey:** a página comunica uma jornada de compreensão/orientação, não um funil de produto.
4. **AC-04 — CTA semantics:** o CTA principal nomeia a ação real e conduz à rota `/apresentacao`.
5. **AC-05 — Governance leakage:** nenhum metadado de homologação, versionamento, gate ou arquitetura é projetado ao participante.
6. **AC-06 — Public responsibility:** existe aviso informativo compatível com M1-R01 e sujeito à governança jurídica/editorial.
7. **AC-07 — DES-000:** clareza, contexto e compreensão precedem qualquer ação de avanço; não há pressão de conversão.
8. **AC-08 — Brand voice:** linguagem consultiva, serena, profissional, didática, objetiva e não alarmista.
9. **AC-09 — Commercial boundary:** não há recomendação de produto, promessa de resultado, urgência comercial ou lead gate.
10. **AC-10 — Architecture preservation:** rota pública e rota de apresentação existentes são preservadas; nenhum rewrite arquitetural é requerido por este requisito.
11. **AC-11 — Scope isolation:** M1-R02 não implementa conteúdo jurídico específico, novos tipos de slide, redesign visual sistêmico ou correção de tokens de tema.

## Evidência esperada

```text
M1_R02_LANDING_PUBLIC_EXPERIENCE=PASS
PUBLIC_ECOSEG_IDENTITY=YES
PUBLIC_LECTURE_THEME=YES
CONTEXT_BEFORE_PRIMARY_ACTION=YES
ORIENTATION_JOURNEY_VISIBLE=YES
PRIMARY_CTA=Acompanhar_a_apresentacao
PRIMARY_CTA_TARGET=/palestra/protecao-familia-militar/apresentacao
PUBLIC_RESPONSIBILITY_NOTICE=YES
DEVELOPMENT_LANGUAGE_LEAKAGE=NONE
PRODUCT_RECOMMENDATION=NONE
COMMERCIAL_URGENCY=NONE
LEAD_GATE=NONE
DES_000_ARTICLE_I=PASS
DES_000_ARTICLE_II=PASS
DES_000_ARTICLE_III=PASS
DES_000_ARTICLE_VI=PASS
ARCHITECTURE_REWRITE=NO
```

## Arquivos inicialmente afetados

Primário:

- `src/app/palestra/protecao-familia-militar/page.tsx`

Conteúdo compartilhado somente quando necessário para expressar a copy pública:

- `src/content/presentations/military-family-protection.ts`

M1-R02 não autoriza alteração de `PresentationDeck` salvo se uma dependência comprovada da landing for identificada e submetida a novo gate.

## Fora de escopo

```text
PRESENTATION_TYPES=M1-R03
GOVERNED_LEGAL_EVIDENCE=M1-R04
VISUAL_HIERARCHY=M1-R05
THEME_TOKEN_CONSISTENCY=M1-R06
PRODUCT_RECOMMENDATION=BLOCKED
LEAD_CAPTURE=BLOCKED
INDIVIDUAL_DIAGNOSIS=BLOCKED
ARCHITECTURE_REWRITE=NO
```

## Gate

```text
REQUIREMENT=M1-R02
SOURCE_FINDING=VV-M0-05
M0_HERITAGE=ITERATION_1_US_M0_001
INHERITS=M1-R01
CONSTITUTIONAL_AUTHORITY=DES-000
AC_COUNT=11
REQUIREMENT_STATUS=SPECIFIED
SPECIFICATION=CLOSED
IMPLEMENTATION_AUTHORIZED=NO
NEXT=M1-R03
```
