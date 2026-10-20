# Guia de Alinhamento e Execução — Agente Sandbox AntiGravity & ECOSEG

**Objetivo:** Instruções estruturadas para o agente sandbox no AntiGravity sincronizar o código local do repositório `SiteEcosegSeguros` (`feat/marco-0-palestra`) com o **Ecossistema de Domínio ECOSEG — Intenção Estratégica do Sistema**.

---

## 1. Mapa de Ações Prioritárias no Código Local

| #     | Problema no Diagnóstico                      | Arquivo Alvo no Repositório                       | Ação de Alinhamento                                                                                                                                                                      |
| ----- | -------------------------------------------- | ------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **1** | **Links 404 no Menu e Rodapé**               | `src/components/layout/footer.tsx`                | Substituir rotas inexistentes (`/empresa`, `/servicos/...`, `/blog`) por rotas reais da V1 (`/palestra/protecao-familia-militar`, `/#metodologia`, `/#diagnostico`, `/contato`).         |
| **2** | **Dados Fictícios no `siteConfig`**          | `src/lib/seo/config.ts`                           | Remover dados fictícios de SP (+55 11 0000-0000); atualizar para telefone/WhatsApp oficial: **(21) 99469-3673** (`5521994693673`), praça Rio de Janeiro / CTA e `contato@ecoseg.com.br`. |
| **3** | **Ordem Narrativa da Home**                  | `src/app/(public)/page.tsx`                       | Reordenar seções: _Expectativa da Família Militar → Mudança Jurídica (13.954) → Lacuna → Diagnóstico → Solução → Contato_.                                                               |
| **4** | **Ícone Genérico de Escudo (`ShieldCheck`)** | `src/components/layout/header.tsx` & `footer.tsx` | Garantir que o `EcoSegLogo` (acabamento brass / latão nobre) esteja aplicado no Header e Footer, sem ícones genéricos de seguros.                                                        |
| **5** | **Domínio Militar Inexistente**              | `src/domain/military-family/`                     | Importar os modelos tipados de `NormaJuridica`, `PerfilMilitar`, `LacunaProtecao`, `CategoriaSolucao` e `RoteiroPalestra`.                                                               |
| **6** | **LGPD no Formulário de Contato**            | `src/features/contact-form/schema.ts`             | Adicionar campo obrigatório de consentimento LGPD fundamentado no Art. 7º V/IX da Lei 13.709/2018.                                                                                       |
| **7** | **Acoplamento Arquitetural de Leads**        | `src/domain/contracts/leads.ts`                   | Extrair o tipo de lead para contrato neutro desacoplado de UI e serviços.                                                                                                                |
| **8** | **Fronteira com Plataforma Privada**         | Documentação e APIs públicas                      | Manter apenas simulação e captação de baixa sensibilidade no site público.                                                                                                               |

---

## 2. Snippets Prontos para Aplicação Local pelo AntiGravity

### A. Atualizar `src/lib/seo/config.ts`:

```ts
export const siteConfig = {
  name: "EcoSeg",
  legalName: "EcoSeg Seguros & Inteligência Patrimonial",
  description:
    "Inteligência jurídica e consultoria patrimonial personalizada para a família militar e empresas. Proteção que nasce da compreensão do contexto familiar fundamentada na Lei nº 13.954/2019.",
  url: "https://www.ecoseg.com.br",
  ogImage: "/og-image.png",
  phone: "(21) 99469-3673",
  whatsapp: "5521994693673",
  whatsappUrl: "https://wa.me/5521994693673",
  email: "contato@ecoseg.com.br",
  address: "Rio de Janeiro, RJ · Clube dos Taifeiros (CTA)",
  locale: "pt_BR",
  keywords: [
    "proteção família militar",
    "lei 13954 2019",
    "pensão militar filhas",
    "blindagem patrimonial",
    "planejamento sucessório",
    "consultoria patrimonial militar",
    "ecoseg inteligência",
  ],
} as const;
```

---

### B. Atualizar `src/features/contact-form/schema.ts`:

```ts
import { z } from "zod";

export const contactFormSchema = z.object({
  name: z.string().trim().min(2, "Informe seu nome completo."),
  email: z.string().email("Informe um e-mail válido."),
  phone: z.string().trim().min(8, "Informe um telefone válido com DDD."),
  company: z.string().trim().optional(),
  interest: z.enum(
    ["protecao-militar", "blindagem-patrimonial", "responsabilidade-civil", "outro"],
    {
      errorMap: () => ({ message: "Selecione o assunto da consultoria." }),
    }
  ),
  message: z
    .string()
    .trim()
    .min(10, "Conte um pouco mais sobre sua necessidade ou situação familiar."),
  lgpdConsent: z.boolean().refine((val) => val === true, {
    message:
      "É obrigatório consentir com os termos da LGPD para iniciar o diagnóstico consultivo.",
  }),
  // Honeypot anti-spam
  website: z.string().max(0).optional(),
});

export type ContactFormValues = z.infer<typeof contactFormSchema>;

export const CONTACT_INTEREST_OPTIONS = [
  {
    value: "protecao-militar",
    label: "Proteção da Família Militar (Lei nº 13.954/2019)",
  },
  { value: "blindagem-patrimonial", label: "Blindagem Patrimonial & Sucessória" },
  { value: "responsabilidade-civil", label: "Responsabilidade Civil Profissional" },
  { value: "outro", label: "Outro assunto" },
] as const;
```

---

### C. Atualizar `src/components/layout/footer.tsx`:

Substituir o rodapé antigo pelo arquivo governado em `src/components/layout/footer.tsx`, que:

1. Elimina os links quebrados (`/servicos/blindagem-patrimonial`, `/empresa`, `/blog`);
2. Aponta para as rotas ativas: `/palestra/protecao-familia-militar`, `/#metodologia`, `/#diagnostico`, `/contato`;
3. Aplica a `EcoSegLogo` oficial com acabamento Latão Nobre e tipografia calibrada;
4. Registra os dados de atendimento no Rio de Janeiro (CTA) e avisos de conformidade ADR-B-001 e LGPD.

---

## 3. Comandos de Verificação para o AntiGravity no Terminal Local

```bash
# 1. Verificar tipagem estrita
pnpm lint || npm run lint

# 2. Testar compilação do Next.js
pnpm build || npm run build

# 3. Testar localmente na porta 3005
pnpm dev -p 3005
```

---

_Documento sincronizado com a Central de Governança ECOSEG em 2026-10-19._
