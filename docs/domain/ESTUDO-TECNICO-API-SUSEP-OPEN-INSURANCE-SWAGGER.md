# Estudo Técnico e Arquitetural: APIs SUSEP / Open Insurance Brasil (OPIN) para Comercialização, Cotação e Fechamento de Apólices

**Documento:** ESTUDO-ARQ-2026-001  
**Classificação:** Estratégico & Arquitetura de Integração B2B  
**Data:** 2026-10-20  
**Autores:** Equipe de Arquitetura Cyborg Intelligence & ECOSEG  
**Alinhamento Normativo:** Resolução CNSP nº 415/2021, Circular SUSEP nº 635/2021, Lei nº 13.954/2019, STF Tema 1175, ADR 0005, ADR 0007, ADR 0008 e ADR 0009.

---

## 1. Sumário Executivo

Este estudo analisa a viabilidade, disponibilidade de especificações **Swagger / OpenAPI 3.0**, fluxo de cotação em tempo real e fechamento de apólices no ecossistema regulatório da **SUSEP (Superintendência de Seguros Privados)** e do **Open Insurance Brasil (OPIN)**.

O objetivo é fundamentar como corretoras consultivas (como a **ECOSEG** no Clube dos Taifeiros - CTA) podem utilizar:

1. Os dados padronizados da **SUSEP / Open Insurance Brasil** para consultar produtos, coberturas e condições gerais;
2. As **APIs de Iniciação de Serviços (Fase 3 do OPIN)** e as **APIs proprietárias de distribuição** das seguradoras parceiras (**Icatu, MAG Seguros, GBOEX**);
3. O motor determinístico da **Cyborg Intelligence** (ADR 0005 e ADR 0007) para transformar cotações cruas em **recomendações com aderência jurídica**, gerando propostas oficiais assinadas digitalmente.

---

## 2. A SUSEP e o Open Insurance Brasil Possuem Swagger? Onde e Como Obter?

### **RESPOSTA DIRETA: SIM, É TOTALMENTE ACESSÍVEL E PADRONIZADO EM OPENAPI 3.0 / SWAGGER.**

O ecossistema do Open Insurance Brasil, governado pela SUSEP, foi concebido desde o princípio sob a arquitetura de **Open APIs RESTful**, documentadas formalmente no padrão **OpenAPI Specification (OAS 3.0 / Swagger)**.

### 2.1. Onde Obter os Arquivos Swagger Oficiais:

1. **Portal Oficial da Área do Desenvolvedor OPIN:**
   - **URL:** `https://br-openinsurance.github.io/areadesenvolvedor/`
   - **Seção:** _Especificações de APIs_ no menu lateral.
   - Permite navegar interativamente pelas APIs com interface Swagger UI nativa, visualizar schemas JSON, exemplos de payload (request/response) e códigos de status HTTP (200, 201, 400, 401, 403, 422, 500).

2. **Repositório Oficial no GitHub (Arquivos `.yaml` e `.json` brutos):**
   - **Organização GitHub:** `https://github.com/br-openinsurance` e `https://github.com/Open-Insurance-Brasil`
   - **Repositório Central de Especificações:** `br-openinsurance/areadesenvolvedor`
   - Contém os arquivos de definição OpenAPI prontos para importação no Postman, Insomnia, SwaggerHub, ferramentas de code-generation (`openapi-generator`) ou gateways de API.

3. **Portal de Dados Abertos do Governo Federal (gov.br / SUSEP):**
   - **URL:** `https://www.gov.br/susep/pt-br/assuntos/open-insurance`
   - Hospeda os manuais normativos oficiais, resoluções CNSP e circulares SUSEP que determinam a obrigatoriedade técnica das APIs.

4. **Ambiente Mock / Sandbox Oficial do Open Insurance:**
   - Repositório: `https://github.com/br-openinsurance/MockOPIN`
   - Implementação completa de referência com mocks das APIs para homologação de chamadas, testes de payloads de cotação e validação de tokens mTLS/OAuth2.

---

## 3. As 3 Fases do Open Insurance e o Papel na Cotação e Venda

O Open Insurance Brasil é dividido em três fases regulamentares:

| Fase                                    | Escopo Técnico                                                                       | APIs Disponíveis (Swagger)                                                                                                 | Utilidade para a Corretora / Cyborg                                                                                                                                                                                                  |
| :-------------------------------------- | :----------------------------------------------------------------------------------- | :------------------------------------------------------------------------------------------------------------------------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Fase 1**<br>_(Open Data)_             | Dados públicos sobre produtos e canais de atendimento das seguradoras.               | • `/products-services/v1/person`<br>• `/products-services/v1/life-pension`<br>• `/products-services/v1/financial-risk`     | **Catálogo Público de Produtos:** Permite à Cyborg alimentar deterministicamente as regras de carência, limites de idade, tipos de cobertura (Morte Acidental, Invalidez, Sobrevivência) e processos SUSEP oficiais das seguradoras. |
| **Fase 2**<br>_(Customer Data)_         | Compartilhamento de dados cadastrais e apólices do cliente (mediante consentimento). | • `/customers/v1/personal-identifications`<br>• `/insurance-person/v1/policy-info`<br>• `/claims/v1/claims-events`         | **Diagnóstico Patrimonial Pré-Venda:** Com consentimento do militar, a corretora importa as apólices antigas que o militar já possui para identificar sobreposições, carências vigentes ou coberturas canceladas pela Lei 13.954/19. |
| **Fase 3**<br>_(Iniciação de Serviços)_ | **Cotação, Proposta, Endosso e Contratação.**                                        | • `/quote-person/v1/quote`<br>• `/quote-life-pension/v1/quote`<br>• `/contract/v1/proposal`<br>• `/endorsement/v1/request` | **Cotação em Tempo Real e Emissão:** O militar recebe propostas formais tarifadas pela seguradora, preenche a DPS (Declaração Pessoal de Saúde) e fecha a apólice com protocolo emitido na hora.                                     |

---

## 4. Comparativo Crucial: API SUSEP (OPIN) vs. APIs Proprietárias das Seguradoras

Para desenhar uma arquitetura que realmente funcione no dia a dia da corretora, é fundamental entender a coexistência entre duas trilhas de integração:

```
┌─────────────────────────────────────────────────────────────────────────────────────────┐
│                           ESTRATÉGIA DE CONEXÃO DA CORRETORA                            │
├────────────────────────────────────────────┬────────────────────────────────────────────┤
│     TRILHA 1: OPEN INSURANCE (SUSEP/OPIN)  │   TRILHA 2: APIS DIRETAS DAS SEGURADORAS   │
├────────────────────────────────────────────┼────────────────────────────────────────────┤
│ • Padrão regulatório universal único.      │ • APIs comerciais dedicadas ao corretor.   │
│ • Exige credenciamento SPOC / Iniciador.   │ • Acesso via código SUSEP da corretora.    │
│ • Autenticação FAPI (mTLS + ICP-Brasil).   │ • Tokens OAuth2 / API Keys corporativas.   │
│ • Excelente para cotação multiprodutos.    │ • Fechamento direto com débito em folha/CTA│
│ • Padronizado pelo Swagger da SUSEP.       │ • Integração com portais Icatu, MAG, GBOEX.│
└────────────────────────────────────────────┴────────────────────────────────────────────┘
```

### Por que a abordagem Híbrida (Gateway Cyborg) é a melhor escolha?

1. O **Open Insurance Brasil** fornece a estrutura padronizada (Swagger) de cotação e catálogo;
2. As **APIs Diretas de Parceiros (Icatu Multiprodutos, MAG Venda Digital, GBOEX)** oferecem as esteiras consolidadas de subscrição com desconto em folha para militares da FAB/EB/MB e Clube dos Taifeiros (CTA);
3. O **Gateway da Cyborg Intelligence (ADR 0008 e ADR 0009)** atua como uma **camada unificadora (Facade/Adapter)** que fala com ambas as pontas.

---

## 5. Arquitetura da Solução Integrada com ADR 0005 & ADR 0007

### 5.1. O Ciclo da Decisão Consultiva com Cotação em Tempo Real

```
[ Militar no CTA-RJ ]
         │
         ▼ (1) Entrada de Dados (Idade, Posto Militar, Dependentes, Renda)
[ Simulador Consultivo ECOSEG ]
         │
         ▼ (2) Token Bearer / Licença B2B (ADR 0009)
[ CYBORG INTELLIGENCE CORE (ADR 0007) ]
         │
         ├───► [ Motor Determinístico Jurídico (ADR 0005) ]
         │       • Mapeia corte da Lei 13.954/2019 (Art. 50 e 15)
         │       • Audita intangibilidade do STF Tema 1175
         │       • Define lacuna de capital: R$ 500k a R$ 1,5M
         │
         ├───► [ Hub de Conectores em Tempo Real (ADR 0008) ]
         │       • Chamada paralela aos conectores (Open Insurance / APIs Parceiras)
         │       • GET/POST com payload padronizado Swagger OAS 3.0
         │       ├──► Conector Icatu Seguros (Vida / Previdência)
         │       ├──► Conector MAG Seguros (Invalidez / Morte Acidental)
         │       └──► Conector GBOEX (Pecúlio / Força Ativa Militar)
         │
         ▼ (3) Resposta Consolidada em < 250ms
[ Matriz de Soluções com Aderência Determinística ]
         │
         ▼ (4) Escolha da Solução & Preenchimento DPS Simplificada
[ Emissão de Proposta Oficial ]
         │
         ├───► Carimbo Criptográfico SHA-256 e Processo SUSEP
         ├───► Enfileiramento do Dossiê para o Consultor João Brito
         └───► Emissão do Laudo Técnico Oficial CTA-RJ (PDF/JSON)
```

---

## 6. Especificação OpenAPI / Swagger da Cyborg Intelligence (Proposta para o Ecossistema)

Abaixo está o modelo formal do contrato **Swagger / OpenAPI 3.0** que unifica o ecossistema para a corretora:

```yaml
openapi: 3.0.3
info:
  title: Cyborg Intelligence — Gateway de Decisão Consultiva & Cotações B2B
  description: >
    API unificada compatível com as especificações do Open Insurance Brasil (SUSEP)
    para cálculo de elegibilidade militar (Lei 13.954/19), cotação em tempo real
    e submissão de propostas eletrônicas.
  version: 1.0.0
  contact:
    name: Suporte Técnico ECOSEG / Cyborg
    email: api@cyborgintelligence.com
servers:
  - url: https://api.cyborgintelligence.com/v1
    description: Gateway de Produção Oficial
  - url: https://sandbox.cyborgintelligence.com/v1
    description: Ambiente de Homologação / Teste

security:
  - BearerAuth: []
  - LicenseId: []

paths:
  /quotes/realtime:
    post:
      summary: Executa Cotação em Tempo Real com Conectores Homologados SUSEP
      operationId: executeRealtimeQuote
      tags:
        - Cotações & Conectores
      requestBody:
        required: true
        content:
          application/json:
            schema:
              $ref: "#/components/schemas/RealtimeQuoteRequest"
      responses:
        "200":
          description: Cotação calculada e tarifada oficialmente pela seguradora
          content:
            application/json:
              schema:
                $ref: "#/components/schemas/RealtimeQuoteResponse"
        "401":
          $ref: "#/components/responses/UnauthorizedError"
        "422":
          description: Militar fora da faixa de subscrição ou produto incompatível

  /proposals/submit:
    post:
      summary: Emite e Transmite Proposta Oficial com Assinatura Eletrônica e DPS
      operationId: submitProposal
      tags:
        - Emissão de Apólices
      requestBody:
        required: true
        content:
          application/json:
            schema:
              $ref: "#/components/schemas/ProposalSubmissionRequest"
      responses:
        "201":
          description: Proposta aceita e protocolo de apólice SUSEP gerado com sucesso
          content:
            application/json:
              schema:
                $ref: "#/components/schemas/ProposalSubmissionResponse"

  /adherence/evaluate:
    post:
      summary: Avalia Aderência Jurídica Determinística sobre a Família Militar
      operationId: evaluateAdherence
      tags:
        - Inteligência Atuarial & STF
      requestBody:
        required: true
        content:
          application/json:
            schema:
              $ref: "#/components/schemas/AdherenceEvaluationRequest"
      responses:
        "200":
          description: Diagnóstico de lacunas da Lei 13.954 e soluções recomendadas

components:
  securitySchemes:
    BearerAuth:
      type: http
      scheme: bearer
      bearerFormat: CYB-TOKEN
      description: Token de API emitido na Licença B2B (ex. cyb_live_...)
    LicenseId:
      type: apiKey
      in: header
      name: X-Cyborg-License
      description: ID da Licença da Corretora (ex. LIC-CYB-2026-ECOSEG-001)

  schemas:
    RealtimeQuoteRequest:
      type: object
      required:
        - militaryBranch
        - rankCategory
        - insuredAge
        - requestedCapital
      properties:
        militaryBranch:
          type: string
          enum: [FAB, EXERCITO, MARINHA]
          example: FAB
        rankCategory:
          type: string
          example: Suboficial Taifeiro
        insuredAge:
          type: integer
          example: 48
        requestedCapital:
          type: number
          example: 650000.00
        preferredInsurers:
          type: array
          items:
            type: string
            enum: [icatu, mag, gboex, all]
          example: [all]

    RealtimeQuoteResponse:
      type: object
      properties:
        quoteProtocol:
          type: string
          example: QUOTE-ICATU-2026-X8921
        insurerName:
          type: string
          example: Icatu Seguros S/A
        susepProcessNumber:
          type: string
          example: 15414.900821/2019-11
        pricing:
          type: object
          properties:
            netMonthlyPremium:
              type: number
              example: 174.45
            iofAmount:
              type: number
              example: 0.66
            grossMonthlyPremium:
              type: number
              example: 175.11
        validUntil:
          type: string
          format: date-time
          example: 2026-11-20T23:59:59Z
        digitalSignatureHash:
          type: string
          example: sha256:d8a9f24b81c2e6f47701bc9390ea00a12f5349db82a871542fbe5c8c6340f1a9

    ProposalSubmissionRequest:
      type: object
      required:
        - quoteProtocol
        - cpf
        - paymentMethod
        - dpsAnswers
      properties:
        quoteProtocol:
          type: string
        cpf:
          type: string
          example: "01234567890"
        paymentMethod:
          type: string
          enum: [folha_pagamento_cta, debito_conta, cartao]
          example: folha_pagamento_cta
        dpsAnswers:
          type: object
          description: Respostas à Declaração Pessoal de Saúde simplificada

    ProposalSubmissionResponse:
      type: object
      properties:
        success:
          type: boolean
          example: true
        proposalNumber:
          type: string
          example: PROP-CTA-2026-98124
        policyStatus:
          type: string
          example: pre_aprovada_com_carimbo_susep
        firstPremiumDueDate:
          type: string
          format: date
          example: "2026-11-05"
        auditHash:
          type: string
          example: sha256:7f9b8c2d1e0a4f5b6c8d7e9f0a1b2c3d

  responses:
    UnauthorizedError:
      description: Token Bearer ausente ou inválido
      content:
        application/json:
          schema:
            type: object
            properties:
              errorCode:
                type: string
                example: UNAUTHORIZED_LICENSE
              message:
                type: string
                example: Credencial da Cyborg Intelligence inválida ou suspensa.
```

---

## 7. Próximos Passos Recomendados para a ECOSEG

1. **Utilizar o Repositório Oficial do Open Insurance Brasil** (`github.com/br-openinsurance/areadesenvolvedor`) para extrair os schemas JSON oficiais de `/quote-person` e `/products-services/v1/person`.
2. **Cadastrar a Corretora no Portal de Parcerias das Seguradoras (Icatu Corretor, MAG Venda Digital, GBOEX)** para obtenção de credenciais de homologação mTLS / API Key de submissão direta.
3. **Manter o Workspace Cyborg (Aba 6 e Aba 7)** como o _Frontend de Alta Fidelidade_ para o consultor João Brito operar presencialmente no CTA-RJ, garantindo que o fechamento ocorra durante ou logo após a palestra.
