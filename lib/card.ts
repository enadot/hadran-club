/**
 * Card-number and contact-field helpers shared by the activation flow, the balance
 * lookup and the top-up panel.
 *
 * The Kehilot Card public API identifies a card by `card_code` — the last eight
 * digits printed on it. Members read the long number off the plastic, so every entry
 * point accepts whatever they type, strips separators, and sends the trailing eight.
 */

export const CARD_CODE_LENGTH = 8;

export const onlyDigits = (v: string) => v.replace(/\D/g, "");

/** The trailing eight digits — what the API calls `card_code`. */
export function toCardCode(raw: string) {
  return onlyDigits(raw).slice(-CARD_CODE_LENGTH);
}

/** Client-side gate before a request is sent: eight digits at minimum. */
export function isCardInputValid(raw: string) {
  return onlyDigits(raw).length >= CARD_CODE_LENGTH;
}

export const CARD_ERROR = "יש להזין לפחות 8 ספרות המופיעות על הכרטיס";

/**
 * "4271 •••• •••• 8032" for a full 16-digit number, "•••• 8032" when only the card
 * code was entered. Falls back to the raw digits for anything shorter.
 */
export function maskCard(raw: string) {
  const d = onlyDigits(raw);
  if (d.length >= 16) return `${d.slice(0, 4)} •••• •••• ${d.slice(-4)}`;
  if (d.length >= CARD_CODE_LENGTH) return `•••• ${d.slice(-4)}`;
  return d;
}

/** Israeli mobile numbers, with or without separators or a +972 prefix. */
export function normalizePhone(raw: string) {
  const d = onlyDigits(raw);
  if (d.startsWith("972")) return "0" + d.slice(3);
  return d;
}

export function isPhoneValid(raw: string) {
  const d = normalizePhone(raw);
  return d.length >= 9 && d.length <= 10;
}

export function isEmailValid(raw: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(raw.trim());
}

const CURRENCY_SYMBOL: Record<string, string> = { ILS: "₪", USD: "$", EUR: "€" };

/**
 * "₪150" / "₪150.40" — the sign sits against the digits with no space, and the
 * decimals appear only when the amount actually has them.
 */
export function formatMoney(amount: number, currency = "ILS") {
  const symbol = CURRENCY_SYMBOL[currency] ?? "";
  const fraction = Number.isInteger(amount) ? 0 : 2;
  const digits = amount.toLocaleString("en-US", {
    minimumFractionDigits: fraction,
    maximumFractionDigits: 2,
  });
  return symbol ? `${symbol}${digits}` : `${digits} ${currency}`;
}

/** Guard rails for a self-service load, in shekels. Shared by the panel and the route. */
export const TOPUP_MIN = 20;
export const TOPUP_MAX = 5000;

export const TOPUP_RANGE_ERROR = `סכום הטעינה חייב להיות בין ${formatMoney(TOPUP_MIN)} ל-${formatMoney(TOPUP_MAX)}`;

export type CardStatusView = {
  label: string;
  /** Matches Badge's tone names. */
  tone: "positive" | "warning" | "negative" | "neutral";
  /** Only an active card may be loaded. */
  canTopUp: boolean;
  /** Shown beside a card that cannot be used yet, so the next step is obvious. */
  note?: string;
};

/** Turns the platform's `card_status` into the wording and tone the member sees. */
export function describeCardStatus(status: string | null | undefined): CardStatusView {
  switch ((status ?? "").toLowerCase()) {
    case "active":
      return { label: "כרטיס פעיל", tone: "positive", canTopUp: true };
    case "inactive":
    case "pending":
      return {
        label: "הכרטיס טרם הופעל",
        tone: "warning",
        canTopUp: false,
        note: "הכרטיס עדיין לא משויך לחבר. מפעילים אותו בעמוד הפעלת כרטיס ואז אפשר לטעון אותו.",
      };
    case "blocked":
      return {
        label: "הכרטיס חסום",
        tone: "negative",
        canTopUp: false,
        note: "הכרטיס חסום לשימוש. מוקד המועדון ינפיק כרטיס חלופי.",
      };
    case "expired":
      return {
        label: "תוקף הכרטיס פג",
        tone: "negative",
        canTopUp: false,
        note: "תוקף הכרטיס פג. מוקד המועדון ינפיק כרטיס מחודש.",
      };
    case "cancelled":
    case "canceled":
      return {
        label: "הכרטיס בוטל",
        tone: "negative",
        canTopUp: false,
        note: "הכרטיס בוטל ואינו פעיל עוד.",
      };
    default:
      return { label: "סטטוס הכרטיס אינו זמין", tone: "neutral", canTopUp: false };
  }
}
