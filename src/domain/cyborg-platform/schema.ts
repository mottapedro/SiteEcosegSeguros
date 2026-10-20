/**
 * CYBORG INTELLIGENCE — Plataforma Privada SaaS B2B
 * Especificação e Schemas de Banco de Dados (PostgreSQL / Relacional)
 * Baseado no Modelo de Domínio Oficial da ADR 0005 (Seção 5).
 */

// 1. Organizações e Multi-Tenancy
export interface Organization {
  id: string;
  name: string;
  cnpj?: string;
  slug: string; // Ex: 'ecoseg-seguros'
  isFoundingClient: boolean; // ECOSEG é cliente piloto
  plan: "enterprise" | "growth" | "standard";
  status: "active" | "suspended";
  createdAt: string;
}

// 2. Usuários e Consultores (RBAC)
export type UserRole =
  "superadmin_cyborg" | "broker_admin" | "field_consultant" | "auditor";

export interface Consultant {
  id: string;
  organizationId: string;
  name: string; // Ex: 'João Brito'
  email: string;
  phone: string;
  role: UserRole;
  registrationNumber?: string; // Ex: SUSEP ou Matrícula CTA
  active: boolean;
  avatarUrl?: string;
}

// 3. Perfis Atendidos e Dependentes
export interface AudienceProfileEntity {
  id: string;
  organizationId: string;
  consultantId: string;
  fullName: string;
  cpfMasked?: string;
  phone: string;
  email?: string;
  militaryBranch: "FAB" | "EXERCITO" | "MARINHA" | "FORCAS_AUXILIARES";
  rankCategory: string; // 'Taifeiro', 'Suboficial', 'Sargento', 'Capitão', etc.
  militaryStatus: "ativa" | "reserva" | "reformado" | "pensionista";
  entryYear: number;
  grossIncome: number;
  netIncome: number;
  hasDaughterDeduction1_5: boolean; // Optou pelos 1,5% da MP 2.215/2001?
  numberOfDependents: number;
  hasElderlyInHousehold: boolean;
  notes?: string;
  createdAt: string;
}

// 4. Atendimentos & Consultas no CTA-RJ
export type ConsultationStatus =
  | "lead_recebido"
  | "diagnostico_iniciado"
  | "motor_aderencia_executado"
  | "parecer_emitido"
  | "proposta_em_analise"
  | "concluido"
  | "arquivado";

export interface Consultation {
  id: string;
  organizationId: string;
  consultantId: string;
  profileId: string;
  originEvent: string; // Ex: 'Palestra CTA Rio 2026'
  status: ConsultationStatus;
  currentStep: number;
  summaryFindings: string;
  adherenceScoreTotal: number;
  recommendedProductIds: string[];
  objectionsHandled: string[];
  nextStepsAgreed: string;
  scheduledFollowUpDate?: string;
  createdAt: string;
  updatedAt: string;
}

// 5. Motor Determinístico de Aderência (Cyborg Matching Result)
export interface AdherenceResultEntity {
  id: string;
  consultationId: string;
  productId: string;
  productName: string;
  providerName: string;
  score: number; // 0 a 100%
  eligible: boolean;
  gapAddressed: string; // Ex: 'Extinção Pensão Filhas (Lei 13.954)'
  legalBasisCode: string; // Ex: 'MIL-PEN-001'
  explanationText: string;
  suggestedCapital: number;
  estimatedMonthlyCost: number;
  antiInventoryBenefit: string;
  caveatsAndAlerts: string[];
}

// 6. Trilha de Auditoria & Consentimento LGPD
export interface ConsentRecordEntity {
  id: string;
  consultationId?: string;
  profileId: string;
  consentTimestamp: string;
  ipAddress?: string;
  channel: "palestra_qrcode" | "atendimento_presencial_cta" | "site_publico";
  termsVersion: string;
  purpose: string;
  legalBase: string; // Art. 7, V ou IX da Lei 13.709/2018
  status: "active" | "revoked";
}

export interface AuditEventEntity {
  id: string;
  organizationId: string;
  userId: string;
  action:
    | "LEAD_INGEST"
    | "DIAGNOSTIC_COMPLETED"
    | "ADHERENCE_RUN"
    | "DOSSIER_PRINTED"
    | "LEAD_EXPORTED";
  targetResource: string;
  payloadSummary: string;
  timestamp: string;
}

/**
 * Esquema DDL SQL para criação das tabelas no PostgreSQL (Cyborg Intelligence Database)
 */
export const CYBORG_INTELLIGENCE_SQL_DDL = `
-- CYBORG INTELLIGENCE - PLATAFORMA SAAS PRIVADA B2B
-- Schemas de Banco Relacional (PostgreSQL)

CREATE TABLE organizations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) NOT NULL,
    cnpj VARCHAR(20),
    slug VARCHAR(100) UNIQUE NOT NULL,
    is_founding_client BOOLEAN DEFAULT false,
    plan VARCHAR(50) DEFAULT 'enterprise',
    status VARCHAR(50) DEFAULT 'active',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE consultants (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    organization_id UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    phone VARCHAR(50),
    role VARCHAR(50) NOT NULL DEFAULT 'field_consultant',
    registration_number VARCHAR(100),
    active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE audience_profiles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    organization_id UUID NOT NULL REFERENCES organizations(id),
    consultant_id UUID REFERENCES consultants(id),
    full_name VARCHAR(255) NOT NULL,
    phone VARCHAR(50) NOT NULL,
    email VARCHAR(255),
    military_branch VARCHAR(50) NOT NULL, -- FAB, EXERCITO, MARINHA
    rank_category VARCHAR(100) NOT NULL,  -- Taifeiro, Suboficial, Sargento, Oficial
    military_status VARCHAR(50) NOT NULL, -- ativa, reserva, reformado, pensionista
    entry_year INTEGER,
    gross_income NUMERIC(12, 2),
    net_income NUMERIC(12, 2),
    has_daughter_deduction_1_5 BOOLEAN DEFAULT false,
    number_of_dependents INTEGER DEFAULT 0,
    has_elderly_in_household BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE consultations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    organization_id UUID NOT NULL REFERENCES organizations(id),
    consultant_id UUID NOT NULL REFERENCES consultants(id),
    profile_id UUID NOT NULL REFERENCES audience_profiles(id) ON DELETE CASCADE,
    origin_event VARCHAR(150) DEFAULT 'Palestra CTA Rio 2026',
    status VARCHAR(50) DEFAULT 'lead_recebido',
    current_step INTEGER DEFAULT 1,
    summary_findings TEXT,
    adherence_score_total NUMERIC(5, 2),
    next_steps_agreed TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE adherence_results (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    consultation_id UUID NOT NULL REFERENCES consultations(id) ON DELETE CASCADE,
    product_id VARCHAR(100) NOT NULL,
    product_name VARCHAR(255) NOT NULL,
    provider_name VARCHAR(150) NOT NULL,
    score NUMERIC(5, 2) NOT NULL,
    eligible BOOLEAN DEFAULT true,
    gap_addressed VARCHAR(255) NOT NULL,
    legal_basis_code VARCHAR(100),
    explanation_text TEXT NOT NULL,
    suggested_capital NUMERIC(14, 2),
    anti_inventory_benefit TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE consent_records (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    profile_id UUID NOT NULL REFERENCES audience_profiles(id),
    consultation_id UUID REFERENCES consultations(id),
    consent_timestamp TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    channel VARCHAR(100) NOT NULL,
    terms_version VARCHAR(50) NOT NULL,
    purpose TEXT NOT NULL,
    legal_base VARCHAR(100) NOT NULL,
    status VARCHAR(50) DEFAULT 'active'
);

CREATE TABLE audit_events (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    organization_id UUID NOT NULL REFERENCES organizations(id),
    user_id UUID REFERENCES consultants(id),
    action VARCHAR(100) NOT NULL,
    target_resource VARCHAR(255) NOT NULL,
    payload_summary JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Índices de Alta Performance para Fila de Consultoria
CREATE INDEX idx_consultations_org_status ON consultations(organization_id, status);
CREATE INDEX idx_profiles_military ON audience_profiles(military_branch, rank_category, military_status);
CREATE INDEX idx_adherence_consultation ON adherence_results(consultation_id);
`;
