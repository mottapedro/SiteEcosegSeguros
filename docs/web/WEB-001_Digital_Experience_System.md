# WEB-001 — Digital Experience System

**Marca:** EcoSeg Seguros

**Identificador:** WEB-001

**Categoria:** Web / Índice

**Status:** Ativo

**Versão:** 1.0

Ponto de entrada para tudo que rege a experiência digital da EcoSeg — o que existe em `docs/visual/` e o que vive nesta pasta (`docs/web/`). Este documento não duplica conteúdo: orienta onde encontrá-lo.

---

## Nota de Reconciliação

A reorganização que criou esta pasta renomeou o antigo `WEB-001 — Information Architecture` para `DES-002 — Information Architecture` (agora em `docs/visual/DES-002_Information_Architecture.md`), por correspondência direta de conteúdo. O identificador `WEB-001` foi reatribuído a **este** documento — um índice novo, não uma continuação do conteúdo antigo. Quem procurar o mapa de navegação, hierarquia e fluxos originalmente descritos em "WEB-001" deve ir a `DES-002`, não a este arquivo.

## O que rege a experiência digital

| Camada                                             | Documento                                                                                | Onde           |
| -------------------------------------------------- | ---------------------------------------------------------------------------------------- | -------------- |
| Fundação da marca                                  | `BD-001` Brand DNA, `BD-002` Brand Architecture, `BD-003` Progress Protection Philosophy | `docs/brand/`  |
| Identidade visual                                  | `VIS-001` Visual Identity System                                                         | `docs/visual/` |
| Princípios de experiência                          | `DES-001` Experience Principles                                                          | `docs/visual/` |
| Arquitetura de informação                          | `DES-002` Information Architecture                                                       | `docs/visual/` |
| Linguagem de interação                             | `DES-003` Interaction Language                                                           | `docs/visual/` |
| Design system (tokens + componentes)               | `DES-004` Design System                                                                  | `docs/visual/` |
| Linguagem de movimento                             | `DES-005` Motion Language                                                                | `docs/visual/` |
| Linguagem visual (patterns, ícones, fotografia...) | `DES-006` Visual Language System                                                         | `docs/visual/` |
| Narrativa da Home                                  | `DES-007` Home Experience                                                                | `docs/visual/` |
| Catálogo de componentes (implementação)            | `WEB-002` Component Catalog                                                              | `docs/web/`    |
| Estratégia de conteúdo                             | `WEB-003` Content Strategy                                                               | `docs/web/`    |
| Estado de implementação consolidado                | `WEB-004` Implementation Guide                                                           | `docs/web/`    |

## Como usar este índice

- Para **decisões de marca/posicionamento**: comece em `docs/brand/`.
- Para **especificação de experiência/visual/motion**: `docs/visual/`, na ordem VIS-001 → DES-001 → DES-002 → ... → DES-007 (a ordem reflete a sequência em que cada documento foi produzido e depende do anterior — ver Rastreabilidade de cada um).
- Para **execução prática** (o que já está implementado, quais componentes existem, como o conteúdo é escrito): `docs/web/`.

Nenhum documento em `docs/web/` introduz uma decisão nova de marca ou experiência — todos derivam de `docs/brand/` e `docs/visual/`, consolidando-os para uso prático.

---

## Rastreabilidade

Depende de: todos os documentos listados na tabela acima.

Afeta: navegação/onboarding de qualquer pessoa nova lendo a documentação do projeto.

## Referências

- `docs/visual/DES-002_Information_Architecture.md` — conteúdo que antes vivia sob o identificador `WEB-001`
- Todos os documentos listados na tabela acima

---

© EcoSeg Seguros
