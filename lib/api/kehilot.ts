/**
 * Server-side client for the Kehilot Card public API.
 *
 * Hadran Club is the white-label front; Kehilot Card is the platform behind it. Only
 * the public endpoints are used here — the ones that answer for a single card and
 * disclose nothing about its holder. Every call runs on the server, behind the route
 * handlers in app/api/card/*: the upstream host never has to allow this origin through
 * CORS, the upstream URL stays out of the client bundle, and the API key below stays
 * where a browser cannot read it.
 *
 * Every function resolves to an ApiResult; network faults and non-2xx responses come
 * back as a typed failure with a Hebrew message rather than a thrown error.
 */

const BASE_URL = (process.env.KEHILOT_API_BASE ?? "https://kehilotcard.co.il/api").replace(
  /\/+$/,
  "",
);

/**
 * Where the platform serves the files it references by relative path — merchant
 * logos come back from the benefits lookup as `/uploads/photos/…`. It is the API
 * host without the `/api` prefix, unless an environment says otherwise.
 */
export const ASSET_BASE = (
  process.env.KEHILOT_ASSET_BASE ?? BASE_URL.replace(/\/api\/?$/, "")
).replace(/\/+$/, "");

/**
 * The balance lookup is documented as public and takes no key. The hook stays for the
 * endpoints that are not — set KEHILOT_API_KEY and the header goes out with every
 * call; leave it unset, as production does today, and nothing is sent.
 *
 * The header is configurable because the platform words it differently per endpoint
 * family: KEHILOT_API_KEY_HEADER names the header (default `Authorization`) and
 * KEHILOT_API_KEY_SCHEME the prefix inside it (default `Bearer`, blank for a raw key,
 * as `X-API-KEY` style headers expect).
 */
const API_KEY = process.env.KEHILOT_API_KEY?.trim();
const API_KEY_HEADER = process.env.KEHILOT_API_KEY_HEADER?.trim() || "Authorization";
const API_KEY_SCHEME = process.env.KEHILOT_API_KEY_SCHEME?.trim() ?? "Bearer";

function authHeaders(): Record<string, string> {
  if (!API_KEY) return {};
  return { [API_KEY_HEADER]: API_KEY_SCHEME ? `${API_KEY_SCHEME} ${API_KEY}` : API_KEY };
}

/** A card number in a logged path is still a card number. */
function redact(path: string) {
  return path.replace(/\d{4,}/g, "********");
}

/** Upstream is a payment platform; a slow call must not hold a route handler open. */
const TIMEOUT_MS = 12_000;

export type CardStatus = "active" | "inactive" | "pending" | "blocked" | "expired" | "cancelled";

/** The documented 200 body of GET /public/card-balance/:card_code, and nothing more. */
export type PublicBalance = {
  card_status?: CardStatus | string;
  total_balance?: number;
};

/**
 * The documented body of POST /public/card-activate. `card_code` is the number
 * printed on the card, not the trailing eight the balance lookup matches on;
 * everything past `phone` is optional and is only sent when the member filled it in.
 */
export type ActivateInput = {
  card_code: string;
  full_name: string;
  phone: string;
  israeli_id?: string;
  email?: string;
  /** YYYY-MM-DD. */
  birthdate?: string;
  address?: string;
  city?: string;
  gender?: "זכר" | "נקבה";
};

/** The documented 200 body: what the platform saved, echoed back. */
export type ActivateResult = {
  card_code_masked?: string;
  holder_name?: string;
  status?: "active" | "inactive" | string;
  message?: string;
};

export type ApiResult<T> =
  | { ok: true; data: T }
  | { ok: false; status: number; message: string };

/** Hebrew copy for every failure the UI can surface. Status 0 means the call never landed. */
export function messageForStatus(status: number): string {
  if (status === 0) return "לא הצלחנו להתחבר לשרת. אנא בדקו את החיבור לאינטרנט ונסו שוב.";
  if (status === 400 || status === 422) return "נתונים לא תקינים, אנא בדקו את מספר הכרטיס";
  // 401 is the integration's own credentials failing, not anything about the card in
  // hand — telling a member their card is unauthorised sends them to support over a
  // missing environment variable.
  if (status === 401) return "השירות אינו זמין כרגע, אנא נסו שוב מאוחר יותר";
  if (status === 403) return "הפעולה אינה מורשית עבור כרטיס זה";
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
  // The platform nests its own errors as { error: { code, message } }; look one level in.
  const nested = b.error;
  const sources = [b, nested && typeof nested === "object" ? (nested as Record<string, unknown>) : {}];
  for (const source of sources) {
    for (const key of ["message", "error", "detail", "error_message"]) {
      const v = source[key];
      if (typeof v === "string" && /[\u0590-\u05FF]/.test(v)) return v.trim();
    }
  }
  return null;
}

async function request<T>(path: string, init: RequestInit): Promise<ApiResult<T>> {
  let response: Response;
  try {
    response = await fetch(`${BASE_URL}${path}`, {
      ...init,
      headers: { Accept: "application/json", ...authHeaders(), ...init.headers },
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
    // The member sees mapped Hebrew copy; the platform's own words only exist in this
    // line, and without it a 401 is indistinguishable from a wrong path or a WAF.
    console.error(
      `[kehilot] ${init.method ?? "GET"} ${redact(path)} -> ${response.status} ` +
        `${response.headers.get("content-type") ?? "?"} ${text.slice(0, 200)}`,
    );
    return {
      ok: false,
      status: response.status,
      // Prefer the platform's own wording when it sent Hebrew copy of its own.
      message: upstreamMessage(body) ?? messageForStatus(response.status),
    };
  }

  return { ok: true, data: (body ?? {}) as T };
}

/**
 * GET /public/card-balance/:card_code — status and balance for one card, no key.
 *
 * The card code is a path segment, not a query parameter, and the platform matches it
 * on the last eight digits. A card it does not know answers 404 with
 * `{ error: { code: "CARD_NOT_FOUND" } }`, which the route handler turns into
 * `exists: false` rather than an error the member has to read twice.
 */
export function getPublicBalance(cardCode: string) {
  return request<PublicBalance>(`/public/card-balance/${encodeURIComponent(cardCode)}`, {
    method: "GET",
  });
}

/**
 * POST /public/card-activate — saves the holder's details against the card they
 * were given and answers with the masked number, the name that was stored and the
 * card's status. No key: the card number in hand is the credential.
 *
 * Optional fields are dropped rather than sent empty — the platform validates what
 * it receives, and an empty `israeli_id` is a 422 where an absent one is fine.
 */
export function activateCard(input: ActivateInput) {
  const body = Object.fromEntries(
    Object.entries(input).filter(([, v]) => typeof v === "string" && v.trim() !== ""),
  );
  return request<ActivateResult>("/public/card-activate", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
}

/* ------------------------------------------------------------------ benefits */

/** One address of a partner, as the benefits lookup returns it. */
export type PublicBenefitBranch = {
  name?: string | null;
  address?: string | null;
  city?: string | null;
  /** Returned by the platform and deliberately never forwarded — see the route
   *  handler in app/api/card/benefits/route.ts. */
  phone?: string | null;
  opening_hours?: string | null;
};

/** One partner on a card's benefit list, as the platform returns it. */
export type PublicBenefitStore = {
  store_id?: number;
  name?: string;
  /** Relative to ASSET_BASE, e.g. "/uploads/photos/….png". Null where the
   *  partner has supplied no mark. */
  logo_url?: string | null;
  category_id?: number | null;
  category_name?: string | null;
  category_ids?: number[];
  /** The platform's own featured flag. */
  pinned?: boolean;
  accepts_card?: boolean;
  /** The benefit in the merchant's own words — the whole point of this call. */
  benefit_text?: string;
  exclusive?: boolean;
  branch_count?: number;
  cities?: string[];
  branches?: PublicBenefitBranch[];
};

/**
 * The documented 200 body of GET /public/benefits/by-card/:card_code.
 *
 * `club_name`, `club_logo_url`, `benefits_slug`, `balance` and `points` are the
 * operating club's own identity and wallet. They are typed here so the shape is
 * honest about what arrives, and dropped at the route handler: Hadran Club is the
 * front, and the platform's white-label plumbing has no place in a member's view.
 */
export type PublicBenefits = {
  club_name?: string | null;
  club_logo_url?: string | null;
  benefits_slug?: string | null;
  balance?: number;
  points?: number;
  stores?: PublicBenefitStore[];
  categories?: { category_id?: number; name?: string }[];
  cities?: string[];
};

/**
 * GET /public/benefits/by-card/:card_code — every partner this card carries a
 * benefit at, with the benefit text, the exclusivity flag and the branch list.
 *
 * Matched on the last eight digits, exactly like the balance lookup, and answers
 * 404 with `{ error: { code: "CARD_NOT_FOUND" } }` for a card the platform does
 * not know. No key: the number in hand is the credential.
 */
export function getPublicBenefits(cardCode: string) {
  return request<PublicBenefits>(
    `/public/benefits/by-card/${encodeURIComponent(cardCode)}`,
    { method: "GET" },
  );
}
