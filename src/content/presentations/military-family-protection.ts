import type { PresentationContent } from "@/contracts/presentation";

/**
 * Conteúdo demonstrativo do primeiro vertical slice.
 *
 * Não contém interpretação jurídica nem recomendação de produto.
 * Os tópicos legais de João entrarão somente após o workflow de validação
 * definido no ADR 0005.
 */
export const militaryFamilyProtectionPresentation = {
  id: "presentation-military-family-protection",
  slug: "protecao-familia-militar",
  title: "Proteção da família militar",
  subtitle:
    "Uma conversa sobre expectativas, mudanças de contexto e decisões de proteção.",
  audience:
    "Militares da ativa, reserva e reforma, pensionistas e dependentes",
  version: "0.1.0-demo",
  status: "DRAFT",
  disclaimer:
    "Conteúdo demonstrativo para homologação da experiência. Não constitui orientação jurídica, previdenciária ou recomendação individual de produto.",
  sections: [
    {
      id: "opening",
      eyebrow: "Ponto de partida",
      title: "O que sua família espera que esteja protegido?",
      summary:
        "A palestra começa pela expectativa da família, antes de falar de leis ou produtos.",
      talkingPoints: [
        "Quais proteções são percebidas como permanentes?",
        "Quais decisões dependem da fase da carreira e da composição familiar?",
        "O que precisa ser confirmado antes de qualquer contratação?",
      ],
      referenceIds: [],
    },
    {
      id: "context",
      eyebrow: "Contexto",
      title: "Expectativa e realidade precisam ser comparadas",
      summary:
        "Direitos, serviços e produtos possuem condições próprias. A primeira tarefa consultiva é separar percepção de evidência.",
      talkingPoints: [
        "Identificar a situação atual sem presumir direitos.",
        "Localizar fontes e responsáveis pela confirmação.",
        "Distinguir proteção estatal, associativa e privada.",
      ],
      referenceIds: [],
    },
    {
      id: "gap",
      eyebrow: "Possível lacuna",
      title: "A ausência de clareza também é um risco",
      summary:
        "Quando a família não sabe o que permanece, muda ou depende de condição, surge uma necessidade legítima de diagnóstico.",
      talkingPoints: [
        "Mapear preocupações antes de apresentar produtos.",
        "Registrar dúvidas que precisam de validação especializada.",
        "Evitar promessas de cobertura, direito ou resultado.",
      ],
      referenceIds: [],
    },
    {
      id: "method",
      eyebrow: "Método ECOSEG",
      title: "Compreender antes de recomendar",
      summary:
        "O atendimento individual transforma a conversa coletiva em levantamento responsável do perfil e das prioridades.",
      talkingPoints: [
        "Ouvir o contexto familiar e profissional.",
        "Verificar proteções existentes e possíveis lacunas.",
        "Apresentar categorias de solução com limites claros.",
      ],
      referenceIds: [],
    },
    {
      id: "next-step",
      eyebrow: "Próximo passo",
      title: "A palestra abre a conversa; não encerra a análise",
      summary:
        "O participante poderá manifestar interesse em um atendimento individual quando o fluxo de privacidade estiver homologado.",
      talkingPoints: [
        "Nenhum diagnóstico individual será realizado no palco.",
        "A captação utilizará somente os dados mínimos aprovados.",
        "Perguntas e objeções do evento orientarão a evolução do projeto.",
      ],
      referenceIds: [],
    },
  ],
  references: [],
} satisfies PresentationContent;
