import { NextResponse } from "next/server";
import { activateCard, messageForStatus } from "@/lib/api/kehilot";
import { CARD_CODE_LENGTH, isEmailValid, isPhoneValid, normalizePhone, onlyDigits } from "@/lib/card";

export const dynamic = "force-dynamic";

/** The platform's two accepted values, and the only two the form offers. */
const GENDERS = new Set(["זכר", "נקבה"]);

/**
 * POST /api/card/activate
 *
 * Body: card_code, full_name and phone are required; israeli_id, email, birthdate,
 * address, city and gender are optional and forwarded only when present. The same
 * validation the form runs is repeated here — a route handler is a public entry
 * point in its own right, and must not forward malformed input upstream.
 *
 * Unlike the balance lookup, which the platform matches on the trailing eight
 * digits, activation takes the number as it is printed on the card.
 */
export async function POST(request: Request) {
  let body: Record<string, unknown>;
  try {
    body = (await request.json()) as Record<string, unknown>;
  } catch {
    return NextResponse.json({ message: messageForStatus(400) }, { status: 400 });
  }

  const str = (v: unknown) => (typeof v === "string" ? v.trim() : "");
  const cardCode = onlyDigits(str(body.card_code));
  const fullName = str(body.full_name).replace(/\s+/g, " ");
  const phone = normalizePhone(str(body.phone));
  const israeliId = onlyDigits(str(body.israeli_id));
  const email = str(body.email);
  const birthdate = str(body.birthdate);
  const address = str(body.address);
  const city = str(body.city);
  const gender = str(body.gender);

  // Name the field that is wrong; "check the card number" is unhelpful when the
  // e-mail address is what failed.
  let invalid: string | null = null;
  if (cardCode.length < CARD_CODE_LENGTH) invalid = messageForStatus(400);
  else if (fullName.length < 2 || fullName.length > 255) invalid = "יש להזין שם מלא";
  else if (!isPhoneValid(phone)) invalid = "יש להזין מספר טלפון נייד תקין";
  else if (israeliId && israeliId.length !== 9) invalid = "מספר תעודת הזהות אינו תקין";
  else if (email && !isEmailValid(email)) invalid = "יש להזין כתובת דוא״ל תקינה";
  else if (birthdate && !/^\d{4}-\d{2}-\d{2}$/.test(birthdate)) invalid = "תאריך הלידה אינו תקין";
  else if (gender && !GENDERS.has(gender)) invalid = messageForStatus(400);

  if (invalid) {
    return NextResponse.json({ message: invalid }, { status: 400 });
  }

  const result = await activateCard({
    card_code: cardCode,
    full_name: fullName,
    phone,
    israeli_id: israeliId,
    email,
    birthdate,
    address,
    city,
    gender: gender as "זכר" | "נקבה" | undefined,
  });

  if (!result.ok) {
    return NextResponse.json(
      { message: result.message },
      { status: result.status === 0 ? 502 : result.status },
    );
  }

  return NextResponse.json({
    card_code_masked: result.data.card_code_masked ?? null,
    holder_name: result.data.holder_name ?? null,
    status: result.data.status ?? null,
  });
}
