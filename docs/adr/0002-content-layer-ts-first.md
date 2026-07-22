# ADR 0002 — Camada de conteúdo: TS tipado agora, MDX/CMS depois

## Status

Aceito (revisão da decisão inicial de "MDX desde a Fase 1")

## Contexto

O planejamento original previa usar MDX local para todo o conteúdo institucional
desde a Fase 1. Ao implementar, a Home não exigia rich text/markdown — apenas dados
estruturados (produtos, diferenciais, depoimentos) — e introduzir o pipeline MDX
(loader, componentes customizados, remark/rehype) sem um caso de uso real (o Blog,
que de fato precisa de markdown, é Fase 3) adicionaria complexidade sem benefício
imediato.

## Decisão

Implementar `src/content/lib/get-content.ts` como interface única de leitura
(`getHomeContent()`), hoje resolvida a partir de objetos TypeScript tipados em
`src/content/pages/`. Quando o Blog for construído na Fase 3, a mesma interface passa
a resolver a partir de MDX ou de um CMS headless — sem alterar nenhum componente
consumidor.

## Consequências

- Menos dependências e configuração na Fase 1.
- Conteúdo tipado end-to-end (erros de shape aparecem em build, não em runtime).
- Ao chegar a Fase 3, avaliar MDX vs. CMS headless com base na necessidade real de
  quem vai editar o Blog (marketing sem acesso ao código → CMS; devs → MDX).
