import { AudienceProfileEntity, AdherenceResultEntity } from "./schema";
import { PRODUTOS_SOLUCOES_ECOSEG } from "../military-family/products";
import { ProdutoSolucao } from "../military-family/types";

export interface AdherenceEngineResult {
  profileId: string;
  evaluatedAt: string;
  overallVulnerabilityScore: number; // 0 (sem risco) a 100 (vulnerabilidade extrema)
  identifiedGapsCount: number;
  identifiedGaps: {
    code: string;
    title: string;
    severity: "CRITICA" | "ALTA" | "MEDIA";
    incomeImpact: string;
    legalBasis: string;
    summary: string;
  }[];
  matchedSolutions: {
    product: ProdutoSolucao;
    adherenceScore: number; // 0 a 100%
    priorityRank: number;
    gapAddressedCode: string;
    gapAddressedTitle: string;
    suggestedCapitalDisplay: string;
    estimatedMonthlyContribution: string;
    rationalText: string;
    antiInventoryAdvantage: string;
    caveatsAndAlerts: string[];
    objectionsGuide: {
      objection: string;
      consultantResponse: string;
    }[];
  }[];
  consultantRecommendationsSummary: string;
}

/**
 * Motor Determinístico de Aderência e Elegibilidade (Cyborg Intelligence v1.4)
 * Desenvolvido para eliminar alucinações de LLMs em cálculos previdenciários e sucessórios.
 */
export function evaluateCyborgAdherence(
  profile: AudienceProfileEntity
): AdherenceEngineResult {
  const gaps: AdherenceEngineResult["identifiedGaps"] = [];
  const matchedSolutions: AdherenceEngineResult["matchedSolutions"] = [];

  const isReserveOrRetired =
    profile.militaryStatus === "reserva" || profile.militaryStatus === "reformado";
  const isPensioner = profile.militaryStatus === "pensionista";
  const isTaifeiroOrPraca = [
    "Taifeiro",
    "Soldado",
    "Cabo",
    "Sargento",
    "Suboficial",
  ].some((r) => profile.rankCategory.toLowerCase().includes(r.toLowerCase()));
  const enteredAfter2000 = profile.entryYear > 2000;
  const noDaughter1_5 = !profile.hasDaughterDeduction1_5;

  // 1. AVALIAÇÃO: Extinção da Pensão Vitalícia das Filhas (MIL-PEN-001)
  if (noDaughter1_5 || enteredAfter2000) {
    gaps.push({
      code: "MIL-PEN-001",
      title: "Extinção da Pensão Militar Vitalícia para Filhas Maiores",
      severity: "CRITICA",
      incomeImpact: "-100% da pensão estatal após 24 anos",
      legalBasis: "Art. 50, § 2º Lei 6.880/80 c/c Art. 31 MP 2.215-10/2001",
      summary:
        "Sem o recolhimento comprobatório de 1,5%, filhas maiores perdem qualquer direito à pensão militar do Estado após os 24 anos.",
    });

    // Mapeia Icatu Equilíbrio (Whole Life)
    const icatuEquilibrio = PRODUTOS_SOLUCOES_ECOSEG.find(
      (p) => p.id === "prod-icatu-equilibrio"
    );
    if (icatuEquilibrio) {
      matchedSolutions.push({
        product: icatuEquilibrio,
        adherenceScore: 98,
        priorityRank: 1,
        gapAddressedCode: "MIL-PEN-001",
        gapAddressedTitle: "Extinção da Pensão Vitalícia de Filhas",
        suggestedCapitalDisplay:
          profile.grossIncome > 8000 ? "R$ 750.000,00" : "R$ 500.000,00",
        estimatedMonthlyContribution:
          profile.grossIncome > 8000 ? "R$ 480,00 / mês" : "R$ 320,00 / mês",
        rationalText:
          "Garante capital perpétuo com reserva financeira acumulada (2% a.a. + IPCA + excedente) para sustentar a dependente sem depender de decisão do Estado.",
        antiInventoryAdvantage:
          "Não entra em inventário judicial, isento de ITCMD (Art. 794 Código Civil) e liberação em até 10 dias úteis.",
        caveatsAndAlerts: [
          "Exige declaração de saúde padrão da seguradora Icatu.",
          "Resgate da reserva disponível a partir do 25º mês.",
        ],
        objectionsGuide: [
          {
            objection:
              "“Vou entrar na justiça com advogado militar para manter a pensão da minha filha.”",
            consultantResponse:
              "“A jurisprudência do STF pacificou que não existe direito adquirido a regime jurídico (STF Tema 1175). Gastar honorários com ação judicial é promessa vazia. A única certeza jurídica é o contrato de seguro de vida privado protegido pelo Código Civil.”",
          },
        ],
      });
    }

    // Mapeia GBOEX Força Ativa Resgatável
    const gboexResgatavel = PRODUTOS_SOLUCOES_ECOSEG.find(
      (p) => p.id === "prod-gboex-forca-ativa-resgatavel"
    );
    if (gboexResgatavel) {
      matchedSolutions.push({
        product: gboexResgatavel,
        adherenceScore: 92,
        priorityRank: 2,
        gapAddressedCode: "MIL-PEN-001",
        gapAddressedTitle: "Pecúlio e Reserva Militar Complementar",
        suggestedCapitalDisplay: "R$ 350.000,00",
        estimatedMonthlyContribution: "R$ 210,00 / mês",
        rationalText:
          "Instituição centenária militar (desde 1913) com descontos direto em folha e facilidade operacional para taifeiros e graduados.",
        antiInventoryAdvantage:
          "Pagamento desvinculado de inventário por se tratar de entidade de previdência fechada/pecúlio militar.",
        caveatsAndAlerts: ["Sem taxa de adesão para associados e familiares do CTA."],
        objectionsGuide: [
          {
            objection: "“Já tenho seguro obrigatório do quartel.”",
            consultantResponse:
              "“O seguro coletivo do quartel é temporário e encerra ou fica impagável ao passar para a reserva ou atingir idade avançada. O plano resgatável mantém o preço nivelado e acumula patrimônio para resgate em vida.”",
          },
        ],
      });
    }
  }

  // 2. AVALIAÇÃO: Confisco de 10,5% na Pensão e Reserva (MIL-REM-001)
  if (isReserveOrRetired || isPensioner) {
    gaps.push({
      code: "MIL-REM-001",
      title: "Confisco Universal de 10,5% sobre Reserva, Reforma e Pensão",
      severity: "ALTA",
      incomeImpact: "-10,5% a -14% definitivo na renda familiar",
      legalBasis: "Art. 3º-A da Lei nº 3.765/1960 introduzido pela Lei nº 13.954/2019",
      summary:
        "Tributação compulsória sobre o soldo integral sem dedução de teto do RGPS, reduzindo permanentemente o poder aquisitivo familiar.",
    });

    const icatuPrev = PRODUTOS_SOLUCOES_ECOSEG.find(
      (p) => p.id === "prod-icatu-previdencia-renda"
    );
    if (icatuPrev) {
      matchedSolutions.push({
        product: icatuPrev,
        adherenceScore: 94,
        priorityRank: 3,
        gapAddressedCode: "MIL-REM-001",
        gapAddressedTitle: "Reposição Financeira do Confisco de 10,5%",
        suggestedCapitalDisplay: "Renda Programada de R$ 1.500/mês",
        estimatedMonthlyContribution: "Aporte de R$ 350,00 / mês",
        rationalText:
          "Fundo previdenciário com alíquota regressiva de 10% (após 10 anos), sem come-cotas e com opção de conversão em renda vitalícia reversível para o cônjuge.",
        antiInventoryAdvantage:
          "Plano VGBL não compõe o monte-mor do inventário na maioria dos estados, transmitindo-se diretamente aos beneficiários indicados.",
        caveatsAndAlerts: [
          "Regime tributário regressivo definitivo escolhido na contratação.",
        ],
        objectionsGuide: [
          {
            objection: "“Previdência privada rende menos que poupança.”",
            consultantResponse:
              "“A poupança perde para a inflação real. Na previdência estruturada, além do rendimento superior de fundos multimercados, há o ganho tributário e a blindagem contra ITCMD que a poupança não oferece.”",
          },
        ],
      });
    }
  }

  // 3. AVALIAÇÃO: Bloqueio de Inventário Judicial & ITCMD
  gaps.push({
    code: "PAT-INV-001",
    title: "Custo de Inventário e Bloqueio de Contas Bancárias da Família",
    severity: "ALTA",
    incomeImpact: "Perda de até 23% do patrimônio em tributos e custas",
    legalBasis: "Art. 1.796 do Código Civil c/c Leis Estaduais de ITCMD (até 8%)",
    summary:
      "Com a morte do titular, todas as contas conjuntas e bens são congelados até a homologação judicial do inventário, que demora em média 12 a 18 meses.",
  });

  const icatuHorizonte = PRODUTOS_SOLUCOES_ECOSEG.find(
    (p) => p.id === "prod-icatu-horizonte"
  );
  if (icatuHorizonte) {
    matchedSolutions.push({
      product: icatuHorizonte,
      adherenceScore: 96,
      priorityRank: 4,
      gapAddressedCode: "PAT-INV-001",
      gapAddressedTitle: "Liquidez Imediata Anti-Inventário & Doenças Graves",
      suggestedCapitalDisplay: "R$ 600.000,00",
      estimatedMonthlyContribution: "R$ 390,00 / mês (Quitação em 10 anos)",
      rationalText:
        "Parcelas niveladas com prazo flexível de quitação (5, 10 ou 15 anos). O militar quita durante a atividade e mantém a blindagem vitalícia sem despesas na velhice.",
      antiInventoryAdvantage:
        "Pagamento da indenização em cheque/PIX direto aos herdeiros em 5 dias, custeando o ITCMD dos imóveis sem precisar vender patrimônio com deságio.",
      caveatsAndAlerts: [
        "Inclui antecipação em vida de até 100% para 24 doenças graves.",
        "Inclui diária de internação hospitalar (DIH) com UTI em dobro.",
      ],
      objectionsGuide: [
        {
          objection: "“Meus filhos vendem um imóvel se precisarem pagar o inventário.”",
          consultantResponse:
            "“Para vender qualquer imóvel no inventário, é necessário alvará judicial demorado e o comprador exige deságio de 30% a 40%. A apólice de liquidez entrega o dinheiro líquido na conta em 5 dias úteis sem desconto de um centavo.”",
        },
      ],
    });
  }

  // 4. AVALIAÇÃO: Praças e Taifeiros (Custo Acessível)
  if (isTaifeiroOrPraca) {
    const gboexTradicional = PRODUTOS_SOLUCOES_ECOSEG.find(
      (p) => p.id === "prod-gboex-forca-ativa"
    );
    if (gboexTradicional) {
      matchedSolutions.push({
        product: gboexTradicional,
        adherenceScore: 89,
        priorityRank: 5,
        gapAddressedCode: "MIL-ACC-001",
        gapAddressedTitle: "Proteção Essencial com Parcela Reduzida",
        suggestedCapitalDisplay: "R$ 150.000,00",
        estimatedMonthlyContribution: "R$ 89,00 / mês",
        rationalText:
          "Plano com menor desembolso mensal, ajustado ao contracheque de praças, cabos e taifeiros, garantindo funeral e pecúlio familiar.",
        antiInventoryAdvantage:
          "Pecúlio isento de inventário com assistência funeral imediata 24 horas.",
        caveatsAndAlerts: ["Sem componente de reserva financeira resgatável."],
        objectionsGuide: [
          {
            objection: "“Meu orçamento deste mês está apertado.”",
            consultantResponse:
              "“Por menos de R$ 3,00 ao dia você impede que sua família precise fazer vaquinha no quartel para custos de funeral e subsistência inicial.”",
          },
        ],
      });
    }
  }

  // 5. AVALIAÇÃO: Vulnerabilidade a Quedas e Idosos (> 60 anos ou idoso na residência)
  if (profile.hasElderlyInHousehold || isReserveOrRetired) {
    gaps.push({
      code: "MAG-LAR-001",
      title: "Vulnerabilidade Domiciliar e Quedas na Terceira Idade",
      severity: "MEDIA",
      incomeImpact: "Custos médicos e perda de autonomia domiciliar",
      legalBasis: "Estatuto da Pessoa Idosa (Lei nº 10.741/2003)",
      summary:
        "70% dos acidentes graves em militares inativos e pensionistas acontecem dentro da residência (banheiros e escadas).",
    });

    const magMaster = PRODUTOS_SOLUCOES_ECOSEG.find(
      (p) => p.id === "prod-mag-master-acidentes"
    );
    if (magMaster) {
      matchedSolutions.push({
        product: magMaster,
        adherenceScore: 91,
        priorityRank: 6,
        gapAddressedCode: "MAG-LAR-001",
        gapAddressedTitle: "Prevenção de Quedas & Check-Up Lar",
        suggestedCapitalDisplay: "R$ 200.000,00 (Acidentes + R$ 5.000 Check-up)",
        estimatedMonthlyContribution: "R$ 115,00 / mês",
        rationalText:
          "Inclui visita técnica para instalação de barras de apoio em banheiros, fitas antiderrapantes e cobertura de fraturas e diárias de internação.",
        antiInventoryAdvantage:
          "Amparo em vida com foco na preservação da integridade física e do domicílio familiar.",
        caveatsAndAlerts: ["Válido para ingresso até 75 anos de idade."],
        objectionsGuide: [
          {
            objection: "“Nunca caí em casa, tomo muito cuidado.”",
            consultantResponse:
              "“O benefício não é apenas quando o acidente ocorre: o plano envia eletricista e encanador para adequar sua residência agora, prevenindo a queda antes que aconteça.”",
          },
        ],
      });
    }
  }

  // Ordena soluções por aderência e rank de prioridade
  matchedSolutions.sort((a, b) => b.adherenceScore - a.adherenceScore);

  // Calcula score global de vulnerabilidade
  const baseScore = gaps.reduce((acc, curr) => {
    if (curr.severity === "CRITICA") return acc + 40;
    if (curr.severity === "ALTA") return acc + 25;
    return acc + 10;
  }, 0);

  const overallVulnerabilityScore = Math.min(100, Math.max(15, baseScore));

  const consultantRecommendationsSummary = `O titular ${profile.fullName} (${profile.rankCategory} - ${profile.militaryBranch}) apresenta índice de vulnerabilidade de ${overallVulnerabilityScore}%. Principal prioridade: ${gaps[0]?.title || "Blindagem Sucessória"}. Solução líder indicada: ${matchedSolutions[0]?.product.nome || "Icatu Equilíbrio"}.`;

  return {
    profileId: profile.id,
    evaluatedAt: new Date().toISOString(),
    overallVulnerabilityScore,
    identifiedGapsCount: gaps.length,
    identifiedGaps: gaps,
    matchedSolutions,
    consultantRecommendationsSummary,
  };
}
