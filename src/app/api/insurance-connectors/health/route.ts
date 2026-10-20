import { NextResponse } from "next/server";
import { INSURER_CONNECTORS_CONFIG } from "@/services/insuranceApiService";

export async function GET() {
  return NextResponse.json({
    success: true,
    mode: "sandbox_local",
    connectors: INSURER_CONNECTORS_CONFIG.map((connector) => ({
      insurerId: connector.id,
      name: connector.shortName,
      status: connector.status,
      latencyMs: connector.avgLatencyMs,
      lastCheckedAt: new Date().toISOString(),
      activeProposalsCount: 0,
    })),
  });
}
