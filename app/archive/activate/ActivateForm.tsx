"use client";

import * as React from "react";
import { Alert } from "@/components/brand/Alert";
import { Badge } from "@/components/brand/Badge";
import { Button } from "@/components/brand/Button";
import { Card } from "@/components/brand/Card";
import { Checkbox } from "@/components/brand/Checkbox";
import { Icon, type IconName } from "@/components/brand/Icon";
import { Input } from "@/components/brand/Input";
import { MemberCard } from "@/components/brand/MemberCard";
import { Select } from "@/components/brand/Select";
import { Eyebrow } from "@/components/site/Band";
import { submitActivation } from "@/lib/api/client";
import { CARD_ORDER_CHANNEL, MEMBER_AREA_URL, SUPPORT_CHANNEL } from "@/lib/data/site";
import {
  CARD_ERROR,
  isCardInputValid,
  isEmailValid,
  isPhoneValid,
  maskCard,
  onlyDigits,
} from "@/lib/card";
import { formatCardNumber, formatPhone, isValidIsraeliId } from "@/lib/forms";
import { prefersReducedMotion } from "@/lib/motion";

const EMPTY = {
  cardNumber: "",
  fullName: "",
  phone: "",
  israeliId: "",
  email: "",
  birthdate: "",
  address: "",
  city: "",
  gender: "",
  terms: false,
};

type FieldKey = keyof typeof EMPTY;
type Errors = Partial<Record<FieldKey, string>>;

/** The platform accepts these two values and nothing else. */
const GENDER_OPTIONS = ["זכר", "נקבה"];

const NOTES: { icon: IconName; text: string }[] = [
  { icon: "badge-percent", text: "ההנחה יורדת בקופה במקום — בלי צבירה ובלי קופון." },
  {
    icon: "package",
    text: `עוד לא קיבלתם כרטיס? הזמנת הכרטיס מתבצעת ב${CARD_ORDER_CHANNEL}.`,
  },
  { icon: "shield-check", text: "הפרטים נשמרים במאובטח ומשמשים לזיהוי בעל הכרטיס בלבד." },
  { icon: "help-circle", text: `צריכים עזרה? השירות והתמיכה למועדון נמצאים ב${SUPPORT_CHANNEL}.` },
];

/**
 * Card activation: one card in hand, one form, one button.
 *
 * This was a four-step wizard across two tracks — activate a card, or order one —
 * with a stepper, a summary step and a membership panel above it. The club is a
 * benefit of being a Hadran customer, so there is no card to order; and what is left
 * is short enough that a stepper only added screens between a member and the one
 * thing they came to do. The reference patterns for a form this size (Xero, Wise,
 * Stripe) are all a single narrow column with the required fields first.
 *
 * Only the card number, the full name and the phone are required — everything the
 * platform's card-activate endpoint insists on. The rest is folded away behind one
 * toggle: it improves the club's record of a member, but nobody should have to read
 * six fields they can skip before finding the button.
 */
export function ActivateForm() {
  const [f, setF] = React.useState(EMPTY);
  const [errors, setErrors] = React.useState<Errors>({});
  const [showMore, setShowMore] = React.useState(false);
  const [pending, setPending] = React.useState(false);
  const [submitError, setSubmitError] = React.useState<string | null>(null);
  const [done, setDone] = React.useState<{
    holder: string;
    masked: string;
    status: string | null;
  } | null>(null);
  const doneRef = React.useRef<HTMLDivElement>(null);

  const set =
    <K extends FieldKey>(k: K) =>
    (value: (typeof EMPTY)[K]) => {
      setF((s) => ({ ...s, [k]: value }));
      setErrors((e) => ({ ...e, [k]: undefined }));
    };

  const validate = () => {
    const e: Errors = {};
    if (!isCardInputValid(f.cardNumber)) e.cardNumber = CARD_ERROR;
    if (f.fullName.trim().length < 2) e.fullName = "יש להזין שם מלא";
    if (!isPhoneValid(f.phone)) e.phone = "מספר טלפון נייד תקין";

    // The optional fields are only checked once something was typed into them.
    if (f.israeliId) {
      if (onlyDigits(f.israeliId).length !== 9) e.israeliId = "מספר זהות בן 9 ספרות";
      else if (!isValidIsraeliId(f.israeliId)) e.israeliId = "מספר הזהות אינו תקין — כדאי לבדוק שוב";
    }
    if (f.email && !isEmailValid(f.email)) e.email = "כתובת דוא״ל תקינה";
    if (f.birthdate && Number.isNaN(Date.parse(f.birthdate))) e.birthdate = "תאריך לידה תקין";
    if (!f.terms) e.terms = "יש לאשר את תקנון המועדון";
    return e;
  };

  const submit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (pending) return;

    const e = validate();
    if (Object.keys(e).length) {
      setErrors(e);
      // An error inside the collapsed group is an error nobody can see.
      if (e.israeliId || e.email || e.birthdate) setShowMore(true);
      return;
    }

    setErrors({});
    setSubmitError(null);
    setPending(true);
    const result = await submitActivation({
      cardInput: f.cardNumber,
      fullName: f.fullName,
      phone: f.phone,
      israeliId: onlyDigits(f.israeliId),
      email: f.email,
      birthdate: f.birthdate,
      address: f.address,
      city: f.city,
      gender: f.gender,
    });
    setPending(false);

    if (!result.ok) {
      setSubmitError(result.message);
      return;
    }

    setDone({
      holder: result.data.holder_name || f.fullName.trim(),
      masked: result.data.card_code_masked || maskCard(f.cardNumber),
      status: result.data.status,
    });
    window.scrollTo({ top: 0, behavior: prefersReducedMotion() ? "auto" : "smooth" });
  };

  React.useEffect(() => {
    if (done) doneRef.current?.focus();
  }, [done]);

  return (
    <div className="bg-[var(--color-canvas-soft)] px-[clamp(16px,4vw,24px)] pt-[clamp(28px,5.3vw,48px)] pb-16">
      <div className="mx-auto flex w-full max-w-[620px] flex-col gap-6">
        {done ? (
          <div
            ref={doneRef}
            tabIndex={-1}
            aria-live="polite"
            className="flex flex-col items-center gap-6 text-center outline-none"
          >
            <Badge tone="positive" icon="check">
              הכרטיס משויך אליכם
            </Badge>
            <h1 className="m-0 text-[clamp(27px,6vw,40px)] leading-[1.1]">הכרטיס מוכן לשימוש</h1>
            <p className="m-0 max-w-[460px] text-[clamp(16px,2.3vw,18px)] leading-[1.6] text-[var(--color-body)]">
              מציגים את הכרטיס בקופה אצל השותפים שלנו, וההנחה יורדת מהחשבון במקום.
            </p>

            {/* The name and the number come back from the platform, so this is the
                record as it was actually saved — not an echo of the form. */}
            <MemberCard holder={done.holder} number={done.masked} />

            {done.status && done.status !== "active" ? (
              <Alert tone="warning">
                הפרטים נשמרו, אך הכרטיס עדיין אינו פעיל במערכת. אפשר להשלים את ההפעלה דרך{" "}
                {SUPPORT_CHANNEL}.
              </Alert>
            ) : null}

            <div className="flex flex-wrap justify-center gap-3">
              <Button
                as="a"
                href={MEMBER_AREA_URL}
                target="_blank"
                rel="noopener noreferrer"
                iconAfter="external-link"
              >
                לאזור האישי
              </Button>
              <Button as="a" href="/benefits" variant="tertiary">
                לרשימת בתי העסק
              </Button>
            </div>
          </div>
        ) : (
          <>
            <div className="flex flex-col gap-3">
              <Eyebrow>הדרן קארד</Eyebrow>
              <h1 className="m-0 text-[clamp(27px,6vw,44px)] leading-[1.08]">הפעלת הדרן קארד</h1>
              <p className="m-0 text-[clamp(16px,2.3vw,18px)] leading-[1.6] text-[var(--color-body)]">
                קיבלתם כרטיס? מזינים את המספר שעליו ואת פרטי בעל הכרטיס, והכרטיס משויך אליכם.
              </p>
            </div>

            <Card tone="plain" padding="md">
              <form className="flex flex-col gap-6" onSubmit={submit} noValidate>
                <Input
                  label="מספר הכרטיס"
                  placeholder="0000 0000 0000 0000"
                  icon="credit-card"
                  inputMode="numeric"
                  autoComplete="off"
                  dir="ltr"
                  className="ltr text-start tnum"
                  value={formatCardNumber(f.cardNumber)}
                  onChange={(e) => set("cardNumber")(e.target.value)}
                  error={errors.cardNumber}
                  hint="המספר המלא המודפס על הכרטיס"
                />

                <div className="grid grid-cols-[repeat(auto-fit,minmax(min(220px,100%),1fr))] gap-4">
                  <Input
                    label="שם מלא"
                    autoComplete="name"
                    value={f.fullName}
                    onChange={(e) => set("fullName")(e.target.value)}
                    error={errors.fullName}
                  />
                  <Input
                    label="טלפון נייד"
                    placeholder="050-0000000"
                    inputMode="tel"
                    autoComplete="tel"
                    dir="ltr"
                    className="ltr text-start tnum"
                    value={formatPhone(f.phone)}
                    onChange={(e) => set("phone")(e.target.value)}
                    error={errors.phone}
                  />
                </div>

                {/* Everything past this line is optional. It stays closed until it is
                    asked for, so the required part of the form is what a member sees. */}
                <div className="flex flex-col gap-4 border-t border-[var(--color-border)] pt-5">
                  <button
                    type="button"
                    onClick={() => setShowMore((s) => !s)}
                    aria-expanded={showMore}
                    aria-controls="activate-optional"
                    className="flex items-center gap-2 self-start bg-transparent p-0 text-[length:var(--text-body-sm)] font-bold text-[var(--color-primary-deep)]"
                  >
                    <Icon name={showMore ? "minus" : "plus"} size={18} />
                    פרטים נוספים, לא חובה
                  </button>

                  {showMore ? (
                    <div id="activate-optional" className="flex flex-col gap-4">
                      <div className="grid grid-cols-[repeat(auto-fit,minmax(min(220px,100%),1fr))] gap-4">
                        <Input
                          label="תעודת זהות"
                          inputMode="numeric"
                          dir="ltr"
                          className="ltr text-start tnum"
                          value={f.israeliId}
                          onChange={(e) => set("israeliId")(e.target.value)}
                          error={errors.israeliId}
                        />
                        <Input
                          label="דואר אלקטרוני"
                          type="email"
                          autoComplete="email"
                          value={f.email}
                          onChange={(e) => set("email")(e.target.value)}
                          error={errors.email}
                        />
                      </div>

                      <div className="grid grid-cols-[repeat(auto-fit,minmax(min(220px,100%),1fr))] gap-4">
                        <Input
                          label="תאריך לידה"
                          type="date"
                          dir="ltr"
                          className="ltr text-start tnum"
                          value={f.birthdate}
                          onChange={(e) => set("birthdate")(e.target.value)}
                          error={errors.birthdate}
                        />
                        <Select
                          label="מגדר"
                          options={GENDER_OPTIONS}
                          placeholder="לא צוין"
                          value={f.gender || undefined}
                          onValueChange={set("gender")}
                        />
                      </div>

                      <div className="grid grid-cols-[repeat(auto-fit,minmax(min(220px,100%),1fr))] gap-4">
                        <Input
                          label="כתובת"
                          autoComplete="street-address"
                          value={f.address}
                          onChange={(e) => set("address")(e.target.value)}
                        />
                        <Input
                          label="עיר"
                          autoComplete="address-level2"
                          value={f.city}
                          onChange={(e) => set("city")(e.target.value)}
                        />
                      </div>
                    </div>
                  ) : null}
                </div>

                <div className="flex flex-col gap-2 border-t border-[var(--color-border)] pt-5">
                  <Checkbox
                    label="קראתי ואני מאשר/ת את תקנון המועדון ואת שמירת הפרטים לזיהוי בעל הכרטיס"
                    checked={f.terms}
                    onCheckedChange={(state) => set("terms")(state === true)}
                  />
                  {errors.terms ? (
                    <span className="text-[length:var(--text-body-sm)] font-semibold text-[var(--color-negative)]">
                      {errors.terms}
                    </span>
                  ) : null}
                </div>

                {submitError ? <Alert>{submitError}</Alert> : null}

                <Button type="submit" size="lg" fullWidth disabled={pending} aria-busy={pending || undefined}>
                  {pending ? (
                    <>
                      <Icon name="loader" size={20} className="animate-spin" />
                      מפעילים את הכרטיס…
                    </>
                  ) : (
                    "הפעלת הכרטיס"
                  )}
                </Button>
              </form>
            </Card>

            <ul className="m-0 flex list-none flex-col gap-3 p-0">
              {NOTES.map((note) => (
                <li key={note.text} className="flex items-start gap-2.5">
                  <span className="mt-0.5 flex-none">
                    <Icon name={note.icon} size={18} color="var(--color-primary-deep)" />
                  </span>
                  <span className="text-[length:var(--text-body-sm)] leading-[1.6] text-[var(--color-body)]">
                    {note.text}
                  </span>
                </li>
              ))}
            </ul>
          </>
        )}
      </div>
    </div>
  );
}
