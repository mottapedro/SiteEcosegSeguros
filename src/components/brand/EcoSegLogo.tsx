import React from "react";

export type LogoVariant = "primary" | "stacked" | "symbol-only" | "seal";
export type SymbolFinish = "brass" | "platinum" | "carbon" | "emerald";
export type BackgroundSurface = "obsidian" | "slate" | "pearl";

interface EcoSegLogoProps {
  variant?: LogoVariant;
  surface?: BackgroundSurface;
  finish?: SymbolFinish;
  showGrid?: boolean;
  strokeWidth?: number;
  size?: number;
  tagline?: string;
  className?: string;
  id?: string;
}

export const EcoSegLogo: React.FC<EcoSegLogoProps> = ({
  variant = "primary",
  surface = "obsidian",
  finish = "brass",
  showGrid = false,
  strokeWidth = 2,
  size = 38,
  tagline = "PLANEJAMENTO & PROTEÇÃO PATRIMONIAL",
  className = "",
  id = "ecoseg-logo-svg",
}) => {
  const finishColors: Record<
    SymbolFinish,
    { primary: string; secondary: string; glow: string; text: string }
  > = {
    brass: {
      primary: "#C5A880",
      secondary: "#E8D5BC",
      glow: "rgba(197, 168, 128, 0.15)",
      text: surface === "pearl" ? "#18202A" : "#FFFFFF",
    },
    platinum: {
      primary: "#FFFFFF",
      secondary: "#E2E8F0",
      glow: "rgba(255, 255, 255, 0.1)",
      text: surface === "pearl" ? "#0F172A" : "#FFFFFF",
    },
    carbon: {
      primary: "#0F172A",
      secondary: "#334155",
      glow: "rgba(15, 23, 42, 0.08)",
      text: "#0F172A",
    },
    emerald: {
      primary: "#34D399",
      secondary: "#10B981",
      glow: "rgba(52, 211, 153, 0.15)",
      text: surface === "pearl" ? "#18202A" : "#FFFFFF",
    },
  };

  const colors = finishColors[finish];

  // Símbolo Arquitetural EcoSeg (Horizonte Geométrico & Monólito de Compreensão - ADR-B-001)
  const renderSymbol = (symbolSize: number, customId = "sym") => (
    <svg
      width={symbolSize}
      height={symbolSize}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="shrink-0 transition-transform duration-300"
      id={`${id}-${customId}`}
      aria-hidden="true"
    >
      <defs>
        <linearGradient
          id={`${id}-${customId}-brass-grad`}
          x1="0%"
          y1="0%"
          x2="100%"
          y2="100%"
        >
          <stop offset="0%" stopColor="#E8D5BC" />
          <stop offset="35%" stopColor="#D4B892" />
          <stop offset="70%" stopColor="#C5A880" />
          <stop offset="100%" stopColor="#9B7C50" />
        </linearGradient>
      </defs>

      {/* 1. Viga Estrutural de Fundação (Apoio e Firmeza) */}
      <rect
        x="18"
        y="75"
        width="64"
        height="5.5"
        rx="2"
        fill={`url(#${id}-${customId}-brass-grad)`}
      />

      {/* 2. Coluna Âncora de Compreensão (Monólito Esquerdo com capitel sutil) */}
      <rect
        x="18"
        y="22"
        width="5.5"
        height="53"
        rx="1.5"
        fill={`url(#${id}-${customId}-brass-grad)`}
      />
      {/* Capitel sutil da coluna */}
      <rect
        x="15.5"
        y="21"
        width="10.5"
        height="3"
        rx="1"
        fill={`url(#${id}-${customId}-brass-grad)`}
      />

      {/* 3. Arco do Horizonte e Abertura (Visão Ampla e Dinamismo 'S' / 'E') */}
      <path
        d="M 20 28 C 36 17, 65 17, 76 27 C 82 31, 82 39, 75 43 C 67 47, 46 47, 36 52 C 26 57, 26 67, 36 71 C 46 75, 66 75, 78 71"
        stroke={`url(#${id}-${customId}-brass-grad)`}
        strokeWidth="5.2"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />

      {/* 4. Pivot Diamante Central (Inteligência & Decisão) */}
      <polygon points="50,43 56,49 50,55 44,49" fill="#E8D5BC" />

      {/* 5. Acento Meridiano Superior */}
      <circle cx="72" cy="29" r="2" fill="#C5A880" />
    </svg>
  );

  if (variant === "primary") {
    return (
      <div className={`inline-flex items-center gap-3.5 ${className}`} id={id}>
        {renderSymbol(size, "prim")}
        <div className="flex flex-col justify-center select-none">
          <div
            className="flex items-baseline text-xl leading-none font-bold tracking-[0.14em]"
            style={{ color: colors.text }}
          >
            ECOSEG
          </div>
          {tagline && (
            <span
              className="mt-1 text-[8px] leading-none font-medium tracking-[0.24em] uppercase sm:text-[8.5px]"
              style={{ color: "#C5A880" }}
            >
              {tagline}
            </span>
          )}
        </div>
      </div>
    );
  }

  if (variant === "stacked") {
    return (
      <div
        className={`inline-flex flex-col items-center p-4 text-center ${className}`}
        id={id}
      >
        {renderSymbol(size, "stack")}
        <div
          className="mt-3 flex items-baseline text-2xl leading-none font-bold tracking-[0.2em]"
          style={{ color: colors.text }}
        >
          ECOSEG
        </div>
        <div className="my-2 h-[1px] w-8 bg-[#C5A880] opacity-40" />
        <span
          className="text-[9px] leading-tight font-medium tracking-[0.26em] uppercase"
          style={{ color: "#C5A880" }}
        >
          {tagline}
        </span>
      </div>
    );
  }

  if (variant === "symbol-only") {
    return (
      <div className={`inline-flex items-center justify-center ${className}`} id={id}>
        {renderSymbol(size, "only")}
      </div>
    );
  }

  return (
    <div className={`inline-flex items-center gap-3.5 ${className}`} id={id}>
      {renderSymbol(size, "prim")}
      <div className="flex flex-col justify-center select-none">
        <div
          className="flex items-baseline text-xl leading-none font-bold tracking-[0.14em]"
          style={{ color: colors.text }}
        >
          ECOSEG
        </div>
        {tagline && (
          <span
            className="mt-1 text-[8px] leading-none font-medium tracking-[0.24em] uppercase sm:text-[8.5px]"
            style={{ color: "#C5A880" }}
          >
            {tagline}
          </span>
        )}
      </div>
    </div>
  );
};
