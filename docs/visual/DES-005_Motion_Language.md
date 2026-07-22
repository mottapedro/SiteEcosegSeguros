# DES-005 — Motion Language

**Marca:** EcoSeg Seguros

**Identificador:** DES-005

**Categoria:** Design System / Movimento

**Status:** Ativo (especificação — não implementado, ver §12)

**Versão:** 1.0

Este documento expande `DES-004 §7` (Motion) em uma linguagem de animação completa. Nenhuma animação decorativa é permitida — toda animação deve comunicar **Leitura, Descoberta, Compreensão, Fluxo ou Contexto**. Se um movimento não comunica um destes cinco, ele não deve existir, independente de quão "polido" pareça.

---

## 1. Vocabulário de Movimento

A referência de movimento não é a interface de um app de tecnologia — é a leitura de um mapa.

| Referência              | Tradução em movimento de interface                                                                                                                     |
| ----------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **Curvas topográficas** | Easing não-linear, assimétrico — aceleração suave, desaceleração mais longa (como uma curva de nível se assentando), nunca linear nem elástico/bounce. |
| **Leitura de mapas**    | Revelação sequencial, nunca simultânea — o olho lê um mapa camada por camada, não tudo de uma vez.                                                     |
| **Expansão gradual**    | Elementos crescem/aparecem a partir de um ponto de origem lógico (onde o usuário olhou/clicou), nunca de um ponto arbitrário da tela.                  |
| **Camadas**             | Transições entre estados são transições de profundidade (uma camada se move para trás, outra para frente), não apenas troca de opacidade.              |

## 2. Easings Nomeados (tokens)

Complementa `DES-004 §7`. Dois easings cobrem todo o sistema — não introduzir um terceiro sem justificativa equivalente:

- **`contour-out`** — `cubic-bezier(0.22, 1, 0.36, 1)`. Uso: revelação, expansão, entrada de conteúdo. Desaceleração longa e suave, como uma linha de contorno se assentando. É o easing padrão para tudo que "aparece".
- **`layer-in`** — `cubic-bezier(0.4, 0, 0.2, 1)`. Uso: transição entre camadas de profundidade (hover com elevação, abertura de menu, troca de estado). Mais simétrico, mais rápido — comunica mudança de camada, não chegada de conteúdo novo.

Nenhum easing elástico (`bounce`, `spring` com overshoot visível) é permitido — overshoot comunica brincadeira/energia, não precisão de leitura.

## 3. Duração

- **Microinterações** (hover, foco, toggle): 150–250ms, `layer-in`.
- **Revelação de conteúdo** (scroll reveal, aparecimento de seção): 300–500ms, `contour-out`.
- **Transição de página**: 300–400ms, ver §5.
- Nunca exceder 600ms para qualquer animação — acima disso, o movimento deixa de comunicar e passa a atrasar a leitura (contradiz o próprio vocabulário: mapas são lidos rapidamente, não admirados lentamente).

## 4. Transitions (geral)

Toda transição de estado (cor, opacidade, transform) segue os easings de §2. Regra adicional: uma transição nunca anima mais de duas propriedades simultâneas sem uma relação lógica entre elas (ex: opacidade + translateY juntos = "revelação", aceitável; cor + rotação juntos = sem relação lógica, não permitido).

**Estado atual do código:** `Button` usa `transition-all` sem duração/easing explícitos (herda o default do Tailwind, ~150ms linear) — não alinhado a este documento. Ação recomendada (não realizada neste documento): substituir por duração e easing explícitos per §2/§3.

## 5. Page Transition

Representa mudança de camada de contexto (uma página é uma camada do Mapa Estratégico do Contexto, per `DES-004`). Especificação:

- Saída: conteúdo atual recua ligeiramente (translateY ou opacity, nunca ambos com zoom) com `layer-in`, 200ms.
- Entrada: conteúdo novo usa `contour-out`, 300–400ms, com um leve atraso (~50ms) após a saída — nunca crossfade simultâneo, que comunicaria as duas páginas como a mesma camada.
- Não implementado — o site hoje não tem transição de página customizada (Next.js App Router, navegação padrão). Candidato a implementação futura com `framer-motion` (já instalado, não utilizado — per `DES-004 §7`).

## 6. Hero Animation

O Hero representa a etapa "Adversidades" comprimida (`DES-001 §2`, `DES-002`). A animação de entrada deve comunicar **descoberta progressiva**, não impacto:

1. Eyebrow (rótulo, ex: "Consultoria em seguros corporativos") aparece primeiro — `contour-out`, 300ms.
2. Título principal aparece em seguida (~80ms depois) — mesmo easing, ligeiramente mais longo (400ms) por ser o elemento mais importante.
3. Subtítulo e CTAs aparecem por último (~150ms depois do título).
4. O card de estatísticas (lado direito do Hero, já implementado) entra como uma camada separada — leve translateX ou scale a partir de 0.98, nunca de uma escala muito menor (que pareceria "pop", decorativo).

Nenhum elemento deve usar fade-in puro sem movimento de posição — per o vocabulário (§1), revelação sempre tem uma direção (de onde o contexto "vem"), não aparece do nada.

## 7. Scroll Reveal

Aplica diretamente a metáfora de leitura de mapa: conteúdo é revelado à medida que entra na área de leitura, em sequência, nunca todo de uma vez.

- Cada seção (`Section`, per `DES-004`) revela seu conteúdo com stagger (atraso escalonado) entre elementos-irmãos: 40–60ms entre cards de uma grade (Produtos, Diferenciais, Depoimentos).
- Movimento: opacity 0→1 + translateY de 12–16px, `contour-out`, disparado quando o elemento entra ~15% na viewport (não espera o elemento inteiro estar visível — o mapa começa a ser lido antes de estar todo à mostra).
- Uma seção nunca deve re-animar ao rolar para cima e para baixo repetidamente — a revelação acontece uma vez por sessão de leitura (usar `once: true` em qualquer implementação com `framer-motion`).
- Respeita `prefers-reduced-motion` globalmente (já implementado em `globals.css` para transições CSS; qualquer scroll reveal via `framer-motion` deve checar `useReducedMotion()` e desabilitar o translateY, mantendo apenas a mudança de opacidade instantânea).

## 8. Loading

Não deve usar um spinner genérico (círculo girando) nem pontos saltitantes (bounce) — ambos são decorativos e não comunicam nenhum dos cinco conceitos.

**Especificação:** um traço fino se desenhando (stroke-dasharray animado) — literalmente uma linha de contorno sendo traçada, reforçando o vocabulário topográfico. Onde isso não for viável (ex: dentro de um botão pequeno), usar um indicador simples de opacidade pulsante lenta (0.5↔1, 1000ms, linear — a única exceção ao uso de `contour-out`/`layer-in`, pois um estado de espera contínuo não é uma revelação nem uma mudança de camada, é a ausência de progresso visível).

**Estado atual:** o botão de envio do formulário já comunica loading via texto ("Enviando...", per `DES-003 §3`) sem animação visual adicional — aceitável como está; a especificação acima aplica-se a loadings mais longos ou de página inteira, que ainda não existem no site.

## 9. Empty States

Representa "contexto ainda não mapeado" — nunca deve comunicar erro ou vazio genérico ("Nada encontrado").

**Especificação:** ilustração ou composição visual mostrando camadas incompletas/em contorno (consistente com `VIS-001 §1.3`, "contenção sem enclausuramento" — um empty state não é um beco sem saída, é um convite a preencher o contexto). Texto segue `DES-003` (tom calmo, próximo passo claro — nunca "Ops! Nada aqui ainda 😅").

**Estado atual:** não existe nenhum empty state implementado no site hoje (não há listagens dinâmicas na Fase 1) — esta seção é especificação para o Blog/Conteúdos (`DES-002`) e futuros painéis (Portal do Cliente), quando existirem.

## 10. Microinteractions

- **Hover de botão:** já implementado via mudança de cor (`hover:bg-primary/80`, etc.) — alinhado ao vocabulário se tratado como mudança de camada (§2, `layer-in`); duração deve ser explicitada (§4, ação pendente).
- **Press de botão:** já implementado (`active:translate-y-px`) — um "afundar" sutil de 1px comunica contato físico direto, consistente com "camadas" (o botão desce uma camada ao ser pressionado). Manter.
- **WhatsApp float (hover:scale-105):** parcialmente alinhado — escala sozinha é mais genérica/decorativa do que uma elevação. Recomendação: complementar com aumento de `shadow` (per `DES-004 §5`, Elevation) em vez de depender só de scale, para que o hover comunique "esta camada sobe", não apenas "este elemento cresce".
- **Foco de campo de formulário:** já implementado via `ring` (shadcn) — alinhado, comunica claramente qual camada de contexto está sendo preenchida no momento.

---

## 11. Regras Proibidas (explícitas)

- Parallax puramente decorativo (fundo se move em velocidade diferente do conteúdo sem razão de leitura).
- Partículas, confete, ou qualquer efeito "celebratório" (já vetado em `DES-003 §8` para mensagens de sucesso — reforçado aqui para animação).
- Bounce/spring com overshoot visível.
- Autoplay de carrossel ou qualquer movimento contínuo sem interação do usuário (contradiz "leitura", que é sempre no ritmo de quem lê).
- Hover que muda o layout (deslocamento de outros elementos) — hover é camada, não reflow.

## 12. Estado de Implementação

Este documento é **especificação**, não implementação. Nenhum destes comportamentos foi codificado nesta sessão. Estado real do código, auditado:

| Item                                         | Estado                                                                                                          |
| -------------------------------------------- | --------------------------------------------------------------------------------------------------------------- |
| Easings nomeados (`contour-out`, `layer-in`) | Não implementados como tokens Tailwind/CSS — hoje `transition-all` sem easing explícito                         |
| Hero Animation                               | Não implementado — Hero renderiza estático                                                                      |
| Scroll Reveal                                | Não implementado — nenhuma seção usa `framer-motion` (instalado, não utilizado, per `DES-004 §7`)               |
| Page Transition                              | Não implementado                                                                                                |
| Loading (traço se desenhando)                | Não implementado — apenas texto de loading no botão (`DES-003 §3`), suficiente para o caso de uso atual         |
| Empty States                                 | Não aplicável ainda — nenhuma listagem dinâmica existe na Fase 1                                                |
| Microinteractions (hover/press/foco)         | Parcialmente implementadas (ver §10) — funcionais, mas sem duração/easing explícitos alinhados a este documento |

---

## Rastreabilidade

Depende de: `DES-004 §7` (Motion, expandido por este documento), `VIS-001` (vocabulário visual — camadas, contenção sem enclausuramento), `DES-001`/`DES-003` (calma, ausência de urgência, aplicada aqui ao movimento).

Afeta: qualquer implementação futura de animação em `src/components/`; `src/components/ui/button.tsx` (duração/easing explícitos, recomendado); `src/components/layout/whatsapp-float.tsx` (recomendação de elevação em vez de scale puro).

Itens em aberto:

- Nenhuma animação especificada aqui foi implementada — este documento é puramente normativo até uma decisão explícita de implementação.
- Easings nomeados não existem como tokens no código (`tailwind.config`/`globals.css`) — precisam ser adicionados quando a implementação começar.

## Referências

- DES-004 — Design System (§5 Elevation, §7 Motion)
- VIS-001 — Visual Identity System
- DES-001 — Experience Principles
- DES-003 — Interaction Language
- `src/components/ui/button.tsx`, `src/components/layout/whatsapp-float.tsx` — implementação atual auditada

---

© EcoSeg Seguros
