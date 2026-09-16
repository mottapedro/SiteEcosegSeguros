# M0-001 — Backlog de Desenvolvimento da Palestra ECOSEG

**Status:** Pronto para refinamento

**Categoria:** Marco 0 / Produto Web / Descoberta Operacional

**Versão:** 1.0

**Data:** 2026-09-16

**Decisão de origem:** ADR 0005 — Evolução da ECOSEG

**Responsáveis:** ECOSEG (conteúdo e operação) e Cyborg Tecnologia (produto e tecnologia)

---

## 1. Propósito

Este documento transforma o **Marco 0 — Palestra** em um backlog executável, apoiado na arquitetura atual do repositório `SiteEcosegSeguros`.

O objetivo é permitir que João conduza a palestra pelo website da ECOSEG, utilizando somente conteúdo aprovado, com operação simples, captação mínima e rastreável de interessados e produção de evidências para o refinamento posterior do produto SaaS.

Este backlog abre a frente de desenvolvimento da palestra. Ele não autoriza a construção antecipada do motor de aderência, do catálogo operacional de produtos ou do prontuário consultivo.

---

## 2. Resultado esperado

Ao final do Marco 0, João deverá conseguir:

1. abrir uma página pública dedicada à palestra;
2. iniciar um modo de apresentação adequado a projetor, notebook, tablet e celular;
3. navegar pelo roteiro sem depender de PowerPoint;
4. exibir apenas conteúdo jurídico com status aprovado;
5. apresentar fontes, ressalvas e data de revisão;
6. orientar o participante para uma chamada de ação por QR Code;
7. registrar o interesse com transparência e minimização de dados;
8. encaminhar o registro para atendimento;
9. consolidar perguntas, objeções e resultados do evento.

---

## 3. Leitura da base atual

| Área atual | Decisão para o Marco 0 |
|---|---|
| Next.js 16 com App Router | Manter como base das novas rotas |
| `src/app/page.tsx` | Preservar a Home; a palestra terá jornada própria |
| `src/content/pages/home.ts` | Não misturar conteúdo da palestra com a Home |
| Camada de conteúdo tipada | Reutilizar o padrão com tipos próprios para apresentação |
| Componentes de UI e layout | Reutilizar somente componentes compatíveis com a experiência |
| Feature de contato existente | Não reutilizar diretamente; finalidade e dados são diferentes |
| Endpoint de contato com Resend | Não é persistência rastreável suficiente para o evento |
| Rate limiter em memória | Aceitável apenas localmente; inadequado como controle definitivo |
| SEO, sitemap e robots | Incluir página pública; modo apresentação deverá ser `noindex` |
| Documentação e ADRs | Manter decisões e critérios versionados no repositório |

---

## 4. Arquitetura funcional proposta

### 4.1 Rotas

| Rota | Função | Indexação |
|---|---|---|
| `/palestra/protecao-familia-militar` | Página pública do evento, contexto, fontes, chamada de ação e acesso à apresentação | Permitida |
| `/palestra/protecao-familia-militar/apresentacao` | Experiência conduzida por João, com navegação própria | `noindex` |
| `/palestra/protecao-familia-militar#interesse` | Captação mínima vinculada ao evento | Segue a página pública |

A separação entre página pública e apresentação permite controlar layout, SEO, navegação, acessibilidade e operação sem condicionar a experiência a parâmetros frágeis de URL.

### 4.2 Organização inicial do código

```text
src/
├── app/
│   └── palestra/
│       └── protecao-familia-militar/
│           ├── page.tsx
│           ├── presentation/
│           │   └── page.tsx
│           └── layout.tsx
├── components/
│   └── presentation/
├── content/
│   └── presentations/
│       └── military-family-protection.ts
├── contracts/
│   ├── presentation.ts
│   └── event-interest.ts
└── features/
    └── event-interest/
```

O nome físico da pasta poderá ser `apresentacao` para coincidir com a URL definida. A palavra `presentation` acima identifica o limite arquitetural e não constitui imposição de nomenclatura.

### 4.3 Contratos mínimos

**Presentation**

- identificador;
- título e subtítulo;
- público;
- versão;
- status editorial;
- data de revisão;
- revisor responsável;
- seções ordenadas;
- fontes;
- ressalvas;
- chamada de ação;
- identificação da campanha.

**LegalContentReference**

- identificador;
- tema;
- diploma;
- artigo ou precedente;
- URL oficial;
- data da consulta;
- status: `DRAFT`, `IN_REVIEW`, `VALIDATED`, `SUSPENDED` ou `OUTDATED`;
- versão;
- responsável pela validação;
- observações e limites.

**EventInterest**

- identificador;
- nome;
- canal de contato;
- vínculo geral com o contexto militar;
- preocupação principal;
- preferência de atendimento;
- campanha;
- versão do formulário;
- versão do aviso de privacidade;
- registro da manifestação aplicável;
- timestamp.

Conteúdo legal diferente de `VALIDATED` não poderá entrar no artefato publicado.

---

## 5. Épicos do Marco 0

| ID | Épico | Resultado |
|---|---|---|
| EP-M0-01 | Governança do conteúdo | Roteiro versionado, fontes e estados editoriais |
| EP-M0-02 | Experiência web da palestra | Página pública dedicada e acessível |
| EP-M0-03 | Modo apresentação | Condução fluida por João em ambiente presencial |
| EP-M0-04 | Captação e privacidade | Interesse mínimo, transparente e rastreável |
| EP-M0-05 | Operação do evento | Ensaio, contingência, métricas e relatório pós-evento |

---

## 6. Primeiras iterações

### Iteração 0 — Contratos e prontidão do conteúdo

**Objetivo:** remover ambiguidades antes de alterar a interface.

**Entregas:**

- inventário dos tópicos recebidos de João;
- definição do roteiro mestre;
- contrato tipado da apresentação;
- contrato tipado das referências jurídicas;
- matriz de status editorial;
- identificação dos responsáveis por redação, revisão jurídica e publicação;
- decisão registrada sobre duração, data, público e chamada de ação.

**Critério de saída:** existe ao menos uma versão completa do roteiro, mesmo que ainda marcada como rascunho, e nenhum conteúdo sem fonte é tratado como validado.

### Iteração 1 — Página pública da palestra

**Objetivo:** criar o ponto oficial de acesso antes, durante e depois do evento.

**Entregas:**

- rota pública dedicada;
- cabeçalho da palestra;
- contexto e promessa editorial;
- estrutura narrativa;
- área de fontes e ressalvas;
- acesso ao modo apresentação;
- metadados, Open Graph e sitemap;
- estados para conteúdo ainda não publicado.

**Critério de saída:** a página pode ser homologada em preview sem alterar a Home nem gerar links quebrados.

### Iteração 2 — Modo apresentação

**Objetivo:** permitir que João conduza a palestra pelo website.

**Entregas:**

- layout sem distrações;
- navegação por teclado, toque e controles visíveis;
- indicador de progresso;
- retorno seguro à página pública;
- suporte a tela cheia quando disponível;
- comportamento responsivo para projetor, notebook, tablet e celular;
- respeito a preferência de redução de movimento;
- página marcada como `noindex`;
- fallback imprimível ou material de contingência definido.

**Critério de saída:** João completa um ensaio integral sem intervenção técnica.

### Iteração 3 — Conteúdo jurídico governado

**Objetivo:** impedir publicação de conteúdo sem origem e responsabilidade claras.

**Entregas:**

- componentes para fonte, data de revisão e ressalva;
- filtro de publicação por status;
- sinalização de versão do roteiro;
- teste que bloqueia referência sem URL oficial, data ou responsável;
- procedimento para suspender tópico sem apagar o histórico.

**Critério de saída:** somente referências `VALIDATED` aparecem no build homologável.

### Iteração 4 — Chamada de ação, privacidade e captação mínima

**Objetivo:** converter interesse em atendimento sem ampliar indevidamente a coleta.

**Entregas:**

- QR Code associado à campanha;
- aviso de privacidade contextual;
- formulário específico do evento;
- validação compartilhada entre cliente e servidor;
- prevenção de duplicidade;
- timestamp, campanha e versões registradas;
- confirmação clara e próximo passo;
- encaminhamento para responsável definido.

**Gate obrigatório:** antes da implementação produtiva, definir controlador, operador, fundamento aplicável, retenção, destino persistente e acesso aos registros.

**Critério de saída:** o registro pode ser localizado, relacionado ao evento e tratado conforme a finalidade informada.

### Iteração 5 — Ensaio e prontidão operacional

**Objetivo:** reduzir risco no ambiente presencial.

**Entregas:**

- roteiro de ensaio com João;
- checklist do equipamento e conectividade;
- validação de contatos reais da ECOSEG;
- teste de QR Code em dispositivos distintos;
- teste de acessibilidade e contraste;
- teste de navegação sem mouse;
- plano de contingência;
- aprovação editorial e jurídica final.

**Critério de saída:** checklist assinado pelos responsáveis e nenhum bloqueador aberto.

### Iteração 6 — Evidência de campo e fechamento do Marco 0

**Objetivo:** converter a palestra em aprendizado governado do negócio.

**Entregas:**

- registro de presença agregada;
- formulário interno de perguntas e objeções;
- classificação de perfis e temas de interesse;
- funil: participantes, interessados, agendamentos e conversões;
- relatório pós-evento;
- lista de hipóteses para o SaaS;
- decisão formal sobre o próximo incremento.

**Critério de saída:** relatório revisado e evidências separadas de opiniões, promessas comerciais e regras ainda não validadas.

---

## 7. Histórias de usuário iniciais

### US-M0-001 — Publicar a página oficial

**Como** responsável pela ECOSEG,  
**quero** disponibilizar uma página exclusiva da palestra,  
**para** centralizar contexto, fontes, apresentação e chamada de ação.

**Critérios de aceite:**

- a rota responde sem erro;
- a Home permanece independente;
- título, público, versão e data de revisão são visíveis;
- o acesso ao modo apresentação é explícito;
- links e metadados usam dados reais ou ficam bloqueados para produção.

### US-M0-002 — Iniciar a apresentação

**Como** João,  
**quero** iniciar a palestra em uma experiência sem distrações,  
**para** conduzir a narrativa diretamente pelo website.

**Critérios de aceite:**

- há um comando claro para começar;
- a primeira seção é previsível;
- controles essenciais permanecem acessíveis;
- a apresentação não depende de login;
- o modo apresentação não é indexado.

### US-M0-003 — Navegar durante a fala

**Como** João,  
**quero** avançar, retornar e identificar meu progresso,  
**para** manter o controle mesmo durante interrupções.

**Critérios de aceite:**

- teclado, toque e controles visuais funcionam;
- recarregar a página não gera estado inválido;
- o foco do teclado é visível;
- movimentos não obrigatórios respeitam `prefers-reduced-motion`.

### US-M0-004 — Publicar somente conteúdo validado

**Como** responsável editorial,  
**quero** impedir a publicação de referências não validadas,  
**para** reduzir risco jurídico e reputacional.

**Critérios de aceite:**

- cada tópico possui status e fonte;
- itens não validados não aparecem na apresentação publicada;
- a versão e a data de revisão são rastreáveis;
- uma referência pode ser suspensa sem exclusão histórica.

### US-M0-005 — Consultar fontes e limites

**Como** participante,  
**quero** identificar a origem e os limites das informações,  
**para** distinguir conteúdo educativo de orientação individual.

**Critérios de aceite:**

- fontes oficiais são acessíveis;
- ressalva de natureza educativa é clara;
- não existe promessa de direito, cobertura, aprovação ou resultado;
- produto específico não é recomendado automaticamente.

### US-M0-006 — Manifestar interesse

**Como** participante,  
**quero** solicitar contato sem preencher dados excessivos,  
**para** continuar a conversa com segurança.

**Critérios de aceite:**

- somente campos aprovados são solicitados;
- finalidade e aviso de privacidade aparecem antes do envio;
- confirmação e próximo passo são informados;
- CPF, contracheque, dados bancários, documentos militares e dados de saúde não são coletados.

### US-M0-007 — Rastrear a origem do interesse

**Como** responsável pelo atendimento,  
**quero** relacionar o registro à palestra e à versão do formulário,  
**para** realizar o retorno e produzir métricas confiáveis.

**Critérios de aceite:**

- campanha, timestamp e versões são persistidos;
- duplicidades possuem tratamento definido;
- o responsável pelo retorno consegue localizar o registro;
- acesso e retenção obedecem à decisão de privacidade.

### US-M0-008 — Registrar o aprendizado do evento

**Como** responsável pelo produto,  
**quero** consolidar perguntas, objeções e conversões,  
**para** refinar o negócio e o futuro SaaS com evidência de campo.

**Critérios de aceite:**

- perguntas e objeções recebem classificação;
- números agregados são separados de dados pessoais;
- hipótese não é registrada como regra validada;
- o relatório produz decisões ou pendências explícitas.

---

## 8. Casos de uso

### UC-M0-01 — Preparar e publicar o conteúdo

**Atores:** João, responsável editorial e validador jurídico.

**Pré-condições:** roteiro inventariado; fontes oficiais identificadas.

**Fluxo principal:**

1. O responsável editorial cadastra ou altera um tópico.
2. O tópico permanece como `DRAFT` ou `IN_REVIEW`.
3. O validador confere fonte, vigência, transição e ressalvas.
4. O tópico recebe status `VALIDATED`.
5. A versão da apresentação é gerada.
6. O preview é homologado.
7. A publicação é autorizada.

**Exceção:** tópico incompleto, contraditório ou superado permanece fora da publicação.

### UC-M0-02 — Conduzir a palestra

**Ator:** João.

**Pré-condições:** versão homologada; equipamento e contingência testados.

**Fluxo principal:**

1. João abre a página pública.
2. João inicia o modo apresentação.
3. O sistema exibe a seção inicial.
4. João avança e retorna conforme a fala.
5. O sistema exibe progresso, fontes e chamada de ação.
6. João encerra e orienta o público para o QR Code.

**Exceção:** em falha de rede, João utiliza o material de contingência aprovado.

### UC-M0-03 — Consultar a referência

**Ator:** participante.

**Fluxo principal:**

1. O participante acessa a área de fontes.
2. O sistema informa diploma, referência, data e versão.
3. O participante abre a fonte oficial.
4. O sistema mantém visível a ressalva de conteúdo educativo.

### UC-M0-04 — Registrar interesse

**Atores:** participante e responsável pelo atendimento.

**Pré-condições:** aviso de privacidade publicado; destino persistente aprovado.

**Fluxo principal:**

1. O participante acessa o formulário pelo QR Code.
2. O sistema apresenta finalidade e aviso.
3. O participante preenche os dados mínimos.
4. O servidor valida e registra a submissão.
5. O sistema confirma o recebimento.
6. O responsável localiza o registro e inicia o retorno.

**Exceção:** envio inválido ou duplicado retorna orientação sem expor informação interna.

### UC-M0-05 — Encerrar e avaliar o evento

**Atores:** João, ECOSEG e Cyborg Tecnologia.

**Fluxo principal:**

1. A equipe registra dados agregados do evento.
2. Perguntas e objeções são classificadas.
3. Interesses e atendimentos são contabilizados.
4. Hipóteses são relacionadas às evidências.
5. O relatório pós-evento é revisado.
6. O próximo incremento é decidido formalmente.

---

## 9. Dependências e gates

| Gate | Responsável | Bloqueia |
|---|---|---|
| Data, local, duração e público | ECOSEG / CTA | Fechamento do roteiro |
| Conteúdo e fontes entregues | João | Iteração 0 |
| Validação jurídica | Responsável a definir | Publicação jurídica |
| Marcas e produtos autorizados | ECOSEG / parceiros | Menções comerciais |
| Contatos oficiais | ECOSEG | Publicação |
| Papéis LGPD e retenção | Responsáveis a definir | Captação produtiva |
| Destino persistente dos registros | Cyborg / ECOSEG | Iteração 4 |
| Responsável e prazo de retorno | ECOSEG | Chamada de ação |
| Métricas do evento | ECOSEG / Cyborg | Relatório pós-evento |

Nenhum gate será substituído por texto provisório em produção.

---

## 10. Definition of Ready

Uma história está pronta para desenvolvimento quando:

- possui ator, objetivo e resultado observável;
- tem critérios de aceite verificáveis;
- conteúdo e dados de entrada estão disponíveis;
- responsável de negócio está identificado;
- dependências jurídicas, editoriais e de privacidade foram classificadas;
- não exige capacidade excluída do Marco 0;
- existe decisão para estados de erro e conteúdo ausente.

---

## 11. Definition of Done

Uma história está concluída quando:

- código e conteúdo foram revisados;
- testes aplicáveis foram executados;
- acessibilidade essencial foi verificada;
- comportamento responsivo foi homologado;
- não há placeholder crítico em produção;
- fontes e versões são rastreáveis;
- telemetria ou coleta respeitam a decisão de privacidade;
- documentação foi atualizada;
- João homologou o fluxo correspondente quando ele for o ator principal.

---

## 12. Ordem recomendada para abertura do desenvolvimento

```text
Iteração 0 — contratos e roteiro
→ Iteração 1 — página pública
→ Iteração 2 — modo apresentação
→ Iteração 3 — publicação governada
→ gate jurídico/editorial
→ Iteração 4 — privacidade e captação
→ gate operacional
→ Iteração 5 — ensaio
→ palestra
→ Iteração 6 — evidência e decisão
```

As Iterações 1 e 2 podem começar com conteúdo fictício claramente marcado em ambiente de preview. A publicação externa de afirmações jurídicas depende da Iteração 3 e de validação humana.

---

## 13. Primeira abertura técnica recomendada

A primeira entrega de código deverá ser um **vertical slice sem coleta de dados**, contendo:

1. contratos de apresentação e referência;
2. conteúdo de demonstração não jurídico;
3. rota pública da palestra;
4. rota de apresentação;
5. navegação básica;
6. metadados e `noindex` corretos;
7. testes da regra que impede conteúdo não validado na publicação.

Esse corte permite demonstrar valor ao João, validar a condução pelo website e preservar os gates jurídicos e de privacidade.

---

## 14. Fora do Marco 0

Permanecem fora deste backlog:

- recomendação individual automática;
- comparação ou ranking proprietário de produtos;
- motor de aderência;
- diagnóstico consultivo completo;
- autenticação de consultores;
- histórico clínico, financeiro ou militar;
- integrações diretas com seguradoras;
- CRM completo;
- base multiempresa;
- cessão do código ou da propriedade intelectual da Cyborg Tecnologia.

---

## 15. Rastreabilidade

Este backlog deriva do ADR 0005 e deverá ser atualizado quando houver decisão formal sobre:

- roteiro e conteúdo aprovado;
- data e formato da palestra;
- privacidade e persistência;
- métricas;
- resultado do ensaio;
- evidências do evento.

A implementação deverá ocorrer em branch própria e passar por preview e homologação antes de qualquer integração à `main`.
