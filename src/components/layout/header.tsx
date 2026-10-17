import Link from "next/link";
import { Button } from "@/components/ui/button";

const NAV_LINKS = [
  { href: "/palestra/protecao-familia-militar", label: "Palestra Militar" },
  { href: "/#metodologia", label: "Metodologia Consultiva" },
  { href: "/#sobre", label: "Sobre a EcoSeg" },
  { href: "/contato", label: "Contato" },
];

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-neutral-800/80 bg-[#080D14]/95 backdrop-blur-md">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">
        {/* Marca Oficial EcoSeg — Alinhamento Ótico no Eixo Y */}
        <Link
          href="/"
          className="group flex items-center gap-3 transition-opacity hover:opacity-95"
          aria-label="EcoSeg — Planejamento e Proteção Patrimonial"
        >
          {/* Símbolo Arquitetônico Vetorial Puro (38x38px ótico) */}
          <svg
            width="38"
            height="38"
            viewBox="0 0 100 100"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="shrink-0 transition-transform duration-300 group-hover:scale-105"
            aria-hidden="true"
          >
            <defs>
              <linearGradient id="header-brass-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#E2CEB3" />
                <stop offset="50%" stopColor="#C5A880" />
                <stop offset="100%" stopColor="#9E7F55" />
              </linearGradient>
            </defs>

            {/* 1. Viga Estrutural Inferior */}
            <rect
              x="20"
              y="74"
              width="60"
              height="5.6"
              rx="1.5"
              fill="url(#header-brass-grad)"
            />

            {/* 2. Coluna Vertical Esquerda */}
            <rect
              x="20"
              y="22"
              width="5.6"
              height="52"
              rx="1.5"
              fill="url(#header-brass-grad)"
            />

            {/* 3. Arco de Horizonte & Curvas de Retorno */}
            <path
              d="M 20 28 C 20 28, 50 16, 76 28 C 82 31, 82 38, 76 42 C 68 47, 46 47, 36 52 C 26 57, 26 68, 38 72 C 48 75, 68 75, 78 72"
              stroke="url(#header-brass-grad)"
              strokeWidth="5"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
            />

            {/* 4. Pivô Central em Diamante */}
            <polygon points="50,44 56,50 50,56 44,50" fill="#E2CEB3" opacity="0.9" />

            {/* 5. Acento do Meridiano Superior */}
            <circle cx="72" cy="30" r="2" fill="#C5A880" />
          </svg>

          {/* Tipografia da Marca com Altura e Espaçamento Calibrados */}
          <div className="flex flex-col justify-center">
            <span className="font-sans text-[17px] leading-none font-bold tracking-[0.24em] text-white">
              ECOSEG
            </span>
            <span className="mt-1.5 text-[8px] leading-none font-medium tracking-[0.26em] text-[#C5A880] uppercase">
              Planejamento & Proteção Patrimonial
            </span>
          </div>
        </Link>

        {/* Menu de Navegação Perfeitamente Alinhado no Eixo Y */}
        <nav
          className="hidden h-full items-center gap-8 lg:flex"
          aria-label="Navegação principal"
        >
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="flex items-center text-xs leading-none font-semibold tracking-wider text-neutral-300 uppercase transition-colors hover:text-white"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Ações da Direita com Alinhamento na Mesma Linha de Centro */}
        <div className="flex items-center gap-3">
          <Link
            href="/palestra/protecao-familia-militar/apresentacao"
            className="hidden items-center justify-center rounded-xl border border-neutral-800 bg-neutral-900 px-4 py-2.5 text-xs leading-none font-semibold text-neutral-300 transition-colors hover:bg-neutral-800 hover:text-white sm:inline-flex"
          >
            Modo Apresentação
          </Link>
          <Button
            size="sm"
            className="flex cursor-pointer items-center justify-center rounded-xl bg-[#C5A880] px-4 py-2.5 text-xs leading-none font-bold text-[#080D14] shadow-sm shadow-[#C5A880]/20 transition-all hover:bg-[#b5966c]"
            nativeButton={false}
            render={<Link href="/contato">Agendar Diagnóstico</Link>}
          >
            Agendar Diagnóstico
          </Button>
        </div>
      </div>
    </header>
  );
}
