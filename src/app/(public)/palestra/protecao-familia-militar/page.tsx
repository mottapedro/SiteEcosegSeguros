import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { isPresentationPublishable } from "@/contracts/presentation";
import { militaryFamilyProtectionPresentation as presentation } from "@/content/presentations/military-family-protection";
import { MilitarySolutionCards } from "@/components/presentation/military-solution-cards";
import { buildMetadata } from "@/lib/seo/metadata";

const path = "/palestra/protecao-familia-militar";

export const metadata: Metadata = buildMetadata({
  title: "Palestra: Lei nº 13.954/2019 — Perdas e consequências!",
  description:
    "Palestra oficial no Clube dos Taifeiros da Aeronáutica (CTA) sobre as perdas da Lei 13.954/2019, assistência à saúde (FUNSA) e soluções de planejamento patrimonial.",
  path,
  keywords: [
    "Lei 13.954/2019",
    "FUNSA",
    "Pensão militar filhas",
    "Clube dos Taifeiros",
    "ECOSEG",
    "SulAmérica Saúde",
  ],
  noIndex: !isPresentationPublishable(presentation),
});

export default function MilitaryFamilyProtectionLecturePage() {
  return (
    <div className="min-h-screen bg-[#080D14] text-neutral-100">
      <section className="relative overflow-hidden border-b border-neutral-800/80 bg-gradient-to-b from-[#0B1424] via-[#080D14] to-[#080D14] py-16 sm:py-24">
        <div
          className="pointer-events-none absolute top-0 left-1/2 h-96 w-full max-w-7xl -translate-x-1/2 bg-[#C5A880]/5 blur-[120px]"
          aria-hidden
        />

        <div className="relative z-10 mx-auto max-w-7xl px-6">
          <div className="max-w-4xl space-y-6">
            <div className="inline-flex items-center gap-2 rounded-full border border-[#C5A880]/30 bg-[#C5A880]/10 px-3.5 py-1.5 font-mono text-xs font-bold tracking-widest text-[#E2CEB3] uppercase">
              <span
                className="size-1.5 animate-pulse rounded-full bg-[#C5A880]"
                aria-hidden
              />
              Clube dos Taifeiros da Aeronáutica (CTA) · 21 de outubro de 2026
            </div>

            <h1 className="text-3xl leading-[1.12] font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
              Palestra João Brito:{" "}
              <span className="text-[#E2CEB3]">
                Lei nº 13.954/2019 — Perdas e consequências!
              </span>
            </h1>

            <p className="max-w-3xl text-sm leading-relaxed text-neutral-300 sm:text-base">
              <strong>Apoio institucional:</strong> Pres. Jorge Salustiano Lins e
              Vice-Pres. Sergio Menezes. Análise técnica e responsável sobre pensões das
              filhas (MP 2.215-10/01), corte da assistência médica no FUNSA/SARAM (Art. 50
              da Lei 6.880/80), coisa julgada no STF (Tema 1175) e planejamento financeiro
              familiar.
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-2">
              <Link
                href={`${path}/apresentacao`}
                className="inline-flex cursor-pointer items-center gap-2 rounded-xl bg-[#C5A880] px-6 py-3.5 text-xs font-bold text-[#080D14] shadow-lg shadow-[#C5A880]/20 transition-all hover:bg-[#b5966c]"
              >
                <span>Abrir Modo Apresentação</span>
                <ArrowRight className="size-4" aria-hidden />
              </Link>
              <a
                href="#opcoes-produtos"
                className="inline-flex items-center gap-2 rounded-xl border border-neutral-700/80 bg-neutral-900 px-6 py-3.5 text-xs font-semibold text-neutral-200 transition-colors hover:bg-neutral-800"
              >
                Ver Opções de Proteção
              </a>
            </div>
          </div>
        </div>
      </section>

      <MilitarySolutionCards />

      <section className="border-b border-neutral-800/80 bg-[#0A111F] py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-6">
          <div className="flex flex-col items-center justify-between gap-8 rounded-3xl border border-[#C5A880]/30 bg-gradient-to-r from-neutral-900 to-[#10192A] p-8 sm:p-12 lg:flex-row">
            <div className="max-w-2xl space-y-4">
              <span className="font-mono text-xs font-bold tracking-widest text-[#C5A880] uppercase">
                Atendimento Confidencial no Salão do CTA
              </span>
              <h2 className="text-2xl font-bold text-white sm:text-3xl">
                Nenhum diagnóstico é feito no palco.
              </h2>
              <p className="text-sm leading-relaxed text-neutral-300">
                Cada família militar tem uma data de ingresso, contracheque e composição
                dependente diferente. Agende uma conversa reservada com os consultores da
                ECOSEG durante o evento para auditar seus documentos e receber seu Dossiê
                sem nenhum compromisso comercial.
              </p>
            </div>

            <Link
              href="/contato"
              className="inline-flex shrink-0 cursor-pointer items-center gap-2 rounded-2xl bg-gradient-to-r from-[#C5A880] to-[#9E7F55] px-8 py-4 text-sm font-bold text-[#080D14] shadow-xl shadow-[#C5A880]/20 transition-all hover:from-[#E2CEB3] hover:to-[#C5A880]"
            >
              <span>Agendar Atendimento Reservado</span>
              <ArrowRight className="size-4" aria-hidden />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
