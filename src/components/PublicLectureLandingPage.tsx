'use client';

import React, { useState } from 'react';
import { EcoSegLogo } from './brand/EcoSegLogo';
import {
  ArrowRight,
  Shield,
  HeartPulse,
  Scale,
  Calendar,
  Lock,
  Phone,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  TrendingUp,
  FileText,
  Clock,
  Sparkles,
  ExternalLink,
  Presentation,
  FileCheck,
  X,
  ZoomIn
} from 'lucide-react';
import { generateMobileSpeakerGuidePdf } from '../services/pdfGenerator';
import { generatePptx } from '../services/pptxGenerator';

interface ProtectionFlyer {
  id: string;
  provider: 'GBOEX' | 'MAG';
  providerName: string;
  title: string;
  subtitle: string;
  badge: string;
  badgeColor: string;
  slogan: string;
  lifestyleImage: string;
  lifestyleAlt: string;
  lifestyleConcept: string;
  image: string;
  fullImage: string;
  susep: string;
  publicoAlvo: string;
  destaques: string[];
  whatsappMessage: string;
}

const PROTECTION_FLYERS: ProtectionFlyer[] = [
  {
    id: 'forca-ativa',
    provider: 'GBOEX',
    providerName: 'GBOEX · Desde 1913',
    title: 'Força Ativa GBOEX',
    subtitle: 'Previdência & Pecúlio Tradicional Militar',
    badge: 'TRADIÇÃO DESDE 1913',
    badgeColor: 'bg-amber-500/10 text-amber-300 border-amber-500/30',
    slogan: 'Quando você tem, tudo fica bem!',
    lifestyleImage: '/assets/aistudio/Gemini_Generated_Image_4nr4il4nr4il4nr4_65e3c9b1.jfif',
    lifestyleAlt: 'Pai militar e filha sorrindo em um momento de proteção familiar',
    lifestyleConcept: 'Proteção para quem serve',
    image: '/assets/aistudio/cartaz_gboex_forca_ativa_thumb.png',
    fullImage: '/assets/aistudio/cartaz_gboex_forca_ativa.png',
    susep: 'PROC. SUSEP Nº 15414.002185/2008-68',
    publicoAlvo: 'Praças, Taifeiros, Sargentos e Oficiais da Ativa',
    destaques: [
      'Pecúlio ágil com liberação imediata sem inventário',
      'Desconto consignado em folha oficial das Forças Armadas',
      'Amparo financeiro imediato para os entes queridos'
    ],
    whatsappMessage: 'Olá! Vi o encarte do plano Força Ativa GBOEX na palestra do CTA e gostaria de saber mais.'
  },
  {
    id: 'forca-ativa-resgatavel',
    provider: 'GBOEX',
    providerName: 'GBOEX · Desde 1913',
    title: 'Força Ativa Resgatável GBOEX',
    subtitle: 'Proteção Familiar com Capital Resgatável',
    badge: 'FAMÍLIA DA ATIVA',
    badgeColor: 'bg-blue-500/10 text-blue-300 border-blue-500/30',
    slogan: 'Tranquilidade para você, proteção para sua família!',
    lifestyleImage: '/assets/aistudio/Gemini_Generated_Image_4nr4il4nr4il4nr4__2__af30c189.jfif',
    lifestyleAlt: 'Militar fardado com esposa e filha em um momento familiar',
    lifestyleConcept: 'Família da ativa',
    image: '/assets/aistudio/cartaz_gboex_forca_ativa_resgatavel_thumb.png',
    fullImage: '/assets/aistudio/cartaz_gboex_forca_ativa_resgatavel.png',
    susep: 'PROC. SUSEP Nº 15414.900658/2017-85',
    publicoAlvo: 'Militares da Ativa com Cônjuge e Filhos Menores',
    destaques: [
      'Proteção contra imprevistos com opção de resgate em vida',
      'Reserva de segurança para educação dos filhos e estabilidade familiar',
      'Regulamento auditado com proteção patrimonial direta'
    ],
    whatsappMessage: 'Olá! Gostaria de uma simulação do plano Força Ativa Resgatável GBOEX apresentado no CTA.'
  },
  {
    id: 'vida-resgatavel',
    provider: 'GBOEX',
    providerName: 'GBOEX · Desde 1913',
    title: 'Vida Resgatável GBOEX',
    subtitle: 'Planejamento de Longo Prazo e Sucessão',
    badge: 'FUTURO DOS FILHOS',
    badgeColor: 'bg-emerald-500/10 text-emerald-300 border-emerald-500/30',
    slogan: 'Já planejou o seu futuro hoje? Proteção no presente e tranquilidade no futuro',
    lifestyleImage: '/assets/aistudio/Gemini_Generated_Image_4nr4il4nr4il4nr4__4__b11a0676.jfif',
    lifestyleAlt: 'Casal sênior com bicicletas no parque',
    lifestyleConcept: 'Futuro da família',
    image: '/assets/aistudio/cartaz_gboex_vida_resgatavel_thumb.png',
    fullImage: '/assets/aistudio/cartaz_gboex_vida_resgatavel.png',
    susep: 'PROC. SUSEP Nº 15414.900658/2017-85',
    publicoAlvo: 'Militares e Pensionistas planejando sucessão familiar',
    destaques: [
      'Garantia de capital para filhos e netos sem depender de pensão militar',
      'Resgate programado no prazo contratado para projetos de vida',
      'Isenção de inventário e de tributação de herança (ITCMD)'
    ],
    whatsappMessage: 'Olá! Gostaria de entender como funciona o plano Vida Resgatável GBOEX para proteger meus entes queridos.'
  },
  {
    id: 'vida-longa',
    provider: 'GBOEX',
    providerName: 'GBOEX · Desde 1913',
    title: 'Vida Longa GBOEX',
    subtitle: 'Proteção Dedicada para Veteranos e Terceira Idade',
    badge: 'MAIS DE 100 ANOS',
    badgeColor: 'bg-purple-500/10 text-purple-300 border-purple-500/30',
    slogan: 'Mais de 100 anos de experiência em proteger pessoas.',
    lifestyleImage: '/assets/aistudio/Gemini_Generated_Image_4nr4il4nr4il4nr4__3__53d3b87e.jfif',
    lifestyleAlt: 'Avô militar com a netinha nos ombros',
    lifestyleConcept: 'Longevidade com autonomia',
    image: '/assets/aistudio/cartaz_gboex_vida_longa_thumb.png',
    fullImage: '/assets/aistudio/cartaz_gboex_vida_longa.png',
    susep: 'PROC. SUSEP Nº 15414.002185/2008-68',
    publicoAlvo: 'Militares da Reserva, Reformados, Veteranos e Pensionistas',
    destaques: [
      'Aceitação ampla para faixas etárias seniores e veteranos',
      'Segurança vitalícia para manutenção do padrão de vida do lar',
      'Instituição beneficente militar fundada em 1913 no Brasil'
    ],
    whatsappMessage: 'Olá! Tenho interesse no plano Vida Longa GBOEX para a terceira idade / inatividade militar.'
  },
  {
    id: 'mag-seguranca-exclusiva',
    provider: 'MAG',
    providerName: 'MAG Seguros · Mongeral Aegon',
    title: 'Vida Toda Segurança Exclusiva',
    subtitle: 'Proteção 24h para Profissionais de Segurança & Militares',
    badge: 'SEGURANÇA & DEFESA 24H',
    badgeColor: 'bg-cyan-500/10 text-cyan-300 border-cyan-500/30',
    slogan: 'Proteção 24 horas exclusiva para profissionais de segurança.',
    lifestyleImage: '/assets/aistudio/Gemini_Generated_Image_4nr4il4nr4il4nr4__1__f11c3e37.jfif',
    lifestyleAlt: 'Silhueta militar em continência patriótica ao nascer do sol',
    lifestyleConcept: 'Segurança em serviço e em casa',
    image: '/assets/aistudio/mag_cartaz_oficial_thumb.png',
    fullImage: '/assets/aistudio/mag_cartaz_oficial.png',
    susep: 'PROC. SUSEP Nº 15414.900625/2019-39 e 15414.900828/2019-83',
    publicoAlvo: 'Militares das Forças Armadas, Policiais e Profissionais de Segurança',
    destaques: [
      'Morte ou Invalidez Permanente Total por Acidente em serviço e folga',
      'Assistência emergencial completa 24h',
      'Sorteios mensais de até R$ 50 mil pela Loteria Federal',
      'Inclusão facilitada do cônjuge com condições exclusivas'
    ],
    whatsappMessage: 'Olá! Vi o encarte oficial do plano Vida Toda Segurança Exclusiva da MAG Seguros na palestra do CTA e gostaria de uma simulação.'
  }
];

interface PublicLectureLandingPageProps {
  onOpenPresentation: () => void;
  showFooter?: boolean;
}

type CatalogFilter = 'TODOS' | 'GBOEX' | 'MAG';
type CatalogView = 'lifestyle' | 'official';

export const PublicLectureLandingPage: React.FC<PublicLectureLandingPageProps> = ({
  onOpenPresentation,
  showFooter = false,
}) => {
  const [selectedForce, setSelectedForce] = useState<string>('FAB');
  const [selectedRank, setSelectedRank] = useState<string>('suboficial');
  const [hasDaughters, setHasDaughters] = useState<boolean>(true);
  const [hasDependentsOver21, setHasDependentsOver21] = useState<boolean>(true);
  const [simulated, setSimulated] = useState<boolean>(false);
  const [isGeneratingPdf, setIsGeneratingPdf] = useState<boolean>(false);
  const [pdfDownloaded, setPdfDownloaded] = useState<boolean>(false);
  const [catalogFilter, setCatalogFilter] = useState<CatalogFilter>('TODOS');
  const [catalogView, setCatalogView] = useState<CatalogView>('lifestyle');
  const [flyerViews, setFlyerViews] = useState<Record<string, CatalogView>>({});
  const [activeFlyerModal, setActiveFlyerModal] = useState<ProtectionFlyer | null>(null);
  const [modalView, setModalView] = useState<CatalogView>('official');
  const [modalZoom, setModalZoom] = useState<number>(1);

  const displayedFlyers =
    catalogFilter === 'TODOS'
      ? PROTECTION_FLYERS
      : PROTECTION_FLYERS.filter((flyer) => flyer.provider === catalogFilter);

  const setGlobalCatalogView = (view: CatalogView) => {
    setCatalogView(view);
    setFlyerViews({});
  };

  const toggleFlyerView = (flyerId: string) => {
    const currentView = flyerViews[flyerId] ?? catalogView;
    setFlyerViews((currentViews) => ({
      ...currentViews,
      [flyerId]: currentView === 'lifestyle' ? 'official' : 'lifestyle',
    }));
  };

  const openFlyerModal = (flyer: ProtectionFlyer) => {
    setActiveFlyerModal(flyer);
    setModalView(flyerViews[flyer.id] ?? catalogView);
    setModalZoom(1);
  };

  const handleDownloadPdf = async () => {
    try {
      setIsGeneratingPdf(true);
      await generateMobileSpeakerGuidePdf();
      setPdfDownloaded(true);
      setTimeout(() => setPdfDownloaded(false), 3500);
    } catch (err) {
      console.error('Erro gerando PDF:', err);
    } finally {
      setIsGeneratingPdf(false);
    }
  };

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#080D14] text-neutral-100 font-sans selection:bg-amber-500/20 selection:text-amber-200">
      {/* Top Banner Notice */}
      <div className="bg-neutral-950/90 border-b border-neutral-850 px-4 py-2 text-xs flex items-center">
        <div className="flex items-center gap-2 text-neutral-400">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="font-mono text-[11px] text-neutral-300">
            Página Pública Oficial do Evento · Clube dos Taifeiros (CTA-RJ)
          </span>
        </div>

        {/*
        <div className="flex items-center gap-3">
          {onNavigateToStudio && (
            <button
              onClick={onNavigateToStudio}
              className="text-amber-400 hover:text-amber-300 font-medium transition-colors cursor-pointer text-[11px] flex items-center gap-1"
            >
              <span>← Voltar ao Brand Studio & Inteligência</span>
            </button>
          )}

          <button
            onClick={onOpenPresentation}
            className="px-2.5 py-1 rounded bg-amber-500/20 text-amber-300 border border-amber-500/40 text-[11px] font-semibold flex items-center gap-1.5 hover:bg-amber-500/30 transition-colors cursor-pointer"
          >
            <Play className="w-3 h-3 fill-amber-300" />
            <span>Abrir Tela do Ensaio / Apresentação</span>
          </button>
        </div>
        */}
      </div>

      {/* O Header global do App Router jÃ¡ Ã© renderizado pelo layout. */}
      {false && (
      <header className="hidden">
        <div className="w-full max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 h-18 sm:h-20 flex items-center justify-between">
          {/* Logo Oficial EcoSeg */}
          <a href="/palestra/protecao-familia-militar" className="flex items-center shrink-0">
            <EcoSegLogo
              size={36}
              finish="brass"
              tagline="PLANEJAMENTO & PROTEÇÃO PATRIMONIAL"
            />
          </a>

          {/* Nav links */}
          <nav className="hidden lg:flex items-center gap-8 text-xs font-semibold uppercase tracking-wider text-neutral-300">
            <button
              onClick={() => scrollToSection('palestra')}
              className="hover:text-white transition-colors cursor-pointer hover:border-b-2 hover:border-[#C5A880] py-2"
            >
              Palestra Militar
            </button>
            <button
              onClick={() => scrollToSection('metodologia')}
              className="hover:text-white transition-colors cursor-pointer hover:border-b-2 hover:border-[#C5A880] py-2"
            >
              Metodologia Consultiva
            </button>
            <button
              onClick={() => scrollToSection('diagnostico')}
              className="hover:text-white transition-colors cursor-pointer hover:border-b-2 hover:border-[#C5A880] py-2"
            >
              Diagnóstico Consultivo
            </button>
            <button
              onClick={() => scrollToSection('contato')}
              className="hover:text-white transition-colors cursor-pointer hover:border-b-2 hover:border-[#C5A880] py-2"
            >
              Contato
            </button>
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-3">
            <button
              onClick={onOpenPresentation}
              className="px-4 py-2 rounded-xl text-xs font-semibold text-neutral-200 bg-neutral-900 border border-neutral-800 hover:bg-neutral-800 transition-colors shadow-sm cursor-pointer flex items-center gap-1.5"
            >
              <Presentation className="w-3.5 h-3.5 text-amber-400" />
              <span>Modo Apresentação</span>
            </button>

            <button
              onClick={() => scrollToSection('diagnostico')}
              className="px-4.5 py-2 rounded-xl text-xs font-bold text-neutral-950 bg-[#C5A880] hover:bg-[#b5966c] shadow-md shadow-amber-500/10 transition-colors cursor-pointer"
            >
              Agendar Diagnóstico
            </button>
          </div>
        </div>
      </header>
      )}

      {/* Hero Section matching Image 2 */}
      <section id="palestra" className="relative py-16 md:py-28 px-4 sm:px-6 lg:px-8 xl:px-12 max-w-[1600px] mx-auto overflow-hidden">
        {/* Subtle background glow */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-gradient-to-r from-amber-500/10 via-blue-500/5 to-transparent blur-3xl pointer-events-none" />

        <div className="max-w-4xl space-y-6 relative z-10">
          {/* Pill Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-neutral-900/90 border border-neutral-800 text-[11px] font-mono text-neutral-300">
            <span className="w-2 h-2 rounded-full bg-amber-400" />
            <span className="tracking-widest uppercase">
              CLUBE DOS TAIFEIROS DA AERONÁUTICA (CTA) · 21 DE OUTUBRO DE 2026
            </span>
          </div>

          {/* Main Headline */}
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-[1.12]">
            Palestra João Brito:
            <span className="block mt-2 text-transparent bg-clip-text bg-gradient-to-r from-white via-neutral-100 to-amber-200">
              Lei nº 13.954/2019 — Perdas e consequências!
            </span>
          </h1>

          {/* Paragraph with Institutional Support */}
          <p className="text-sm sm:text-base text-neutral-300 leading-relaxed max-w-3xl">
            <strong>Apoio institucional:</strong> Pres. Jorge Salustiano Lins, Vice-Pres. Sergio Menezes, Diretor Jurídico Luiz Carlos Macedo Viguinole e demais diretores. Análise técnica e responsável sobre pensões dos entes queridos (MP 2.215-10/01), corte da assistência médica no FUNSA/SARAM (Art. 50 da Lei 6.880/80), coisa julgada no STF (Tema 1175) e planejamento financeiro familiar.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-wrap items-center gap-4 pt-4">
            <button
              onClick={onOpenPresentation}
              className="px-6 py-3.5 rounded-xl bg-[#C5A880] hover:bg-[#b5966c] text-[#080D14] font-bold text-sm flex items-center gap-2.5 shadow-lg shadow-amber-500/20 transition-all active:scale-95 cursor-pointer"
            >
              <span>Abrir Modo Apresentação</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={() => scrollToSection('catalogo-protecao')}
              className="px-6 py-3.5 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-white border border-neutral-800 font-semibold text-sm transition-all cursor-pointer hover:border-neutral-700"
            >
              Ver Opções de Proteção
            </button>

            <button
              onClick={handleDownloadPdf}
              disabled={isGeneratingPdf}
              className="px-4 py-3 rounded-xl bg-neutral-900/60 hover:bg-neutral-800 text-neutral-300 border border-neutral-800/80 text-xs font-medium flex items-center gap-2 transition-colors cursor-pointer"
              title="Baixar Roteiro Exclusivo do Palestrante formatado para celular"
            >
              <FileText className="w-3.5 h-3.5 text-amber-400" />
              <span>{isGeneratingPdf ? 'Gerando...' : pdfDownloaded ? 'PDF Baixado!' : 'Guia Celular (PDF)'}</span>
            </button>
          </div>
        </div>
      </section>

      {/* 4 Pillars of Legal Loss Analyzed */}
      <section className="py-12 bg-neutral-950/60 border-y border-neutral-800/80 px-4 sm:px-6 lg:px-8 xl:px-12 max-w-[1600px] mx-auto">
        <div className="max-w-6xl mx-auto space-y-8">
          <div className="text-center space-y-2">
            <span className="text-[11px] font-mono tracking-widest uppercase text-amber-400">
              MUDANÇAS LEGISLATIVAS & IMPACTOS REAIS
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              O que a Lei 13.954/2019 e as Cortes Mudaram na Prática
            </h2>
            <p className="text-xs sm:text-sm text-neutral-400 max-w-2xl mx-auto">
              Compreensão transparente das perdas reais para agir preventivamente, sem alimentar ilusões judiciais.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs">
            {/* Card 1: Saúde */}
            <div className="p-6 rounded-2xl bg-[#0B111A] border border-neutral-800 space-y-3 relative group hover:border-amber-500/40 transition-all">
              <div className="p-2.5 rounded-xl bg-rose-500/10 text-rose-400 w-fit border border-rose-500/20">
                <HeartPulse className="w-5 h-5" />
              </div>
              <span className="text-[10px] font-mono text-rose-400 uppercase tracking-wider block">
                Art. 50, § 2º (Lei 6.880/80)
              </span>
              <h3 className="text-base font-bold text-white">Corte no Hospital aos 21 Anos</h3>
              <p className="text-neutral-300 leading-relaxed">
                A redação restritiva da Lei 13.954/2019 excluiu filhos e dependentes maiores de 21 anos do amparo médico-hospitalar do FUNSA / SARAM / SISAU. A família perdeu a retaguarda médica militar.
              </p>
            </div>

            {/* Card 2: Pensão das Filhas */}
            <div className="p-6 rounded-2xl bg-[#0B111A] border border-neutral-800 space-y-3 relative group hover:border-amber-500/40 transition-all">
              <div className="p-2.5 rounded-xl bg-amber-500/10 text-amber-400 w-fit border border-amber-500/20">
                <Shield className="w-5 h-5" />
              </div>
              <span className="text-[10px] font-mono text-amber-400 uppercase tracking-wider block">
                MP 2.215-10/2001 (Art. 31)
              </span>
              <h3 className="text-base font-bold text-white">Pensão Militar dos Entes Queridos</h3>
              <p className="text-neutral-300 leading-relaxed">
                A pensão vitalícia generalizada acabou em 2000. Hoje ela existe exclusivamente para quem contribui com a rubrica de 1,5% averbada em contracheque. Sem isso, filhas maiores não recebem pensão.
              </p>
            </div>

            {/* Card 3: STF Tema 1175 */}
            <div className="p-6 rounded-2xl bg-[#0B111A] border border-neutral-800 space-y-3 relative group hover:border-amber-500/40 transition-all">
              <div className="p-2.5 rounded-xl bg-cyan-500/10 text-cyan-400 w-fit border border-cyan-500/20">
                <Scale className="w-5 h-5" />
              </div>
              <span className="text-[10px] font-mono text-cyan-400 uppercase tracking-wider block">
                Tema 1175 STF (Coisa Julgada)
              </span>
              <h3 className="text-base font-bold text-white">Não Cabe Mais Recurso Judicial</h3>
              <p className="text-neutral-300 leading-relaxed">
                O STF pacificou que o Judiciário não estenderá o teto de 41% por isonomia. Insistir em litígios de balcão é jogar honorários fora. É preciso focar na recomposição financeira privada.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Solutions Section (ADR 0006) */}
      <section id="legacy-solucoes" className="hidden py-16 px-4 sm:px-6 lg:px-8 xl:px-12 max-w-[1600px] mx-auto space-y-10" aria-hidden="true">
        <div className="max-w-4xl space-y-2">
          <span className="text-[11px] font-mono tracking-widest uppercase text-amber-400">
            SOLUÇÕES ESTRUTURADAS ECOSEG
          </span>
          <h2 className="text-2xl sm:text-4xl font-bold text-white tracking-tight">
            Como Suprir as Ausências de Direitos com Instrumentos Privados
          </h2>
          <p className="text-xs sm:text-sm text-neutral-400">
            Produtos homologados com as maiores seguradoras do país, desenhados para a realidade financeira e sucessória da família militar.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Solução 1 */}
          <div className="p-6 rounded-2xl bg-neutral-900/60 border border-neutral-800 space-y-4 hover:border-amber-500/30 transition-all">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 font-semibold">
                SAÚDE COMPLETA
              </span>
              <span className="text-xs font-bold text-amber-400">SulAmérica Saúde</span>
            </div>
            <h3 className="text-base font-bold text-white">Substituição do FUNSA para Filhos & Cônjuges</h3>
            <p className="text-xs text-neutral-300 leading-relaxed">
              Cobertura ambulatorial, hospitalar e obstétrica de primeira linha para dependentes que perderam o direito ao hospital da Aeronáutica aos 21 anos.
            </p>
            <div className="pt-2 border-t border-neutral-800 text-[11px] text-neutral-400 flex items-center justify-between">
              <span>Carências Reduzidas</span>
              <span className="text-white font-medium">Rede Nacional D’Or</span>
            </div>
          </div>

          {/* Solução 2 */}
          <div className="p-6 rounded-2xl bg-neutral-900/60 border border-neutral-800 space-y-4 hover:border-amber-500/30 transition-all">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-blue-500/10 text-blue-400 font-semibold">
                SUCESSÃO & VIDA
              </span>
              <span className="text-xs font-bold text-amber-400">Icatu Seguros</span>
            </div>
            <h3 className="text-base font-bold text-white">Equilíbrio (Whole Life) — Proteção das Filhas</h3>
            <p className="text-xs text-neutral-300 leading-relaxed">
              Capital segurado garantido sem inventário, livre de ITCMD (imposto sobre herança) e com liberação em até 72h diretamente na conta bancária das filhas.
            </p>
            <div className="pt-2 border-t border-neutral-800 text-[11px] text-neutral-400 flex items-center justify-between">
              <span>SUSEP 154149010412014-34</span>
              <span className="text-emerald-400 font-medium">Liquidez em 72h</span>
            </div>
          </div>

          {/* Solução 3 */}
          <div className="p-6 rounded-2xl bg-neutral-900/60 border border-neutral-800 space-y-4 hover:border-amber-500/30 transition-all">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-500/10 text-amber-400 font-semibold">
                RENDA & PREVIDÊNCIA
              </span>
              <span className="text-xs font-bold text-amber-400">Icatu Previdência</span>
            </div>
            <h3 className="text-base font-bold text-white">Previdência Privada com Compra de Renda</h3>
            <p className="text-xs text-neutral-300 leading-relaxed">
              Recomposição do poder de compra corroído pelo desconto compulsório de 10,5%. Alíquota regressiva de apenas 10% de IR e conversão reversível à pensionista.
            </p>
            <div className="pt-2 border-t border-neutral-800 text-[11px] text-neutral-400 flex items-center justify-between">
              <span>Sem Come-Cotas</span>
              <span className="text-white font-medium">Alíquota 10%</span>
            </div>
          </div>

          {/* Solução 4 */}
          <div className="p-6 rounded-2xl bg-neutral-900/60 border border-neutral-800 space-y-4 hover:border-amber-500/30 transition-all">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-purple-500/10 text-purple-400 font-semibold">
                TRADIÇÃO MILITAR
              </span>
              <span className="text-xs font-bold text-amber-400">GBOEX (desde 1913)</span>
            </div>
            <h3 className="text-base font-bold text-white">Força Ativa — Pecúlio e Reserva Programada</h3>
            <p className="text-xs text-neutral-300 leading-relaxed">
              Proteção centenária desenhada especificamente para praças, taifeiros, sargentos e oficiais. Planos tradicionais e resgatáveis com acolhimento à família.
            </p>
            <div className="pt-2 border-t border-neutral-800 text-[11px] text-neutral-400 flex items-center justify-between">
              <span>Centenário Militar</span>
              <span className="text-white font-medium">Praças & Graduados</span>
            </div>
          </div>

          {/* Solução 5 */}
          <div className="p-6 rounded-2xl bg-neutral-900/60 border border-neutral-800 space-y-4 hover:border-amber-500/30 transition-all">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-rose-500/10 text-rose-400 font-semibold">
                SENIOR & CUIDADO
              </span>
              <span className="text-xs font-bold text-amber-400">MAG Seguros</span>
            </div>
            <h3 className="text-base font-bold text-white">Master Acidentes & Check-Up Lar (Idosos)</h3>
            <p className="text-xs text-neutral-300 leading-relaxed">
              Proteção contra internação hospitalar e fraturas decorrentes de quedas domésticas para maiores de 60 anos, com instalação gratuita de barras de segurança e antiderrapantes.
            </p>
            <div className="pt-2 border-t border-neutral-800 text-[11px] text-neutral-400 flex items-center justify-between">
              <span>SUSEP 15414.606228/2020-75</span>
              <span className="text-white font-medium">Adaptação do Lar</span>
            </div>
          </div>

          {/* Solução 6 */}
          <div className="p-6 rounded-2xl bg-neutral-900/60 border border-neutral-800 space-y-4 hover:border-amber-500/30 transition-all">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 font-semibold">
                TRIBUTÁRIO
              </span>
              <span className="text-xs font-bold text-amber-400">Lei nº 7.713/88</span>
            </div>
            <h3 className="text-base font-bold text-white">Auditoria de Isenção de Imposto de Renda</h3>
            <p className="text-xs text-neutral-300 leading-relaxed">
              Diagnóstico técnico e laudo pericial para militares reformados portadores de moléstias elegíveis por lei, restituindo valores recolhidos indevidamente nos últimos 5 anos.
            </p>
            <div className="pt-2 border-t border-neutral-800 text-[11px] text-neutral-400 flex items-center justify-between">
              <span>Recuperação de 5 Anos</span>
              <span className="text-emerald-400 font-medium">Isenção Total</span>
            </div>
          </div>
        </div>
      </section>

      {/* Catálogo Visual de Proteção Militar & Segurança */}
      <section
        id="catalogo-protecao"
        aria-labelledby="catalogo-protecao-title"
        className="mx-auto max-w-[1600px] space-y-10 px-4 py-16 sm:px-6 lg:px-8 xl:px-12"
      >
        <div className="flex flex-col justify-between gap-6 border-b border-neutral-800/60 pb-5 md:flex-row md:items-end">
          <div className="max-w-3xl space-y-3">
            <div className="inline-flex items-center gap-2 rounded-full border border-amber-500/30 bg-amber-500/10 px-3 py-1 text-[11px] font-mono text-amber-300">
              <Sparkles className="h-3.5 w-3.5 text-amber-400" />
              <span className="tracking-widest uppercase">CATÁLOGO VISUAL DE PROTEÇÃO MILITAR & SEGURANÇA</span>
            </div>
            <h2 id="catalogo-protecao-title" className="text-2xl font-bold tracking-tight text-white sm:text-4xl">
              Encartes oficiais para proteger a família militar
            </h2>
            <p className="max-w-2xl text-xs leading-relaxed text-neutral-300 sm:text-sm">
              Soluções homologadas para praças, taifeiros, sargentos, oficiais, veteranos e profissionais de segurança. Alterne a visão conceitual e o encarte técnico; clique para consultar os detalhes em alta resolução.
            </p>
          </div>

          <div className="flex flex-col gap-3 self-start md:items-end md:self-auto">
            <div className="flex max-w-full items-center gap-1.5 overflow-x-auto rounded-2xl border border-neutral-800 bg-[#0B111A] p-1.5 shadow-lg">
              {(['TODOS', 'GBOEX', 'MAG'] as const).map((filter) => (
                <button
                  key={filter}
                  type="button"
                  onClick={() => setCatalogFilter(filter)}
                  className={`whitespace-nowrap rounded-xl px-3.5 py-1.5 text-xs font-semibold transition-all ${
                    catalogFilter === filter
                      ? 'bg-amber-500 font-bold text-neutral-950 shadow-md'
                      : 'text-neutral-400 hover:bg-neutral-800 hover:text-white'
                  }`}
                >
                  {filter === 'TODOS' ? `Todos (${PROTECTION_FLYERS.length})` : filter}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-1 rounded-xl border border-neutral-800 bg-neutral-900/70 p-1">
              <button
                type="button"
                onClick={() => setGlobalCatalogView('lifestyle')}
                className={`rounded-lg px-3 py-1.5 text-[11px] font-semibold transition-colors ${
                  catalogView === 'lifestyle' ? 'bg-neutral-700 text-white' : 'text-neutral-400 hover:text-white'
                }`}
              >
                Visão conceitual
              </button>
              <button
                type="button"
                onClick={() => setGlobalCatalogView('official')}
                className={`rounded-lg px-3 py-1.5 text-[11px] font-semibold transition-colors ${
                  catalogView === 'official' ? 'bg-amber-500 text-neutral-950' : 'text-neutral-400 hover:text-white'
                }`}
              >
                Encartes oficiais
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {displayedFlyers.map((flyer) => {
            const flyerView = flyerViews[flyer.id] ?? catalogView;
            const visualImage = flyerView === 'lifestyle' ? flyer.lifestyleImage : flyer.image;
            const visualAlt = flyerView === 'lifestyle' ? flyer.lifestyleAlt : `${flyer.title} — encarte oficial`;

            return (
              <article
                key={flyer.id}
                className="group flex flex-col justify-between overflow-hidden rounded-2xl border border-neutral-800 bg-[#0B111A] shadow-xl transition-all duration-300 hover:border-amber-500/50 hover:shadow-amber-500/10"
              >
                <div>
                  <div className="relative aspect-[9/13] w-full overflow-hidden bg-neutral-950">
                    <button
                      type="button"
                      onClick={() => openFlyerModal(flyer)}
                      className="relative block h-full w-full cursor-pointer overflow-hidden text-left"
                      aria-label={`Ampliar ${flyer.title}`}
                    >
                    <img
                      src={visualImage}
                      alt={visualAlt}
                      className="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0B111A] via-transparent to-transparent opacity-90" />
                    <span className={`absolute left-3 top-3 rounded-md border px-2 py-0.5 text-[9.5px] font-mono font-bold uppercase tracking-wider backdrop-blur-md ${flyer.badgeColor}`}>
                      {flyer.badge}
                    </span>
                    <span className="absolute right-3 top-3 rounded border border-neutral-700/80 bg-black/70 px-2 py-0.5 text-[9px] font-mono text-neutral-300 backdrop-blur-md">
                      {flyer.provider === 'GBOEX' ? 'GBOEX 1913' : 'MAG 1835'}
                    </span>
                    <span className="absolute bottom-3 left-3 inline-flex items-center gap-1.5 rounded-xl border border-amber-500/40 bg-neutral-900/90 px-3 py-2 text-xs font-semibold text-white opacity-0 shadow-lg transition-opacity group-hover:opacity-100">
                      <ZoomIn className="h-4 w-4 text-amber-400" />
                      Ampliar encarte
                    </span>
                    {flyerView === 'lifestyle' && (
                      <span className="absolute bottom-12 right-3 rounded-md border border-white/20 bg-black/50 px-2 py-1 text-[9px] font-mono uppercase tracking-wider text-neutral-200 backdrop-blur-md">
                        {flyer.lifestyleConcept}
                      </span>
                    )}
                    </button>
                    <button
                      type="button"
                      onClick={(event) => {
                        event.stopPropagation();
                        toggleFlyerView(flyer.id);
                      }}
                      className="absolute bottom-3 right-3 z-10 rounded-lg border border-amber-500/50 bg-black/75 px-2.5 py-1.5 text-[10px] font-semibold text-amber-200 backdrop-blur-md transition-colors hover:bg-amber-500 hover:text-neutral-950"
                    >
                      {flyerView === 'lifestyle' ? 'Ver Cartaz' : 'Ver Foto'}
                    </button>
                  </div>

                  <div className="space-y-2.5 p-4">
                    <div>
                      <span className="block text-[10px] font-mono font-semibold uppercase text-amber-400/90">{flyer.providerName}</span>
                      <h3 className="text-sm font-bold leading-snug text-white transition-colors group-hover:text-amber-300 sm:text-base">{flyer.title}</h3>
                      <p className="mt-0.5 line-clamp-2 text-[11px] font-medium text-neutral-400">{flyer.subtitle}</p>
                    </div>
                    <div className="rounded-xl border border-amber-500/20 bg-amber-500/5 p-2 text-[11px] font-medium italic leading-relaxed text-amber-200">
                      “{flyer.slogan}”
                    </div>
                    <ul className="space-y-1 pt-1 text-[10.5px] text-neutral-300">
                      {flyer.destaques.slice(0, 2).map((item) => (
                        <li key={item} className="flex items-start gap-1.5 leading-snug">
                          <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-emerald-400" />
                          <span className="line-clamp-2">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="space-y-2 border-t border-neutral-800 p-4 pt-3">
                  <div className="truncate text-[9px] font-mono text-neutral-500">{flyer.susep}</div>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => openFlyerModal(flyer)}
                      className="flex-1 rounded-xl border border-neutral-800 bg-neutral-900 py-2 text-xs font-medium text-neutral-300 transition-colors hover:bg-neutral-800"
                    >
                      Detalhes
                    </button>
                    <a
                      href={`https://wa.me/5521994693673?text=${encodeURIComponent(flyer.whatsappMessage)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 rounded-xl bg-[#C5A880] py-2 text-center text-xs font-bold text-[#080D14] shadow-md transition-colors hover:bg-[#b5966c]"
                    >
                      Simular
                    </a>
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        <p className="text-center text-[11px] text-neutral-500">
          Atendimento consultivo com João Brito · SUSEP 202029837 · Clube dos Taifeiros da Aeronáutica (CTA-RJ)
        </p>
      </section>

      {/* Simulator / Preliminary Diagnostic Form */}
      <section id="diagnostico" className="py-16 bg-neutral-950/80 border-t border-neutral-800/80 px-4 sm:px-6 lg:px-8 xl:px-12 max-w-[1600px] mx-auto">
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="text-center space-y-2">
            <span className="text-[11px] font-mono tracking-widest uppercase text-amber-400">
              SIMULADOR DE LACUNAS & COMPREENSÃO PRÉVIA
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              Calcule a Vulnerabilidade Legal da Sua Família
            </h2>
            <p className="text-xs sm:text-sm text-neutral-400 max-w-xl mx-auto">
              Simulação confidencial e instantânea. Nenhum dado bancário, documento ou CPF é solicitado (Princípio de Minimização LGPD).
            </p>
          </div>

          <div className="p-6 md:p-8 rounded-2xl bg-[#0B111A] border border-neutral-800 space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 text-xs">
              <div>
                <label className="block text-neutral-400 font-medium mb-1.5 font-mono text-[11px] uppercase">
                  Força Armada / Origem:
                </label>
                <select
                  value={selectedForce}
                  onChange={(e) => setSelectedForce(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-lg bg-neutral-900 border border-neutral-800 text-white font-medium focus:outline-none focus:border-amber-400"
                >
                  <option value="FAB">Força Aérea Brasileira (Aeronáutica / CTA)</option>
                  <option value="EXERCITO">Exército Brasileiro</option>
                  <option value="MARINHA">Marinha do Brasil</option>
                  <option value="FORCAS_AUXILIARES">Forças Auxiliares (PM / CBM)</option>
                </select>
              </div>

              <div>
                <label className="block text-neutral-400 font-medium mb-1.5 font-mono text-[11px] uppercase">
                  Posto ou Graduação:
                </label>
                <select
                  value={selectedRank}
                  onChange={(e) => setSelectedRank(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-lg bg-neutral-900 border border-neutral-800 text-white font-medium focus:outline-none focus:border-amber-400"
                >
                  <option value="taifeiro">Taifeiro / Soldado / Cabo</option>
                  <option value="sargento">Sargento (3º, 2º ou 1º)</option>
                  <option value="suboficial">Suboficial / Subtenente</option>
                  <option value="oficial_intermediario">Oficial Subalterno / Intermediário</option>
                  <option value="oficial_superior">Oficial Superior</option>
                  <option value="pensionista">Pensionista</option>
                </select>
              </div>

              <div className="p-3 rounded-xl bg-neutral-900/60 border border-neutral-800/80 flex items-center justify-between">
                <div>
                  <span className="font-semibold text-white block">Filhas Maiores de Idade</span>
                  <span className="text-[11px] text-neutral-400">Possui filhas sem opção ativa de 1,5%?</span>
                </div>
                <input
                  type="checkbox"
                  checked={hasDaughters}
                  onChange={(e) => setHasDaughters(e.target.checked)}
                  className="w-4 h-4 accent-amber-400 rounded cursor-pointer"
                />
              </div>

              <div className="p-3 rounded-xl bg-neutral-900/60 border border-neutral-800/80 flex items-center justify-between">
                <div>
                  <span className="font-semibold text-white block">Dependentes acima de 21 anos</span>
                  <span className="text-[11px] text-neutral-400">Perderam cobertura médica do FUNSA?</span>
                </div>
                <input
                  type="checkbox"
                  checked={hasDependentsOver21}
                  onChange={(e) => setHasDependentsOver21(e.target.checked)}
                  className="w-4 h-4 accent-amber-400 rounded cursor-pointer"
                />
              </div>
            </div>

            <button
              onClick={() => setSimulated(true)}
              className="w-full py-3 rounded-xl bg-[#C5A880] hover:bg-[#b5966c] text-[#080D14] font-bold text-xs uppercase tracking-wider transition-colors cursor-pointer shadow-md"
            >
              Calcular Diagnóstico Preliminar
            </button>

            {simulated && (
              <div className="pt-4 border-t border-neutral-800 space-y-4 animate-in fade-in-0 duration-300">
                <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                  <div className="space-y-1 text-xs">
                    <h4 className="font-bold text-amber-300">
                      Diagnóstico de Lacunas Identificado para {selectedRank.toUpperCase()} ({selectedForce})
                    </h4>
                    <p className="text-neutral-200">
                      {hasDaughters && '• Risco Imediato de Ausência de Pensão Vitalícia para filhas maiores (exigência estrita da MP 2.215/01).'}{' '}
                      {hasDependentsOver21 && '• Desamparo Hospitalar Decorrente do Art. 50 da Lei 6.880/80 (corte no FUNSA aos 21 anos).'}{' '}
                      Recomendamos estruturar o amparo privado com a Icatu Seguros e SulAmérica Saúde.
                    </p>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row items-center justify-between gap-3 p-4 rounded-xl bg-neutral-900 border border-neutral-800 text-xs">
                  <span className="text-neutral-300">
                    Deseja um dossiê detalhado e confidencial do seu contracheque no CTA?
                  </span>
                  <a
                    href="https://wa.me/5521994693673?text=Olá,%20assisti%20à%20palestra%20no%20CTA%20e%20gostaria%20de%20agendar%20meu%20diagnóstico%20patrimonial%20confidencial."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-neutral-950 font-bold transition-colors whitespace-nowrap cursor-pointer flex items-center gap-1.5"
                  >
                    <Phone className="w-3.5 h-3.5" />
                    <span>Falar no WhatsApp (21) 99469-3673</span>
                  </a>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Methodology Section */}
      <section id="metodologia" className="py-16 px-4 sm:px-6 lg:px-8 xl:px-12 max-w-[1600px] mx-auto space-y-8">
        <div className="max-w-4xl space-y-2">
          <span className="text-[11px] font-mono tracking-widest uppercase text-amber-400">
            METODOLOGIA CONSULTIVA ECOSEG (ADR-B-001)
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
            Compreensão Precede Qualquer Decisão
          </h2>
          <p className="text-xs sm:text-sm text-neutral-400">
            Diferente de corretores genéricos que vendem produtos prontos, nosso método respeita a carreira militar.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 text-xs">
          <div className="p-5 rounded-xl bg-neutral-900/50 border border-neutral-800 space-y-2">
            <span className="w-6 h-6 rounded-full bg-amber-500/20 text-amber-400 font-mono font-bold flex items-center justify-center text-xs">
              01
            </span>
            <h4 className="font-bold text-white text-sm">Escuta & Contexto</h4>
            <p className="text-neutral-400 leading-relaxed">
              Mapeamento da família, dependentes, histórico de carreira e momento da transição para a reserva.
            </p>
          </div>

          <div className="p-5 rounded-xl bg-neutral-900/50 border border-neutral-800 space-y-2">
            <span className="w-6 h-6 rounded-full bg-amber-500/20 text-amber-400 font-mono font-bold flex items-center justify-center text-xs">
              02
            </span>
            <h4 className="font-bold text-white text-sm">Auditoria Documental</h4>
            <p className="text-neutral-400 leading-relaxed">
              Conferência de rubricas no contracheque, opção de 1,5%, adicionais militares e elegibilidade legal.
            </p>
          </div>

          <div className="p-5 rounded-xl bg-neutral-900/50 border border-neutral-800 space-y-2">
            <span className="w-6 h-6 rounded-full bg-amber-500/20 text-amber-400 font-mono font-bold flex items-center justify-center text-xs">
              03
            </span>
            <h4 className="font-bold text-white text-sm">Desenho da Solução</h4>
            <p className="text-neutral-400 leading-relaxed">
              Prescrição sob medida de seguridade, saúde privada e blindagem sucessória sem inventário.
            </p>
          </div>

          <div className="p-5 rounded-xl bg-neutral-900/50 border border-neutral-800 space-y-2">
            <span className="w-6 h-6 rounded-full bg-amber-500/20 text-amber-400 font-mono font-bold flex items-center justify-center text-xs">
              04
            </span>
            <h4 className="font-bold text-white text-sm">Acompanhamento Vitalício</h4>
            <p className="text-neutral-400 leading-relaxed">
              Revisão periódica de coberturas e assistência direta aos beneficiários na liquidação em até 72h.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Footer Section */}
      {showFooter && <footer id="contato" className="border-t border-neutral-800/80 bg-neutral-950 py-12 px-4 sm:px-6 lg:px-8 xl:px-12 max-w-[1600px] mx-auto text-xs text-neutral-400">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-8 border-b border-neutral-800/80">
          <div className="space-y-2 text-center md:text-left">
            <EcoSegLogo size={32} finish="brass" tagline="PLANEJAMENTO & PROTEÇÃO PATRIMONIAL" />
            <p className="text-neutral-400 max-w-md pt-1">
              Atendimento exclusivo para a Família Militar no Clube dos Taifeiros da Aeronáutica (CTA) — Rio de Janeiro, RJ.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3">
            <button
              onClick={onOpenPresentation}
              className="px-4 py-2.5 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-white border border-neutral-800 font-semibold transition-colors cursor-pointer flex items-center gap-2"
            >
              <Presentation className="w-4 h-4 text-amber-400" />
              <span>Abrir Modo Apresentação</span>
            </button>

            <a
              href="https://wa.me/5521994693673"
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-neutral-950 font-bold transition-colors cursor-pointer flex items-center gap-2 shadow-md"
            >
              <Phone className="w-4 h-4" />
              <span>WhatsApp: (21) 99469-3673</span>
            </a>
          </div>
        </div>

        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-neutral-500 text-[11px] font-mono">
          <span>© 2026 ECOSEG Seguros & Consultoria Patrimonial · Base Operacional CTA-RJ</span>
          <div className="flex items-center gap-3">
            <span>Lei 13.954/2019</span>
            <span>·</span>
            <span>STF Tema 1175</span>
            <span>·</span>
            <span>LGPD Compilada</span>
          </div>
        </div>
      </footer>}

      {activeFlyerModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-3 backdrop-blur-md sm:p-6"
          onClick={() => setActiveFlyerModal(null)}
          role="presentation"
        >
          <div
            className="relative flex max-h-[92vh] w-full max-w-5xl flex-col overflow-hidden rounded-3xl border border-amber-500/40 bg-[#080D14] shadow-2xl md:flex-row"
            onClick={(event) => event.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-labelledby="flyer-modal-title"
          >
            <button
              type="button"
              onClick={() => setActiveFlyerModal(null)}
              className="absolute right-4 top-4 z-20 rounded-full border border-neutral-700 bg-black/70 p-2.5 text-neutral-300 transition-colors hover:bg-black hover:text-white"
              aria-label="Fechar detalhes"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="relative flex max-h-[48vh] flex-col overflow-hidden border-b border-neutral-800 bg-neutral-950 p-4 md:max-h-[92vh] md:w-1/2 md:border-b-0 md:border-r">
              <div className="relative z-10 mb-3 flex items-center justify-between gap-2">
                <div className="flex items-center gap-1 rounded-xl border border-neutral-800 bg-neutral-900/90 p-1">
                  <button
                    type="button"
                    onClick={() => {
                      setModalView('lifestyle');
                      setModalZoom(1);
                    }}
                    className={`rounded-lg px-3 py-1.5 text-[10px] font-semibold transition-colors ${
                      modalView === 'lifestyle' ? 'bg-neutral-700 text-white' : 'text-neutral-400 hover:text-white'
                    }`}
                  >
                    Foto conceitual
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setModalView('official');
                      setModalZoom(1);
                    }}
                    className={`rounded-lg px-3 py-1.5 text-[10px] font-semibold transition-colors ${
                      modalView === 'official' ? 'bg-amber-500 text-neutral-950' : 'text-neutral-400 hover:text-white'
                    }`}
                  >
                    Cartaz SUSEP
                  </button>
                </div>
                <div className="flex items-center gap-1 rounded-xl border border-neutral-800 bg-neutral-900/90 p-1">
                  <button type="button" onClick={() => setModalZoom((zoom) => Math.max(1, zoom - 0.25))} className="rounded-lg px-2 py-1 text-sm text-neutral-300 hover:bg-neutral-800" aria-label="Reduzir zoom">−</button>
                  <span className="min-w-10 text-center text-[10px] font-mono text-neutral-400">{Math.round(modalZoom * 100)}%</span>
                  <button type="button" onClick={() => setModalZoom((zoom) => Math.min(2.5, zoom + 0.25))} className="rounded-lg px-2 py-1 text-sm text-neutral-300 hover:bg-neutral-800" aria-label="Aumentar zoom">+</button>
                </div>
              </div>
              <div className="flex min-h-0 flex-1 items-center justify-center overflow-auto rounded-xl border border-neutral-800 p-2">
                <img
                  src={modalView === 'lifestyle' ? activeFlyerModal.lifestyleImage : activeFlyerModal.fullImage}
                  alt={modalView === 'lifestyle' ? activeFlyerModal.lifestyleAlt : `${activeFlyerModal.title} — encarte oficial em alta resolução`}
                  className="max-h-[78vh] w-full rounded-lg object-contain shadow-2xl transition-transform duration-200"
                  style={{ transform: `scale(${modalZoom})` }}
                />
              </div>
            </div>

            <div className="flex max-h-[44vh] flex-col justify-between space-y-6 overflow-y-auto p-6 sm:p-8 md:max-h-[92vh] md:w-1/2">
              <div className="space-y-4">
                <div className="inline-flex items-center gap-2 rounded-md border border-amber-500/30 bg-amber-500/10 px-3 py-1 text-[10px] font-mono font-bold uppercase tracking-wider text-amber-300">
                  <FileCheck className="h-3.5 w-3.5 text-amber-400" />
                  {activeFlyerModal.badge} · {activeFlyerModal.providerName}
                </div>

                <div>
                  <h3 id="flyer-modal-title" className="text-2xl font-bold tracking-tight text-white">{activeFlyerModal.title}</h3>
                  <p className="mt-0.5 text-xs font-medium text-neutral-400">{activeFlyerModal.subtitle}</p>
                </div>

                <div className="rounded-2xl border border-amber-500/30 bg-amber-500/10 p-3 text-sm font-semibold italic text-amber-200">
                  “{activeFlyerModal.slogan}”
                </div>

                <div className="space-y-1">
                  <span className="text-[10.5px] font-mono uppercase tracking-wider text-neutral-400">Elegibilidade & público</span>
                  <p className="text-xs font-medium text-neutral-200">{activeFlyerModal.publicoAlvo}</p>
                </div>

                <div className="space-y-2">
                  <span className="text-[10.5px] font-mono uppercase tracking-wider text-neutral-400">Destaques do plano</span>
                  <ul className="space-y-2 text-xs text-neutral-300">
                    {activeFlyerModal.destaques.map((item) => (
                      <li key={item} className="flex items-start gap-2 leading-relaxed">
                        <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-400" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="space-y-3 border-t border-neutral-800 pt-4">
                <div className="text-[10px] font-mono leading-tight text-neutral-500">{activeFlyerModal.susep}</div>
                <div className="flex flex-col items-center gap-3 sm:flex-row">
                  <a
                    href={`https://wa.me/5521994693673?text=${encodeURIComponent(activeFlyerModal.whatsappMessage)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-500 px-5 py-3 text-xs font-bold text-neutral-950 shadow-lg transition-colors hover:bg-emerald-400"
                  >
                    <Phone className="h-4 w-4" />
                    Falar com consultor no WhatsApp
                  </a>
                  <button
                    type="button"
                    onClick={() => setActiveFlyerModal(null)}
                    className="w-full rounded-xl border border-neutral-800 bg-neutral-900 px-4 py-3 text-center text-xs font-semibold text-neutral-300 transition-colors hover:bg-neutral-800 sm:w-auto"
                  >
                    Fechar
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
