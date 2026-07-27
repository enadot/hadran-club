import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/** ₪1,240 — shekel sign first, comma thousands separator, latin digits. */
export function shekel(n: number) {
  return "₪" + Math.round(n).toLocaleString("en-US");
}
