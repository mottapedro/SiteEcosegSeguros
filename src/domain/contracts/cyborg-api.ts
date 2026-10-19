export interface LeadIngestionPayload {
  leadSource: "palestra_cta_2026" | "site_home" | "vertical_militar" | "qr_code_telao";
  fullName: string;
  phone: string;
  email?: string;
  militaryBranch: "FAB" | "EXERCITO" | "MARINHA" | "FORCAS_AUXILIARES";
  rankCategory: string;
  militaryStatus: "ativa" | "reserva" | "reformado" | "pensionista";
  entryYear?: number;
  mainConcern:
    | "pensao_filhas_lei_13954"
    | "confisco_10_5_reserva"
    | "bloqueio_inventario_itcmd"
    | "quedas_terceira_idade"
    | "transicao_carreira"
    | "outro";
  lgpdConsent: {
    accepted: boolean;
    timestamp: string;
    legalBasis: string;
    policyVersion: string;
  };
}

export interface LeadIngestionResponse {
  success: boolean;
  dossierId: string;
  queueStatus: "enfileirado_para_consultor" | "em_atendimento" | "duplicado";
  assignedConsultant: {
    name: string;
    officeLocation: string;
  };
  trackingCode: string;
  timestamp: string;
}
