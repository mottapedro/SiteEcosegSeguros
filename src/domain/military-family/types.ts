/**
 * ECOSEG Domain Ecosystem — Módulo de Proteção da Família Militar & Governança Jurídica
 * Resolução do Ponto 5 do Diagnóstico de Domínio da EcoSeg.
 */

// 1. Norma Jurídica e Fundamentação Legal
export interface NormaJuridica {
  id: string;
  codigo: string; // Ex: 'MIL-REM-001', 'MIL-PEN-001'
  lei: string; // Ex: 'Lei nº 13.954/2019'
  artigo: string;
  paragrafo?: string;
  vigencia: string; // 'A partir de 17/12/2019'
  fonteOficial: string; // URL ou DOU
  statusValidacao: "homologado" | "em_revisao" | "provisorio";
  publicoAfetado: TipoPublicoMilitar[];
  regraAnterior: string;
  regraAtual: string;
  regraTransicao?: string;
  impactoFinanceiroEstimado: string;
}

// 2. Perfis de Militares e Dependentes
export type ForcaMilitar = "FAB" | "EXERCITO" | "MARINHA" | "FORCAS_AUXILIARES";

export type SituacaoMilitar = "ativa" | "reserva" | "reformado" | "pensionista";

export type TipoPublicoMilitar =
  | "praca_taifeiro"
  | "graduado_sargento_suboficial"
  | "oficial_subalterno"
  | "oficial_superior"
  | "oficial_general"
  | "filha_dependente"
  | "conjuge_pensionista"
  | "reformado"
  | "reserva";

export interface PerfilMilitar {
  id: string;
  forca: ForcaMilitar;
  situacao: SituacaoMilitar;
  postoGraduacao: string; // Ex: 'Taifeiro-Mor', 'Suboficial', 'Capitão'
  tempoServicoAnos: number;
  idade: number;
  dependentes: {
    total: number;
    filhasMenores: number;
    filhasMaiores: number;
    temFilhaSemRendaPropria: boolean;
    temConjuge: boolean;
  };
  optouContribuicao1_5Porcento: boolean; // Contribuição facultativa para manter pensão de filhas
  rendaBrutaMensal: number;
}

// 3. Lacunas de Proteção Patrimonial (Identificadas pós-Lei 13.954/2019)
export type SeveridadeLacuna = "critica" | "alta" | "moderada";

export interface LacunaProtecao {
  id: string;
  titulo: string;
  descricaoCurta: string;
  normaRefId: string; // Link com NormaJuridica
  severidade: SeveridadeLacuna;
  impactoNaFamilia: string;
  percentualPerdaRenda: number; // Ex: 10.5% (alíquota pensão) a 100% (extinção pensão filhas)
  categoriaSolucaoRecomendadaId: string;
}

// 4. Categorias de Solução Privada Complementar
export type SeguradoraParceira =
  "Icatu Seguros" | "GBOEX" | "MAG Seguros" | "Consultoria Previdenciária";

export interface CategoriaSolucao {
  id: string;
  nome: string;
  tipo:
    | "seguro_vida_resgatavel"
    | "previdencia_privada"
    | "blindagem_sucessoria"
    | "fundo_emergencia";
  objetivoPrincipal: string;
  suprimeLacunaId: string;
  caracteristicasChave: string[];
  perfilAderente: TipoPublicoMilitar[];
}

export interface ProdutoSolucao {
  id: string;
  nome: string;
  seguradora: SeguradoraParceira;
  processoSusep?: string;
  tipo:
    | "vida_resgatavel"
    | "whole_life"
    | "previdencia_privada"
    | "acidentes_senior"
    | "planejamento_previdenciario";
  subtitulo: string;
  descricao: string;
  lacunaSuprimidaId: string;
  publicoAlvo: TipoPublicoMilitar[];
  destaques: string[];
  coberturasPrincipais: string[];
  regrasResgate?: string;
  vantagemSucessoria: string;
  contatoConsultor: string;
}

// 5. Roteiro e Bloco Narrativo da Palestra (Palestrante João / CTA-RJ)
export interface BlocoRoteiroPalestra {
  ordem: number;
  fase:
    | "Expectativa"
    | "Mudança Jurídica"
    | "Lacuna de Proteção"
    | "Diagnóstico"
    | "Solução"
    | "Atendimento";
  tituloSlide: string;
  tempoSugeridoMinutos: number;
  ganchoEmocional: string;
  argumentoTecnico: string;
  baseJuridicaArtigo: string;
  acaoPublicoNoSite: string; // Ex: 'Escanear QR Code para calcular impacto da pensão'
}

// 6. Contrato Neutro de Lead & Diagnóstico LGPD (Resolução dos Pontos 6 e 7)
export interface ConsentimentoLGPD {
  aceito: boolean;
  dataHora: string;
  versaoTermos: string;
  finalidade: "DIAGNOSTICO_PRELIMINAR_PATRIMONIAL_MILITAR";
  baseLegal: "Art. 7, V (Procedimentos preliminares a pedido do titular) e Art. 7, IX (Legítimo interesse)";
  controlador: "ECOSEG Corretora de Seguros & Consultoria Patrimonial Ltda.";
  retencaoMeses: number; // Ex: 6 meses
  canalColeta: "palestra_cta_qrcode" | "site_publico" | "indicacao_direta";
}

export interface LeadDiagnosticoPublicoContract {
  id?: string;
  nomeCompleto: string;
  whatsapp: string;
  email: string;
  forca: ForcaMilitar;
  postoGraduacao: string;
  situacao: SituacaoMilitar;
  temFilhasDependentes: boolean;
  optou1_5Porcento: boolean;
  faixaRendaMensal: "ate_5k" | "5k_a_10k" | "10k_a_15k" | "acima_15k";
  consentimentoLGPD: ConsentimentoLGPD;
  origemEvento?: string; // Ex: 'Palestra CTA Rio 2026'
  timestampCriacao: string;
}
