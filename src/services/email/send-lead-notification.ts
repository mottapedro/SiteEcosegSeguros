import { Resend } from "resend";
import { siteConfig } from "@/lib/seo/config";
import type { ContactFormValues } from "@/features/contact-form/schema";

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;

const INTEREST_LABELS: Record<ContactFormValues["interest"], string> = {
  "protecao-militar-13954": "Proteção da Família Militar (Lei nº 13.954/2019)",
  "pensao-filhas-whole-life": "Pensão de Filhas Whole Life",
  "confisco-10-5-previdencia": "Reposição do Confisco de 10,5% na Reserva / Pensão",
  "blindagem-patrimonial-sucessoria": "Blindagem Patrimonial & Anti-Inventário",
  "responsabilidade-civil": "Responsabilidade Civil Profissional",
  outro: "Outro assunto",
};

export async function sendLeadNotification(lead: Omit<ContactFormValues, "website">) {
  if (!resend) {
    throw new Error("RESEND_API_KEY não configurada.");
  }

  await resend.emails.send({
    from: `EcoSeg Site <leads@${new URL(siteConfig.url).hostname}>`,
    to: siteConfig.email,
    replyTo: lead.email,
    subject: `Novo lead: ${INTEREST_LABELS[lead.interest]} — ${lead.name}`,
    text: [
      `Nome: ${lead.name}`,
      `E-mail: ${lead.email}`,
      `Telefone: ${lead.phone}`,
      lead.company ? `Empresa: ${lead.company}` : null,
      `Assunto: ${INTEREST_LABELS[lead.interest]}`,
      "",
      lead.message,
    ]
      .filter(Boolean)
      .join("\n"),
  });
}
