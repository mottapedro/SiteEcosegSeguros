# OP-001 — Procedimento Oficial de Desenvolvimento, Homologação, Publicação e Rollback da ECOSEG

**Status:** Aprovado — vigência imediata

**Categoria:** Governança Operacional / DevOps

**Versão:** 1.0

**Data:** 2026-09-16

**Repositório oficial:** `mottapedro/SiteEcosegSeguros`

**Plataformas:** Git, GitHub e Vercel

**Responsáveis:** ECOSEG (homologação de negócio e conteúdo) e Cyborg Tecnologia (desenvolvimento, versionamento e operação técnica)

---

## 1. Propósito

Este procedimento estabelece o fluxo oficial para desenvolvimento, homologação, publicação, rastreabilidade e rollback do website da ECOSEG.

A pasta local `SiteEcosegSeguros`, o repositório GitHub de mesmo nome e o projeto conectado na Vercel formam uma única cadeia operacional. O código local é a área de trabalho; o GitHub é a fonte oficial versionada; a Vercel executa os builds, previews e deploys.

Este documento aplica-se ao site institucional, à experiência web da palestra, às rotas públicas e às integrações autorizadas no mesmo repositório.

---

## 2. Cadeia oficial

```text
Pasta local SiteEcosegSeguros
→ Git local
→ GitHub / branch de trabalho
→ Pull Request
→ Vercel Preview
→ homologação
→ merge na main
→ Vercel Production
→ monitoramento
```

### 2.1 Função de cada camada

| Camada | Responsabilidade |
|---|---|
| Pasta local | Desenvolvimento, testes e revisão inicial |
| Git | Histórico, autoria, comparação e reversão das alterações |
| GitHub | Fonte oficial, branches, commits, Pull Requests e aprovações |
| Vercel Preview | Homologação isolada antes da produção |
| Branch `main` | Estado aprovado para produção |
| Vercel Production | Versão pública vigente |
| Commit e deployment | Evidência exata da versão publicada ou apresentada |

Arquivos existentes apenas no computador local não constituem versão oficial do projeto.

---

## 3. Ambientes

| Ambiente | Origem | Finalidade | Pode conter conteúdo provisório? |
|---|---|---|---|
| Local | Pasta e branch local | Desenvolvimento e testes | Sim |
| Preview | Branch ou Pull Request no GitHub | Homologação técnica, visual, editorial e operacional | Sim, com identificação clara |
| Produção | Branch `main` | Atendimento ao público | Não |

Conteúdo provisório da palestra não poderá ser tratado como orientação jurídica validada. Rotas de apresentação em preview deverão evitar indexação quando aplicável.

---

## 4. Estratégia de branches

### 4.1 Branch principal

A branch `main` representa o estado aprovado e publicável.

Não é permitido desenvolver diretamente na `main`, salvo correção emergencial conduzida pelo procedimento de hotfix deste documento.

### 4.2 Branches de trabalho

Padrão recomendado:

| Prefixo | Uso | Exemplo |
|---|---|---|
| `feat/` | Nova capacidade | `feat/marco-0-palestra` |
| `fix/` | Correção funcional | `fix/contact-form-validation` |
| `docs/` | Documentação e governança | `docs/adr-0005-ecoseg-evolution` |
| `refactor/` | Alteração interna sem mudança de comportamento | `refactor/presentation-content` |
| `hotfix/` | Correção urgente de produção | `hotfix/remove-invalid-content` |

Cada branch deverá possuir objetivo delimitado. Alterações sem relação com o objetivo não deverão ser incorporadas ao mesmo Pull Request.

---

## 5. Commits

Cada commit deve:

- representar uma alteração coerente;
- possuir mensagem objetiva;
- evitar mistura de código, conteúdo e correções não relacionadas;
- permitir identificar o motivo da mudança;
- não conter credenciais, segredos, dados pessoais ou arquivos locais desnecessários.

Padrões recomendados:

```text
feat: add lecture presentation route
fix: prevent unvalidated legal content from rendering
docs: define Ecoseg deployment procedure
test: cover presentation navigation
chore: update build configuration
```

O hash do commit aprovado deverá integrar a evidência da publicação ou da versão utilizada na palestra.

---

## 6. Desenvolvimento

### 6.1 Abertura

Antes do início:

1. confirmar história, caso de uso ou correção autorizada;
2. identificar critérios de aceite;
3. verificar dependências jurídicas, editoriais e de privacidade;
4. atualizar a referência local da `main`;
5. criar branch de trabalho;
6. registrar qualquer decisão arquitetural necessária.

### 6.2 Execução

Durante o desenvolvimento:

1. implementar somente o escopo autorizado;
2. utilizar variáveis de ambiente para configurações e segredos;
3. preservar dados de produção;
4. executar lint, testes e build aplicáveis;
5. revisar acessibilidade e responsividade quando houver interface;
6. manter conteúdo separado da lógica sempre que previsto pela arquitetura;
7. produzir commits pequenos e rastreáveis;
8. enviar a branch ao GitHub.

### 6.3 Restrições

Não é permitido:

- publicar conteúdo jurídico sem status de validação exigido;
- inserir dados pessoais reais em fixtures, logs ou commits;
- utilizar o Preview como aprovação automática;
- armazenar segredo no repositório;
- alterar produção fora do GitHub sem registro posterior;
- misturar o motor proprietário da Cyborg com o site público sem decisão arquitetural.

---

## 7. Pull Request

Toda mudança destinada à produção deverá passar por Pull Request.

O Pull Request deverá registrar:

- objetivo;
- problema ou história atendida;
- principais alterações;
- rotas e componentes afetados;
- riscos;
- testes executados;
- URL do Preview;
- evidências visuais quando necessárias;
- dependências ou pendências;
- plano de rollback;
- aprovadores necessários.

Mudanças documentais que não afetam execução também deverão preservar branch, commit e revisão proporcional ao risco.

---

## 8. Vercel Preview

A integração GitHub–Vercel deverá gerar um deployment de preview para a branch ou Pull Request.

O Preview é o ambiente oficial de homologação e deverá ser associado ao commit examinado.

### 8.1 Verificação técnica

- build concluído;
- ausência de erro bloqueador;
- rotas novas e alteradas acessíveis;
- links internos e externos verificados;
- console sem erro relevante;
- comportamento responsivo;
- acessibilidade essencial;
- metadados, sitemap, robots e `noindex` corretos;
- formulários e estados de erro verificados;
- variáveis de ambiente corretas para o ambiente.

### 8.2 Verificação de conteúdo

- texto revisado;
- contatos e marcas reais;
- ausência de placeholders indevidos;
- fontes conferidas;
- versão e data de revisão visíveis quando aplicáveis;
- conteúdo jurídico com aprovação exigida;
- ressalvas publicadas;
- nenhuma promessa comercial ou jurídica não autorizada.

### 8.3 Verificação operacional da palestra

- João consegue iniciar, navegar e encerrar;
- teclado, toque e controles visuais funcionam;
- projetor, notebook, tablet e celular foram considerados;
- QR Code aponta para o destino aprovado;
- existe material ou procedimento de contingência;
- a versão ensaiada corresponde ao commit candidato.

Preview aprovado tecnicamente, mas pendente de validação jurídica ou editorial, não está autorizado para produção.

---

## 9. Homologação

A homologação possui quatro dimensões independentes:

| Dimensão | Responsável | Objeto |
|---|---|---|
| Técnica | Cyborg Tecnologia | Build, testes, segurança básica e funcionamento |
| Visual e operacional | ECOSEG / João | Uso real, leitura, navegação e ensaio |
| Editorial | Responsável definido pela ECOSEG | Clareza, identidade, contatos e narrativa |
| Jurídica/privacidade | Profissional ou responsável habilitado | Conteúdo jurídico, aviso e coleta aplicável |

A aprovação deverá ser registrada no Pull Request ou em documento referenciado por ele.

A ausência de resposta não constitui aprovação.

---

## 10. Publicação

A publicação normal ocorrerá por merge do Pull Request aprovado na `main`.

### 10.1 Condições para merge

- critérios de aceite atendidos;
- Preview homologado;
- checks técnicos concluídos;
- aprovações necessárias registradas;
- conteúdo definitivo;
- variáveis de produção verificadas;
- plano de rollback conhecido;
- ausência de bloqueador aberto.

### 10.2 Registro da publicação

Após o deploy, registrar:

- data e hora;
- responsável;
- Pull Request;
- hash do commit;
- URL ou identificador do deployment;
- escopo publicado;
- resultado da verificação pós-deploy;
- observações e incidentes.

Para a palestra, registrar também a versão do roteiro e o evento/campanha correspondente.

---

## 11. Verificação pós-deploy

Após publicação:

1. confirmar que o deployment está ativo;
2. executar smoke test das rotas críticas;
3. verificar Home, contato, palestra e chamada de ação afetados;
4. confirmar que Preview e Produção não foram confundidos;
5. testar o fluxo essencial em ao menos um dispositivo móvel e um desktop;
6. verificar logs disponíveis;
7. registrar o resultado.

Falha crítica inicia avaliação imediata de rollback.

---

## 12. Rollback

Rollback é o retorno controlado à última versão estável conhecida.

### 12.1 Critérios de acionamento

Considerar rollback quando houver:

- indisponibilidade;
- erro que impeça jornada crítica;
- exposição de informação indevida;
- conteúdo jurídico inválido ou desatualizado;
- falha de privacidade ou segurança;
- formulário enviando ou registrando dados incorretamente;
- regressão relevante sem correção segura imediata;
- apresentação inutilizável próxima ao evento.

### 12.2 Procedimento normal

1. interromper novas alterações relacionadas;
2. identificar o primeiro deployment afetado;
3. selecionar a última versão estável conhecida;
4. registrar motivo, impacto e responsável pela decisão;
5. restaurar a versão estável pela promoção/rollback do deployment na Vercel ou por reversão do commit no GitHub;
6. verificar as rotas críticas;
7. comunicar o estado aos responsáveis;
8. abrir correção em nova branch;
9. registrar o incidente e a resolução.

### 12.3 Reversão pelo GitHub

Quando a correção precisar preservar o histórico oficial:

1. criar branch de reversão ou hotfix a partir da `main`;
2. aplicar um commit de reversão;
3. abrir Pull Request;
4. executar checks e Preview;
5. aprovar e fazer merge;
6. verificar o novo deployment de produção.

Não utilizar reescrita destrutiva do histórico da `main`.

### 12.4 Rollback emergencial na Vercel

Quando o impacto exigir restauração imediata, poderá ser promovido um deployment estável anterior conforme as permissões disponíveis na Vercel.

Essa ação deverá ser seguida por:

- registro do deployment promovido;
- alinhamento do estado da `main` com a produção;
- Pull Request de reversão ou correção;
- verificação pós-rollback;
- relatório do incidente.

Produção e `main` não deverão permanecer divergentes.

---

## 13. Hotfix

Hotfix é reservado para incidente de produção que não possa aguardar o fluxo normal.

```text
main
→ hotfix/<descricao>
→ correção mínima
→ testes essenciais
→ Pull Request prioritário
→ merge na main
→ deploy
→ verificação
```

A urgência reduz o tempo do processo, não elimina rastreabilidade, revisão ou verificação.

---

## 14. Falha de build ou deploy

Quando o build ou deploy falhar:

1. não promover manualmente artefato não verificado;
2. consultar o log do deployment;
3. identificar se a causa está em código, dependência, configuração ou variável;
4. corrigir na branch;
5. gerar novo commit e novo Preview;
6. repetir a homologação afetada;
7. registrar a causa quando houver impacto operacional.

Um deployment com falha não altera automaticamente a definição da última versão estável.

---

## 15. Variáveis, credenciais e dados

- Segredos não entram no Git.
- Variáveis são configuradas por ambiente.
- Preview não deverá receber acesso desnecessário a dados de produção.
- Credenciais devem obedecer ao menor privilégio.
- Alteração de variável de produção deverá ter responsável e registro.
- Logs não deverão revelar dados pessoais, tokens ou conteúdo sensível.
- Formulários só serão ativados após definição de finalidade, destino, acesso e retenção.

---

## 16. Evidências mínimas

Cada publicação deverá ser capaz de responder:

1. O que mudou?
2. Por que mudou?
3. Quem aprovou?
4. Qual commit foi publicado?
5. Qual deployment ficou ativo?
6. Quais verificações foram executadas?
7. Como retornar à versão anterior?
8. Houve impacto em conteúdo, dados ou privacidade?

Sem essas respostas, a publicação não está plenamente governada.

---

## 17. Matriz de responsabilidade

| Atividade | Cyborg Tecnologia | ECOSEG / João | Jurídico/Privacidade |
|---|---|---|---|
| Desenvolvimento | Responsável | Consultado | Informado quando aplicável |
| Revisão técnica | Responsável | Informado | Não aplicável |
| Homologação operacional | Apoio | Responsável | Informado |
| Aprovação editorial | Apoio | Responsável | Consultado |
| Validação jurídica | Apoio técnico | Consultado | Responsável |
| Aprovação de coleta | Implementação | Responsável de negócio | Responsável pela validação |
| Merge e deploy | Responsável técnico | Aprova negócio | Aprova gate aplicável |
| Rollback técnico | Responsável | Informado/aprovador conforme impacto | Informado quando aplicável |

Os nomes das pessoas responsáveis deverão ser definidos antes de cada publicação que dependa de gate ainda aberto.

---

## 18. Checklist resumido

### Antes do desenvolvimento

- [ ] Escopo autorizado
- [ ] Branch criada
- [ ] Critérios de aceite definidos
- [ ] Gates classificados

### Antes do Pull Request

- [ ] Lint, testes e build
- [ ] Conteúdo revisado
- [ ] Sem segredos ou dados pessoais
- [ ] Documentação atualizada

### Antes do merge

- [ ] Preview homologado
- [ ] Aprovações registradas
- [ ] Plano de rollback conhecido
- [ ] Sem bloqueadores

### Depois do deploy

- [ ] Smoke test
- [ ] Commit e deployment registrados
- [ ] Rotas críticas verificadas
- [ ] Resultado comunicado

---

## 19. Aplicação ao Marco 0 — Palestra

A primeira branch de implementação recomendada é:

```text
feat/marco-0-palestra
```

O primeiro vertical slice deverá conter somente:

- contratos tipados;
- conteúdo demonstrativo não jurídico;
- página pública;
- modo apresentação;
- navegação básica;
- metadados e `noindex`;
- testes da regra de publicação.

Conteúdo jurídico público dependerá de validação. Captação produtiva dependerá das decisões de privacidade e persistência registradas no ADR 0005 e no backlog M0-001.

---

## 20. Rastreabilidade

Este procedimento operacionaliza:

- ADR 0005 — Evolução da ECOSEG;
- M0-001 — Backlog de Desenvolvimento da Palestra ECOSEG;
- fluxo GitHub–Vercel existente;
- futuras decisões de segurança, privacidade e operação.

Este documento deverá ser revisado quando houver mudança na estratégia de branches, plataforma de hospedagem, permissões, ambientes, responsáveis ou política de publicação.
