# Prompt Mestre de Implementação para o Agente Local (AntiGravity / Cursor / Claude Code)

Copie e cole as instruções abaixo diretamente no seu Agente Local no repositório `SiteEcosegSeguros` (branch `feat/marco-0-palestra` ou `main`):

````markdown
# MISSÃO: Implementação do Catálogo de Soluções ECOSEG (Lei 13.954/2019) e do Núcleo SaaS Privado Cyborg Intelligence

Você é o Engenheiro de Software responsável por sincronizar o repositório local `SiteEcosegSeguros` com as especificações arquiteturais consolidadas nas ADRs 0005, 0006 e 0007 e nos documentos de domínio ECOSEG.

## 1. Contexto do Negócio e Arquitetura

1. **ECOSEG (Site Público / Consultoria Homologada):**
   - Propósito: Posicionamento institucional de inteligência jurídica e patrimonial para famílias militares e empresas.
   - Foco inicial: Palestra do CTA (Clube dos Taifeiros da Aeronáutica, RJ) e atendimento consultivo presencial/online.
   - Base Jurídica: Lei Federal nº 13.954/2019 (desconto compulsório de 10,5% sem escalonamento, perda da pensão vitalícia integral para filhas de militares pós-2000 sem a contribuição adicional de 1,5%, inventário judicial com custas de 10% a 20%, e riscos tributários do ITCMD progressivo).
   - Soluções Oficiais Homologadas:
     - **Icatu Equilíbrio Whole Life:** Seguro de vida inteira com prêmio nivelado vitalício, isento de IR e imune a inventário (Art. 794 do Código Civil), liquidez em até 30 dias.
     - **Icatu Horizonte:** Seguro temporário sob medida para cobrir custos imediatos de inventário, ITCMD e custas advocatícias durante a transição sucessória.
     - **Icatu Vida Longa & Vida Longa Resgatável:** Proteção familiar de longo prazo com reserva financeira acumulada corrigida pelo IPCA.
     - **Icatu Força Ativa & Força Ativa Resgatável:** Cobertura de incapacidade temporária/permanente e invalidez por acidente ou doença para militares da ativa e reserva com atividade laboral.
     - **Icatu Master Acidentes Domiciliares:** Cobertura de acidentes pessoais domésticos, fraturas e emergências para veteranos reformados e cônjuges da terceira idade.
     - **GBOEX Pecúlio Previdenciário (Plano Especial / Pecúlio Mais / Viva Bem):** Pecúlio histórico consignado em folha de pagamento da Aeronáutica/Exército/Marinha, sem inventário, de pagamento direto aos beneficiários cadastrados.

2. **Cyborg Intelligence (Plataforma Privada / SaaS B2B):**
   - Propriedade Intelectual: Exclusiva da Cyborg Tecnologia. ECOSEG é cliente piloto fundador com licenciamento homologado.
   - Função: Motor determinístico de aderência matemática e jurídica (zero alucinação de IA), gestão de dossiês dos militares atendidos no CTA, matriz de regras auditáveis e contratos de ingestão de leads via webhook/API.

---

## 2. Roteiro de Arquivos para Criar/Atualizar no Repositório Local

Execute a criação dos seguintes arquivos exatamente nos caminhos indicados:

### A. Tipos de Domínio Militar (`src/domain/military-family/types.ts`)

Criar definições TypeScript para:

- `NormaJuridica` (Lei 13.954/2019, MP 2.215-10/2001, Art. 794 CC, etc.)
- `PerfilMilitar` (Força, patente/graduação, status ativa/reserva/reformado, ano de ingresso, filhos, cônjuge)
- `LacunaProtecao` (Corte de pensão de filhas, desconto 10,5%, inventário, morte prematura, incapacidade)
- `CategoriaSolucao` (`VIDA_INTEIRA`, `INVENTARIO_LIQUIDEZ`, `RESERVA_RESGATAVEL`, `INCAPACIDADE_TEMPORARIA`, `VETERANO_DOMICILIAR`, `PECULIO_CONSIGNADO`)
- `SolucaoProdutoEcoSeg` (ID, nome, seguradora, modelo, carências, regras de aderência)

### B. Catálogo Completo de Soluções (`src/domain/military-family/products.ts`)

Cadastrar os produtos oficiais parametrizados:

1. `icatu-equilibrio-whole-life` (Icatu)
2. `icatu-horizonte-temporario` (Icatu)
3. `icatu-vida-longa-resgatavel` (Icatu)
4. `icatu-forca-ativa-invalidez` (Icatu)
5. `icatu-master-acidentes-domiciliares` (Icatu)
6. `gboex-peculio-militar-consignado` (GBOEX)

### C. Motor Determinístico de Aderência (`src/domain/cyborg-platform/adherenceEngine.ts`)

Implementar a função pura `evaluateCyborgAdherence(profile: AudienceProfileEntity): AdherenceEngineResult`:

- Analisar lacunas com base no perfil (idade, ano de ingresso pré/pós 2000, desconto de 1,5%, valor do patrimônio, filhos).
- Calcular pontuação de aderência (0 a 100) para cada solução do catálogo.
- Gerar sumário executivo, vulnerabilidades críticas, soluções primárias/secundárias, fundamentação jurídica estrita e roteiro de objeções consultivas.

### D. Schema e Dossiês do CTA (`src/domain/cyborg-platform/schema.ts` e `consultationStore.ts`)

- Modelar entidades `AudienceProfileEntity`, `AdherenceResultEntity`, `Consultation`, `Organization`, `Consultant`.
- Preencher casos reais semeados do atendimento no CTA (Ex: Suboficial Reformado da Aeronáutica, 64 anos, com filha maior de 21 anos pós-13.954 sem alíquota de 1,5%).

### E. Contrato da API de Ingestão de Leads (`src/domain/contracts/cyborg-api.ts`)

- Definir interface `LeadIngestionPayload` e `LeadIngestionResponse` com autenticação via `Bearer cbg_live_*` e suporte ao webhook da palestra.

### F. Painel Cyborg Intelligence Workspace (`src/components/cyborg/CyborgIntelligenceWorkspace.tsx`)

Criar o workspace do consultor com 4 abas operacionais:

1. **Motor de Aderência (Simulador ao Vivo):** formulário do militar + relatório imediato com lacunas e soluções ranqueadas.
2. **Dossiês CTA & Fila de Atendimentos:** lista de militares atendidos, status do diagnóstico, botão para exportar/imprimir dossiê.
3. **Matriz de Regras & Base Legal:** tabela de normas auditáveis (Lei 13.954, CC 794, Circular SUSEP 667).
4. **API & Contratos de Integração:** documentação de webhook e payload de envio de leads.

### G. Documentação de Governança e ADRs (`docs/`)

- `docs/adr/0005-ecoseg-public-site-cyborg-consulting-platform.md`
- `docs/adr/0006-catalogo-produtos-solucoes-lei-13954.md`
- `docs/adr/0007-cyborg-intelligence-saas-core-architecture.md`
- `docs/domain/catalogo-produtos-solucoes.md`
- `docs/domain/CYBORG-INTELLIGENCE-SAAS-SPEC.md`

---

## 3. Comandos de Verificação e Build Local

Após escrever os arquivos, execute no terminal do projeto:

```bash
# 1. Checar tipagem e linter
pnpm lint || npm run lint

# 2. Compilar aplicação
pnpm build || npm run build

# 3. Testar localmente
pnpm dev
```
````

```

```
