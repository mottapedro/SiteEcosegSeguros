import type { HomeContent } from "../types";

export const homeContent: HomeContent = {
  hero: {
    eyebrow: "Consultoria em seguros corporativos",
    title: "Proteção patrimonial e jurídica para quem construiu algo sólido",
    subtitle:
      "A EcoSeg estrutura Blindagem Patrimonial e Responsabilidade Civil sob medida para empresas, condomínios, clínicas e profissionais liberais — com consultoria técnica do diagnóstico à apólice.",
    primaryCta: "Solicitar diagnóstico gratuito",
    secondaryCta: "Falar no WhatsApp",
  },
  products: [
    {
      slug: "blindagem-patrimonial",
      name: "Blindagem Patrimonial",
      tagline: "Proteja o que levou anos para construir",
      description:
        "Estruturação jurídica e de seguros que isola o patrimônio pessoal dos riscos da atividade empresarial, reduzindo exposição a processos, dívidas e execuções indevidas.",
      risksMitigated: [
        "Penhora de bens pessoais por dívidas da empresa",
        "Processos trabalhistas e cíveis desproporcionais ao risco real",
        "Sucessão patrimonial mal planejada",
      ],
      idealFor: [
        "Empresários e sócios",
        "Profissionais liberais com patrimônio pessoal exposto",
        "Famílias empresárias",
      ],
      example:
        "Uma indústria de médio porte reestrutura sua holding patrimonial e contrata cobertura complementar, reduzindo em 70% a exposição pessoal dos sócios a passivos operacionais.",
    },
    {
      slug: "responsabilidade-civil",
      name: "Responsabilidade Civil",
      tagline: "Cobertura para o erro, o acidente e o imprevisto",
      description:
        "RC Profissional e RC Empresarial que cobrem indenizações por danos causados a terceiros — de erros técnicos a acidentes nas instalações — sem comprometer o caixa da operação.",
      risksMitigated: [
        "Indenizações por erro técnico ou falha de serviço",
        "Danos a terceiros em instalações físicas",
        "Custos de defesa jurídica em processos de responsabilização",
      ],
      idealFor: [
        "Clínicas e consultórios",
        "Escritórios de arquitetura, engenharia e consultoria",
        "Prestadores de serviço e indústrias",
      ],
      example:
        "Uma clínica de diagnóstico por imagem aciona sua RC Profissional após um laudo contestado judicialmente, com defesa jurídica e indenização cobertas integralmente pela apólice.",
    },
  ],
  differentials: [
    {
      title: "Diagnóstico antes da apólice",
      description:
        "Mapeamos os riscos reais do seu negócio antes de recomendar qualquer cobertura — sem contratos genéricos.",
    },
    {
      title: "Consultoria técnica contínua",
      description:
        "Acompanhamento durante toda a vigência do contrato, com revisão periódica conforme o negócio cresce.",
    },
    {
      title: "Rede de seguradoras qualificadas",
      description:
        "Comparamos condições entre as principais seguradoras do mercado para equilibrar cobertura e custo.",
    },
    {
      title: "Suporte em sinistros",
      description:
        "Acompanhamos você do aviso de sinistro até a resolução, reduzindo fricção no momento mais crítico.",
    },
  ],
  partners: [
    { name: "Porto Seguro" },
    { name: "Allianz" },
    { name: "Tokio Marine" },
    { name: "Zurich" },
    { name: "Itaú Seguros" },
  ],
  testimonials: [
    {
      quote:
        "A EcoSeg identificou uma exposição que nenhuma outra corretora havia mapeado. Hoje temos clareza total sobre o que estamos protegendo.",
      author: "Diretor Financeiro",
      role: "Indústria de médio porte",
    },
    {
      quote:
        "O suporte no momento do sinistro fez toda a diferença. Fomos acompanhados do início ao fim, sem surpresas.",
      author: "Sócia-administradora",
      role: "Clínica de diagnóstico",
    },
  ],
  cta: {
    title: "Vamos mapear os riscos do seu negócio?",
    description:
      "Uma conversa de 20 minutos é suficiente para identificar as maiores exposições patrimoniais e de responsabilidade civil da sua operação.",
    action: "Agendar consultoria",
  },
};
