# WEB-004 — Implementation Guide

**Marca:** EcoSeg Seguros

**Identificador:** WEB-004

**Categoria:** Web / Implementação

**Status:** Ativo

**Versão:** 1.0

Consolida, em um único lugar, o estado real de implementação de tudo que foi especificado em `docs/visual/`. Cada documento já mantém sua própria auditoria honesta (nenhum conteúdo é duplicado aqui além do necessário para uma visão consolidada) — este guia aponta para elas e resume o que falta, para que ninguém precise abrir sete documentos para responder "o que já existe de fato?".

---

## Estado Consolidado

| Domínio                           | Especificado em          | Implementado?                          | Detalhe                                                                                   |
| --------------------------------- | ------------------------ | -------------------------------------- | ----------------------------------------------------------------------------------------- |
| Tokens de cor/tipografia/radius   | `DES-004 §1–2, §6`       | ✅ Sim                                 | `src/app/globals.css`, sem mudança de valor                                               |
| Spacing/Grid                      | `DES-004 §3–4`           | ✅ Sim (formalização do uso existente) | Padrões já em uso, agora documentados                                                     |
| Elevation                         | `DES-004 §5`             | ⚠️ Parcial                             | `shadow-sm`/`shadow-md` em uso, sem o conceito formal de níveis aplicado consistentemente |
| Motion (easings, durações)        | `DES-005`                | ❌ Não                                 | `framer-motion` instalado, não utilizado; nenhum easing nomeado existe no código          |
| Patterns, Curves, Shapes gráficas | `DES-006 §1–4`           | ❌ Não                                 | Nenhum implementado                                                                       |
| Layers (como princípio gráfico)   | `DES-006 §5`             | ⚠️ Parcial                             | Existe estruturalmente (layout), não graficamente                                         |
| Ícones                            | `DES-006 §6`             | ✅ Sim                                 | Lucide, outline, já em uso                                                                |
| Ilustrações, Fotografia           | `DES-006 §7–8`           | ❌ Não existe                          | Nenhuma no site hoje; fotografia real depende de sessão de fotos (`docs/backlog.md`)      |
| Infográficos, Diagram Language    | `DES-006 §9–10`          | ❌ Não                                 | Nenhum implementado; Timeline (candidato natural) não existe                              |
| Reordenação narrativa da Home     | `DES-007 §Reconciliação` | ❌ Não                                 | Ordem atual do código ainda não segue os 6 capítulos                                      |
| Nova seção "As Adversidades"      | `DES-007 Capítulo 2`     | ❌ Não existe                          | Sem componente correspondente                                                             |
| Componente Timeline               | `WEB-002`                | ❌ Não                                 | Especificado, sem arquivo                                                                 |

## O Que Está Genuinamente Pronto

- Tokens de cor, tipografia e radius (auditados, sem contradição).
- Ícones (Lucide, outline).
- Microcopy de formulário, CTAs de produto, mensagens de erro/sucesso (`DES-003 §10` — auditoria já feita, sem violações encontradas).
- Estrutura de componentes UI (`WEB-002`).

## O Que Está Especificado, Mas Não Construído

A maior parte do sistema visual/motion (`DES-005`, `DES-006`) e a reordenação narrativa da Home (`DES-007`) são especificações vivas aguardando decisão de implementação — nenhuma delas é uma violação do que existe hoje, apenas trabalho ainda não iniciado.

## Prioridade Sugerida (não uma decisão — apenas ordenação lógica)

1. Reordenar a Home per `DES-007` (maior impacto na filosofia, menor esforço técnico — é reposicionamento de seções já existentes, não construção nova).
2. Implementar easings nomeados (`DES-005 §2`) nos componentes já existentes (`Button`, `WhatsAppFloat`) — baixo esforço, alto ganho de consistência.
3. Seção "As Adversidades" (`DES-007` Capítulo 2) — conteúdo novo necessário antes da implementação.
4. Patterns/Curves/Layers gráficos (`DES-006`) — maior esforço de execução (SVG, performance), menor urgência.

---

## Rastreabilidade

Depende de: todos os documentos em `docs/visual/` — este guia não é autoritativo sobre nenhuma regra, apenas consolida o estado de conformidade já registrado em cada um.

Afeta: planejamento de próximos passos de implementação do site.

## Referências

- DES-002 até DES-007 — todas as auditorias de implementação individuais
- WEB-002 — Component Catalog
- `docs/backlog.md`, `docs/roadmap.md`

---

© EcoSeg Seguros
