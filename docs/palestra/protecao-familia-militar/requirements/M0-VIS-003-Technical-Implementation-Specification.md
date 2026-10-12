# M0-VIS-003 — Especificação técnica de implementação visual

**Projeto:** Consultoria ECOSEG — Palestra Proteção da Família Militar  
**Estado:** PROPOSTA PARA REVISÃO (`DRAFT`)  
**Gate:** `M0-VIS-003-P2-CONSOLIDATION`  
**Branch de referência:** `feat/marco-0-palestra`  
**HEAD de referência informado:** `cd987d0a06c7d09b19501ecf277a57f589f08688`  
**Natureza:** planejamento documental; sem autorização de implementação, publicação, commit ou deploy.

## 1. Objetivo e autoridade

Definir o contrato técnico proposto para aplicar a direção visual **C — híbrida por contexto** à apresentação projetada (16:9, superfície escura) e à leitura pública independente (celular/tablet, superfície clara), com **uma única fonte editorial governada**.

Referências normativas: `UX-PAL-001`, `M0-VIS-001`, `M0-VIS-002`, `M1-R03`, `ADR-B-003`, `VIS-001` e `DES-000`. Este documento não altera nem substitui essas autoridades. Havendo conflito, exigir adjudicação antes da implementação.

A especificação baseia-se nos relatórios de inspeção somente leitura `M0-VIS-003-P1` (oito arquivos) e `M0-VIS-003-P2-D01` (fonte editorial). Não constitui auditoria independente do código nem comprovação de testes.

## 2. Estado observado na descoberta

- Rotas implementadas: `/palestra/protecao-familia-militar` e `/palestra/protecao-familia-militar/apresentacao`.
- Fonte editorial compartilhada: `src/content/presentations/military-family-protection.ts`.
- Cinco seções com `id`, `eyebrow`, `title`, `summary`, três `talkingPoints` e `referenceIds: []` em todas.
- Estado editorial global: `DRAFT`; sem status individual por seção ou referências jurídicas associadas.
- O deck utiliza renderização uniforme e superfície `bg-accent`; não implementa os seis tipos semânticos nem a direção visual C.
- Navegação por teclado, progresso, tela cheia, utilitários responsivos e `prefers-reduced-motion` estão presentes, porém sem testes específicos encontrados. Tela cheia incide sobre `document.documentElement`.
- A landing exibe termos internos de homologação e o CTA principal “Abrir modo apresentação”; a leitura pública por capítulos ainda é incompleta.
- Não há transição “E agora?” nem seção `EVIDENCE`.
- Nenhum teste foi executado na descoberta.

## 3. Decisões arquiteturais propostas

**ARQ-01 — Fonte única:** preservar a fonte editorial governada para projeção e leitura pública. Apresentação pode sintetizar e leitura pública pode detalhar, mas sem alterar sentido, ressalvas, referências ou estado de publicação.

**ARQ-02 — Tipos semânticos:** disponibilizar `OPENING`, `CONTEXT`, `EVIDENCE`, `EXPLANATION`, `METHOD`, `CTA` no contrato de apresentação. O tipo indica função narrativa, nunca validação jurídica, autorização de publicação ou elegibilidade comercial.

**ARQ-03 — Estilo por contexto:** superfície escura local para projeção e clara para leitura pública. Manter Inter, Verde Eco `#1F7A5C` e Azul Institucional `#0B3D63` como identidade institucional. Navy `#080D14`, Pearl `#F8F9FA` e Brass `#C5A880` permanecem referências locais experimentais, sem promoção a tokens globais ou alteração de marca.

**ARQ-04 — Compatibilidade:** preservar IDs, `referenceIds`, estados editoriais, controles, navegação, isolamento do chrome, reduced motion e rotas existentes. Mudanças em publicação, autenticação, sincronização, contratação ou privacidade estão excluídas.

**ARQ-05 — Tipos não são contagem de slides:** não exigir uma seção por tipo nem criar conteúdo fictício para completar os seis tipos.

## 4. Matriz de impacto por arquivo

| Arquivo                                                           | Alteração futura proposta                                                   | Critério de aceite / autoridade                 | Restrição                                                             |
| ----------------------------------------------------------------- | --------------------------------------------------------------------------- | ----------------------------------------------- | --------------------------------------------------------------------- |
| `src/contracts/presentation.ts`                                   | Introduzir campo/tipo semântico com estratégia de compatibilidade a definir | Seis tipos reconhecidos; `M1-R03`, `VIS-REQ-08` | Não mudar estados, `referenceIds` ou publicação                       |
| `src/content/presentations/military-family-protection.ts`         | Classificar seções após decisão editorial; registrar lacunas                | Coerência narrativa; `UX-PAL-001`, `VIS-REQ-06` | Preservar `DRAFT`, IDs, textos e referências até aprovação específica |
| `src/components/presentation/presentation-deck.tsx`               | Renderização contextual por tipo e superfície escura                        | `VIS-REQ-01/02/05/06/07`; controles preservados | Não presumir `EVIDENCE` validado; não quebrar fullscreen/teclado      |
| `src/app/palestra/protecao-familia-militar/page.tsx`              | Experiência clara de leitura por capítulos; tratar linguagem interna        | `UX-PAL-001`, `VIS-REQ-03`                      | Mudança de copy exige aprovação editorial; sem nova rota automática   |
| `src/app/palestra/protecao-familia-militar/apresentacao/page.tsx` | Verificar fronteira da composição; alterar apenas se necessário             | Isolamento da experiência de projeção           | Evitar mudança desnecessária                                          |
| `src/app/globals.css`                                             | Preferir não alterar; somente ajuste contextual estritamente justificado    | `ADR-B-003`, `VIS-REQ-04/05`                    | Não substituir tokens globais                                         |
| `src/app/layout.tsx`                                              | Preservar                                                                   | Inter e chrome global mantidos                  | Sem alteração prevista                                                |
| `package.json`                                                    | Preservar inicialmente                                                      | Ferramentas atuais inventariadas                | Novas dependências/testes exigem autorização própria                  |

## 5. Matriz editorial das cinco seções

| Ordem | ID / título atual                                               | Tipo proposto | Confiança | Situação                                               |
| ----- | --------------------------------------------------------------- | ------------- | --------- | ------------------------------------------------------ |
| 1     | `opening` — O que sua família espera que esteja protegido?      | `OPENING`     | Alta      | Aceito para planejamento                               |
| 2     | `context` — Expectativa e realidade precisam ser comparadas     | `CONTEXT`     | Alta      | Aceito para planejamento; revisar formulações futuras  |
| 3     | `gap` — A ausência de clareza também é um risco                 | `EXPLANATION` | Média     | Condicional à distinção entre fato e explicação ECOSEG |
| 4     | `method` — Compreender antes de recomendar                      | `METHOD`      | Alta      | Aceito para planejamento; separar método de produto    |
| 5     | `next-step` — A palestra abre a conversa; não encerra a análise | `CTA`         | Média     | Condicional à homologação de privacidade/captação      |
| —     | Nenhuma seção                                                   | `EVIDENCE`    | —         | Ausente; não criar automaticamente                     |

Todas as cinco seções possuem `referenceIds: []`; a fonte global está `DRAFT`. Portanto, não há base para declarar evidência jurídica validada ou publicação autorizada.

## 6. Quatro propostas editoriais condicionais

**ED-01 — `gap` como `EXPLANATION`:** classificação provisória recomendada, sem reescrever texto. A aprovação definitiva depende de separar explicitamente fato normativo, hipótese e interpretação consultiva ECOSEG. Se a distinção não for possível, manter a classificação em aberto ou reavaliar `CONTEXT`.

**ED-02 — `EVIDENCE` ausente:** manter o tipo no contrato, sem criar slide ou alegação. A inclusão depende de fonte oficial identificada, dispositivo, contexto, ressalvas, estado editorial apropriado e aprovação jurídica/editorial em gate próprio (previsto `M1-R04`). Tipo `EVIDENCE` não implica validação por si só.

**ED-03 — `next-step` como `CTA`:** classificação provisória de convite consultivo, sem autorização para formulário, captação de dados, contratação, diagnóstico automático ou novo fluxo comercial. A disponibilização depende da homologação de privacidade e do texto público.

**ED-04 — “E agora?”:** transição editorial candidata entre `gap` e `method` **somente na sequência atual**; não constitui sétimo tipo e não contém resposta ou oferta pré-preenchida. Com a futura incorporação de conteúdo jurídico, reposicionar após os temas jurídicos, sujeito a aprovação editorial. Nenhuma inserção de conteúdo é autorizada agora.

**Status:** `ED-01` a `ED-04` são propostas para adjudicação, não decisões editoriais aprovadas nem mudanças autorizadas.

## 7. Unidades de implementação futura

| Unidade                                | Dependências                                  | Entrega pretendida                                    | Gate de aceite                        |
| -------------------------------------- | --------------------------------------------- | ----------------------------------------------------- | ------------------------------------- |
| U1 — Contrato semântico                | Decisão sobre compatibilidade e ED-01/03      | Tipos definidos sem alterar semântica de publicação   | Revisão de contrato e compatibilidade |
| U2 — Fonte editorial e leitura pública | U1, decisões editoriais, privacidade para CTA | Capítulos públicos e mapeamento sem perda de conteúdo | Revisão editorial + UX                |
| U3 — Renderização contextual           | U1, diretriz visual C; U2 quando aplicável    | Layout por tipo, estilos locais, projeção escura      | Revisão visual + regressão funcional  |
| U4 — Validação e homologação           | U1–U3 conforme implementadas                  | Evidências de testes e avaliação real                 | Homologação formal                    |

A ordem não autoriza executar unidades em lote. Cada mudança deve ter escopo e aprovação próprios, com diffs revisáveis e possibilidade de reversão por unidade. A landing pode ser trabalhada independentemente apenas quando sua alteração não violar fonte compartilhada ou decisões editoriais pendentes.

## 8. Matriz de verificação e evidências

| ID   | Verificação                            | Evidência exigida                                                                           | Estado   |
| ---- | -------------------------------------- | ------------------------------------------------------------------------------------------- | -------- |
| V-01 | Contraste de pares efetivamente usados | Pares, valores calculados, contexto e critérios WCAG (4,5:1 texto normal; 3:1 texto grande) | Pendente |
| V-02 | Projeção 16:9                          | Projetor real, resolução, distância, área segura, legibilidade                              | Pendente |
| V-03 | Leitura pública independente           | Celular/tablet, capítulos, hierarquia e navegação sem sincronização obrigatória             | Pendente |
| V-04 | Controles e acessibilidade             | Setas, Home/End, PageUp/PageDown, espaço, foco, fullscreen/erro, reduced motion             | Pendente |
| V-05 | Seis tipos semânticos                  | Cobertura do renderer para cada tipo, inclusive tipo sem conteúdo publicado                 | Pendente |
| V-06 | “E agora?”                             | Posição editorial aprovada, sem sétimo tipo ou oferta automática                            | Pendente |
| V-07 | Regressão `UX-PAL-001`                 | Resultado dos 12 critérios funcionais, com evidências e falhas registradas                  | Pendente |
| V-08 | Governança editorial/jurídica          | `referenceIds`, status, ressalvas, publicação e privacidade preservados                     | Pendente |

Os contrastes preliminares de `M0-VIS-002` não substituem medições dos pares realmente renderizados. Testes automatizados novos exigem gate de autorização; não foram localizados scripts específicos no inventário inicial. Não marcar verificações como PASS antes de execução.

## 9. Riscos, bloqueios e exclusões

**Riscos:** regressão de navegação e fullscreen; perda de referências; confusão entre tipo e validação jurídica; divergência de conteúdo entre experiências; alteração global de identidade; linguagem de homologação exposta ao público; falsa sensação de cobertura por ausência de testes.

**Bloqueios para implementação:** adjudicação de `ED-01` a `ED-04` no que afetarem o escopo; estratégia de compatibilidade do contrato; autorização específica de alterações; revisão jurídica para `EVIDENCE`; homologação de privacidade para CTA com captação; plano de validação e evidências.

**Fora de escopo:** nova rota `/palestra` (preservar rota real), novas alegações jurídicas, alteração de marca/logo, tokens globais, autenticação, sincronização em tempo real, contratação automática, deploy, push, merge, commit, instalação de dependências e mudanças de código neste gate.

## 10. Governança e decisão solicitada

A revisão deve decidir:

1. Aceitar ou ajustar ARQ-01 a ARQ-05.
2. Adjudicar individualmente ED-01 a ED-04, ou mantê-las condicionais.
3. Aprovar a matriz de impacto e a ordem U1–U4 como plano, não execução.
4. Definir o gate posterior de implementação com escopo, testes, rollback e autoridade explícitos.

**Estado de saída proposto:** `M0-VIS-003-P2-CONSOLIDATION=READY_FOR_USER_REVIEW`; `IMPLEMENTATION_AUTHORITY=NOT_GRANTED`; `GIT_MUTATION=NOT_GRANTED`; `DEPLOY_AUTHORITY=NOT_GRANTED`.
