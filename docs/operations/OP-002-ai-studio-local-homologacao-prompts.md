# OP-002 — Fluxo de implementação ECOSEG Intelligence

## 1. Objetivo

Estabelecer o fluxo oficial para evoluir a área de inteligência da ECOSEG, iniciando no AI Studio, passando pelo ambiente local e terminando na homologação antes de qualquer publicação.

O fluxo deve preservar quatro separações:

1. especificação e prototipação;
2. implementação local;
3. homologação integrada;
4. produção.

O AI Studio não é considerado ambiente de produção. Ele é utilizado para elaborar a experiência, testar hipóteses de interface e gerar artefatos que serão incorporados ao repositório.

## 2. Ambientes

| Ambiente    | Finalidade                                        | Dados permitidos                   | Resultado esperado               |
| ----------- | ------------------------------------------------- | ---------------------------------- | -------------------------------- |
| AI Studio   | Explorar interface, fluxos, textos e hipóteses    | Dados fictícios                    | Especificação visual e funcional |
| Local       | Implementar, testar e revisar o código            | Fixtures e dados sintéticos        | Branch executável e validada     |
| Homologação | Validar comportamento integrado em Vercel Preview | Dados sintéticos ou anonimizados   | Aprovação para publicação        |
| Produção    | Operação pública ou consultiva autorizada         | Dados reais somente após controles | Versão publicada                 |

## 3. Fluxo de promoção

```text
AI Studio
  ↓ especificação validada
Branch de desenvolvimento
  ↓ lint, build, testes e revisão
Ambiente local
  ↓ commit e push
Vercel Preview / Homologação
  ↓ checklist funcional, jurídico e privacidade
Pull Request aprovado
  ↓ merge em main
Vercel Production
```

## 4. Fase A — Descoberta no AI Studio

### Objetivo

Definir a mudança antes de editar o código.

### Entrada

- objetivo de negócio;
- perfil do consultor;
- fluxo do usuário;
- referências visuais;
- regras jurídicas ou regulatórias já validadas;
- restrições de privacidade;
- rota ou módulo afetado.

### Prompt A1 — Especificação de produto

```text
Você é analista de produto da ECOSEG Intelligence.

Contexto:
- Produto: workspace consultivo da ECOSEG/Cyborg Tecnologia.
- Usuário: consultor de seguros e previdência para militares, pensionistas e dependentes.
- Objetivo desta iteração: [descrever o objetivo].
- Rota ou módulo afetado: [informar].
- Fonte das regras: [documentos e fontes oficiais].

Produza uma especificação contendo:
1. problema que será resolvido;
2. usuário e cenário de uso;
3. fluxo principal;
4. entradas obrigatórias;
5. saídas esperadas;
6. estados de erro e ausência de dados;
7. dados que não podem ser coletados nesta fase;
8. critérios de aceite testáveis;
9. dependências técnicas e regulatórias;
10. itens explicitamente fora do escopo.

Não invente regras jurídicas, produtos, preços, protocolos SUSEP ou integrações externas.
Marque como PENDENTE toda informação que precise de confirmação.
```

### Gate A

Só avançar quando existir:

- objetivo definido;
- fluxo descrito;
- critérios de aceite;
- fontes identificadas;
- escopo fora da iteração registrado.

## 5. Fase B — Design e protótipo no AI Studio

### Objetivo

Transformar a especificação em uma experiência navegável, sem considerar o protótipo como código de produção.

### Prompt B1 — Experiência do workspace

```text
Com base na especificação aprovada, desenhe a experiência da rota [rota].

A experiência deve conter:
- hierarquia visual clara;
- formulário com campos mínimos;
- indicação de campos obrigatórios;
- estados loading, vazio, sucesso e erro;
- explicação da origem das informações;
- aviso de que o resultado é consultivo e não substitui análise jurídica;
- ação principal do consultor;
- possibilidade de salvar ou revisar o caso.

Use o sistema visual ECOSEG já definido no repositório.
Não crie novos padrões visuais sem justificar a decisão.
Não exiba como confirmado nenhum dado que seja apenas simulado.
```

### Gate B

O protótipo deve ser revisado contra:

- fluxo de negócio;
- identidade visual;
- acessibilidade;
- linguagem jurídica responsável;
- ausência de promessas de cobertura ou emissão.

## 6. Fase C — Preparação da implementação local

### Objetivo

Converter o resultado do AI Studio em tarefas de código, contratos e fixtures.

### Prompt C1 — Plano técnico

```text
Converta a especificação aprovada em um plano de implementação para o repositório SiteEcosegSeguros.

Stack existente:
- Next.js App Router;
- TypeScript;
- React;
- Tailwind CSS;
- rotas em src/app;
- domínio em src/domain;
- serviços em src/services;
- contratos em src/contracts.

Entregue:
1. arquivos a criar ou alterar;
2. contratos TypeScript necessários;
3. componentes de interface;
4. serviços e funções puras;
5. fixtures sintéticas;
6. validações de formulário;
7. testes necessários;
8. riscos e decisões arquiteturais;
9. comandos de verificação;
10. critérios para considerar a branch pronta.

Não adicionar integração externa, segredo, CPF real, dado de saúde real ou credencial no código.
```

### Prompt C2 — Implementação local

```text
Implemente somente o escopo aprovado nesta branch.

Regras:
- preserve a arquitetura existente;
- não altere main;
- não substitua contratos sem registrar a decisão;
- use dados sintéticos;
- mantenha conectores externos atrás de interfaces;
- diferencie claramente sandbox_local de integração real;
- trate loading, erro, vazio e sucesso;
- não apresente simulação como cotação oficial.

Ao final, informe:
- arquivos alterados;
- comportamento implementado;
- testes executados;
- pendências;
- riscos conhecidos;
- resultado de lint e build.
```

## 7. Fase D — Verificação local

### Objetivo

Provar que a implementação compila, respeita os contratos e funciona com dados sintéticos.

### Comandos mínimos

```bash
pnpm lint
pnpm build
pnpm format:check
```

Quando houver testes automatizados:

```bash
pnpm test
pnpm test:e2e
```

### Prompt D1 — Revisão local

```text
Faça uma revisão técnica da implementação local.

Verifique:
1. compilação e tipos;
2. validação de entradas;
3. tratamento de estados de erro;
4. ausência de segredos e dados reais;
5. separação entre domínio, interface e integração;
6. consistência dos contratos;
7. acessibilidade básica;
8. comportamento responsivo;
9. rastreabilidade da fonte dos dados;
10. risco de afirmar que uma simulação é uma cotação oficial.

Classifique cada achado como BLOCKER, MAJOR, MINOR ou OBSERVATION.
Não considere a branch pronta se existir BLOCKER ou MAJOR aberto.
```

### Gate D

Obrigatório antes do push:

- lint aprovado;
- build aprovado;
- formatação aprovada;
- revisão concluída;
- fixtures sem dados reais;
- diferenças de contrato documentadas.

## 8. Fase E — Homologação no Vercel Preview

### Objetivo

Validar a aplicação construída em um ambiente semelhante à publicação, sem promovê-la para produção.

### Procedimento

1. criar branch de feature;
2. executar verificações locais;
3. fazer commit;
4. fazer push;
5. aguardar Vercel Preview;
6. validar a URL de preview;
7. testar rotas públicas e privadas;
8. registrar evidências;
9. corrigir falhas na mesma branch;
10. abrir ou atualizar o Pull Request.

### Prompt E1 — Homologação funcional

```text
Valide a versão publicada no ambiente de homologação.

URL: [URL do Vercel Preview]
Iteração: [identificador]

Execute o checklist:
- rota principal abre sem erro;
- navegação funciona;
- formulário aceita entradas válidas;
- formulário rejeita entradas inválidas;
- estados loading, vazio, sucesso e erro aparecem corretamente;
- resultado consultivo é coerente com a fixture;
- nenhuma simulação é apresentada como cotação oficial;
- rota privada não aparece em sitemap ou indexação;
- layout funciona em desktop e mobile;
- links e ações principais funcionam;
- não há exposição de credenciais ou dados pessoais.

Entregue uma tabela PASS, FAIL ou BLOCKED com evidência para cada item.
```

### Prompt E2 — Homologação regulatória e editorial

```text
Revise o conteúdo da iteração para uso consultivo da ECOSEG.

Verifique:
- toda afirmação jurídica possui fonte;
- a redação não generaliza direitos de pensionistas ou dependentes;
- a Lei nº 13.954/2019 não é apresentada como promessa de perda ou manutenção automática;
- produtos privados são apresentados como complementares;
- não há promessa de aprovação, emissão ou preço sem fonte oficial;
- dados de saúde, CPF e informações financeiras não são coletados sem base e fluxo aprovado;
- o aviso de escopo consultivo está visível.

Classifique o resultado como APPROVED, APPROVED_WITH_FIXES ou REJECTED.
```

### Gate E

Só promover para produção quando:

- Vercel Preview estiver READY;
- checklist funcional aprovado;
- revisão regulatória/editorial aprovada;
- privacidade aprovada;
- Pull Request revisado;
- rollback identificado.

## 9. Fase F — Publicação

### Prompt F1 — Preparação do release

```text
Prepare o release da iteração [identificador].

Confirme:
- branch de origem;
- commit candidato;
- resultado do build;
- resultado do lint;
- URL de homologação;
- evidências anexadas;
- variáveis de ambiente necessárias;
- mudanças de banco, se houver;
- plano de rollback;
- riscos residuais.

Não publique se houver BLOCKER, credencial ausente, dado real não governado ou divergência entre homologação e produção.
```

## 10. Fase G — Rollback e pós-publicação

### Prompt G1 — Verificação pós-release

```text
Verifique a versão publicada após o release.

Teste:
- página inicial;
- rota da palestra;
- workspace consultivo;
- endpoints de saúde autorizados;
- formulário de contato;
- links principais;
- metadados e noindex das rotas privadas;
- ausência de erro no console e nas funções.

Compare o comportamento com a homologação e registre qualquer divergência.
```

### Prompt G2 — Rollback

```text
A versão publicada apresenta o seguinte problema: [descrever].

Analise se o incidente exige rollback imediato.
Informe:
1. impacto observado;
2. rotas afetadas;
3. último deployment conhecido como estável;
4. risco de manter a versão atual;
5. ação de rollback recomendada;
6. validações após o rollback;
7. correção que deverá retornar para nova homologação.

Não altere dados persistentes nem apague evidências do incidente.
```

## 11. Regra para integrações SUSEP e seguradoras

Até que existam credenciais, homologação e autorização de negócio:

- usar somente fixtures e sandbox local;
- manter conectores atrás de interfaces;
- não chamar APIs reais a partir do frontend;
- não armazenar tokens no repositório;
- não declarar proposta enviada ou apólice emitida;
- registrar o status como `sandbox_local` ou `not_configured`.

## 12. Estado atual da ECOSEG Intelligence

### Disponível

- AI Studio com protótipo da experiência;
- workspace `/consultor/cyborg`;
- simulador local de cotação;
- endpoint local de saúde dos conectores;
- documentação técnica Open Insurance;
- Vercel Preview para homologação visual e funcional.

### Próxima evolução

1. formalizar a especificação da anamnese;
2. implementar o motor de aderência local;
3. governar o catálogo de produtos;
4. adicionar autenticação do consultor;
5. registrar consentimento e auditoria;
6. criar contratos internos de decisão, cotação e proposta;
7. homologar um primeiro conector comercial;
8. só então iniciar integração externa real.
