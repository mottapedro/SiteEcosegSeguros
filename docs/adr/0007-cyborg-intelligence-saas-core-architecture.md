# ADR 0007 — Cyborg Intelligence: Arquitetura do Núcleo SaaS B2B Privado

**Status:** Aceito — Arquitetura de Plataforma Privada  
**Categoria:** Arquitetura de Software / SaaS B2B / Motor Especialista  
**Responsáveis:** Cyborg Tecnologia (Propriedade Intelectual & Engenharia) e ECOSEG (Cliente Piloto & Operação Consultiva)  
**Data:** 2026-10-19  
**Referência Cruzada:** ADR 0005 (Seções 3.2, 4.2 e 5) e ADR 0006 (Catálogo de Soluções)

---

## 1. Contexto & Propósito da Plataforma

A Cyborg Intelligence é a plataforma SaaS B2B proprietária da **Cyborg Tecnologia**, projetada para digitalizar, padronizar e governar consultorias financeiras, patrimoniais e de seguros de alta complexidade.

O cliente fundador e ambiente de validação é a **ECOSEG**, operando no Clube dos Taifeiros da Aeronáutica (CTA) no Rio de Janeiro com famílias militares, pensionistas e inativos afetados pela **Lei nº 13.954/2019**.

A plataforma resolve a lacuna de conformidade e precisão técnica das corretoras tradicionais:

- Elimina a venda empurrada de produtos por comissão;
- Substitui palpites por um **motor determinístico de aderência** fundamentado na legislação oficial;
- Protege a privacidade de dados sensíveis (LGPD);
- Garante a propriedade intelectual dos algoritmos e dados de inteligência da Cyborg Tecnologia de forma estritamente isolada do site público.

---

## 2. Princípios Arquiteturais Fundamentais

1. **Separação Estrita de Domínio (Airgap Lógico):**
   - O repositório público `SiteEcosegSeguros` contém apenas a vitrine institucional, a página do evento `/palestra/protecao-familia-militar` e captura preliminar de interesse (baixa sensibilidade).
   - O SaaS Cyborg Intelligence processa diagnósticos profundos, históricos de contracheque, regras de aderência e relatórios confidenciais.

2. **Motor Determinístico vs. Inteligência Artificial Não-Determinística:**
   - Para cálculo de direitos previdenciários e elegibilidade de seguros, **a alucinação de LLMs é inaceitável**.
   - As recomendações são calculadas por um **Rule Engine determinístico e versionado**, com rastreabilidade formal a cada artigo de lei e registro SUSEP.
   - Modelos de linguagem atuam apenas como assistentes de redação e sintaxe, nunca como juízes de elegibilidade.

3. **Arquitetura Multi-Tenant & RBAC Estrito:**
   - Suporte a múltiplas organizações (ex.: ECOSEG matriz, escritórios regionais, futuras corretoras licenciadas).
   - Perfis de acesso:
     - `superadmin_cyborg`: Gestão da plataforma, versionamento de leis e catálogo geral.
     - `broker_admin`: Gestão da corretora, consultores e relatórios de conversão.
     - `field_consultant`: Consultor em campo (ex.: João Brito) que conduz diagnósticos e emite pareceres.
     - `auditor`: Acesso read-only para auditoria de compliance e LGPD.

---

## 3. Modelo de Dados do Núcleo do SaaS (PostgreSQL / Relacional)

A modelagem segue a tipagem expressa em `src/domain/cyborg-platform/schema.ts`:

```text
┌─────────────────┐       ┌─────────────────┐
│  Organization   │◀──────│   Consultant    │
└────────┬────────┘       └────────┬────────┘
         │                         │
         ▼                         ▼
┌─────────────────┐       ┌─────────────────┐
│ AudienceProfile │◀──────│  Consultation   │
└─────────────────┘       └────────┬────────┘
                                   │
                                   ▼
                          ┌─────────────────┐
                          │ AdherenceResult │
                          └────────┬────────┘
                                   │
                                   ▼
                          ┌─────────────────┐
                          │    LegalRule    │ (Versão Homologada)
                          └─────────────────┘
```

---

## 4. O Motor Determinístico de Aderência (`AdherenceEngine`)

O motor recebe o perfil do titular e processa a matriz de lacunas legais:

```text
Entrada: Perfil Militar (Patente, Força, Data de Ingresso, Dependentes, Opção 1,5%)
   │
   ├─► Regra MIL-PEN-001 (Art. 50 Lei 6880 c/c Lei 3765)
   │     Se não possui dedução de 1,5%: Lacuna Extinção de Pensão Filhas Maiores (100% de perda)
   │     ➔ Mapeia: Icatu Equilíbrio (Whole Life) + GBOEX Força Ativa Resgatável
   │
   ├─► Regra MIL-REM-001 (Art. 3º-A Lei 3765 - Lei 13.954)
   │     Se Reserva / Reforma / Pensionista: Lacuna Confisco 10,5%
   │     ➔ Mapeia: Icatu Previdência c/ Compra de Renda Vitalícia Reversível
   │
   ├─► Regra PAT-INV-001 (Inventário e ITCMD)
   │     Se possui patrimônio imobiliário/financeiro sem planejamento sucessório
   │     ➔ Mapeia: Icatu Horizonte (Vida Resgatável Nivelado)
   │
   └─► Regra MAG-LAR-001 (Vulnerabilidade 3ª Idade)
         Se titular ou dependente residente > 60 anos
         ➔ Mapeia: MAG Master Acidentes Domiciliares c/ Check-Up Lar
```

---

## 5. Contrato de Integração API (Superfície Pública ➔ Plataforma Privada)

O site público envia os interessados da palestra através do endpoint governado:

```http
POST /api/v1/leads/ingest
Authorization: Bearer <CYBORG_API_TOKEN>
Content-Type: application/json

{
  "leadSource": "palestra_cta_2026",
  "fullName": "Tenente João Silva",
  "phone": "(21) 98765-4321",
  "email": "joao.silva@exemplo.mil.br",
  "militaryBranch": "FAB",
  "rankCategory": "Tenente",
  "militaryStatus": "reserva",
  "mainConcern": "pensao_filhas",
  "lgpdConsent": {
    "accepted": true,
    "timestamp": "2026-10-19T10:30:00Z",
    "legalBasis": "Art. 7, V e IX da Lei 13.709/2018",
    "version": "1.0.0"
  }
}
```

---

## 6. Governança e Rastreabilidade

- Qualquer alteração em alíquotas (ex.: reversão judicial de confisco ou nova tese do STF) gera uma nova versão de `LegalRule` sem remover o histórico dos diagnósticos passados.
- Cada laudo emitido possui um `hash` de integridade para resguardar a responsabilidade técnica do consultor e da corretora perante o militar e a SUSEP.

---

_Cyborg Tecnologia — Propriedade Intelectual Registrada 2026._
