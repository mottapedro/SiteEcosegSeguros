import { NextRequest, NextResponse } from "next/server";
import type { LeadIngestionPayload } from "@/domain/contracts/cyborg-api";
import { ingestServerLead, validateServerToken } from "@/services/cyborgLicenseService";

export async function POST(request: NextRequest) {
  const authorization = request.headers.get("authorization") || "";
  const token = authorization.toLowerCase().startsWith("bearer ")
    ? authorization.slice(7).trim()
    : "";
  const validation = validateServerToken(token, {
    liveToken: process.env.CYBORG_API_TOKEN,
  });

  if (!validation.valid || !validation.scopes.includes("leads:ingest")) {
    return NextResponse.json(
      { message: "Authorization Bearer inválido ou sem escopo leads:ingest." },
      { status: 401 }
    );
  }

  const payload = (await request.json().catch(() => null)) as LeadIngestionPayload | null;
  if (
    !payload?.fullName ||
    !payload.phone ||
    !payload.militaryBranch ||
    !payload.militaryStatus ||
    !payload.lgpdConsent?.accepted
  ) {
    return NextResponse.json(
      { message: "Payload incompleto ou sem consentimento LGPD válido." },
      { status: 400 }
    );
  }

  return NextResponse.json(ingestServerLead(payload), { status: 201 });
}
