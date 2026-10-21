import type { Metadata } from "next";
import { RehearsalStandalone } from "@/components/presentation/rehearsal-standalone";
import { buildMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = buildMetadata({
  title: "Ensaio de palco — Palestra EcoSeg",
  description: "Cockpit privado de ensaio da palestra EcoSeg para leitura no púlpito.",
  path: "/ensaio",
  noIndex: true,
});

export default function RehearsalPage() {
  return <RehearsalStandalone />;
}
