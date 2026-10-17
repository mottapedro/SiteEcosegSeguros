import type { PresentationContent } from "@/contracts/presentation";

/**
 * Conteúdo oficial da Palestra no Clube dos Taifeiros da Aeronáutica (CTA).
 * Alinhado à ADR 0005 e evidências governadas MIL-REM-001 e MIL-PEN-001.
 */
export const militaryFamilyProtectionPresentation = {
  id: "presentation-military-family-protection",
  slug: "protecao-familia-militar",
  title: "Lei nº 13.954/2019 — Perdas e consequências!",
  subtitle:
    "O impacto real da reforma militar na remuneração, alíquotas de pensão e na segurança patrimonial da família.",
  audience: "Militares da ativa, reserva, reformados, pensionistas e dependentes",
  version: "1.0.0",
  status: "DRAFT",
  disclaimer:
    "Conteúdo educativo e consultivo embasado em fontes primárias oficiais (Lei nº 13.954/2019, Lei nº 6.880/1980, MP nº 2.215-10/2001 e STF Tema 1175). Não substitui assessoria jurídica individual.",
  sections: [
    {
      id: "opening",
      type: "OPENING",
      eyebrow: "Abertura · Marco Legal",
      title: "Lei nº 13.954/2019 — Perdas e consequências!",
      summary:
        "As mudanças no Estatuto dos Militares, a exclusão de dependentes no FUNSA e a nova realidade orçamentária da família militar.",
      talkingPoints: [
        "Agradecimento à Administração do Clube dos Taifeiros da Aeronáutica (CTA).",
        "Reconhecimento ao Presidente Jorge Salustiano Lins e Vice Sergio Menezes.",
        "Acolhimento aos militares da ativa, veteranos, pensionistas e dependentes.",
      ],
      referenceIds: ["MIL-REM-001", "MIL-PEN-001"],
    },
    {
      id: "health",
      type: "CONTEXT",
      eyebrow: "Saúde · FUNSA / SARAM",
      title: "Perda do direito ao plano de saúde da Aeronáutica",
      summary:
        "O Art. 50, § 2º da Lei 6.880/80 (com redação da Lei 13.954/19) restringiu os dependentes com direito à assistência médico-hospitalar e odontológica do FUNSA/SISAU.",
      talkingPoints: [
        "Filhos ao completarem 21 anos perderam o amparo médico do hospital militar.",
        "Corte significativo da cobertura odontológica e ambulatorial da Força.",
        "Necessidade urgente de suprir a ausência desses direitos com planos privados de excelência.",
      ],
      referenceIds: ["MIL-REM-001"],
    },
    {
      id: "pension",
      type: "EVIDENCE",
      eyebrow: "Pensão Militar & Filhas",
      title: "Pensão das filhas: O Artigo 31 da MP nº 2.215-10/2001",
      summary:
        "O regime da Lei nº 3.765/1960 que permitia pensão a filhas maiores foi alterado. A vitaliciedade depende da comprovação do desconto de 1,5% da regra de transição.",
      talkingPoints: [
        "Quem não optou ou ingressou após 2000 não possui pensão para filhas maiores.",
        "Ilusão de direito adquirido: o benefício exige verificação estrita em contracheque.",
        "Risco de desamparo das dependentes no momento da abertura da sucessão.",
      ],
      referenceIds: ["MIL-PEN-001"],
    },
    {
      id: "stf",
      type: "EXPLANATION",
      eyebrow: "STF Tema 1175 · Decisão Definitiva",
      title: "Perda do adicional de 41%: Não cabe mais recurso!",
      summary:
        "No Tema 1175 (ARE 1.341.061), o STF pacificou que o Judiciário não pode estender percentuais máximos por isonomia. Pela LINDB (Art. 6º), a matéria transitou em julgado.",
      talkingPoints: [
        "A Lei 13.954/19 é constitucional e os percentuais escalonados continuam em vigor.",
        "Fim das ações judiciais: não cabe mais recurso contra a União.",
        "Insistir em teses de balcão gera custos e adia a solução financeira concreta.",
      ],
      referenceIds: ["MIL-REM-001"],
    },
    {
      id: "solutions",
      type: "METHOD",
      eyebrow: "E Agora? · Soluções EcoSeg",
      title: "Suprindo as perdas legais com proteção privada de alta solidez",
      summary:
        "Quando o Estado restringe direitos e a justiça encerra recursos, a resposta é blindar a família com opções privadas de solvência garantida.",
      talkingPoints: [
        "SulAmérica Saúde: Cobertura médica e odontológica completa para repor o FUNSA.",
        "Saúde Internacional Premium: Atendimento médico global para os mais exigentes.",
        "Previdência & Sucessão Familiar: Liquidez em 72h fora de inventário para proteger filhas.",
      ],
      referenceIds: [],
    },
    {
      id: "cta",
      type: "CTA",
      eyebrow: "Atendimento CTA & Cards no Site",
      title: "Acesse os cards de soluções & agende seu diagnóstico",
      summary:
        "Nenhum diagnóstico é feito no palco. Conheça as opções no site oficial da EcoSeg e agende uma conversa reservada no salão do CTA.",
      talkingPoints: [
        "Acesse pelo celular o site da EcoSeg pelo QR Code na tela.",
        "Conheça os cards detalhados de Saúde, Previdência e Vida.",
        "Atendimento com a equipe do João Brito no local: sem custo e sob sigilo absoluto.",
      ],
      referenceIds: [],
    },
  ],
  references: [
    {
      id: "MIL-REM-001",
      title: "Lei nº 13.954/2019 e STF Tema 1175 (ARE 1.341.061)",
      sourceLabel: "Diário Oficial da União e Portal do STF",
      sourceUrl: "https://portal.stf.jus.br/jurisprudenciaRepercussao/tema.asp?num=1175",
      status: "DRAFT",
      note: "Referência primária indicada para validação da legislação e do precedente citado na palestra.",
    },
    {
      id: "MIL-PEN-001",
      title: "Medida Provisória nº 2.215-10/2001 (Art. 31) e Lei nº 3.765/1960",
      sourceLabel: "Planalto — Legislação Compilada",
      sourceUrl: "https://www.planalto.gov.br/ccivil_03/mpv/2215-10.htm",
      status: "DRAFT",
      note: "Referência primária indicada para validação das regras de pensão citadas na palestra.",
    },
  ],
} satisfies PresentationContent;
