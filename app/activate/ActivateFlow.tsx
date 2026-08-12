"use client";

import * as React from "react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert } from "@/components/brand/Alert";
import { Badge } from "@/components/brand/Badge";
import { Button } from "@/components/brand/Button";
import { Card } from "@/components/brand/Card";
import { Checkbox } from "@/components/brand/Checkbox";
import { Icon, type IconName } from "@/components/brand/Icon";
import { Input } from "@/components/brand/Input";
import { MemberCard } from "@/components/brand/MemberCard";
import { Select } from "@/components/brand/Select";
import { submitActivation } from "@/lib/api/client";
import {
  CARD_ERROR,
  isCardInputValid,
  isEmailValid,
  isPhoneValid,
  maskCard,
  onlyDigits,
} from "@/lib/card";
import { cn } from "@/lib/utils";
import { prefersReducedMotion } from "@/lib/motion";

/** The two tracks and their steps, verbatim from FLOWS in Activate.dc.html. */
const FLOWS = {
  activate: [
    { key: "card", label: "פרטי הכרטיס" },
    { key: "personal", label: "פרטי החבר" },
    { key: "confirm", label: "אישור" },
    { key: "done", label: "סיום" },
  ],
  order: [
    { key: "personal", label: "פרטי החבר" },
    { key: "plan", label: "מסלול" },
    { key: "confirm", label: "אישור" },
    { key: "done", label: "סיום" },
  ],
} as const;

type Mode = keyof typeof FLOWS;
type FieldKey =
  | "cardNumber"
  | "first"
  | "last"
  | "id"
  | "phone"
  | "email"
  | "city"
  | "street"
  | "plan"
  | "terms";

const EMPTY = {
  cardNumber: "",
  first: "",
  last: "",
  id: "",
  phone: "",
  email: "",
  city: "בני ברק",
  street: "",
  plan: "year" as "year" | "month",
  terms: false,
};

const CITY_OPTIONS = [
  "בני ברק",
  "ירושלים",
  "בית שמש",
  "מודיעין עילית",
  "אלעד",
  "ביתר עילית",
  "אחר",
];

const NOTES: { icon: IconName; text: string }[] = [
  {
    icon: "badge-percent",
    text: "ההנחה יורדת בקופה במקום — אין צורך בצבירה, בקופון או באפליקציה.",
  },
  { icon: "truck", text: "הכרטיס הפיזי נשלח עד הבית תוך חמישה ימי עסקים, ללא עלות משלוח." },
  { icon: "shield-check", text: "הפרטים נשמרים במאובטח ומשמשים לזיהוי בעל הכרטיס בלבד." },
  { icon: "phone", text: "צריכים עזרה? מוקד המועדון זמין בימים א׳–ה׳, 9:00–17:00." },
];

/**
 * The card activation / ordering flow: two tracks of four steps each, with a stepper,
 * per-step validation and a live MemberCard that takes the holder name and masked
 * number from the form as it is filled in.
 *
 * The activation track posts to the platform's public activation endpoint, which binds
 * a card that arrived in the post to the member who received it. The ordering track is
 * a front-of-house form only — issuing a new card is not a public operation, so that
 * track collects details and hands over to the club office.
 */
export function ActivateFlow() {
  const [mode, setMode] = React.useState<Mode>("activate");
  const [step, setStep] = React.useState(0);
  const [f, setF] = React.useState(EMPTY);
  const [errors, setErrors] = React.useState<Partial<Record<FieldKey, string>>>({});
  const [termsError, setTermsError] = React.useState(false);
  const [pending, setPending] = React.useState(false);
  const [submitError, setSubmitError] = React.useState<string | null>(null);
  const [issuedMemberId, setIssuedMemberId] = React.useState<string | null>(null);

  const flow = FLOWS[mode];
  const stepKey = flow[Math.min(step, flow.length - 1)].key;
  const isOrder = mode === "order";

  const set =
    <K extends keyof typeof EMPTY>(k: K) =>
    (value: (typeof EMPTY)[K]) => {
      setF((s) => ({ ...s, [k]: value }));
      setErrors((e) => ({ ...e, [k]: undefined }));
    };

  const validate = () => {
    const e: Partial<Record<FieldKey, string>> = {};
    if (stepKey === "card") {
      if (!isCardInputValid(f.cardNumber)) e.cardNumber = CARD_ERROR;
    }
    if (stepKey === "personal") {
      if (f.first.trim().length < 2) e.first = "שדה חובה";
      if (f.last.trim().length < 2) e.last = "שדה חובה";
      if (onlyDigits(f.id).length !== 9) e.id = "מספר זהות בן 9 ספרות";
      if (!isPhoneValid(f.phone)) e.phone = "מספר טלפון נייד תקין";
      if (!isEmailValid(f.email)) e.email = "כתובת דוא״ל תקינה, לשליחת אישור ההפעלה";
      if (f.street.trim().length < 2) e.street = "שדה חובה";
    }
    return e;
  };

  const scrollTop = () =>
    window.scrollTo({ top: 0, behavior: prefersReducedMotion() ? "auto" : "smooth" });

  const next = async () => {
    if (stepKey === "done" || pending) return;

    if (stepKey === "confirm") {
      if (!f.terms) {
        setTermsError(true);
        return;
      }
      setTermsError(false);
      setSubmitError(null);

      // Only the activation track has a card to bind; an order has nothing to send yet.
      if (!isOrder) {
        setPending(true);
        const result = await submitActivation({
          cardInput: f.cardNumber,
          firstName: f.first,
          lastName: f.last,
          phone: f.phone,
          email: f.email,
        });
        setPending(false);

        if (!result.ok) {
          setSubmitError(result.message);
          return;
        }
        setIssuedMemberId(result.data.member_id);
      }

      setStep((s) => s + 1);
      scrollTop();
      return;
    }

    const e = validate();
    if (Object.keys(e).length) {
      setErrors(e);
      return;
    }
    setErrors({});
    setStep((s) => s + 1);
  };

  const back = () => {
    setStep((s) => Math.max(0, s - 1));
    setErrors({});
  };

  const cardMasked = maskCard(f.cardNumber) || "0000 •••• •••• 0000";
  const fullName = `${f.first} ${f.last}`.trim() || "שם החבר";
  // The platform assigns the member number; until it answers, the card tail stands in.
  const memberId = issuedMemberId ?? `8032-${onlyDigits(f.id).slice(-4) || "0000"}`;

  const summary = [
    ...(isOrder ? [] : [{ k: "מספר הכרטיס", v: cardMasked }]),
    { k: "שם מלא", v: fullName },
    { k: "מספר זהות", v: f.id || "—" },
    { k: "טלפון נייד", v: f.phone || "—" },
    { k: "דוא״ל", v: f.email || "—" },
    { k: "כתובת למשלוח", v: `${f.street ? f.street + ", " : ""}${f.city}` },
    ...(isOrder ? [{ k: "מסלול", v: f.plan === "year" ? "שנתי · ₪249" : "חודשי · ₪29" }] : []),
  ];

  const planBox = (on: boolean) =>
    cn(
      "cursor-pointer rounded-[20px] px-[22px] py-5 text-start",
      "transition-[background-color,border-color] duration-[var(--duration-fast)] ease-[var(--ease-out)]",
      on
        ? "border-2 border-[var(--color-ink)] bg-[var(--gold-50)]"
        : "border border-[var(--color-border)] bg-[var(--color-canvas)]",
    );

  return (
    <div className="bg-[var(--color-canvas-soft)] px-[clamp(16px,4vw,24px)] pt-[clamp(28px,5.3vw,48px)] pb-16">
      <div className="mx-auto grid max-w-[var(--container-max)] grid-cols-[repeat(auto-fit,minmax(min(400px,100%),1fr))] items-start gap-10">
        {/* ── Form column ─────────────────────────────────────────────── */}
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-3">
            <span className="text-[13px] font-bold tracking-[var(--tracking-wide)] text-[var(--color-primary-deep)]">
              הדרן קארד
            </span>
            <h1 className="m-0 text-[clamp(27px,6vw,44px)] leading-[1.08]">
              {isOrder ? "הזמנת הדרן קארד" : "הפעלת הדרן קארד"}
            </h1>
            <p className="m-0 text-[clamp(16px,2.3vw,18px)] text-[var(--color-body)]">
              {isOrder
                ? "ממלאים פרטים, בוחרים מסלול, והכרטיס הפיזי נשלח עד הבית — מוכן לשימוש בקנייה הראשונה."
                : "קיבלתם כרטיס? הזנת מספר הכרטיס והפרטים האישיים תשייך אותו אליכם ותפעיל את ההנחה."}
            </p>
          </div>

          {/* Track switch. Changing track restarts the flow. */}
          <Tabs
            value={mode}
            onValueChange={(v) => {
              setMode(v as Mode);
              setStep(0);
              setErrors({});
              setTermsError(false);
            }}
            className="gap-0"
          >
            <TabsList>
              <TabsTrigger value="activate">הפעלת כרטיס שקיבלתי</TabsTrigger>
              <TabsTrigger value="order">הזמנת כרטיס חדש</TabsTrigger>
            </TabsList>
          </Tabs>

          <Card tone="plain" padding="clamp(18px,5vw,32px)">
            <div className="flex flex-col gap-7">
              {/* Stepper */}
              <ol className="flex list-none flex-wrap items-center gap-2.5 p-0">
                {flow.map((st, i) => {
                  const state = i < step ? "done" : i === step ? "now" : "todo";
                  return (
                    <li
                      key={st.key}
                      // A clean 2×2 on a phone: at a 130px basis the four steps
                      // break 2 + 1 + 1 in the narrowest cards.
                      className="flex min-w-0 flex-[1_1_calc(50%-10px)] items-center gap-2 min-[560px]:flex-[1_1_130px]"
                      aria-current={state === "now" ? "step" : undefined}
                    >
                      <span
                        className={cn(
                          "grid size-7 flex-shrink-0 place-items-center rounded-full",
                          "font-[family-name:var(--font-ui)] text-[13px] font-bold",
                          state === "done" && "bg-[var(--color-primary-deep)] text-white",
                          state === "now" && "bg-[var(--color-primary)] text-[var(--color-ink)]",
                          state === "todo" && "bg-[var(--sand-200)] text-[var(--color-mute)]",
                        )}
                      >
                        {state === "done" ? "✓" : i + 1}
                      </span>
                      <span
                        className={cn(
                          "text-[length:var(--text-body-sm)] whitespace-nowrap",
                          state === "todo"
                            ? "font-medium text-[var(--color-mute)]"
                            : "font-bold text-[var(--color-ink)]",
                        )}
                      >
                        {st.label}
                      </span>
                    </li>
                  );
                })}
              </ol>

              {/* ── Step: card details ──────────────────────────────── */}
              {stepKey === "card" ? (
                <div className="flex flex-col gap-5">
                  <div className="flex flex-col gap-1.5">
                    <b className="text-[clamp(18px,2.8vw,22px)]">פרטי הכרטיס שקיבלתם</b>
                    <span className="text-[15px] text-[var(--color-body)]">
                      מספר הכרטיס מופיע על גב הכרטיס, מתחת לפס המגנטי.
                    </span>
                  </div>
                  <Input
                    label="מספר הדרן קארד"
                    placeholder="0000 0000 0000 0000"
                    icon="credit-card"
                    inputMode="numeric"
                    autoComplete="off"
                    value={f.cardNumber}
                    onChange={(e) => set("cardNumber")(e.target.value)}
                    error={errors.cardNumber}
                    hint="8 הספרות האחרונות שעל הכרטיס. אפשר להזין גם את המספר המלא."
                  />
                </div>
              ) : null}

              {/* ── Step: personal details ──────────────────────────── */}
              {stepKey === "personal" ? (
                <div className="flex flex-col gap-5">
                  <div className="flex flex-col gap-1.5">
                    <b className="text-[clamp(18px,2.8vw,22px)]">פרטי החבר</b>
                    <span className="text-[15px] text-[var(--color-body)]">
                      הפרטים משמשים לזיהוי בעל הכרטיס ולשליחתו. לא נעשה בהם שימוש נוסף.
                    </span>
                  </div>
                  <div className="grid grid-cols-[repeat(auto-fit,minmax(min(180px,100%),1fr))] gap-4">
                    <Input
                      label="שם פרטי"
                      value={f.first}
                      onChange={(e) => set("first")(e.target.value)}
                      error={errors.first}
                    />
                    <Input
                      label="שם משפחה"
                      value={f.last}
                      onChange={(e) => set("last")(e.target.value)}
                      error={errors.last}
                    />
                  </div>
                  <div className="grid grid-cols-[repeat(auto-fit,minmax(min(180px,100%),1fr))] gap-4">
                    <Input
                      label="מספר זהות"
                      placeholder="000000000"
                      inputMode="numeric"
                      value={f.id}
                      onChange={(e) => set("id")(e.target.value)}
                      error={errors.id}
                    />
                    <Input
                      label="טלפון נייד"
                      placeholder="050-0000000"
                      inputMode="tel"
                      value={f.phone}
                      onChange={(e) => set("phone")(e.target.value)}
                      error={errors.phone}
                    />
                  </div>
                  <Input
                    label="דוא״ל"
                    placeholder="name@example.com"
                    type="email"
                    inputMode="email"
                    icon="mail"
                    autoComplete="email"
                    value={f.email}
                    onChange={(e) => set("email")(e.target.value)}
                    error={errors.email}
                    hint="לשליחת אישור ההפעלה ועדכונים על בתי עסק חדשים"
                  />
                  <div className="grid grid-cols-[repeat(auto-fit,minmax(min(180px,100%),1fr))] gap-4">
                    <Select
                      label="עיר"
                      options={CITY_OPTIONS}
                      value={f.city}
                      onChange={(e) => set("city")(e.target.value)}
                    />
                    <Input
                      label="רחוב ומספר"
                      value={f.street}
                      onChange={(e) => set("street")(e.target.value)}
                      error={errors.street}
                    />
                  </div>
                </div>
              ) : null}

              {/* ── Step: plan ──────────────────────────────────────── */}
              {stepKey === "plan" ? (
                <div className="flex flex-col gap-5">
                  <div className="flex flex-col gap-1.5">
                    <b className="text-[clamp(18px,2.8vw,22px)]">בחירת מסלול</b>
                    <span className="text-[15px] text-[var(--color-body)]">
                      שני המסלולים כוללים את אותה מערכת ההטבות — מהנחות קבועות ועד עשרות
                      אחוזים בחנויות נבחרות.
                    </span>
                  </div>
                  {/* A radiogroup so the two plans are one arrow-navigable choice. */}
                  <div className="flex flex-col gap-3" role="radiogroup" aria-label="בחירת מסלול">
                    <button
                      type="button"
                      role="radio"
                      aria-checked={f.plan === "year"}
                      onClick={() => set("plan")("year")}
                      className={planBox(f.plan === "year")}
                    >
                      <div className="flex items-center justify-between gap-4">
                        <div className="flex flex-col gap-1">
                          <b className="text-[clamp(16px,2.4vw,19px)]">מסלול שנתי</b>
                          <span className="text-[length:var(--text-body-sm)] text-[var(--color-body)]">
                            מוחזר כבר בקניות של חודשיים · כולל כרטיס נוסף לבן/בת הזוג
                          </span>
                        </div>
                        <span className="tnum font-[family-name:var(--font-display)] text-[clamp(22px,4.2vw,30px)] font-extrabold">
                          ₪249
                        </span>
                      </div>
                    </button>
                    <button
                      type="button"
                      role="radio"
                      aria-checked={f.plan === "month"}
                      onClick={() => set("plan")("month")}
                      className={planBox(f.plan === "month")}
                    >
                      <div className="flex items-center justify-between gap-4">
                        <div className="flex flex-col gap-1">
                          <b className="text-[clamp(16px,2.4vw,19px)]">מסלול חודשי</b>
                          <span className="text-[length:var(--text-body-sm)] text-[var(--color-body)]">
                            ללא התחייבות · ביטול בכל עת
                          </span>
                        </div>
                        <span className="tnum font-[family-name:var(--font-display)] text-[clamp(22px,4.2vw,30px)] font-extrabold">
                          ₪29
                        </span>
                      </div>
                    </button>
                  </div>
                </div>
              ) : null}

              {/* ── Step: confirm ───────────────────────────────────── */}
              {stepKey === "confirm" ? (
                <div className="flex flex-col gap-5">
                  <div className="flex flex-col gap-1.5">
                    <b className="text-[clamp(18px,2.8vw,22px)]">אישור הפרטים</b>
                    <span className="text-[15px] text-[var(--color-body)]">
                      בדקו שהפרטים נכונים. אחרי האישור הכרטיס משויך לשם המופיע כאן.
                    </span>
                  </div>
                  <dl className="m-0 flex flex-col gap-0.5 overflow-hidden rounded-2xl border border-[var(--color-border)]">
                    {summary.map((row) => (
                      <div
                        key={row.k}
                        className="flex justify-between gap-4 border-b border-[var(--color-border)] bg-[var(--color-canvas)] px-[18px] py-3.5 last:border-b-0"
                      >
                        <dt className="text-[15px] text-[var(--color-mute)]">{row.k}</dt>
                        <dd className="tnum m-0 text-[15px] font-semibold">{row.v}</dd>
                      </div>
                    ))}
                  </dl>
                  <Checkbox
                    label="אני מאשר/ת את תקנון המועדון ואת קבלת עדכונים על בתי עסק חדשים"
                    checked={f.terms}
                    onChange={(e) => {
                      set("terms")(e.target.checked);
                      setTermsError(false);
                    }}
                  />
                  {termsError ? (
                    <span className="text-[length:var(--text-body-sm)] font-semibold text-[var(--color-negative)]">
                      יש לאשר את תקנון המועדון כדי להמשיך
                    </span>
                  ) : null}
                  {submitError ? <Alert>{submitError}</Alert> : null}
                </div>
              ) : null}

              {/* ── Step: done ──────────────────────────────────────── */}
              {stepKey === "done" ? (
                <div className="flex flex-col items-start gap-5" aria-live="polite">
                  <Badge tone="positive" icon="check">
                    {isOrder ? "ההזמנה נרשמה" : "הכרטיס הופעל"}
                  </Badge>
                  <b className="font-[family-name:var(--font-display)] text-[clamp(25px,5vw,36px)] leading-[1.1]">
                    {isOrder ? "הכרטיס בדרך אליכם" : "הכרטיס פעיל ומשויך אליכם"}
                  </b>
                  <p className="m-0 text-[clamp(15px,2.2vw,17px)] leading-[1.6] text-[var(--color-body)]">
                    {isOrder
                      ? "הדרן קארד יישלח לכתובת שהזנתם תוך חמישה ימי עסקים. עם קבלתו נכנסים לעמוד ההפעלה, ומהרגע הזה ההנחה יורדת בקופה בכל בית עסק שותף."
                      : "הכרטיס משויך אליכם ופעיל. מציגים אותו בקופה וההנחה יורדת מהחשבון במקום — בלי צבירה ובלי קופון. אישור ההפעלה נשלח לדוא״ל שהזנתם."}
                  </p>

                  <div className="flex w-full flex-col gap-3 rounded-2xl bg-[var(--color-canvas-warm)] p-5">
                    <div className="flex justify-between">
                      <span className="text-[15px] text-[var(--color-mute)]">שם החבר</span>
                      <span className="font-semibold">{fullName}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[15px] text-[var(--color-mute)]">מספר חבר</span>
                      <span className="tnum ltr font-semibold">{memberId}</span>
                    </div>
                    <div className="flex justify-between gap-4">
                      <span className="text-[15px] text-[var(--color-mute)]">
                        ההטבה בבתי העסק השותפים
                      </span>
                      <span className="text-end font-bold text-[var(--color-positive)]">
                        משתנה לפי בית עסק — עד עשרות אחוזים
                      </span>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-3">
                    <Button as="a" href="/member">
                      לאזור האישי
                    </Button>
                    <Button as="a" href="/benefits" variant="tertiary">
                      לרשימת בתי העסק
                    </Button>
                  </div>
                </div>
              ) : null}

              {/* Back / continue. "Back" is chevron-right in RTL. */}
              {stepKey !== "done" ? (
                <div className="flex items-center justify-between gap-4 border-t border-[var(--color-border)] pt-2">
                  <Button
                    variant="ghost"
                    icon="chevron-right"
                    onClick={back}
                    disabled={step === 0 || pending}
                  >
                    חזרה
                  </Button>
                  <Button size="lg" onClick={next} disabled={pending}>
                    {pending ? (
                      <>
                        <Icon name="loader" size={20} className="animate-spin" />
                        מפעילים את הכרטיס…
                      </>
                    ) : stepKey === "confirm" ? (
                      isOrder ? (
                        "אישור והזמנה"
                      ) : (
                        "אישור והפעלה"
                      )
                    ) : (
                      "המשך"
                    )}
                  </Button>
                </div>
              ) : null}
            </div>
          </Card>
        </div>

        {/* ── Live card + notes ───────────────────────────────────────── */}
        <div className="flex flex-col items-center gap-6">
          <MemberCard
            holder={fullName}
            tier="חבר מועדון · הדרן קארד"
            number={cardMasked}
          />

          <Card tone="plain" padding="clamp(18px,5vw,28px)" className="w-full">
            <div className="flex flex-col gap-[18px]">
              <b className="text-[clamp(16px,2.4vw,19px)]">מה חשוב לדעת</b>
              {NOTES.map((n) => (
                <div key={n.text} className="flex items-start gap-3">
                  <Icon name={n.icon} size={20} color="var(--color-primary-deep)" />
                  <span className="text-[15px] leading-[1.6] text-[var(--color-body)]">
                    {n.text}
                  </span>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
