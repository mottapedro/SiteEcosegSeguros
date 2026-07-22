# Roadmap

## Fase 1 — Arquitetura, Design System, Estrutura Base, SEO, Home (esta entrega)

- Bootstrap Next.js (App Router, TS, Tailwind v4, shadcn/ui).
- Design tokens alinhados ao Manual de Marca (ver `docs/brand/brand-guidelines.md`,
  `docs/brand/BD-001_Brand_DNA.md`, `docs/brand/BD-002_Brand_Architecture.md`).
- Layout global (Header, Footer, WhatsApp flutuante).
- Home completa: Hero, Produtos, Diferenciais, Parceiros, Depoimentos, CTA, Contato.
- Formulário de contato com validação Zod client+server e envio via Resend.
- SEO técnico: metadata dinâmica, Organization JSON-LD, sitemap.xml, robots.txt.
- Documentação de arquitetura, ADRs, backlog e roadmap.

## Fase 2 — Empresa, Serviços, Contato, WhatsApp

- Páginas dedicadas: `/empresa` (história, missão, visão, valores, equipe),
  `/servicos` (índice), `/servicos/blindagem-patrimonial`,
  `/servicos/responsabilidade-civil`, `/contato` (página própria além da seção Home).
- Service + Breadcrumb JSON-LD nas páginas de serviço (helpers já existem em
  `lib/seo/json-ld.ts`).
- Captcha real no formulário (ex: Cloudflare Turnstile) se o honeypot se mostrar
  insuficiente.

## Fase 3 — Blog, CMS, Analytics, LGPD

- Avaliar MDX vs. CMS headless para o Blog (ver ADR 0002).
- Página de busca do blog.
- Google Analytics 4 + Google Tag Manager.
- Banner de cookies + política de privacidade (LGPD).
- Newsletter.

## Fase 4 — Otimizações, Performance, Testes, Deploy

- Auditoria Lighthouse completa (meta: 95+ em todas as categorias).
- Testes automatizados (unitários em `features`/`lib`, E2E no fluxo de contato).
- Deploy em Vercel com preview deployments por PR.
- Rate limit durável (Upstash/Redis) substituindo o in-memory atual, se necessário.

## Visão de longo prazo

Arquitetura preparada para, sem reescrita da base:

- Portal do Cliente e Portal do Corretor (novas rotas autenticadas em `app/`).
- Solicitação e acompanhamento de sinistros, emissão de propostas, cotação online.
- Integração com CRM, ERP, assinatura eletrônica e APIs de seguradoras via a mesma
  camada `services/`.
- Painéis administrativos e BI.
