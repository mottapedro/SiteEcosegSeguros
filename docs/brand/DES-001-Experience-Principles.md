# DES-001 — Experience Principles

**Marca:** EcoSeg Seguros

**Identificador:** DES-001

**Categoria:** Experiência / UX

**Status:** Ativo

**Versão:** 1.0

Este documento traduz a **Progress Protection Philosophy** em princípios permanentes para toda experiência digital da EcoSeg — site, Portal do Cliente, Portal do Corretor, e qualquer produto futuro. Assim como `VIS-001` traduz `BD-001`/`BD-002` em linguagem visual, `DES-001` os traduz em linguagem de experiência (interação, jornada, decisão).

**Nota de consistência:** "Progress Protection Philosophy" é terminologia nova, mas não introduz uma posição nova — o fluxo abaixo é uma articulação mais precisa do que já estava em `BD-001` (pilares Orientar, Proteger, Evoluir) e `BD-002 §6` ("orientar antes de vender"). Também se relaciona diretamente com a jornada já registrada em `BD-002 §8` (Customer Experience Architecture: Descoberta → Consideração → Diagnóstico → Recomendação → Contratação → Onboarding → Relacionamento → Renovação) — a Progress Protection Philosophy é o modelo _filosófico_ por trás dessa jornada _operacional_; ver §2 abaixo para o mapeamento entre as duas.

---

## 1. Purpose

Garantir que toda experiência digital da EcoSeg — não apenas o site institucional, mas qualquer produto futuro (Portal do Cliente, Portal do Corretor, cotação online) — comunique e pratique a mesma filosofia: entendimento antes de decisão, decisão antes de proteção, proteção antes de progresso. Nenhuma tela, fluxo ou componente deve ser desenhado sem referência a estes princípios.

## 2. Experience Philosophy

A **Progress Protection Philosophy** organiza toda experiência em uma sequência única:

```
Adversidades
      ↓
Mapa Estratégico do Contexto
      ↓
Compreensão
      ↓
Decisão
      ↓
Proteção
      ↓
Progresso
```

Leitura de cada etapa:

- **Adversidades** — o ponto de partida é sempre um risco real ou latente que o cliente enfrenta (patrimonial, de responsabilidade civil, operacional).
- **Mapa Estratégico do Contexto** — antes de qualquer recomendação, o contexto completo é mapeado: patrimônio, operação, relações, exposição (equivalente experiencial do "diagnóstico antes da apólice", `BD-002 §2`).
- **Compreensão** — o cliente precisa compreender seu próprio contexto de risco antes de qualquer produto ser apresentado.
- **Decisão** — só depois de compreender, o cliente decide — nunca antes.
- **Proteção** — a decisão se materializa em cobertura real.
- **Progresso** — o resultado final não é "ter uma apólice", é poder seguir construindo (o negócio, o patrimônio, a família) com a adversidade neutralizada.

**Relação com a jornada operacional (`BD-002 §8`):**

| Progress Protection Philosophy | Customer Experience Architecture (`BD-002 §8`) |
| ------------------------------ | ---------------------------------------------- |
| Adversidades                   | Descoberta                                     |
| Mapa Estratégico do Contexto   | Consideração, Contato Inicial                  |
| Compreensão                    | Diagnóstico                                    |
| Decisão                        | Recomendação, Contratação                      |
| Proteção                       | Onboarding, Relacionamento Contínuo            |
| Progresso                      | Renovação, Defesa da Marca                     |

A Progress Protection Philosophy é o modelo permanente e abstrato; a CXA é sua instância operacional já documentada. Novas jornadas (ex: Portal do Cliente) devem derivar da filosofia, não reinventá-la.

## 3. Core Principles

1. **Compreensão antes de decisão** — nenhuma interface pode solicitar uma decisão (contratar, avançar, confirmar) antes de garantir que o usuário compreende o que está decidindo.
2. **Clareza constrói confiança** — a confiança não é comunicada por selos, depoimentos ou urgência; é construída pela qualidade da explicação.
3. **Progresso como resultado, não conversão como métrica** — o sucesso de uma interface é o cliente avançar com mais clareza sobre seu próprio risco, não necessariamente fechar um formulário na primeira visita.
4. **Nenhuma técnica agressiva de conversão** — proibidos: contadores de urgência falsos, pop-ups de saída, pré-seleção de opções mais caras, linguagem de escassez artificial, dark patterns de qualquer tipo. (Consistente com `BD-002 §5`: expressões que geram medo/urgência já são vetadas na comunicação; aqui a mesma regra se aplica à interação.)

## 4. User Journey Principles

- Toda jornada deve ser percorrível na ordem Adversidades → Contexto → Compreensão → Decisão → Proteção → Progresso; nenhuma etapa pode ser pulada para acelerar uma conversão.
- Pontos de entrada diferentes (busca orgânica, indicação, redes sociais) podem entrar em etapas diferentes do funil, mas nunca pulam a etapa de Compreensão antes de solicitar Decisão.
- Cada etapa deve ter uma saída clara para a anterior (o usuário pode sempre voltar para entender melhor antes de decidir) — nunca um fluxo unidirecional que force avanço.
- Fricção é aceitável quando aumenta compreensão (ex: um diagnóstico de 3 perguntas antes de mostrar preço); fricção é inaceitável quando existe apenas para dificultar desistência.

## 5. Cognitive Principles

- Um conceito por vez — nunca introduzir cobertura, preço e prazo simultaneamente sem contexto prévio.
- Linguagem técnica sempre acompanhada de explicação em linguagem comum (`BD-002 §5`: "traduzir termos técnicos em linguagem acessível").
- Hierarquia visual deve refletir hierarquia de risco (`VIS-001 §1.2`: "hierarquia por contexto") — o que é mais crítico para a decisão do cliente aparece primeiro, não o que é mais lucrativo para a EcoSeg.
- Nenhuma decisão importante (contratar, alterar cobertura) deve depender de memória — o contexto relevante deve estar visível no momento da decisão, não em uma tela anterior.

## 6. Emotional Principles

- A experiência deve reduzir ansiedade, não explorá-la — nunca amplificar medo sobre um risco para motivar uma compra (`BD-002 §5`, expressões vetadas).
- O tom emocional segue o arquétipo Guardião+Sábio (`BD-001`): sereno mesmo diante de situações complexas, nunca alarmado.
- Reconhecimento antes de solução — antes de apresentar uma cobertura, a interface deve demonstrar que compreendeu a situação específica do cliente (equivalente digital de "Ouvir → Compreender", `BD-002 §6`).
- Progresso deve ser visivelmente comemorado (ex: confirmação clara de que uma cobertura foi contratada, com o que isso significa em termos práticos) — não apenas uma tela de sucesso genérica.

## 7. Visual Communication Principles

Herdados diretamente de `VIS-001`, aplicados à interface:

- Camadas de contexto (não redes) — uma cobertura contratada deve ser visualmente mostrada dentro do contexto que ela protege, não isolada em um card genérico.
- "Investigado, não gerado" (`VIS-001 §1.1`) — cada elemento de interface deve ter uma razão de existir ligada ao conteúdo real, nunca decoração de sistema de design genérico.
- Nenhum uso de clichês já vetados em `VIS-001 §1.3`: escudos, cadeados, cofres, redes neurais, gradientes futuristas.
- Evidência visual em vez de efeitos (`VIS-001 §1.2`) — preferir mostrar um número real, uma comparação real, uma cobertura real a usar animação/gradiente sem referente.

## 8. Decision Principles

- Toda tela que solicita uma decisão deve responder, visivelmente, à pergunta "por que esta recomendação, para o meu contexto específico?" — nunca apresentar uma oferta sem a justificativa de contexto que a precede.
- Nenhuma opção deve ser pré-selecionada de forma a beneficiar a EcoSeg às custas da clareza para o cliente (ex: plano mais caro pré-marcado como "recomendado" sem base no diagnóstico real).
- O custo de uma decisão (financeiro, de tempo, de compromisso) deve estar visível antes da decisão ser solicitada, nunca revelado só depois.
- Reversibilidade: sempre que possível, a interface deve deixar claro o que pode ser revisto/alterado depois e o que é definitivo no momento da decisão.

## 9. Accessibility Principles

- WCAG 2.2 AA como piso, não meta — consistente com o objetivo geral de acessibilidade já registrado no projeto do site (Fase 1, verificação de contraste em `docs/brand/brand-guidelines.md`).
- Compreensão (§4) não pode depender de um único canal sensorial — informação crítica de risco/cobertura nunca comunicada apenas por cor, ícone ou posição, sempre também por texto.
- Navegação por teclado e leitor de tela devem seguir a mesma ordem lógica de Adversidades → Contexto → Compreensão → Decisão (§4) — a ordem de tab reflete a ordem de raciocínio, não apenas a ordem visual do DOM.
- Linguagem simples (§5) é, em si, um requisito de acessibilidade cognitiva, não apenas uma escolha de tom.

## 10. Success Criteria

Uma experiência está alinhada a este documento quando:

- [ ] Nenhuma decisão é solicitada antes de uma etapa de compreensão equivalente estar completa.
- [ ] Nenhum padrão de conversão agressiva (dark pattern, urgência falsa, pré-seleção enviesada) está presente.
- [ ] A hierarquia visual da tela reflete a hierarquia de risco do cliente, não a hierarquia de margem da EcoSeg.
- [ ] Todo elemento visual pode ser justificado por um princípio deste documento ou de `VIS-001` — nada é "só design".
- [ ] A experiência passa no teste do síndico (`VIS-001 §1.4`, critério 4): compreensível sem jargão, incluindo o vocabulário de "Progress Protection Philosophy" em si — o cliente nunca precisa conhecer este documento para senti-lo funcionando.
- [ ] Critérios de acessibilidade (§9) verificados, não apenas presumidos.

Esta lista é um critério de aceite a ser aplicado a cada tela/fluxo novo — não uma auditoria já realizada sobre o site atual (Fase 1). Auditar o site existente contra esta lista é trabalho futuro, não incluído neste documento.

---

## Rastreabilidade

Depende de: `BD-001` (Brand DNA — pilares Orientar/Proteger/Evoluir, arquétipos Guardião+Sábio), `BD-002` (Brand Architecture — §5 Voice & Tone, §6 Communication Principles, §8 Experience Principles/CXA), `VIS-001` (linguagem visual — camadas, "investigado não gerado", anti-clichês, critério do síndico).

Afeta: qualquer tela, fluxo ou componente futuro do site EcoSeg e de produtos futuros (Portal do Cliente, Portal do Corretor). Não altera retroativamente o que já foi construído na Fase 1 do site — aplica-se a partir de agora e como critério de revisão futura.

Item em aberto: auditoria do site atual (Fase 1) contra os Success Criteria (§10) — ainda não realizada.

## Referências

- BD-001 — Brand DNA
- BD-002 — Brand Architecture Specification (especialmente §6 e §8)
- VIS-001 — Visual Identity System
- Customer Experience Architecture (CXA), documento recebido em 2026-07-21, referenciado em `BD-002 §8`

---

© EcoSeg Seguros
