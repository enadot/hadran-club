"use client";

import * as React from "react";
import { Badge } from "@/components/brand/Badge";
import { BenefitRow } from "@/components/brand/BenefitRow";
import { Button } from "@/components/brand/Button";
import { Card } from "@/components/brand/Card";
import { Figure } from "@/components/brand/Figure";
import { Icon } from "@/components/brand/Icon";
import { Input } from "@/components/brand/Input";
import { RECENT_PURCHASES } from "@/lib/data/activity";
import { SUPPORT_PHONE } from "@/lib/data/site";
import { SAVINGS_WINDOWS } from "@/lib/data/member";
import {
  formatCardNumber,
  maskCardNumber,
  onlyDigits,
  pretendRequest,
} from "@/lib/forms";

/**
 * Balance lookup: a two-field form that swaps to the result view.
 *
 * Validation and error strings are the prototype's: 16 digits for the card, 4 for the
 * ID tail. The result figures are fixed sample data, and the card number shown is
 * masked from whatever was entered.
 */
export function BalanceChecker() {
  const [view, setView] = React.useState<"form" | "result">("form");
  const [card, setCard] = React.useState("");
  const [idTail, setIdTail] = React.useState("");
  const [cardError, setCardError] = React.useState<string | null>(null);
  const [idError, setIdError] = React.useState<string | null>(null);
  // A lookup is a network round trip. It needs to say it is working, and it needs
  // an answer for "that card was not found" — neither of which existed before, so
  // a wrong-but-well-formed number silently returned someone else's figures.
  const [checking, setChecking] = React.useState(false);
  const [lookupError, setLookupError] = React.useState<string | null>(null);
  const resultRef = React.useRef<HTMLDivElement>(null);

  const check = async () => {
    if (checking) return;
    const c = onlyDigits(card);
    const t = onlyDigits(idTail);
    const nextCardError = c.length === 16 ? null : "יש להזין 16 ספרות המופיעות על הכרטיס";
    const nextIdError = t.length === 4 ? null : "יש להזין ארבע ספרות";

    if (nextCardError || nextIdError) {
      setCardError(nextCardError);
      setIdError(nextIdError);
      return;
    }
    setCardError(null);
    setIdError(null);
    setLookupError(null);
    setChecking(true);
    try {
      await pretendRequest(true);
      setView("result");
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch {
      setLookupError(
        "לא מצאנו כרטיס שמתאים לפרטים האלה. כדאי לבדוק את המספר ואת ארבע הספרות, או להתקשר למוקד המועדון.",
      );
    } finally {
      setChecking(false);
    }
  };

  const maskedCard = maskCardNumber(card, "4271 •••• •••• 8032");

  // Move focus into the result once it replaces the form, so the change is announced.
  React.useEffect(() => {
    if (view === "result") resultRef.current?.focus();
  }, [view]);

  return (
    <>
      {view === "form" ? (
        <Card tone="plain" padding="clamp(18px,5vw,32px)">
          <form
            className="flex flex-col gap-5"
            onSubmit={(e) => {
              e.preventDefault();
              check();
            }}
            noValidate
          >
            <Input
              label="מספר הדרן קארד"
              placeholder="0000 0000 0000 0000"
              icon="credit-card"
              inputMode="numeric"
              autoComplete="off"
              dir="ltr"
              className="ltr text-start tnum tracking-[0.04em]"
              maxLength={19}
              value={formatCardNumber(card)}
              onChange={(e) => {
                setCard(e.target.value);
                setCardError(null);
                setLookupError(null);
              }}
              error={cardError}
              hint="16 הספרות בשורה הארוכה שעל גב הכרטיס"
            />
            <Input
              label="4 ספרות אחרונות של מספר הזהות"
              placeholder="0000"
              inputMode="numeric"
              autoComplete="off"
              dir="ltr"
              className="ltr text-start tnum"
              maxLength={4}
              value={onlyDigits(idTail).slice(0, 4)}
              onChange={(e) => {
                setIdTail(e.target.value);
                setIdError(null);
                setLookupError(null);
              }}
              error={idError}
            />

            {lookupError ? (
              <div
                role="alert"
                className="flex items-start gap-2.5 rounded-[var(--radius-md)] bg-[var(--color-negative-pale)] p-3.5"
              >
                <span className="mt-0.5 flex-none">
                  <Icon name="circle-alert" size={18} color="var(--color-negative-deep)" />
                </span>
                <span className="text-[length:var(--text-body-sm)] leading-[1.5] text-[var(--color-negative-deep)]">
                  {lookupError}
                </span>
              </div>
            ) : null}

            <Button
              type="submit"
              size="lg"
              fullWidth
              disabled={checking}
              aria-busy={checking || undefined}
              icon={checking ? "loader" : undefined}
              className={checking ? "[&>svg]:animate-spin" : undefined}
            >
              {checking ? "בודקים…" : "בדיקת החיסכון"}
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
            <div className="flex flex-col gap-6">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div className="flex flex-col gap-2">
                  <span className="text-[15px] font-semibold text-[var(--color-mute)]">
                    חסכתם עם הדרן קארד מאז ההצטרפות
                  </span>
                  <span className="tnum font-[family-name:var(--font-display)] text-[clamp(38px,9vw,68px)] leading-none font-extrabold text-[var(--color-positive)]">
                    <Figure value={SAVINGS_WINDOWS[2].amount} prefix="₪" />
                  </span>
                  <span className="tnum ltr text-[length:var(--text-body-sm)] text-[var(--color-mute)]">
                    {maskedCard}
                  </span>
                </div>
                <div className="flex flex-col items-end gap-2.5">
                  <Badge tone="positive" icon="check">
                    כרטיס פעיל
                  </Badge>
                  <span className="text-[13px] text-[var(--color-mute)]">
                    עודכן היום · כ״ג בתמוז, 9:40
                  </span>
                </div>
              </div>

              {/* One row of three at every width — split 2 + 1 the orphan reads as a
                  fourth, unrelated figure. */}
              <div className="grid grid-cols-3 gap-3 border-t border-[var(--color-border)] pt-5 min-[480px]:gap-4">
                <div className="flex flex-col gap-1">
                  <span className="text-[length:var(--text-body-sm)] text-[var(--color-mute)]">
                    נחסך החודש
                  </span>
                  <span className="tnum font-[family-name:var(--font-display)] text-[clamp(18px,5vw,28px)] font-extrabold text-[var(--color-positive)]">
                    <Figure value={286} prefix="₪" />
                  </span>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-[length:var(--text-body-sm)] text-[var(--color-mute)]">
                    נחסך מתחילת השנה
                  </span>
                  <span className="tnum font-[family-name:var(--font-display)] text-[clamp(18px,5vw,28px)] font-extrabold">
                    <Figure value={2914} prefix="₪" />
                  </span>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-[length:var(--text-body-sm)] text-[var(--color-mute)]">
                    קניות החודש
                  </span>
                  <span className="tnum font-[family-name:var(--font-display)] text-[clamp(18px,5vw,28px)] font-extrabold">
                    <Figure value={14} />
                  </span>
                </div>
              </div>

              <span className="text-[length:var(--text-caption)] text-[var(--color-mute)]">
                הסכומים להמחשה. הרישום מתעדכן בתום כל יום עסקים.
              </span>
            </div>
          </Card>

          <Card tone="plain" padding="clamp(18px,5vw,28px)">
            <div className="flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <b className="text-[clamp(17px,2.5vw,20px)]">הקניות האחרונות</b>
                <Button as="a" href="/member" variant="ghost" size="sm" iconAfter="arrow-left">
                  לכל ההיסטוריה
                </Button>
              </div>
              <div className="flex flex-col">
                {RECENT_PURCHASES.map((p, i) => (
                  <BenefitRow
                    key={p.title}
                    title={p.title}
                    meta={p.meta}
                    amount={p.amount}
                    saved={p.saved}
                    icon="shopping-bag"
                    divider={i < RECENT_PURCHASES.length - 1}
                  />
                ))}
              </div>
            </div>
          </Card>

          <div className="flex flex-wrap gap-3">
            <Button as="a" href="/member">
              לאזור האישי
            </Button>
            <Button
              variant="tertiary"
              onClick={() => {
                setView("form");
                setCard("");
                setIdTail("");
                setLookupError(null);
              }}
            >
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
