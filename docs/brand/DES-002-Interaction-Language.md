# DES-002 — Interaction Language

**Marca:** EcoSeg Seguros

**Identificador:** DES-002

**Categoria:** Experiência / UX

**Status:** Ativo

**Versão:** 1.0

Este documento define a linguagem de interação da EcoSeg: o que o sistema diz e mostra em cada estado, momento e decisão. É a aplicação prática de `DES-001` (Experience Principles) e `BD-002 §5` (Voice & Tone) ao nível de componente — estados, microcopy, mensagens, feedbacks, CTAs, formulários. Nenhuma tela deve introduzir um texto de interface que contradiga este documento.

---

## 1. Princípio Central

Toda interação deve transmitir **compreensão, clareza, calma, confiança**. Nunca urgência. Nunca pressão. Isso não é um objetivo estético — é uma continuação direta de `DES-001 §3.4` (nenhuma técnica agressiva de conversão) e `BD-002 §5` (expressões que geram medo/urgência são vetadas na comunicação da marca). Este documento estende essa regra da comunicação de marca para a interface funcional: botões, formulários, erros, sucessos.

**Teste rápido para qualquer texto de interface novo:** se o texto tenta acelerar uma decisão em vez de esclarecê-la, ele viola este documento — independentemente de quão "padrão de mercado" seja.

## 2. Tom de Voz Aplicado à Interação

Herdado de `BD-002 §5`, especializado para interface:

- **Consultivo, não comercial** — um botão diz o que acontece, não tenta convencer ("Ver cobertura", não "Aproveite agora!").
- **Direto, sem ser frio** — frases curtas, mas nunca telegráficas ao ponto de parecer automatizado sem cuidado.
- **Primeira pessoa do plural quando o sistema fala** ("Recebemos sua solicitação"), segunda pessoa quando se dirige ao usuário ("Descreva sua operação").
- **Nunca**: exclamação para criar excitação artificial, contagem regressiva, linguagem de escassez ("últimas vagas", "oferta por tempo limitado"), emojis como substituto de clareza.

## 3. Estados

Todo componente interativo (botão, campo, cartão de conteúdo) deve ter seus estados definidos com a mesma calma do estado padrão — nenhum estado "aumenta o volume" para chamar atenção de forma artificial.

| Estado   | Comportamento esperado                                                                                                                                     |
| -------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Default  | Neutro, legível, sem ênfase além da hierarquia visual já definida (`VIS-001 §1.2`).                                                                        |
| Hover    | Mudança sutil (per `VIS-001`, microinterações de 200–300ms, discretas) — nunca cor berrante ou movimento brusco.                                           |
| Focus    | Sempre visível (acessibilidade, `DES-001 §9`) — anel de foco claro, nunca removido por estética.                                                           |
| Loading  | Comunica que algo está em andamento sem prometer velocidade ("Enviando...", não "Quase lá!").                                                              |
| Disabled | Visualmente distinto, mas nunca escondido — se uma ação está bloqueada, o motivo deve ser comunicado em texto próximo, não apenas pela opacidade do botão. |
| Error    | Ver §7.                                                                                                                                                    |
| Success  | Ver §8.                                                                                                                                                    |

## 4. Microcopy

Texto de apoio (labels, placeholders, texto auxiliar) segue as mesmas regras de `DES-001 §5` (Cognitive Principles): um conceito por vez, linguagem comum.

- **Labels** sempre visíveis (nunca apenas placeholder que desaparece ao digitar — o usuário não deve perder o contexto do campo).
- **Placeholders** mostram um exemplo real, não uma instrução redundante com o label (ex: label "E-mail", placeholder `voce@empresa.com.br`, não "Digite seu e-mail").
- **Texto auxiliar** explica _por que_ uma informação é pedida quando não é óbvio (ex: por que perguntamos "assunto" antes de "mensagem" — ajuda a rotear para o consultor certo).

## 5. CTAs

Todo CTA nomeia a ação real, não uma promessa vaga ou uma pressão de urgência.

**Padrão:**

- "Solicitar diagnóstico" (não "Comece agora" — nomeia o que realmente acontece: um diagnóstico, não uma compra).
- "Falar no WhatsApp" (não "Fale conosco já!").
- "Agendar consultoria" (não "Não perca tempo").
- "Ver [Produto]" / "Entender [Produto]" para CTAs de exploração, antes de qualquer CTA de conversão — consistente com `DES-001 §3.1` (compreensão antes de decisão). Isso já está parcialmente em prática no site (`Entender Blindagem Patrimonial`, `Entender Responsabilidade Civil`, em `src/components/sections/products.tsx`).

**Proibido:**

- Urgência artificial ("Últimas vagas", "Oferta por tempo limitado").
- Verbos de pressão ("Aproveite", "Garanta já").
- CTAs que escondem o que realmente vai acontecer ("Saiba mais" quando na verdade leva a um formulário de contato — nomear "Falar com um consultor" em vez disso).

## 6. Formulários

Aplicação direta de `DES-001 §8` (Decision Principles) e `§5` (Cognitive Principles):

- Nenhum campo pedido sem que sua finalidade seja clara (diretamente no rótulo ou em texto auxiliar).
- Erros de validação aparecem próximos ao campo, nunca apenas em um resumo distante no topo do formulário.
- Campo honeypot (proteção anti-spam) deve permanecer completamente invisível ao usuário real — já implementado (`src/features/contact-form/contact-form.tsx`), consistente com este princípio: segurança não deve gerar fricção para quem não é o alvo dela.
- O botão de envio nomeia a ação em andamento durante o loading ("Enviando...", já implementado) — nunca fica com o texto do estado padrão sem indicação de progresso.
- Nenhuma pré-seleção de campo que beneficie a EcoSeg às custas da clareza (`DES-001 §8`) — ex: o campo "Assunto" não deve ter uma opção mais cara pré-marcada.

## 7. Mensagens de Erro

Erro nunca é tratado como falha do usuário — é informação para resolução.

**Estrutura:** o que aconteceu + o que fazer a seguir. Nunca apenas "Erro." ou um código técnico sem explicação.

**Exemplos already alinhados (`contact-form.tsx`):**

- "Não foi possível enviar agora. Tente novamente em instantes." — comunica o problema e uma ação clara, sem culpar o usuário, sem alarmismo.

**Regras adicionais:**

- Nunca usar linguagem que sugira urgência de correção ("Corrija isso imediatamente!") — usar tom informativo ("Verifique o e-mail informado").
- Erros de sistema (500, timeout) nunca expõem detalhes técnicos ao usuário final — mensagem calma + opção de contato alternativo se o problema persistir.
- Cor de erro (`--destructive`, já definida em `docs/brand/brand-guidelines.md`) comunica o estado sem precisar de texto em maiúsculas ou exclamação.

## 8. Mensagens de Sucesso

Sucesso é a evidência de Progresso (`DES-001 §2`) — deve ser reconhecido com clareza, não com celebração exagerada.

**Exemplo já alinhado (`contact-form.tsx`):**

- "Recebemos sua solicitação. Retornaremos em breve." — confirma a ação, estabelece expectativa (retorno), sem emojis nem exclamação múltipla.

**Regras adicionais:**

- Toda mensagem de sucesso deve responder "o que acontece agora?" — nunca apenas confirmar que algo funcionou sem indicar o próximo passo.
- Nunca usar confete, animação celebratória ou linguagem de "parabéns" para uma ação transacional simples (ex: envio de formulário) — reservar reconhecimento mais forte apenas para marcos reais (ex: conclusão de uma apólice, fora do escopo do site atual).

## 9. Feedbacks (toasts, inline, loading)

- Toasts (`sonner`, já em uso) para confirmações e erros de ações assíncronas (envio de formulário) — duração suficiente para leitura confortável, nunca menos de ~4 segundos.
- Feedback inline (erros de campo) sempre visível sem precisar de interação adicional (não escondido atrás de hover ou clique).
- Nenhum feedback deve depender apenas de cor (acessibilidade, `DES-001 §9`) — sempre acompanhado de ícone ou texto.

## 10. Auditoria do Estado Atual (Fase 1)

Este documento nasce depois de parte do site já estar implementado — a tabela abaixo é uma auditoria honesta, não uma alegação de conformidade total.

| Item                                                  | Local                              | Conformidade                                                                               |
| ----------------------------------------------------- | ---------------------------------- | ------------------------------------------------------------------------------------------ |
| CTA "Solicitar diagnóstico gratuito"                  | `src/content/pages/home.ts` (hero) | ✅ Nomeia a ação real                                                                      |
| CTA "Falar no WhatsApp"                               | Hero, WhatsApp float               | ✅ Direto, sem pressão                                                                     |
| CTA "Entender [Produto]"                              | `products.tsx`                     | ✅ Exploração antes de conversão                                                           |
| Mensagem de sucesso do formulário                     | `contact-form.tsx`                 | ✅ Já alinhada (ver §8)                                                                    |
| Mensagem de erro do formulário                        | `contact-form.tsx`                 | ✅ Já alinhada (ver §7)                                                                    |
| Estado de loading do botão                            | `contact-form.tsx` ("Enviando...") | ✅ Alinhado                                                                                |
| CTA da CTA-section ("Agendar consultoria")            | `cta.tsx`                          | ✅ Alinhado                                                                                |
| Labels sempre visíveis nos campos                     | `contact-form.tsx`                 | ✅ Já implementado (não usa placeholder-only)                                              |
| Texto auxiliar explicando _por que_ um campo é pedido | `contact-form.tsx`                 | ⚠️ Não implementado — nenhum campo explica sua finalidade (ex: por que "assunto" é pedido) |
| Placeholder com exemplo real vs. instrução redundante | `contact-form.tsx`                 | ⚠️ Não auditado campo a campo — revisão futura                                             |

Os itens marcados ⚠️ são melhorias sugeridas, não erros — o formulário atual não viola nenhuma regra proibitiva deste documento, apenas não implementa ainda todas as recomendações positivas.

---

## Rastreabilidade

Depende de: `DES-001` (Experience Principles — especialmente §3, §5, §8), `BD-002 §5` (Voice & Tone), `VIS-001 §1.2` (evidência visual em vez de efeitos, aplicada aqui a feedback).

Afeta: `src/features/contact-form/`, `src/components/sections/`, `src/components/ui/sonner.tsx`, e qualquer texto de interface futuro em qualquer produto (site, Portal do Cliente, Portal do Corretor).

Itens em aberto:

- Texto auxiliar explicando finalidade de campos (§10, itens ⚠️) — melhoria não implementada.
- Auditoria completa placeholder-a-placeholder do formulário — não realizada.

## Referências

- DES-001 — Experience Principles
- BD-002 — Brand Architecture Specification (§5 Voice & Tone)
- VIS-001 — Visual Identity System
- `src/features/contact-form/contact-form.tsx`, `src/components/sections/cta.tsx`, `src/components/sections/products.tsx` — implementação atual auditada

---

© EcoSeg Seguros
