"use client";

import * as React from "react";
import { Badge } from "@/components/brand/Badge";
import { Button } from "@/components/brand/Button";
import { Checkbox } from "@/components/brand/Checkbox";
import { Icon } from "@/components/brand/Icon";
import { Input } from "@/components/brand/Input";
import { Select } from "@/components/brand/Select";
import { onlyDigits, pretendRequest } from "@/lib/forms";

/**
 * The telephone-service callback request for joining Hadran.
 *
 * Hadran itself, not the club: a family that has no Hadran device yet cannot be
 * handed a club card, and the shops are not always the answer — some callers
 * would rather be rung back than drive. So this is the one inbound form on the
 * site besides the merchant enquiry, and it is deliberately short: a name, a
 * number, a town, and when it suits them to be called.
 *
 * It posts nowhere yet. `pretendRequest` stands in until Hadran supplies the
 * destination for these leads, exactly as it does for the merchant form; that
 * one call is the whole of what has to change.
 */

const TIME_OPTIONS = [
  { value: "any", label: "בכל שעה" },
  { value: "morning", label: "בבוקר" },
  { value: "noon", label: "בצהריים" },
  { value: "evening", label: "בערב" },
];

const EMPTY = {
  name: "",
  phone: "",
  city: "",
  time: "any",
  consent: false,
};

type Errors = Partial<Record<"name" | "phone", string>>;

export function CallbackForm({ onClose }: { onClose?: () => void }) {
  const [done, setDone] = React.useState(false);
  const [f, setF] = React.useState(EMPTY);
  const [errors, setErrors] = React.useState<Errors>({});
  const [consentError, setConsentError] = React.useState(false);
  const [sending, setSending] = React.useState(false);
  const [sendError, setSendError] = React.useState<string | null>(null);
  const doneRef = React.useRef<HTMLDivElement>(null);

  const set =
    <K extends keyof typeof EMPTY>(k: K) =>
    (value: (typeof EMPTY)[K]) => {
      setF((s) => ({ ...s, [k]: value }));
      setErrors((e) => ({ ...e, [k]: undefined }));
    };

  const submit = async () => {
    if (sending) return;
    const e: Errors = {};
    if (f.name.trim().length < 2) e.name = "שדה חובה";
    if (onlyDigits(f.phone).length < 9) e.phone = "מספר טלפון";

    if (Object.keys(e).length) {
      setErrors(e);
      return;
    }
    if (!f.consent) {
      setConsentError(true);
      return;
    }
    setErrors({});
    setConsentError(false);
    setSendError(null);
    setSending(true);
    try {
      await pretendRequest(true);
      setDone(true);
    } catch {
      setSendError(
        "לא הצלחנו לשלוח את הפרטים כרגע. אפשר לנסות שוב, או לגשת לאחת החנויות המשווקות.",
      );
    } finally {
      setSending(false);
    }
  };

  React.useEffect(() => {
    if (done) doneRef.current?.focus();
  }, [done]);

  if (done) {
    return (
      <div
        ref={doneRef}
        tabIndex={-1}
        aria-live="polite"
        className="flex flex-col items-start gap-[18px] outline-none"
      >
        <Badge tone="positive" icon="check">
          הפרטים נשלחו
        </Badge>
        <b className="font-[family-name:var(--font-display)] text-[clamp(23px,4.5vw,32px)] leading-[1.15]">
          תודה, נחזור אליכם בטלפון
        </b>
        <p className="m-0 text-[clamp(15px,2.2vw,17px)] leading-[1.6] text-[var(--color-body)]">
          נציג הדרן יחזור אל {f.name.trim() || "הפונה"} ויסביר על השירות, על המכשירים ועל הכרטיס
          שמגיע איתם.
        </p>
        <div className="flex flex-wrap gap-3">
          {onClose ? <Button onClick={onClose}>סגירה</Button> : null}
          <Button
            variant="tertiary"
            onClick={() => {
              setDone(false);
              setF(EMPTY);
            }}
          >
            שליחת פנייה נוספת
          </Button>
        </div>
      </div>
    );
  }

  return (
    <form
      className="flex flex-col gap-[18px]"
      onSubmit={(e) => {
        e.preventDefault();
        submit();
      }}
      noValidate
    >
      <Input
        label="שם מלא"
        value={f.name}
        onChange={(e) => set("name")(e.target.value)}
        error={errors.name}
      />

      <div className="grid grid-cols-[repeat(auto-fit,minmax(min(160px,100%),1fr))] gap-4">
        <Input
          label="טלפון"
          placeholder="050-0000000"
          inputMode="tel"
          value={f.phone}
          onChange={(e) => set("phone")(e.target.value)}
          error={errors.phone}
        />
        <Input label="יישוב" value={f.city} onChange={(e) => set("city")(e.target.value)} />
      </div>

      <Select
        label="מתי נוח שנתקשר"
        options={TIME_OPTIONS}
        value={f.time}
        onValueChange={set("time")}
      />

      <Checkbox
        label="אני מאשר/ת שנציג הדרן יחזור אליי בטלפון"
        checked={f.consent}
        onCheckedChange={(state) => {
          set("consent")(state === true);
          setConsentError(false);
        }}
      />

      {consentError ? (
        <span className="text-[length:var(--text-body-sm)] font-semibold text-[var(--color-negative)]">
          יש לאשר את יצירת הקשר כדי לשלוח את הטופס
        </span>
      ) : null}

      {sendError ? (
        <div
          role="alert"
          className="flex items-start gap-2.5 rounded-[var(--radius-lg)] bg-[var(--color-negative-pale)] p-4"
        >
          <span className="mt-0.5 flex-none">
            <Icon name="circle-alert" size={18} color="var(--color-negative-deep)" />
          </span>
          <span className="text-[length:var(--text-body-sm)] leading-[1.5] text-[var(--color-negative-deep)]">
            {sendError}
          </span>
        </div>
      ) : null}

      <Button
        type="submit"
        size="lg"
        fullWidth
        disabled={sending}
        aria-busy={sending || undefined}
        icon={sending ? "loader" : undefined}
        className={sending ? "[&>svg]:animate-spin" : undefined}
      >
        {sending ? "שולחים…" : "שליחת הפרטים"}
      </Button>

      <span className="text-[length:var(--text-caption)] text-[var(--color-mute)]">
        הפרטים משמשים ליצירת קשר בנוגע להצטרפות להדרן בלבד. ט.ל.ח.
      </span>
    </form>
  );
}
