import { NextRequest, NextResponse } from "next/server";
import { createServerApiKey, validateServerToken } from "@/services/cyborgLicenseService";
import type { CreateApiKeyRequest } from "@/domain/contracts/cyborg-license-credentials";

export async function POST(request: NextRequest) {
  const authorization = request.headers.get("authorization") || "";
  const token = authorization.toLowerCase().startsWith("bearer ")
    ? authorization.slice(7).trim()
    : "";
  const validation = validateServerToken(token, {
    liveToken: process.env.CYBORG_API_TOKEN,
  });

  if (!validation.valid || !validation.scopes.includes("consultant:read")) {
    return NextResponse.json(
      { message: "Credencial inválida ou sem escopo consultant:read." },
      { status: 401 }
    );
  }

  const body = (await request.json().catch(() => ({}))) as Partial<CreateApiKeyRequest>;
  if (!body.label || !body.environment) {
    return NextResponse.json(
      { message: "Informe label e environment para emitir a chave." },
      { status: 400 }
    );
  }

  return NextResponse.json(
    createServerApiKey({
      label: body.label,
      environment: body.environment,
      scopes: body.scopes || [],
    })
  );
}
