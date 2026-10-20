/**
 * CYBORG INTELLIGENCE — Plataforma Privada SaaS B2B
 * Contrato de Licenciamento & Credenciais de Acesso API
 * Governança de Autenticação mTLS, Bearer Token, HMAC e Quotas B2B
 */

export type LicenseStatus = "active" | "suspended" | "expired" | "grace_period";
export type LicensePlan = "enterprise_pilot" | "enterprise_growth" | "standard_broker";
export type ApiKeyEnvironment = "production" | "sandbox";
export type ApiKeyStatus = "active" | "revoked" | "expired";

export type ApiPermissionScope =
  | "leads:ingest" // Ingestão segura de leads (SiteEcoseg -> Cyborg)
  | "quotes:realtime" // Cotação em tempo real com conectores de seguradoras
  | "adherence:calculate" // Execução do motor determinístico de regras
  | "dossier:issue" // Emissão de laudos e pareceres oficiais PDF/JSON
  | "audit:export" // Exportação de trilha de auditoria LGPD
  | "consultant:read" // Leitura de prontuários de consultores autorizados
  | "rules:inspect"; // Inspeção da matriz de regras jurídicas e STF

export interface CyborgLicenseQuota {
  monthlyLeadsLimit: number;
  monthlyQuotesLimit: number;
  consumedLeadsThisMonth: number;
  consumedQuotesThisMonth: number;
  rateLimitPerMinute: number;
  concurrencyLimit: number;
  resetDate: string; // ISO date
}

export interface CyborgApiKey {
  id: string;
  label: string;
  prefix: "cyb_live_" | "cyb_test_";
  maskedKey: string;
  rawKey: string;
  environment: ApiKeyEnvironment;
  scopes: ApiPermissionScope[];
  status: ApiKeyStatus;
  createdAt: string;
  lastUsedAt?: string;
  expiresAt?: string;
}

export interface CyborgLicense {
  licenseId: string; // Ex: LIC-CYB-2026-ECOSEG-001
  organizationId: string; // Ex: org-ecoseg-01
  organizationName: string; // Ex: ECOSEG Seguros & Inteligência Patrimonial
  cnpj: string; // Ex: 12.345.678/0001-90
  pilotBase: string; // Ex: CTA · Clube dos Taifeiros da Aeronáutica (RJ)
  plan: LicensePlan;
  status: LicenseStatus;
  issuedAt: string;
  validUntil: string;
  digitalSignatureHash: string; // Assinatura digital ICP-Cyborg SHA-256
  issuerAuthority: string; // Ex: CYBORG-TECH-B2B-CA-2026
  slaGuaranteedUptime: number; // Ex: 99.85%
  allowedOrigins: string[]; // Domínios autorizados para CORS e Webhook
  webhookSecret: string; // HMAC Secret para validação de webhooks
  quotas: CyborgLicenseQuota;
  apiKeys: CyborgApiKey[];
  authorizedConsultantsCount: number;
  maxConsultantsAllowed: number;
}

export interface ValidateCredentialRequest {
  token: string;
  intendedScope?: ApiPermissionScope;
  origin?: string;
}

export interface ValidateCredentialResponse {
  valid: boolean;
  authenticated: boolean;
  licenseId: string;
  organizationId: string;
  organizationName: string;
  environment: ApiKeyEnvironment;
  plan: LicensePlan;
  status: LicenseStatus;
  keyLabel: string;
  scopes: ApiPermissionScope[];
  rateLimit: {
    limitPerMinute: number;
    remainingThisMinute: number;
    resetInSeconds: number;
  };
  quotas: {
    consumedQuotesThisMonth: number;
    monthlyQuotesLimit: number;
    remainingQuotesThisMonth: number;
  };
  serverTimestamp: string;
  latencyMs: number;
  errorMessage?: string;
}

export interface RotateApiKeyRequest {
  keyId: string;
  environment: ApiKeyEnvironment;
  label: string;
  scopes: ApiPermissionScope[];
}

export interface LeadIngestionPayload {
  leadSource: string;
  fullName: string;
  phone: string;
  email?: string;
  militaryBranch: "FAB" | "EXERCITO" | "MARINHA" | "FORCAS_AUXILIARES" | string;
  rankCategory: string;
  militaryStatus?: "ativa" | "reserva" | "reformado" | "pensionista" | string;
  entryYear?: number;
  mainConcern: string;
  grossIncomeEstimated?: number;
  monthlyGrossIncome?: number;
  notes?: string;
  lgpdConsent?: {
    accepted: boolean;
    timestamp: string;
    legalBasis: string;
    policyVersion: string;
  };
}

export interface LeadIngestionResponse {
  success: boolean;
  dossierId: string;
  trackingCode: string;
  queueStatus:
    "enfileirado_para_consultor" | "em_analise_automatica" | "atendimento_agendado";
  assignedConsultant: {
    id: string;
    name: string;
    registrationNumber: string;
    officeLocation: string;
  };
  slaFirstContactHours: number;
  timestamp: string;
  integrityHash: string;
}

/**
 * Licença Oficial Piloto da ECOSEG no CTA (Cyborg Intelligence B2B)
 */
export const DEFAULT_ECOSEG_LICENSE: CyborgLicense = {
  licenseId: "LIC-CYB-2026-ECOSEG-001",
  organizationId: "org-ecoseg-01",
  organizationName: "ECOSEG Seguros & Inteligência Patrimonial",
  cnpj: "34.819.201/0001-44",
  pilotBase: "CTA · Clube dos Taifeiros da Aeronáutica (Rio de Janeiro - RJ)",
  plan: "enterprise_pilot",
  status: "active",
  issuedAt: "2026-01-15T08:00:00Z",
  validUntil: "2027-01-15T23:59:59Z",
  digitalSignatureHash:
    "sha256:d8a9f24b81c2e6f47701bc9390ea00a12f5349db82a871542fbe5c8c6340f1a9",
  issuerAuthority: "CYBORG-SECURITY-INFRASTRUCTURE-CA-2026",
  slaGuaranteedUptime: 99.85,
  allowedOrigins: [
    "http://localhost:3000",
    "http://localhost:3005",
    "https://ecoseg.com.br",
    "https://*.run.app",
  ],
  webhookSecret: "sec_live_hmac_ecoseg_cta_2026_x89a",
  quotas: {
    monthlyLeadsLimit: 25000,
    monthlyQuotesLimit: 50000,
    consumedLeadsThisMonth: 1420,
    consumedQuotesThisMonth: 3894,
    rateLimitPerMinute: 600,
    concurrencyLimit: 25,
    resetDate: "2026-11-01T00:00:00Z",
  },
  apiKeys: [
    {
      id: "key-live-01",
      label: "Produção Oficial — SiteEcoseg & CTA Gateway",
      prefix: "cyb_live_",
      maskedKey: "cyb_live_••••••••••••••••••••••••3a9f",
      rawKey: "cyb_live_9f82d1c7a8b4e6012e8b44917dc983a9f",
      environment: "production",
      scopes: [
        "leads:ingest",
        "quotes:realtime",
        "adherence:calculate",
        "dossier:issue",
        "audit:export",
        "consultant:read",
        "rules:inspect",
      ],
      status: "active",
      createdAt: "2026-01-15T08:00:00Z",
      lastUsedAt: "2026-10-19T21:40:12Z",
    },
    {
      id: "key-test-01",
      label: "Sandbox / Homologação Local (Desenvolvimento)",
      prefix: "cyb_test_",
      maskedKey: "cyb_test_••••••••••••••••••••••••7c41",
      rawKey: "cyb_test_41b9e0f316a7d9025c3f88210eb7c41",
      environment: "sandbox",
      scopes: ["leads:ingest", "quotes:realtime", "adherence:calculate"],
      status: "active",
      createdAt: "2026-02-01T10:30:00Z",
      lastUsedAt: "2026-10-19T22:15:00Z",
    },
  ],
  authorizedConsultantsCount: 3,
  maxConsultantsAllowed: 10,
};

export interface CreateApiKeyRequest {
  label: string;
  environment: ApiKeyEnvironment;
  scopes: ApiPermissionScope[];
}

export interface CyborgLicenseSnapshotKey {
  id: string;
  label: string;
  environment: ApiKeyEnvironment;
  status: ApiKeyStatus;
  expiresAt: string;
  tokenPreview: string;
  scopes: ApiPermissionScope[];
}

export interface CyborgLicenseSnapshotQuota {
  key: string;
  consumed: number;
  limit: number;
  unit: string;
  resetAt: string;
}

export interface CyborgLicenseSnapshot {
  licenseId: string;
  organizationName: string;
  organizationTaxId: string;
  operationalBase: string;
  issuedAt: string;
  expiresAt: string;
  certificateAuthority: string;
  certificateHash: string;
  guaranteedSla: string;
  quotas: CyborgLicenseSnapshotQuota[];
  scopes: ApiPermissionScope[];
  apiKeys: CyborgLicenseSnapshotKey[];
  webhookSecretPreview: string;
  webhookSignatureHeader: string;
}

export interface CredentialValidationResult {
  valid: boolean;
  message: string;
  latencyMs: number;
  tokenPreview: string;
}

export interface RotateApiKeyResult {
  key: CyborgLicenseSnapshotKey;
  rawToken: string;
}

export interface IngestLeadResult {
  dossierId: string;
  auditProtocol: string;
}
