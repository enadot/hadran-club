/**
 * Server-side client for the Kehilot Card public API.
 *
 * Hadran Club is the white-label front; Kehilot Card is the platform behind it. Only
 * the public endpoints are used here — the ones a card holder may call for their own
 * card — so no API key is involved. The calls still run on the server, behind the
 * route handlers in app/api/card/*, for three reasons: the upstream host never has to
 * allow this origin through CORS, the upstream URL stays out of the client bundle,
 * and a private key can be added here later without touching any component.
 *
 * Every function resolves to an ApiResult; network faults and non-2xx responses come
 * back as a typed failure with a Hebrew message rather than a thrown error.
 */

const BASE_URL = (process.env.KEHILOT_API_BASE ?? "https://kehilotcard.co.il/api/v1").replace(
  /\/+$/,
  "",
);

/** Upstream is a payment platform; a slow call must not hold a route handler open. */
const TIMEOUT_MS = 12_000;

export type CardStatus = "active" | "inactive" | "pending" | "blocked" | "expired" | "cancelled";

export type PublicBalance = {
  exists: boolean;
  card_status?: CardStatus | string;
  available_balance?: number;
  currency?: string;
};

export type ActivateInput = {
  card_code: string;
  first_name: string;
  last_name: string;
  phone: string;
  email: string;
};

export type ActivateResult = {
  /** Upstream returns a member or card identifier on some deployments; optional here. */
  card_status?: string;
  member_id?: string;
  message?: string;
};

export type TopupInput = {
  card_code: string;
  amount: number;
};

export type TopupResult = {
  /** Present when the platform hands back a hosted checkout page to redirect to. */
  payment_url?: string;
  message?: string;
};

export type ApiResult<T> =
  | { ok: true; data: T }
  | { ok: false; status: number; message: string };

/** Hebrew copy for every failure the UI can surface. Status 0 means the call never landed. */
export function messageForStatus(status: number): string {
  if (status === 0) return "לא הצלחנו להתחבר לשרת. אנא בדקו את החיבור לאינטרנט ונסו שוב.";
  if (status === 400 || status === 422) return "נתונים לא תקינים, אנא בדקו את מספר הכרטיס";
  if (status === 401 || status === 403) return "הפעולה אינה מורשית עבור כרטיס זה";
  if (status === 404) return "הכרטיס לא נמצא";
  if (status === 408 || status === 504) return "הבקשה ארכה זמן רב מדי, אנא נסו שוב";
  if (status === 409) return "הבקשה כבר טופלה במערכת";
  if (status === 429) return "בוצעו יותר מדי בקשות. אנא נסו שוב בעוד מספר רגעים.";
  if (status >= 500) return "שגיאת שרת, אנא נסו שוב מאוחר יותר";
  return "אירעה שגיאה בלתי צפויה, אנא נסו שוב";
}

/**
 * Upstream error bodies vary in shape. Their wording is only worth showing when it is
 * already in Hebrew — the platform serves several front-ends and answers some of them
 * in English, which has no place on a Hebrew-only site. Anything else falls back to
 * the mapped copy below.
 */
function upstreamMessage(body: unknown): string | null {
  if (!body || typeof body !== "object") return null;
  const b = body as Record<string, unknown>;
  for (const key of ["message", "error", "detail", "error_message"]) {
    const v = b[key];
    if (typeof v === "string" && /[\u0590-\u05FF]/.test(v)) return v.trim();
  }
  return null;
}

async function request<T>(path: string, init: RequestInit): Promise<ApiResult<T>> {
  let response: Response;
  try {
    response = await fetch(`${BASE_URL}${path}`, {
      ...init,
      headers: { Accept: "application/json", ...init.headers },
      // Card data is per-member and time-sensitive; nothing here may be cached.
      cache: "no-store",
      signal: AbortSignal.timeout(TIMEOUT_MS),
    });
  } catch (error) {
    const timedOut = error instanceof Error && error.name === "TimeoutError";
    return {
      ok: false,
      status: timedOut ? 408 : 0,
      message: messageForStatus(timedOut ? 408 : 0),
    };
  }

  const text = await response.text();
  let body: unknown = null;
  if (text) {
    try {
      body = JSON.parse(text);
    } catch {
      body = null;
    }
  }

  if (!response.ok) {
    return {
      ok: false,
      status: response.status,
      // Prefer the platform's own wording when it sent Hebrew copy of its own.
      message: upstreamMessage(body) ?? messageForStatus(response.status),
    };
  }

  return { ok: true, data: (body ?? {}) as T };
}

/** GET /public/balance — exists, status and available balance for one card. */
export function getPublicBalance(cardCode: string) {
  const query = new URLSearchParams({ card_code: cardCode });
  return request<PublicBalance>(`/public/balance?${query}`, { method: "GET" });
}

/** POST /public/activate — binds a physical card to the member who received it. */
export function activateCard(input: ActivateInput) {
  return request<ActivateResult>("/public/activate", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(input),
  });
}

/** POST /public/topup — opens a hosted credit-card charge for a self-service load. */
export function topupCard(input: TopupInput) {
  return request<TopupResult>("/public/topup", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(input),
  });
}
