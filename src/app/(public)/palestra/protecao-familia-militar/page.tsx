import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  CheckCircle2,
  Globe,
  HeartPulse,
  Shield,
  Sparkles,
  TrendingUp,
} from "lucide-react";
import { isPresentationPublishable } from "@/contracts/presentation";
import { militaryFamilyProtectionPresentation as presentation } from "@/content/presentations/military-family-protection";
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
      {/* ========================================================
          1. HERO COM A ATMOSFERA DO AUDITÓRIO DO CTA
         ======================================================== */}
      <section className="relative overflow-hidden border-b border-neutral-800/80 bg-gradient-to-b from-[#0B1424] via-[#080D14] to-[#080D14] py-16 sm:py-24">
        {/* Glow / Efeito de Iluminação de Palco */}
        <div
          className="pointer-events-none absolute top-0 left-1/2 h-96 w-full max-w-7xl -translate-x-1/2 bg-[#C5A880]/5 blur-[120px]"
          aria-hidden
        />

        <div className="relative z-10 mx-auto max-w-7xl px-6">
          <div className="max-w-4xl space-y-6">
            {/* Kicker Oficial em Imperial Brass */}
            <div className="inline-flex items-center gap-2 rounded-full border border-[#C5A880]/30 bg-[#C5A880]/10 px-3.5 py-1.5 font-mono text-xs font-bold tracking-widest text-[#E2CEB3] uppercase">
              <span
                className="size-1.5 animate-pulse rounded-full bg-[#C5A880]"
                aria-hidden
              />
              Clube dos Taifeiros da Aeronáutica (CTA) · 21 de outubro de 2026
            </div>

            {/* Título Principal de Alto Impacto */}
            <h1 className="text-3xl leading-[1.12] font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
              Palestra João Brito:{" "}
              <span className="text-[#E2CEB3]">
                Lei nº 13.954/2019 — Perdas e consequências!
              </span>
            </h1>

            {/* Apoio Institucional e Contexto */}
            <p className="max-w-3xl text-sm leading-relaxed text-neutral-300 sm:text-base">
              <strong>Apoio institucional:</strong> Pres. Jorge Salustiano Lins e
              Vice-Pres. Sergio Menezes. Análise técnica e responsável sobre pensões das
              filhas (MP 2.215-10/01), corte da assistência médica no FUNSA/SARAM (Art. 50
              da Lei 6.880/80), coisa julgada no STF (Tema 1175) e planejamento financeiro
              familiar.
            </p>

            {/* Botões de Ação Executivos */}
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
                <span>Ver Opções de Proteção</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================
          2. CARDS DE PRODUTOS PARA SUPRIR AS PERDAS
         ======================================================== */}
      <section
        id="opcoes-produtos"
        className="border-b border-neutral-800/80 bg-[#070B12] py-16 sm:py-24"
      >
        <div className="mx-auto max-w-7xl space-y-10 px-6">
          {/* Header da Seção */}
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 rounded-full border border-[#C5A880]/30 bg-[#C5A880]/10 px-3 py-1 text-xs font-semibold text-[#C5A880]">
              <Sparkles className="size-3.5" aria-hidden />
              Página da EcoSeg Seguros · Cards do Público
            </div>
            <h2 className="text-2xl font-bold tracking-tight text-white sm:text-4xl">
              Opções de Produtos para Suprir as Ausências de Direitos
            </h2>
            <p className="max-w-3xl text-xs leading-relaxed text-neutral-400 sm:text-sm">
              Diante do trânsito em julgado e das restrições legais da Lei nº 13.954/2019,
              apresentamos opções sólidas de seguradoras de primeira linha para proteger o
              patrimônio e a saúde da família militar.
            </p>
          </div>

          {/* Grid dos 4 Cards Oficiais */}
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
            {/* Card 1: SulAmérica Saúde & Odonto */}
            <div className="group flex flex-col justify-between rounded-2xl border border-[#C5A880]/20 bg-gradient-to-b from-[#0D1627] to-[#0A111E] p-6 shadow-xl transition-all hover:border-[#C5A880]/50">
              <div className="space-y-4">
                <div className="flex size-11 items-center justify-center rounded-xl border border-blue-500/30 bg-blue-500/10 text-blue-400">
                  <HeartPulse className="size-6" aria-hidden />
                </div>
                <span className="block font-mono text-[10px] font-semibold tracking-wider text-[#C5A880] uppercase">
                  Substitui FUNSA / SARAM
                </span>
                <h3 className="text-lg font-bold text-white transition-colors group-hover:text-[#E2CEB3]">
                  SulAmérica Saúde & Odonto
                </h3>
                <p className="text-xs leading-relaxed text-neutral-300">
                  Cobertura médica, hospitalar e odontológica completa para dependentes,
                  filhos maiores de 21 anos e cônjuges excluídos do FUNSA pelo Art. 50 do
                  Estatuto dos Militares.
                </p>
                <ul className="space-y-2 border-t border-neutral-800/80 pt-2 text-xs text-neutral-300">
                  <li className="flex items-center gap-2">
                    <CheckCircle2
                      className="size-4 shrink-0 text-emerald-400"
                      aria-hidden
                    />
                    <span>Rede hospitalar no RJ e Brasil</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2
                      className="size-4 shrink-0 text-emerald-400"
                      aria-hidden
                    />
                    <span>Reembolso ágil de consultas</span>
                  </li>
                </ul>
              </div>

              <div className="mt-6 border-t border-neutral-800 pt-6">
                <Link
                  href="/contato?interesse=sulamerica-saude"
                  className="flex w-full items-center justify-center gap-1.5 rounded-xl bg-neutral-800 px-4 py-2.5 text-xs font-semibold text-white transition-colors hover:bg-neutral-700"
                >
                  <span>Solicitar Cotação</span>
                  <ArrowUpRight className="size-3.5 text-[#C5A880]" aria-hidden />
                </Link>
              </div>
            </div>

            {/* Card 2: Saúde Internacional Premium */}
            <div className="group flex flex-col justify-between rounded-2xl border border-[#C5A880]/20 bg-gradient-to-b from-[#0D1627] to-[#0A111E] p-6 shadow-xl transition-all hover:border-[#C5A880]/50">
              <div className="space-y-4">
                <div className="flex size-11 items-center justify-center rounded-xl border border-emerald-500/30 bg-emerald-500/10 text-emerald-400">
                  <Globe className="size-6" aria-hidden />
                </div>
                <span className="block font-mono text-[10px] font-semibold tracking-wider text-emerald-400 uppercase">
                  Para os mais exigentes
                </span>
                <h3 className="text-lg font-bold text-white transition-colors group-hover:text-[#E2CEB3]">
                  Saúde Internacional Premium
                </h3>
                <p className="text-xs leading-relaxed text-neutral-300">
                  Atendimento médico-hospitalar global nos maiores centros mundiais de
                  medicina (EUA, Europa e Brasil), repatriação e segunda opinião médica
                  internacional.
                </p>
                <ul className="space-y-2 border-t border-neutral-800/80 pt-2 text-xs text-neutral-300">
                  <li className="flex items-center gap-2">
                    <CheckCircle2
                      className="size-4 shrink-0 text-emerald-400"
                      aria-hidden
                    />
                    <span>Cobertura hospitalar mundial</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2
                      className="size-4 shrink-0 text-emerald-400"
                      aria-hidden
                    />
                    <span>Sem limite anual de internação</span>
                  </li>
                </ul>
              </div>

              <div className="mt-6 border-t border-neutral-800 pt-6">
                <Link
                  href="/contato?interesse=saude-internacional"
                  className="flex w-full items-center justify-center gap-1.5 rounded-xl bg-neutral-800 px-4 py-2.5 text-xs font-semibold text-white transition-colors hover:bg-neutral-700"
                >
                  <span>Solicitar Cotação</span>
                  <ArrowUpRight className="size-3.5 text-[#C5A880]" aria-hidden />
                </Link>
              </div>
            </div>

            {/* Card 3: Pensão Privada & Vida Familiar */}
            <div className="group flex flex-col justify-between rounded-2xl border border-[#C5A880]/20 bg-gradient-to-b from-[#0D1627] to-[#0A111E] p-6 shadow-xl transition-all hover:border-[#C5A880]/50">
              <div className="space-y-4">
                <div className="flex size-11 items-center justify-center rounded-xl border border-[#C5A880]/30 bg-[#C5A880]/10 text-[#C5A880]">
                  <Shield className="size-6" aria-hidden />
                </div>
                <span className="block font-mono text-[10px] font-semibold tracking-wider text-[#C5A880] uppercase">
                  Substitui pensão das filhas
                </span>
                <h3 className="text-lg font-bold text-white transition-colors group-hover:text-[#E2CEB3]">
                  Pensão Privada & Vida Familiar
                </h3>
                <p className="text-xs leading-relaxed text-neutral-300">
                  Planejamento financeiro para garantir renda vitalícia ou capital
                  substancial às filhas e dependentes que não têm direito à pensão militar
                  pela MP 2.215-10/01.
                </p>
                <ul className="space-y-2 border-t border-neutral-800/80 pt-2 text-xs text-neutral-300">
                  <li className="flex items-center gap-2">
                    <CheckCircle2
                      className="size-4 shrink-0 text-emerald-400"
                      aria-hidden
                    />
                    <span>Liquidação em até 72 horas</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2
                      className="size-4 shrink-0 text-emerald-400"
                      aria-hidden
                    />
                    <span>Isento de inventário e impostos</span>
                  </li>
                </ul>
              </div>

              <div className="mt-6 border-t border-neutral-800 pt-6">
                <Link
                  href="/contato?interesse=pensao-privada-filhas"
                  className="flex w-full items-center justify-center gap-1.5 rounded-xl bg-neutral-800 px-4 py-2.5 text-xs font-semibold text-white transition-colors hover:bg-neutral-700"
                >
                  <span>Solicitar Diagnóstico</span>
                  <ArrowUpRight className="size-3.5 text-[#C5A880]" aria-hidden />
                </Link>
              </div>
            </div>

            {/* Card 4: Previdência & Isenção IR */}
            <div className="group flex flex-col justify-between rounded-2xl border border-[#C5A880]/20 bg-gradient-to-b from-[#0D1627] to-[#0A111E] p-6 shadow-xl transition-all hover:border-[#C5A880]/50">
              <div className="space-y-4">
                <div className="flex size-11 items-center justify-center rounded-xl border border-purple-500/30 bg-purple-500/10 text-purple-400">
                  <TrendingUp className="size-6" aria-hidden />
                </div>
                <span className="block font-mono text-[10px] font-semibold tracking-wider text-purple-400 uppercase">
                  Repõe perdas da Lei 13.954
                </span>
                <h3 className="text-lg font-bold text-white transition-colors group-hover:text-[#E2CEB3]">
                  Previdência & Isenção IR
                </h3>
                <p className="text-xs leading-relaxed text-neutral-300">
                  Recomposição do poder de compra frente à perda do Adicional de 41% (STF
                  Tema 1175), aliada à auditoria de Isenção de Imposto de Renda (Lei nº
                  7.713/88).
                </p>
                <ul className="space-y-2 border-t border-neutral-800/80 pt-2 text-xs text-neutral-300">
                  <li className="flex items-center gap-2">
                    <CheckCircle2
                      className="size-4 shrink-0 text-emerald-400"
                      aria-hidden
                    />
                    <span>Recuperação da renda líquida</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2
                      className="size-4 shrink-0 text-emerald-400"
                      aria-hidden
                    />
                    <span>Análise de laudos e moléstias</span>
                  </li>
                </ul>
              </div>

              <div className="mt-6 border-t border-neutral-800 pt-6">
                <Link
                  href="/contato?interesse=previdencia-isencao-ir"
                  className="flex w-full items-center justify-center gap-1.5 rounded-xl bg-neutral-800 px-4 py-2.5 text-xs font-semibold text-white transition-colors hover:bg-neutral-700"
                >
                  <span>Solicitar Diagnóstico</span>
                  <ArrowUpRight className="size-3.5 text-[#C5A880]" aria-hidden />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================
          3. SESSÃO DE ATENDIMENTO & DIAGNÓSTICO INDIVIDUAL NO CTA
         ======================================================== */}
      <section className="border-b border-neutral-800/80 bg-[#0A111F] py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-6">
          <div className="flex flex-col items-center justify-between gap-8 rounded-3xl border border-[#C5A880]/30 bg-gradient-to-r from-neutral-900 to-[#10192A] p-8 sm:p-12 lg:flex-row">
            <div className="max-w-2xl space-y-4">
              <span className="font-mono text-xs font-bold tracking-widest text-[#C5A880] uppercase">
                Atendimento Confidencial no Salão do CTA
              </span>
              <h3 className="text-2xl font-bold text-white sm:text-3xl">
                Nenhum diagnóstico é feito no palco.
              </h3>
              <p className="text-sm leading-relaxed text-neutral-300">
                Cada família militar tem uma data de ingresso, contracheque e composição
                dependente diferente. Agende uma conversa reservada com os consultores da
                ECOSEG durante o evento para auditar seus documentos e receber seu Dossiê
                sem nenhum compromisso comercial.
              </p>
            </div>

            <div className="shrink-0">
              <Link
                href="/contato"
                className="inline-flex cursor-pointer items-center gap-2 rounded-2xl bg-gradient-to-r from-[#C5A880] to-[#9E7F55] px-8 py-4 text-sm font-bold text-[#080D14] shadow-xl shadow-[#C5A880]/20 transition-all hover:from-[#E2CEB3] hover:to-[#C5A880]"
              >
                <span>Agendar Atendimento Reservado</span>
                <ArrowRight className="size-4" aria-hidden />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
