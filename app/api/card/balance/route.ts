import { NextResponse } from "next/server";
import { getPublicBalance, messageForStatus } from "@/lib/api/kehilot";
import { CARD_CODE_LENGTH, onlyDigits } from "@/lib/card";

/** Never prerendered or cached — a balance is per-card and changes on every purchase. */
export const dynamic = "force-dynamic";

/**
 * GET /api/card/balance?card_code=88888888
 *
 * Proxies the platform's public card-balance lookup. The response carries only what
 * that endpoint exposes — card status and total balance — and no personal detail of
 * the holder.
 */
export async function GET(request: Request) {
  const raw = new URL(request.url).searchParams.get("card_code") ?? "";
  const cardCode = onlyDigits(raw).slice(-CARD_CODE_LENGTH);

  if (cardCode.length !== CARD_CODE_LENGTH) {
    return NextResponse.json({ message: messageForStatus(400) }, { status: 400 });
  }

  const result = await getPublicBalance(cardCode);

  // A card the platform does not know is a normal outcome of a lookup, not a failure
  // of the lookup: the checker has its own copy for it, and reads `exists` to show it.
  if (!result.ok && result.status === 404) {
    return NextResponse.json({
      exists: false,
      card_status: null,
      available_balance: null,
      currency: "ILS",
    });
  }

  if (!result.ok) {
    return NextResponse.json(
      { message: result.message },
      { status: result.status === 0 ? 502 : result.status },
    );
  }

  const { card_status, total_balance } = result.data;
  return NextResponse.json({
    exists: true,
    card_status: card_status ?? null,
    available_balance: typeof total_balance === "number" ? total_balance : null,
    // The platform states the balance in shekels and returns no currency of its own.
    currency: "ILS",
  });
}
