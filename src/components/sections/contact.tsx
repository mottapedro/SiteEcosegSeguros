import { Mail, MapPin, Phone } from "lucide-react";
import { Section } from "./section";
import { ContactForm } from "@/features/contact-form/contact-form";
import { siteConfig } from "@/lib/seo/config";

export function Contact() {
  return (
    <Section id="contato" tone="muted">
      <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr]">
        <div>
          <h2 className="text-foreground text-3xl font-bold">Fale com um consultor</h2>
          <p className="text-muted-foreground mt-3 max-w-md">
            Descreva sua operação e um consultor entra em contato para agendar o
            diagnóstico de riscos, sem compromisso.
          </p>

          <dl className="mt-8 space-y-4">
            <div className="text-muted-foreground flex items-center gap-3 text-sm">
              <Phone className="text-accent size-4" aria-hidden />
              <span>{siteConfig.phone}</span>
            </div>
            <div className="text-muted-foreground flex items-center gap-3 text-sm">
              <Mail className="text-accent size-4" aria-hidden />
              <span>{siteConfig.email}</span>
            </div>
            <div className="text-muted-foreground flex items-center gap-3 text-sm">
              <MapPin className="text-accent size-4" aria-hidden />
              <span>Atendimento em todo o Brasil</span>
            </div>
          </dl>
        </div>

        <div className="border-border bg-card rounded-md border p-8">
          <ContactForm />
        </div>
      </div>
    </Section>
  );
}
