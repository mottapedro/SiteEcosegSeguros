import { jsPDF } from 'jspdf';
import { SlideData, LECTURE_FULL_SLIDES } from './pptxGenerator';

/**
 * Generates a mobile-optimized vertical PDF (9:16 / 112mm x 210mm)
 * designed specifically for comfortable reading on a smartphone during the lecture,
 * containing the exclusive speaker script, timing, psychological cues, and legal context.
 */
export async function generateMobileSpeakerGuidePdf(slidesToExport?: SlideData[]): Promise<void> {
  const slides = slidesToExport && slidesToExport.length > 0 ? slidesToExport : LECTURE_FULL_SLIDES;

  // Smartphone vertical dimensions in mm (112mm width x 210mm height - portrait ratio ideal for mobile screens)
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: [112, 210]
  });

  const width = doc.internal.pageSize.getWidth();
  const height = doc.internal.pageSize.getHeight();

  // Color Palette
  const BG_COLOR = [8, 13, 20]; // #080D14 Obsidian Navy
  const SURFACE_COLOR = [17, 24, 39]; // #111827 Dark Surface
  const SURFACE_ALT = [24, 33, 47]; // #18212F Slightly lighter surface
  const GOLD_COLOR = [197, 168, 128]; // #C5A880 Imperial Brass
  const GOLD_LIGHT = [238, 207, 162]; // #EECFA2 Light gold
  const TEXT_WHITE = [248, 249, 250]; // #F8F9FA Alabaster Pearl
  const TEXT_MUTED = [156, 172, 192]; // #9CA3AF Muted Slate
  const BORDER_COLOR = [45, 58, 75]; // #2D3A4B Elegant border
  const EMERALD_COLOR = [52, 211, 153]; // #34D399 Active accent

  // Helper to draw clean mobile background and header
  const renderMobileFrame = (pageTitle: string, pageNumber: number, totalPages: number) => {
    // Background
    doc.setFillColor(BG_COLOR[0], BG_COLOR[1], BG_COLOR[2]);
    doc.rect(0, 0, width, height, 'F');

    // Top gold line accent
    doc.setFillColor(GOLD_COLOR[0], GOLD_COLOR[1], GOLD_COLOR[2]);
    doc.rect(0, 0, width, 1.5, 'F');

    // Header bar
    doc.setTextColor(GOLD_COLOR[0], GOLD_COLOR[1], GOLD_COLOR[2]);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(10);
    doc.text('ECOSEG', 9, 8);

    doc.setTextColor(TEXT_MUTED[0], TEXT_MUTED[1], TEXT_MUTED[2]);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(6);
    doc.text('GUIA DE PALCO · EXCLUSIVO DO PALESTRANTE', 26, 8);

    doc.setTextColor(GOLD_LIGHT[0], GOLD_LIGHT[1], GOLD_LIGHT[2]);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(6.5);
    doc.text(pageTitle.toUpperCase(), width - 9, 8, { align: 'right' });

    // Header divider line
    doc.setDrawColor(BORDER_COLOR[0], BORDER_COLOR[1], BORDER_COLOR[2]);
    doc.setLineWidth(0.2);
    doc.line(9, 11, width - 9, 11);

    // Footer bar
    const footerY = height - 7;
    doc.setDrawColor(BORDER_COLOR[0], BORDER_COLOR[1], BORDER_COLOR[2]);
    doc.setLineWidth(0.2);
    doc.line(9, footerY - 2, width - 9, footerY - 2);

    doc.setTextColor(TEXT_MUTED[0], TEXT_MUTED[1], TEXT_MUTED[2]);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(6);
    doc.text('Clube dos Taifeiros (CTA-RJ) · João Brito', 9, footerY + 1.5);

    doc.setTextColor(GOLD_COLOR[0], GOLD_COLOR[1], GOLD_COLOR[2]);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(6.5);
    doc.text(`Pág. ${pageNumber} de ${totalPages}`, width - 9, footerY + 1.5, { align: 'right' });
  };

  const totalPages = slides.length + 1; // 1 Cover + 6 Acts

  // ==========================================
  // PAGE 1: COVER / IDENTIFICAÇÃO & IDENTIDADE
  // ==========================================
  renderMobileFrame('CREDENCIAL DE PALCO', 1, totalPages);

  // Badge: Leitura Otimizada para Celular
  doc.setFillColor(SURFACE_COLOR[0], SURFACE_COLOR[1], SURFACE_COLOR[2]);
  doc.setDrawColor(GOLD_COLOR[0], GOLD_COLOR[1], GOLD_COLOR[2]);
  doc.setLineWidth(0.3);
  doc.roundedRect(9, 15, width - 18, 8, 2, 2, 'FD');

  doc.setTextColor(GOLD_LIGHT[0], GOLD_LIGHT[1], GOLD_LIGHT[2]);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(7);
  doc.text('LEITURA PARA SMARTPHONE · ROTEIRO CONFIDENCIAL', width / 2, 20.2, { align: 'center' });

  // Main Event Title
  doc.setTextColor(TEXT_WHITE[0], TEXT_WHITE[1], TEXT_WHITE[2]);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(14);
  const mainTitleLines = doc.splitTextToSize('Lei nº 13.954/2019 — Perdas e consequências!', width - 18);
  doc.text(mainTitleLines, 9, 30);

  // Subtitle
  const subY = 30 + (mainTitleLines.length * 5.5);
  doc.setTextColor(TEXT_MUTED[0], TEXT_MUTED[1], TEXT_MUTED[2]);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7.5);
  const subDesc = doc.splitTextToSize(
    'Roteiro Orientador de Contexto, Fala de Abertura, Postura de Palco e Condução Consultiva das Famílias Militares.',
    width - 18
  );
  doc.text(subDesc, 9, subY);

  // Card de Identidade do Palestrante (Diferencial Competitivo)
  const idCardY = subY + (subDesc.length * 4) + 2;
  doc.setFillColor(SURFACE_COLOR[0], SURFACE_COLOR[1], SURFACE_COLOR[2]);
  doc.setDrawColor(BORDER_COLOR[0], BORDER_COLOR[1], BORDER_COLOR[2]);
  doc.setLineWidth(0.4);
  doc.roundedRect(9, idCardY, width - 18, 56, 3, 3, 'FD');

  // Mini gold line inside card
  doc.setFillColor(GOLD_COLOR[0], GOLD_COLOR[1], GOLD_COLOR[2]);
  doc.rect(9, idCardY, 2, 56, 'F');

  doc.setTextColor(GOLD_COLOR[0], GOLD_COLOR[1], GOLD_COLOR[2]);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8);
  doc.text('IDENTIDADE DO PALESTRANTE & DIFERENCIAL', 14, idCardY + 6);

  doc.setTextColor(TEXT_WHITE[0], TEXT_WHITE[1], TEXT_WHITE[2]);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9);
  doc.text('João Brito · Diretor Executivo da ECOSEG', 14, idCardY + 12);

  doc.setTextColor(GOLD_LIGHT[0], GOLD_LIGHT[1], GOLD_LIGHT[2]);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(7.5);
  doc.text('Criação & Educação com Pai Militar', 14, idCardY + 17);

  doc.setTextColor(TEXT_MUTED[0], TEXT_MUTED[1], TEXT_MUTED[2]);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7.2);
  const identityText = doc.splitTextToSize(
    'O orador traz um diferencial de autoridade e empatia real: foi criado e educado sob a cultura, a honra e a disciplina militar. Sabe exatamente como pensa um militar quando o dever sagrado é proteger a família. Para nós, missão só é cumprida quando a retaguarda familiar está segura e inabalável.',
    width - 26
  );
  doc.text(identityText, 14, idCardY + 22);

  // Reconhecimento Institucional CTA
  const instCardY = idCardY + 59;
  doc.setFillColor(SURFACE_ALT[0], SURFACE_ALT[1], SURFACE_ALT[2]);
  doc.setDrawColor(BORDER_COLOR[0], BORDER_COLOR[1], BORDER_COLOR[2]);
  doc.setLineWidth(0.3);
  doc.roundedRect(9, instCardY, width - 18, 36, 3, 3, 'FD');

  doc.setTextColor(GOLD_COLOR[0], GOLD_COLOR[1], GOLD_COLOR[2]);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(7.5);
  doc.text('RECONHECIMENTO INSTITUCIONAL NO CTA', 13, instCardY + 6);

  doc.setTextColor(TEXT_WHITE[0], TEXT_WHITE[1], TEXT_WHITE[2]);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7);
  const instLines = [
    '• Administração do Clube dos Taifeiros da Aeronáutica (CTA)',
    '• Presidente Jorge Salustiano Lins',
    '• Vice-Presidente Sergio Menezes',
    '• Diretor Jurídico Luiz Carlos Macedo Viguinole e demais diretores',
    '• Militares da ativa, veteranos da reserva/reforma, pensionistas e famílias'
  ];
  let curInstY = instCardY + 11;
  instLines.forEach(l => {
    doc.text(l, 13, curInstY);
    curInstY += 4.5;
  });

  // Footer summary badge
  const sumY = instCardY + 39;
  doc.setFillColor(SURFACE_COLOR[0], SURFACE_COLOR[1], SURFACE_COLOR[2]);
  doc.setDrawColor(GOLD_COLOR[0], GOLD_COLOR[1], GOLD_COLOR[2]);
  doc.setLineWidth(0.2);
  doc.roundedRect(9, sumY, width - 18, 14, 2, 2, 'FD');

  doc.setTextColor(GOLD_LIGHT[0], GOLD_LIGHT[1], GOLD_LIGHT[2]);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(7);
  doc.text('6 ATOS NARRATIVOS · TEMPO TOTAL ESTIMADO: ~30 MINUTOS', width / 2, sumY + 5.5, { align: 'center' });

  doc.setTextColor(EMERALD_COLOR[0], EMERALD_COLOR[1], EMERALD_COLOR[2]);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(6.5);
  doc.text('Próximo passo após a palestra: Atendimento consultivo individual no salão.', width / 2, sumY + 10.5, { align: 'center' });

  // ==========================================
  // PAGES 2 to 7: THE 6 ACTS (SLIDES + SPEAKER SCRIPT)
  // ==========================================
  slides.forEach((slide, idx) => {
    doc.addPage([112, 210], 'portrait');
    const pageNum = idx + 2;

    renderMobileFrame(`ATO 0${idx + 1} · ${slide.timeAllocationMinutes} MIN`, pageNum, totalPages);

    let curY = 15;

    // Header Kicker
    doc.setTextColor(GOLD_COLOR[0], GOLD_COLOR[1], GOLD_COLOR[2]);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(7);
    doc.text(`${slide.act.toUpperCase()}`, 9, curY);

    curY += 5;

    // Title
    doc.setTextColor(TEXT_WHITE[0], TEXT_WHITE[1], TEXT_WHITE[2]);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(10.5);
    const titleLines = doc.splitTextToSize(slide.title, width - 18);
    doc.text(titleLines, 9, curY);

    curY += (titleLines.length * 4.8);

    // Subtitle
    doc.setTextColor(TEXT_MUTED[0], TEXT_MUTED[1], TEXT_MUTED[2]);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7);
    const subLns = doc.splitTextToSize(slide.subtitle, width - 18);
    doc.text(subLns, 9, curY);

    curY += (subLns.length * 3.6) + 2;

    // Slide points summary box (What is displayed on the screen)
    doc.setFillColor(SURFACE_COLOR[0], SURFACE_COLOR[1], SURFACE_COLOR[2]);
    doc.setDrawColor(BORDER_COLOR[0], BORDER_COLOR[1], BORDER_COLOR[2]);
    doc.setLineWidth(0.2);

    const pointsTitle = 'TÓPICOS EXIBIDOS NO TELÃO AO PÚBLICO:';
    const pointsFormatted = slide.points.map(p => `• ${p}`);
    
    // Estimate box height
    let estimatedPointsHeight = 7;
    pointsFormatted.forEach(p => {
      const wrapped = doc.splitTextToSize(p, width - 24);
      estimatedPointsHeight += (wrapped.length * 3.4) + 1;
    });

    // Limit box height if too tall
    const boxHeight = Math.min(estimatedPointsHeight, 46);
    doc.roundedRect(9, curY, width - 18, boxHeight, 2, 2, 'FD');

    doc.setTextColor(GOLD_COLOR[0], GOLD_COLOR[1], GOLD_COLOR[2]);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(6.5);
    doc.text(pointsTitle, 12, curY + 4.5);

    let ptY = curY + 8;
    doc.setTextColor(TEXT_WHITE[0], TEXT_WHITE[1], TEXT_WHITE[2]);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(6.5);

    pointsFormatted.forEach(pt => {
      if (ptY + 4 < curY + boxHeight) {
        const wrapped = doc.splitTextToSize(pt, width - 24);
        doc.text(wrapped, 12, ptY);
        ptY += (wrapped.length * 3.3) + 0.8;
      }
    });

    curY += boxHeight + 3;

    // SPEAKER NOTES / ROTEIRO EXCLUSIVO DE FALA (The primary element for the speaker on mobile!)
    doc.setFillColor(SURFACE_ALT[0], SURFACE_ALT[1], SURFACE_ALT[2]);
    doc.setDrawColor(GOLD_COLOR[0], GOLD_COLOR[1], GOLD_COLOR[2]);
    doc.setLineWidth(0.4);

    const remainingHeight = height - curY - 12;
    doc.roundedRect(9, curY, width - 18, remainingHeight, 2.5, 2.5, 'FD');

    // Left golden bar inside notes box
    doc.setFillColor(GOLD_COLOR[0], GOLD_COLOR[1], GOLD_COLOR[2]);
    doc.rect(9, curY, 2, remainingHeight, 'F');

    doc.setTextColor(GOLD_LIGHT[0], GOLD_LIGHT[1], GOLD_LIGHT[2]);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(7.5);
    doc.text('ROTEIRO DE FALA DO PALESTRANTE (NO CELULAR)', 14, curY + 5.5);

    doc.setTextColor(EMERALD_COLOR[0], EMERALD_COLOR[1], EMERALD_COLOR[2]);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(6.5);
    doc.text(`Tempo: ~${slide.timeAllocationMinutes} min`, width - 13, curY + 5.5, { align: 'right' });

    // Clean speaker notes text
    doc.setTextColor(TEXT_WHITE[0], TEXT_WHITE[1], TEXT_WHITE[2]);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(6.8);

    const cleanNotes = slide.speakerNotes.replace(/^[A-Z0-9\s-]+:\n/, '');
    const noteLines = doc.splitTextToSize(cleanNotes, width - 26);

    let noteY = curY + 10;
    noteLines.forEach((nLine: string) => {
      if (noteY + 3.5 < curY + remainingHeight - 4) {
        doc.text(nLine, 14, noteY);
        noteY += 3.4;
      }
    });

    // Military posture reminder at bottom of notes card
    if (noteY + 7 < curY + remainingHeight) {
      doc.setTextColor(GOLD_COLOR[0], GOLD_COLOR[1], GOLD_COLOR[2]);
      doc.setFont('helvetica', 'italic');
      doc.setFontSize(6);
      doc.text(
        'Lembrete: Tom sereno, técnico e acolhedor. Proteger quem dedicou a vida à Pátria.',
        14,
        curY + remainingHeight - 2.5
      );
    }
  });

  // Save the PDF file formatted specifically for smartphone reading
  doc.save('EcoSeg_Roteiro_Palestrante_Celular.pdf');
}

/**
 * Standard 16:9 presentation PDF export (for projector/desktop)
 */
export async function generateLandscapeSlidesPdf(slidesToExport?: SlideData[]): Promise<void> {
  const slides = slidesToExport && slidesToExport.length > 0 ? slidesToExport : LECTURE_FULL_SLIDES;

  const doc = new jsPDF({
    orientation: 'landscape',
    unit: 'mm',
    format: [297, 167.06]
  });

  const width = doc.internal.pageSize.getWidth();
  const height = doc.internal.pageSize.getHeight();

  const BG_COLOR = [8, 13, 20];
  const SURFACE_COLOR = [17, 24, 39];
  const GOLD_COLOR = [197, 168, 128];
  const TEXT_WHITE = [248, 249, 250];
  const TEXT_MUTED = [148, 163, 184];
  const BORDER_COLOR = [38, 50, 56];

  slides.forEach((slide, index) => {
    if (index > 0) {
      doc.addPage([297, 167.06], 'landscape');
    }

    doc.setFillColor(BG_COLOR[0], BG_COLOR[1], BG_COLOR[2]);
    doc.rect(0, 0, width, height, 'F');

    doc.setFillColor(GOLD_COLOR[0], GOLD_COLOR[1], GOLD_COLOR[2]);
    doc.rect(0, 0, width, 1.8, 'F');

    doc.setTextColor(GOLD_COLOR[0], GOLD_COLOR[1], GOLD_COLOR[2]);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(14);
    doc.text('ECOSEG', 18, 12);

    doc.setTextColor(TEXT_MUTED[0], TEXT_MUTED[1], TEXT_MUTED[2]);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7.5);
    doc.text('PROTEÇÃO DA FAMÍLIA MILITAR · CTA / RJ', 18, 17);

    doc.setTextColor(GOLD_COLOR[0], GOLD_COLOR[1], GOLD_COLOR[2]);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9);
    const kickerText = `${slide.act.toUpperCase()}   |   ${slide.kicker}`;
    doc.text(kickerText, width - 18, 13, { align: 'right' });

    doc.setDrawColor(BORDER_COLOR[0], BORDER_COLOR[1], BORDER_COLOR[2]);
    doc.setLineWidth(0.3);
    doc.line(18, 22, width - 18, 22);

    doc.setTextColor(TEXT_WHITE[0], TEXT_WHITE[1], TEXT_WHITE[2]);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(20);
    const titleLines = doc.splitTextToSize(slide.title, width - 36);
    doc.text(titleLines, 18, 34);

    const titleHeight = (titleLines.length - 1) * 8;
    const subY = 41 + titleHeight;
    doc.setTextColor(TEXT_MUTED[0], TEXT_MUTED[1], TEXT_MUTED[2]);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(11);
    const subLines = doc.splitTextToSize(slide.subtitle, width - 36);
    doc.text(subLines, 18, subY);

    const contentY = subY + (subLines.length * 6) + 4;
    const pointsWidth = slide.metric ? 165 : 255;

    let currentY = contentY;
    slide.points.forEach((point) => {
      doc.setFillColor(GOLD_COLOR[0], GOLD_COLOR[1], GOLD_COLOR[2]);
      doc.circle(20, currentY - 1, 1, 'F');

      doc.setTextColor(TEXT_WHITE[0], TEXT_WHITE[1], TEXT_WHITE[2]);
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(10.5);
      const pointLines = doc.splitTextToSize(point, pointsWidth);
      doc.text(pointLines, 24, currentY);

      currentY += (pointLines.length * 5.5) + 3;
    });

    if (slide.metric) {
      const metricX = width - 85;
      const metricY = contentY;
      const metricW = 67;
      const metricH = 46;

      doc.setFillColor(SURFACE_COLOR[0], SURFACE_COLOR[1], SURFACE_COLOR[2]);
      doc.setDrawColor(GOLD_COLOR[0], GOLD_COLOR[1], GOLD_COLOR[2]);
      doc.setLineWidth(0.5);
      doc.roundedRect(metricX, metricY, metricW, metricH, 3, 3, 'FD');

      doc.setTextColor(GOLD_COLOR[0], GOLD_COLOR[1], GOLD_COLOR[2]);
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(26);
      doc.text(slide.metric.value, metricX + (metricW / 2), metricY + 18, { align: 'center' });

      doc.setTextColor(TEXT_WHITE[0], TEXT_WHITE[1], TEXT_WHITE[2]);
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(8.5);
      const labelLines = doc.splitTextToSize(slide.metric.label, metricW - 10);
      doc.text(labelLines, metricX + (metricW / 2), metricY + 28, { align: 'center' });
    }

    if (slide.citation) {
      const quoteY = Math.max(currentY + 2, height - 32);
      doc.setDrawColor(GOLD_COLOR[0], GOLD_COLOR[1], GOLD_COLOR[2]);
      doc.setLineWidth(0.8);
      doc.line(18, quoteY - 3, 18, quoteY + 6);

      doc.setTextColor(GOLD_COLOR[0], GOLD_COLOR[1], GOLD_COLOR[2]);
      doc.setFont('times', 'italic');
      doc.setFontSize(10);
      const quoteLines = doc.splitTextToSize(slide.citation, 240);
      doc.text(quoteLines, 22, quoteY + 1);
    }

    const footerY = height - 12;
    doc.setDrawColor(30, 41, 59);
    doc.setLineWidth(0.3);
    doc.line(18, footerY - 3, width - 18, footerY - 3);

    doc.setTextColor(100, 116, 139);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8);
    doc.text(
      'ECOSEG Consultoria  ·  Evento no Clube dos Taifeiros da Aeronáutica (CTA)  ·  21/10/2026',
      18,
      footerY + 2
    );

    doc.setTextColor(GOLD_COLOR[0], GOLD_COLOR[1], GOLD_COLOR[2]);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8.5);
    doc.text(
      `Slide ${index + 1} de ${slides.length}`,
      width - 18,
      footerY + 2,
      { align: 'right' }
    );
  });

  doc.save('EcoSeg_Palestra_CTA_Lei13954.pdf');
}

/**
 * Default generatePdf: delegates directly to the new mobile-optimized speaker guide
 */
export async function generatePdf(slidesToExport?: SlideData[]): Promise<void> {
  return generateMobileSpeakerGuidePdf(slidesToExport);
}
