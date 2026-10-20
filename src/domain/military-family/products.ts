import { ProdutoSolucao } from "./types";

export type { ProdutoSolucao } from "./types";

export const PRODUTOS_SOLUCOES_ECOSEG: ProdutoSolucao[] = [
  {
    id: "prod-icatu-equilibrio",
    nome: "Icatu Equilíbrio (Whole Life)",
    seguradora: "Icatu Seguros",
    processoSusep: "154149010412014-34",
    tipo: "whole_life",
    subtitulo:
      "Seguro de Vida com Acumulação de Reserva Financeira & Planejamento Sucessório",
    descricao:
      "Solução estruturada para famílias militares que perderam o direito à pensão vitalícia de filhas. Combina indenização por morte imediata de alto valor com formação de reserva financeira garantida.",
    lacunaSuprimidaId: "lacuna-filhas",
    publicoAlvo: [
      "praca_taifeiro",
      "graduado_sargento_suboficial",
      "oficial_subalterno",
      "oficial_superior",
      "filha_dependente",
    ],
    destaques: [
      "Indenização mínima de R$ 500 mil sem limite máximo",
      "Em caso de sinistro: beneficiários recebem a indenização + reserva acumulada",
      "Rentabilidade garantida de 2% a.a. + IPCA com reversão de até 80% do excedente financeiro",
      "Resgate disponível a partir do 25º mês (sem carência em caso de invalidez)",
      "Portabilidade facultativa para plano VGBL",
    ],
    coberturasPrincipais: [
      "Morte por qualquer causa (reajustada anualmente pelo IPCA)",
      "Reserva financeira acumulada resgatável em vida",
      "Opção de aportes anuais flexíveis de até 12x a mensalidade",
    ],
    regrasResgate:
      "Disponível após o 25º mês. Resgates parciais não afetam o valor da indenização.",
    vantagemSucessoria:
      "Isento de ITCMD (imposto de herança) e não passa por inventário judicial. Pagamento em até 30 dias diretamente às filhas.",
    contatoConsultor: "(21) 99469-3673",
  },
  {
    id: "prod-icatu-horizonte",
    nome: "Icatu Horizonte (Vida Resgatável Flexível)",
    seguradora: "Icatu Seguros",
    processoSusep: "15414.611834/2025-17",
    tipo: "vida_resgatavel",
    subtitulo:
      "Parcelas Niveladas que Não Aumentam com a Idade & Opção de Quitação Acelerada",
    descricao:
      "Ideal para o militar que deseja quitar a proteção da família durante os anos de atividade ou reserva remunerada, ficando com proteção vitalícia permanente sem novos desembolsos.",
    lacunaSuprimidaId: "lacuna-inventario",
    publicoAlvo: [
      "graduado_sargento_suboficial",
      "oficial_subalterno",
      "oficial_superior",
      "reformado",
    ],
    destaques: [
      "Parcelas que não sobem pela idade (reajuste estritamente pelo IPCA)",
      "Prazo de pagamento flexível: quitação em 5, 10, 15, 20, 25, 30 anos ou vitalício",
      "Possibilidade de resgatar até 100% da reserva a partir do 25º mês",
      "Uso da reserva para quitar antecipadamente a apólice se necessário",
      "Cobertura para 24 Doenças Graves com pagamento antecipado em vida",
    ],
    coberturasPrincipais: [
      "Morte Vitalícia ou Temporária (R$ 50 mil a R$ 20 milhões)",
      "Invalidez Permanente por Acidente com opção de majoração",
      "Diária por Incapacidade Temporária (DIT) de R$ 1 mil a R$ 30 mil/mês",
      "Diária de Internação Hospitalar (DIH) com adicional de UTI em dobro",
      "Assistência Funeral Individual ou Familiar de até R$ 12 mil",
    ],
    regrasResgate:
      "Atualização atuarial da reserva com taxa de juros de 3% a.a. + IPCA mensal.",
    vantagemSucessoria:
      "Liquidez financeira imediata para os herdeiros arcarem com custas cartorárias de inventário sem desespero.",
    contatoConsultor: "(21) 99469-3673",
  },
  {
    id: "prod-gboex-forca-ativa-resgatavel",
    nome: "GBOEX Força Ativa Resgatável",
    seguradora: "GBOEX",
    processoSusep: "15414.900658/2017-85",
    tipo: "vida_resgatavel",
    subtitulo: "A Tradição Centenária em Proteção Exclusiva da Família Militar",
    descricao:
      "Criado com a chancela histórica do GBOEX (fundado em 1913 por militares). Une segurança familiar garantida à possibilidade de resgate financeiro para militares das Forças Armadas.",
    lacunaSuprimidaId: "lacuna-filhas",
    publicoAlvo: [
      "praca_taifeiro",
      "graduado_sargento_suboficial",
      "oficial_subalterno",
      "oficial_superior",
    ],
    destaques: [
      "Mais de 100 anos de experiência protegendo a família militar",
      "Desenhado especificamente para praças, taifeiros, sargentos e oficiais",
      "Proteção imediata no presente com reserva acumulada para o futuro",
      "Contratação simplificada com desconto direto ou débito",
      "Atendimento humanizado especializado em direito e rotina militar",
    ],
    coberturasPrincipais: [
      "Pecúlio / Indenização por Morte sem limite de carência por sinistro",
      "Reserva financeira acumulada com direito a resgate programado",
      "Assistência e amparo familiar nos momentos mais delicados",
    ],
    regrasResgate: "Resgate proporcional conforme tabela regulamentada pela SUSEP.",
    vantagemSucessoria:
      "Proteção patrimonial direta fora da partilha de bens, resguardando o futuro das filhas mesmo sem pensão militar.",
    contatoConsultor: "(21) 99469-3673",
  },
  {
    id: "prod-gboex-forca-ativa",
    nome: "GBOEX Força Ativa Tradicional",
    seguradora: "GBOEX",
    processoSusep: "15414.002185/2008-68",
    tipo: "vida_resgatavel",
    subtitulo:
      "Amparo de Custo Acessível para Praças, Graduados e Taifeiros da Ativa e Reserva",
    descricao:
      "Solução de alta eficiência e baixo custo mensal, permitindo que suboficiais, taifeiros e sargentos mantenham cobertura substancial para a família com valor de parcela reduzido.",
    lacunaSuprimidaId: "lacuna-aliquota-10-5",
    publicoAlvo: ["praca_taifeiro", "graduado_sargento_suboficial", "reserva"],
    destaques: [
      "Mensalidades altamente acessíveis ajustadas à realidade do soldo militar",
      "Garantia de segurança para cônjuge e dependentes",
      "Sem burocracias excessivas na liberação dos valores",
      "Tradição e solidez de mais de um século de mercado",
    ],
    coberturasPrincipais: [
      "Morte por qualquer causa",
      "Invalidez permanente",
      "Assistência funeral e suporte burocrático completo",
    ],
    vantagemSucessoria:
      "Dinheiro rápido na conta da viúva e filhos em até 30 dias para cobrir as primeiras despesas de manutenção do lar.",
    contatoConsultor: "(21) 99469-3673",
  },
  {
    id: "prod-mag-master-acidentes",
    nome: "MAG Master Acidentes Domiciliares",
    seguradora: "MAG Seguros",
    processoSusep: "15414.606228/2020-75",
    tipo: "acidentes_senior",
    subtitulo:
      "Blindagem de Saúde e Proteção Financeira para Maiores de 60 Anos e Pensionistas",
    descricao:
      "Segundo o Ministério da Saúde, 70% das quedas de idosos ocorrem dentro de casa e 40% causam lesões graves. O Master Acidentes Domiciliares protege a reserva financeira de militares reformados e pensionistas idosos contra imprevistos.",
    lacunaSuprimidaId: "lacuna-aliquota-10-5",
    publicoAlvo: ["reformado", "conjuge_pensionista", "reserva"],
    destaques: [
      "Exclusivo para pessoas a partir de 60 anos (sem limite superior restritivo)",
      "Assistência Check-Up Lar: instalação gratuita de barras de segurança nos banheiros",
      "Instalação de fitas antiderrapantes para tapetes e protetores de mobília",
      "Reorganização preventiva de móveis para evitar quedas no domicílio",
      "Desenvolvido com a expertise do Instituto de Longevidade Mongeral Aegon",
    ],
    coberturasPrincipais: [
      "Diária de Internação Hospitalar por Acidente",
      "Indenização por Fratura Óssea e Queimaduras decorrentes de acidente",
      "Reembolso de gastos de atendimento hospitalar de emergência",
      "Reembolso de serviços de ambulância particular em razão do acidente",
      "Morte acidental com indenização imediata aos herdeiros",
    ],
    vantagemSucessoria:
      "Evita a descapitalização da poupança da família com internações e fisioterapias emergenciais.",
    contatoConsultor: "(21) 99469-3673",
  },
  {
    id: "prod-icatu-previdencia-renda",
    nome: "Icatu Previdência Privada com Compra de Renda Vitalícia",
    seguradora: "Icatu Seguros",
    tipo: "previdencia_privada",
    subtitulo:
      "Recomposição dos 10,5% Confiscados pela Lei 13.954 com Renda Reversível ao Cônjuge",
    descricao:
      "Planejamento de acumulação via fundos previdenciários de alta performance (sem come-cotas e com tributação regressiva de até 10%), permitindo a conversão dos recursos em Renda Mensal Vitalícia reversível à pensionista e filhas.",
    lacunaSuprimidaId: "lacuna-aliquota-10-5",
    publicoAlvo: [
      "praca_taifeiro",
      "graduado_sargento_suboficial",
      "oficial_subalterno",
      "oficial_superior",
      "conjuge_pensionista",
    ],
    destaques: [
      "Sem come-cotas (o imposto só incide no resgate, potencializando os juros compostos)",
      "Tabela Regressiva: alíquota de IR cai progressivamente até 10% após 10 anos",
      "Portabilidade 100% gratuita entre mais de 160 gestoras consagradas do mercado",
      "Opção de Compra de Renda: Renda Vitalícia Reversível ao Cônjuge e com continuidade aos filhos",
      "Aportes flexíveis a partir de R$ 100/mês",
    ],
    coberturasPrincipais: [
      "Acumulação de reserva em fundos multimercado e renda fixa IPCA+",
      "Conversão em Renda Vitalícia ou Renda por Prazo Certo",
      "Cobertura opcional de proteção por morte ou invalidez associada",
    ],
    regrasResgate:
      "Resgates sem carência burocrática conforme tabela regressiva ou progressiva.",
    vantagemSucessoria:
      "Não entra em inventário judicial, permitindo que a pensionista continue recebendo proventos sem interrupção de sustento.",
    contatoConsultor: "(21) 99469-3673",
  },
  {
    id: "prod-planejamento-previdenciario",
    nome: "Planejamento Previdenciário Consultivo EcoSeg",
    seguradora: "Consultoria Previdenciária",
    tipo: "planejamento_previdenciario",
    subtitulo:
      "Diagnóstico Individual de Transição das Leis Militares & Cálculo de Proventos",
    descricao:
      "Análise detalhada da carreira do militar perante as mudanças da Lei nº 13.954/2019, MP 2.215/2001 e normas de transição. Mapeamento de adicionais (Disponibilidade e Habilitação Militar) e cálculo exato de pensão futura.",
    lacunaSuprimidaId: "lacuna-filhas",
    publicoAlvo: [
      "praca_taifeiro",
      "graduado_sargento_suboficial",
      "oficial_subalterno",
      "oficial_superior",
      "reserva",
    ],
    destaques: [
      "Descubra o momento ideal e a melhor regra de transferência para a reserva",
      "Auditoria de contribuição facultativa de 1,5% para pensão de filhas",
      "Evita erros de cálculo que custam dezenas de milhares de reais ao longo dos anos",
      "Orientação individual com consultor especialista em previdência e carreira militar",
    ],
    coberturasPrincipais: [
      "Dossiê patrimonial e previdenciário individualizado",
      "Simulação de impacto líquido do soldo na inatividade",
      "Parecer técnico sobre necessidade de coberturas privadas complementares",
    ],
    vantagemSucessoria:
      "Segurança jurídica para que a família tome decisões informadas antes da ocorrência de qualquer fatalidade.",
    contatoConsultor: "(21) 99469-3673",
  },
];
