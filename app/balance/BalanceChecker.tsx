"use client";

import * as React from "react";
import { Alert } from "@/components/brand/Alert";
import { Badge } from "@/components/brand/Badge";
import { Button } from "@/components/brand/Button";
import { Card } from "@/components/brand/Card";
import { Icon } from "@/components/brand/Icon";
import { Input } from "@/components/brand/Input";
import { CARD_NOT_FOUND_MESSAGE, fetchBalance, type BalanceResponse } from "@/lib/api/client";
import { CARD_ERROR, describeCardStatus, formatMoney, isCardInputValid, maskCard } from "@/lib/card";
import { MEMBER_AREA_URL, SUPPORT_PHONE } from "@/lib/data/site";
import { prefersReducedMotion } from "@/lib/motion";

/**
 * Balance lookup against the platform's public balance endpoint.
 *
 * One field, one button: the endpoint identifies a card by the last eight digits
 * printed on it and answers with existence, status and available balance only — no
 * detail about the holder — so nothing further is asked of whoever is looking.
 *
 * The result replaces the form. Everything on screen after a successful lookup comes
 * from the response; there are no illustrative figures mixed in with real money.
 *
 * Looking is all this page does. A self-service load used to sit under the result,
 * which turned a two-second check into a payment surface; loading a card is not part
 * of what the club offers its members here.
 */
export function BalanceChecker() {
  const [card, setCard] = React.useState("");
  const [cardError, setCardError] = React.useState<string | null>(null);
  const [pending, setPending] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const [result, setResult] = React.useState<BalanceResponse | null>(null);
  const [checkedAt, setCheckedAt] = React.useState<string | null>(null);
  const resultRef = React.useRef<HTMLDivElement>(null);

  const check = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!isCardInputValid(card)) {
      setCardError(CARD_ERROR);
      return;
    }

    setCardError(null);
    setError(null);
    setPending(true);
    const response = await fetchBalance(card);
    setPending(false);

    if (!response.ok) {
      setError(response.message);
      return;
    }
    if (!response.data.exists) {
      setError(CARD_NOT_FOUND_MESSAGE);
      return;
    }

    setResult(response.data);
    setCheckedAt(
      new Date().toLocaleTimeString("he-IL", { hour: "2-digit", minute: "2-digit" }),
    );
    window.scrollTo({ top: 0, behavior: prefersReducedMotion() ? "auto" : "smooth" });
  };

  const reset = () => {
    setResult(null);
    setCard("");
    setCardError(null);
    setError(null);
  };

  // Move focus into the result once it replaces the form, so the change is announced.
  React.useEffect(() => {
    if (result) resultRef.current?.focus();
  }, [result]);

  const status = describeCardStatus(result?.card_status);

  return (
    <>
      {!result ? (
        <Card tone="plain" padding="clamp(18px,5vw,32px)">
          <form className="flex flex-col gap-5" onSubmit={check} noValidate>
            <Input
              label="מספר הדרן קארד"
              placeholder="0000 0000 0000 0000"
              icon="credit-card"
              inputMode="numeric"
              autoComplete="off"
              value={card}
              onChange={(event) => {
                setCard(event.target.value);
                setCardError(null);
                setError(null);
              }}
              error={cardError}
              hint="8 הספרות האחרונות המופיעות על הכרטיס. אפשר להזין גם את המספר המלא."
            />

            {error ? <Alert>{error}</Alert> : null}

            <Button type="submit" size="lg" fullWidth disabled={pending}>
              {pending ? (
                <>
                  <Icon name="loader" size={20} className="animate-spin" />
                  בודקים את היתרה…
                </>
              ) : (
                "בדיקת יתרה"
              )}
            </Button>

            <div className="flex items-center justify-center gap-2 text-[length:var(--text-body-sm)] text-[var(--color-mute)]">
              <Icon name="shield-check" size={18} color="var(--color-primary-deep)" />
              הבדיקה מאובטחת ואינה שומרת את הפרטים שהוזנו
            </div>
          </form>
        </Card>
      ) : (
        <div
          ref={resultRef}
          tabIndex={-1}
          className="flex flex-col gap-5 outline-none"
          aria-live="polite"
        >
          <Card tone="plain" padding="clamp(18px,5vw,32px)">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div className="flex flex-col gap-2">
                <span className="text-[15px] font-semibold text-[var(--color-mute)]">
                  יתרה זמינה בכרטיס
                </span>
                <span className="tnum ltr font-[family-name:var(--font-display)] text-[clamp(38px,9vw,68px)] leading-none font-extrabold">
                  {result.available_balance === null
                    ? "—"
                    : formatMoney(result.available_balance, result.currency)}
                </span>
                <span className="tnum ltr text-[length:var(--text-body-sm)] text-[var(--color-mute)]">
                  {maskCard(card)}
                </span>
              </div>
              <div className="flex flex-col items-end gap-2.5">
                <Badge tone={status.tone} icon={status.tone === "positive" ? "check" : "info"}>
                  {status.label}
                </Badge>
                {checkedAt ? (
                  <span className="tnum text-[13px] text-[var(--color-mute)]">
                    נבדק עכשיו · {checkedAt}
                  </span>
                ) : null}
              </div>
            </div>
          </Card>

          {status.note ? <Alert tone="warning">{status.note}</Alert> : null}

          <div className="flex flex-wrap gap-3">
            <Button
              as="a"
              href={MEMBER_AREA_URL}
              target="_blank"
              rel="noopener noreferrer"
              iconAfter="external-link"
            >
              לאזור האישי
            </Button>
            <Button variant="tertiary" onClick={reset}>
              בדיקת כרטיס אחר
            </Button>
          </div>
        </div>
      )}

      <Card tone="sand" padding="24px">
        <div className="flex flex-col gap-2.5">
          <b className="text-[clamp(15px,2.2vw,17px)]">אבד הכרטיס או שהוא לא עובד בקופה?</b>
          <span className="text-[15px] leading-[1.6] text-[var(--color-body)]">
            מוקד המועדון חוסם את הכרטיס ומנפיק חדש. זמינים בימים א׳–ה׳, 9:00–17:00, בטלפון{" "}
            <span className="tnum ltr inline-block">{SUPPORT_PHONE}</span>.
          </span>
        </div>
      </Card>
    </>
  );
}
