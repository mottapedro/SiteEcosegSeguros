# Diretrizes de Marca (resumo operacional)

Fonte: Manual de Identidade Visual, Design System, Brand Book e Brand DNA da EcoSeg
(recebidos do time em 2026-07-21). Este documento resume as decisões que afetam
diretamente o código — para o contexto estratégico completo, ver
`docs/brand/BD-001_Brand_DNA.md` (fundação permanente da marca) e
`docs/brand/BD-002_Brand_Architecture.md` (arquitetura de portfólio, tom de voz,
princípios de comunicação e experiência). Este documento será realinhado quando
`VIS-001 — Visual Identity System` for formalizado, substituindo os tokens abaixo
(hoje derivados diretamente do Manual de Identidade Visual) pelos tokens oficiais
do sistema visual.

## Essência

- **Arquétipos**: Guardião (proteção) + Sábio (conhecimento técnico, orientação).
- **Mensagem central**: "Proteção inteligente para quem valoriza seu patrimônio, seus
  negócios e sua tranquilidade."
- **Tom de voz**: consultivo, claro, educativo, transparente. Nunca agressivo,
  sensacionalista ou excessivamente comercial/jurídico. Explicar antes de vender.

## Tokens implementados (`src/app/globals.css`)

**Atualizado per `ADR-B-003 — Primary Color Reassignment`** (`docs/brand/decisions/ADR-B-003-Primary-Color-Reassignment.md`): Verde Eco é agora a cor primária institucional; Azul Institucional passou a secundária/accent.

| Papel na marca     | Token shadcn             | Light               | Uso                                     |
| ------------------ | ------------------------ | ------------------- | --------------------------------------- |
| Verde Eco          | `--primary`              | `#1f7a5c`           | Botões principais, links, hero, menu    |
| Azul Institucional | `--accent`               | `#0b3d63`           | Ícones, indicadores, elementos de apoio |
| Cinza Grafite      | `--muted-foreground`     | `#5b6169`           | Textos de apoio, navegação              |
| Branco / neutros   | `--background`/`--muted` | `#ffffff`/`#f4f5f6` | Fundos, cards, inputs                   |

Tema escuro definido nos mesmos papéis com luminosidade ajustada — ver `globals.css`. Papéis "Decision/Alert" (Amber) e "Surface Neutral" (Cream) introduzidos por `ADR-B-003` permanecem provisórios, sem hex confirmado, não implementados nesta tabela.

- **Tipografia**: Inter (única família), carregada via `next/font/google` em
  `src/app/layout.tsx`. Fonte mono reservada a dados tabulares usa a stack do sistema.
- **Grid/Container**: `max-w-7xl` (1280px), coerente com a faixa 1200–1280px do manual.
- **Bordas**: `--radius: 0.375rem` — levemente arredondado, sem cantos extremos.
- **Sombras**: discretas (`shadow-sm`/`shadow-md`), nunca `shadow-xl`/glow.
- **Ícones**: Lucide, outline, já em uso em todo o projeto.
- **Acessibilidade**: contraste AA verificado nos pares texto/fundo acima; manter ao
  criar novos componentes.

Qualquer novo componente ou página deve derivar cor/tipografia destes tokens — não
introduzir novos hex codes sem atualizar esta tabela.

## Documentos estratégicos adicionais (recebidos em 2026-07-21)

O usuário também enviou Brand Architecture, Brand Messaging Framework, Customer
Experience Architecture (CXA) e Enterprise Brand Architecture (EBA). São documentos de
governança/estratégia de marca, não de design system — não exigem mudança no código já
implementado. Pontos relevantes para fases futuras:

- **Arquitetura de marca (Branded House)**: futuras linhas de negócio usam o prefixo
  `EcoSeg` (ex: EcoSeg Patrimonial, EcoSeg Responsabilidade Civil, EcoSeg Empresas,
  EcoSeg Condomínios, EcoSeg Benefícios) e três plataformas digitais — Portal EcoSeg
  (cliente), EcoSeg Corretor, EcoSeg Insights (conteúdo/blog). Relevante para nomear
  rotas e IA quando o Portal do Cliente/Corretor forem construídos (visão de longo
  prazo já registrada em `docs/roadmap.md`); o Blog da Fase 3 pode adotar o nome
  "EcoSeg Insights".
- **Messaging Framework**: reforça o vocabulário já usado no copy da Home (`proteção`,
  `tranquilidade`, `continuidade`, `prevenção`, `consultoria`, `patrimônio`, `gestão de
riscos`) e lista frases proibidas por criarem urgência/medo ("última oportunidade",
  "compre agora", "sem isso sua empresa está condenada") — nenhuma presente no copy
  atual. Fluxo de atendimento recomendado: Ouvir → Compreender → Orientar → Recomendar,
  já refletido no CTA da Home ("Vamos mapear os riscos do seu negócio?").
- **CXA**: define a jornada completa (Descoberta → Consideração → Diagnóstico →
  Recomendação → Contratação → Onboarding → Relacionamento → Renovação) — relevante
  para o design do Portal do Cliente e do fluxo pós-lead nas Fases 2–4, não para a Home
  atual.
- **EBA**: framework de governança corporativa da marca (camadas Foundation → Identity
  → Communication → Experience → Digital → Technology → Governance). Referência para
  decisões futuras de arquitetura de informação, não requer ação de código.
