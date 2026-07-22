# Arquitetura

O frontend segue Clean Architecture adaptada a Next.js App Router: cada camada tem uma
responsabilidade única e depende apenas de camadas mais internas.

```
app/            → rotas, layouts, metadata (camada de apresentação/roteamento)
components/     → UI pura, sem regra de negócio (ui/, layout/, sections/)
features/       → casos de uso client-side com estado próprio (ex: contact-form)
services/       → integrações externas (ex: envio de e-mail via Resend)
content/        → camada de acesso a conteúdo institucional, com interface estável
lib/            → utilitários puros e helpers de SEO
```

## Regra de dependência

`app` → `features`/`components`/`content`/`lib`
`features` → `components`/`lib`, nunca o contrário
`services` não importa de `components` ou `features` — é uma camada de infraestrutura
pura, chamada a partir de `app/api/*`.

## Camada de conteúdo

`src/content/lib/get-content.ts` expõe uma única função de leitura por página
(`getHomeContent()`). Hoje ela lê de objetos TypeScript tipados em `src/content/pages/`;
na Fase 3, quando o Blog for implementado, essa mesma interface poderá passar a ler de
MDX ou de um CMS headless sem que nenhum componente consumidor precise mudar.

## Formulário de contato

`features/contact-form` mantém o schema Zod (`schema.ts`) compartilhado entre o
client (validação no `react-hook-form` via `zodResolver`) e o server
(`app/api/contact/route.ts` revalida o mesmo schema antes de processar o lead).
