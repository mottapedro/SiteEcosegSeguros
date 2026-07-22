# WEB-002 — Home Narrative Design

**Marca:** EcoSeg Seguros

**Identificador:** WEB-002

**Categoria:** Arquitetura de Informação / Narrativa

**Status:** Ativo (especificação — ver §Reconciliação, parcialmente implementado)

**Versão:** 1.0

A Home não vende seguros — conta uma história, na ordem exata da Progress Protection Philosophy (`DES-001 §2`): **Existe um patrimônio → cercado por adversidades → que podem ser compreendidas → gerando decisões → que constroem proteção → que preserva progresso.** Cada seção abaixo é um capítulo dessa narrativa, não uma unidade de conversão isolada.

---

## Capítulo 1 — O Patrimônio

**Objetivo:** estabelecer o núcleo antes de qualquer coisa. Nenhuma adversidade, produto ou CTA de conversão aparece ainda — apenas o reconhecimento de que existe algo real e valioso que o visitante construiu.

**Headline:** "Um patrimônio não é só o que você tem. É o que você ainda está construindo."

**Subheadline:** "Uma empresa, um imóvel, uma operação, uma história — o que você protege é o que permite você continuar."

**Conteúdo:** texto curto nomeando formas concretas de patrimônio (negócio, operação, imóvel, equipe) sem ainda mencionar risco ou seguro — o protagonista desta seção é o patrimônio do visitante, não a EcoSeg.

**Visual sugerido:** forma concêntrica (`VIS-002 §3`) contendo uma fotografia documental (`VIS-002 §8`) de um ambiente real de operação — nunca pessoa sorrindo, nunca ícone de cofre/escudo. O enquadramento é o núcleo; nada ao redor ainda (as camadas vêm no Capítulo 2).

**Componentes:** `Hero` (existente, `src/components/sections/hero.tsx`) — reframing de conteúdo, não de estrutura. O card de estatísticas hoje lista "Foco: Blindagem Patrimonial / Responsabilidade Civil" — deveria listar categorias de patrimônio (ex: "Operação", "Imóveis", "Equipe", "Contratos"), adiando a menção a produtos para o Capítulo 4.

**CTA:** nenhum CTA de conversão aqui — per `DES-001 §3.1` (compreensão antes de decisão), o Capítulo 1 é puro reconhecimento. Se um CTA for necessário por razão de scroll/orientação, deve ser um convite a continuar lendo ("Continuar"), nunca "Solicitar diagnóstico" ainda.

**Motion:** entrada per `MOT-001 §6` (Hero Animation) — eyebrow → headline → subheadline, `contour-out`, sequencial. Nenhum CTA para animar ainda neste capítulo.

---

## Capítulo 2 — As Adversidades

**Objetivo:** nomear, com precisão e sem alarmismo, o que cerca o patrimônio — riscos, legislação, contratos, operação, pessoas (`DES-001 §2`, "Adversidades"). Esta é a primeira camada ao redor do núcleo estabelecido no Capítulo 1.

**Headline:** "Todo patrimônio vive cercado por adversidades — a maioria delas, invisíveis até acontecer."

**Subheadline:** "Processos, responsabilidades, contratos, operação: o risco raramente é um evento único. É um contexto."

**Conteúdo:** lista curta de adversidades reais e específicas (não genéricas) por segmento — reaproveita a lógica de `Segmentos` (`WEB-001`), mas aqui como reconhecimento, não como navegação. Tom: nomear sem assustar (`BD-002 §5`: nunca "você pode perder tudo").

**Visual sugerido:** camadas visuais ao redor do núcleo do Capítulo 1 (`VIS-002 §5`) — cada adversidade é uma camada distinta, não uma lista de ícones soltos. Curvas de contorno (`VIS-002 §4`) como divisores entre esta seção e a anterior.

**Componentes:** novo — não existe hoje no código. Mais próximo estruturalmente de `Differentials` (`src/components/sections/differentials.tsx`), mas com conteúdo e propósito diferentes (hoje `Differentials` fala de "como trabalhamos", não de adversidades do cliente). Recomendação: nova seção ou reescrita de conteúdo, não reuso direto.

**CTA:** ainda nenhum CTA de conversão — per a mesma regra do Capítulo 1.

**Motion:** `MOT-001 §7` (Scroll Reveal) — cada adversidade revelada em stagger (40–60ms), reforçando "leitura camada por camada", não simultânea.

---

## Capítulo 3 — A Compreensão

**Objetivo:** mostrar que as adversidades nomeadas no Capítulo 2 podem ser mapeadas e entendidas — a ponte metodológica antes de qualquer produto (`DES-001 §2`, "Mapa Estratégico do Contexto" → "Compreensão"). Corresponde à seção `Mapa Estratégico do Contexto` e `Metodologia` de `WEB-001`, resumidas aqui como prévia.

**Headline:** "Antes de qualquer cobertura, mapeamos o seu contexto."

**Subheadline:** "Patrimônio, operação, relações, exposição — só recomendamos depois de entender tudo isso."

**Conteúdo:** explicação breve do processo de diagnóstico (`BD-002 §6`: Ouvir → Compreender → Orientar → Recomendar), com link para a página completa de Metodologia/Mapa Estratégico do Contexto (`WEB-001`) — a Home não precisa explicar o método inteiro, apenas provar que ele existe.

**Visual sugerido:** diagrama simplificado (`VIS-002 §10`, Diagram Language) mostrando o núcleo (patrimônio) com linhas de interseção indicando "pontos mapeados" — nunca um ícone de lupa genérico (clichê de "busca" sem relação com a metáfora, já vetado em `VIS-002 §6`).

**Componentes:** parcialmente novo. Pode reaproveitar a estrutura de `Differentials` (grid de itens), mas o conteúdo atual de `Differentials` ("Diagnóstico antes de contrato", "Consultoria técnica contínua", etc., em `src/content/pages/home.ts`) já está mais alinhado a este capítulo do que ao Capítulo 2 — recomendação: mover `Differentials` para cá.

**CTA:** primeiro CTA de exploração (não de conversão): "Entender o método" ou "Ver como mapeamos o contexto" → linka para `Metodologia`/`Mapa Estratégico do Contexto` (`WEB-001`). Ainda não é "Solicitar diagnóstico".

**Motion:** `MOT-001 §7`, mesma lógica de stagger; diagrama pode ter uma leve animação de "conexão se formando" entre núcleo e pontos de contexto ao entrar na viewport (uma única vez, `once: true`).

---

## Capítulo 4 — A Decisão

**Objetivo:** apresentar as soluções (`Soluções`, `WEB-001`) como a decisão que decorre naturalmente da compreensão — nunca como catálogo de produtos apresentado cedo demais. Corresponde ao `Products` já implementado, mas só faz sentido narrativo _depois_ dos Capítulos 1–3, não antes.

**Headline:** "Compreendido o contexto, a decisão fica clara."

**Subheadline:** "Blindagem Patrimonial e Responsabilidade Civil — cobertura desenhada a partir do que foi mapeado, não de um plano genérico."

**Conteúdo:** já bem coberto pela implementação atual (`products.tsx`) — cada produto com tagline, descrição, riscos mitigados, público-alvo, exemplo real. Nenhuma mudança de conteúdo necessária, apenas de posição na página (hoje é a segunda seção da Home; nesta narrativa, deveria ser a quarta).

**Visual sugerido:** já alinhado — cards com estrutura de núcleo (produto) + camadas de informação (riscos, público, exemplo), per `VIS-002 §3`/`§5`.

**Componentes:** `Products` (existente, sem mudança estrutural — apenas reposicionamento na sequência da página).

**CTA:** "Entender [Produto]" (já implementado, `DES-002 §5`) — primeiro CTA que se aproxima de decisão, mas ainda de exploração, não de compromisso. Correto como está.

**Motion:** já parcialmente coberto por `MOT-001 §7` (Scroll Reveal) quando implementado — nenhuma mudança de especificação necessária além do que já está em `MOT-001`.

---

## Capítulo 5 — A Proteção

**Objetivo:** mostrar prova de que a proteção realmente acontece — evidência, não promessa. Corresponde a `Testimonials` e `Partners` já implementados, reenquadrados como "evidência de proteção", não como prova social genérica de marketing.

**Headline:** "A proteção só é real quando comprovada."

**Subheadline:** "Empresas e famílias que já mapearam seu contexto com a EcoSeg."

**Conteúdo:** depoimentos já implementados (`testimonials.tsx`) — manter, já alinhados a `DES-002` (tom calmo, sem exagero). `Partners` (seguradoras parceiras) permanece como evidência de solidez técnica (comparação entre seguradoras, `BD-002`), não como "selo de confiança" genérico.

**Visual sugerido:** depoimentos como camadas de evidência ao redor do núcleo (a proteção) — já parcialmente coerente com a implementação atual (cards com aspas, `Quote` icon). Nenhuma mudança visual urgente.

**Componentes:** `Testimonials`, `Partners` (existentes, sem mudança estrutural).

**CTA:** nenhum CTA direto necessário aqui — esta seção é evidência, não ação (consistente com `DES-001 §6`: "reconhecimento antes de solução", aqui invertido para "evidência antes do pedido final de ação", que vem no Capítulo 6).

**Motion:** `MOT-001 §7`, stagger leve entre depoimentos.

---

## Capítulo 6 — O Progresso

**Objetivo:** o convite final — não "compre agora", mas "continue construindo, com o risco neutralizado". Corresponde a `Cta` e `Contact` já implementados.

**Headline (já implementado, alinhado):** "Vamos mapear os riscos do seu negócio?"

**Subheadline (já implementado, alinhado):** já presente em `cta.tsx` — sem necessidade de mudança.

**Conteúdo:** formulário de contato (`contact-form.tsx`) — já implementado e auditado em `DES-002 §10` (sem violações).

**Visual sugerido:** o formulário como o "ponto de entrada para uma nova camada de mapeamento" (o diagnóstico real, que começa depois do envio) — visualmente, pode usar a mesma lógica de contenção (`VIS-002 §8`) para o card do formulário, já parcialmente presente (`border`, `rounded-md`).

**Componentes:** `Cta`, `Contact` (existentes, sem mudança estrutural).

**CTA:** "Agendar consultoria" (`Cta`) e "Enviar solicitação" (`Contact`) — já implementados e alinhados a `DES-002 §5`. Nenhuma mudança necessária.

**Motion:** nenhuma animação de "celebração" ao enviar (já corretamente evitado, `DES-002 §8`) — apenas a confirmação textual já implementada.

---

## Reconciliação com a Implementação Atual

A mudança mais importante que este documento propõe **não é de conteúdo, é de ordem**. A sequência atual do código (`src/app/page.tsx`) é:

```
Hero → Products → Differentials → Partners → Testimonials → Cta → Contact
```

A sequência narrativa proposta por este documento é:

```
O Patrimônio (Hero, reframed) → As Adversidades (nova) → A Compreensão (Differentials, movido e reenquadrado)
→ A Decisão (Products) → A Proteção (Testimonials + Partners) → O Progresso (Cta + Contact)
```

**Diferença central:** hoje `Products` vem logo após o Hero — a decisão (produto) é apresentada antes de as adversidades serem nomeadas e antes da compreensão (`Differentials`) ser estabelecida. Isso contraria `DES-001 §3.1` (compreensão antes de decisão) na própria Home, a página mais visitada do site.

| Capítulo            | Componente                 | Estado                                                                         |
| ------------------- | -------------------------- | ------------------------------------------------------------------------------ |
| 1 — O Patrimônio    | `Hero`                     | Existe; conteúdo precisa reframing (nomear patrimônio antes de produto)        |
| 2 — As Adversidades | —                          | Não existe; conteúdo novo necessário                                           |
| 3 — A Compreensão   | `Differentials`            | Existe, mas em outra posição; conteúdo já é compatível, só precisa mover       |
| 4 — A Decisão       | `Products`                 | Existe; conteúdo correto, posição errada (hoje é a 2ª seção, deveria ser a 4ª) |
| 5 — A Proteção      | `Testimonials`, `Partners` | Existem; já bem posicionados relativamente (perto do fim)                      |
| 6 — O Progresso     | `Cta`, `Contact`           | Existem; já corretos                                                           |

Este documento **não implementa** a reordenação — é a especificação para que ela seja feita como uma mudança deliberada em `src/app/page.tsx` e no conteúdo de `src/content/pages/home.ts`, não uma reescrita improvisada.

---

## Rastreabilidade

Depende de: `DES-001 §2` (Progress Protection Philosophy — fonte direta dos seis capítulos), `WEB-001` (seções já definidas: Home, Segmentos, Soluções, Metodologia), `VIS-002` (tratamento visual por capítulo), `MOT-001` (motion por capítulo), `DES-002` (CTAs e tom).

Afeta: `src/app/page.tsx` (ordem das seções), `src/content/pages/home.ts` (conteúdo do Hero e possível nova seção de Adversidades), `src/components/sections/differentials.tsx` (reenquadramento de propósito, sem mudança estrutural).

Itens em aberto:

- Reordenação das seções — especificada, não implementada.
- Seção "As Adversidades" — nova, sem componente ou conteúdo implementado.
- Conteúdo do Hero (card de estatísticas) — precisa ser reescrito para nomear patrimônio, não produto.

## Referências

- DES-001 — Experience Principles (§2, Progress Protection Philosophy)
- WEB-001 — Information Architecture
- VIS-002 — Visual Language System
- MOT-001 — Motion Language
- DES-002 — Interaction Language
- `src/app/page.tsx`, `src/content/pages/home.ts`, `src/components/sections/` — implementação atual auditada

---

© EcoSeg Seguros
