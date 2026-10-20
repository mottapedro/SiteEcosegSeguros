import {
  NormaJuridica,
  LacunaProtecao,
  CategoriaSolucao,
  BlocoRoteiroPalestra,
} from "./types";

// 1. Normas Jurídicas Governadas
export const NORMAS_JURIDICAS_GOVERNADAS: NormaJuridica[] = [
  {
    id: "norma-13954-pen",
    codigo: "MIL-PEN-001",
    lei: "Lei nº 13.954/2019",
    artigo: "Art. 50 c/c Lei nº 3.765/1960",
    paragrafo: "§ 2º e § 3º",
    vigencia: "Vigente desde 17/12/2019",
    fonteOficial: "Diário Oficial da União nº 243, Seção 1, p. 1",
    statusValidacao: "homologado",
    publicoAfetado: [
      "filha_dependente",
      "graduado_sargento_suboficial",
      "praca_taifeiro",
    ],
    regraAnterior:
      "Pensão militar vitalícia para filhas solteiras de qualquer idade, independentemente de renda.",
    regraAtual:
      "Pensão restrita a filhos até 21 anos (ou 24 cursando ensino superior), salvo opção irretratável pela contribuição de 1,5%.",
    regraTransicao:
      "Militares ingressados até 29/12/2000 puderam manter a pensão para filhas mediante desconto extra de 1,5% do soldo.",
    impactoFinanceiroEstimado:
      "Risco de desamparo total de dependentes adultas em caso de falecimento sem o benefício da regra anterior.",
  },
  {
    id: "norma-13954-aliq",
    codigo: "MIL-REM-001",
    lei: "Lei nº 13.954/2019",
    artigo: "Art. 3º-A da Lei nº 3.765/1960",
    paragrafo: "Caput e tabela progressiva",
    vigencia: "Vigente desde 01/01/2020",
    fonteOficial: "DOU 17/12/2019",
    statusValidacao: "homologado",
    publicoAfetado: [
      "conjuge_pensionista",
      "reformado",
      "praca_taifeiro",
      "graduado_sargento_suboficial",
    ],
    regraAnterior:
      "Pensionistas e reformados eram isentos ou pagavam alíquotas residuais para a pensão militar.",
    regraAtual:
      "Cobrança universal de 10,5% sobre o valor total do soldo/pensão militar para todos os inativos e pensionistas.",
    impactoFinanceiroEstimado:
      "Redução imediata e definitiva de pelo menos 10,5% na renda líquida disponível da família.",
  },
];

// 2. Lacunas de Proteção Identificadas
export const LACUNAS_PROTECAO_MILITAR: LacunaProtecao[] = [
  {
    id: "lacuna-filhas",
    titulo: "Extinção da Pensão Vitalícia para Filhas Maiores",
    descricaoCurta:
      "Sem o desconto de 1,5% ou para novos militares, as filhas perdem qualquer amparo previdenciário do Estado após os 24 anos.",
    normaRefId: "norma-13954-pen",
    severidade: "critica",
    impactoNaFamilia:
      "A família supõe que a filha continuará amparada pela União; o falecimento revela a perda de 100% da renda esperada.",
    percentualPerdaRenda: 100,
    categoriaSolucaoRecomendadaId: "solucao-vida-resgatavel",
  },
  {
    id: "lacuna-aliquota-10-5",
    titulo: "Confisco de 10,5% sobre a Pensão e Reserva",
    descricaoCurta:
      "A tributação universal reduziu o poder de compra da família militar de forma permanente e sem recomposição inflacionária.",
    normaRefId: "norma-13954-aliq",
    severidade: "alta",
    impactoNaFamilia:
      "Menos liquidez no momento de maior vulnerabilidade em saúde e custos da terceira idade.",
    percentualPerdaRenda: 10.5,
    categoriaSolucaoRecomendadaId: "solucao-fundo-liquidez",
  },
  {
    id: "lacuna-inventario",
    titulo: "Custo e Bloqueio em Processos de Inventário Judicial",
    descricaoCurta:
      "Bens imobiliários e contas correntes sofrem ITCMD de até 8% mais custas advocatícias de até 15%, bloqueando o sustento imediato.",
    normaRefId: "norma-13954-pen",
    severidade: "alta",
    impactoNaFamilia:
      "A família fica até 18 meses sem acesso aos bens acumulados enquanto corre o inventário.",
    percentualPerdaRenda: 23,
    categoriaSolucaoRecomendadaId: "solucao-blindagem-sucessoria",
  },
];

// 3. Categorias de Solução Privada
export const CATEGORIAS_SOLUCAO_PRIVADA: CategoriaSolucao[] = [
  {
    id: "solucao-vida-resgatavel",
    nome: "Seguro de Vida Resgatável com Renda Familiar",
    tipo: "seguro_vida_resgatavel",
    objetivoPrincipal:
      "Criar patrimônio financeiro garantido e isento de inventário para filhas e cônjuge, suprindo a pensão extinta.",
    suprimeLacunaId: "lacuna-filhas",
    caracteristicasChave: [
      "Isento de ITCMD (Imposto de Transmissão Causa Mortis)",
      "Não entra em inventário judicial (pagamento em até 30 dias)",
      "Opção de resgate em vida caso não ocorra sinistro",
      "Valores indexados ao IPCA para preservação do poder de compra",
    ],
    perfilAderente: [
      "praca_taifeiro",
      "graduado_sargento_suboficial",
      "filha_dependente",
    ],
  },
  {
    id: "solucao-blindagem-sucessoria",
    nome: "Planejamento Sucessório & Blindagem em Vida",
    tipo: "blindagem_sucessoria",
    objetivoPrincipal:
      "Transferir patrimônio imobiliário e recursos sem passar pelo desgaste e custos do inventário tradicional.",
    suprimeLacunaId: "lacuna-inventario",
    caracteristicasChave: [
      "Doação com reserva de usufruto e cláusulas restritivas",
      "Prevenção de disputas entre herdeiros",
      "Minimização legal de ITCMD e custas forenses",
    ],
    perfilAderente: ["oficial_superior", "graduado_sargento_suboficial", "reformado"],
  },
  {
    id: "solucao-fundo-liquidez",
    nome: "Fundo Privado de Liquidez Familiar",
    tipo: "previdencia_privada",
    objetivoPrincipal:
      "Recompor os 10,5% deduzidos pela Lei 13.954 gerando renda complementar vitalícia ou temporária.",
    suprimeLacunaId: "lacuna-aliquota-10-5",
    caracteristicasChave: [
      "Tributação regressiva exclusiva",
      "Portabilidade sem taxa de saída",
      "Benefício complementar garantido para a pensionista",
    ],
    perfilAderente: [
      "praca_taifeiro",
      "graduado_sargento_suboficial",
      "conjuge_pensionista",
    ],
  },
];

// 4. Roteiro Narrativo da Palestra (Palestrante João / CTA-RJ)
export const ROTEIRO_PALESTRA_CTA: BlocoRoteiroPalestra[] = [
  {
    ordem: 1,
    fase: "Expectativa",
    tituloSlide: "A Certeza Histórica da Família Militar",
    tempoSugeridoMinutos: 8,
    ganchoEmocional:
      "A dedicação integral à Pátria sempre teve uma contrapartida sagrada: a certeza de que nossa família nunca ficaria desamparada.",
    argumentoTecnico:
      "Histórico do regime militar de proteção social anterior a 2000 e a garantia de estabilidade para gerações de filhas e cônjuges.",
    baseJuridicaArtigo: "Estatuto dos Militares (Lei nº 6.880/1980)",
    acaoPublicoNoSite: "Abertura do site no smartphone via QR Code exibido no telão.",
  },
  {
    ordem: 2,
    fase: "Mudança Jurídica",
    tituloSlide: "O Ponto de Inflexão: Lei nº 13.954/2019",
    tempoSugeridoMinutos: 12,
    ganchoEmocional:
      "O que muitos ainda não perceberam é que o amparo que nossos pais tinham já não é o mesmo que nossas famílias têm hoje.",
    argumentoTecnico:
      "Análise do corte etário de 21/24 anos, a taxa universal de 10,5% e o fim da pensão vitalícia sem contribuição facultativa.",
    baseJuridicaArtigo: "Lei nº 13.954/2019, Art. 50 e Art. 3º-A da Lei 3.765/60",
    acaoPublicoNoSite:
      'Acessar a aba "Base Jurídica Governada" no portal para verificar o artigo oficial.',
  },
  {
    ordem: 3,
    fase: "Lacuna de Proteção",
    tituloSlide: "A Realidade dos Números: Onde Está a Brecha?",
    tempoSugeridoMinutos: 15,
    ganchoEmocional:
      "Quem protegerá sua filha de 30 anos se você faltar amanhã? O Estado não mais.",
    argumentoTecnico:
      "Demonstração do cálculo da perda: dedução de 10,5% no soldo + perda de 100% da pensão de filhas maiores não optantes.",
    baseJuridicaArtigo: "MIL-PEN-001 & MIL-REM-001",
    acaoPublicoNoSite: "Inserir graduação e dependentes no Simulador Rápido de Lacunas.",
  },
  {
    ordem: 4,
    fase: "Diagnóstico",
    tituloSlide: "Cada Família Tem Seu Desenho Único",
    tempoSugeridoMinutos: 10,
    ganchoEmocional:
      "Não existe receita de bolo de corretora de seguros. Existe o contexto da sua casa, seus filhos e seu patrimônio.",
    argumentoTecnico:
      "Princípio da Compreensão Prévia (ADR-B-001): mapear antes de prescrever qualquer proteção.",
    baseJuridicaArtigo: "ADR-B-001 (Compreensão precede Decisão)",
    acaoPublicoNoSite:
      "Preencher os 4 campos do Diagnóstico Preliminar no celular com consentimento LGPD.",
  },
  {
    ordem: 5,
    fase: "Solução",
    tituloSlide: "A Proteção Complementar Privada",
    tempoSugeridoMinutos: 10,
    ganchoEmocional:
      "Tomar a rédea do futuro da sua família, sem depender exclusivamente das reformas do governo.",
    argumentoTecnico:
      "Como o seguro resgatável e o planejamento sucessório em vida blindam os recursos contra inventário e carência.",
    baseJuridicaArtigo: "Código Civil (Arts. 794 e 1.791)",
    acaoPublicoNoSite:
      "Explorar as categorias de solução no catálogo interativo da EcoSeg.",
  },
  {
    ordem: 6,
    fase: "Atendimento",
    tituloSlide: "Consultoria Individual e Dossiê Familiar",
    tempoSugeridoMinutos: 5,
    ganchoEmocional:
      "Uma conversa discreta, respeitosa e técnica para desenhar a sua segurança patrimonial.",
    argumentoTecnico:
      "Agendamento direto no CTA-RJ ou online com consultor credenciado da EcoSeg.",
    baseJuridicaArtigo: "Governança EcoSeg & Cyborg Intelligence",
    acaoPublicoNoSite: "Confirmar horário de atendimento individual com o consultor.",
  },
];
