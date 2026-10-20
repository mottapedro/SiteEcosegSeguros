# ADR 0008: Conectores de APIs de Seguradoras em Tempo Real & Open Insurance Brasil (SUSEP)

## Status

**APROVADO E HOMOLOGADO** — Outubro de 2026

## Contexto & Motivação

Durante o processo consultivo de planejamento previdenciário e sucessório da **ECOSEG** junto ao público militar (CTA-RJ e demais bases), uma limitação tradicional do mercado de corretagem é a dependência de tabelas manuais estáticas ou estimativas genéricas, que frequentemente geram:

1. **Divergência de idade atuarial:** A seguradora calcula a idade pelo critério atuarial (aniversário mais próximo ou mês civil), gerando frustração quando o valor final difere da estimativa inicial do consultor.
2. **Ausência de protocolo de garantia de preço:** O militar hesita em decidir porque a cotação não possui prazo formal de validade nem número oficial de proposta registrado na seguradora.
3. **Morosidade no fechamento:** O ciclo de venda tradicional exige recotar manualmente no portal da seguradora horas ou dias após a conversa inicial.

Com o amadurecimento do **Open Insurance Brasil (Resolução CNSP nº 415/2021 e Circular SUSEP nº 635/2021 - Fase 3)** e a disponibilidade das **APIs proprietárias de parceiros (Icatu API Hub, MAG Seguros Conecta e Gateway GBOEX)**, a plataforma **Cyborg Intelligence** implementa o barramento de integração de APIs em tempo real.

---

## Decisão de Arquitetura

Implementamos uma camada desacoplada de conectores em tempo real (`InsuranceConnectorsGateway`) composta por:

### 1. Conectores Homologados

- **Icatu Seguros Direct API (v2.4)**
  - Autenticação: OAuth 2.0 (Client Credentials) com mTLS mútuo.
  - Endpoints: `/v2/parceiros/cotacao/vida-individual`, `/v2/parceiros/cotacao/resgatavel`.
  - Capacidade: Cotação instantânea de Whole Life (Icatu Equilíbrio) e Resgatável (Icatu Horizonte), capital até R$ 25 milhões.
  - Garantia de Preço: 15 dias corridos com protocolo SUSEP oficial.

- **MAG Seguros Conecta API (v1.9)**
  - Autenticação: Bearer Token / HMAC-SHA256.
  - Endpoints: `/v1/venda-digital/simulacao`, `/v1/produtos/coberturas-militares`.
  - Capacidade: Seguro de Vida Militar, Invalidez Funcional e Doenças Graves (24 patologias), capital até R$ 10 milhões.
  - Garantia de Preço: 30 dias corridos.

- **GBOEX Previdência & Pecúlio Gateway (v2.1)**
  - Autenticação: API Key Corporativa com assinatura de integridade.
  - Endpoints: `/api/militares/peculio/cotacao`.
  - Capacidade: Pecúlio militar consignado em folha (EB, MB, FAB) e reservas resgatáveis sem necessidade de perícia médica prévia.
  - Garantia de Preço: 20 dias corridos.

- **Open Insurance Brasil (SUSEP OPIN Fase 3)**
  - Padrão oficial aberto do Banco Central / SUSEP para cotação e contratação de seguros de pessoas e previdência complementar.

### 2. Contrato de Resposta Padronizado

Toda cotação via API retorna obrigatoriamente:

- `quoteProtocol`: Número de protocolo oficial da seguradora (ex: `ICATU-COT-2026-98421-MIL`).
- `validUntil`: Timestamp com o prazo exato de expiração da garantia de preço.
- `actuarialDetails`: Tábua biométrica homologada (ex: `BR-EMS 2021 Sb`) e taxa de juros atuarial.
- `pricing`: Prêmio líquido mensal, IOF (0,38%) e prêmio bruto detalhados com precisão de centavos.
- `digitalSignatureHash`: Hash criptográfico SHA-256 para auditoria e comprovação de integridade junto ao cliente.

### 3. Integração com o Workspace Cyborg e Parecer Técnico

- O consultor pode disparar cotações em tempo real com 1 clique diretamente no simulador.
- O Parecer Técnico Oficial emitido para o militar estampa a chancela oficial da cotação com protocolo, validade e hash, eliminando qualquer insegurança jurídica do segurado.

---

## Consequências Positivas

1. **Fechamento imediato:** O militar recebe proposta com garantia de preço legalmente vinculada à seguradora por 15 a 30 dias.
2. **Zero retrabalho:** Elimina redigitações em portais externos.
3. **Transparência atuarial:** Exposição clara do IOF de 0,38% e das regras de resgate da reserva matemática (a partir do 25º mês).
4. **Governança e conformidade:** Total aderência às resoluções da SUSEP e à LGPD (Art. 7º, V da Lei 13.709/2018).
