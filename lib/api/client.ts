"use client";

/**
 * Browser-side service layer.
 *
 * Components never talk to kehilotcard.co.il directly — they call the route handlers
 * under /api/card/*, which proxy the platform's public endpoints (see
 * lib/api/kehilot.ts). Every call resolves to a discriminated result so the caller
 * renders either data or a Hebrew message, and never has to catch.
 */

import { toCardCode } from "@/lib/card";

export type ClientResult<T> = { ok: true; data: T } | { ok: false; status: number; message: string };

export type BalanceResponse = {
  exists: boolean;
  card_status: string | null;
  available_balance: number | null;
  currency: string;
};

export type ActivateResponse = {
  card_status: string | null;
  member_id: string | null;
};

export type TopupResponse = {
  payment_url: string | null;
  message: string | null;
};

export const CARD_NOT_FOUND_MESSAGE = "הכרטיס לא נמצא במערכת, אנא וודאו את המספר";
const NETWORK_MESSAGE = "לא הצלחנו להתחבר לשרת. אנא בדקו את החיבור לאינטרנט ונסו שוב.";
const FALLBACK_MESSAGE = "אירעה שגיאה בלתי צפויה, אנא נסו שוב";

async function call<T>(url: string, init?: RequestInit): Promise<ClientResult<T>> {
  let response: Response;
  try {
    response = await fetch(url, init);
  } catch {
    return { ok: false, status: 0, message: NETWORK_MESSAGE };
  }

  let body: unknown = null;
  try {
    body = await response.json();
  } catch {
    body = null;
  }

  if (!response.ok) {
    const message =
      body && typeof body === "object" && typeof (body as { message?: unknown }).message === "string"
        ? (body as { message: string }).message
        : FALLBACK_MESSAGE;
    return { ok: false, status: response.status, message };
  }

  return { ok: true, data: (body ?? {}) as T };
}

/** Public balance lookup. `cardInput` is whatever the member typed; the trailing eight
 *  digits are what the platform identifies the card by. */
export function fetchBalance(cardInput: string) {
  const query = new URLSearchParams({ card_code: toCardCode(cardInput) });
  return call<BalanceResponse>(`/api/card/balance?${query}`);
}

export type ActivationDetails = {
  cardInput: string;
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
};

/** Binds a physical card that arrived in the post to the member who received it. */
export function submitActivation(details: ActivationDetails) {
  return call<ActivateResponse>("/api/card/activate", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      card_code: toCardCode(details.cardInput),
      first_name: details.firstName.trim(),
      last_name: details.lastName.trim(),
      phone: details.phone,
      email: details.email.trim(),
    }),
  });
}

/** Opens a hosted credit-card charge; the caller redirects to the returned page. */
export function requestTopup(cardInput: string, amount: number) {
  return call<TopupResponse>("/api/card/topup", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ card_code: toCardCode(cardInput), amount }),
  });
}
