import type { Metadata } from "next";
import { Contact } from "@/components/sections/contact";
import { buildMetadata } from "@/lib/seo/metadata";

const path = "/contato";

export const metadata: Metadata = buildMetadata({
  title: "Contato — EcoSeg",
  description:
    "Fale com a EcoSeg para agendar um diagnóstico consultivo de proteção patrimonial.",
  path,
});

export default function ContactPage() {
  return (
    <main className="bg-background min-h-screen">
      <Contact />
    </main>
  );
}
