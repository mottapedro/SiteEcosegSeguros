import pptxgen from 'pptxgenjs';

export interface SlideData {
  act: string;
  title: string;
  subtitle: string;
  kicker: string;
  points: string[];
  metric?: {
    value: string;
    label: string;
  };
  citation?: string;
  speakerNotes: string;
  timeAllocationMinutes: number;
}

export const LECTURE_FULL_SLIDES: SlideData[] = [
  {
    act: 'Ato I · Marco Legal & Abertura',
    title: 'Lei nº 13.954/2019 — Perdas e consequências!',
    subtitle: 'As mudanças no Estatuto dos Militares, a restrição de dependentes no FUNSA e a nova realidade previdenciária.',
    kicker: 'CLUBE DOS TAIFEIROS DA AERONÁUTICA (CTA) · 21/OUT/2026',
    points: [
      'Agradecimento especial à Administração do Clube dos Taifeiros da Aeronáutica (CTA).',
      'Reconhecimento ao Presidente Jorge Salustiano Lins e ao Vice-Presidente Sergio Menezes, ao Diretor Jurídico Luiz Carlos Macedo Viguinole e demais diretores.',
      'Acolhimento aos militares da ativa, veteranos da reserva/reforma, pensionistas e familiares.',
      'Objetivo: Analisar as perdas reais da legislação e apresentar opções sólidas de proteção privada.',
      'Condução: João Brito — Diretor Executivo da ECOSEG e equipe consultiva especializada.'
    ],
    citation: '“A proteção de quem depende de nós é o compromisso mais nobre de quem dedicou a vida à Pátria.”',
    speakerNotes: 'ABERTURA INSTITUCIONAL & IDENTIDADE DO PALESTRANTE (3 MINUTOS):\n- Saudação oficial aos presentes no Clube dos Taifeiros da Aeronáutica (CTA).\n- Conexão e Identidade: Apresentar que vem de criação e educação de pai militar, entendendo profundamente como pensa um militar em relação à proteção da família (diferencial de empatia e autoridade).\n- Sugestão de fala de abertura do João Brito:\n"Boa tarde a todos. Quero agradecer à Administração do Clube dos Taifeiros da Aeronáutica, ao Presidente Jorge Salustiano Lins, ao Vice-Presidente Sergio Menezes, ao Diretor Jurídico Luiz Carlos Macedo Viguinole e demais diretores pela acolhida e pela oportunidade deste encontro. Agradeço a cada um dos militares da ativa, aos nossos veteranos da reserva e reforma, às pensionistas e a todas as famílias presentes.\nAntes de entrarmos nos números e nas leis, faço questão de compartilhar de onde eu venho: fui criado e educado por pai militar. Cresci dentro dessa cultura, conheço os princípios de honra, disciplina e, acima de tudo, sei exatamente como pensa um militar quando o assunto é a segurança da sua própria casa. Para nós, missão só é cumprida quando a nossa retaguarda familiar está protegida e inabalável.\nPor isso, hoje vamos conversar com absoluta clareza sobre o que aconteceu quando a Lei 13.954/2019 cortou o hospital dos nossos filhos aos 21 anos e mexeu na pensão dos nossos entes queridos. Não podemos mais alimentar falsas esperanças em disputas judiciais que já foram decididas. Mais do que apontar perdas, estamos aqui pra apresentar soluções para as famílias."',
    timeAllocationMinutes: 3
  },
  {
    act: 'Ato II · Saúde & FUNSA / SARAM',
    title: 'Perda do Direito ao Plano de Saúde da Aeronáutica',
    subtitle: 'Lei nº 6.880/1980 (Estatuto dos Militares), alterada pelo Art. 50 da Lei nº 13.954/2019 e Normas FUNSA/SISAU.',
    kicker: 'RESTRIÇÃO DE DEPENDENTES · CORTE MÉDICO E ODONTOLÓGICO',
    points: [
      'A Lei nº 13.954/2019 deu nova redação ao Art. 50, § 2º da Lei 6.880/80, restringindo os dependentes legais.',
      'Filhos e filhas acima de 21 anos (e outros dependentes) perderam o direito à assistência médica da Força.',
      'Perda significativa da cobertura médico-hospitalar e odontológica do FUNSA / SARAM / SISAU.',
      'Os recursos do FUNSA destinam-se estritamente aos definidos pelo novo Estatuto: quem perdeu o vínculo ficou desamparado.',
      'Impacto imediato: Famílias acostumadas ao amparo do hospital militar agora precisam de cobertura privada urgente.'
    ],
    metric: {
      value: 'Art. 50 § 2º',
      label: 'Estatuto dos Militares: Redação restritiva dada pela Lei 13.954/2019 que cortou dependentes do plano de saúde da Aeronáutica'
    },
    speakerNotes: 'ATO II - SAÚDE E FUNSA/SARAM (6 MINUTOS):\n- Focar na dor do associado do CTA:\n"Como os senhores sabem, a Lei nº 13.954 de 2019 alterou profundamente o Estatuto dos Militares (Lei 6.880/80). O artigo 50 passou a restringir de forma rigorosa quem pode ser considerado dependente para fins de assistência médico-hospitalar. Filhos ao completarem 21 anos e dependentes que antes utilizavam o FUNSA e o SARAM foram excluídos. Essa perda do direito à assistência médica e odontológica gera uma insegurança imensa, pois o hospital militar era o esteio da família. Por isso, a ECOSEG traz opções de planos privados de primeira linha para restabelecer esse amparo."',
    timeAllocationMinutes: 6
  },
  {
    act: 'Ato III · Pensão Militar & Filhas',
    title: 'Pensão das Filhas: O Artigo 31 da MP nº 2.215-10/2001',
    subtitle: 'O fim da pensão vitalícia generalizada e as regras de transição da Lei nº 3.765/1960.',
    kicker: 'ENQUADRAMENTO DOCUMENTAL · CONTRIBUIÇÃO DE 1,5%',
    points: [
      'O regime da Lei nº 3.765/1960 que permitia pensão irrestrita a filhas maiores foi alterado em 29/12/2000.',
      'A preservação do direito dependeu da opção e recolhimento específico de 1,5% (Art. 31 da MP 2.215-10/2001).',
      'Militares que não optaram ou ingressaram após dez/2000 NÃO possuem pensão vitalícia para filhas maiores.',
      'A falsa crença de "direito adquirido" sem contribuição gera surpresa devastadora na abertura da sucessão.',
      'A pensão de filhas precisa ser auditada em contracheque e respaldada por planejamento financeiro privado.'
    ],
    citation: '“O benefício não se presume por tempo de serviço: exige verificação documental estrita da rubrica de 1,5%.”',
    speakerNotes: 'ATO III - PENSÃO DAS FILHAS (6 MINUTOS):\n- Desmistificar o boato do direito adquirido irrestrito:\n"Muitos militares acreditam que, por terem entrado há décadas, suas filhas terão pensão garantida automaticamente. Mas a Medida Provisória nº 2.215-10/2001, em seu artigo 31, exigiu uma contribuição específica de 1,5%. Se esse desconto não estiver ativo e documentado, ou se o militar ingressou após 2000, o benefício vitalício não existe. Não podemos deixar as famílias viverem na ilusão: precisamos auditar o contracheque e garantir proteções alternativas."',
    timeAllocationMinutes: 6
  },
  {
    act: 'Ato IV · STF Tema 1175 & Coisa Julgada',
    title: 'Perda do Adicional de 41%: Não Cabe Mais Recurso!',
    subtitle: 'STF Tema 1175 (ARE 1.341.061) e a LINDB (Dec.-Lei nº 4.657/1942, Art. 6º — Coisa Julgada).',
    kicker: 'DECISÃO JUDICIAL DEFINITIVA · FIM DAS ILUSÕES',
    points: [
      'A Lei nº 13.954/2019 instituiu o Adicional de Compensação por Disponibilidade Militar com percentuais diferenciados.',
      'No Tema 1175 da Repercussão Geral, o STF pacificou que o Judiciário NÃO pode estender o teto de 41% por isonomia.',
      'Anotação dos Palestrantes: "Como os Senhores(as) sabem, NÃO CABE MAIS RECURSO, e com isso apresentaremos opções."',
      'LINDB Art. 6º, § 3º: Decisão judicial transitada em julgado é coisa julgada material indiscutível.',
      'Gastar tempo e dinheiro com novas teses jurídicas de balcão é alimentar expectativas sem respaldo legal.'
    ],
    metric: {
      value: 'Tema 1175',
      label: 'STF pacificado: O teto de 41% não pode ser estendido judicialmente a todos os militares. Não cabe mais recurso.'
    },
    speakerNotes: 'ATO IV - ADICIONAL DE 41% E STF (5 MINUTOS):\n- O argumento de ouro anotado nos cadernos da equipe:\n"Senhores e senhoras, precisamos falar com total transparência. Muitos escritórios prometeram que entrariam na justiça para estender o Adicional de Disponibilidade de 41% para todos. Mas o Supremo Tribunal Federal, no Tema 1175, julgou definitivamente: o Judiciário não pode conceder esse percentual. Não cabe mais recurso! Insistir nessa tese é jogar dinheiro fora com honorários. O que nos resta é olhar para a frente e adotar opções financeiras reais para recompor essa perda no bolso."',
    timeAllocationMinutes: 5
  },
  {
    act: 'Ato V · As Opções & Soluções',
    title: 'E Agora? — Da Disputa Jurídica para a Proteção Real',
    subtitle: 'Como suprir as perdas de direitos legais através de instrumentos privados de máxima solidez.',
    kicker: 'SOLUÇÕES ESTRUTURADAS ECOSEG',
    points: [
      'SAÚDE NACIONAL (SulAmérica): Cobertura médica e hospitalar completa para dependentes que perderam o FUNSA.',
      'SAÚDE INTERNACIONAL: Planos premium com assistência médica global para os perfis mais exigentes.',
      'PLANEJAMENTO SUCESSÓRIO & VIDA: Seguro estruturado com liquidez em 72h (sem inventário) para proteger filhas.',
      'PREVIDÊNCIA PRIVADA: Recomposição do poder de compra e renda complementar contra as perdas da Lei 13.954/19.',
      'ISENÇÃO DE IRPF (Lei nº 7.713/88): Auditoria tributária para militares reformados portadores de moléstias elegíveis.'
    ],
    metric: {
      value: '72 Horas',
      label: 'Tempo para liquidação de capital aos beneficiários, sem bloqueio judicial, inventário ou burocracia estatal'
    },
    speakerNotes: 'ATO V - APRESENTAÇÃO DAS OPÇÕES (6 MINUTOS):\n- Apresentar a resposta prática para a pergunta "E agora?":\n"Se a lei mudou e a justiça já bateu o martelo, o que a família militar faz? A resposta da ECOSEG é simples: nós suprimos a ausência dos direitos com opções privadas de alta solvência.\n1. Para a perda da saúde dos filhos no FUNSA: apresentamos a SulAmérica Saúde, além de planos internacionais para os mais exigentes.\n2. Para a perda da pensão das filhas: estruturamos seguros de vida com planejamento sucessório, onde o dinheiro cai na conta em 72h sem inventário.\n3. Para a corrosão da renda: previdência privada e auditoria da isenção de Imposto de Renda pela Lei 7.713."',
    timeAllocationMinutes: 6
  },
  {
    act: 'Ato VI · Cards no Site & Atendimento CTA',
    title: 'Acesse os Cards de Soluções & Agende seu Diagnóstico',
    subtitle: 'Nenhum diagnóstico é feito no palco. Cada família merece uma análise confidencial e individualizada.',
    kicker: 'CONSULTORIA INDIVIDUALIZADA NO CLUBE DOS TAIFEIROS',
    points: [
      'Acesse pelo celular o site oficial da EcoSeg para visualizar os Cards Interativos de Soluções.',
      'Card 1: SulAmérica Saúde Familiar (substituição do FUNSA/SARAM).',
      'Card 2: Seguro Saúde Internacional para alta complexidade.',
      'Card 3: Previdência Privada e Proteção Sucessória para dependentes e filhas.',
      'Sessão Consultiva Exclusiva: Agende seu horário com nossos especialistas aqui no salão do CTA.'
    ],
    citation: '“Conhecer a sua situação real é o único caminho seguro para proteger quem você ama. A equipe EcoSeg está à sua disposição.”',
    speakerNotes: 'ATO VI - ENCERRAMENTO E DIRECIONAMENTO AO SITE (4 MINUTOS):\n- Fala final do João Brito:\n"No telão e nos folhetos que entregamos, há o QR Code para a página da EcoSeg Seguros. Lá os senhores encontrarão os cards com cada uma dessas opções detalhadas. Nossa equipe de consultores está posicionada aqui no salão do Clube dos Taifeiros para atender cada um de forma reservada, auditar seu contracheque e entregar um diagnóstico sem nenhum custo ou compromisso comercial. Muito obrigado a todos e uma excelente tarde!"',
    timeAllocationMinutes: 4
  }
];

export async function generatePptx(slidesToExport?: SlideData[]): Promise<void> {
  const pres = new pptxgen();
  const slides = slidesToExport && slidesToExport.length > 0 ? slidesToExport : LECTURE_FULL_SLIDES;

  // Set presentation properties
  pres.layout = 'LAYOUT_16x9';
  pres.author = 'João Brito · ECOSEG Intelligence';
  pres.company = 'ECOSEG Consultoria Patrimonial · Clube dos Taifeiros da Aeronáutica (CTA)';
  pres.title = 'Palestra: Lei nº 13.954/2019 — Perdas e consequências!';
  pres.subject = 'Proteção da Família Militar: Direitos, Pensões, Assistência Médico-Hospitalar e Planejamento';

  // Define Brand Colors
  const BG_COLOR = '080D14'; // Obsidian Navy
  const SURFACE_COLOR = '111827';
  const GOLD_COLOR = 'C5A880'; // Imperial Brass
  const TEXT_WHITE = 'F8F9FA';
  const TEXT_MUTED = '94A3B8';

  slides.forEach((slideData, index) => {
    const slide = pres.addSlide();

    // 1. Dark Background
    slide.background = { color: BG_COLOR };

    // 2. Add Top Decorative Border & Header Bar
    slide.addShape(pres.ShapeType.rect, {
      x: 0,
      y: 0,
      w: 13.33,
      h: 0.08,
      fill: { color: GOLD_COLOR }
    });

    // Top Brand Logo / Wordmark
    slide.addText('ECOSEG', {
      x: 0.8,
      y: 0.35,
      w: 2.2,
      h: 0.35,
      fontSize: 16,
      fontFace: 'Arial',
      bold: true,
      color: GOLD_COLOR,
      charSpacing: 3
    });

    slide.addText('PROTEÇÃO DA FAMÍLIA MILITAR · CTA / RJ', {
      x: 0.8,
      y: 0.68,
      w: 5.0,
      h: 0.25,
      fontSize: 7.5,
      fontFace: 'Arial',
      color: TEXT_MUTED,
      charSpacing: 1.5
    });

    // Top Category Kicker & Slide Counter
    slide.addText(`${slideData.act.toUpperCase()}  |  ${slideData.kicker}`, {
      x: 5.0,
      y: 0.45,
      w: 7.5,
      h: 0.35,
      fontSize: 8.5,
      fontFace: 'Arial',
      bold: true,
      color: GOLD_COLOR,
      align: 'right',
      charSpacing: 1.2
    });

    // Divider Line
    slide.addShape(pres.ShapeType.line, {
      x: 0.8,
      y: 1.05,
      w: 11.73,
      h: 0,
      line: { color: '263238', width: 1 }
    });

    // 3. Main Headline
    slide.addText(slideData.title, {
      x: 0.8,
      y: 1.3,
      w: 11.7,
      h: 0.95,
      fontSize: 24,
      fontFace: 'Arial',
      bold: true,
      color: TEXT_WHITE
    });

    // Subtitle
    slide.addText(slideData.subtitle, {
      x: 0.8,
      y: 2.25,
      w: 11.7,
      h: 0.65,
      fontSize: 12.5,
      fontFace: 'Arial',
      color: TEXT_MUTED
    });

    // 4. Content Block (Points list)
    const pointsFormatted = slideData.points.map(p => ({
      text: p + '\n',
      options: {
        fontSize: 11.5,
        fontFace: 'Arial',
        color: TEXT_WHITE,
        bullet: { code: '2014', color: GOLD_COLOR },
        breakLine: true
      }
    }));

    const contentWidth = slideData.metric ? 7.8 : 11.5;

    slide.addText(pointsFormatted, {
      x: 0.8,
      y: 2.95,
      w: contentWidth,
      h: 2.8,
      margin: 0.1,
      lineSpacing: 22
    });

    // 5. Metric Box (if available)
    if (slideData.metric) {
      slide.addShape(pres.ShapeType.roundRect, {
        x: 8.8,
        y: 3.0,
        w: 3.7,
        h: 2.6,
        fill: { color: SURFACE_COLOR },
        line: { color: GOLD_COLOR, width: 1.5 },
        rectRadius: 0.15
      });

      slide.addText(slideData.metric.value, {
        x: 8.8,
        y: 3.2,
        w: 3.7,
        h: 0.9,
        fontSize: 30,
        fontFace: 'Arial',
        bold: true,
        color: GOLD_COLOR,
        align: 'center'
      });

      slide.addText(slideData.metric.label, {
        x: 9.0,
        y: 4.15,
        w: 3.3,
        h: 1.3,
        fontSize: 9.5,
        fontFace: 'Arial',
        color: TEXT_WHITE,
        align: 'center'
      });
    }

    // 6. Citation / Quote (if available)
    if (slideData.citation) {
      slide.addShape(pres.ShapeType.rect, {
        x: 0.8,
        y: 5.9,
        w: 0.06,
        h: 0.55,
        fill: { color: GOLD_COLOR }
      });

      slide.addText(slideData.citation, {
        x: 0.95,
        y: 5.85,
        w: 11.0,
        h: 0.65,
        fontSize: 10.5,
        fontFace: 'Georgia',
        italic: true,
        color: GOLD_COLOR
      });
    }

    // 7. Footer Bar
    slide.addShape(pres.ShapeType.line, {
      x: 0.8,
      y: 6.75,
      w: 11.73,
      h: 0,
      line: { color: '1E293B', width: 1 }
    });

    slide.addText('ECOSEG Consultoria · Evento no Clube dos Taifeiros da Aeronáutica (CTA) · 21/10/2026', {
      x: 0.8,
      y: 6.85,
      w: 9.0,
      h: 0.35,
      fontSize: 8.5,
      fontFace: 'Arial',
      color: '64748B'
    });

    slide.addText(`Slide ${index + 1} de ${slides.length}`, {
      x: 10.5,
      y: 6.85,
      w: 2.0,
      h: 0.35,
      fontSize: 9,
      fontFace: 'Arial',
      bold: true,
      color: GOLD_COLOR,
      align: 'right'
    });

    // 8. ADD SPEAKER NOTES (Essential for João Brito's rehearsal!)
    slide.addNotes(
      `${slideData.speakerNotes}\n\n[TEMPO ESTIMADO PARA ENSAIO: ${slideData.timeAllocationMinutes} MINUTOS]`
    );
  });

  // Generate and save PPTX file
  await pres.writeFile({ fileName: 'EcoSeg_Palestra_CTA_Lei13954.pptx' });
}
