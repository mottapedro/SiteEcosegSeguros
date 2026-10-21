"use client";

import React, { useState } from "react";
import Link from "next/link";
import { EcoSegLogo } from "../brand/EcoSegLogo";
import { Menu, X, ArrowRight, Phone } from "lucide-react";

interface NavLink {
  href: string;
  label: string;
}

const NAV_LINKS: NavLink[] = [
  { href: "/palestra/protecao-familia-militar", label: "Palestra Militar" },
  { href: "/#metodologia", label: "Metodologia Consultiva" },
  { href: "/#diagnostico", label: "Diagnóstico Consultivo" },
  { href: "/contato", label: "Contato" },
];

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-neutral-800/80 bg-[#080D14]/95 backdrop-blur-md">
      {/* Container Principal: Eixo X e Y com respiro arquitetural nobre */}
      <div className="mx-auto flex h-16 w-full max-w-[1600px] items-center justify-between gap-3 px-3 sm:h-20 sm:px-6 lg:px-8 xl:px-12 2xl:px-16">
        {/* Zona 1 (Esquerda): Marca Oficial EcoSeg — Alinhamento Ótico Seguro */}
        <Link
          href="/"
          className="group hidden shrink-0 items-center transition-opacity hover:opacity-95 sm:flex"
          aria-label="EcoSeg — Planejamento e Proteção Patrimonial"
        >
          <EcoSegLogo
            size={38}
            finish="brass"
            tagline="PLANEJAMENTO & PROTEÇÃO PATRIMONIAL"
          />
        </Link>

        <Link
          href="/"
          className="group flex items-center gap-2 transition-opacity hover:opacity-95 sm:hidden"
          aria-label="EcoSeg — Planejamento e Proteção Patrimonial"
        >
          <EcoSegLogo variant="symbol-only" size={34} finish="brass" />
          <span className="text-base font-bold tracking-[0.18em] text-white">
            ECOSEG
          </span>
        </Link>

        {/* Zona 2 (Centro): Menu de Navegação em Linha Única sem quebra de texto */}
        <nav
          className="hidden h-full flex-1 items-center justify-center gap-5 px-6 lg:flex xl:gap-8 xl:px-12 2xl:gap-10"
          aria-label="Navegação principal"
        >
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="relative py-2 text-[11px] font-semibold tracking-wider whitespace-nowrap text-neutral-300 uppercase transition-colors after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 after:bg-[#C5A880] after:transition-all hover:text-white hover:after:w-full xl:text-xs"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Zona 3 (Direita): Ações Primárias & Secundárias */}
        <div className="flex shrink-0 items-center gap-2.5 sm:gap-3">
          <Link
            href="/palestra/protecao-familia-militar/apresentacao"
            className="hidden items-center justify-center rounded-xl border border-neutral-800 bg-neutral-900/90 px-3.5 py-2 text-xs font-semibold whitespace-nowrap text-neutral-200 shadow-sm transition-all hover:bg-neutral-800 hover:text-white sm:py-2.5 xl:inline-flex xl:px-4"
          >
            Modo Apresentação
          </Link>

          <Link
            href="/contato"
            className="hidden cursor-pointer items-center justify-center rounded-xl bg-[#C5A880] px-4 py-2 text-xs font-bold whitespace-nowrap text-[#080D14] shadow-md shadow-[#C5A880]/20 transition-all hover:bg-[#b5966c] active:scale-95 lg:inline-flex sm:py-2.5 xl:px-5"
          >
            Agendar Diagnóstico
          </Link>

          {/* Botão Hambúrguer Mobile/Tablet (lg:hidden) */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="inline-flex cursor-pointer items-center justify-center rounded-xl border border-neutral-800 p-2 text-neutral-400 transition-colors hover:bg-neutral-900 hover:text-white lg:hidden"
            aria-label={mobileMenuOpen ? "Fechar menu" : "Abrir menu"}
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? (
              <X className="h-5 w-5 text-neutral-200" />
            ) : (
              <Menu className="h-5 w-5 text-neutral-200" />
            )}
          </button>
        </div>
      </div>

      {/* Menu Dropdown Mobile / Tablet com Espaçamento X/Y e Toque Confortável */}
      {mobileMenuOpen && (
        <div className="animate-in fade-in-0 border-t border-neutral-800 bg-[#080D14]/98 px-4 py-5 backdrop-blur-2xl duration-200 lg:hidden">
          <div className="flex flex-col space-y-1">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="border-neutral-850 flex items-center justify-between rounded-lg border-b px-3 py-3 text-xs font-semibold tracking-wider text-neutral-300 uppercase transition-colors last:border-b-0 hover:bg-neutral-900/60 hover:text-white"
              >
                <span>{link.label}</span>
                <ArrowRight className="h-3.5 w-3.5 text-neutral-500" />
              </Link>
            ))}
          </div>

          <div className="mt-2 flex flex-col gap-2.5 border-t border-neutral-800 pt-4">
            <Link
              href="/contato"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-center rounded-xl bg-[#C5A880] px-4 py-3 text-center text-xs font-bold text-[#080D14] transition-colors hover:bg-[#b5966c]"
            >
              Agendar Diagnóstico
            </Link>
            <Link
              href="/palestra/protecao-familia-militar/apresentacao"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-center rounded-xl border border-neutral-800 bg-neutral-900 px-4 py-2.5 text-center text-xs font-semibold text-neutral-200 transition-colors hover:bg-neutral-800"
            >
              Modo Apresentação (Palestra CTA)
            </Link>
            <a
              href="https://wa.me/5521994693673"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 py-2 font-mono text-xs text-neutral-400 transition-colors hover:text-emerald-400"
            >
              <Phone className="h-3.5 w-3.5 text-emerald-400" />
              <span>WhatsApp: (21) 99469-3673</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
