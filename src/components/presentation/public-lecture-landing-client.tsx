"use client";

import { useRouter } from "next/navigation";
import { PublicLectureLandingPage } from "@/components/PublicLectureLandingPage";

const PRESENTATION_PATH = "/palestra/protecao-familia-militar/apresentacao";

export function PublicLectureLandingClient() {
  const router = useRouter();

  return (
    <PublicLectureLandingPage
      onOpenPresentation={() => router.push(PRESENTATION_PATH)}
      onNavigateToStudio={() => router.push("/consultor/cyborg")}
    />
  );
}
