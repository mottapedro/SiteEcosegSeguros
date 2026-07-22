# WEB-001 — Information Architecture

**Marca:** EcoSeg Seguros

**Identificador:** WEB-001

**Categoria:** Arquitetura de Informação

**Status:** Ativo

**Versão:** 1.0

Esta é a arquitetura completa do website institucional da EcoSeg, derivada diretamente da **Progress Protection Philosophy** (`DES-001 §2`): Adversidades → Mapa Estratégico do Contexto → Compreensão → Decisão → Proteção → Progresso. Cada seção do site existe porque representa uma etapa dessa filosofia — nenhuma seção foi incluída por convenção de "site institucional típico" (sobre nós, serviços, contato) sem essa justificativa.

---

## Princípio Organizador

O site não é uma lista de páginas. É a filosofia percorrível. A pergunta que decide se uma seção existe e onde ela vive não é "que página um site de seguros normalmente tem?" — é **"que etapa da Progress Protection Philosophy esta seção representa, e para quem?"**

| Etapa da Filosofia (`DES-001 §2`) | Seção correspondente                                        |
| --------------------------------- | ----------------------------------------------------------- |
| Adversidades                      | Segmentos (cada público reconhece sua própria adversidade)  |
| Mapa Estratégico do Contexto      | Mapa Estratégico do Contexto (a prática, não só o conceito) |
| Compreensão                       | A Filosofia + Metodologia + Quem Somos                      |
| Decisão                           | Soluções + Contato                                          |
| Proteção                          | Soluções (conteúdo de cobertura)                            |
| Progresso                         | Conteúdos (relacionamento contínuo, per `DES-001 §6`)       |

Note que "Compreensão" mapeia para três seções, não uma — porque compreensão tem três componentes distintos: compreender _o método_ (A Filosofia), compreender _o processo_ (Metodologia), e confiar em _quem_ aplica o método (Quem Somos). Tratar os três como uma única página "Sobre" dissolveria essa distinção.

---

## Mapa de Navegação

```
Home
│
├── A Filosofia              (Compreensão do método)
│     └── → Metodologia       (link direto: da abstração à prática)
│
├── Mapa Estratégico do Contexto   (Adversidades → Compreensão, prática)
│
├── Soluções                 (Decisão + Proteção)
│     ├── Blindagem Patrimonial
│     ├── Responsabilidade Civil
│     └── (futuro, per BD-002 §3: Empresas, Condomínios, Benefícios)
│
├── Segmentos                (Adversidades, por audiência)
│     ├── Empresas
│     ├── Profissionais Liberais
│     ├── Condomínios
│     └── Pessoas Físicas
│
├── Metodologia               (Compreensão do processo)
│
├── Quem Somos                (Compreensão de quem)
│
├── Conteúdos                 (Progresso — relacionamento contínuo)
│
└── Contato                   (Decisão → ação)
```

### Hierarquia (profundidade)

- **Nível 0 (Home)**: a filosofia inteira, comprimida — ver §Home abaixo.
- **Nível 1 (navegação primária)**: A Filosofia, Mapa Estratégico do Contexto, Soluções, Segmentos, Metodologia, Quem Somos, Conteúdos, Contato.
- **Nível 2**: páginas de produto sob Soluções (`/solucoes/blindagem-patrimonial`, etc.), páginas de audiência sob Segmentos, artigos sob Conteúdos.

Nenhuma seção de Nível 1 deve ter mais de um nível de profundidade adicional — se uma página de Nível 2 precisar de subpáginas próprias, isso é sinal de que ela deveria ser promovida a Nível 1 (per `VIS-001 §1.2`, "clareza acima da ornamentação", aplicado aqui à profundidade de navegação).

---

## Seções — Razão Arquitetural, Fluxos, Conteúdo Esperado

### Home

**Razão arquitetural:** a Home não é uma introdução — é a Progress Protection Philosophy inteira, comprimida em uma página, na ordem exata (Adversidades → Mapa → Compreensão → Decisão → Proteção → Progresso). Isso já está parcialmente implementado (Hero → Produtos → Diferenciais → Parceiros → Depoimentos → CTA → Contato, ver `docs/sitemap.md`) e deve ser revisado para refletir a sequência com mais precisão. **Especificação completa, capítulo a capítulo, em `WEB-002 — Home Narrative Design`** — incluindo a reconciliação exata entre a ordem atual do código e a ordem narrativa correta.

**Conteúdo esperado:** Hero (nomeia a adversidade + promete compreensão antes de venda), prévia de Segmentos (o visitante se reconhece), prévia de Soluções, prova social (Depoimentos — evidência de Progresso alcançado por outros), CTA para Mapa Estratégico do Contexto ou Contato.

**Relacionamentos:** ponto de entrada para todas as outras seções; nenhuma outra seção aponta _para_ a Home exceto o logo/header.

### A Filosofia

**Razão arquitetural:** compreensão do _método_ antes de qualquer produto. Esta página existe para responder "por que a EcoSeg pensa assim?" — expõe publicamente a Progress Protection Philosophy (`DES-001 §2`), sem jargão (`VIS-001 §1.4`, critério do síndico). É a página mais filosófica do site e a mais suscetível ao risco de soar autocentrada — deve ser escrita a partir do benefício ao cliente, não como manifesto interno.

**Conteúdo esperado:** o fluxo Adversidades→Progresso explicado em linguagem simples; por que "compreensão antes de decisão" (`DES-001 §3.1`) importa para o visitante, não para a EcoSeg; link direto para Metodologia ("veja como isso funciona na prática").

**Relacionamentos:** alimenta Metodologia (abstrato → concreto); referenciada por Quem Somos (a filosofia é praticada pelas pessoas descritas ali).

### Mapa Estratégico do Contexto

**Razão arquitetural:** esta é a única seção que representa uma _prática_, não uma explicação. Corresponde à etapa "Mapa Estratégico do Contexto" da filosofia — o diagnóstico real do contexto de risco do visitante. Distinta de "A Filosofia" (que explica o método em geral) e de "Metodologia" (que explica o processo de atendimento em geral): esta página é sobre _o contexto específico de quem está lendo_.

**Conteúdo esperado:** explicação de como um diagnóstico é conduzido (patrimônio, operação, relações, exposição — `DES-001 §2`); exemplos de contexto mapeado (sem expor dados reais de clientes); CTA para iniciar um diagnóstico real via Contato. Candidato natural a evoluir para uma ferramenta interativa de autodiagnóstico em fase futura (fora do escopo desta arquitetura, mas a página deve ser desenhada sem fechar essa porta).

**Relacionamentos:** ponto de conversão principal junto com Contato; referenciada a partir de Soluções ("antes de escolher uma cobertura, mapeie seu contexto").

### Soluções

**Razão arquitetural:** representa Decisão + Proteção — o momento em que compreensão se converte em cobertura concreta. Organizada por produto (Blindagem Patrimonial, Responsabilidade Civil hoje; Empresas/Condomínios/Benefícios per `BD-002 §3`, quando existirem), não por "planos" ou preço — a lógica de decisão da EcoSeg é diagnóstico-primeiro, não catálogo-primeiro (`DES-001 §8`).

**Conteúdo esperado:** por produto — o que cobre, riscos mitigados, para quem é indicado (cross-link com Segmentos), exemplo real (já presente na Home, `src/content/pages/home.ts`), CTA para Mapa Estratégico do Contexto ou Contato direto.

**Relacionamentos:** recebe tráfego de Segmentos (audiência → produto relevante) e de Mapa Estratégico do Contexto (diagnóstico → produto recomendado); envia para Contato.

### Segmentos

**Razão arquitetural:** representa Adversidades — mas adversidade não é genérica, é específica de quem a enfrenta. Um condomínio e um profissional liberal não reconhecem o mesmo risco na mesma linguagem (`BD-002 §6`: "personalizar a mensagem"). Esta seção existe para que cada visitante se veja no site nos primeiros segundos, em vez de precisar traduzir uma mensagem genérica para sua própria situação.

**Conteúdo esperado:** por segmento (Empresas, Profissionais Liberais, Condomínios, Pessoas Físicas per `BD-002 §8`) — a adversidade típica desse público, em sua linguagem; link direto para as Soluções relevantes a esse segmento (não todas as soluções).

**Relacionamentos:** ponte entre Home/entrada e Soluções; nenhuma outra seção depende de Segmentos, mas Soluções e a Home a referenciam.

### Metodologia

**Razão arquitetural:** compreensão do _processo_ — distinta de A Filosofia (que é abstrata) e de Mapa Estratégico do Contexto (que é sobre o contexto do visitante especificamente). Metodologia responde "como funciona o atendimento, do primeiro contato à apólice?" — é a versão pública e narrativa da Customer Experience Architecture (`BD-002 §8`, mapeada em `DES-001 §2`).

**Conteúdo esperado:** as etapas do atendimento (Ouvir → Compreender → Orientar → Recomendar, `BD-002 §6`) narradas do ponto de vista do cliente, não como fluxograma interno; o que o cliente pode esperar em cada etapa (tempo, informação necessária, o que muda).

**Relacionamentos:** link direto a partir de A Filosofia; alimenta a decisão de ir para Contato com expectativas corretas (reduz fricção, per `DES-001 §4`).

### Quem Somos

**Razão arquitetural:** compreensão de _quem_ aplica o método — a filosofia e a metodologia só geram confiança se houver pessoas reais e verificáveis por trás delas (arquétipo Guardião+Sábio, `BD-001`, exige presença humana, não apenas texto institucional). Corresponde ao escopo já previsto para `/empresa` em `docs/roadmap.md` (Fase 2), mas reenquadrado: não é "história da empresa" genérica, é evidência de que a filosofia é praticada por pessoas específicas.

**Conteúdo esperado:** missão/visão/valores (já resumidos de `BD-001`), equipe (com credenciais técnicas relevantes ao diagnóstico, não apenas fotos), história da empresa como evidência de permanência (`BD-001`: "confiança construída ao longo do tempo").

**Relacionamentos:** referenciada por A Filosofia e por Metodologia; não gera tráfego de saída forte — é uma página de validação, não de conversão direta.

### Conteúdos

**Razão arquitetural:** representa Progresso — a etapa final da filosofia não é a venda, é o cliente (ou visitante) seguir avançando com mais compreensão sobre gestão de risco, mesmo sem converter imediatamente. Corresponde ao "EcoSeg Insights" já nomeado em `BD-002 §3` e ao `/blog` já previsto em `docs/roadmap.md` (Fase 3), aqui integrado à arquitetura filosófica em vez de ser apenas um blog de SEO.

**Conteúdo esperado:** artigos organizados por etapa da filosofia a que respondem (ex: um artigo sobre "como mapear risco patrimonial" serve a Compreensão; um artigo de renovação/aniversário de apólice serve a Progresso) — não apenas por categoria de produto.

**Relacionamentos:** hub de linkagem interna — todo artigo deve linkar de volta à seção de Soluções, Segmentos ou Metodologia relevante ao tema; único ponto de reentrada natural para visitantes que já converteram (relacionamento contínuo, não aquisição).

### Contato

**Razão arquitetural:** o ponto de ação da etapa Decisão — mas per `DES-001 §8`, nunca deve ser a primeira coisa solicitada. Existe como página dedicada (per `docs/roadmap.md`, Fase 2) além da seção já presente na Home, para servir como destino de CTAs vindos de qualquer outra seção com contexto já estabelecido (ex: "Contato" a partir de uma página de Soluções deve chegar com o produto já identificado, não em um formulário genérico).

**Conteúdo esperado:** formulário (já implementado, `src/features/contact-form/`), canais diretos (telefone, e-mail, WhatsApp), e — critério arquitetural importante — o formulário deve poder receber contexto da página de origem (ex: campo "assunto" pré-selecionado quando vindo de uma página de produto específica).

**Relacionamentos:** destino final a partir de todas as seções; nenhuma seção depende dela como origem.

---

## Fluxos Principais

1. **Fluxo de descoberta (novo visitante, sem contexto prévio):** Home → Segmentos (autoidentificação) → Soluções (produto relevante) → Mapa Estratégico do Contexto (compreensão do próprio risco) → Contato.
2. **Fluxo de confiança (visitante cético ou comparando corretoras):** Home → A Filosofia → Quem Somos → Metodologia → Soluções → Contato.
3. **Fluxo de conteúdo/SEO (chegada via busca):** Conteúdos (artigo específico) → seção relevante (Soluções/Segmentos/Metodologia, via link contextual) → Contato.
4. **Fluxo de relacionamento contínuo (cliente já convertido, fora do escopo de conversão):** Conteúdos — não há fluxo de reconversão forçada aqui; corresponde à etapa Progresso, que per `DES-001 §3.3` não é medida por conversão.

Nenhum fluxo pula Compreensão (A Filosofia/Metodologia/Quem Somos/Mapa Estratégico do Contexto) antes de chegar a Contato — mesmo o fluxo de conteúdo/SEO passa por uma seção de compreensão antes do CTA de contato, per `DES-001 §4` ("nenhuma etapa pode ser pulada para acelerar uma conversão").

---

## Relação com o Roadmap Existente

Esta arquitetura expande o escopo originalmente registrado em `docs/roadmap.md` (Fase 2: Empresa/Serviços/Contato; Fase 3: Blog). Reconciliação necessária, registrada aqui como item em aberto e não decidida silenciosamente:

| Rota já planejada (`docs/roadmap.md`) | Seção desta arquitetura                 |
| ------------------------------------- | --------------------------------------- |
| `/empresa`                            | Quem Somos (mesmo escopo, reenquadrado) |
| `/servicos`, `/servicos/*`            | Soluções (renomeado — ver nota abaixo)  |
| `/contato`                            | Contato (sem mudança)                   |
| `/blog`                               | Conteúdos (mesmo escopo, reenquadrado)  |
| — (não existia)                       | A Filosofia (nova)                      |
| — (não existia)                       | Mapa Estratégico do Contexto (nova)     |
| — (não existia)                       | Segmentos (nova)                        |
| — (não existia)                       | Metodologia (nova)                      |

**Nota sobre nomenclatura:** "Soluções" substitui "Serviços" nesta arquitetura porque "serviços" é vocabulário de prestador de serviço genérico, enquanto "soluções" carrega a lógica de diagnóstico-primeiro já estabelecida. Isso é uma sugestão desta arquitetura, não uma decisão retroativa sobre rotas já implementadas — `docs/roadmap.md` e `docs/sitemap.md` devem ser atualizados para refletir esta arquitetura antes da Fase 2 começar a implementação, não depois.

---

## Rastreabilidade

Depende de: `DES-001` (Progress Protection Philosophy — fonte direta da tabela organizadora), `BD-001` (Brand DNA), `BD-002` (Brand Architecture — §3 portfólio, §6 comunicação, §8 CXA), `VIS-001` (critérios de avaliação aplicados a profundidade de navegação e nomenclatura).

Afeta: `docs/roadmap.md` e `docs/sitemap.md` (precisam ser atualizados para refletir esta arquitetura — ver tabela de reconciliação acima); qualquer implementação futura de Fase 2/3 do site.

Itens em aberto:

- Reconciliação formal de `docs/roadmap.md`/`docs/sitemap.md` com esta arquitetura — ainda não feita, apenas mapeada.
- Renomeação "Serviços" → "Soluções" — sugerida aqui, não decidida como mudança retroativa de rota.
- Mapa Estratégico do Contexto como ferramenta interativa (autodiagnóstico) — mencionado como direção futura, fora do escopo desta arquitetura.

## Referências

- DES-001 — Experience Principles
- BD-001 — Brand DNA
- BD-002 — Brand Architecture Specification
- VIS-001 — Visual Identity System
- WEB-002 — Home Narrative Design (especificação completa da Home, capítulo a capítulo)
- `docs/roadmap.md`, `docs/sitemap.md` — estado atual de implementação

---

© EcoSeg Seguros
