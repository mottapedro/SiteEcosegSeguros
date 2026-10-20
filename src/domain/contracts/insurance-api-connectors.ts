/**
 * Contrato de Integração: Conectores de APIs de Seguradoras em Tempo Real
 * Padrão Open Insurance Brasil (SUSEP) & APIs Proprietárias (Icatu, MAG, GBOEX)
 * Em conformidade com ADR 0008.
 */

export type InsurerId = "icatu" | "mag" | "gboex" | "opin_brasil";

export type QuoteStatus = "valida" | "expirada" | "reprovada_subscricao" | "pendente_dps";

export interface InsurerConnectorConfig {
  id: InsurerId;
  name: string;
  shortName: string;
  brandColor: string;
  susepCode: string;
  apiVersion: string;
  authMethod: "OAuth2_mTLS" | "Bearer_Token" | "HMAC_SHA256" | "OpenID_Connect_OPIN";
  endpointBase: string;
  environment: "sandbox_homologacao" | "producao";
  status: "online" | "degraded" | "maintenance" | "offline";
  avgLatencyMs: number;
  uptimeMonthly: number;
  maxInsuredCapital: number;
  supportedProducts: string[];
  features: {
    realtimeQuotation: boolean;
    digitalHealthDeclaration: boolean;
    automaticPolicyIssuance: boolean;
    militarySpecialOccupationUnderwriting: boolean;
    guaranteedPriceDays: number;
  };
}

export interface RealtimeQuoteRequest {
  profileId: string;
  militaryRank: string;
  militaryBranch: "FAB" | "EXERCITO" | "MARINHA" | "FORCAS_AUXILIARES";
  militaryStatus: "ativa" | "reserva" | "reformado" | "pensionista";
  age: number;
  gender: "M" | "F";
  grossIncome: number;
  requestedCoverage: {
    productId: string;
    productName: string;
    insurerId: InsurerId;
    insuredCapital: number;
    withSeriousIllnesses?: boolean;
    withAccidentalDisability?: boolean;
    withDIT?: boolean; // Diária por Incapacidade Temporária
    withFuneralAssistance?: boolean;
  };
}

export interface RealtimeQuoteResponse {
  quoteProtocol: string; // Ex: "ICATU-COT-2026-99412-MIL"
  insurerId: InsurerId;
  insurerName: string;
  susepProcessNumber: string;
  createdAt: string;
  validUntil: string;
  validityDays: number;
  status: QuoteStatus;

  // Detalhamento Atuarial e de Prêmio
  actuarialDetails: {
    biometricTable: string; // Ex: "BR-EMS 2021 Sb / Icatu Atuarial-V3"
    interestRateAnnual: number; // Ex: 0.02 (2% a.a.)
    inflationIndex: "IPCA" | "IGP-M";
    militaryRiskFactor: number; // Ex: 1.05
    calculatedAge: number;
  };

  pricing: {
    netMonthlyPremium: number; // Prêmio líquido mensal
    taxesIOFMonthly: number; // IOF (0,38% seguro de vida)
    grossMonthlyPremium: number; // Prêmio total cobrado
    firstYearAnnualPremium: number;
    projectedAccumulatedReserve10Years: number; // Projeção de reserva aos 10 anos
    projectedAccumulatedReserve20Years: number; // Projeção aos 20 anos
    cashValueSurrenderAvailableMonth: number; // Ex: 25º mês
  };

  coverageSummary: {
    coverageName: string;
    capital: number;
    monthlyPrice: number;
  }[];

  securityVerification: {
    apiLatencyMs: number;
    digitalSignatureHash: string; // SHA-256 da cotação emitida
    serverTimestamp: string;
    certificateIssuer: string;
  };

  underwritingNotes: {
    dpsType: "simplificada" | "completa" | "isento";
    maxAgeAdmission: number;
    gracePeriodSinister: string;
    gracePeriodSurrender: string;
    directInheritanceBenefit: boolean; // Art. 794 CC (livre de inventário)
  };
}

export interface InsurerHealthCheck {
  insurerId: InsurerId;
  name: string;
  status: "online" | "degraded" | "maintenance" | "offline";
  latencyMs: number;
  lastCheckedAt: string;
  activeProposalsCount: number;
}
