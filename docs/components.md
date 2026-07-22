# Componentes

## UI (`src/components/ui`)

Primitivos gerados via shadcn/ui (`base-nova` style, sobre `@base-ui/react`):
`button`, `input`, `textarea`, `card`, `badge`, `label`, `separator`, `sonner` (toasts).
Todos consomem os tokens definidos em `src/app/globals.css` — nunca hardcodear cor.

**Nota Base UI**: `Button` não aceita `asChild` (padrão Radix). Para renderizar como
outro elemento (ex: `Link`), use a prop `render` com o elemento alvo sem filhos
próprios no `Button`:

```tsx
<Button size="lg" render={<Link href="/contato">Texto</Link>} />
```

## Layout (`src/components/layout`)

- `Header` — navegação sticky, links principais, CTA.
- `Footer` — colunas de links + dados de contato.
- `WhatsAppFloat` — botão flutuante fixo, abre `wa.me` com mensagem pré-preenchida.

## Sections (`src/components/sections`)

Cada seção recebe conteúdo tipado via props (vindo de `getHomeContent()`), sem lógica
de fetch própria — mantém o componente puro e testável:

- `Section` — wrapper de layout (container, padding, tom claro/`muted`).
- `Hero`, `Products`, `Differentials`, `Partners`, `Testimonials`, `Cta`, `Contact`.

## Features (`src/features`)

- `contact-form` — `schema.ts` (Zod) + `contact-form.tsx` (React Hook Form,
  honeypot anti-spam, toasts de sucesso/erro via `sonner`).

Novos componentes devem seguir o mesmo padrão de responsabilidade única e reaproveitar
os tokens/variants existentes antes de introduzir novas variações visuais.
