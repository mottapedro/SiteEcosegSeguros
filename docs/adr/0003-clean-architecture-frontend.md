# ADR 0003 — Clean Architecture no frontend

## Status

Aceito

## Contexto

O site deve evoluir para uma plataforma (Portal do Cliente, Portal do Corretor, CRM,
cotação online) sem exigir reescrita da base. Isso exige separação clara entre UI,
casos de uso, integrações externas e acesso a dados desde o início.

## Decisão

Organizar `src/` em camadas com regra de dependência única (ver `docs/architecture.md`):
`components` (UI pura) ← `features` (casos de uso) ← `services`/`content` (infra e
dados) ← `lib` (utilitários puros, sem dependências de framework quando possível).

## Consequências

- Componentes de UI nunca chamam `fetch`/API diretamente — passam por `features` ou
  Server Components que usam `content`/`services`.
- Trocar a fonte de um dado (ex: MDX → CMS, Resend → outro provedor de e-mail) afeta
  apenas a camada `services`/`content`, não os componentes.
- Facilita testes futuros: `features` e `services` podem ser testados isoladamente
  sem montar a árvore de componentes inteira.
