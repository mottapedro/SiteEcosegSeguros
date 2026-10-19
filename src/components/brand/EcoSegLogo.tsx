import React, { useId } from "react";

export type LogoVariant = "primary" | "stacked" | "symbol-only" | "seal";
export type SymbolFinish = "brass" | "platinum" | "carbon" | "emerald";

interface EcoSegLogoProps {
  variant?: LogoVariant;
  size?: number;
  finish?: SymbolFinish;
  tagline?: string;
  className?: string;
}

export const EcoSegLogo: React.FC<EcoSegLogoProps> = ({
  variant = "primary",
  size = 36,
  finish = "brass",
  tagline,
  className = "",
}) => {
  const instanceId = useId().replace(/:/g, "");
  const gradientId = `ecoseg-grad-${finish}-${instanceId}`;
  const glowId = `ecoseg-glow-${instanceId}`;

  const renderGradients = () => {
    switch (finish) {
      case "platinum":
        return (
          <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#E2E8F0" />
            <stop offset="50%" stopColor="#CBD5E1" />
            <stop offset="100%" stopColor="#94A3B8" />
          </linearGradient>
        );
      case "carbon":
        return (
          <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#475569" />
            <stop offset="100%" stopColor="#0F172A" />
          </linearGradient>
        );
      case "emerald":
        return (
          <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#34D399" />
            <stop offset="100%" stopColor="#059669" />
          </linearGradient>
        );
      case "brass":
      default:
        return (
          <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#F5D77F" />
            <stop offset="40%" stopColor="#D4AF37" />
            <stop offset="70%" stopColor="#AA820A" />
            <stop offset="100%" stopColor="#785A00" />
          </linearGradient>
        );
    }
  };

  const SymbolSVG = (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="shrink-0"
      aria-hidden="true"
    >
      <defs>
        {renderGradients()}
        <filter id={glowId} x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="2" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
      </defs>

      <rect x="18" y="72" width="64" height="6" rx="3" fill={`url(#${gradientId})`} />
      <path
        d="M 22 66 C 22 36, 78 36, 78 66"
        stroke={`url(#${gradientId})`}
        strokeWidth="6"
        strokeLinecap="round"
        fill="none"
      />
      <polygon
        points="50,22 58,34 50,46 42,34"
        fill={`url(#${gradientId})`}
        filter={`url(#${glowId})`}
      />
    </svg>
  );

  if (variant === "symbol-only") {
    return <div className={`inline-flex items-center ${className}`}>{SymbolSVG}</div>;
  }

  return (
    <div className={`inline-flex items-center gap-3.5 select-none ${className}`}>
      {SymbolSVG}
      <div className="flex flex-col">
        <div className="flex items-baseline tracking-tight">
          <span className="text-xl font-extrabold tracking-tight text-white">ECO</span>
          <span className="text-xl font-light tracking-tight text-neutral-300">SEG</span>
          <span className="ml-1 font-mono text-[9px] font-bold text-amber-400">®</span>
        </div>
        <span className="font-mono text-[9px] tracking-widest text-neutral-400 uppercase">
          {tagline || "Inteligência & Proteção Patrimonial"}
        </span>
      </div>
    </div>
  );
};
