# Especificação do SaaS B2B Privado — Cyborg Intelligence

**Versão:** 1.4.2  
**Propriedade Intelectual:** Cyborg Tecnologia (Todos os direitos reservados)  
**Cliente Fundador:** ECOSEG Seguros & Inteligência Patrimonial  
**Ambiente Piloto:** Clube dos Taifeiros da Aeronáutica (CTA) — Rio de Janeiro, RJ  
**Data:** 2026-10-19  
**Referência:** ADR 0005, ADR 0006, ADR 0007, ADR 0008 e ADR 0009

---

## 1. Visão Geral

A **Cyborg Intelligence** é uma plataforma fechada (SaaS B2B) voltada a corretoras consultivas de alta autoridade que atendem regimes especiais (como previdência e pensões militares, planejamento sucessório e blindagem contra inventário).

Enquanto o site da ECOSEG (`SiteEcosegSeguros`) atua como vitrine pública, canal da palestra e captura inicial de interesse com consentimento LGPD, a plataforma privada é o cérebro determinístico onde os laudos são gerados, auditados e entregues aos clientes pelo consultor **João Brito**.

---

## 2. Pilares de Funcionalidade da V1

### 2.1 Motor Determinístico de Aderência

- **Zero Alucinação:** Cálculos de elegibilidade baseados em regras rígidas codificadas e versionadas, mapeando as lacunas trazidas pela Lei nº 13.954/2019 e Lei nº 6.880/1980.
- **Matriz de Produtos Homologados:**
  1. `Icatu Equilíbrio (Whole Life)` — Processo SUSEP 154149010412014-34: Reposição da pensão vitalícia de filhas solteiras com reserva de capital.
  2. `GBOEX Força Ativa Resgatável & Tradicional` — Processos SUSEP 15414.900658/2017-85 e 15414.002185/2008-68: Pecúlio militar com taxa reduzida para praças e taifeiros.
  3. `Icatu Horizonte (Vida Resgatável Nivelado)` — Processo SUSEP 15414.611834/2025-17: Quitação acelerada (5 a 15 anos) com cobertura de 24 doenças graves e liquidez anti-inventário.
  4. `Icatu Previdência c/ Compra de Renda Vitalícia Reversível`: Compensação do confisco de 10,5% sofrido na reserva e pensão.
  5. `MAG Master Acidentes Domiciliares c/ Check-Up Lar`: Proteção de idosos e pensionistas contra quedas, com instalação gratuita de barras de segurança e piso antiderrapante.

### 2.2 Prontuário Consultivo Confidencial (Dossiês do CTA)

- Armazenamento em nuvem privada com criptografia de ponta a ponta.
- Registro de cada reunião presencial no CTA, notas confidenciais e objeções contornadas com o apoio da fundamentação jurídica (ex.: STF Tema 1175).

### 2.3 Base Jurídica Versionada

- Cada norma possui status (`HOMOLOGADO`, `EM_REVISAO`, `SUSPENSO`), link direto para a fonte oficial do Planalto/STF e histórico de vigência.
- Se uma decisão judicial alterar alíquotas ou regras de transição, a regra é atualizada de forma auditável sem perda do histórico dos diagnósticos passados.

### 2.4 API de Ingestão Desacoplada

- Endpoint seguro `POST /v1/leads/ingest` que recebe os formulários de interesse da palestra e do site público com rastreabilidade de consentimento LGPD (Art. 7º, V e IX da Lei nº 13.709/2018).

### 2.5 Conectores de APIs de Seguradoras em Tempo Real (ADR 0008)

- Cotações dinâmicas integradas via Open Insurance Brasil (SUSEP) e APIs proprietárias da Icatu, MAG e GBOEX com assinatura digital SHA-256 e protocolos atuariais oficiais.

### 2.6 Licenciamento B2B & Credenciais de Acesso API (ADR 0009)

- Certificação da licença corporativa (`LIC-CYB-2026-ECOSEG-001`) para o cliente fundador ECOSEG.
- Gestão de credenciais com tokens com prefixo semântico (`cyb_live_...` e `cyb_test_...`), rotação zero-downtime, assinatura HMAC SHA-256 para webhooks e quotas atuaricadas (leads/cotações/minuto).

---

_Cyborg Tecnologia — 2026._
