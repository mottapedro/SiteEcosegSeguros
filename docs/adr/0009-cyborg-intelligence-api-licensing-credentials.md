# ADR 0009: Arquitetura de Licenciamento B2B e Credenciais de Acesso API da Cyborg Intelligence

**Status:** Aceito  
**Data:** 2026-10-19  
**Autores:** Equipe de Arquitetura Cyborg & Engenharia ECOSEG  
**Contexto de Negócio:** Operação Piloto no Clube dos Taifeiros da Aeronáutica (CTA-RJ)  
**Documentos Relacionados:** ADR 0005, ADR 0007, ADR 0008, `docs/domain/CYBORG-INTELLIGENCE-SAAS-SPEC.md`

---

## 1. Contexto e Motivação

A **Cyborg Intelligence** é uma plataforma proprietária SaaS B2B de alta criticidade e valor intelectual. Seu motor determinístico de regras atuaricadas e jurídicas (Lei 13.954/2019, MP 2.215/2001, Lei 6.880/1980 e jurisprudência do STF) e os conectores em tempo real de seguradoras (Icatu, MAG, GBOEX e Open Insurance) representam o ativo central da operação.

A **ECOSEG Seguros & Inteligência Patrimonial** atua como cliente fundador e piloto oficial no Clube dos Taifeiros da Aeronáutica (CTA-RJ). Para viabilizar a integração entre o site público (`SiteEcoseg`), o workspace consultivo e futuros clientes móveis ou sistemas legados com segurança corporativa e governança de custos, fazia-se imperativo definir a arquitetura oficial de **Licenciamento B2B e Credenciais de Acesso API**.

---

## 2. Decisão de Arquitetura

### 2.1 Modelo de Licenciamento Corporativo (Cyborg Enterprise License)

Cada organização contratante recebe um certificado de licença corporativa emitido pela autoridade certificadora `CYBORG-SECURITY-INFRASTRUCTURE-CA`, com:

- **`licenseId`**: Identificador canônico (ex.: `LIC-CYB-2026-ECOSEG-001`).
- **`plan`**: Nível de serviço contratado (`enterprise_pilot`, `enterprise_growth`, `standard_broker`).
- **`status`**: Estado operacional (`active`, `suspended`, `grace_period`, `expired`).
- **`validUntil`**: Janela temporal de vigência do contrato.
- **`digitalSignatureHash`**: Hash de integridade criptográfica SHA-256 gerado pelo gateway da Cyborg, garantindo a autenticidade perante auditorias da SUSEP e órgãos reguladores.
- **`quotas`**: Tetos mensais de requisições, concorrência e rate-limits definidos no SLA (ex.: 25.000 leads/mês e 50.000 cotações/mês com 600 req/min).

### 2.2 Padrão de Chaves de API e Prefixo Semântico

As credenciais de API utilizam tokens com prefixos semânticos e entropia de 160 bits (gerados com geradores criptograficamente seguros CSPRNG):

1. **Produção (Live):**
   - Prefixo: `cyb_live_`
   - Exemplo: `cyb_live_9f82d1c7a8b4e6012e8b44917dc983a9f`
   - Escopos concedidos: `leads:ingest`, `quotes:realtime`, `adherence:calculate`, `dossier:issue`, `audit:export`, `consultant:read`, `rules:inspect`.
2. **Homologação / Sandbox:**
   - Prefixo: `cyb_test_`
   - Exemplo: `cyb_test_41b9e0f316a7d9025c3f88210eb7c41`
   - Escopos limitados a testes funcionais e simulação sem impacto em apólices vigentes.

### 2.3 Rotação de Chaves Zero Downtime

O gateway suporta múltiplas chaves simultâneas por licença e mecanismo de rotação segura. Durante a rotação:

- Uma nova chave é gerada imediatamente com os mesmos escopos.
- A chave anterior pode permanecer em estado de transição ou ser revogada sob demanda pelo administrador.

### 2.4 Assinatura de Webhooks (HMAC SHA-256)

Para eventos assíncronos enviados pela Cyborg ao `SiteEcoseg` (ex.: atualização de parecer, liberação de proposta ou mudança em tábuas atuariais), é fornecido um `webhookSecret` (`sec_live_hmac_...`). Toda carga útil é assinada no cabeçalho `X-Cyborg-Signature-256`.

---

## 3. Especificação dos Endpoints do Gateway

| Método | Rota                               | Descrição                                                          | Autenticação Requerida                           |
| ------ | ---------------------------------- | ------------------------------------------------------------------ | ------------------------------------------------ |
| `GET`  | `/api/cyborg/license`              | Retorna metadados da licença, cotas consumidas e chaves mascaradas | Pública da aplicação / Interna                   |
| `POST` | `/api/cyborg/credentials/validate` | Valida credencial de acesso, latência, escopos e rate-limit        | `Bearer <token>` ou payload JSON                 |
| `POST` | `/api/cyborg/credentials/rotate`   | Rotaciona uma chave de API existente gerando novo segredo          | Autenticação de Administrador                    |
| `POST` | `/api/v1/leads/ingest`             | Ingestão autenticada de leads da palestra e site público           | Obrigatório `Authorization: Bearer cyb_live_...` |

---

## 4. Variáveis de Ambiente Governadas

No arquivo `.env.example` e nos ambientes de execução:

```env
CYBORG_LICENSE_ID="LIC-CYB-2026-ECOSEG-001"
CYBORG_API_TOKEN="cyb_live_9f82d1c7a8b4e6012e8b44917dc983a9f"
CYBORG_HMAC_SECRET="sec_live_hmac_ecoseg_cta_2026_x89a"
```

---

## 5. Consequências e Benefícios

1. **Blindagem de Ativo Intelectual:** Nenhuma requisição de ingestão de leads ou cotação em tempo real trafega sem a validação da credencial da licença contratada.
2. **Rastreabilidade perante SUSEP e Forças Armadas:** O hash ICP-Cyborg assina digitalmente a licença da ECOSEG como operadora autorizada no CTA.
3. **Auditabilidade LGPD:** Todo lead recebido via API é protocolado com o ID da licença, código de rastreamento `CYB-CTA-2026-XXXX` e atribuição imediata ao consultor responsável (João Brito).
4. **Pronto para Escalar:** O mesmo modelo permite que a Cyborg licencie a plataforma para outras corretoras especializadas mantendo o isolamento multi-tenant.
