# WEB-002 — Component Catalog

**Marca:** EcoSeg Seguros

**Identificador:** WEB-002

**Categoria:** Web / Implementação

**Status:** Ativo

**Versão:** 1.0

Catálogo prático dos componentes já implementados em `src/components/`, mapeados aos princípios de `DES-004 — Design System`. Este documento não redefine a razão arquitetural de cada componente (isso vive em `DES-004`) — lista o que existe, onde vive, e seu estado de conformidade.

---

## UI Primitives (`src/components/ui/`)

Gerados via shadcn/ui (`base-nova`, `@base-ui/react`), tokens de `src/app/globals.css`.

| Componente      | Arquivo                     | Papel no Mapa Estratégico do Contexto (`DES-004`) |
| --------------- | --------------------------- | ------------------------------------------------- |
| Button          | `button.tsx`                | Transição entre camadas (compreensão → decisão)   |
| Input, Textarea | `input.tsx`, `textarea.tsx` | Coleta de camada de contexto (formulário)         |
| Label           | `label.tsx`                 | Identificação de camada de contexto               |
| Card            | `card.tsx`                  | Núcleo contido                                    |
| Badge           | `badge.tsx`                 | Marcador de camada periférica                     |
| Separator       | `separator.tsx`             | Limite entre camadas                              |
| Sonner (toast)  | `sonner.tsx`                | Feedback de mudança de camada (`DES-003 §9`)      |

## Layout (`src/components/layout/`)

| Componente    | Arquivo              | Papel                                        |
| ------------- | -------------------- | -------------------------------------------- |
| Header        | `header.tsx`         | Camada mais externa e estável (`DES-004`)    |
| Footer        | `footer.tsx`         | Camada de saída                              |
| WhatsAppFloat | `whatsapp-float.tsx` | Camada flutuante (Elevation 2, `DES-004 §5`) |

## Sections (`src/components/sections/`)

| Componente             | Arquivo                            | Capítulo da narrativa (`DES-007`)                                        |
| ---------------------- | ---------------------------------- | ------------------------------------------------------------------------ |
| Section (wrapper)      | `section.tsx`                      | Estrutura de container comum a todos os capítulos                        |
| Hero                   | `hero.tsx`                         | Capítulo 1 — O Patrimônio                                                |
| Differentials          | `differentials.tsx`                | Capítulo 3 — A Compreensão (per `DES-007`, reposicionamento recomendado) |
| Products               | `products.tsx`                     | Capítulo 4 — A Decisão                                                   |
| Testimonials, Partners | `testimonials.tsx`, `partners.tsx` | Capítulo 5 — A Proteção                                                  |
| Cta, Contact           | `cta.tsx`, `contact.tsx`           | Capítulo 6 — O Progresso                                                 |

## Features (`src/features/`)

| Componente  | Arquivo                         | Relação                                                                           |
| ----------- | ------------------------------- | --------------------------------------------------------------------------------- |
| ContactForm | `contact-form/contact-form.tsx` | Instrumento de mapeamento (`DES-004`, Forms); microcopy auditada em `DES-003 §10` |

## Componentes Especificados, Não Implementados

Per `DES-004 §Componentes` e `DES-006 §10`:

- **Timeline** — especificado em `DES-004`, representa a camada Tempo (`DES-006`). Sem arquivo correspondente em `src/components/`.

---

## Rastreabilidade

Depende de: `DES-004` (razão arquitetural de cada componente), `DES-006` (linguagem visual aplicada), `DES-007` (mapeamento de seção → capítulo narrativo).

Afeta: onboarding de qualquer desenvolvedor navegando `src/components/` pela primeira vez.

Itens em aberto: Timeline permanece não implementado; nenhum outro componente novo foi especificado além dos já cobertos em `DES-004`.

## Referências

- DES-004 — Design System
- DES-006 — Visual Language System
- DES-007 — Home Experience
- `src/components/`, `src/features/` — implementação atual

---

© EcoSeg Seguros
