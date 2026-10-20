# Integração de APIs de Seguradoras em Tempo Real (Icatu, MAG, GBOEX & Open Insurance)

## 1. Visão Geral

A integração em tempo real de produtos de seguradoras na plataforma **Cyborg Intelligence** permite que o consultor **ECOSEG** transforme uma simulação consultiva em uma **cotação jurídica e comercialmente válida** no exato instante do atendimento, com número de protocolo oficial e garantia de preço congelada pela seguradora.

---

## 2. Fluxo de Execução da Cotação em Tempo Real

```
[ Militar / Consultor ]
       │
       ▼
[ Simulador Cyborg Intelligence ] (Perfil Militar: Idade, Patente, Renda, Capital)
       │
       ▼ (POST /api/insurance-connectors/quote)
[ Gateway Cyborg Multi-Seguradoras ]
       ├──▶ [ Icatu API Hub v2.4 ] (OAuth 2.0 + mTLS) ──▶ Whole Life / Horizonte
       ├──▶ [ MAG Conecta API v1.9 ] (Bearer Token)  ──▶ Vida Militar / DIT
       ├──▶ [ GBOEX Gateway v2.1 ] (HMAC-SHA256)     ──▶ Pecúlio Consignado
       └──▶ [ Open Insurance Brasil (SUSEP OPIN) ]    ──▶ Padrão Aberto
       │
       ▼ (Retorno em < 200ms)
[ Resposta com Protocolo Oficial, Validade 15-30 dias, Hash SHA-256 e Prêmio Centesimal ]
       │
       ▼
[ Parecer Técnico Oficial & Dossiê CTA-RJ com Selo de Validação SUSEP ]
```

---

## 3. Especificação dos Conectores

### 3.1 Icatu Seguros (Processo SUSEP 154149010412014-34)

- **Ambiente de Homologação (Sandbox):** `https://sandbox.icatuseguros.com.br/v2/`
- **Ambiente de Produção:** `https://api.icatuseguros.com.br/v2/`
- **Produtos Habilitados:**
  - Icatu Equilíbrio (Whole Life com Acumulação de Reserva e Resgate após o 25º mês)
  - Icatu Horizonte (Vida Resgatável Flexível com Quitação Nivelada)
- **Tábua Atuarial:** BR-EMS 2021 Sb com juros atuariais de 2% a.a. + IPCA.
- **Validade da Cotação:** 15 dias corridos.

### 3.2 MAG Seguros (Processo SUSEP 15414.004128/2024-81)

- **Ambiente de Homologação (Sandbox):** `https://api-sandbox.mag.com.br/v1/`
- **Ambiente de Produção:** `https://api.mag.com.br/v1/`
- **Produtos Habilitados:**
  - MAG Vida Militar (com coberturas especiais para missões e operações)
  - Diária por Incapacidade Temporária (DIT) e Doenças Graves (24 patologias)
- **Tábua Atuarial:** AT-2000 Suavizada 10%.
- **Validade da Cotação:** 30 dias corridos.

### 3.3 GBOEX Previdência e Pecúlio (Processo SUSEP 15414.900214/2024-09)

- **Ambiente de Homologação (Sandbox):** `https://gateway-sandbox.gboex.com.br/api/`
- **Ambiente de Produção:** `https://gateway.gboex.com.br/api/`
- **Produtos Habilitados:**
  - GBOEX Força Ativa Resgatável
  - GBOEX Pecúlio Militar Especial das Forças Armadas
- **Tábua Atuarial:** Mortalidade Militar GBOEX-EB/MB/FAB.
- **Validade da Cotação:** 20 dias corridos.

---

## 4. Segurança e Auditoria Criptográfica

Cada cotação gerada via conector carrega um hash criptográfico gerado a partir do payload oficial:

```
HASH = SHA256(protocolo + timestamp + cpf_anonimizado + capital + premio_bruto + processo_susep)
```

Esse hash é inserido tanto no Dossiê digital quanto no documento impresso entregue ao militar, garantindo autenticidade incontestável perante o segurado, a corretora e a seguradora parceira.
