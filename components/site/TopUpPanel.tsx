"use client";

import * as React from "react";
import { Alert } from "@/components/brand/Alert";
import { Button } from "@/components/brand/Button";
import { Card } from "@/components/brand/Card";
import { Icon } from "@/components/brand/Icon";
import { Input } from "@/components/brand/Input";
import { requestTopup } from "@/lib/api/client";
import {
  formatMoney,
  onlyDigits,
  TOPUP_MAX,
  TOPUP_MIN,
  TOPUP_RANGE_ERROR,
} from "@/lib/card";
import { cn } from "@/lib/utils";

/** The three amounts that cover most loads; anything else goes in the free field. */
const PRESETS = [100, 250, 500];

export type TopUpPanelProps = {
  /** Whatever the member typed into the balance form — the trailing digits identify the card. */
  cardInput: string;
  /** Loading is only offered on a card the platform reports as active. */
  disabled?: boolean;
};

/**
 * Self-service load onto the card.
 *
 * The charge itself happens on the platform's hosted payment page — this app asks for
 * a page and sends the member there. No payment detail is typed into, or passes
 * through, Hadran Club.
 */
export function TopUpPanel({ cardInput, disabled }: TopUpPanelProps) {
  const [amount, setAmount] = React.useState<number | null>(PRESETS[0]);
  const [custom, setCustom] = React.useState("");
  const [pending, setPending] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const [note, setNote] = React.useState<string | null>(null);

  const chosen = amount ?? Number(onlyDigits(custom) || 0);
  const inRange = chosen >= TOPUP_MIN && chosen <= TOPUP_MAX;

  const submit = async (event: React.FormEvent) => {
    event.preventDefault();
    setNote(null);

    if (!inRange) {
      setError(TOPUP_RANGE_ERROR);
      return;
    }

    setError(null);
    setPending(true);
    const result = await requestTopup(cardInput, chosen);
    setPending(false);

    if (!result.ok) {
      setError(result.message);
      return;
    }

    if (result.data.payment_url) {
      // Leaving the site for the hosted charge is the expected end of this flow.
      window.location.assign(result.data.payment_url);
      return;
    }

    // A platform that completes the charge without a hosted page still answers 200.
    setNote(result.data.message ?? "הבקשה נקלטה. פרטי התשלום יישלחו אליכם בהודעה.");
  };

  const presetClass = (on: boolean) =>
    cn(
      "tnum cursor-pointer rounded-[var(--radius-lg)] px-4 py-3 font-[family-name:var(--font-ui)]",
      "text-[length:var(--text-body-md)] font-bold",
      "transition-[background-color,border-color] duration-[var(--duration-fast)] ease-[var(--ease-out)]",
      "disabled:cursor-not-allowed disabled:opacity-60",
      on
        ? "border-2 border-[var(--color-ink)] bg-[var(--gold-50)]"
        : "border border-[var(--color-border)] bg-[var(--color-canvas)]",
    );

  return (
    <Card tone="plain" padding="clamp(18px,5vw,28px)">
      <form className="flex flex-col gap-5" onSubmit={submit} noValidate>
        <div className="flex flex-col gap-1.5">
          <b className="text-[clamp(17px,2.5vw,20px)]">טעינת הכרטיס</b>
          <span className="text-[15px] leading-[1.6] text-[var(--color-body)]">
            בוחרים סכום ועוברים לדף הסליקה המאובטח של המערכת. הסכום זמין בכרטיס מיד עם אישור
            התשלום.
          </span>
        </div>

        <div className="flex flex-col gap-3">
          <span className="text-[length:var(--text-body-sm)] font-semibold">סכום הטעינה</span>
          <div
            className="grid grid-cols-3 gap-3"
            role="radiogroup"
            aria-label="סכום הטעינה"
          >
            {PRESETS.map((value) => (
              <button
                key={value}
                type="button"
                role="radio"
                aria-checked={amount === value}
                disabled={disabled}
                onClick={() => {
                  setAmount(value);
                  setCustom("");
                  setError(null);
                }}
                className={presetClass(amount === value)}
              >
                {formatMoney(value)}
              </button>
            ))}
          </div>
          <Input
            label="או סכום אחר"
            placeholder="0"
            inputMode="numeric"
            autoComplete="off"
            disabled={disabled}
            value={custom}
            onChange={(event) => {
              setCustom(event.target.value);
              setAmount(null);
              setError(null);
            }}
            suffix="₪"
            hint={`בין ${formatMoney(TOPUP_MIN)} ל-${formatMoney(TOPUP_MAX)}`}
          />
        </div>

        {error ? <Alert>{error}</Alert> : null}
        {note ? <Alert tone="positive">{note}</Alert> : null}

        <Button type="submit" size="lg" fullWidth disabled={disabled || pending}>
          {pending ? (
            <>
              <Icon name="loader" size={20} className="animate-spin" />
              מעבירים לדף התשלום…
            </>
          ) : (
            "המשך לתשלום"
          )}
        </Button>

        <div className="flex items-center justify-center gap-2 text-[length:var(--text-body-sm)] text-[var(--color-mute)]">
          <Icon name="lock" size={18} color="var(--color-primary-deep)" />
          הסליקה מתבצעת בדף מאובטח של המערכת. פרטי האשראי אינם נשמרים באתר.
        </div>
      </form>
    </Card>
  );
}
