import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { MilitarySolutionCards } from "@/components/presentation/military-solution-cards";
import { buildMetadata } from "@/lib/seo/metadata";

const path = "/palestra/protecao-familia-militar/solucoes";

export const metadata: Metadata = buildMetadata({
  title: "Produtos & Soluções — EcoSeg",
  description:
    "Catálogo consultivo de produtos e soluções para o contexto da família militar.",
  path,
  noIndex: true,
});

export default function MilitaryFamilySolutionsPage() {
  return (
    <main className="min-h-screen bg-[#080D14] text-neutral-100">
      <div className="mx-auto max-w-7xl px-6 pt-8">
        <Link
          href="/palestra/protecao-familia-militar"
          className="inline-flex items-center gap-2 text-sm text-neutral-400 transition-colors hover:text-[#E2CEB3]"
        >
          <ArrowLeft className="size-4" aria-hidden />
          Voltar para a palestra
        </Link>
      </div>
      <MilitarySolutionCards />
    </main>
  );
}
