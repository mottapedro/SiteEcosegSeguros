"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  Expand,
  Home,
  Minimize,
} from "lucide-react";
import type { PresentationContent } from "@/contracts/presentation";

interface PresentationDeckProps {
  presentation: PresentationContent;
}

export function PresentationDeck({
  presentation,
}: PresentationDeckProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const section = presentation.sections[activeIndex];
  const isFirst = activeIndex === 0;
  const isLast = activeIndex === presentation.sections.length - 1;

  const goPrevious = useCallback(() => {
    setActiveIndex((current) => Math.max(0, current - 1));
  }, []);

  const goNext = useCallback(() => {
    setActiveIndex((current) =>
      Math.min(presentation.sections.length - 1, current + 1)
    );
  }, [presentation.sections.length]);

  useEffect(() => {
    const siteChrome = Array.from(
      document.querySelectorAll<HTMLElement>(
        "body > header, body > footer, body > a"
      )
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

      if (
        event.key === "ArrowRight" ||
        event.key === "PageDown" ||
        event.key === " "
      ) {
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
    <div className="bg-accent text-accent-foreground fixed inset-0 z-[100] flex min-h-dvh flex-col overflow-hidden">
      <div
        className="bg-primary h-1.5 transition-[width] duration-300 motion-reduce:transition-none"
        style={{ width: `${progress}%` }}
        aria-hidden
      />

      <header className="flex items-center justify-between gap-4 px-5 py-4 sm:px-8">
        <Link
          href="/palestra/protecao-familia-militar"
          className="inline-flex items-center gap-2 text-sm font-medium opacity-80 transition-opacity hover:opacity-100"
        >
          <Home className="size-4" aria-hidden />
          <span className="hidden sm:inline">Página da palestra</span>
        </Link>

        <div className="text-center">
          <p className="text-xs font-semibold tracking-[0.16em] uppercase opacity-70">
            ECOSEG · Modo apresentação
          </p>
          <p className="mt-1 font-mono text-xs opacity-65">
            {presentation.version}
          </p>
        </div>

        <button
          type="button"
          onClick={toggleFullscreen}
          className="rounded-md p-2 transition-colors hover:bg-white/10 focus-visible:ring-2 focus-visible:ring-white"
          aria-label={isFullscreen ? "Sair da tela cheia" : "Usar tela cheia"}
        >
          {isFullscreen ? (
            <Minimize className="size-5" aria-hidden />
          ) : (
            <Expand className="size-5" aria-hidden />
          )}
        </button>
      </header>

      <main
        className="mx-auto flex w-full max-w-7xl flex-1 items-center px-6 py-8 sm:px-10 lg:px-14"
        aria-live="polite"
      >
        <article className="w-full">
          <p className="text-primary-foreground text-sm font-semibold tracking-[0.2em] uppercase">
            {section.eyebrow}
          </p>
          <h1 className="mt-5 max-w-5xl text-4xl leading-[1.08] font-bold tracking-tight sm:text-6xl lg:text-7xl">
            {section.title}
          </h1>
          <p className="mt-7 max-w-4xl text-lg leading-8 opacity-80 sm:text-2xl sm:leading-10">
            {section.summary}
          </p>

          <ul className="mt-9 grid max-w-6xl gap-3 text-base sm:grid-cols-3 sm:text-lg">
            {section.talkingPoints.map((point) => (
              <li
                key={point}
                className="border-l-2 border-white/30 pl-4 leading-7"
              >
                {point}
              </li>
            ))}
          </ul>
        </article>
      </main>

      <footer className="border-t border-white/15 px-5 py-4 sm:px-8">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4">
          <p className="hidden max-w-2xl text-xs leading-5 opacity-60 md:block">
            {presentation.disclaimer}
          </p>

          <div className="ml-auto flex items-center gap-3">
            <span className="min-w-16 text-center font-mono text-sm opacity-70">
              {activeIndex + 1} / {presentation.sections.length}
            </span>
            <button
              type="button"
              onClick={goPrevious}
              disabled={isFirst}
              className="rounded-md border border-white/25 p-3 transition-colors hover:bg-white/10 focus-visible:ring-2 focus-visible:ring-white disabled:cursor-not-allowed disabled:opacity-30"
              aria-label="Voltar seção"
            >
              <ArrowLeft className="size-5" aria-hidden />
            </button>
            <button
              type="button"
              onClick={goNext}
              disabled={isLast}
              className="bg-primary text-primary-foreground rounded-md p-3 transition-opacity hover:opacity-85 focus-visible:ring-2 focus-visible:ring-white disabled:cursor-not-allowed disabled:opacity-30"
              aria-label="Avançar seção"
            >
              <ArrowRight className="size-5" aria-hidden />
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}
