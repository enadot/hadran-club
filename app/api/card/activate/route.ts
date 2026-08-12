import { NextResponse } from "next/server";
import { activateCard, messageForStatus } from "@/lib/api/kehilot";
import {
  CARD_CODE_LENGTH,
  isEmailValid,
  isPhoneValid,
  normalizePhone,
  onlyDigits,
} from "@/lib/card";

export const dynamic = "force-dynamic";

/**
 * POST /api/card/activate
 *
 * Body: { card_code, first_name, last_name, phone, email }. The same validation the
 * form runs is repeated here — a route handler is a public entry point in its own
 * right, and must not forward malformed input upstream.
 */
export async function POST(request: Request) {
  let body: Record<string, unknown>;
  try {
    body = (await request.json()) as Record<string, unknown>;
  } catch {
    return NextResponse.json({ message: messageForStatus(400) }, { status: 400 });
  }

  const str = (v: unknown) => (typeof v === "string" ? v.trim() : "");
  const cardCode = onlyDigits(str(body.card_code)).slice(-CARD_CODE_LENGTH);
  const firstName = str(body.first_name);
  const lastName = str(body.last_name);
  const phone = normalizePhone(str(body.phone));
  const email = str(body.email);

  // Name the field that is wrong; "check the card number" is unhelpful when the
  // e-mail address is what failed.
  let invalid: string | null = null;
  if (cardCode.length !== CARD_CODE_LENGTH) invalid = messageForStatus(400);
  else if (firstName.length < 2 || lastName.length < 2) invalid = "יש להזין שם פרטי ושם משפחה";
  else if (!isPhoneValid(phone)) invalid = "יש להזין מספר טלפון נייד תקין";
  else if (!isEmailValid(email)) invalid = "יש להזין כתובת דוא״ל תקינה";

  if (invalid) {
    return NextResponse.json({ message: invalid }, { status: 400 });
  }

  const result = await activateCard({
    card_code: cardCode,
    first_name: firstName,
    last_name: lastName,
    phone,
    email,
  });

  if (!result.ok) {
    return NextResponse.json(
      { message: result.message },
      { status: result.status === 0 ? 502 : result.status },
    );
  }

  return NextResponse.json({
    card_status: result.data.card_status ?? null,
    member_id: result.data.member_id ?? null,
  });
}
