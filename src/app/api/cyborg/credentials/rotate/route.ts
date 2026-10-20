import { NextRequest, NextResponse } from "next/server";
import { rotateServerApiKey, validateServerToken } from "@/services/cyborgLicenseService";

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

  const body = (await request.json().catch(() => ({}))) as { keyId?: string };
  if (!body.keyId) {
    return NextResponse.json(
      { message: "Informe o keyId para rotação." },
      { status: 400 }
    );
  }

  const result = rotateServerApiKey(body.keyId);
  if (!result) {
    return NextResponse.json({ message: "Chave não encontrada." }, { status: 404 });
  }

  return NextResponse.json(result);
}
