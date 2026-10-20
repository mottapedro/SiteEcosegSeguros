"use client";

import { useMemo, useState } from "react";
import { Check, Home, Landmark, MessageCircle, Scale } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import {
  PRODUTOS_SOLUCOES_ECOSEG,
  type ProdutoSolucao,
} from "@/domain/military-family/products";
import { EcoSegLogo } from "@/components/brand/EcoSegLogo";
import { siteConfig } from "@/lib/seo/config";

type ProductFilter = "Todos" | ProdutoSolucao["seguradora"];
type ProductIcon = LucideIcon | "logo";

const FILTERS: ProductFilter[] = [
  "Todos",
  "Icatu Seguros",
  "GBOEX",
  "MAG Seguros",
  "Consultoria Previdenciária",
];

const PRODUCT_STYLES: Record<
  ProdutoSolucao["seguradora"],
  {
    icon: ProductIcon;
    iconClassName: string;
    badgeClassName: string;
  }
> = {
  "Icatu Seguros": {
    icon: "logo",
    iconClassName: "border-emerald-500/30 bg-emerald-500/10 text-emerald-400",
    badgeClassName: "border-emerald-500/30 bg-emerald-500/10 text-emerald-400",
  },
  GBOEX: {
    icon: Landmark,
    iconClassName: "border-blue-500/30 bg-blue-500/10 text-blue-400",
    badgeClassName: "border-blue-500/30 bg-blue-500/10 text-blue-300",
  },
  "MAG Seguros": {
    icon: Home,
    iconClassName: "border-cyan-500/30 bg-cyan-500/10 text-cyan-400",
    badgeClassName: "border-cyan-500/30 bg-cyan-500/10 text-cyan-300",
  },
  "Consultoria Previdenciária": {
    icon: Scale,
    iconClassName: "border-[#C5A880]/30 bg-[#C5A880]/10 text-[#C5A880]",
    badgeClassName: "border-[#C5A880]/30 bg-[#C5A880]/10 text-[#C5A880]",
  },
};

function getWhatsAppHref(product: ProdutoSolucao) {
  const message = `Olá! Gostaria de conhecer ${product.nome} e entender como essa solução pode se adequar ao meu contexto familiar.`;

  return `${siteConfig.whatsappUrl}?text=${encodeURIComponent(message)}`;
}

export function MilitarySolutionCards() {
  const [activeFilter, setActiveFilter] = useState<ProductFilter>("Todos");
  const products = useMemo(
    () =>
      activeFilter === "Todos"
        ? PRODUTOS_SOLUCOES_ECOSEG
        : PRODUTOS_SOLUCOES_ECOSEG.filter(
            (product) => product.seguradora === activeFilter
          ),
    [activeFilter]
  );

  return (
    <section
      id="opcoes-produtos"
      className="border-b border-neutral-800/80 bg-[#070B12] py-16 sm:py-24"
    >
      <div className="mx-auto max-w-7xl space-y-10 px-6">
        <div className="flex flex-col gap-5 rounded-xl border border-neutral-800 bg-[#101214] p-4 sm:p-5 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h2 className="flex items-center gap-2 text-sm font-bold text-white sm:text-base">
              <Landmark className="size-4 text-[#C5A880]" aria-hidden />
              Opções de Produtos para Suprir Ausências de Direitos (Lei 13.954)
            </h2>
            <p className="mt-1 text-xs text-neutral-400">
              Soluções homologadas pelas seguradoras parceiras para a família militar e
              planejamento sucessório.
            </p>
          </div>

          <div
            className="flex flex-wrap gap-2"
            role="group"
            aria-label="Filtrar produtos por seguradora"
          >
            {FILTERS.map((filter) => {
              const isActive = activeFilter === filter;

              return (
                <button
                  key={filter}
                  type="button"
                  onClick={() => setActiveFilter(filter)}
                  aria-pressed={isActive}
                  className={`rounded-lg border px-3 py-1.5 text-xs transition-colors focus-visible:ring-2 focus-visible:ring-[#C5A880] focus-visible:outline-none ${
                    isActive
                      ? "border-[#C5A880] bg-[#F5B900] font-bold text-[#111]"
                      : "border-neutral-800 bg-[#0C0E10] text-neutral-300 hover:border-neutral-600 hover:text-white"
                  }`}
                >
                  {filter}
                </button>
              );
            })}
          </div>
        </div>

        <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
          {products.map((product) => {
            const styles = PRODUCT_STYLES[product.seguradora];

            return (
              <article
                key={product.id}
                className="group flex flex-col rounded-2xl border border-neutral-800 bg-[#101214] p-5 shadow-[0_16px_40px_rgba(0,0,0,0.18)] transition-colors hover:border-[#C5A880]/45 sm:p-6"
              >
                <div className="flex items-start justify-between gap-4">
                  <span
                    className={`inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold ${styles.badgeClassName}`}
                  >
                    {product.seguradora}
                  </span>
                  {product.processoSusep ? (
                    <span className="rounded border border-neutral-800 bg-[#0C0E10] px-2 py-1 font-mono text-[10px] text-neutral-500">
                      SUSEP {product.processoSusep}
                    </span>
                  ) : null}
                </div>

                <div className="mt-5 flex items-start gap-3">
                  <div
                    className={`flex size-10 shrink-0 items-center justify-center rounded-lg border ${styles.iconClassName}`}
                  >
                    {styles.icon === "logo" ? (
                      <EcoSegLogo variant="symbol-only" size={20} finish="brass" />
                    ) : (
                      <styles.icon className="size-5" aria-hidden />
                    )}
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white transition-colors group-hover:text-[#E2CEB3]">
                      {product.nome}
                    </h3>
                    <p className="mt-1 text-xs leading-relaxed font-semibold text-[#F5B900]">
                      {product.subtitulo}
                    </p>
                  </div>
                </div>

                <p className="mt-5 text-sm leading-relaxed text-neutral-300">
                  {product.descricao}
                </p>

                <div className="mt-5 rounded-xl border border-[#5B3E00] bg-[#0B0B0B] p-4">
                  <p className="flex items-center gap-2 text-xs font-bold text-[#F5B900] uppercase">
                    <Scale className="size-4" aria-hidden />
                    Vantagem sucessória & anti-inventário
                  </p>
                  <p className="mt-2 text-sm leading-relaxed text-neutral-200">
                    {product.vantagemSucessoria}
                  </p>
                </div>

                <div className="mt-5 flex-1 border-t border-neutral-800 pt-4">
                  <p className="font-mono text-[10px] tracking-[0.16em] text-neutral-500 uppercase">
                    Diferenciais da solução:
                  </p>
                  <ul className="mt-3 space-y-2">
                    {product.destaques.map((highlight) => (
                      <li
                        key={highlight}
                        className="flex items-start gap-2 text-sm leading-relaxed text-neutral-300"
                      >
                        <Check
                          className="mt-0.5 size-4 shrink-0 text-emerald-400"
                          aria-hidden
                        />
                        <span>{highlight}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-6 flex flex-col gap-4 border-t border-neutral-800 pt-4 sm:flex-row sm:items-center sm:justify-between">
                  <span className="text-xs text-neutral-400">
                    Consultoria EcoSeg · Rio de Janeiro / CTA
                  </span>
                  <a
                    href={getWhatsAppHref(product)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl border border-[#8A5A00] bg-transparent px-4 py-2.5 text-xs font-bold text-[#F5B900] transition-colors hover:bg-[#2A1B00] focus-visible:ring-2 focus-visible:ring-[#C5A880] focus-visible:outline-none"
                  >
                    <MessageCircle className="size-4" aria-hidden />
                    Cotar pelo WhatsApp {siteConfig.phone}
                  </a>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
