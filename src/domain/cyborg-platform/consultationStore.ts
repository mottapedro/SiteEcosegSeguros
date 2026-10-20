import { AudienceProfileEntity, Consultation, Organization, Consultant } from "./schema";
import { evaluateCyborgAdherence, AdherenceEngineResult } from "./adherenceEngine";

export const ORG_ECOSEG_PILOT: Organization = {
  id: "org-ecoseg-01",
  name: "ECOSEG Consultoria & Inteligência Patrimonial",
  slug: "ecoseg-cta-rj",
  isFoundingClient: true,
  plan: "enterprise",
  status: "active",
  createdAt: "2026-09-16T10:00:00Z",
};

export const CONSULTANT_JOAO_BRITO: Consultant = {
  id: "consultant-joao-01",
  organizationId: "org-ecoseg-01",
  name: "João Brito",
  email: "joao.brito@ecoseg.com.br",
  phone: "(21) 99469-3673",
  role: "field_consultant",
  registrationNumber: "CTA-CONSULT-042",
  active: true,
};

export interface ActiveConsultationDossier {
  profile: AudienceProfileEntity;
  consultation: Consultation;
  evaluation: AdherenceEngineResult;
}

export const SEEDED_DOSSIERS: ActiveConsultationDossier[] = [
  {
    profile: {
      id: "prof-cta-001",
      organizationId: "org-ecoseg-01",
      consultantId: "consultant-joao-01",
      fullName: "Suboficial R1 Carlos Alberto Menezes",
      phone: "(21) 98452-1190",
      email: "carlos.menezes@cta.org.br",
      militaryBranch: "FAB",
      rankCategory: "Suboficial Taifeiro",
      militaryStatus: "reserva",
      entryYear: 1988,
      grossIncome: 11400,
      netIncome: 8650,
      hasDaughterDeduction1_5: false, // NÃO recolhe 1,5%!
      numberOfDependents: 2,
      hasElderlyInHousehold: true,
      notes:
        "Participou da palestra do João no auditório do CTA. Muito preocupado com a filha de 26 anos que cursa faculdade e ficará desamparada se ele falecer.",
      createdAt: "2026-10-18T16:20:00Z",
    },
    consultation: {
      id: "cons-cta-001",
      organizationId: "org-ecoseg-01",
      consultantId: "consultant-joao-01",
      profileId: "prof-cta-001",
      originEvent: "Palestra Lei 13.954 no CTA-RJ",
      status: "motor_aderencia_executado",
      currentStep: 3,
      summaryFindings:
        "Filha solteira perde 100% da pensão estatal. Confisco de 10,5% ativo no contracheque. Solução prioritária: Icatu Equilíbrio Whole Life.",
      adherenceScoreTotal: 98,
      recommendedProductIds: [
        "icatu-equilibrio-whole-life",
        "gboex-forca-ativa-resgatavel",
        "icatu-horizonte-vida-resgatavel",
      ],
      objectionsHandled: [
        "Alegava que ia recorrer judicialmente via associação militar; orientado sobre STF Tema 1175.",
      ],
      nextStepsAgreed:
        "Apresentar cotação formal da Icatu de R$ 500k e pacote GBOEX na sala consultiva do CTA na terça-feira às 14h.",
      scheduledFollowUpDate: "2026-10-21T14:00:00Z",
      createdAt: "2026-10-18T16:25:00Z",
      updatedAt: "2026-10-19T09:15:00Z",
    },
    evaluation: evaluateCyborgAdherence({
      id: "prof-cta-001",
      organizationId: "org-ecoseg-01",
      consultantId: "consultant-joao-01",
      fullName: "Suboficial R1 Carlos Alberto Menezes",
      phone: "(21) 98452-1190",
      email: "carlos.menezes@cta.org.br",
      militaryBranch: "FAB",
      rankCategory: "Suboficial Taifeiro",
      militaryStatus: "reserva",
      entryYear: 1988,
      grossIncome: 11400,
      netIncome: 8650,
      hasDaughterDeduction1_5: false,
      numberOfDependents: 2,
      hasElderlyInHousehold: true,
      createdAt: "2026-10-18T16:20:00Z",
    }),
  },
  {
    profile: {
      id: "prof-cta-002",
      organizationId: "org-ecoseg-01",
      consultantId: "consultant-joao-01",
      fullName: "D. Elza Soares da Silva (Pensionista FAB)",
      phone: "(21) 97123-8840",
      militaryBranch: "FAB",
      rankCategory: "Viúva de 1º Sargento Taifeiro",
      militaryStatus: "pensionista",
      entryYear: 1982,
      grossIncome: 7800,
      netIncome: 5900,
      hasDaughterDeduction1_5: false,
      numberOfDependents: 1,
      hasElderlyInHousehold: true,
      notes:
        "Idosa de 71 anos. Sofreu queda recente no banheiro de casa. Sentiu o impacto do desconto de 10,5% na pensão após a reforma.",
      createdAt: "2026-10-18T17:10:00Z",
    },
    consultation: {
      id: "cons-cta-002",
      organizationId: "org-ecoseg-01",
      consultantId: "consultant-joao-01",
      profileId: "prof-cta-002",
      originEvent: "Palestra Lei 13.954 no CTA-RJ",
      status: "parecer_emitido",
      currentStep: 4,
      summaryFindings:
        "Alta vulnerabilidade domiciliar e queda. Solução recomendada com urgência: MAG Master Acidentes Domiciliares com Check-Up Lar.",
      adherenceScoreTotal: 95,
      recommendedProductIds: [
        "mag-master-acidentes-check-lar",
        "gboex-forca-ativa-tradicional",
      ],
      objectionsHandled: [
        "Medo de custo elevado; demonstrado valor acessível de R$ 115/mês com instalação de barras grátis.",
      ],
      nextStepsAgreed:
        "Agendada visita do técnico da MAG para avaliação e instalação de barras antiderrapantes no banheiro.",
      scheduledFollowUpDate: "2026-10-22T10:00:00Z",
      createdAt: "2026-10-18T17:15:00Z",
      updatedAt: "2026-10-19T08:30:00Z",
    },
    evaluation: evaluateCyborgAdherence({
      id: "prof-cta-002",
      organizationId: "org-ecoseg-01",
      consultantId: "consultant-joao-01",
      fullName: "D. Elza Soares da Silva (Pensionista FAB)",
      phone: "(21) 97123-8840",
      militaryBranch: "FAB",
      rankCategory: "Viúva de 1º Sargento Taifeiro",
      militaryStatus: "pensionista",
      entryYear: 1982,
      grossIncome: 7800,
      netIncome: 5900,
      hasDaughterDeduction1_5: false,
      numberOfDependents: 1,
      hasElderlyInHousehold: true,
      createdAt: "2026-10-18T17:10:00Z",
    }),
  },
  {
    profile: {
      id: "prof-cta-003",
      organizationId: "org-ecoseg-01",
      consultantId: "consultant-joao-01",
      fullName: "Capitão Aviador Marcelo Drumond",
      phone: "(21) 99888-4422",
      email: "drumond.marcelo@fab.mil.br",
      militaryBranch: "FAB",
      rankCategory: "Capitão Aviador",
      militaryStatus: "ativa",
      entryYear: 2008,
      grossIncome: 16800,
      netIncome: 12200,
      hasDaughterDeduction1_5: false, // Ingressou em 2008: NÃO TEM OPÇÃO DE 1,5%!
      numberOfDependents: 3,
      hasElderlyInHousehold: false,
      notes:
        "Oficial da ativa, 37 anos. Possui 2 filhas e 1 patrimônio imobiliário na Barra da Tijuca. Ficou chocado ao saber que as filhas não têm direito à pensão após os 24 anos.",
      createdAt: "2026-10-19T08:00:00Z",
    },
    consultation: {
      id: "cons-cta-003",
      organizationId: "org-ecoseg-01",
      consultantId: "consultant-joao-01",
      profileId: "prof-cta-003",
      originEvent: "QR Code no Telão da Palestra CTA",
      status: "diagnostico_iniciado",
      currentStep: 2,
      summaryFindings:
        "Ingresso pós-2001 elimina totalmente a pensão militar vitalícia de filhas. Patrimônio familiar em risco de inventário de até R$ 250 mil.",
      adherenceScoreTotal: 99,
      recommendedProductIds: [
        "icatu-equilibrio-whole-life",
        "icatu-horizonte-vida-resgatavel",
      ],
      objectionsHandled: [
        "Acreditava que por ser oficial a regra era diferente; demonstrado que a Lei 13.954 é irrestrita para todos pós-2001.",
      ],
      nextStepsAgreed:
        "Simulação de seguro Whole Life de R$ 1,5 milhão com quitação em 10 anos.",
      scheduledFollowUpDate: "2026-10-23T16:00:00Z",
      createdAt: "2026-10-19T08:10:00Z",
      updatedAt: "2026-10-19T09:40:00Z",
    },
    evaluation: evaluateCyborgAdherence({
      id: "prof-cta-003",
      organizationId: "org-ecoseg-01",
      consultantId: "consultant-joao-01",
      fullName: "Capitão Aviador Marcelo Drumond",
      phone: "(21) 99888-4422",
      email: "drumond.marcelo@fab.mil.br",
      militaryBranch: "FAB",
      rankCategory: "Capitão Aviador",
      militaryStatus: "ativa",
      entryYear: 2008,
      grossIncome: 16800,
      netIncome: 12200,
      hasDaughterDeduction1_5: false,
      numberOfDependents: 3,
      hasElderlyInHousehold: false,
      createdAt: "2026-10-19T08:00:00Z",
    }),
  },
];
