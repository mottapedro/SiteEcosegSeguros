# ECOSEG — Site, Palestra e Plataforma Consultiva

Repositório público da superfície web da ECOSEG.

O projeto começou como um template institucional construído de forma incremental: uma base semântica de páginas, componentes e conteúdo que evolui conforme o domínio é compreendido. A implementação atual preserva essa abordagem, mas passa a atender uma jornada consultiva específica para militares, pensionistas, dependentes e suas famílias.

A ECOSEG é a superfície pública e comercial. A futura plataforma de inteligência consultiva será um produto SaaS da Cyborg Tecnologia, com licenciamento para escritórios e consultores.

---

## 1. Contexto do projeto

A ECOSEG atua no ecossistema de produtos de seguros, pecúlio e previdência, com acesso a parceiros e escritórios como:

- GBOEX;
- Dario Porto;
- Escritório de Consultoria Pantaleone;
- Icatu;
- Allianz.

A primeira frente de validação é o Clube dos Taifeiros do Rio de Janeiro (CTA). O público inclui:

- militares ativos e veteranos das Forças Armadas;
- militares da reserva e reformados;
- pensionistas;
- dependentes;
- pessoas interessadas em proteção familiar.

O problema consultivo nasce da necessidade de distinguir:

1. o que a família acredita que permanece protegido;
2. o que decorre de lei, regulamento ou condição específica;
3. o que precisa ser confirmado por fonte oficial ou análise individual;
4. quais lacunas podem ser tratadas por soluções privadas;
5. qual é o próximo passo adequado para cada pessoa.

A ECOSEG não publica promessa de direito, cobertura, aprovação ou resultado. O site educa, organiza a conversa e encaminha o atendimento.

---

## 2. Objetivo atual

O primeiro marco é a palestra sobre proteção da família militar.

A palestra será conduzida por João Brito, Diretor Executivo Comercial da ECOSEG, e sua equipe. Ela funciona como:

- entrega inicial de valor ao CTA;
- porta de entrada da parceria;
- experiência pública do website;
- instrumento de descoberta das dúvidas e objeções do público;
- fonte de evidências para o futuro produto consultivo.

O evento está previsto para **21/10/2026**, sujeito à confirmação operacional do CTA.

A página da palestra fica em:

```text
/palestra/protecao-familia-militar
```

O modo de apresentação fica em:

```text
/palestra/protecao-familia-militar/apresentacao
```

A apresentação permanece `noindex` enquanto o conteúdo estiver em homologação.

---

## 3. Escopo do Marco 0

O Marco 0 é a entrega da palestra e da descoberta operacional.

### Incluído

- inventário dos tópicos recebidos de João;
- fontes e referências versionadas;
- roteiro editorial;
- página pública da palestra;
- modo apresentação;
- navegação por teclado, toque e controles visuais;
- indicador de progresso;
- tela cheia;
- acessibilidade essencial;
- aviso de natureza educativa;
- ensaio com João;
- QR Code e captação mínima, após aprovação de privacidade;
- identificação da campanha;
- registro das perguntas, objeções e perfis percebidos;
- relatório pós-evento.

### Fora do Marco 0

- motor de aderência;
- recomendação automática de produto;
- catálogo operacional completo;
- diagnóstico consultivo completo;
- prontuário de atendimento;
- autenticação de consultores;
- integração direta com seguradoras;
- cotação ou emissão de apólice;
- CRM completo;
- coleta de contracheque, CPF, documentos militares, dados bancários ou dados de saúde.

O primeiro vertical slice implementado contém contratos, conteúdo demonstrativo não jurídico, página pública e modo apresentação. Conteúdo jurídico só entra na experiência publicada após validação.

---

## 4. Produto de longo prazo

O projeto evolui para um SaaS B2B de inteligência consultiva pertencente à Cyborg Tecnologia.

### Superfície pública — ECOSEG

Permanece neste repositório:

- identidade e posicionamento institucional;
- metodologia pública;
- conteúdo educativo aprovado;
- vertical de proteção da família militar;
- página e apresentação da palestra;
- aviso de privacidade;
- captação mínima;
- encaminhamento ao consultor;
- fontes jurídicas públicas aprovadas.

### Plataforma privada — Cyborg Tecnologia

Será construída em repositório privado próprio e poderá conter:

- organizações e consultores;
- perfis e diagnósticos;
- base jurídica versionada;
- catálogo de produtos e fornecedores;
- regras determinísticas de aderência;
- resultados explicáveis;
- objeções e fundamentos;
- histórico de atendimentos;
- auditoria;
- relatórios;
- futura API comercial e operação multiempresa.

A ECOSEG será cliente fundador e ambiente de validação. O contrato de licença não implica cessão automática do código-fonte, do motor ou da propriedade intelectual da Cyborg Tecnologia.

---

## 5. Governança do conteúdo jurídico

O material recebido de João é tratado como inventário bruto de descoberta.

O fluxo obrigatório é:

```text
Inventário bruto
→ classificação por tema
→ conferência em fonte oficial
→ revisão de vigência e transição
→ validação jurídica
→ redação acessível
→ aprovação editorial
→ publicação versionada
→ revisão periódica
```

Cada referência deve registrar:

- identificador;
- tema;
- diploma legal, artigo ou precedente;
- regra anterior e atual, quando aplicável;
- fonte oficial;
- data da consulta;
- responsável pela validação;
- versão;
- ressalvas;
- status.

Estados utilizados:

```text
DRAFT → IN_REVIEW → VALIDATED
                         ↘ SUSPENDED
                         ↘ OUTDATED
```

Somente referências `VALIDATED` podem aparecer em uma publicação jurídica aprovada. O sistema não substitui advogado, órgão militar, seguradora ou análise individual.

---

## 6. Identidade visual e experiência

A documentação visual já possui uma direção definida, mas não está encerrada como identidade completa.

### Decisões vigentes

- Verde Eco como cor primária;
- Azul Institucional como cor de apoio;
- Inter como família tipográfica;
- grid institucional com `max-w-7xl`;
- bordas discretamente arredondadas;
- sombras leves;
- ícones Lucide em traço;
- contraste AA;
- clareza acima de ornamentação;
- complexidade organizada;
- núcleo protegido por camadas de contexto;
- proteção comunicada por contenção, não por defesa agressiva.

### Restrições registradas

A linguagem visual não deve usar:

- escudo, cadeado, cofre ou guarda-chuva;
- redes neurais, circuitos ou gradientes futuristas;
- mãos protegendo objetos;
- ilustrações de pessoas sorrindo em cenas genéricas;
- clichês de seguros tradicionais;
- padrões decorativos sem relação com o conteúdo.

O template inicial ainda está em processo de alinhamento com essas decisões. A evolução visual deve preservar a lógica de camadas, contexto, evidência e leitura consultiva.

### Estado da identidade

Já estão documentados:

- DNA da marca;
- arquitetura de marca;
- filosofia de proteção;
- princípios de experiência;
- arquitetura da informação;
- linguagem de interação;
- design system;
- motion language;
- visual language system;
- experiência da Home.

Ainda dependem de evolução específica:

- símbolo definitivo;
- logotipo definitivo;
- exploração visual validada por referências;
- aplicações finais da identidade.

Fontes principais:

- `docs/brand/`;
- `docs/visual/`;
- `docs/web/`.

---

## 7. Arquitetura atual

A aplicação usa:

- Next.js 16 com App Router;
- TypeScript;
- React 19;
- Tailwind CSS v4;
- shadcn/ui com `@base-ui/react`;
- React Hook Form;
- Zod;
- Resend;
- pnpm;
- Vercel.

A organização principal é:

```text
src/
├── app/                  # rotas, layouts e handlers
├── components/           # layout, seções e componentes de UI
├── content/              # conteúdo tipado
├── contracts/            # contratos de domínio da apresentação
├── features/             # funcionalidades verticais
├── lib/                  # SEO, configuração e utilitários
└── services/             # integrações externas
```

A palestra não deve ser misturada à Home institucional. O conteúdo da apresentação fica em módulo próprio:

```text
src/app/palestra/protecao-familia-militar/
src/components/presentation/
src/content/presentations/
src/contracts/presentation.ts
```

A feature de contato institucional não deve ser reutilizada diretamente para a futura captação da palestra sem nova decisão. As finalidades, campos, consentimentos e destino dos dados são diferentes.

---

## 8. DevOps e governança de versão

A cadeia oficial é:

```text
Pasta local SiteEcosegSeguros
→ Git local
→ GitHub / branch de trabalho
→ Pull Request
→ Vercel Preview
→ homologação
→ merge na main
→ Vercel Production
```

### Camadas

| Camada | Função |
|---|---|
| Pasta local | Desenvolvimento e testes iniciais |
| Git | Histórico, autoria e reversão |
| GitHub | Fonte oficial, branches, commits e Pull Requests |
| Vercel Preview | Homologação isolada |
| `main` | Estado aprovado para produção |
| Vercel Production | Versão pública vigente |
| Commit/deployment | Evidência da versão publicada |

### Branches

Padrões:

- `feat/` — nova capacidade;
- `fix/` — correção funcional;
- `docs/` — documentação;
- `refactor/` — alteração interna;
- `hotfix/` — correção urgente em produção.

Não se desenvolve diretamente na `main`.

### Homologação

A homologação possui quatro dimensões:

1. técnica;
2. visual e operacional;
3. editorial;
4. jurídica e de privacidade.

Um Preview aprovado tecnicamente, mas pendente de validação editorial ou jurídica, não está autorizado para produção.

### Rollback

O rollback retorna a última versão estável conhecida.

O procedimento deve:

1. identificar o deployment afetado;
2. registrar impacto e motivo;
3. promover ou restaurar a versão estável;
4. verificar as rotas críticas;
5. alinhar produção e `main`;
6. abrir a correção em nova branch;
7. registrar o incidente.

Documentação completa:

```text
docs/operations/OP-001-development-release-rollback.md
```

---

## 9. Contatos operacionais atuais

Os números abaixo foram fornecidos para a operação do site:

| Região | Telefone / WhatsApp | Uso |
|---|---|---|
| Rio de Janeiro | +55 21 99469-3673 | Contato principal |
| Espírito Santo | +55 27 99292-2957 | Contato regional |

O e-mail público oficial ainda precisa ser confirmado. `contato@ecoseg.com.br` permanece no template como placeholder e não deve ser tratado como endereço validado.

---

## 10. Documentação do projeto

### Arquitetura e decisões

- `docs/architecture.md`
- `docs/folder-structure.md`
- `docs/adr/`
- `docs/adr/0005-ecoseg-public-site-cyborg-consulting-platform.md`

### Produto e palestra

- `docs/milestones/M0-001-lecture-development-backlog.md`
- `docs/roadmap.md`
- `docs/backlog.md`
- `docs/sitemap.md`

### Marca e experiência

- `docs/brand/`
- `docs/visual/`
- `docs/web/`

### Operação

- `docs/operations/OP-001-development-release-rollback.md`

O README apresenta o contexto e as relações entre as decisões. Os documentos especializados são a fonte normativa de cada assunto.

---

## 11. Execução local

Requisitos:

- Node.js compatível com o projeto;
- pnpm;
- chave do Resend para o formulário institucional.

Instalação:

```bash
pnpm install
```

Desenvolvimento:

```bash
pnpm dev
```

A aplicação fica disponível em:

```text
http://localhost:3000
```

Variáveis de ambiente do formulário:

```text
RESEND_API_KEY
```

Scripts:

```bash
pnpm dev          # servidor de desenvolvimento
pnpm lint         # ESLint
pnpm build        # build de produção
pnpm format       # Prettier
pnpm format:check # validação de formatação
```

---

## 12. Próximas iterações

A ordem do Marco 0 é:

1. contratos e roteiro;
2. página pública;
3. modo apresentação;
4. governança do conteúdo jurídico;
5. privacidade e captação mínima;
6. ensaio e prontidão;
7. palestra no CTA;
8. evidência de campo e relatório pós-evento.

Depois da palestra:

1. consolidar dúvidas e objeções;
2. revisar perfis reais do público;
3. definir catálogo inicial;
4. formalizar regras de aderência;
5. definir contrato ECOSEG × Cyborg;
6. criar o workspace privado;
7. implementar o diagnóstico consultivo;
8. homologar a V1 no CTA.

Nenhuma observação isolada do evento vira automaticamente regra de produto ou regra jurídica. A evidência precisa ser classificada, revisada e relacionada à fonte correspondente.

---

## 13. Estado atual do repositório

Este README foi produzido na branch:

```text
docs/readme-project-context
```

A branch `main` continua protegida pelo processo de revisão e não deve receber alterações diretas.

A promoção deste README para a `main` depende de revisão do conteúdo, dos contatos e da decisão sobre o e-mail oficial.
