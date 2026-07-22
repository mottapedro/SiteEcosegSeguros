# Estrutura de Pastas

```
src/
  app/
    page.tsx              # Home
    layout.tsx             # Layout raiz: fontes, Header/Footer, JSON-LD Organization
    sitemap.ts / robots.ts
    api/contact/route.ts   # Endpoint do formulário de leads
  components/
    ui/                     # Primitivos shadcn/ui (Button, Input, Card...)
    layout/                 # Header, Footer, WhatsAppFloat
    sections/               # Seções da Home (Hero, Products, Differentials...)
  features/
    contact-form/           # schema.ts (Zod) + contact-form.tsx (RHF)
  services/
    email/                  # Integração Resend
  content/
    types.ts                # Tipos do conteúdo institucional
    pages/home.ts            # Conteúdo da Home (fonte de dados atual)
    lib/get-content.ts       # Interface única de leitura de conteúdo
  lib/
    seo/                     # config.ts, metadata.ts, json-ld.ts
    utils.ts                 # cn() (shadcn)
    rate-limit.ts            # Rate limit in-memory do endpoint de contato
docs/                        # Este diretório
```

Páginas futuras (Empresa, Serviços individuais, Blog) devem seguir o mesmo padrão:
uma pasta em `content/pages/`, um tipo em `content/types.ts`, seções dedicadas em
`components/sections/` quando o layout não for reaproveitável.
