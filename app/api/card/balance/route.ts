import { NextResponse } from "next/server";
import { getPublicBalance, messageForStatus } from "@/lib/api/kehilot";
import { CARD_CODE_LENGTH, onlyDigits } from "@/lib/card";

/** Never prerendered or cached — a balance is per-card and changes on every purchase. */
export const dynamic = "force-dynamic";

/**
 * GET /api/card/balance?card_code=88888888
 *
 * Proxies the public balance lookup. The response carries only what the upstream
 * public endpoint exposes — existence, card status, available balance and currency —
 * and no personal detail of the holder.
 */
export async function GET(request: Request) {
  const raw = new URL(request.url).searchParams.get("card_code") ?? "";
  const cardCode = onlyDigits(raw).slice(-CARD_CODE_LENGTH);

  if (cardCode.length !== CARD_CODE_LENGTH) {
    return NextResponse.json({ message: messageForStatus(400) }, { status: 400 });
  }

  const result = await getPublicBalance(cardCode);
  if (!result.ok) {
    return NextResponse.json(
      { message: result.message },
      { status: result.status === 0 ? 502 : result.status },
    );
  }

  const { exists, card_status, available_balance, currency } = result.data;
  return NextResponse.json({
    exists: exists !== false,
    card_status: card_status ?? null,
    available_balance: typeof available_balance === "number" ? available_balance : null,
    currency: currency ?? "ILS",
  });
}
