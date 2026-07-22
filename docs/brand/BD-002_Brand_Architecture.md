# BD-002 — Brand Architecture Specification

**Marca:** EcoSeg Seguros

**Identificador:** BD-002

**Categoria:** Arquitetura de Marca

**Status:** Ativo

**Versão:** 1.0

Este documento é a ponte entre o **BD-001 — Brand DNA** (quem somos, permanente) e o futuro **VIS-001 — Visual Identity System** (como isso se materializa visualmente). Aqui não se define logo, cor ou tipografia — define-se a lógica da marca: como ela se organiza, se posiciona, se comunica e se relaciona com o portfólio Cyborg.

---

## 1. Brand Purpose

Herdado do BD-001: existir para proporcionar segurança e tranquilidade, ajudando pessoas e empresas a proteger o que construíram. A marca comunica proteção como consequência de conhecimento e relacionamento, não como produto vendido isoladamente.

## 2. Brand Positioning

A EcoSeg posiciona-se como uma consultoria especializada em proteção patrimonial e gestão de riscos que utiliza conhecimento técnico, atendimento próximo e tecnologia para oferecer soluções de seguros sob medida. Diferencial: diagnóstico antes da apólice, arquétipos Guardião (proteção) + Sábio (conhecimento técnico) — não uma seguradora genérica, e não uma insurtech puramente self-service.

## 3. Brand Architecture

Modelo adotado: **Branded House** — a marca EcoSeg é o elemento central de todas as ofertas; todas as soluções compartilham identidade visual, valores e posicionamento institucional.

```
EcoSeg Seguros (marca corporativa)
│
├── EcoSeg Patrimonial          (Blindagem Patrimonial, Seguro Empresarial, Riscos Operacionais)
├── EcoSeg Responsabilidade Civil (RC Profissional, Empresarial, Médica, Engenharia, Advocatícia, Contábil)
├── EcoSeg Empresas              (Patrimonial + RC + Frota + Benefícios Corporativos)
├── EcoSeg Condomínios           (Seguro Condominial, RC do Síndico/Administradora)
├── EcoSeg Benefícios            (Vida, Saúde, Odontológico, Previdência)
│
├── Portal EcoSeg                (área do cliente)
├── EcoSeg Corretor              (portal da rede comercial)
└── EcoSeg Insights              (centro de conteúdo/educação — candidato a nome do Blog na Fase 3 do site)
```

Estado atual de implementação no `SiteEcosegSeguros`: apenas os produtos **Blindagem Patrimonial** e **Responsabilidade Civil** existem hoje (Home, Fase 1). As demais linhas (EcoSeg Empresas, Condomínios, Benefícios) e plataformas (Portal EcoSeg, EcoSeg Corretor, EcoSeg Insights) são visão de portfólio, não código existente — ver `docs/roadmap.md` para o que está de fato planejado por fase.

## 4. Naming Strategy

Toda nova solução preserva o prefixo `EcoSeg` (ex: EcoSeg Agro, EcoSeg Transportes, EcoSeg Cyber, EcoSeg Invest, se e quando forem criadas). Critérios para uma nova unidade: atender a um mercado claramente definido; possuir proposta de valor própria; complementar o portfólio existente; respeitar os princípios do BD-001.

## 5. Voice & Tone

Consultiva, serena, profissional, empática, didática, confiável, objetiva. Nunca: alarmista, agressiva, arrogante, sensacionalista, excessivamente burocrática. Vocabulário preferencial: proteção, tranquilidade, continuidade, planejamento, prevenção, consultoria, confiança, parceria, patrimônio, responsabilidade, solução personalizada, gestão de riscos. Expressões a evitar (geram urgência/medo): "última oportunidade", "compre agora", "sem isso sua empresa está condenada".

## 6. Communication Principles

1. Orientar antes de vender — o foco inicial é esclarecer e agregar valor.
2. Construir confiança — credibilidade importa mais que conversão imediata.
3. Simplificar o complexo — traduzir termos técnicos em linguagem acessível.
4. Personalizar a mensagem — cada público (empresários, profissionais liberais, condomínios, pessoas físicas) tem riscos e necessidades específicas.
5. Ser consistente — a mesma voz em todos os canais.
6. Valorizar a prevenção.
7. Preservar a ética — nunca usar medo, exagero ou promessas irreais.

Fluxo de atendimento obrigatório: **Ouvir → Compreender → Orientar → Recomendar**, nunca invertido.

## 7. Visual Principles

Ainda não definidos em detalhe — isso é escopo do `VIS-001` (pendente). Direção já registrada em `docs/brand/brand-guidelines.md`, derivada do Manual de Identidade Visual recebido: modernidade, sofisticação, estabilidade, tecnologia, elegância, simplicidade; layouts limpos, espaços amplos, tipografia contemporânea (Inter), ícones minimalistas (Lucide), elementos gráficos discretos; evitar excesso decorativo.

## 8. Experience Principles

Jornada de referência (Customer Experience Architecture, recebida em 2026-07-21): Descoberta → Consideração → Contato Inicial → Diagnóstico → Recomendação → Contratação → Onboarding → Relacionamento Contínuo → Renovação → Defesa da Marca. Princípio fundamental: cada interação deve deixar o cliente mais seguro, mais informado e mais confiante do que antes, independentemente do canal.

## 9. Relationship with EBOS

EBOS (Enterprise Brand Operating System) é um framework/projeto do portfólio Cyborg mencionado no `README.md` do `cyborg-enterprise-framework` como um dos projetos relacionados ao CEF, ao lado de EcoSeg, Cyborg Sniper, CFA e CBA. Não há, até o momento, documentação de EBOS acessível a partir deste repositório definindo como ele se relaciona operacionalmente com a arquitetura de marca da EcoSeg. Este item permanece **em aberto**: se EBOS for o sistema que deve _operar_ a arquitetura de marca aqui descrita (BD-001/BD-002/VIS-001), essa relação precisa ser definida a partir do lado do EBOS/CEF, não assumida aqui.

## 10. Relationship with OCE

**Não identificado.** "OCE" não aparece em nenhum documento de marca recebido nesta conversa, no repositório `SiteEcosegSeguros`, nem no `cyborg-enterprise-framework`. Esta seção fica como placeholder até que o significado e o escopo de OCE sejam esclarecidos — per o princípio de não fabricar conteúdo institucional sem fonte.

## 11. Relationship with Cyborg Sniper

Cyborg Sniper é citado no `README.md` do `cyborg-enterprise-framework` como um dos projetos que adota o CEF como fundação de engenharia, ao lado da EcoSeg. Não há sobreposição de marca conhecida entre Cyborg Sniper e EcoSeg (mercados e propostas de valor distintos, presumivelmente); ambos compartilham apenas a fundação de governança de engenharia (CEF), não a arquitetura de marca (Branded House da EcoSeg é específica à EcoSeg). Nenhuma ação adicional identificada neste momento.

## 12. Future Brand Extensions

Candidatas identificadas em BD-001/documentos de marca recebidos, nenhuma ativa hoje: EcoSeg Agro, EcoSeg Transportes, EcoSeg Internacional, EcoSeg Cyber, EcoSeg Premium, EcoSeg Invest. Qualquer extensão futura deve passar pelos critérios da Seção 4 (Naming Strategy) antes de ser formalizada.

---

## Rastreabilidade

Depende de: `BD-001 — Brand DNA` (fundação permanente que esta arquitetura organiza).

Autoritativo para: estrutura de portfólio de marca, estratégia de nomenclatura, tom de voz, princípios de comunicação e experiência da EcoSeg.

Afeta: `VIS-001` (pendente — sistema visual deriva os Visual Principles §7 em tokens concretos), `docs/brand/brand-guidelines.md` (a ser realinhado quando VIS-001 existir), copy institucional em `src/content/`.

Itens em aberto (registrados em vez de ignorados): §9 (relação com EBOS) e §10 (OCE, não identificado) requerem esclarecimento antes de serem considerados resolvidos.

## Referências

- BD-001 — Brand DNA
- Documentos recebidos em 2026-07-21: Manual de Identidade Visual, Brand Book, Brand Architecture, Brand Messaging Framework, Customer Experience Architecture (CXA), Enterprise Brand Architecture (EBA)
- `docs/brand/brand-guidelines.md`
- `docs/roadmap.md` — o que está de fato planejado por fase no site

---

© EcoSeg Seguros
