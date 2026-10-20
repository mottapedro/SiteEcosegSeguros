/**
 * ECOSEG Intelligence & Cyborg Platform — Fixtures Sintéticas Oficiais
 * Governança de Homologação, Testes Locais e Vercel Preview (OP-002)
 *
 * Regra: Todos os dados neste diretório são rigorosamente sintéticos e fictícios.
 * Nenhum dado pessoal real, CPF real ou segredo de produção é permitido.
 */

import syntheticProfiles from "./synthetic-military-profiles.json";
import syntheticQuotes from "./synthetic-insurance-quotes.json";
import syntheticLeads from "./synthetic-leads-ingestion.json";

export interface SyntheticMilitaryProfile {
  id: string;
  fullName: string;
  phone: string;
  email: string;
  militaryBranch: "FAB" | "EXERCITO" | "MARINHA";
  rankCategory: string;
  militaryStatus: "ativa" | "reserva" | "reformado" | "pensionista";
  age: number;
  grossIncome: number;
  hasSingleDaughterOver24: boolean;
  daughterAge: number | null;
  contributesExtraOnePointFive: boolean;
  hasSpouse: boolean;
  spouseAge: number | null;
  numberOfDependents: number;
  hasElderlyInHousehold: boolean;
  mainConcern: string;
  legalExposure: {
    stfTheme1175Bound: boolean;
    lei13954Loss: string;
    funsaImpact: string;
  };
  recommendedCapital: number;
}

export interface SyntheticInsuranceQuote {
  fixtureId: string;
  insurerId: "icatu" | "mag" | "gboex";
  insurerName: string;
  cnpj: string;
  quoteProtocol: string;
  susepProcessNumber: string;
  productName: string;
  profileRef: string;
  insuredAge: number;
  capitalInsured: number;
  pricing: {
    netMonthlyPremium: number;
    iofRate: number;
    iofAmount: number;
    grossMonthlyPremium: number;
    annualizedPremium: number;
    currency: string;
  };
  coverages: Array<{
    code: string;
    description: string;
    capital: number;
    isMandatory: boolean;
    isDirectInheritanceExempt: boolean;
  }>;
  underwritingNotes: {
    dpsType: string;
    maxAdmissionAge: number;
    gracePeriodNaturalDeathDays: number;
    gracePeriodAccidentDays: number;
    article794CivilCodeShielded: boolean;
  };
  security: {
    environment: "sandbox_local";
    digitalSignatureHash: string;
    certificateAuthority: string;
    serverTimestamp: string;
    validUntil: string;
  };
}

export const SYNTHETIC_MILITARY_PROFILES: SyntheticMilitaryProfile[] =
  syntheticProfiles as SyntheticMilitaryProfile[];
export const SYNTHETIC_INSURANCE_QUOTES: SyntheticInsuranceQuote[] =
  syntheticQuotes as SyntheticInsuranceQuote[];
export const SYNTHETIC_LEADS_CASES = syntheticLeads;

/**
 * Auxiliar para obter cotação sintética por seguradora
 */
export function getSyntheticQuoteByInsurer(
  insurerId: "icatu" | "mag" | "gboex"
): SyntheticInsuranceQuote | undefined {
  return SYNTHETIC_INSURANCE_QUOTES.find((q) => q.insurerId === insurerId);
}

/**
 * Auxiliar para obter perfil sintético por ID
 */
export function getSyntheticProfileById(
  id: string
): SyntheticMilitaryProfile | undefined {
  return SYNTHETIC_MILITARY_PROFILES.find((p) => p.id === id);
}
