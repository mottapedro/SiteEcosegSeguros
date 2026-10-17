import { useId } from "react";

interface EcoSegLogoProps {
  size?: number;
  finish?: "brass" | "platinum";
  tagline?: string;
}

export function EcoSegLogo({
  size = 36,
  finish = "brass",
  tagline = "PLANEJAMENTO & PROTEÇÃO PATRIMONIAL",
}: EcoSegLogoProps) {
  const gradientId = `ecoseg-logo-${finish}-${useId().replace(/:/g, "")}`;
  const colors =
    finish === "platinum"
      ? {
          highlight: "#F8FAFC",
          mid: "#CBD5E1",
          shadow: "#94A3B8",
        }
      : {
          highlight: "#E2CEB3",
          mid: "#C5A880",
          shadow: "#9E7F55",
        };

  return (
    <span className="inline-flex items-center gap-3">
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
          <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={colors.highlight} />
            <stop offset="50%" stopColor={colors.mid} />
            <stop offset="100%" stopColor={colors.shadow} />
          </linearGradient>
        </defs>

        <rect
          x="20"
          y="74"
          width="60"
          height="5.6"
          rx="1.5"
          fill={`url(#${gradientId})`}
        />
        <rect
          x="20"
          y="22"
          width="5.6"
          height="52"
          rx="1.5"
          fill={`url(#${gradientId})`}
        />
        <path
          d="M 20 28 C 20 28, 50 16, 76 28 C 82 31, 82 38, 76 42 C 68 47, 46 47, 36 52 C 26 57, 26 68, 38 72 C 48 75, 68 75, 78 72"
          stroke={`url(#${gradientId})`}
          strokeWidth="5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <polygon points="50,44 56,50 50,56 44,50" fill={colors.highlight} opacity="0.9" />
        <circle cx="72" cy="30" r="2" fill={colors.mid} />
      </svg>

      <span className="flex flex-col justify-center">
        <span className="text-foreground font-sans text-[17px] leading-none font-bold tracking-[0.24em]">
          ECOSEG
        </span>
        {tagline ? (
          <span className="mt-1.5 text-[8px] leading-none font-medium tracking-[0.26em] text-[#C5A880] uppercase">
            {tagline}
          </span>
        ) : null}
      </span>
    </span>
  );
}
