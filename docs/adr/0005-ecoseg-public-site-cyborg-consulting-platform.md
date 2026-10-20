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

A palestra será uma experiência web própria e também suportada por apresentação estruturada (PPTX e modo apresentação interativo), não uma sequência improvisada da Home.

**Título Oficial da Palestra:**

> _“Lei nº 13.954/2019 — Perdas e consequências!”_

**Local do Evento Inaugural:**

> Clube dos Taifeiros da Aeronáutica (CTA) — Rio de Janeiro, RJ.

Rota inicial no site público:

```text
/palestra/protecao-familia-militar
```

A experiência possuirá:

- **Modo Apresentação (PPTX & Telão)**: Guia e roteiro de fala para João Brito e equipe, em estética Obsidian Navy e Imperial Brass, com notas de orador, cronômetro e 6 atos estruturados.
- **Página Pública da Palestra (Público & Celular)**: Apresentação do roteiro oficial e **Cards Interativos de Soluções** para o público suprir as ausências de direitos decorrentes da legislação.
- **QR Code & Link Direto**: Conduzindo a platéia do telão para a página de diagnóstico individual.

### Os 4 Pilares de Perdas Legais Abordados na Palestra:

1. **Perda da Assistência Médica aos Dependentes (FUNSA / SISAU / SARAM)**:
   - _Norma:_ Art. 50, § 2º da Lei nº 6.880/1980, com a redação restritiva dada pela Lei nº 13.954/2019.
   - _Consequência:_ Exclusão de filhos maiores de 21 anos e dependentes do plano de saúde da Aeronáutica.
2. **Perda da Pensão Militar das Filhas**:
   - _Norma:_ Artigo 31 da Medida Provisória nº 2.215-10/2001 e Lei nº 3.765/1960.
   - _Consequência:_ Fim da vitaliciedade automática; direito preservado exclusivamente para quem comprovadamente recolhe o 1,5% específico da regra de transição temporal.
3. **Perda do Adicional de 41% e Coisa Julgada (STF Tema 1175)**:
   - _Norma:_ Lei nº 13.954/2019 (Anexo II), STF Tema 1175 (ARE 1.341.061) e LINDB (Dec.-Lei nº 4.657/42, Art. 6º).
   - _Consequência:_ Decisão judicial definitiva pacificando que o Judiciário não pode estender percentuais máximos por isonomia. _"Não cabe mais recurso"_, encerrando as ilusões de litígio judicial.
4. **Isenção de Imposto de Renda e Previdência**:
   - _Norma:_ Lei nº 7.713/1988 para militares reformados portadores de moléstias elegíveis.

### Cards de Soluções Apresentados no Site (Homologados via ADR 0006):

| Perda Legal Decorrente da Lei nº 13.954                         | Solução Estruturada ECOSEG                                                                                                                                 | Seguradora Parceira              | SUSEP / Registro                                |
| --------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------- | ----------------------------------------------- |
| **Fim da Pensão Vitalícia das Filhas** (sem opção 1,5%)         | **Equilíbrio (Whole Life)**: R$ 500k+ de capital + Reserva Financeira (2% a.a. + IPCA + excedente). Sem ITCMD/inventário.                                  | **Icatu Seguros**                | `154149010412014-34`                            |
| **Proteção Centenária Exclusiva da Família Militar**            | **Força Ativa Resgatável & Tradicional**: Pecúlio e reserva programada para praças, taifeiros, sargentos e oficiais.                                       | **GBOEX** (desde 1913)           | `15414.900658/2017-85` e `15414.002185/2008-68` |
| **Custo e Bloqueio no Inventário Judicial** (perda de até 23%)  | **Horizonte (Vida Resgatável Nivelado)**: Quitação flexível em 5 a 20 anos, parcelas que não aumentam com a idade, 24 doenças graves e liquidez em vida.   | **Icatu Seguros**                | `15414.611834/2025-17`                          |
| **Confisco de 10,5% na Pensão e Reserva** (Art. 3º-A Lei 3.765) | **Previdência Privada com Compra de Renda**: Fundo sem come-cotas, alíquota de 10% (regressiva) e conversão em Renda Vitalícia Reversível à pensionista.   | **Icatu Seguros**                | PGBL / VGBL Regressivo                          |
| **Vulnerabilidade e Quedas na Terceira Idade** (> 60 anos)      | **Master Acidentes Domiciliares**: Internação hospitalar, fraturas e Assistência Check-Up Lar (instalação de barras em banheiros e fitas antiderrapantes). | **MAG Seguros** (Mongeral Aegon) | `15414.606228/2020-75`                          |
| **Transição de Carreira & Auditoria de Proventos**              | **Planejamento Previdenciário Consultivo**: Diagnóstico individual de carreira, tempo de serviço, adicionais e averbações.                                 | **Consultoria Especializada**    | Base Operacional CTA-RJ                         |

**Canal Oficial de Atendimento e Cotações:** WhatsApp/Telefone **(21) 99469-3673** | `contato@ecoseg.com.br` | Rio de Janeiro, RJ (CTA).

Narrativa oficial governada (M1-R03):

```text
Abertura (Lei 13.954/19)
→ Contexto (FUNSA e corte de dependentes)
→ Evidência (Pensão das filhas MP 2.215 e STF Tema 1175)
→ Virada ("E agora? Não cabe mais recurso")
→ Método ECOSEG
→ Opções de Produtos (Cards no Site)
→ Diagnóstico Confidencial no CTA
```

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

## 4.7 Corte de entrega: Marco 0 e V1

A palestra é o primeiro marco da parceria e o primeiro instrumento de descoberta do negócio. Ela não aguardará a conclusão do modelo de domínio integral do SaaS.

### Marco 0 — Palestra e descoberta operacional

Incluído:

- inventário dos tópicos legais fornecidos por João;
- conferência das fontes oficiais;
- validação jurídica e editorial do conteúdo utilizado;
- roteiro mestre da palestra;
- página pública do evento;
- modo apresentação no website;
- ensaio com João;
- QR Code;
- aviso de privacidade;
- formulário mínimo de interesse;
- identificação do evento/campanha;
- registro rastreável dos interessados;
- relatório pós-evento com perguntas, objeções, perfis, demandas e conversões.

O Marco 0 não inclui motor de aderência, recomendação individual, prontuário consultivo completo ou catálogo operacional de produtos.

### Critério de sucesso do Marco 0

O Marco 0 será considerado validado quando João conseguir:

1. conduzir a palestra pelo website;
2. apresentar apenas conteúdo jurídico validado;
3. registrar interessados com transparência e minimização de dados;
4. encaminhar os interessados para atendimento;
5. produzir evidências sobre dores, perfis, dúvidas e objeções reais do público do CTA;
6. utilizar essas evidências no refinamento do produto SaaS.

### Incluído na V1 consultiva

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

### Critério de sucesso da V1 consultiva

A V1 consultiva será considerada validada quando, utilizando as evidências do Marco 0, permitir que João:

1. receba os interessados qualificados pela palestra;
2. realize diagnóstico consultivo;
3. visualize categorias de produtos aderentes com fundamento e ressalvas;
4. explique a recomendação;
5. registre a decisão e o próximo passo;
6. execute esse fluxo no CTA sem depender de arquivos dispersos.

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

A sequência formal passa a distinguir o marco de parceria da construção integral da plataforma:

```text
ADR 0005
→ Marco 0: conteúdo governado + roteiro da palestra
→ protótipo e modo apresentação
→ privacidade + captação mínima
→ ensaio com João
→ palestra no CTA
→ evidências do público e da operação
→ refinamento do modelo de negócio
→ modelo de domínio do SaaS
→ contratos de dados e API
→ threat/privacy model integral
→ backlog da V1 consultiva
→ implementação
→ homologação consultiva no CTA
```

A palestra constitui autorização para descoberta e validação do negócio, não autorização automática para construir todas as capacidades do SaaS.

---

## 9. Próximas decisões necessárias

### Antes da palestra

1. Data, duração, local e capacidade do evento.
2. Público prioritário e convite.
3. Tópicos jurídicos que entrarão no roteiro.
4. Responsável pela validação jurídica.
5. Produtos e categorias que podem ser mencionados.
6. Dados mínimos do formulário e aviso de privacidade.
7. Resultado esperado e métricas do evento.
8. Responsável pelo retorno aos interessados.

### Após a palestra

1. Nome comercial da plataforma.
2. Repositório privado e estratégia de deploy.
3. Responsáveis permanentes por validação jurídica e editorial.
4. Controlador e operador de cada fluxo de dados.
5. Política de retenção.
6. Catálogo inicial de produtos.
7. Matriz inicial de perfis e regras.
8. Contrato de licença ECOSEG × Cyborg.
9. Critérios da V1 consultiva.
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

---

## 11. Palestra como Instrumento de Descoberta do Negócio

A palestra é simultaneamente:

- entrega inicial de valor ao João;
- abertura institucional da parceria;
- validação do posicionamento da ECOSEG;
- mecanismo de acesso ao público do CTA;
- fonte governada de evidências para o SaaS.

O relatório pós-evento deverá consolidar:

- quantidade de participantes;
- perfis predominantes;
- perguntas realizadas;
- tópicos com maior interesse;
- objeções recorrentes;
- expectativas equivocadas identificadas;
- categorias de proteção procuradas;
- interessados captados;
- atendimentos agendados;
- conversões posteriores;
- alterações necessárias no roteiro, no diagnóstico e no produto.

Nenhuma observação isolada será convertida automaticamente em regra de aderência. Evidência de campo deverá ser classificada, revisada e relacionada a fonte jurídica e produto antes de entrar no domínio da plataforma.
