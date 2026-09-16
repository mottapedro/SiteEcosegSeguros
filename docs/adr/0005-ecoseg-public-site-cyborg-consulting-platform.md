# ADR 0005 — Evolução da ECOSEG: Site Público, Palestra e Plataforma Consultiva

**Status:** Aceito — definição arquitetural

**Categoria:** Arquitetura de Produto / Plataforma

**Responsáveis:** ECOSEG (operação consultiva) e Cyborg Tecnologia (produto e tecnologia)

**Data:** 2026-09-16

**Escopo:** evolução do site institucional da ECOSEG e criação da plataforma SaaS B2B de inteligência consultiva

---

## 1. Contexto

O projeto atual da ECOSEG foi concebido como site institucional/comercial de seguros corporativos, com foco em Blindagem Patrimonial e Responsabilidade Civil. Sua base em Next.js, a camada de conteúdo tipada e a separação entre apresentação, features, integrações e conteúdo são adequadas para a fase institucional.

A oportunidade validada com João amplia o problema. A ECOSEG passará a atuar, inicialmente no Clube dos Taifeiros do Rio de Janeiro (CTA), com militares da ativa, reserva, reformados, pensionistas e dependentes. A consultoria precisa relacionar perfil, proteção existente, mudanças legais, lacunas e produtos privados complementares.

A palestra de João será uma porta de entrada para esse processo. O website deixará de ser apenas vitrine e passará a cumprir três funções:

1. educar e gerar confiança;
2. conduzir a apresentação;
3. iniciar, com consentimento, o diagnóstico consultivo.

O motor de conhecimento, as regras de aderência, o catálogo governado e o histórico dos atendimentos constituem produto SaaS B2B pertencente à Cyborg Tecnologia. A ECOSEG será cliente fundador e ambiente de validação, não proprietária automática do código, do motor ou da plataforma.

---

## 2. Problema Arquitetural

A evolução não pode transformar o repositório público da ECOSEG em depósito de:

- regras proprietárias de aderência;
- conhecimento jurídico ainda não validado;
- dados pessoais de militares, pensionistas ou dependentes;
- credenciais e integrações privadas;
- lógica comercial reutilizável por outras corretoras;
- administração multiempresa.

Também não é aceitável manter o site como catálogo genérico de produtos, pois a tese consultiva exige a sequência:

```text
Contexto → compreensão → lacuna → decisão → proteção → acompanhamento
```

A arquitetura precisa separar presença pública, experiência da palestra e operação consultiva privada, preservando rastreabilidade jurídica, LGPD e propriedade intelectual.

---

## 3. Decisão Arquitetural

Adotar duas superfícies de produto com fronteira explícita:

```text
ECOSEG — Superfície Pública
        |
        | contrato de integração
        v
Cyborg Intelligence — Plataforma Privada
```

### 3.1 ECOSEG — superfície pública

Permanece no repositório `SiteEcosegSeguros` e será responsável por:

- identidade e posicionamento institucional;
- conteúdo público aprovado;
- vertical de proteção da família militar;
- página do evento;
- modo apresentação da palestra;
- diagnóstico inicial de baixa sensibilidade;
- consentimento e aviso de privacidade;
- agendamento e encaminhamento;
- integração controlada com a plataforma privada.

### 3.2 Cyborg Intelligence — plataforma privada

Será criada em repositório privado pertencente à Cyborg Tecnologia e será responsável por:

- autenticação e autorização;
- organizações, escritórios e consultores;
- perfis militares e familiares;
- base jurídica versionada;
- catálogo de produtos e fornecedores;
- regras determinísticas de aderência;
- diagnóstico consultivo completo;
- fundamentos, alertas e objeções;
- histórico, auditoria e relatórios;
- administração da plataforma;
- futura API comercial e operação multiempresa.

A primeira versão pode ser um monólito modular. Microserviços não são requisito da V1.

---

# 4. Decisões dos Sete Pontos

## 4.1 O que permanece no site público

Permanecem no site público:

- Home e posicionamento institucional;
- quem é a ECOSEG;
- metodologia consultiva;
- soluções e segmentos;
- conteúdo educativo;
- vertical `/militares`;
- página `/palestra/protecao-familia-militar`;
- modo de apresentação;
- diagnóstico inicial;
- contato, consentimento e agendamento;
- política de privacidade;
- fontes jurídicas públicas já aprovadas.

Não permanecem no site público:

- motor de aderência;
- regras comerciais proprietárias;
- documentos internos de seguradoras;
- ranking detalhado de produtos;
- histórico de atendimentos;
- dados pessoais completos;
- administração;
- credenciais;
- informações cuja publicação não tenha sido autorizada.

A Home continuará institucional e não será convertida em página exclusiva do público militar. A vertical militar será uma jornada própria, ligada à marca ECOSEG.

## 4.2 O que pertence ao SaaS da Cyborg Tecnologia

Pertencem à Cyborg Tecnologia:

- código-fonte da plataforma;
- arquitetura e modelo de domínio;
- motor de aderência;
- modelo de regras;
- contratos de API;
- estruturas de versionamento e auditoria;
- componentes reutilizáveis entre organizações;
- conhecimento estruturado produzido pela plataforma, ressalvados dados e documentos de terceiros;
- infraestrutura de operação do SaaS;
- evolução multiempresa.

A ECOSEG recebe licença de uso conforme contrato. Dados comerciais, dados de clientes e conteúdos fornecidos pela ECOSEG permanecem sujeitos à titularidade, finalidade e responsabilidades contratuais aplicáveis.

Nenhum contrato com a ECOSEG implica cessão automática de código-fonte ou exclusividade da plataforma.

## 4.3 Como a palestra será representada

A palestra será uma experiência web própria, não uma sequência improvisada da Home.

Rota inicial:

```text
/palestra/protecao-familia-militar
```

A página possuirá:

- modo normal, acessível antes e depois do evento;
- modo apresentação, em tela cheia e com navegação simples;
- roteiro visual alinhado à fala do João;
- fontes e notas de atualização;
- QR Code para o diagnóstico inicial;
- possibilidade futura de identificar evento/campanha sem expor dados do participante.

Narrativa oficial:

```text
Expectativa da família
→ mudança jurídica
→ proteção existente
→ possível lacuna
→ diagnóstico
→ categoria de solução
→ atendimento individual
```

A palestra não recomendará automaticamente um produto específico nem prometerá direito, cobertura, aprovação ou resultado.

## 4.4 Governança do conteúdo jurídico

O Word preparado por João será tratado como inventário bruto de descoberta.

Workflow obrigatório:

```text
Inventário bruto
→ classificação por tema e diploma
→ conferência em fonte oficial
→ revisão de vigência e transição
→ validação jurídica
→ tradução para linguagem acessível
→ aprovação editorial
→ publicação versionada
→ revisão periódica
```

Cada tópico jurídico deverá possuir:

- identificador;
- tema;
- pergunta do público;
- diploma legal;
- artigo e parágrafo;
- regra anterior;
- regra atual;
- regra de transição;
- público afetado;
- fonte oficial;
- data da consulta;
- responsável pela validação;
- status: bruto, em revisão, validado, suspenso ou desatualizado;
- versão;
- efeitos potenciais;
- ressalvas.

Somente conteúdo `VALIDADO` poderá chegar ao site, à palestra ou ao motor de aderência.

O sistema não substitui advogado, órgão militar, seguradora ou análise individual. Mudança legislativa, normativa ou jurisprudencial deverá ser capaz de suspender uma regra sem apagar seu histórico.

## 4.5 Como o diagnóstico público entrega dados ao consultor

O diagnóstico público terá escopo mínimo e educativo. Seu objetivo é qualificar o atendimento, não decidir o produto.

Fluxo:

```text
Visitante
→ aviso de privacidade
→ diagnóstico inicial
→ consentimento/autorização aplicável
→ registro do interesse
→ encaminhamento seguro
→ fila do consultor
→ diagnóstico completo autenticado
```

O site público poderá coletar inicialmente:

- nome;
- canal de contato;
- vínculo geral com o contexto militar;
- situação geral: ativa, reserva, reforma, pensionista ou dependente;
- preocupação principal;
- preferência de atendimento;
- consentimentos e registros necessários.

Não deverá coletar na etapa pública, salvo nova decisão e fundamento específico:

- contracheque;
- número de benefício;
- documentos militares;
- CPF;
- dados de saúde;
- dados bancários;
- documentos de dependentes;
- informações detalhadas de patrimônio;
- cópias de processos.

A transferência ocorrerá por contrato de API autenticado, com identificador, timestamp, origem/campanha, versão do formulário e evidência do consentimento. O envio apenas por e-mail não será a arquitetura definitiva.

## 4.6 Quais dados pessoais serão coletados e com qual fundamento

A coleta obedecerá aos princípios de finalidade, adequação, necessidade, transparência, segurança, prevenção, não discriminação e responsabilização.

Antes da implementação, cada campo deverá constar de um inventário contendo:

- finalidade;
- categoria do dado;
- titular;
- controlador e operador;
- fundamento jurídico;
- origem;
- destino;
- compartilhamentos;
- prazo de retenção;
- regra de eliminação ou anonimização;
- controle de acesso;
- trilha de auditoria.

Decisões iniciais:

1. A etapa pública utilizará minimização de dados.
2. Consentimento não será usado como fundamento genérico para toda a operação.
3. Dados de saúde, quando necessários, serão tratados como sensíveis e exigirão análise específica.
4. O CTA não fornecerá base de associados sem instrumento jurídico, finalidade definida e papéis de tratamento formalizados.
5. Não será realizado enriquecimento silencioso de perfis.
6. O titular deverá conhecer a finalidade do contato e os canais de exercício de seus direitos.
7. A política de privacidade e o registro de consentimento entrarão antes do diagnóstico público em produção.

A definição jurídica final dos fundamentos deverá ser validada por profissional habilitado antes da coleta produtiva.

## 4.7 Corte exato da V1

### Incluído na V1

**Site público ECOSEG**

- correção de contatos, domínio, canonical e rotas;
- reordenação narrativa da Home;
- vertical militar;
- página e modo apresentação da palestra;
- política de privacidade;
- diagnóstico inicial;
- encaminhamento seguro ao workspace.

**Workspace privado**

- login;
- organização ECOSEG;
- usuário João;
- cadastro inicial de perfis;
- catálogo inicial de produtos;
- base jurídica versionada;
- fontes e status de validação;
- formulário de diagnóstico completo;
- regras determinísticas de aderência;
- resultado explicável;
- alertas e ressalvas;
- histórico de atendimentos;
- resumo imprimível;
- auditoria mínima.

**Administração Cyborg**

- gestão de organizações e usuários;
- gestão de fontes, regras e versões;
- ativação, suspensão e substituição de regras;
- registro de publicação.

### Fora da V1

- cotação automática;
- emissão de apólice;
- assinatura eletrônica;
- integração direta com seguradoras;
- recomendação autônoma por IA;
- aplicativo móvel nativo;
- CRM completo;
- WhatsApp automatizado;
- portal do consumidor;
- API comercial pública;
- operação multiempresa em produção;
- ingestão automática de decisões judiciais sem revisão humana.

### Critério de sucesso da V1

A V1 será considerada validada quando permitir que João:

1. conduza a palestra pelo website;
2. receba interessados de forma rastreável;
3. realize diagnóstico consultivo;
4. visualize categorias de produtos aderentes com fundamento e ressalvas;
5. explique a recomendação;
6. registre a decisão e o próximo passo;
7. execute esse fluxo no CTA sem depender de arquivos dispersos.

---

## 5. Modelo de Domínio Inicial

```text
Organization
Consultant
AudienceProfile
Consultation
DiagnosticAnswer
ProtectionGap
LegalSource
LegalRule
RuleVersion
ProductProvider
Product
EligibilityRule
AdherenceResult
Objection
RecommendationExplanation
ConsentRecord
AuditEvent
Presentation
PresentationVersion
```

A aderência inicial será determinística e versionada:

```text
Perfil
→ necessidade
→ proteção existente
→ lacuna
→ elegibilidade
→ produto/categoria
→ fundamento
→ objeção
→ próxima ação
```

A plataforma recomenda e explica. O consultor decide.

---

## 6. Integrações e Segurança

A integração entre o site público e a plataforma deverá:

- utilizar HTTPS;
- autenticar o emissor;
- validar schema;
- aplicar rate limit durável;
- registrar correlação e auditoria;
- evitar dados sensíveis desnecessários;
- impedir exposição de regras proprietárias;
- adotar idempotência para submissões;
- possuir política de erro sem vazamento de informações internas.

Credenciais e segredos não serão armazenados no repositório.

---

## 7. Consequências

### Positivas

- preserva a propriedade intelectual da Cyborg;
- mantém o site público simples;
- permite replicação para outras corretoras;
- cria rastreabilidade jurídica;
- reduz risco de publicação indevida;
- prepara o produto para licenciamento;
- permite evolução sem reescrever a presença institucional.

### Custos e compromissos

- dois contextos de deploy e governança;
- autenticação e autorização no workspace;
- contrato formal entre ECOSEG e Cyborg;
- processo editorial/jurídico contínuo;
- adequação LGPD anterior à captação produtiva;
- necessidade de versionamento de regras e fontes.

---

## 8. Restrições desta decisão

Este ADR:

- não autoriza coleta produtiva de dados;
- não valida juridicamente conteúdos fornecidos por João;
- não autoriza publicação de marcas ou documentos de parceiros;
- não autoriza recomendação autônoma;
- não define preços ou contrato comercial;
- não substitui parecer jurídico;
- não autoriza implementação direta na branch `main`.

A sequência formal permanece:

```text
ADR 0005
→ modelo de domínio
→ contratos de dados e API
→ threat/privacy model
→ backlog da V1
→ protótipo
→ implementação
→ homologação no CTA
```

---

## 9. Próximas decisões necessárias

1. Nome comercial da plataforma.
2. Repositório privado e estratégia de deploy.
3. Responsáveis por validação jurídica e editorial.
4. Controlador e operador de cada fluxo de dados.
5. Política de retenção.
6. Catálogo inicial de produtos.
7. Matriz inicial de perfis e regras.
8. Contrato de licença ECOSEG × Cyborg.
9. Critérios de homologação no CTA.
10. Plano de contingência para regra jurídica suspensa ou desatualizada.

---

## 10. Rastreabilidade

Este ADR complementa:

- ADR 0001 — Next.js App Router;
- ADR 0002 — camada de conteúdo;
- ADR 0003 — Clean Architecture no frontend;
- ADR 0004 — pnpm;
- BD-003 — Progress Protection Philosophy;
- DES-001 — Experience Principles;
- DES-002 — Information Architecture;
- DES-007 — Home Experience;
- WEB-003 — Content Strategy;
- WEB-004 — Implementation Guide.

Afeta futuramente:

- `docs/roadmap.md`;
- `docs/sitemap.md`;
- `docs/architecture.md`;
- `src/app/page.tsx`;
- `src/content/`;
- novas rotas públicas da vertical militar e da palestra;
- novo repositório privado da plataforma Cyborg.

---

© ECOSEG / Cyborg Tecnologia
