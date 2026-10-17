# UX-PAL-001 — Experiência de apresentação e acompanhamento da palestra

**Palestra:** Lei nº 13.954/2019\
**Usuário principal:** João Brito\
**Modalidade pública:** leitura independente\
**Estado funcional:** APPROVED\
**Estado de implementação:** NOT AUTHORIZED

## 1. Objetivo

Permitir que João conduza a palestra por um notebook conectado ao projetor,
utilizando uma apresentação 16:9, enquanto os participantes acessam uma
experiência pública de leitura independente em seus próprios dispositivos.

As duas experiências utilizam a mesma versão editorial governada, com
apresentações adequadas a cada contexto de uso. A navegação do participante não
depende da apresentação projetada, de sincronização em tempo real ou de sessão
compartilhada.

## 2. Casos de uso aprovados

### UC-PAL-001 — Iniciar apresentação

- **Ator:** João Brito.
- **Objetivo:** abrir a apresentação oficial em modo adequado ao projetor.
- **Pré-condições:** a versão editorial aprovada está disponível; João acessa a rota de apresentação.
- **Fluxo principal:** João acessa a apresentação; o título oficial é exibido; ele seleciona o modo de apresentação e, se necessário, tela cheia.
- **Fluxos alternativos:** se tela cheia não estiver disponível, a apresentação continua utilizável em janela; se a rota pública for acessada, o participante permanece na experiência de leitura.
- **Pós-condições:** a apresentação está pronta para condução sem alterar a sequência editorial.
- **Critérios:** AC-01, AC-02, AC-11.

### UC-PAL-002 — Navegar entre slides

- **Ator:** João Brito.
- **Objetivo:** avançar e retroceder durante a palestra.
- **Pré-condições:** apresentação iniciada.
- **Fluxo principal:** João usa os controles ou o teclado para avançar e retroceder; a sequência editorial permanece governada.
- **Fluxos alternativos:** João retorna a um slide anterior sem alterar o conteúdo publicado; recursos de acessibilidade continuam disponíveis.
- **Pós-condições:** o slide correspondente ao comando permanece visível.
- **Critérios:** AC-03, AC-12.

### UC-PAL-003 — Conduzir a pausa “E agora?”

- **Ator:** João Brito e participantes presenciais.
- **Objetivo:** abrir uma transição de reflexão após os temas legais.
- **Pré-condições:** os temas legais foram apresentados.
- **Fluxo principal:** João avança até o slide “E agora?”; conduz a reflexão sem resposta pré-preenchida.
- **Fluxos alternativos:** João retrocede ou avança conforme a condução oral, sem criar um novo tipo obrigatório de apresentação.
- **Pós-condições:** a conversa pode prosseguir para o encerramento ou orientação adequada.
- **Critérios:** AC-04, AC-11.

### UC-PAL-004 — Encerrar apresentação

- **Ator:** João Brito.
- **Objetivo:** concluir a apresentação preservando a identificação institucional e os nomes aprovados.
- **Pré-condições:** conteúdo editorial da apresentação foi percorrido.
- **Fluxo principal:** João navega até os agradecimentos; apresenta a identificação institucional e os nomes aprovados; encerra a sessão projetada.
- **Fluxos alternativos:** pode retornar a qualquer slide sem alterar a versão editorial.
- **Pós-condições:** a apresentação é encerrada sem transformar o agradecimento em endosso comercial.
- **Critérios:** AC-05, AC-10, AC-11.

### UC-PAL-005 — Acessar conteúdo público

- **Ator:** participante.
- **Objetivo:** acessar a leitura independente da palestra em dispositivo próprio.
- **Pré-condições:** participante possui o endereço público `/palestra`.
- **Fluxo principal:** participante acessa a rota; identifica o título oficial; visualiza o conteúdo público sem autenticação obrigatória.
- **Fluxos alternativos:** se o acesso ocorrer em dispositivo móvel, a mesma fonte editorial é apresentada em layout responsivo.
- **Pós-condições:** participante pode iniciar a leitura sem depender do projetor.
- **Critérios:** AC-01, AC-06, AC-08, AC-11.

### UC-PAL-006 — Navegar livremente pelos capítulos

- **Ator:** participante.
- **Objetivo:** ler os capítulos na ordem e no ritmo próprios.
- **Pré-condições:** conteúdo público aberto.
- **Fluxo principal:** participante seleciona capítulos e navega livremente; a navegação não altera a apresentação de João.
- **Fluxos alternativos:** participante retoma um capítulo anterior ou segue diretamente para outro capítulo disponível.
- **Pós-condições:** posição de leitura é independente da apresentação projetada.
- **Critérios:** AC-06, AC-07, AC-08, AC-12.

### UC-PAL-007 — Consultar referências jurídicas

- **Ator:** participante.
- **Objetivo:** consultar a origem rastreável das afirmações jurídicas publicadas.
- **Pré-condições:** a afirmação foi aprovada editorialmente e possui referência publicada.
- **Fluxo principal:** participante identifica a referência associada; consulta a fonte jurídica rastreável; retorna ao capítulo.
- **Fluxos alternativos:** conteúdo sem validação ou referência não é apresentado como afirmação jurídica publicada.
- **Pós-condições:** a distinção entre legislação, interpretação e alternativas comerciais permanece compreensível.
- **Critérios:** AC-09, AC-10, AC-11.

### UC-PAL-008 — Solicitar orientação individual

- **Ator:** participante.
- **Objetivo:** encontrar o canal de contato consultivo após compreender o conteúdo.
- **Pré-condições:** participante concluiu ou está acompanhando a leitura; o conteúdo consultivo está separado das informações jurídicas e dos produtos.
- **Fluxo principal:** participante identifica a opção de orientação individual; acessa o contato consultivo sem que isso seja condição para ler a palestra.
- **Fluxos alternativos:** participante encerra a leitura sem solicitar contato; nenhuma contratação ou proposta é iniciada automaticamente.
- **Pós-condições:** a solicitação, se feita, permanece conceitualmente separada de legislação e produto.
- **Critérios:** AC-08, AC-10, AC-12.

## 3. Critérios de aceite

- **AC-01:** a rota pública `/palestra` apresenta o título oficial Lei nº 13.954/2019.
- **AC-02:** João consegue iniciar a apresentação em formato 16:9, com opção de tela cheia.
- **AC-03:** os controles permitem avançar e retroceder sem alterar a sequência editorial.
- **AC-04:** o slide “E agora?” aparece após os temas legais, sem resposta pré-preenchida.
- **AC-05:** os agradecimentos preservam a identificação institucional e os nomes aprovados.
- **AC-06:** o participante acessa os capítulos em dispositivo móvel sem autenticação.
- **AC-07:** a navegação do participante é independente da apresentação projetada.
- **AC-08:** o conteúdo móvel é responsivo, legível e navegável por teclado e tecnologias assistivas.
- **AC-09:** afirmações jurídicas publicadas possuem referência rastreável e validação editorial.
- **AC-10:** o contato consultivo é identificado separadamente das informações jurídicas e dos produtos.
- **AC-11:** a apresentação e a leitura pública utilizam uma fonte editorial governada, evitando divergência de conteúdo.
- **AC-12:** a navegação principal não depende de sincronização em tempo real nem de sessão compartilhada.

## 4. Regras de negócio

1. A apresentação e a leitura pública usam uma fonte editorial comum e versionada.
2. A navegação do participante é independente da apresentação projetada.
3. Legislação, interpretação e alternativas comerciais permanecem separadas.
4. Seguros não são apresentados como substitutos automáticos de direitos militares.
5. A experiência respeita os ADRs aplicáveis e o VIS-001 na identidade visual.
6. A leitura pública não exige coleta obrigatória de dados pessoais.
7. Agradecimento institucional e endosso comercial permanecem separados.

## 5. Integrações documentais

| Artefato  | Relação com UX-PAL-001                                                                                             |
| --------- | ------------------------------------------------------------------------------------------------------------------ |
| `M1-R02`  | Define a experiência pública de entrada e a separação entre compreensão e conversão.                               |
| `M1-R03`  | Preserva os tipos `OPENING`, `CONTEXT`, `EVIDENCE`, `EXPLANATION`, `METHOD` e `CTA`.                               |
| `M1-R04`  | Deve governar a validação e a rastreabilidade das referências jurídicas; documento ainda não localizado.           |
| `M1-R05`  | Deve governar hierarquia visual e marca; documento ainda não localizado.                                           |
| `M1-R06`  | Deve governar consistência de tokens; documento ainda não localizado.                                              |
| `DES-000` | Fornece a autoridade constitucional: clareza, contexto, compreensão, consistência, acessibilidade e transparência. |

A pergunta “E agora?” é uma transição editorial e não cria um novo tipo obrigatório.

## 6. Matriz de rastreabilidade

| Caso de uso | Critérios de aceite        | Requisitos e autoridades relacionados |
| ----------- | -------------------------- | ------------------------------------- |
| UC-PAL-001  | AC-01, AC-02, AC-11        | M1-R02, M1-R03, DES-000 Art. I/IV/V   |
| UC-PAL-002  | AC-03, AC-12               | M1-R03 AC-07, DES-000 Art. V          |
| UC-PAL-003  | AC-04, AC-11               | M1-R03, DES-000 Art. II/III           |
| UC-PAL-004  | AC-05, AC-10, AC-11        | M1-R02, DES-000 Art. IV/VI            |
| UC-PAL-005  | AC-01, AC-06, AC-08, AC-11 | M1-R01, M1-R02, DES-000 Art. V/VI     |
| UC-PAL-006  | AC-06, AC-07, AC-08, AC-12 | M1-R02, M1-R03, DES-000 Art. II/V     |
| UC-PAL-007  | AC-09, AC-10, AC-11        | M1-R04, M1-R03, DES-000 Art. VI       |
| UC-PAL-008  | AC-08, AC-10, AC-12        | M1-R02, M1-R03, DES-000 Art. I/III/VI |

## 7. Fora do escopo e estado

Não fazem parte desta especificação: componentes React ou Next.js, novas rotas ou
endpoints, alterações de CSS ou tokens, banco de dados, sincronização de slides,
chat ao vivo, autenticação do público, propostas, contratação ou deploy.

Esta persistência documental não autoriza implementação, não altera a identidade
visual canônica e não substitui decisões institucionais ausentes.

```text
REQUIREMENT=UX-PAL-001
FUNCTIONAL_STATUS=APPROVED
IMPLEMENTATION_AUTHORIZED=NO
USE_CASE_COUNT=8
AC_COUNT=12
PRESENTATION_TYPES_PRESERVED=6
REAL_TIME_SYNC=NO
PUBLIC_AUTHENTICATION=NO
NEXT_GATE=USER_REVIEW
```

© EcoSeg Seguros
