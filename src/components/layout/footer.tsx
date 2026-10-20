import React from "react";
import Link from "next/link";
import { EcoSegLogo } from "../brand/EcoSegLogo";

interface FooterLink {
  href: string;
  label: string;
}

interface FooterColumn {
  title: string;
  links: FooterLink[];
}

// Rotas estritamente alinhadas com o corte V1 da ECOSEG (sem 404s)
const FOOTER_COLUMNS: FooterColumn[] = [
  {
    title: "Serviços & Soluções",
    links: [
      {
        href: "/palestra/protecao-familia-militar",
        label: "Proteção da Família Militar (Lei 13.954)",
      },
      { href: "/#metodologia", label: "Metodologia Consultiva" },
      { href: "/#diagnostico", label: "Simulador de Lacunas" },
    ],
  },
  {
    title: "Institucional & Evento",
    links: [
      { href: "/#sobre", label: "Sobre a EcoSeg" },
      {
        href: "/palestra/protecao-familia-militar/apresentacao",
        label: "Modo Apresentação (Palestra CTA)",
      },
      { href: "/contato", label: "Contato & Agendamento" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="border-t border-neutral-800/80 bg-neutral-950 text-neutral-300">
      <div className="mx-auto grid w-full max-w-[1600px] gap-10 px-4 py-14 sm:grid-cols-2 sm:px-6 lg:grid-cols-4 lg:px-8 xl:px-12">
        {/* Coluna 1: Logo Oficial EcoSeg + Posicionamento Consultivo + Contato */}
        <div className="lg:col-span-2">
          <Link
            href="/"
            className="inline-block transition-opacity hover:opacity-90"
            aria-label="EcoSeg - Página Inicial"
          >
            <EcoSegLogo
              variant="primary"
              size={36}
              finish="brass"
              tagline="PLANEJAMENTO & PROTEÇÃO PATRIMONIAL"
            />
          </Link>

          <p className="mt-4 max-w-md text-sm leading-relaxed text-neutral-400">
            Inteligência jurídica e consultoria patrimonial personalizada para a família
            militar, empresas e profissionais liberais. Mapeamento de lacunas sucessórias
            fundamentado na Lei nº 13.954/2019 e na filosofia de compreensão prévia
            (ADR-B-001).
          </p>

          <div className="mt-6 space-y-1.5">
            <h4 className="text-xs font-semibold tracking-wider text-neutral-400 uppercase">
              Atendimento Operacional
            </h4>
            <p className="flex items-center gap-2 text-sm text-neutral-300">
              <a
                href="https://wa.me/5521994693673"
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium transition-colors hover:text-amber-400"
              >
                (21) 99469-3673
              </a>
              <span className="rounded bg-emerald-500/10 px-1.5 py-0.5 font-mono text-[10px] text-emerald-400">
                WhatsApp
              </span>
            </p>
            <p className="text-sm text-neutral-300">
              <a
                href="mailto:ecoseg@yahoo.com"
                className="transition-colors hover:text-amber-400"
              >
                ecoseg@yahoo.com
              </a>
            </p>
            <p className="text-xs text-neutral-500">
              Rio de Janeiro, RJ · Base Operacional Clube dos Taifeiros (CTA)
            </p>
          </div>
        </div>

        {/* Colunas de Navegação Governada */}
        {FOOTER_COLUMNS.map((column) => (
          <div key={column.title}>
            <h3 className="text-sm font-semibold tracking-wide text-white">
              {column.title}
            </h3>
            <ul className="mt-4 space-y-3">
              {column.links.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-neutral-400 transition-colors hover:text-amber-400"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Barra Inferior com Copyright e Governança */}
      <div className="border-t border-neutral-900 bg-black/60 px-4 py-6 sm:px-6 lg:px-8 xl:px-12">
        <div className="mx-auto flex w-full max-w-[1600px] flex-col items-center justify-between gap-4 text-xs text-neutral-500 sm:flex-row">
          <p>
            © {new Date().getFullYear()} EcoSeg Seguros & Consultoria Patrimonial. Todos
            os direitos reservados.
          </p>
          <div className="flex flex-wrap items-center gap-3 font-mono text-[11px] text-neutral-500">
            <span>ADR-B-001 Compreensão</span>
            <span>·</span>
            <span>DES-006 Anti-Clichê</span>
            <span>·</span>
            <span>LGPD Adequada</span>
            <span>·</span>
            <span>Rio de Janeiro, RJ</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
