"use client";

/**
 * Browser-side service layer.
 *
 * Components never talk to kehilotcard.co.il directly — they call the route handlers
 * under /api/card/*, which proxy the platform's public endpoints (see
 * lib/api/kehilot.ts). Every call resolves to a discriminated result so the caller
 * renders either data or a Hebrew message, and never has to catch.
 */

import { onlyDigits, toCardCode } from "@/lib/card";

export type ClientResult<T> = { ok: true; data: T } | { ok: false; status: number; message: string };

export type BalanceResponse = {
  exists: boolean;
  card_status: string | null;
  available_balance: number | null;
  currency: string;
};

export type ActivateResponse = {
  card_code_masked: string | null;
  holder_name: string | null;
  status: string | null;
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

/** Everything the activation form can collect. Only the first three are required. */
export type ActivationDetails = {
  cardInput: string;
  fullName: string;
  phone: string;
  israeliId?: string;
  email?: string;
  birthdate?: string;
  address?: string;
  city?: string;
  gender?: string;
};

/**
 * Saves the holder's details against the card they were given.
 *
 * The card number goes up whole — activation identifies the card by the number
 * printed on it, where the balance lookup matches only the trailing eight digits.
 */
export function submitActivation(details: ActivationDetails) {
  return call<ActivateResponse>("/api/card/activate", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      card_code: onlyDigits(details.cardInput),
      full_name: details.fullName.trim(),
      phone: details.phone,
      israeli_id: details.israeliId ?? "",
      email: details.email?.trim() ?? "",
      birthdate: details.birthdate ?? "",
      address: details.address?.trim() ?? "",
      city: details.city ?? "",
      gender: details.gender ?? "",
    }),
  });
}
