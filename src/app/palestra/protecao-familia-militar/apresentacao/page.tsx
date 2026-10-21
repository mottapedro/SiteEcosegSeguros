import type { Metadata } from "next";
import { RehearsalStandalone } from "@/components/presentation/rehearsal-standalone";
import { buildMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = buildMetadata({
  title: "Apresentação — Proteção da família militar",
  description: "Modo apresentação da palestra ECOSEG.",
  path: "/palestra/protecao-familia-militar/apresentacao",
  noIndex: true,
});

export default function MilitaryFamilyProtectionPresentationPage() {
  return <RehearsalStandalone />;
}
