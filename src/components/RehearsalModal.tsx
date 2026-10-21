'use client';

/* eslint-disable react/no-unescaped-entities */

import React, { useState, useEffect } from 'react';
import { LECTURE_FULL_SLIDES, generatePptx, SlideData } from '../services/pptxGenerator';
import { generateMobileSpeakerGuidePdf } from '../services/pdfGenerator';
import { EcoSegLogo } from './brand/EcoSegLogo';
import {
  X,
  Play,
  Pause,
  RotateCcw,
  ChevronLeft,
  ChevronRight,
  Download,
  Clock,
  BookOpen,
  Maximize2,
  Minimize2,
  CheckCircle2,
  AlertCircle,
  Smartphone,
  ZoomIn,
  ZoomOut
} from 'lucide-react';

interface RehearsalModalProps {
  isOpen: boolean;
  onClose: () => void;
  customSlides?: SlideData[];
  isStandalone?: boolean;
}

export const RehearsalModal: React.FC<RehearsalModalProps> = ({
  isOpen,
  onClose,
  customSlides,
  isStandalone = false
}) => {
  const [currentSlideIndex, setCurrentSlideIndex] = useState<number>(0);
  const [showNotes, setShowNotes] = useState<boolean>(true);
  const [isTimerRunning, setIsTimerRunning] = useState<boolean>(false);
  const [elapsedSeconds, setElapsedSeconds] = useState<number>(0);
  const [isGeneratingPptx, setIsGeneratingPptx] = useState<boolean>(false);
  const [downloadSuccess, setDownloadSuccess] = useState<boolean>(false);
  const [isGeneratingPdf, setIsGeneratingPdf] = useState<boolean>(false);
  const [downloadPdfSuccess, setDownloadPdfSuccess] = useState<boolean>(false);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [notesFontSize, setNotesFontSize] = useState<'normal' | 'large' | 'xlarge'>('normal');

  const slides = customSlides && customSlides.length > 0 ? customSlides : LECTURE_FULL_SLIDES;
  const currentSlide = slides[currentSlideIndex] || slides[0];

  // Timer logic
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (isTimerRunning) {
      interval = setInterval(() => {
        setElapsedSeconds((prev) => prev + 1);
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isTimerRunning]);

  // Fullscreen change listener
  useEffect(() => {
    const handleFsChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener('fullscreenchange', handleFsChange);
    return () => document.removeEventListener('fullscreenchange', handleFsChange);
  }, []);

  // Keyboard navigation
  useEffect(() => {
    if (!isOpen && !isStandalone) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === ' ') {
        e.preventDefault();
        setCurrentSlideIndex((prev) => Math.min(slides.length - 1, prev + 1));
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        setCurrentSlideIndex((prev) => Math.max(0, prev - 1));
      } else if (e.key === 'Escape' && !isStandalone) {
        onClose();
      } else if (e.key.toLowerCase() === 'n') {
        setShowNotes((prev) => !prev);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, isStandalone, onClose, slides.length]);

  if (!isOpen && !isStandalone) return null;

  const toggleFullscreen = async () => {
    try {
      if (!document.fullscreenElement) {
        await document.documentElement.requestFullscreen();
      } else {
        await document.exitFullscreen();
      }
    } catch (err) {
      console.warn('Erro ao alternar tela cheia:', err);
    }
  };

  const formatTime = (totalSeconds: number) => {
    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleDownloadPptx = async () => {
    try {
      setIsGeneratingPptx(true);
      await generatePptx(slides);
      setDownloadSuccess(true);
      setTimeout(() => setDownloadSuccess(false), 3500);
    } catch (err) {
      console.error('Erro gerando PPTX:', err);
    } finally {
      setIsGeneratingPptx(false);
    }
  };

  const handleDownloadPdf = async () => {
    try {
      setIsGeneratingPdf(true);
      await generateMobileSpeakerGuidePdf(slides);
      setDownloadPdfSuccess(true);
      setTimeout(() => setDownloadPdfSuccess(false), 3500);
    } catch (err) {
      console.error('Erro gerando PDF:', err);
    } finally {
      setIsGeneratingPdf(false);
    }
  };

  const totalAllocatedMinutes = slides.reduce((acc, s) => acc + s.timeAllocationMinutes, 0);

  const getNotesTextClass = () => {
    switch (notesFontSize) {
      case 'large':
        return 'text-sm leading-relaxed';
      case 'xlarge':
        return 'text-base leading-loose font-medium';
      default:
        return 'text-xs leading-relaxed';
    }
  };

  return (
    <div
      className={`${
        isStandalone ? 'relative w-full min-h-[calc(100vh-4rem)] flex flex-col' : 'fixed inset-0 z-50 flex flex-col'
      } bg-[#05080E] text-neutral-100 overflow-hidden select-none`}
    >
      {/* Top Rehearsal Toolbar matching Image 1 */}
      <header className="h-14 border-b border-neutral-800 bg-neutral-950 px-4 md:px-6 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
            <h2 className="text-sm font-bold text-white tracking-wide">
              Modo Ensaio da Palestra · EcoSeg
            </h2>
          </div>
          <span className="hidden sm:inline-block text-xs text-neutral-500 font-mono">
            (Pressione Espaço / Setas para avançar, 'N' para notas)
          </span>
        </div>

        {/* Stopwatch & Controls */}
        <div className="flex items-center gap-2.5 sm:gap-3">
          <div className="flex items-center gap-2 bg-neutral-900 border border-neutral-800 rounded-lg px-3 py-1">
            <Clock className="w-3.5 h-3.5 text-amber-400" />
            <span className="font-mono text-xs font-semibold text-white w-12 text-center">
              {formatTime(elapsedSeconds)}
            </span>
            <span className="text-[10px] text-neutral-500 font-mono">
              / ~{totalAllocatedMinutes}min
            </span>

            <button
              onClick={() => setIsTimerRunning(!isTimerRunning)}
              title={isTimerRunning ? 'Pausar Cronômetro' : 'Iniciar Cronômetro'}
              className="p-1 text-neutral-300 hover:text-white rounded hover:bg-neutral-800 cursor-pointer ml-1"
            >
              {isTimerRunning ? <Pause className="w-3.5 h-3.5 text-amber-400" /> : <Play className="w-3.5 h-3.5 text-emerald-400" />}
            </button>
            <button
              onClick={() => {
                setIsTimerRunning(false);
                setElapsedSeconds(0);
              }}
              title="Zerar Cronômetro"
              className="p-1 text-neutral-400 hover:text-white rounded hover:bg-neutral-800 cursor-pointer"
            >
              <RotateCcw className="w-3 h-3" />
            </button>
          </div>

          {/* Toggle Notes Button */}
          <button
            onClick={() => setShowNotes(!showNotes)}
            className={`flex items-center gap-1.5 px-2.5 py-1 text-xs rounded-lg border transition-colors cursor-pointer ${
              showNotes
                ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                : 'bg-neutral-900 text-neutral-400 border-neutral-800 hover:text-white'
            }`}
            title="Alternar visibilidade das notas do orador (Atalho: tecla N)"
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>Notas do João</span>
          </button>

          {/* Download PPTX Button */}
          <button
            onClick={handleDownloadPptx}
            disabled={isGeneratingPptx}
            className="flex items-center gap-1.5 px-3 py-1 text-xs font-semibold rounded-lg bg-amber-400 hover:bg-amber-300 text-neutral-950 transition-all cursor-pointer shadow-md disabled:opacity-50"
            title="Baixar slides em formato PowerPoint (.pptx) com notas"
          >
            {isGeneratingPptx ? (
              <>
                <span className="w-3 h-3 border-2 border-neutral-950 border-t-transparent rounded-full animate-spin" />
                <span>Gerando PPT...</span>
              </>
            ) : downloadSuccess ? (
              <>
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-800" />
                <span>Baixado!</span>
              </>
            ) : (
              <>
                <Download className="w-3.5 h-3.5" />
                <span>Baixar PPTX</span>
              </>
            )}
          </button>

          {/* Download PDF Celular Button */}
          <button
            onClick={handleDownloadPdf}
            disabled={isGeneratingPdf}
            className="flex items-center gap-1.5 px-3 py-1 text-xs font-semibold rounded-lg bg-neutral-900 hover:bg-neutral-800 text-neutral-200 border border-neutral-700 transition-all cursor-pointer shadow-md disabled:opacity-50"
            title="Baixar Roteiro Exclusivo do Palestrante em formato PDF otimizado para leitura no Celular"
          >
            {isGeneratingPdf ? (
              <>
                <span className="w-3 h-3 border-2 border-amber-400 border-t-transparent rounded-full animate-spin" />
                <span>Gerando PDF...</span>
              </>
            ) : downloadPdfSuccess ? (
              <>
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                <span>PDF Baixado!</span>
              </>
            ) : (
              <>
                <Smartphone className="w-3.5 h-3.5 text-amber-400" />
                <span>PDF Celular</span>
              </>
            )}
          </button>

          {/* Fullscreen Button */}
          <button
            onClick={toggleFullscreen}
            className="hidden md:flex p-1.5 text-neutral-400 hover:text-white rounded-lg hover:bg-neutral-800 transition-colors cursor-pointer"
            title={isFullscreen ? 'Sair da tela cheia' : 'Entrar em tela cheia (ideal para o púlpito)'}
          >
            {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
          </button>

          {/* Close Modal / Return to Site */}
          <button
            onClick={onClose}
            className="p-1.5 text-neutral-400 hover:text-white rounded-lg hover:bg-neutral-800 transition-colors cursor-pointer ml-1"
            title={isStandalone ? 'Voltar' : 'Fechar Ensaio'}
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </header>

      {/* Main Presentation Stage & Notes Grid matching Image 1 */}
      <div className="flex-1 flex overflow-hidden">
        {/* Slide Stage (16:9 Canvas) */}
        <div className="flex-1 flex flex-col items-center justify-center p-4 md:p-8 bg-[#04060A] overflow-y-auto">
          <div className="w-full max-w-5xl aspect-[16/9] bg-[#080D14] rounded-2xl border border-neutral-800/80 shadow-2xl p-6 md:p-12 flex flex-col justify-between relative overflow-hidden select-none">
            {/* Top gold line accent */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-500 via-amber-300 to-amber-600" />

            {/* Slide Top Bar */}
            <div className="flex items-center justify-between border-b border-neutral-800/80 pb-3">
              <div className="flex items-center gap-3">
                <EcoSegLogo variant="primary" size={28} finish="brass" />
              </div>
              <div className="text-right">
                <span className="text-[11px] font-mono font-bold tracking-widest text-amber-400 block uppercase">
                  {currentSlide.act}
                </span>
                <span className="text-[10px] text-neutral-500 font-mono tracking-wider">
                  {currentSlide.kicker}
                </span>
              </div>
            </div>

            {/* Main Slide Content */}
            <div className="my-auto py-3 space-y-4">
              <h1 className="text-2xl md:text-4xl font-bold tracking-tight text-white leading-tight">
                {currentSlide.title}
              </h1>
              <p className="text-sm md:text-base text-neutral-300 max-w-3xl leading-relaxed">
                {currentSlide.subtitle}
              </p>

              {/* Points & Metric */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center pt-2">
                <div className={`${currentSlide.metric ? 'md:col-span-8' : 'md:col-span-12'} space-y-2`}>
                  {currentSlide.points.map((pt, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 text-xs md:text-sm text-neutral-200">
                      <div className="w-1.5 h-1.5 rounded-full bg-amber-400 mt-2 shrink-0" />
                      <span className="leading-snug">{pt}</span>
                    </div>
                  ))}
                </div>

                {currentSlide.metric && (
                  <div className="md:col-span-4 p-5 rounded-xl bg-neutral-900/90 border border-amber-500/30 text-center shadow-lg">
                    <span className="text-3xl md:text-5xl font-mono font-bold text-amber-300 block tracking-tight">
                      {currentSlide.metric.value}
                    </span>
                    <span className="text-[11px] text-neutral-300 leading-tight block mt-1.5">
                      {currentSlide.metric.label}
                    </span>
                  </div>
                )}
              </div>

              {currentSlide.citation && (
                <div className="border-l-2 border-amber-400 pl-3 pt-1">
                  <p className="text-xs md:text-sm italic font-serif text-amber-200/90">
                    {currentSlide.citation}
                  </p>
                </div>
              )}
            </div>

            {/* Slide Footer */}
            <div className="flex items-center justify-between border-t border-neutral-800/80 pt-3 text-[11px] text-neutral-500 font-mono">
              <span>EcoSeg Consultoria Patrimonial · Rio de Janeiro</span>
              <span className="text-amber-400 font-semibold">
                Slide 0{currentSlideIndex + 1} de 0{slides.length}
              </span>
            </div>
          </div>

          {/* Bottom Slide Nav & Fast Jump */}
          <div className="flex items-center justify-between w-full max-w-5xl pt-4">
            <button
              onClick={() => setCurrentSlideIndex((prev) => Math.max(0, prev - 1))}
              disabled={currentSlideIndex === 0}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-neutral-800 bg-neutral-900 text-neutral-300 hover:text-white disabled:opacity-30 cursor-pointer text-xs transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Slide Anterior</span>
            </button>

            {/* Thumb indicators */}
            <div className="flex items-center gap-1.5">
              {slides.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentSlideIndex(idx)}
                  className={`w-3 h-3 rounded-full transition-all cursor-pointer ${
                    currentSlideIndex === idx
                      ? 'bg-amber-400 scale-125'
                      : 'bg-neutral-800 hover:bg-neutral-600'
                  }`}
                  title={`Ir para o slide ${idx + 1}`}
                />
              ))}
            </div>

            <button
              onClick={() => setCurrentSlideIndex((prev) => Math.min(slides.length - 1, prev + 1))}
              disabled={currentSlideIndex === slides.length - 1}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-neutral-800 bg-neutral-900 text-neutral-300 hover:text-white disabled:opacity-30 cursor-pointer text-xs transition-colors"
            >
              <span>Próximo Slide</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Speaker Notes Sidebar (Drawer) matching Image 1 */}
        {showNotes && (
          <aside className="w-80 md:w-96 lg:w-[420px] border-l border-neutral-800 bg-neutral-950 p-5 flex flex-col justify-between overflow-y-auto shrink-0 shadow-2xl">
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-neutral-800 pb-3">
                <div className="flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-amber-400" />
                  <h3 className="text-xs font-bold uppercase tracking-wider text-white">
                    ROTEIRO DO PALESTRANTE (JOÃO)
                  </h3>
                </div>
                
                <div className="flex items-center gap-2">
                  {/* Font size adjuster for standing pulpit reading */}
                  <div className="flex items-center gap-1 bg-neutral-900 rounded-md p-0.5 border border-neutral-800">
                    <button
                      onClick={() =>
                        setNotesFontSize((prev) =>
                          prev === 'xlarge' ? 'large' : prev === 'large' ? 'normal' : 'normal'
                        )
                      }
                      title="Diminuir fonte das notas"
                      className="p-1 text-neutral-400 hover:text-white rounded cursor-pointer"
                    >
                      <ZoomOut className="w-3 h-3" />
                    </button>
                    <button
                      onClick={() =>
                        setNotesFontSize((prev) =>
                          prev === 'normal' ? 'large' : prev === 'large' ? 'xlarge' : 'xlarge'
                        )
                      }
                      title="Aumentar fonte das notas para leitura em pé"
                      className="p-1 text-neutral-400 hover:text-white rounded cursor-pointer"
                    >
                      <ZoomIn className="w-3 h-3" />
                    </button>
                  </div>

                  <span className="text-[10px] font-mono bg-amber-500/10 text-amber-400 px-2 py-0.5 rounded border border-amber-500/20 font-semibold">
                    ~{currentSlide.timeAllocationMinutes} min
                  </span>
                </div>
              </div>

              {/* Current Slide Info */}
              <div>
                <span className="text-[10px] font-mono text-neutral-500 uppercase block">
                  ATO ATUAL
                </span>
                <h4 className="text-sm font-semibold text-white mt-0.5">
                  {currentSlide.act}
                </h4>
              </div>

              {/* Speaker Notes Card */}
              <div className="p-4 bg-neutral-900/80 border border-neutral-800 rounded-xl space-y-2.5">
                <span className="text-[10px] font-mono text-amber-400 uppercase tracking-widest block font-bold">
                  PONTOS DE FALA & TOM DE VOZ
                </span>
                <div className={`text-neutral-200 whitespace-pre-line font-sans ${getNotesTextClass()}`}>
                  {currentSlide.speakerNotes}
                </div>
              </div>

              {/* Military Context Tip */}
              <div className="p-3 bg-neutral-900/40 border border-neutral-800/80 rounded-lg space-y-1 text-xs">
                <span className="text-neutral-300 font-semibold flex items-center gap-1.5 text-[11px]">
                  <AlertCircle className="w-3.5 h-3.5 text-amber-400" />
                  Lembrete de Postura Militar:
                </span>
                <p className="text-neutral-400 text-[11px] leading-snug">
                  Manter tom sereno, técnico e firme. Conexão de filho de militar para famílias de militares: a missão só termina quando a retaguarda familiar está protegida.
                </p>
              </div>
            </div>

            {/* Rehearsal Tips at bottom */}
            <div className="pt-4 border-t border-neutral-800 text-[11px] text-neutral-500 space-y-1">
              <p>
                💡 <strong>Dica de palco:</strong> Olhe para os veteranos e pensionistas ao mencionar os entes queridos. Faça uma pausa de 2 segundos antes de afirmar: <em>"Estamos aqui pra apresentar soluções para as famílias."</em>
              </p>
            </div>
          </aside>
        )}
      </div>
    </div>
  );
};
