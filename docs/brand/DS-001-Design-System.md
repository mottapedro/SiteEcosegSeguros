# DS-001 — Design System

**Marca:** EcoSeg Seguros

**Identificador:** DS-001

**Categoria:** Design System

**Status:** Ativo (v1) — ver Nota de Governança abaixo

**Versão:** 1.0

O primeiro Design System institucional da EcoSeg. Implementa `VIS-001` (linguagem visual), `DES-001`/`DES-002` (princípios de experiência e interação) e a arquitetura de `WEB-001` em tokens e componentes concretos. Todo componente deriva de um único conceito: o **Mapa Estratégico do Contexto** — um núcleo (o que é protegido) envolvido por camadas (o contexto que o cerca e, quando compreendido, o protege).

---

## Nota de Governança — Status de VIS-001.3

`VIS-001` estabeleceu que VIS-001.4 (exploração de identidade concreta) só deveria começar **após** a hipótese da unidade fundamental ("núcleo protegido por camadas de contexto") ser validada em VIS-001.3 — pesquisa visual real contra o protocolo de três painéis definido lá. Essa pesquisa não foi realizada; a Matriz de Validação em `VIS-001` permanece como template vazio.

Este documento (DS-001) avança para tokens e componentes concretos **por decisão explícita**, não porque a pesquisa foi concluída. A decisão: adotar "Mapa Estratégico do Contexto" como o conceito unificador de todo o Design System, resolvendo o gate de VIS-001.3 por deliberação direta em vez de validação empírica. Isso é registrado aqui, e deve ser refletido em `VIS-001` (ver seção final deste documento), para que ninguém leia `VIS-001` no futuro e presuma que a pesquisa aconteceu.

**Consequência prática:** os tokens de cor abaixo não são novos — são os já implementados em `src/app/globals.css` (auditados e mantidos, pois já derivam do Manual de Identidade Visual e não contradizem a hipótese adotada). Os tokens de spacing/grid são formalização do que já está em uso informal no código. Elevation, Motion e os componentes Timeline são novos.

---

## 1. Color Tokens

Sem mudança em relação ao já implementado — auditado contra o conceito de Mapa Estratégico do Contexto e aprovado: Azul Institucional (núcleo — autoridade, confiança) e Verde Eco (camada ativa — o que está sendo compreendido/investigado no momento) já funcionam nessa lógica.

| Token                             | Papel no Mapa Estratégico do Contexto                                    | Light                 | Dark                  |
| --------------------------------- | ------------------------------------------------------------------------ | --------------------- | --------------------- |
| `--background`                    | O espaço — contexto ainda não focado                                     | `#ffffff`             | `#14181d`             |
| `--foreground`                    | Texto — a leitura do contexto                                            | `#20242a`             | `#e8eaed`             |
| `--primary` (Azul Institucional)  | O núcleo — autoridade, o que está sendo protegido                        | `#0b3d63`             | `#6fa8d6`             |
| `--accent` (Verde Eco)            | A camada ativa — investigação, ação, diagnóstico em curso                | `#1f7a5c`             | `#3fa382`             |
| `--secondary`                     | Camada intermediária — contexto de apoio, não em foco                    | `#f1f3f5`             | `#232a32`             |
| `--muted` / `--muted-foreground`  | Camada periférica — informação de apoio, discreta                        | `#f4f5f6` / `#5b6169` | `#1e242b` / `#98a0a8` |
| `--destructive`                   | Ruptura — algo saiu do fluxo esperado (erro)                             | `#b3402f`             | `#d16a58`             |
| `--border` / `--input` / `--ring` | Limite entre camadas — onde uma seção de contexto termina e outra começa | `#e2e4e7`             | `#2b323a`             |

Fonte: `src/app/globals.css` (implementado), `docs/brand/brand-guidelines.md` (documentado). Nenhuma mudança de valor neste documento — apenas a atribuição de significado conceitual que faltava.

## 2. Typography Tokens

- **Família única:** Inter (`--font-sans`), per Manual de Identidade Visual — já implementado via `next/font/google` em `src/app/layout.tsx`.
- **Mono utilitário:** stack de sistema (`ui-monospace, SFMono-Regular, "IBM Plex Mono", ...`) para dados tabulares — já em `globals.css`.
- **Escala (formalizada a partir do uso atual em componentes):**

| Papel               | Classe Tailwind em uso     | Peso                                                    |
| ------------------- | -------------------------- | ------------------------------------------------------- |
| Display (Hero H1)   | `text-4xl` / `sm:text-5xl` | 700 (bold)                                              |
| H2 de seção         | `text-3xl`                 | 700                                                     |
| H3 / título de card | `text-2xl`                 | 700 (via `h1–h4 { font-weight: 700 }` em `globals.css`) |
| Corpo               | `text-base`                | 400                                                     |
| Corpo secundário    | `text-sm`                  | 400                                                     |
| Legendas / eyebrows | `text-xs`                  | 600, `uppercase`, `tracking-wide`                       |

`text-wrap: balance` já aplicado a headings (`globals.css`) — mantém títulos legíveis em qualquer camada de contexto (não quebra de forma estranha).

## 3. Spacing

Formalização da escala já em uso (múltiplos de 4/8, auditado via `grep` no código — `px-6`, `py-20`, `gap-8`, `mt-12`, etc., todos já múltiplos de 4):

```
1  = 4px    (micro-ajuste dentro de um componente)
2  = 8px    (espaço entre elementos muito próximos, ex: ícone + label)
3  = 12px
4  = 16px   (espaço padrão entre campos de formulário)
6  = 24px   (padding horizontal padrão de container, px-6)
8  = 32px   (gap entre cards, elementos de grid)
12 = 48px   (separação entre blocos dentro de uma seção)
16 = 64px
20 = 80px   (padding vertical padrão de seção, py-20 — já em `Section`)
24 = 96px
28 = 112px  (py-28, usado no Hero)
```

**Regra do Mapa Estratégico do Contexto:** o espaçamento entre camadas (seções da página) é sempre maior que o espaçamento dentro de uma camada (elementos de um mesmo componente) — nunca o inverso. Um `gap-2` dentro de um card e um `py-20` entre seções não são escolhas arbitrárias, são a mesma regra em duas escalas.

## 4. Grid

- **Container máximo:** `max-w-7xl` (1280px) — já em uso em todas as seções (`Section`, `Header`, `Footer`).
- **Colunas:** 12 colunas implícitas via Tailwind grid utilities; padrões já em uso: `grid-cols-2`, `lg:grid-cols-4` (Differentials), `lg:grid-cols-2` (Products, Testimonials).
- **Regra do Mapa Estratégico do Contexto:** um layout de N colunas representa N elementos no mesmo nível de camada — nunca misturar, na mesma grade, um elemento de "núcleo" (ex: um produto) com um elemento de "camada periférica" (ex: um link de rodapé) sem uma seção própria os separando.

## 5. Elevation (novo)

Não existia como conceito formal — hoje é tratado apenas via `shadow-sm`/`shadow-md`/`border`. Formalizado aqui como **profundidade de camada**, não decoração:

| Nível                | Uso                                                         | Implementação                                                                                      |
| -------------------- | ----------------------------------------------------------- | -------------------------------------------------------------------------------------------------- |
| 0 — Mesma camada     | Elementos no fluxo normal da página                         | Sem sombra, apenas `border` quando há necessidade de limite (ex: card)                             |
| 1 — Camada elevada   | Card de conteúdo destacado (Hero stat card, Testimonial)    | `shadow-sm`, nunca mais que isso para conteúdo estático                                            |
| 2 — Camada flutuante | Elemento que paira sobre o conteúdo (WhatsApp float, toast) | `shadow-md`, per `VIS-001 §1.2` ("evidência visual em vez de efeitos") — nunca `shadow-xl` ou glow |

**Regra:** elevação aumenta com a proximidade da ação imediata do usuário (um toast que exige atenção agora tem mais elevação que um card informativo), nunca com a importância comercial de um elemento (um card de produto premium não ganha mais sombra só por ser mais caro).

## 6. Radius

Já implementado: `--radius: 0.375rem` (6px), com escala derivada (`--radius-sm/md/lg/xl`). Mantido sem alteração — "levemente arredondado, nunca extremo" já é a regra correta para o núcleo: bordas quase retas comunicam solidez (o núcleo não deve parecer frágil ou "fofo"); um radius maior seria apropriado apenas para elementos de camada muito periférica (ex: badges), o que já é o caso (`Badge` usa radius menor via `rounded-md`/`rounded-full` conforme variante do shadcn).

## 7. Motion

Expandido integralmente em **`MOT-001 — Motion Language`** — easings nomeados (`contour-out`, `layer-in`), durações, e especificação de Transitions/Hover/Page Transition/Hero Animation/Scroll Reveal/Loading/Empty States/Microinteractions. Este parágrafo permanece apenas como ponteiro; não duplicar conteúdo aqui.

Resumo mínimo: movimento representa mudança de camada ou revelação de contexto, nunca decoração ambiente; nada foi implementado ainda (`framer-motion` instalado, não utilizado) — ver `MOT-001 §12` para o estado real, item por item.

## 8. Shadow

Ver §5 (Elevation) — shadow é a implementação técnica de elevação, não um token independente. Não deve haver `shadow-xl`, `shadow-2xl` ou sombras coloridas (glow) em nenhum componente, per `VIS-001 §1.3` (veto a "gradientes futuristas"/efeitos sem referente).

---

## Componentes

Cada componente é descrito pela camada do Mapa Estratégico do Contexto que ele representa — não apenas por sua função de UI.

### Cards

**Papel no Mapa:** um card é um núcleo contido — informação isolada dentro de um limite claro (`border`), sem enclausuramento (per `VIS-001 §1.3`: "contenção sem enclausuramento" — por isso o card usa `border` fina + `shadow-sm` leve, nunca uma borda grossa ou fundo escuro que pareça uma caixa fechada).

**Especificação:** `bg-card`, `border border-border`, `rounded-md` (`--radius`), `shadow-sm` opcional (Elevation 1) apenas quando o card precisa se destacar do fluxo (ex: Hero stat card); cards de listagem (Produtos, Depoimentos) usam `shadow-none` — já implementado em `products.tsx` (`className="shadow-none"`), correto per esta regra.

### Buttons

**Papel no Mapa:** um botão é a transição entre camadas — de compreensão para decisão (`DES-001 §8`). Variantes já implementadas (`default`, `outline`, `secondary`, `ghost`, `destructive`, `link`) mapeiam para intensidade da transição: `default` (Azul Institucional) para a transição principal de cada seção, `outline`/`secondary` para transições alternativas de menor compromisso (ex: "Falar no WhatsApp" ao lado de "Solicitar diagnóstico").

**Regra nova:** nunca mais de um botão `default` (variant primário) visível por seção — per `DES-001 §8`, apenas uma decisão principal deve ser solicitada por vez.

### Forms

**Papel no Mapa:** um formulário é o instrumento de mapeamento — cada campo é uma camada de contexto sendo coletada (nome → contato → assunto → mensagem, do mais genérico ao mais específico). Já implementado (`contact-form.tsx`) na ordem correta: identificação → contato → contexto (assunto) → detalhe (mensagem).

**Regra nova, per `DES-002 §4`:** quando o formulário evoluir (Fase 2+) para capturar mais contexto (ex: um diagnóstico de múltiplas etapas), cada etapa deve corresponder a uma camada do Mapa, exibida visualmente (ex: indicador de progresso "Camada 2 de 4"), não apenas a uma barra de progresso genérica.

### Navbar

**Papel no Mapa:** a camada mais externa e estável — está sempre presente, independentemente de qual camada de conteúdo o usuário está explorando. Já implementado (`Header`, sticky, `bg-background/90 backdrop-blur`) — o blur reforça visualmente a ideia de "camada acima do conteúdo", consistente com esta leitura sem precisar de mudança.

### Footer

**Papel no Mapa:** a camada de saída — onde o contexto se abre para fora do site (contato, outras seções, redes). Já implementado (`Footer`) com estrutura em colunas (Serviços, Empresa, Contato) — consistente com "camadas de saída" organizadas por tipo de próximo passo.

### Timeline (novo — não implementado)

**Papel no Mapa:** representa a camada **Tempo** do glossário de `VIS-001 §VIS-001.3A.1` (Tempo → evolução). Não existe hoje no código. Casos de uso futuros: histórico da empresa (`Quem Somos`, per `WEB-001`), jornada do cliente (`Metodologia`, per `WEB-001`), evolução de um sinistro (fora do escopo atual).

**Especificação inicial (para implementação futura):**

- Linha vertical ou horizontal fina (`border-border`), nunca uma barra grossa — a linha é o "fio de contexto", não um elemento decorativo.
- Cada ponto da timeline é um núcleo pequeno (círculo preenchido com `--accent` para o ponto atual/mais recente, `--muted-foreground` para pontos passados).
- Texto de cada ponto segue `DES-002 §2` (tom de voz) — nunca "conquistas" em tom de marketing, sempre fatos verificáveis com data.

### Section Layout

**Papel no Mapa:** cada seção da página é uma camada visitável do Mapa Estratégico do Contexto, na ordem definida por `WEB-001` (Home) e pela Progress Protection Philosophy (`DES-001 §2`). Já implementado via o componente `Section` (`src/components/sections/section.tsx`): container `max-w-7xl`, padding vertical `py-20 sm:py-24`, variante `tone="muted"` para alternância visual entre camadas.

**Regra nova:** a alternância `tone="default"`/`tone="muted"` entre seções consecutivas deve refletir a alternância entre camadas do Mapa (ex: uma seção "muted" representa uma camada de contexto de apoio; uma seção "default" representa o núcleo/produto em foco) — não deve ser apenas alternância estética por variedade visual.

---

## Rastreabilidade

Depende de: `VIS-001` (hipótese da unidade fundamental, adotada por decisão — ver Nota de Governança), `DES-001`, `DES-002`, `WEB-001`.

Afeta: `src/app/globals.css` (nenhuma mudança de valor, apenas documentação de significado), `docs/brand/brand-guidelines.md` (deve ser atualizado para referenciar este documento como fonte de verdade dos tokens), `docs/brand/VIS-001-Visual-Identity-System.md` (deve registrar que VIS-001.3 foi superseded por decisão, não concluído por pesquisa — ver abaixo).

**Ação pendente neste mesmo commit:** atualizar `VIS-001` para refletir que sua hipótese foi adotada por decisão (este documento) em vez de validada por pesquisa, per `CAO-029`-like princípio de memória institucional (não deixar essa mudança de status implícita apenas neste documento).

Itens em aberto:

- Motion (§7): nenhum componente usa `framer-motion` hoje — ausência registrada, não implementada.
- Timeline (componente): especificado, não implementado — nenhuma página do site atual precisa dele ainda (`Quem Somos`/`Metodologia` não existem, per `WEB-001`).
- `docs/brand/brand-guidelines.md` ainda não atualizado para apontar para este documento (fazer em commit próprio, não misturado a este).

## Referências

- VIS-001 — Visual Identity System
- DES-001 — Experience Principles
- DES-002 — Interaction Language
- WEB-001 — Information Architecture
- MOT-001 — Motion Language (expande §7 integralmente)
- `src/app/globals.css`, `src/components/ui/`, `src/components/layout/`, `src/components/sections/` — implementação atual auditada

---

© EcoSeg Seguros
