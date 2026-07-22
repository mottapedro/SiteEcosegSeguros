import { MessageCircle } from "lucide-react";
import { siteConfig } from "@/lib/seo/config";

export function WhatsAppFloat() {
  const message = encodeURIComponent(
    "Olá! Gostaria de falar sobre Blindagem Patrimonial ou Responsabilidade Civil."
  );

  return (
    <a
      href={`https://wa.me/${siteConfig.whatsapp}?text=${message}`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Falar com a EcoSeg no WhatsApp"
      className="bg-accent text-accent-foreground focus-visible:outline-ring fixed right-5 bottom-5 z-50 flex size-14 items-center justify-center rounded-full shadow-md shadow-black/15 transition-transform hover:scale-105 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
    >
      <MessageCircle className="size-6" aria-hidden />
    </a>
  );
}
