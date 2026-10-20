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

## 6. Conclusão e recomendações

### 6.1. Adoção do OP-002

O OP-002 deve ser adotado como procedimento permanente de implementação da ECOSEG Intelligence.

Sua localização atual é:

```text
docs/operations/OP-002-ai-studio-local-homologacao-prompts.md
```

A pasta `docs/operations/` é adequada porque o documento define o fluxo operacional entre AI Studio, ambiente local, homologação, publicação e rollback.

### 6.2. Handoff para o Agent Local

O Agent Local deverá iniciar a implementação utilizando:

- **Prompt C2** — implementação local;
- **Prompt D1** — revisão técnica local;
- **Gate D** — lint, build, formatação, fixtures e revisão de contratos.

A execução deverá ocorrer em uma branch de feature, sem alteração direta da `main`.

Exemplo:

```text
feature/cyborg-license-and-connectors
```

### 6.3. Estado atual comprovado

O repositório já possui:

- Workspace `/consultor/cyborg`;
- simulador local de cotação;
- endpoint local de saúde dos conectores;
- contratos e documentação técnica;
- estrutura inicial para integração futura;
- procedimento OP-002;
- estudo técnico sobre Open Insurance e APIs SUSEP.

As rotas atualmente comprovadas são:

```text
/api/insurance-connectors/health
/api/insurance-connectors/quote
```

Essas rotas operam em modo:

```text
sandbox_local
simulador_local
```

As rotas abaixo permanecem como contratos-alvo:

```text
/v1/adherence/evaluate
/v1/quotes/realtime
/v1/proposals/submit
```

Elas somente devem ser classificadas como implementadas após existirem no código, possuírem testes e serem verificadas em homologação.

### 6.4. Bundle local

O arquivo:

```text
ecoseg-cyborg-local-bundle.tar.gz
```

deve ser considerado pronto para handoff somente após a conferência de conteúdo.

A validação mínima deve confirmar a presença de:

```text
OP-002
ESTUDO-TECNICO-API-SUSEP-OPEN-INSURANCE-SWAGGER.md
ADRs 0005 a 0009
contratos TypeScript
guia de implementação local
fixtures sintéticas
```

Comandos sugeridos:

```bash
tar -tzf ecoseg-cyborg-local-bundle.tar.gz
sha256sum ecoseg-cyborg-local-bundle.tar.gz
```

### 6.5. Próximo gate autorizado

O próximo passo é:

```text
Executar Prompt C2 no ambiente local
        ↓
Executar Prompt D1
        ↓
Rodar pnpm lint
        ↓
Rodar pnpm build
        ↓
Gerar Vercel Preview
        ↓
Executar Prompts E1 e E2
```

Até a conclusão desses gates, não devem ser considerados concluídos:

- motor de aderência;
- integração com seguradoras;
- cotação oficial;
- submissão de proposta;
- emissão de apólice;
- uso de credenciais reais;
- integração produtiva com Open Insurance.

Essa versão preserva o valor institucional do OP-002 sem classificar como implementados componentes que ainda estão documentados ou em modo de simulação.
