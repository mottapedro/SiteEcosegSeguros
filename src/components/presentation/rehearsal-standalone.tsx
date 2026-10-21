"use client";

import { useRouter } from "next/navigation";
import { RehearsalModal } from "@/components/RehearsalModal";

const PUBLIC_LECTURE_PATH = "/palestra/protecao-familia-militar";

export function RehearsalStandalone() {
  const router = useRouter();

  return (
    <RehearsalModal
      isOpen
      isStandalone
      onClose={() => router.push(PUBLIC_LECTURE_PATH)}
    />
  );
}
