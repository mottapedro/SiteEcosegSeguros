# ADR 0001 — Next.js App Router

## Status

Aceito

## Contexto

O site precisa de SEO forte (SSR/SSG, metadata dinâmica, sitemap/robots nativos),
performance alta e um caminho de evolução para funcionalidades autenticadas (Portal
do Cliente, Portal do Corretor) sem reescrita.

## Decisão

Usar Next.js 16 com App Router (não Pages Router), TypeScript estrito, `src/` dir e
pnpm como gerenciador de pacotes.

## Consequências

- Metadata API nativa (`generateMetadata`, `sitemap.ts`, `robots.ts`) elimina a
  necessidade de bibliotecas de SEO de terceiros.
- Server Components por padrão reduzem JS enviado ao cliente; componentes
  interativos (formulário) são marcados `"use client"` explicitamente.
- Estrutura de rotas por pasta facilita adicionar áreas autenticadas futuramente
  (ex: `app/(portal)/...`) sem afetar o site público.
