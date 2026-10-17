# M0-VIS-001 — Especificação de correção visual da palestra

**Identificador:** M0-VIS-001\
**Natureza:** especificação de experiência visual\
**Direção:** A — híbrida, aprovada\
**Baseline de implementação:** `ec42c54b436eabe6f07f0ea126f8e22aca4d70f7`\
**Homologação de origem:** `M0-UX-HOMOLOGATION-001`\
**Critérios tratados:** `C01`, `C02`, `C03`, `C05`\
**Estado:** DOCUMENTATION SPECIFICATION\
**Implementação:** NOT AUTHORIZED\
**Próximo gate:** revisão e aprovação documental

## 1. Objetivo e escopo

Tornar o conteúdo legível em projeção 16:9 e em dispositivos móveis,
preservando a identidade institucional vigente, as duas experiências
independentes e a mesma fonte editorial governada.

Este documento especifica a correção visual das quatro reprovações da
homologação de origem. Não altera componentes, CSS, tokens de produção,
dependências, rotas, contratos TypeScript, conteúdo editorial publicado,
logotipos ou assets.

## 2. Resultado da homologação de origem

| Resultado                          | Quantidade |
| ---------------------------------- | ---------: |
| PASS                               |         13 |
| FAIL                               |          7 |
| N/A                                |          4 |
| Experiência do apresentador — PASS |          6 |
| Experiência do público — PASS      |          6 |

Este gate trata somente `C01`, `C02`, `C03` e `C05`. Os demais resultados não
são reabertos por esta especificação.

## 3. Hierarquia de autoridade

### Nível 1 — decisões institucionais

`ADR-B` · `VIS-001` · `DES-000`

Essas decisões prevalecem sobre qualquer hipótese visual local. `ADR-B-003`
mantém Verde Eco como primário institucional e Azul Institucional como
secundário. `M1-R03` também registra `ADR-B-003` como autoridade para os papéis
cromáticos e proíbe soluções locais que alterem tokens.

### Nível 2 — contratos da palestra

`M1-R03` · `UX-PAL-001` · `M0-VIS-001`

Esses contratos aplicam a autoridade institucional ao canal da palestra. Não
criam identidade paralela, não qualificam conteúdo jurídico automaticamente e
não autorizam implementação.

### Nível 3 — referências experimentais

O Brand Studio ECOSEG pode informar contraste, composição, superfícies,
tipografia e acentos como referência exploratória. Não pode revogar decisões
institucionais. Navy, brass, tipografias alternativas e o símbolo Viga & Arco
de Horizonte permanecem experimentais e não são identidade oficial.

## 4. Direção híbrida aprovada

A direção híbrida combina:

1. a autoridade institucional vigente para marca, papéis cromáticos,
   acessibilidade e reconhecimento;
2. a experimentação controlada do Brand Studio para melhorar leitura,
   composição e separação entre projeção e leitura extensa.

As experiências podem distribuir ou resumir visualmente o conteúdo para cada
contexto, mas não podem alterar seu significado, remover ressalvas jurídicas ou
criar divergência editorial.

## 5. Contrato por experiência

### 5.1 Modo apresentação

- proporção 16:9 e leitura à distância;
- títulos dominantes e uma única ideia visual principal por quadro;
- corpo de texto reduzido, sem ocultar conteúdo necessário;
- progressão editorial clara e controles preservados;
- referências discretas, porém legíveis e rastreáveis;
- tela cheia, navegação por teclado e redução de movimento preservadas.

### 5.2 Leitura pública

- layout fluido para celular e tablet;
- capítulos navegáveis independentemente da apresentação projetada;
- parágrafos completos, com hierarquia adequada à leitura contínua;
- referências jurídicas acessíveis e rastreáveis;
- foco visível, ordem de leitura coerente e suporte a tecnologias assistivas;
- nenhuma autenticação ou coleta obrigatória de dados para acompanhar a leitura.

Ambas as experiências consomem a mesma versão editorial governada.

## 6. Requisitos visuais verificáveis

| ID           | Regra                                                    | Critério de verificação                                                                  |
| ------------ | -------------------------------------------------------- | ---------------------------------------------------------------------------------------- |
| `VIS-REQ-01` | Definir pares explícitos de fundo e texto para projeção. | Contraste normal ≥ 4,5:1 e texto grande ≥ 3:1, calculados nos pares efetivamente usados. |
| `VIS-REQ-02` | Definir escala tipográfica e espaçamento para 16:9.      | Leitura validada em projetor real, a distância de uso.                                   |
| `VIS-REQ-03` | Separar conteúdo projetado de leitura extensa.           | Não existe duplicação editorial divergente entre as experiências.                        |
| `VIS-REQ-04` | Preservar tokens institucionais aprovados.               | Verde e azul mantêm seus papéis de marca definidos por `ADR-B-003`.                      |
| `VIS-REQ-05` | Registrar navy e brass como tokens experimentais locais. | Nenhuma alteração do tema global ou promoção a identidade oficial.                       |
| `VIS-REQ-06` | Estabelecer limite de densidade por tipo de slide.       | Conteúdo excedente é reorganizado ou encaminhado à leitura pública, nunca ocultado.      |
| `VIS-REQ-07` | Preservar navegação, tela cheia e responsividade.        | Nenhuma regressão funcional nos comportamentos homologados.                              |
| `VIS-REQ-08` | Registrar origem e autoridade de cada decisão visual.    | Cada decisão aparece na matriz de rastreabilidade deste documento.                       |

Exemplos de cor isolados não comprovam acessibilidade. A conformidade deve ser
calculada para cada combinação concreta aprovada em uma etapa posterior.

## 7. Escala, espaçamento e densidade

Esta seção define limites documentais, não valores de CSS ou tokens de produção.

### Apresentação 16:9

- um título dominante por quadro;
- subtítulo ou contexto apenas quando necessário para compreensão;
- no máximo três agrupamentos de informação concorrentes;
- cada agrupamento deve caber na área segura de projeção sem depender de zoom;
- referências ficam no rodapé ou em área secundária consistente, mas continuam legíveis;
- texto excedente deve migrar para a leitura pública mantendo a mesma fonte e significado.

### Leitura pública

- corpo dimensionado para leitura contínua em celular;
- parágrafos curtos e agrupados por capítulo;
- espaçamento suficiente entre blocos, controles e referências;
- nenhuma informação essencial depende apenas de cor, posição ou movimento;
- o foco de teclado acompanha a ordem editorial.

## 8. Tratamento dos tipos de apresentação

Os seis tipos autorizados por `M1-R03` são preservados. “E agora?” continua uma
transição editorial, não um sétimo tipo.

| Tipo          | Tratamento visual documental                                                                                                  |
| ------------- | ----------------------------------------------------------------------------------------------------------------------------- |
| `OPENING`     | Título e pergunta de abertura dominantes; baixa densidade; estabelece contexto humano sem CTA de produto.                     |
| `CONTEXT`     | Agrupa circunstâncias e fatos por camadas; evidencia relações sem sugerir recomendação automática.                            |
| `EVIDENCE`    | Dá prioridade à afirmação, fonte e referência rastreável; não transforma o quadro em autoridade jurídica por si só.           |
| `EXPLANATION` | Usa hierarquia e comparação para tornar a complexidade compreensível; separa fato publicado de explicação ECOSEG.             |
| `METHOD`      | Torna legível a sequência consultiva `Ouvir → Compreender → Orientar → Recomendar`, sem recomendar produto no próprio quadro. |
| `CTA`         | Apresenta um próximo passo claro e sem pressão; não implica contratação automática.                                           |

## 9. Matriz de rastreabilidade

| Critério reprovado | Requisitos visuais                                     | Autoridades e contratos                               | Evidência documental esperada                                                                              |
| ------------------ | ------------------------------------------------------ | ----------------------------------------------------- | ---------------------------------------------------------------------------------------------------------- |
| `C01`              | `VIS-REQ-01`, `VIS-REQ-02`, `VIS-REQ-04`, `VIS-REQ-05` | `ADR-B-003`, `VIS-001`, `DES-000` Art. IV/V           | Pares de contraste calculados; escala 16:9; papéis institucionais preservados; experimentos identificados. |
| `C02`              | `VIS-REQ-02`, `VIS-REQ-06`                             | `VIS-001`, `DES-000` Art. I/II/IV                     | Escala, área segura, limite de densidade e tratamento por tipo documentados.                               |
| `C03`              | `VIS-REQ-03`, `VIS-REQ-06`, `VIS-REQ-08`               | `M1-R03`, `UX-PAL-001`, `DES-000` Art. III/VI         | Fonte editorial comum; apresentação e leitura sem divergência; origem de cada decisão registrada.          |
| `C05`              | `VIS-REQ-01`, `VIS-REQ-04`, `VIS-REQ-07`               | `ADR-B-003`, `M1-R03`, `UX-PAL-001`, `DES-000` Art. V | Contraste e responsividade verificados; navegação, tela cheia, teclado e redução de movimento preservados. |

## 10. Plano de verificação visual e regressão funcional

| Critério funcional | Verificação planejada                                                                            |
| ------------------ | ------------------------------------------------------------------------------------------------ |
| AC-01              | Confirmar título oficial na rota pública e na apresentação.                                      |
| AC-02              | Executar abertura em 16:9 e testar tela cheia em ambiente de projeção.                           |
| AC-03              | Avançar e retroceder por controle e teclado, comparando a ordem editorial.                       |
| AC-04              | Confirmar “E agora?” após os temas legais, sem resposta pré-preenchida nem novo tipo.            |
| AC-05              | Conferir identificação institucional e nomes aprovados nos agradecimentos.                       |
| AC-06              | Abrir capítulos em dispositivo móvel sem autenticação.                                           |
| AC-07              | Navegar no dispositivo do participante enquanto a apresentação projetada permanece independente. |
| AC-08              | Testar viewport móvel, teclado, foco, leitura assistiva e legibilidade.                          |
| AC-09              | Conferir referência rastreável e validação editorial em cada afirmação jurídica publicada.       |
| AC-10              | Confirmar separação visual e semântica do contato consultivo, conteúdo jurídico e produtos.      |
| AC-11              | Comparar apresentação e leitura contra a mesma versão editorial governada.                       |
| AC-12              | Confirmar ausência de sincronização em tempo real e de sessão compartilhada como dependências.   |

A verificação de contraste deve usar os pares concretos da proposta visual e
registrar ferramenta, valores, viewport e contexto de uso. A verificação de
projeção deve registrar projetor, resolução, distância aproximada e resultado.

## 11. Decisões pendentes e exclusões

### Pendentes

- validar os pares concretos de contraste antes de qualquer implementação;
- validar escala e densidade em projetor real;
- decidir, em gate próprio, se alguma referência experimental deve ser adotada;
- manter separadas as futuras especificações `M1-R04`, `M1-R05` e `M1-R06`.

### Exclusões

- não aprova Obsidian Navy, Alabaster Pearl, Imperial Brass ou Deep Evergreen Slate como tokens institucionais;
- não aprova tipografias alternativas do Brand Studio como tipografia oficial;
- não aprova o símbolo Viga & Arco de Horizonte;
- não promove SVGs exploratórios a logotipo master;
- não altera `src/`, componentes, CSS/Tailwind, tema, contratos, dependências, rotas, conteúdo publicado ou assets;
- não cria M1-R04, M1-R05 ou M1-R06;
- não executa instalação, build, commit, push, merge ou deploy.

## 12. Critérios de encerramento

O gate poderá ser encerrado quando:

1. os oito `VIS-REQ` estiverem verificáveis;
2. `C01`, `C02`, `C03` e `C05` tiverem rastreabilidade documental;
3. a separação entre autoridade institucional e hipótese experimental estiver explícita;
4. os seis tipos de apresentação e a transição “E agora?” estiverem preservados;
5. o plano de verificação dos 12 critérios funcionais estiver aceito;
6. a implementação permanecer bloqueada até autorização posterior.

```text
GATE=M0-VIS-001-DOC
DIRECTION=HYBRID_APPROVED
DOCUMENTATION_CONTRACT=COMPLETED
VISUAL_REQUIREMENTS=8
FAILED_CRITERIA_TRACED=4
PRESENTATION_TYPES_COVERED=6
BRAND_GOVERNANCE_PRESERVED=YES
IMPLEMENTATION_AUTHORITY=NOT_GRANTED
COMMIT_AUTHORITY=NOT_GRANTED
DEPLOY_AUTHORITY=NOT_GRANTED
NEXT_GATE=USER_REVIEW
```

© EcoSeg Seguros
