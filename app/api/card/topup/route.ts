import { NextResponse } from "next/server";
import { messageForStatus, topupCard } from "@/lib/api/kehilot";
import {
  CARD_CODE_LENGTH,
  onlyDigits,
  TOPUP_MAX,
  TOPUP_MIN,
  TOPUP_RANGE_ERROR,
} from "@/lib/card";

export const dynamic = "force-dynamic";

/** Deployments differ on what they name the hosted checkout link. */
const URL_KEYS = ["payment_url", "redirect_url", "checkout_url", "payment_page", "url", "link"];

function findPaymentUrl(body: unknown): string | null {
  if (!body || typeof body !== "object") return null;
  const b = body as Record<string, unknown>;
  for (const key of URL_KEYS) {
    const value = b[key];
    // Only an absolute https link is worth handing to the browser as a redirect.
    if (typeof value === "string" && /^https:\/\//i.test(value)) return value;
  }
  // Some responses nest the link one level down, under data/payment/result.
  for (const key of ["data", "payment", "result"]) {
    const nested = findPaymentUrl(b[key]);
    if (nested) return nested;
  }
  return null;
}

/**
 * POST /api/card/topup
 *
 * Body: { card_code, amount }. Upstream answers with a hosted payment page; the
 * client redirects there. No card-holder payment detail ever passes through this app.
 */
export async function POST(request: Request) {
  let body: Record<string, unknown>;
  try {
    body = (await request.json()) as Record<string, unknown>;
  } catch {
    return NextResponse.json({ message: messageForStatus(400) }, { status: 400 });
  }

  const cardCode = onlyDigits(
    typeof body.card_code === "string" ? body.card_code : "",
  ).slice(-CARD_CODE_LENGTH);
  const amount = Number(body.amount);

  if (cardCode.length !== CARD_CODE_LENGTH) {
    return NextResponse.json({ message: messageForStatus(400) }, { status: 400 });
  }
  if (!Number.isFinite(amount) || amount < TOPUP_MIN || amount > TOPUP_MAX) {
    return NextResponse.json({ message: TOPUP_RANGE_ERROR }, { status: 400 });
  }

  const result = await topupCard({ card_code: cardCode, amount: Math.round(amount) });
  if (!result.ok) {
    return NextResponse.json(
      { message: result.message },
      { status: result.status === 0 ? 502 : result.status },
    );
  }

  return NextResponse.json({
    payment_url: findPaymentUrl(result.data),
    message: result.data.message ?? null,
  });
}
