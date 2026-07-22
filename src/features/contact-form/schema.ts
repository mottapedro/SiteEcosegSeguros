import { z } from "zod";

export const contactFormSchema = z.object({
  name: z.string().trim().min(2, "Informe seu nome completo."),
  email: z.email("Informe um e-mail válido."),
  phone: z.string().trim().min(8, "Informe um telefone válido."),
  company: z.string().trim().optional(),
  interest: z.enum(["blindagem-patrimonial", "responsabilidade-civil", "outro"], {
    error: "Selecione um assunto.",
  }),
  message: z.string().trim().min(10, "Conte um pouco mais sobre sua necessidade."),
  // Honeypot: legitimate users never fill this hidden field.
  website: z.string().max(0).optional(),
});

export type ContactFormValues = z.infer<typeof contactFormSchema>;

export const CONTACT_INTEREST_OPTIONS = [
  { value: "blindagem-patrimonial", label: "Blindagem Patrimonial" },
  { value: "responsabilidade-civil", label: "Responsabilidade Civil" },
  { value: "outro", label: "Outro assunto" },
] as const;
