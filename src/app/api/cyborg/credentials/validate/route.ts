import { NextRequest, NextResponse } from "next/server";
import { validateServerToken } from "@/services/cyborgLicenseService";

const tokenFromRequest = async (request: NextRequest) => {
  const authorization = request.headers.get("authorization");
  if (authorization?.toLowerCase().startsWith("bearer ")) {
    return authorization.slice(7).trim();
  }

  const body = (await request.json().catch(() => ({}))) as { token?: string };
  return body.token?.trim() || "";
};

export async function POST(request: NextRequest) {
  const result = validateServerToken(await tokenFromRequest(request), {
    liveToken: process.env.CYBORG_API_TOKEN,
  });
  return NextResponse.json(result, { status: result.valid ? 200 : 401 });
}
