# Ecossistema de Domínio ECOSEG — Intenção Estratégica do Sistema

**Status:** Aprovado & Organizado no Ecossistema de Domínio  
**Organização:** ECOSEG Seguros (Operação Consultiva) & Cyborg Tecnologia (Produto SaaS e Tecnologia)  
**Data de Registro:** 2026-10-19  
**Referência Cruzada:** ADR 0005, ADR-B-001, Lei Federal nº 13.954/2019, M1-Public-Governed-Experience

---

## 1. Conclusão Principal do Diagnóstico

> "A base arquitetural é boa e está documentada, mas o site publicado ainda representa uma corretora corporativa genérica — não a nova operação consultiva para militares, pensionistas, palestra e SaaS da Cyborg."

A oportunidade validada com João amplia a atuação da ECOSEG: deixa de ser apenas uma vitrine institucional passiva e torna-se um **ecossistema de diagnóstico, conscientização e consultoria personalizada**, iniciando no Clube dos Taifeiros da Aeronáutica do Rio de Janeiro (CTA) com militares da ativa, reserva, reformados, pensionistas e dependentes.

---

## 2. Diagnóstico da Arquitetura e Permissões no GitHub

- **GitHub:** Conectado como `mottapedro` no repositório `SiteEcosegSeguros`.
- **Stack do Site Público:**
  - Next.js 16 com App Router e TypeScript;
  - Tailwind CSS e shadcn/ui;
  - Conteúdo institucional tipado;
  - React Hook Form e Zod;
  - Resend para envio de notificações;
  - Separação de camadas: `app`, `components`, `features`, `content`, `services`, `lib`;
  - Documentação por ADRs (Architecture Decision Records);
  - SEO, sitemap, robots e Schema.org JSON-LD.

---

## 3. Matriz dos 8 Problemas Prioritários e Resoluções no Domínio

| #     | Problema Diagnosticado                                                      | Causa Raiz                                                                      | Diretriz de Resolução no Domínio                                                                                                                              |
| ----- | --------------------------------------------------------------------------- | ------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **1** | **Navegação promete rotas não existentes** (`/empresa`, `/servicos`, etc.)  | Links estáticos no menu sem páginas correspondentes em `src/app`.               | Priorizar na V1 as rotas reais: Home, Palestra/Militar, Diagnóstico e Contato.                                                                                |
| **2** | **Dados fictícios publicados** (telefone `+55 11 0000-0000`, São Paulo)     | Placeholders iniciais não atualizados.                                          | Atualizar para os dados oficiais da operação no Rio de Janeiro (CTA / RJ): Telefone/WhatsApp **(21) 99469-3673** (`5521994693673`) e `contato@ecoseg.com.br`. |
| **3** | **Home apresenta produto antes da dor** (Hero → Produtos → Diferenciais...) | Violação da filosofia: _Compreensão precede Decisão que precede Proteção_.      | Reordenar a narrativa: **Expectativa da Família Militar → Mudança Jurídica → Lacuna de Proteção → Diagnóstico → Soluções → Atendimento**.                     |
| **4** | **Contradição visual: ícone de escudo (`ShieldCheck`)**                     | Ícone genérico violando a ADR-B-001 e restrições anti-clichê da DES-006.        | Substituir em todo o sistema pela **EcoSegLogo oficial** (Horizonte & Compreensão).                                                                           |
| **5** | **Novo Domínio Militar inexistente na arquitetura**                         | Tipos conhecem apenas produtos corporativos genéricos.                          | Criar os modelos formais de domínio: `NormaJuridica`, `PerfilMilitar`, `LacunaProtecao`, `CategoriaSolucao`, `RoteiroPalestra`.                               |
| **6** | **Formulário não adequado à LGPD**                                          | Coleta de dados sem finalidade, base legal ou rastreabilidade de consentimento. | Implementar contrato de consentimento LGPD explícito (Art. 7º, V/IX) e política de retenção.                                                                  |
| **7** | **Acoplamento arquitetural pontual**                                        | `services/email` importa tipos diretamente de `features/contact-form`.          | Desacoplar criando camada neutra de contratos: `src/domain/contracts/leads`.                                                                                  |
| **8** | **Proteções operacionais provisórias**                                      | Rate limit em memória, sem persistência nem workflow de auditoria.              | Separar a captura pública rápida do motor privado seguro na Cyborg Intelligence.                                                                              |

---

## 4. Fronteira Arquitetural do Ecossistema

```text
┌────────────────────────────────────────────────────────┐
│     ECOSEG — Superfície Pública (Repositório Público)  │
├────────────────────────────────────────────────────────┤
│ • Identidade e posicionamento institucional            │
│ • Conteúdo público aprovado e auditado                 │
│ • Vertical de Proteção da Família Militar              │
│ • Página oficial do evento / Palestra CTA              │
│ • Modo Apresentação do Palestrante (Roteiro interativo)│
│ • Diagnóstico inicial de baixa sensibilidade           │
│ • Consentimento LGPD transparente                      │
│ • Encaminhamento consultivo                            │
└───────────────────────────┬────────────────────────────┘
                            │
                            │ Contrato neutro de API / Leads
                            ▼
┌────────────────────────────────────────────────────────┐
│   Cyborg Intelligence — Plataforma Privada (SaaS B2B)  │
├────────────────────────────────────────────────────────┤
│ • Motor proprietário da Cyborg Tecnologia              │
│ • Autenticação, RBAC, organizações e consultores       │
│ • Perfis militares aprofundados e histórico familiar   │
│ • Base jurídica completa versionada e jurisprudência   │
│ • Motor determinístico de aderência de apólices        │
│ • Diagnóstico consultivo confidencial e auditoria      │
└────────────────────────────────────────────────────────┘
```

---

## 5. As Sete Decisões da Evolução ECOSEG (ADR 0005)

1. **O que permanece no site público:** Posicionamento de marca, conscientização jurídica pública, roteiro do evento, cálculo preliminar de impacto e agendamento.
2. **O que pertence ao SaaS Cyborg:** Inteligência algorítmica de recomendação, dados pessoais sensíveis, auditoria e motor comercial multi-corretora.
3. **Como a palestra é representada:** Experiência sincronizada entre o palestrante (slides/roteiro com argumentos e dados de pensão) e o público (acesso via QR Code no celular para simulação).
4. **Governança do conteúdo jurídico:** Fontes primárias indexadas (Diário Oficial, Lei 13.954/2019, Portarias das Forças Armadas) com número de artigo, parágrafo e status de validação jurídica.
5. **Entrega de dados do diagnóstico:** O lead público envia apenas inputs essenciais com consentimento rastreável para a fila da consultoria.
6. **Fundamento LGPD:** Coleta minimizada sob o fundamento de execução de procedimentos preliminares a pedido do titular (Art. 7º, V) e legítimo interesse (Art. 7º, IX).
7. **Corte da V1:** Foco estrito no Marco 0 e M1 — Palestra no CTA-RJ, simulador de lacunas de pensão e geração de dossiês consultivos.
