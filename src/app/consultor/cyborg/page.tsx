import type { Metadata } from "next";
import { CyborgIntelligenceWorkspace } from "@/components/cyborg/CyborgIntelligenceWorkspace";
import { buildMetadata } from "@/lib/seo/metadata";

const path = "/consultor/cyborg";

export const metadata: Metadata = buildMetadata({
  title: "Cyborg Intelligence Workspace",
  description: "Ambiente privado de triagem e governança consultiva da EcoSeg.",
  path,
  noIndex: true,
});

/**
 * Shell local do workspace privado. Em produção, esta rota deve ser protegida
 * pelo gateway autenticado da Cyborg antes de receber dados reais.
 */
export default function CyborgWorkspacePage() {
  return <CyborgIntelligenceWorkspace />;
}
