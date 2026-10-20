import { z } from "zod";

export const contactFormSchema = z.object({
  name: z.string().trim().min(2, "Informe seu nome completo."),
  email: z.string().email("Informe um e-mail válido."),
  phone: z.string().trim().min(8, "Informe um telefone válido com DDD."),
  company: z.string().trim().optional(),
  interest: z.enum(
    [
      "protecao-militar-13954",
      "pensao-filhas-whole-life",
      "confisco-10-5-previdencia",
      "blindagem-patrimonial-sucessoria",
      "responsabilidade-civil",
      "outro",
    ],
    {
      error: "Selecione o assunto da consultoria.",
    }
  ),
  message: z
    .string()
    .trim()
    .min(10, "Conte um pouco mais sobre sua necessidade ou situação familiar."),
  // Honeypot: legitimate users never fill this hidden field.
  website: z.string().max(0).optional(),
});

export type ContactFormValues = z.infer<typeof contactFormSchema>;

export const CONTACT_INTEREST_OPTIONS = [
  {
    value: "protecao-militar-13954",
    label: "Proteção da Família Militar (Lei nº 13.954/2019)",
  },
  {
    value: "pensao-filhas-whole-life",
    label: "Pensão Militar de Filhas & Seguro Whole Life",
  },
  {
    value: "confisco-10-5-previdencia",
    label: "Reposição do Confisco de 10,5% na Reserva / Pensão",
  },
  {
    value: "blindagem-patrimonial-sucessoria",
    label: "Blindagem Patrimonial & Anti-Inventário",
  },
  { value: "responsabilidade-civil", label: "Responsabilidade Civil Profissional" },
  { value: "outro", label: "Outro assunto" },
] as const;
