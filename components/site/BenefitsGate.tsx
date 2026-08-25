"use client";

import * as React from "react";
import { Alert } from "@/components/brand/Alert";
import { Button } from "@/components/brand/Button";
import { Eyebrow } from "@/components/site/Band";
import { Icon } from "@/components/brand/Icon";
import { Input } from "@/components/brand/Input";
import { CARD_NOT_FOUND_MESSAGE, fetchBenefits } from "@/lib/api/client";
import { CARD_ERROR, isCardInputValid, maskCard, toCardCode } from "@/lib/card";
import type { LiveStore } from "@/lib/data/live-benefits";
import { cn } from "@/lib/utils";

/**
 * The card gate at the top of /benefits.
 *
 * The brief's line for this page — "הזינו מספר כרטיס לצפייה בהטבה המדויקת שלכם" —
 * had nowhere to go until the platform opened a per-card benefits endpoint: the page
 * could name its partners but not what any given member gets at them, so the ask was
 * a link to /balance, which answers a different question entirely. It is a form now.
 * Eight digits, one button, and the directory below rewrites itself with the figures
 * the merchants actually wrote.
 *
 * Nothing is asked beyond the number: the endpoint identifies a card by its trailing
 * eight digits and discloses nothing about who holds it. The number is kept in
 * sessionStorage so a member who opens a shop and comes back is not made to type it
 * again, and it is gone when the tab closes — a card number has no business
 * outliving the visit.
 */

const STORAGE_KEY = "hadran.benefits.card";

export type BenefitsGateProps = {
  /** Fires with the partner list for the card, or null when it is cleared. */
  onLoaded: (stores: LiveStore[] | null) => void;
  /** How many partners the directory is showing for the loaded card. */
  loadedCount: number | null;
  className?: string;
};

export function BenefitsGate({ onLoaded, loadedCount, className }: BenefitsGateProps) {
  const [card, setCard] = React.useState("");
  const [pending, setPending] = React.useState(false);
  /** What the member typed is wrong — shown against the field. */
  const [cardError, setCardError] = React.useState<string | null>(null);
  /** The lookup itself failed or came back empty-handed — shown as an alert. */
  const [error, setError] = React.useState<string | null>(null);
  const [loadedCard, setLoadedCard] = React.useState<string | null>(null);

  const lookup = React.useCallback(async (input: string, { quiet = false } = {}) => {
    setPending(true);
    const response = await fetchBenefits(input);
    setPending(false);

    if (!response.ok) {
      // A restored number that no longer resolves must not open the visit with a red
      // box the member did nothing to earn; it just drops back to the form.
      if (!quiet) setError(response.message);
      return false;
    }
    if (!response.data.exists) {
      if (!quiet) setError(CARD_NOT_FOUND_MESSAGE);
      return false;
    }

    setLoadedCard(input);
    onLoaded(response.data.stores);
    return true;
  }, [onLoaded]);

  /**
   * A number carried over from earlier in the visit.
   *
   * Once per mount, whatever else re-renders: the guard is what keeps a new identity
   * for `onLoaded` from turning a remembered card into a second lookup. The field is
   * deliberately left empty — a restore that succeeds shows the loaded state, where
   * the field is not on screen, and one that fails should not open the visit with a
   * number that has just stopped working already typed in.
   */
  /**
   * Set just before a lookup the member asked for, and read by the callback ref on
   * the result panel below. The submit button is unmounted the moment the lookup
   * lands — the form is replaced by the result — so without this the caret falls to
   * <body> and a keyboard user restarts from the top of the page having just pressed
   * the one button on it. A restore from storage never sets it: nothing was pressed,
   * and stealing focus on load is its own bug.
   */
  const focusResult = React.useRef(false);
  const resultRef = React.useCallback((node: HTMLDivElement | null) => {
    if (!node || !focusResult.current) return;
    focusResult.current = false;
    node.focus();
  }, []);

  const restored = React.useRef(false);
  React.useEffect(() => {
    if (restored.current) return;
    restored.current = true;

    let stored: string | null = null;
    try {
      stored = window.sessionStorage.getItem(STORAGE_KEY);
    } catch {
      // Private modes and locked-down browsers throw on storage access. The gate
      // works without it; it just asks for the number again.
    }
    if (!stored || !isCardInputValid(stored)) return;
    void lookup(stored, { quiet: true }).then((ok) => {
      if (ok) return;
      try {
        window.sessionStorage.removeItem(STORAGE_KEY);
      } catch {}
    });
  }, [lookup]);

  const submit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!isCardInputValid(card)) {
      setCardError(CARD_ERROR);
      return;
    }
    setCardError(null);
    setError(null);
    const code = toCardCode(card);
    focusResult.current = true;
    if (await lookup(code)) {
      try {
        window.sessionStorage.setItem(STORAGE_KEY, code);
      } catch {}
    } else {
      // Nothing mounted to receive it; the alert above the button says what happened.
      focusResult.current = false;
    }
  };

  const reset = () => {
    setLoadedCard(null);
    setCard("");
    setCardError(null);
    setError(null);
    onLoaded(null);
    try {
      window.sessionStorage.removeItem(STORAGE_KEY);
    } catch {}
  };

  const shell = cn(
    "rounded-[var(--radius-xl)] border border-[var(--gold-300)] bg-[var(--color-canvas-pale)]",
    "p-[var(--card-padding)]",
    className,
  );

  if (loadedCard) {
    return (
      <div
        ref={resultRef}
        tabIndex={-1}
        className={cn(shell, "flex flex-wrap items-center justify-between gap-4 outline-none")}
        aria-live="polite"
      >
        <div className="flex min-w-0 items-start gap-3">
          <span className="mt-0.5 flex-none">
            <Icon name="circle-check" size={22} color="var(--color-positive)" />
          </span>
          <div className="flex min-w-0 flex-col gap-1">
            <b className="text-[clamp(16px,2.4vw,19px)]">אלה ההטבות שמגיעות לכם</b>
            <span className="text-[length:var(--text-body-sm)] leading-[1.6] text-[var(--color-body)]">
              {loadedCount === null
                ? null
                : `${loadedCount} ${loadedCount === 1 ? "בית עסק" : "בתי עסק"} · `}
              <span className="tnum ltr inline-block">{maskCard(loadedCard)}</span>
            </span>
          </div>
        </div>
        <Button variant="tertiary" size="sm" icon="refresh-cw" onClick={reset}>
          כרטיס אחר
        </Button>
      </div>
    );
  }

  return (
    <div className={cn(shell, "grid gap-5 min-[900px]:grid-cols-[minmax(0,1fr)_minmax(0,380px)] min-[900px]:items-start min-[900px]:gap-10")}>
      <div className="flex flex-col items-start gap-2.5">
        <Eyebrow>ההטבות שלכם</Eyebrow>
        <h2 className="m-0 text-[clamp(23px,4.5vw,32px)] tracking-[var(--tracking-display-sm)]">
          גלו את ההנחות שמגיעות לכם
        </h2>
        <p className="m-0 max-w-[48ch] text-[clamp(15px,2.2vw,17px)] leading-[1.6] text-[var(--color-body)]">
          כדי לצפות בפרטי ההנחות המגיעות לכם, הזינו את 8 הספרות האחרונות של הכרטיס.
        </p>
      </div>

      <form className="flex flex-col gap-3" onSubmit={submit} noValidate>
        <div className="flex flex-col gap-3 min-[480px]:flex-row min-[480px]:items-start min-[900px]:flex-col">
          <Input
            placeholder="8 ספרות אחרונות"
            aria-label="8 הספרות האחרונות של הכרטיס"
            icon="credit-card"
            inputMode="numeric"
            autoComplete="off"
            dir="ltr"
            className="ltr text-start tnum"
            wrapperClassName="min-[480px]:flex-1 min-[900px]:w-full"
            value={card}
            onChange={(event) => {
              setCard(event.target.value);
              setCardError(null);
              setError(null);
            }}
            error={cardError}
          />
          <Button
            type="submit"
            disabled={pending}
            className="justify-center min-[480px]:flex-none min-[900px]:w-full"
          >
            {pending ? (
              <>
                <Icon name="loader" size={20} className="animate-spin" />
                טוענים את ההטבות…
              </>
            ) : (
              "הצגת ההטבות שלי"
            )}
          </Button>
        </div>

        {error ? <Alert>{error}</Alert> : null}

        <span className="text-[length:var(--text-caption)] leading-[1.5] text-[var(--color-mute)]">
          המספר מופיע בחזית הכרטיס.
        </span>
      </form>
    </div>
  );
}
