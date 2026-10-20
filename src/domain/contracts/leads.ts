/**
 * Contrato Neutro de Leads & Diagnóstico Consultivo ECOSEG
 * Resolução dos Problemas 6 (LGPD) e 7 (Desacoplamento Arquitetural).
 * Interface em TypeScript puro para portabilidade entre o Site Público Next.js e o SaaS Cyborg.
 */

export type LeadInterest =
  "protecao-militar" | "blindagem-patrimonial" | "responsabilidade-civil" | "outro";

export interface LeadPublicoContract {
  name: string;
  email: string;
  phone: string;
  company?: string;
  interest: LeadInterest;
  message: string;
  lgpdConsent: boolean;
  origem?: string;
  timestamp?: string;
  website?: string; // Honeypot anti-spam
}

export const LEAD_INTEREST_OPTIONS = [
  {
    value: "protecao-militar",
    label: "Proteção da Família Militar (Lei nº 13.954/2019)",
  },
  {
    value: "blindagem-patrimonial",
    label: "Blindagem Patrimonial & Sucessória",
  },
  {
    value: "responsabilidade-civil",
    label: "Responsabilidade Civil Profissional",
  },
  {
    value: "outro",
    label: "Outra Demanda Consultiva",
  },
] as const;
