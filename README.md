# EcoSeg — Site Institucional

A EcoSeg estrutura Blindagem Patrimonial e Responsabilidade Civil sob medida para
empresas, condomínios, clínicas e profissionais liberais — com consultoria técnica
do diagnóstico à apólice.

Site institucional/comercial construído em Next.js (App Router), com foco em SEO,
geração de leads e uma arquitetura preparada para evoluir para uma plataforma
(Portal do Cliente, Portal do Corretor, cotação online) sem reescrita.

## Stack

- Next.js 16 (App Router) + TypeScript
- Tailwind CSS v4 + shadcn/ui (`@base-ui/react`)
- React Hook Form + Zod
- Resend (envio de e-mail do formulário de contato)
- pnpm

## Rodando localmente

```bash
pnpm install
pnpm dev
```

Abra [http://localhost:3000](http://localhost:3000).

Para o formulário de contato enviar e-mails, configure `RESEND_API_KEY` em
`.env.local` (ver `.env.example`).

## Scripts

```bash
pnpm dev      # servidor de desenvolvimento
pnpm build    # build de produção
pnpm lint     # ESLint
pnpm format   # Prettier
```

## Documentação

Ver `docs/`:

- `architecture.md` — Clean Architecture aplicada ao projeto
- `folder-structure.md` — o que vive em cada pasta
- `sitemap.md` — mapa do site e status de cada rota
- `components.md` — componentes de UI/layout/seções
- `brand/` — arquitetura de marca, experiência, informação e design system
  (`BD-001` Brand DNA, `BD-002` Brand Architecture, `VIS-001` Visual Identity System,
  `DES-001` Experience Principles, `DES-002` Interaction Language, `WEB-001`
  Information Architecture, `DS-001` Design System, `brand-guidelines.md` com os
  tokens de design derivados dela)
- `adr/` — decisões de arquitetura
- `roadmap.md` / `backlog.md` — próximas fases
