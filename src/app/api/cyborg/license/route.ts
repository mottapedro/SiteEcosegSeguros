import { NextResponse } from "next/server";
import { getServerLicenseSnapshot } from "@/services/cyborgLicenseService";

export const dynamic = "force-dynamic";

export function GET() {
  const license = getServerLicenseSnapshot();
  return NextResponse.json(
    {
      ...license,
      licenseId: process.env.CYBORG_LICENSE_ID || license.licenseId,
    },
    {
      headers: { "Cache-Control": "no-store" },
    }
  );
}
