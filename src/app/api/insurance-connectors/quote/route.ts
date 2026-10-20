import { NextResponse, type NextRequest } from "next/server";
import {
  generateLocalRealtimeQuote,
  INSURER_CONNECTORS_CONFIG,
} from "@/services/insuranceApiService";
import type { RealtimeQuoteRequest } from "@/domain/contracts/insurance-api-connectors";

export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => null);

  if (!isRealtimeQuoteRequest(body)) {
    return NextResponse.json(
      { success: false, error: "Payload de cotação inválido." },
      { status: 400 }
    );
  }

  const quote = generateLocalRealtimeQuote(body);

  return NextResponse.json({
    success: true,
    mode: "sandbox_local",
    source: "simulador_local",
    connector: INSURER_CONNECTORS_CONFIG.find(
      (connector) => connector.id === body.requestedCoverage.insurerId
    ),
    quote,
  });
}

function isRealtimeQuoteRequest(value: unknown): value is RealtimeQuoteRequest {
  if (!value || typeof value !== "object") return false;

  const request = value as Partial<RealtimeQuoteRequest>;
  const coverage = request.requestedCoverage;

  return (
    typeof request.profileId === "string" &&
    typeof request.militaryRank === "string" &&
    typeof request.age === "number" &&
    typeof request.grossIncome === "number" &&
    typeof coverage === "object" &&
    coverage !== null &&
    typeof coverage.productId === "string" &&
    typeof coverage.productName === "string" &&
    ["icatu", "mag", "gboex", "opin_brasil"].includes(coverage.insurerId)
  );
}
