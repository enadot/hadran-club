/** Shared form helpers. Kept out of the components so /activate, /balance and the
 *  merchant form validate the same values the same way. */

export const onlyDigits = (v: string) => v.replace(/\D/g, "");

/** "4271 8032 1188 0042" — groups of four, as the digits are printed on the card.
 *  Typing into a formatted field is the difference between reading a plastic card
 *  in four glances and reading it in one. */
export function formatCardNumber(v: string) {
  return (onlyDigits(v).match(/.{1,4}/g) ?? []).join(" ").slice(0, 19);
}

/** "050-1234567" */
export function formatPhone(v: string) {
  const d = onlyDigits(v).slice(0, 10);
  return d.length > 3 ? `${d.slice(0, 3)}-${d.slice(3)}` : d;
}

/** The masked form shown on artwork and summaries. */
export function maskCardNumber(v: string, fallback = "0000 •••• •••• 0000") {
  const d = onlyDigits(v);
  if (d.length !== 16) return fallback;
  return `${d.slice(0, 4)} •••• •••• ${d.slice(12)}`;
}

/** Israeli ID check digit, so a typo is caught here rather than by the API. */
export function isValidIsraeliId(v: string) {
  const d = onlyDigits(v).padStart(9, "0");
  if (d.length !== 9) return false;
  const sum = d.split("").reduce((acc, ch, i) => {
    const step = Number(ch) * ((i % 2) + 1);
    return acc + (step > 9 ? step - 9 : step);
  }, 0);
  return sum % 10 === 0;
}

/** A promise that resolves after `ms`, used to stand in for the Kehilot Card API
 *  until it is wired up. Isolated here so there is exactly one place to replace. */
export function pretendRequest<T>(value: T, ms = 900): Promise<T> {
  return new Promise((resolve) => setTimeout(() => resolve(value), ms));
}
