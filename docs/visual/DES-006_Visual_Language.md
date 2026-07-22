# DES-006 — Visual Language System

**Marca:** EcoSeg Seguros

**Identificador:** DES-006

**Categoria:** Identidade Visual

**Status:** Ativo (especificação — ver §11, estado de implementação)

**Versão:** 1.0

Este documento não é um logotipo — é a linguagem visual completa da EcoSeg, de forma que qualquer peça seja reconhecível **mesmo sem o logotipo**. Deriva inteiramente da metáfora consolidada em `VIS-001`/`DES-004`: **Mapa Estratégico do Contexto** — um núcleo protegido por camadas de contexto. Todo elemento gráfico documentado aqui — pattern, forma, curva, ícone, ilustração, fotografia, infográfico, diagrama — é uma expressão dessa metáfora, nunca uma escolha estética isolada.

---

## Teste de Reconhecimento (critério permanente)

Toda peça produzida sob este documento deve passar no seguinte teste, análogo ao "critério do síndico" de `VIS-001 §1.4`: **remova o logotipo. A peça ainda é reconhecível como EcoSeg?** Se a resposta for não — se a peça depende do logotipo para ser identificada — ela não está usando a linguagem visual corretamente; está apenas aplicando uma marca d'água sobre um design genérico.

## Restrições (lista consolidada e ampliada)

Já vetados em `VIS-001 §1.3`: escudos, cadeados, cofres, guarda-chuva, muralha, redes neurais, circuitos, gradientes futuristas, partículas flutuantes.

**Ampliado por este documento — nunca utilizar:**

- Mãos protegendo (casa, família, objeto) — clichê universal do setor de seguros.
- Pessoas sorrindo apontando para gráficos — clichê de stock photo corporativo genérico, não específico à EcoSeg.
- Qualquer iconografia de "seguro tradicional" (guarda-chuva sobre casa, balança de justiça, aperto de mão genérico).

Qualquer uma dessas presente em uma peça é motivo de rejeição automática, independente da qualidade de execução.

---

## 1. Patterns

**Base:** linhas de contorno (contour lines) concêntricas ou levemente deslocadas — a expressão gráfica mais direta da metáfora "camadas de contexto" e do vocabulário topográfico já estabelecido em `DES-005 §1`.

**Regra de uso:** um pattern nunca preenche um espaço vazio arbitrariamente — ele sempre se origina de ou se relaciona a um elemento de conteúdo real próximo (ex: linhas de contorno emanando da borda de um card, nunca um pattern de fundo genérico repetido infinitamente sem relação com o conteúdo). Opacidade baixa (4–8%) quando usado como textura de apoio — nunca compete com o texto.

## 2. Backgrounds

**Proibido:** gradientes decorativos, "mesh gradients", blobs orgânicos sem estrutura — todos clichês de tech genérico já vetados (`VIS-001 §1.3`).

**Padrão:** superfícies planas (`DES-004` tokens de cor) como base; textura de contorno (§1) apenas em áreas de transição entre seções, nunca no corpo principal de leitura. Um background nunca deve competir pela atenção com o núcleo (conteúdo) que ele envolve — ele é a camada mais externa, deve se comportar como tal.

## 3. Shapes

**Forma primária:** formas concêntricas (círculo-em-círculo, ou quadrado arredondado-em-quadrado arredondado) — representação literal de núcleo + camada. Usada como estrutura de composição, não necessariamente como elemento visível isolado (ex: um card com um elemento de destaque centralizado e conteúdo de apoio ao redor já _é_ essa forma, sem precisar desenhar círculos literais).

**Forma secundária:** formas que se interceptam (dois contornos parcialmente sobrepostos) — representa "interseções" (diagnóstico, per `VIS-001 §VIS-001.3A.1`). Usada em contextos que comunicam análise/comparação.

**Proibido:** formas sólidas preenchidas sem estrutura interna (blobs) — per `DES-004 §5`/`§6`, toda forma segue o radius institucional (levemente arredondado, nunca extremo) e deve poder ser lida como camada, não como decoração de preenchimento.

## 4. Curves

Curvas de nível (contour lines) — não ondas decorativas genéricas. A curva na EcoSeg sempre representa uma fronteira entre camadas de contexto, nunca um elemento gráfico solto.

**Uso:** divisores entre seções (substituindo uma linha reta ou um divisor decorativo tipo "onda de site institucional") — uma curva sutil e assimétrica, consistente com o easing `contour-out` de `DES-005 §2` (a curva estática é a "foto parada" do movimento definido lá).

**Proibido:** curvas simétricas decorativas (ex: "blob shape" comum em sites de tech/SaaS), curvas usadas sem relação com uma transição de camada real.

## 5. Layers

O dispositivo estrutural central de toda a linguagem visual — não uma categoria isolada, mas o princípio que organiza as outras oito.

**Regra:** toda composição visual da EcoSeg deve poder ser descrita como "núcleo + N camadas", nunca como uma colagem plana de elementos no mesmo nível. Profundidade é comunicada por sobreposição parcial (um elemento na frente de outro) e por redução de opacidade/saturação à medida que um elemento se afasta do núcleo — nunca apenas por `z-index` sem indicação visual de profundidade (sombra sutil, per `DES-004 §5`, ou sobreposição real).

## 6. Icons

Lucide, outline apenas (já estabelecido, `VIS-001 §1.4`/`docs/brand/brand-guidelines.md`) — sem preenchimento sólido, sem múltiplas cores por ícone (um único traço na cor do contexto: `--foreground`, `--accent`, ou `--muted-foreground`, nunca combinações).

**Seleção de ícone orientada pelo glossário (`VIS-001 §VIS-001.3A.1`):** preferir ícones que representem os conceitos do Mapa (camadas, núcleo, interseção, evidência) a ícones genéricos de "categoria" (ex: para "Diagnóstico", preferir um ícone que sugira sobreposição/interseção a uma lupa genérica, que é clichê de "busca" sem relação com a metáfora).

**Proibido:** qualquer ícone de escudo, cadeado, guarda-chuva, cofre — mesmo estilizado — per a lista de restrições acima.

## 7. Illustrations

**Padrão:** quando ilustração for necessária, ela é diagramática/esquemática — no espírito do Painel B de `VIS-001 §1.3` (ciência: cortes geológicos, diagramas, atlas) — nunca cena ilustrada com personagens ou situações "de vida real" estilizadas (o estilo "flat illustration com pessoas" comum em sites de SaaS/fintech é, na prática, tão clichê quanto os ícones de seguro tradicional, apenas de um gênero diferente).

**Proibido, explicitamente:** qualquer ilustração de pessoa sorrindo, mãos protegendo objetos, ou cenas narrativas ("família em casa", "empresário aliviado"). Se uma situação humana precisa ser comunicada, usar fotografia documental (§8), não ilustração estilizada.

## 8. Photography

**Padrão:** fotografia documental — ambientes reais (operações, instalações, contextos urbanos/industriais que representem "operação" per `BD-002`), nunca still de banco de imagens genérico com pessoas posando.

**Tratamento visual:** fotografias são sempre enquadradas como uma camada — cropadas dentro de uma forma de contenção (retângulo arredondado, per `DES-004` radius) que sugere "olhar para dentro" de um contexto específico, nunca full-bleed ocupando a tela inteira sem moldura, que romperia a lógica de camadas.

**Proibido:** pessoas sorrindo diretamente para a câmera apontando para gráficos/telas (clichê explícito vetado); still genérico de "aperto de mão de negócios".

## 9. Infographics

**Padrão:** todo infográfico deve visualizar literalmente núcleo + camadas — ex: um mapa de risco patrimonial mostrando o patrimônio como centro e fatores de exposição como camadas ao redor (legislação, contratos, operação, per `VIS-001 §1.1`) — nunca um gráfico de barras/pizza genérico "vestido" com as cores da marca sem relação estrutural com a metáfora.

**Regra "investigado, não gerado" (`VIS-001 §1.1`):** um infográfico deve parecer o resultado de uma análise real, com rótulos e relações específicas, nunca um template de gráfico decorativo preenchido com números de exemplo.

## 10. Diagram Language

A expressão mais literal da metáfora — usada para explicar a Metodologia (per `DES-002`) e o próprio conceito de Mapa Estratégico do Contexto (a página homônima, per `DES-002`).

**Padrão:** diagramas no estilo de mapas cartográficos anotados — camadas rotuladas, linhas de contorno, pontos de interseção marcados — não fluxogramas corporativos genéricos (caixas retangulares conectadas por setas retas, estilo "flowchart de apresentação").

**Aplicações futuras diretas:** o componente `Timeline` especificado em `DES-004` (camada Tempo) e uma eventual ferramenta interativa de autodiagnóstico (mencionada como direção futura em `DES-002`, seção Mapa Estratégico do Contexto) devem usar esta linguagem de diagrama, não widgets genéricos de biblioteca de gráficos.

---

## 11. Estado de Implementação

Como os documentos anteriores desta série, este é **especificação**, não implementação. Auditoria honesta do que já existe:

| Item                            | Estado                                                                                                                                                                           |
| ------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Ícones (Lucide, outline)        | ✅ Já implementado e alinhado (`lucide-react` em uso em todo o projeto)                                                                                                          |
| Patterns / texturas de contorno | Não implementado                                                                                                                                                                 |
| Backgrounds com textura         | Não implementado — hoje backgrounds são superfícies planas (`DES-004` tokens), o que já está correto por padrão (§2), apenas sem a textura de transição ainda                    |
| Shapes concêntricas/interseção  | Não implementado como elemento gráfico explícito — a lógica de "núcleo + camada" hoje só existe estruturalmente (layout), não graficamente                                       |
| Curves (divisores)              | Não implementado — divisores de seção hoje são implícitos (mudança de `tone` no `Section`, per `DES-004`), sem curva visual                                                      |
| Layers (princípio)              | Parcialmente presente via `shadow-sm`/`border` (`DES-004 §5`), sem sobreposição real ainda                                                                                       |
| Illustrations                   | Não existem no site hoje — nenhuma violação, apenas ausência                                                                                                                     |
| Photography                     | Não existe no site hoje (nenhuma foto real usada na Fase 1) — item do backlog já registrado em `docs/backlog.md` ("fotografia real... substituindo qualquer placeholder visual") |
| Infographics                    | Não existem ainda — candidatos naturais para `Soluções`/`Mapa Estratégico do Contexto` quando essas páginas forem construídas (`DES-002`)                                        |
| Diagram Language                | Não implementado — `Timeline` (per `DES-004`) segue sem implementação                                                                                                            |

Nenhum destes itens deve ser presumido como "fácil de adicionar depois" sem revisão — cada um exige decisões de execução (ex: como desenhar uma linha de contorno em SVG de forma performática) fora do escopo deste documento.

---

## Rastreabilidade

Depende de: `VIS-001` (hipótese do núcleo+camadas, glossário conceitual, restrições originais), `DES-004` (tokens, Elevation/Shadow como base técnica de Layers), `DES-005` (vocabulário topográfico, easings — base do tratamento estático de Curves).

Afeta: qualquer asset gráfico futuro (ícones customizados, fotografia, infográficos) e páginas ainda não construídas que dependem fortemente de linguagem visual (`Metodologia`, `Mapa Estratégico do Contexto`, `Quem Somos`, per `DES-002`).

Itens em aberto:

- Nenhum item deste documento foi implementado graficamente (ver §11) além de ícones.
- Execução técnica de patterns/curves (SVG, performance) não especificada — decisão de implementação futura.
- Fotografia real (backlog já existente, `docs/backlog.md`) ainda depende de sessão de fotos real da EcoSeg — não pode ser produzida sem isso.

## Referências

- VIS-001 — Visual Identity System
- DES-004 — Design System
- DES-005 — Motion Language
- `docs/backlog.md` — item de fotografia real já registrado
- `docs/brand/brand-guidelines.md`

---

© EcoSeg Seguros
