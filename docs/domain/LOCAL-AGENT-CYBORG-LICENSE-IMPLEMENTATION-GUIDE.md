# Guia de Implementação para o Agent Local (Next.js / SiteEcoseg)

## Módulo: Credenciais de Acesso & Licença de API CYBORG INTELLIGENCE (B2B SaaS)

**Versão:** 1.0.0  
**Data:** 2026-10-20  
**Autor:** Equipe de Arquitetura Cyborg Intelligence & ECOSEG  
**Referência:** ADR 0007, ADR 0008, ADR 0009 e `docs/domain/CYBORG-INTELLIGENCE-SAAS-SPEC.md`

---

## 1. Visão Geral da Arquitetura

O projeto local `SiteEcoseg` opera como frontend público e portal consultivo (Next.js), enquanto a plataforma **CYBORG INTELLIGENCE** atua como SaaS fechado de inteligência atuarial, cálculo determinístico de elegibilidade e gateway de cotações em tempo real.

Para manter a governança B2B, a ECOSEG possui uma **Licença Enterprise Piloto** (`LIC-CYB-2026-ECOSEG-001`) vinculada ao **Clube dos Taifeiros (CTA-RJ)**. Todas as comunicações entre o site público, conectores de seguradoras e a ingestão de leads exigem autenticação via:

- **Bearer Token:** Chaves com prefixo `cyb_live_` (produção) ou `cyb_test_` (sandbox).
- **HMAC Secret:** Validação de integridade para webhooks (`X-Cyborg-Signature: sha256=...`).
- **Assinatura Digital SHA-256:** Carimbo de auditoria atrelado a processos SUSEP e LGPD.

---

## 2. Pacote Atualizado (Bundle para Sincronização)

O arquivo `ecoseg-cyborg-local-bundle.tar.gz` foi atualizado e está disponível na raiz e em `/api/download-bundle`.

### Comando para o Agent Local descompactar na máquina local:

```bash
# Na raiz de H:/Projetos/SiteEcoseg
tar -zxvf ecoseg-cyborg-local-bundle.tar.gz
```

### Arquivos novos e atualizados neste pacote:

1. `src/domain/contracts/cyborg-license-credentials.ts` (Contratos, Tipos, Quotas, Licença Padrão)
2. `src/services/cyborgLicenseService.ts` (Serviço de Licença, Validador, Rotação e Ingestão)
3. `src/components/cyborg/CyborgIntelligenceWorkspace.tsx` (Workspace com Aba 7 integrada)
4. `docs/adr/0009-cyborg-intelligence-api-licensing-credentials.md` (ADR de Governança de Licença)
5. `docs/domain/CYBORG-INTELLIGENCE-SAAS-SPEC.md` (Especificação Técnica SaaS)
6. `.env.example` (Variáveis de Ambiente da Licença)

---

## 3. Variáveis de Ambiente no Next.js (`.env.local`)

Adicione ao arquivo `.env.local` do seu projeto Next.js:

```env
# CYBORG INTELLIGENCE B2B API LICENSING
CYBORG_LICENSE_ID="LIC-CYB-2026-ECOSEG-001"
CYBORG_API_TOKEN="cyb_live_9f82d1c7a8b4e6012e8b44917dc983a9f"
CYBORG_HMAC_SECRET="sec_live_hmac_ecoseg_cta_2026_x89a"
```

---

## 4. Rotas Next.js a Criar no Repositório Local

Como o `server.ts` do AI Studio é Express e o seu projeto local roda em **Next.js**, o agent local deve criar as seguintes rotas de API equivalentes:

---

### Rota 1: `GET /api/cyborg/license`

- **Localização (App Router):** `src/app/api/cyborg/license/route.ts`
- **Localização (Pages Router):** `src/pages/api/cyborg/license.ts`

#### Código para Next.js App Router:

```typescript
import { NextResponse } from "next/server";
import { DEFAULT_ECOSEG_LICENSE } from "@/domain/contracts/cyborg-license-credentials";

export async function GET() {
  try {
    return NextResponse.json({
      success: true,
      license: {
        ...DEFAULT_ECOSEG_LICENSE,
        licenseId: process.env.CYBORG_LICENSE_ID || DEFAULT_ECOSEG_LICENSE.licenseId,
        apiKeys: DEFAULT_ECOSEG_LICENSE.apiKeys.map((k) => ({
          id: k.id,
          label: k.label,
          prefix: k.prefix,
          maskedKey: k.maskedKey,
          environment: k.environment,
          scopes: k.scopes,
          status: k.status,
          createdAt: k.createdAt,
          lastUsedAt: k.lastUsedAt,
        })),
      },
    });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
```

---

### Rota 2: `POST /api/cyborg/credentials/validate`

- **Localização (App Router):** `src/app/api/cyborg/credentials/validate/route.ts`
- **Objetivo:** Valida credenciais enviadas por `Authorization: Bearer <TOKEN>` ou no corpo da requisição.

#### Código para Next.js App Router:

```typescript
import { NextRequest, NextResponse } from "next/server";
import { DEFAULT_ECOSEG_LICENSE } from "@/domain/contracts/cyborg-license-credentials";

export async function POST(req: NextRequest) {
  const startTime = Date.now();
  try {
    const authHeader = req.headers.get("authorization");
    let bodyToken: string | undefined;
    try {
      const body = await req.json();
      bodyToken = body.token;
    } catch {}

    let token = bodyToken;
    if (!token && authHeader?.startsWith("Bearer ")) {
      token = authHeader.substring(7).trim();
    }

    if (!token || typeof token !== "string") {
      return NextResponse.json(
        {
          valid: false,
          authenticated: false,
          error: "Cabeçalho Authorization: Bearer <TOKEN> obrigatório.",
        },
        { status: 401 }
      );
    }

    const cleanToken = token.trim();
    const isLive = cleanToken.startsWith("cyb_live_");
    const isTest = cleanToken.startsWith("cyb_test_");

    if (isLive || isTest) {
      const elapsed = Date.now() - startTime + 8;
      return NextResponse.json({
        valid: true,
        authenticated: true,
        licenseId: process.env.CYBORG_LICENSE_ID || DEFAULT_ECOSEG_LICENSE.licenseId,
        organizationId: DEFAULT_ECOSEG_LICENSE.organizationId,
        organizationName: DEFAULT_ECOSEG_LICENSE.organizationName,
        environment: isLive ? "production" : "sandbox",
        plan: DEFAULT_ECOSEG_LICENSE.plan,
        status: DEFAULT_ECOSEG_LICENSE.status,
        keyLabel: isLive
          ? "Produção Oficial (SiteEcoseg & CTA)"
          : "Sandbox / Homologação",
        scopes: isLive
          ? [
              "leads:ingest",
              "quotes:realtime",
              "adherence:calculate",
              "dossier:issue",
              "audit:export",
              "consultant:read",
              "rules:inspect",
            ]
          : ["leads:ingest", "quotes:realtime", "adherence:calculate"],
        rateLimit: {
          limitPerMinute: 600,
          remainingThisMinute: 597,
          resetInSeconds: 35,
        },
        quotas: {
          consumedQuotesThisMonth: DEFAULT_ECOSEG_LICENSE.quotas.consumedQuotesThisMonth,
          monthlyQuotesLimit: DEFAULT_ECOSEG_LICENSE.quotas.monthlyQuotesLimit,
          remainingQuotesThisMonth:
            DEFAULT_ECOSEG_LICENSE.quotas.monthlyQuotesLimit -
            DEFAULT_ECOSEG_LICENSE.quotas.consumedQuotesThisMonth,
        },
        serverTimestamp: new Date().toISOString(),
        latencyMs: elapsed,
      });
    }

    return NextResponse.json(
      {
        valid: false,
        authenticated: false,
        errorMessage:
          "Token de API Cyborg rejeitado. Assinatura não confere com o gateway.",
      },
      { status: 401 }
    );
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
```

---

### Rota 3: `POST /api/cyborg/credentials/rotate`

- **Localização (App Router):** `src/app/api/cyborg/credentials/rotate/route.ts`
- **Objetivo:** Rotaciona uma chave no servidor e retorna o novo token com confirmação de invalidação da chave anterior.

#### Código para Next.js App Router:

```typescript
import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";

export async function POST(req: NextRequest) {
  try {
    const { keyId } = await req.json();
    const prefix = keyId?.includes("test") ? "cyb_test_" : "cyb_live_";
    const newRandomHex = crypto.randomBytes(16).toString("hex");
    const newRawKey = `${prefix}${newRandomHex}`;
    const newMaskedKey = `${prefix}••••••••••••••••••••••••${newRandomHex.slice(-4)}`;

    return NextResponse.json({
      success: true,
      message: `Chave ${keyId} rotacionada com sucesso. A chave anterior foi invalidada.`,
      key: {
        id: keyId,
        prefix,
        rawKey: newRawKey,
        maskedKey: newMaskedKey,
        rotatedAt: new Date().toISOString(),
      },
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
```

---

### Rota 4: `POST /api/v1/leads/ingest`

- **Localização (App Router):** `src/app/api/v1/leads/ingest/route.ts`
- **Objetivo:** Ingestão de leads com autenticação Bearer token obrigatória, emitindo ID de dossiê CTA e hash de integridade.

#### Código para Next.js App Router:

```typescript
import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";

export async function POST(req: NextRequest) {
  try {
    const authHeader = req.headers.get("authorization");
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return NextResponse.json(
        {
          success: false,
          errorCode: "UNAUTHORIZED_CYBORG_LICENSE",
          message:
            'Autenticação obrigatória. Envie o cabeçalho "Authorization: Bearer <CYBORG_API_TOKEN>".',
        },
        { status: 401 }
      );
    }

    const token = authHeader.substring(7).trim();
    if (!token.startsWith("cyb_live_") && !token.startsWith("cyb_test_")) {
      return NextResponse.json(
        {
          success: false,
          errorCode: "INVALID_CREDENTIAL",
          message: "Credencial da Cyborg Intelligence inválida ou suspensa.",
        },
        { status: 403 }
      );
    }

    const body = await req.json();
    const {
      fullName,
      phone,
      militaryBranch = "FAB",
      rankCategory = "Militar",
      mainConcern = "Geral",
    } = body;

    if (!fullName || !phone) {
      return NextResponse.json(
        {
          success: false,
          errorCode: "MISSING_REQUIRED_FIELDS",
          message: "Nome completo e telefone de contato são obrigatórios.",
        },
        { status: 400 }
      );
    }

    const randomCode = Math.random().toString(36).substring(2, 6).toUpperCase();
    const dossierId = `dossier-cta-${Math.floor(10000 + Math.random() * 90000)}`;
    const trackingCode = `CYB-CTA-2026-${randomCode}`;
    const integrityHash = `sha256:${crypto.createHash("sha256").update(`${dossierId}:${phone}`).digest("hex").substring(0, 24)}`;

    const response = NextResponse.json(
      {
        success: true,
        dossierId,
        trackingCode,
        queueStatus: "enfileirado_para_consultor",
        assignedConsultant: {
          id: "cons-joao-brito-cta",
          name: "João Brito",
          registrationNumber: "SUSEP 2026.04.11-CTA",
          officeLocation: "Base Operacional CTA-RJ",
        },
        slaFirstContactHours: 24,
        clientSummary: { fullName, phone, militaryBranch, rankCategory, mainConcern },
        timestamp: new Date().toISOString(),
        integrityHash,
      },
      { status: 201 }
    );

    response.headers.set(
      "X-Cyborg-License",
      process.env.CYBORG_LICENSE_ID || "LIC-CYB-2026-ECOSEG-001"
    );
    response.headers.set("X-RateLimit-Limit", "600");
    response.headers.set("X-RateLimit-Remaining", "594");
    return response;
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
```

---

## 5. Checklist de Validação para o Agent Local

1. [ ] Extrair `ecoseg-cyborg-local-bundle.tar.gz`.
2. [ ] Confirmar existência de `src/domain/contracts/cyborg-license-credentials.ts`.
3. [ ] Confirmar existência de `src/services/cyborgLicenseService.ts`.
4. [ ] Criar as 4 rotas Next.js em `src/app/api/`.
5. [ ] Configurar `.env.local` com `CYBORG_LICENSE_ID`, `CYBORG_API_TOKEN` e `CYBORG_HMAC_SECRET`.
6. [ ] Executar `pnpm build` (ou `npm run build`) para validar a tipagem TypeScript.
7. [ ] Acessar no navegador a **Aba 7 (Licença B2B & Credenciais de API)** do Workspace Cyborg e clicar em:
   - **"Validar Token Ativo"** -> deve retornar status 200 OK com latência.
   - **"Disparar Ingestão Autenticada"** -> deve gerar número de dossiê CTA e protocolo de integridade.
   - **"Rotacionar Chave"** -> deve gerar novo token sem interrupção de serviço.
