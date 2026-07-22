# ADR 0004 — pnpm como gerenciador de pacotes

## Status

Aceito

## Contexto

Precisávamos escolher entre npm, yarn e pnpm para instalação de dependências e
scripts do projeto.

## Decisão

Usar pnpm. Instalado localmente via `npm install -g pnpm` neste ambiente (o
`corepack prepare` falhou por permissão de escrita em `Program Files`).

## Consequências

- Instalação mais rápida e eficiente em disco via hard links do content-addressable
  store.
- `pnpm-workspace.yaml` controla quais dependências podem rodar build scripts
  (`onlyBuiltDependencies: [sharp, unrs-resolver]`), reduzindo superfície de ataque
  de scripts de postinstall não confiáveis.
- Novos desenvolvedores devem instalar pnpm (`npm install -g pnpm` ou
  `corepack enable && corepack prepare pnpm@latest --activate` com permissões
  adequadas) antes de rodar `pnpm install`.
