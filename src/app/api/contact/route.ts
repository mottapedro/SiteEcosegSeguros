import { NextResponse, type NextRequest } from "next/server";
import { contactFormSchema } from "@/features/contact-form/schema";
import { sendLeadNotification } from "@/services/email/send-lead-notification";
import { isRateLimited } from "@/lib/rate-limit";

export async function POST(request: NextRequest) {
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";

  if (isRateLimited(ip)) {
    return NextResponse.json(
      { error: "Muitas solicitações. Tente novamente em instantes." },
      { status: 429 }
    );
  }

  const body = await request.json().catch(() => null);
  const parsed = contactFormSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json({ error: "Dados inválidos." }, { status: 400 });
  }

  // Honeypot filled in → silently accept without sending, bots get no signal.
  if (parsed.data.website) {
    return NextResponse.json({ ok: true });
  }

  const { website, ...lead } = parsed.data;
  void website;

  try {
    await sendLeadNotification(lead);
  } catch (error) {
    console.error("Failed to send lead notification", error);
    return NextResponse.json(
      { error: "Não foi possível enviar sua solicitação agora." },
      { status: 502 }
    );
  }

  return NextResponse.json({ ok: true });
}
