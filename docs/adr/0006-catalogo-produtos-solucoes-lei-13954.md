# ADR 0006 — Catálogo Homologado de Soluções Privadas para Suprir Ausências de Direitos (Lei nº 13.954/2019)

**Status:** Aceito — homologação de parcerias e aderência  
**Categoria:** Arquitetura de Produto / Catálogo de Soluções  
**Responsáveis:** ECOSEG (operação consultiva) e Cyborg Tecnologia (produto e regras de aderência)  
**Data:** 2026-10-19  
**Referência Cruzada:** ADR 0005, ADR-B-001, Lei Federal nº 13.954/2019, M1-Public-Governed-Experience

---

## 1. Contexto

A oportunidade de consultoria junto a militares da ativa, reserva, reformados e pensionistas no Clube dos Taifeiros da Aeronáutica (CTA-RJ) exige a apresentação de soluções privadas reais e regulamentadas para responder à pergunta central da palestra:

> _"O Estado reduziu direitos e extinguiu a pensão vitalícia das filhas. E agora? Qual é a alternativa concreta para proteger a família?"_

Manter o site com produtos corporativos genéricos ou promessas vagas descredibilizaria a operação perante a comunidade militar. Foi necessário coletar, analisar e homologar as lâminas e condições gerais dos parceiros seguradores especializados (**Icatu Seguros**, **GBOEX** e **MAG Seguros**) para criar um mapeamento determinístico entre **lacuna jurídica identificada** e **solução privada recomendada**.

---

## 2. Decisão Arquitetural

Homologar 6 categorias de soluções privadas complementares, associando cada produto a processos SUSEP vigentes e a regras estritas de não incidência em inventário e isenção tributária:

### 2.1 Matriz de Mapeamento Determinístico

```text
Lacuna: Extinção da Pensão de Filhas (Lei 13.954)
  └── Solução: Icatu Equilíbrio Whole Life (SUSEP 154149010412014-34)
  └── Solução Alternativa: GBOEX Força Ativa Resgatável (SUSEP 15414.900658/2017-85)

Lacuna: Confisco de 10,5% na Pensão/Reserva (Art. 3º-A Lei 3.765/60)
  └── Solução: Previdência Privada com Compra de Renda Vitalícia Reversível (Icatu)

Lacuna: Custo e Bloqueio de Bens no Inventário Judicial (Até 23% de Perda)
  └── Solução: Icatu Horizonte Vida Resgatável Nivelado (SUSEP 15414.611834/2025-17)

Lacuna: Vulnerabilidade e Quedas na Terceira Idade (> 60 anos)
  └── Solução: MAG Master Acidentes Domiciliares com Check-Up Lar (SUSEP 15414.606228/2020-75)

Lacuna: Incertezas na Transição de Carreira e Proventos
  └── Solução: Planejamento Previdenciário Consultivo EcoSeg (Atendimento CTA-RJ)
```

---

## 3. Especificação Técnica dos Produtos Homologados

### 3.1 Icatu Equilíbrio (Whole Life)

- **Objetivo:** Formação de patrimônio financeiro garantido e perpétuo para filhas e dependentes sem direito à pensão militar.
- **Capital Segurado:** Mínimo de R$ 500 mil sem limite máximo.
- **Mecanismo:** Indenização integral por morte + Reserva Financeira acumulada no mesmo benefício.
- **Rentabilidade:** 2% a.a. garantido + IPCA + reversão de até 80% do resultado financeiro excedente.
- **Resgate:** A partir do 25º mês (sem carência para invalidez). Opção de portabilidade para VGBL.

### 3.2 Icatu Horizonte (Vida Resgatável Nivelado)

- **Objetivo:** Quitação acelerada durante a vida ativa para desoneração total na velhice.
- **Prazo de Pagamento Flexível:** 5, 10, 15, 20 anos ou vitalício (as parcelas não aumentam com a idade).
- **Coberturas em Vida:** 24 Doenças Graves com pagamento antecipado, DIT, DIH com UTI em dobro e Invalidez por Acidente com majoração.
- **Resgate:** Até 100% da reserva a partir do 25º mês ou uso da reserva para quitação antecipada da apólice.

### 3.3 GBOEX Força Ativa (Resgatável e Tradicional)

- **Objetivo:** Proteção com pedigree histórico militar (GBOEX fundado em 1913 por oficiais do Exército).
- **Público:** Taifeiros, praças, graduados e oficiais das Forças Armadas (Aeronáutica, Exército e Marinha).
- **Diferencial:** Linguagem alinhada à rotina militar e contratação simplificada via desconto em folha ou débito.

### 3.4 MAG Master Acidentes Domiciliares

- **Objetivo:** Blindar a reserva financeira de idosos e pensionistas contra custos de saúde não cobertos integralmente pelo FUNSA/SARAM.
- **Fundamento Epidemiológico:** Ministério da Saúde aponta que 70% das quedas de idosos ocorrem em casa e 40% causam lesões graves.
- **Check-Up Lar:** Serviço assistencial gratuito de instalação de barras de apoio em banheiros, fitas antiderrapantes e reorganização de mobília.

---

## 4. Regras de Interface e Exibição Pública

1. **Apresentação em Cards Padronizados:** Os produtos devem ser exibidos em cards que destacam primeiro a **ausência de direito que suprimem**, e não termos técnicos de seguradora.
2. **Estética da Marca:** Fundo escuro Obsidian (`bg-[#0C121D]`), bordas e acentos em Latão Nobre (`#C5A880` / `text-amber-400`) e selo de vantagem anti-inventário.
3. **Canal Oficial de Conversão:** Todos os cards devem conduzir diretamente ao WhatsApp oficial **(21) 99469-3673** (`https://wa.me/5521994693673`) com mensagem parametrizada identificando o produto de interesse.

---

## 5. Relação com a Plataforma Cyborg Intelligence

- No site público (`SiteEcosegSeguros`): Exibem-se os cards informativos com filtros e chamada para diagnóstico.
- Na plataforma privada da Cyborg: O motor determinístico de aderência cruzará as respostas do militar (idade, força, dependentes, alíquota) e emitirá a recomendação exata da apólice compatível.

---

## 6. Consequências

- O site público passa a entregar resposta concreta para a dor apresentada na palestra.
- A narrativa da palestra do João ganha suporte técnico homologado pelas seguradoras.
- Fica eliminada qualquer menção a marcas ou produtos sem representação oficial ativa no CTA-RJ.
