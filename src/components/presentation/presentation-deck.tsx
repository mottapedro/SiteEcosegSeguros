"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Expand, Home, Minimize } from "lucide-react";
import type { PresentationContent } from "@/contracts/presentation";

interface PresentationDeckProps {
  presentation: PresentationContent;
}

export function PresentationDeck({ presentation }: PresentationDeckProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const section = presentation.sections[activeIndex];
  const isFirst = activeIndex === 0;
  const isLast = activeIndex === presentation.sections.length - 1;

  const goPrevious = useCallback(() => {
    setActiveIndex((current) => Math.max(0, current - 1));
  }, []);

  const goNext = useCallback(() => {
    setActiveIndex((current) => Math.min(presentation.sections.length - 1, current + 1));
  }, [presentation.sections.length]);

  useEffect(() => {
    const siteChrome = Array.from(
      document.querySelectorAll<HTMLElement>("body > header, body > footer, body > a")
    );

    const previousState = siteChrome.map((element) => ({
      element,
      ariaHidden: element.getAttribute("aria-hidden"),
      inert: element.inert,
    }));

    siteChrome.forEach((element) => {
      element.setAttribute("aria-hidden", "true");
      element.inert = true;
    });

    return () => {
      previousState.forEach(({ element, ariaHidden, inert }) => {
        if (ariaHidden === null) {
          element.removeAttribute("aria-hidden");
        } else {
          element.setAttribute("aria-hidden", ariaHidden);
        }

        element.inert = inert;
      });
    };
  }, []);

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "ArrowLeft" || event.key === "PageUp") {
        goPrevious();
      }

      if (event.key === "ArrowRight" || event.key === "PageDown" || event.key === " ") {
        event.preventDefault();
        goNext();
      }

      if (event.key === "Home") {
        setActiveIndex(0);
      }

      if (event.key === "End") {
        setActiveIndex(presentation.sections.length - 1);
      }
    }

    function handleFullscreenChange() {
      setIsFullscreen(Boolean(document.fullscreenElement));
    }

    window.addEventListener("keydown", handleKeyDown);
    document.addEventListener("fullscreenchange", handleFullscreenChange);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
    };
  }, [goNext, goPrevious, presentation.sections.length]);

  async function toggleFullscreen() {
    if (!document.fullscreenElement) {
      await document.documentElement.requestFullscreen();
      return;
    }

    await document.exitFullscreen();
  }

  const progress = ((activeIndex + 1) / presentation.sections.length) * 100;

  return (
    <div className="fixed inset-0 z-[100] flex min-h-dvh flex-col overflow-hidden bg-[#0B132B] font-sans text-[#F4F7FB] selection:bg-[#D4AF37]/25 selection:text-[#F6D978]">
      {/* Brass progress line: the only full-width active accent on the stage. */}
      <div
        className="h-1.5 bg-[#D4AF37] transition-[width] duration-300 motion-reduce:transition-none"
        style={{ width: `${progress}%` }}
        aria-hidden
      />

      <header className="flex items-center justify-between gap-4 border-b border-[#2A3A60] bg-[#0E1935]/95 px-6 py-4 backdrop-blur-md sm:px-8">
        <Link
          href="/palestra/protecao-familia-militar"
          className="inline-flex shrink-0 items-center gap-2 text-xs font-semibold text-[#AEBBD4] transition-colors hover:text-[#F6D978] focus-visible:ring-2 focus-visible:ring-[#D4AF37] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0E1935] focus-visible:outline-none"
        >
          <Home className="size-4" aria-hidden />
          <span className="hidden sm:inline">Página da palestra</span>
        </Link>

        <div className="min-w-0 text-center">
          <div className="flex items-center justify-center gap-3">
            <span
              className="size-1.5 shrink-0 animate-pulse rounded-full bg-[#D4AF37]"
              aria-hidden
            />
            <p className="truncate text-xs font-bold tracking-[0.16em] text-[#F6D978] uppercase">
              EcoSeg · Modo Apresentação
            </p>
          </div>
          <p className="mt-1 font-mono text-xs text-[#7182A5]">{presentation.version}</p>
        </div>

        <button
          type="button"
          onClick={toggleFullscreen}
          className="shrink-0 rounded-lg p-2 text-[#AEBBD4] transition-colors hover:bg-[#182747] hover:text-white focus-visible:ring-2 focus-visible:ring-[#D4AF37] focus-visible:outline-none"
          aria-label={isFullscreen ? "Sair da tela cheia" : "Usar tela cheia"}
        >
          {isFullscreen ? (
            <Minimize className="size-4" aria-hidden />
          ) : (
            <Expand className="size-4" aria-hidden />
          )}
        </button>
      </header>

      <main
        className="mx-auto flex w-full max-w-6xl flex-1 items-center px-6 py-10 sm:px-12"
        aria-live="polite"
      >
        <article className="w-full space-y-6">
          <div className="inline-flex items-center rounded-full border border-[#D4AF37]/45 bg-[#D4AF37]/10 px-3 py-1 text-xs font-bold tracking-[0.16em] text-[#F6D978] uppercase">
            {section.eyebrow}
          </div>

          <h1
            className={`text-3xl leading-[1.12] font-bold tracking-tight text-white sm:text-5xl lg:text-6xl ${
              section.type === "OPENING" ? "text-[#F6D978]" : ""
            }`}
          >
            {section.title}
          </h1>

          <p className="max-w-4xl text-base leading-relaxed font-normal text-[#D8E1F0] sm:text-xl">
            {section.summary}
          </p>

          <div className="grid grid-cols-1 gap-4 pt-6 sm:grid-cols-3">
            {section.talkingPoints.map((point, index) => (
              <div
                key={point}
                className="flex flex-col justify-between rounded-2xl border border-[#2A3A60] bg-[#111D3A] p-5 shadow-[0_12px_30px_rgba(3,8,24,0.28)] transition-colors hover:border-[#D4AF37]/60"
              >
                <div className="mb-3 flex items-center justify-between font-mono text-xs text-[#7182A5]">
                  <span className="font-bold text-[#D4AF37]">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="size-1.5 rounded-full bg-[#3B4D76]" />
                </div>
                <p className="text-sm leading-snug text-[#F4F7FB]">{point}</p>
              </div>
            ))}
          </div>
        </article>
      </main>

      <footer className="border-t border-[#2A3A60] bg-[#0E1935]/95 px-6 py-4 sm:px-8">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4">
          <p className="hidden max-w-2xl text-[11px] leading-relaxed text-[#8F9FBD] md:block">
            {presentation.disclaimer}
          </p>

          <div className="ml-auto flex items-center gap-3">
            <span className="min-w-16 text-center font-mono text-xs font-semibold text-[#AEBBD4]">
              {activeIndex + 1} / {presentation.sections.length}
            </span>
            <button
              type="button"
              onClick={goPrevious}
              disabled={isFirst}
              className="rounded-xl border border-[#3B4D76] bg-[#111D3A] p-2.5 text-[#D8E1F0] transition-colors hover:bg-[#182747] hover:text-white focus-visible:ring-2 focus-visible:ring-[#D4AF37] focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-30"
              aria-label="Voltar seção"
            >
              <ArrowLeft className="size-4" aria-hidden />
            </button>
            <button
              type="button"
              onClick={goNext}
              disabled={isLast}
              className="rounded-xl bg-[#D4AF37] p-2.5 font-bold text-[#0B132B] shadow-[0_8px_20px_rgba(212,175,55,0.2)] transition-colors hover:bg-[#E3C45A] focus-visible:ring-2 focus-visible:ring-[#F6D978] focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-30"
              aria-label="Avançar seção"
            >
              <ArrowRight className="size-4" aria-hidden />
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}
