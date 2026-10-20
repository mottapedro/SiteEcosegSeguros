# Implementação do Footer com Logo Oficial EcoSeg (Next.js)

**Referência Visual:** ADR-B-001 (Logo Representa Compreensão, Não Proteção) e DES-006 (Diretrizes Anti-Clichê).

---

## 1. Contexto da Alteração

O footer anterior utilizava o ícone genérico `ShieldCheck` da biblioteca `lucide-react`, o que gerava um duplo problema:

1. **Conflito com a ADR-B-001**: O logotipo da EcoSeg não representa um escudo/cadeado de proteção genérico, e sim a **compreensão e mapeamento de contexto** que fundamenta a proteção jurídica.
2. **Identidade Visual da Marca**: Substituição pelo símbolo geométrico arquitetural com acabamento em Latão Nobre (`brass`), tipografia equilibrada e proporção áurea.

---

## 2. Como aplicar no repositório Next.js (`SiteEcosegSeguros`)

### Passo 1: Componente do Logo (`src/components/brand/EcoSegLogo.tsx`)

Certifique-se de que o componente do logo está presente em `src/components/brand/EcoSegLogo.tsx` (ou importe o SVG correspondente).

```tsx
import React from "react";

export const EcoSegLogo: React.FC<{
  size?: number;
  finish?: "brass" | "platinum";
  tagline?: string;
}> = ({
  size = 36,
  finish = "brass",
  tagline = "PLANEJAMENTO & PROTEÇÃO PATRIMONIAL",
}) => {
  return (
    <div className="inline-flex items-center gap-3">
      <svg
        width={size}
        height={size}
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="brass-grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#E2CEB3" />
            <stop offset="50%" stopColor="#C5A880" />
            <stop offset="100%" stopColor="#C5A880" />
          </linearGradient>
        </defs>
        <rect x="20" y="74" width="60" height="5.6" rx="1.4" fill="url(#brass-grad)" />
        <rect x="20" y="22" width="5.6" height="52" rx="1.4" fill="url(#brass-grad)" />
        <path
          d="M 20 28 C 20 28, 50 16, 76 28 C 82 31, 82 38, 76 42 C 68 47, 46 47, 36 52 C 26 57, 26 68, 38 72 C 48 75, 68 75, 78 72"
          stroke="url(#brass-grad)"
          strokeWidth="5"
          strokeLinecap="round"
          fill="none"
        />
        <polygon points="50,44 56,50 50,56 44,50" fill="#E2CEB3" opacity="0.9" />
        <circle cx="72" cy="30" r="1.8" fill="#C5A880" />
      </svg>
      <div className="flex flex-col justify-center">
        <span className="text-xl leading-none font-bold tracking-[0.18em] text-white">
          ECOSEG
        </span>
        {tagline && (
          <span className="mt-1 text-[8.5px] leading-tight font-medium tracking-[0.22em] text-amber-300/80 uppercase">
            {tagline}
          </span>
        )}
      </div>
    </div>
  );
};
```

### Passo 2: Substituir em `src/components/layout/footer.tsx`

Substitua o conteúdo de `src/components/layout/footer.tsx`:

```tsx
import Link from "next/link";
import { siteConfig } from "@/lib/seo/config";
import { EcoSegLogo } from "@/components/brand/EcoSegLogo";

const FOOTER_COLUMNS = [
  {
    title: "Serviços",
    links: [
      { href: "/servicos/blindagem-patrimonial", label: "Blindagem Patrimonial" },
      { href: "/servicos/responsabilidade-civil", label: "Responsabilidade Civil" },
      { href: "/servicos", label: "Consultoria em Riscos" },
    ],
  },
  {
    title: "Empresa",
    links: [
      { href: "/empresa", label: "Sobre a EcoSeg" },
      { href: "/blog", label: "Blog" },
      { href: "/contato", label: "Contato" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="border-border/70 bg-secondary/40 border-t">
      <div className="mx-auto grid max-w-7xl gap-10 px-6 py-14 sm:grid-cols-2 lg:grid-cols-4">
        <div className="lg:col-span-2">
          {/* Logo Oficial EcoSeg com Símbolo Arquitetural */}
          <Link href="/" className="inline-block transition-opacity hover:opacity-90">
            <EcoSegLogo
              size={36}
              finish="brass"
              tagline="PLANEJAMENTO & PROTEÇÃO PATRIMONIAL"
            />
          </Link>
          <p className="text-muted-foreground mt-4 max-w-sm text-sm leading-relaxed">
            {siteConfig.description}
          </p>
          <div className="mt-6">
            <h4 className="text-foreground text-muted-foreground text-xs font-semibold tracking-wider uppercase">
              Contato
            </h4>
            <p className="text-muted-foreground mt-1 text-sm">
              <a
                href={`mailto:${siteConfig.email}`}
                className="hover:text-foreground transition-colors"
              >
                {siteConfig.email}
              </a>
            </p>
          </div>
        </div>

        {FOOTER_COLUMNS.map((column) => (
          <div key={column.title}>
            <h3 className="text-foreground text-sm font-semibold">{column.title}</h3>
            <ul className="mt-4 space-y-3">
              {column.links.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-muted-foreground hover:text-foreground text-sm transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="border-border/70 border-t px-6 py-6">
        <div className="text-muted-foreground mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 text-xs sm:flex-row">
          <p>
            © {new Date().getFullYear()} {siteConfig.legalName}. Todos os direitos
            reservados.
          </p>
          <div className="flex items-center gap-3 font-mono text-[11px]">
            <span>ADR-B-001 Compreensão</span>
            <span>·</span>
            <span>DES-006 Anti-Clichê</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
```
