import type { Metadata } from "next";
import { PublicLectureLandingClient } from "@/components/presentation/public-lecture-landing-client";
import { buildMetadata } from "@/lib/seo/metadata";

const path = "/palestra/protecao-familia-militar";

export const metadata: Metadata = buildMetadata({
  title: "Palestra EcoSeg — Lei nº 13.954/2019",
  description:
    "Palestra oficial no Clube dos Taifeiros da Aeronáutica sobre as perdas da Lei nº 13.954/2019 e soluções de proteção para famílias militares.",
  path,
  keywords: [
    "Lei 13.954/2019",
    "família militar",
    "Clube dos Taifeiros",
    "ECOSEG",
    "planejamento patrimonial",
  ],
});

export default function MilitaryFamilyProtectionLecturePage() {
  return <PublicLectureLandingClient />;
}
