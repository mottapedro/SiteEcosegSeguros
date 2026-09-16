import type { Metadata } from "next";
import { PresentationDeck } from "@/components/presentation/presentation-deck";
import { militaryFamilyProtectionPresentation as presentation } from "@/content/presentations/military-family-protection";
import { buildMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = buildMetadata({
  title: "Apresentação — Proteção da família militar",
  description: "Modo apresentação da palestra ECOSEG.",
  path: "/palestra/protecao-familia-militar/apresentacao",
  noIndex: true,
});

export default function MilitaryFamilyProtectionPresentationPage() {
  return <PresentationDeck presentation={presentation} />;
}
