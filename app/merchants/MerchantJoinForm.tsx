"use client";

import * as React from "react";
import { Badge } from "@/components/brand/Badge";
import { Button } from "@/components/brand/Button";
import { Checkbox } from "@/components/brand/Checkbox";
import { Icon } from "@/components/brand/Icon";
import { Input } from "@/components/brand/Input";
import { Select } from "@/components/brand/Select";
import { pretendRequest } from "@/lib/forms";

const CATEGORY_OPTIONS = [
  "רשת מזון ומכולת",
  "בשר, עוף ודגים",
  "ביגוד והנעלה",
  "ספרי קודש ויודאיקה",
  "כלי בית וריהוט",
  "פארמה וטיפוח",
  "אחר",
];

const BRANCH_OPTIONS = [
  { value: "1", label: "סניף אחד" },
  { value: "2-4", label: "2–4 סניפים" },
  { value: "5-10", label: "5–10 סניפים" },
  { value: "10+", label: "יותר מ-10 סניפים" },
];

const EMPTY = {
  business: "",
  category: "רשת מזון ומכולת",
  branches: "1",
  contact: "",
  phone: "",
  email: "",
  terms: false,
};

type Errors = Partial<Record<"business" | "contact" | "phone" | "email", string>>;

/**
 * The merchant enquiry form and its submitted state.
 *
 * Validation mirrors the prototype exactly: business name and contact need 2+
 * characters, the phone needs 9+ digits, the address must look like an email, and the
 * consent box is checked last and reported separately.
 *
 * It renders bare — no card of its own. It lives inside a dialog now, and the dialog
 * is the surface; a card inside a card drew two borders around the same fields.
 */
export function MerchantJoinForm({ onClose }: { onClose?: () => void }) {
  const [done, setDone] = React.useState(false);
  const [f, setF] = React.useState(EMPTY);
  const [errors, setErrors] = React.useState<Errors>({});
  const [termsError, setTermsError] = React.useState(false);
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
    if (f.business.trim().length < 2) e.business = "שדה חובה";
    if (f.contact.trim().length < 2) e.contact = "שדה חובה";
    if (f.phone.replace(/\D/g, "").length < 9) e.phone = "מספר טלפון";
    if (!/.+@.+\..+/.test(f.email)) e.email = "כתובת דואר אלקטרוני תקינה";

    if (Object.keys(e).length) {
      setErrors(e);
      return;
    }
    if (!f.terms) {
      setTermsError(true);
      return;
    }
    setErrors({});
    setTermsError(false);
    setSendError(null);
    setSending(true);
    try {
      await pretendRequest(true);
      setDone(true);
    } catch {
      setSendError(
        "לא הצלחנו לשלוח את הפרטים כרגע. אפשר לנסות שוב, או להתקשר אלינו ישירות.",
      );
    } finally {
      setSending(false);
    }
  };

  React.useEffect(() => {
    if (done) doneRef.current?.focus();
  }, [done]);

  const contactName = f.contact.trim() || "איש הקשר";

  return (
    <>
      {done ? (
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
            תודה, נחזור אליכם מהר
          </b>
          <p className="m-0 text-[clamp(15px,2.2vw,17px)] leading-[1.6] text-[var(--color-body)]">
            נציג המועדון יחזור אל {contactName} בתוך יום עסקים אחד לשיחה קצרה על תנאי ההצטרפות ועל
            הגדרת ההנחה בקופה.
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
      ) : (
        <form
          className="flex flex-col gap-[18px]"
          onSubmit={(e) => {
            e.preventDefault();
            submit();
          }}
          noValidate
        >
          <Input
            label="שם בית העסק"
            value={f.business}
            onChange={(e) => set("business")(e.target.value)}
            error={errors.business}
          />

          <div className="grid grid-cols-[repeat(auto-fit,minmax(min(160px,100%),1fr))] gap-4">
            <Select
              label="תחום"
              options={CATEGORY_OPTIONS}
              value={f.category}
              onValueChange={set("category")}
            />
            <Select
              label="מספר סניפים"
              options={BRANCH_OPTIONS}
              value={f.branches}
              onValueChange={set("branches")}
            />
          </div>

          <div className="grid grid-cols-[repeat(auto-fit,minmax(min(160px,100%),1fr))] gap-4">
            <Input
              label="איש קשר"
              value={f.contact}
              onChange={(e) => set("contact")(e.target.value)}
              error={errors.contact}
            />
            <Input
              label="טלפון"
              placeholder="050-0000000"
              inputMode="tel"
              value={f.phone}
              onChange={(e) => set("phone")(e.target.value)}
              error={errors.phone}
            />
          </div>

          <Input
            label="דואר אלקטרוני"
            type="email"
            value={f.email}
            onChange={(e) => set("email")(e.target.value)}
            error={errors.email}
          />

          <Checkbox
            label="אני מאשר/ת שנציג המועדון יחזור אליי בטלפון או בדואר אלקטרוני"
            checked={f.terms}
            onCheckedChange={(state) => {
              set("terms")(state === true);
              setTermsError(false);
            }}
          />

          {termsError ? (
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
            הפרטים משמשים ליצירת קשר בנוגע להצטרפות בלבד. בכפוף לתקנון המועדון. ט.ל.ח.
          </span>
        </form>
      )}
    </>
  );
}
