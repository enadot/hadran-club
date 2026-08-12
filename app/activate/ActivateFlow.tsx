"use client";

import * as React from "react";
import { Badge } from "@/components/brand/Badge";
import { Button } from "@/components/brand/Button";
import { Card } from "@/components/brand/Card";
import { Checkbox } from "@/components/brand/Checkbox";
import { Icon, type IconName } from "@/components/brand/Icon";
import { Input } from "@/components/brand/Input";
import { MemberCard } from "@/components/brand/MemberCard";
import { Select } from "@/components/brand/Select";
import { CardNumberGuide } from "@/components/brand/CardNumberGuide";
import { PlanChooser } from "@/components/site/PlanChooser";
import { planSummaryLine } from "@/lib/data/plans";
import {
  formatCardNumber,
  formatPhone,
  isValidIsraeliId,
  maskCardNumber,
  onlyDigits,
  pretendRequest,
} from "@/lib/forms";
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
  | "cvv"
  | "first"
  | "last"
  | "id"
  | "phone"
  | "city"
  | "street"
  | "plan"
  | "terms";

const EMPTY = {
  cardNumber: "",
  cvv: "",
  first: "",
  last: "",
  id: "",
  phone: "",
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
 */
export function ActivateFlow() {
  const [mode, setMode] = React.useState<Mode>("activate");
  const [step, setStep] = React.useState(0);
  const [f, setF] = React.useState(EMPTY);
  const [errors, setErrors] = React.useState<Partial<Record<FieldKey, string>>>({});
  const [termsError, setTermsError] = React.useState(false);
  // The final step talks to the Kehilot Card API. Until it does, it still has to
  // behave like a network call: disabled while in flight, recoverable when it fails.
  const [submitting, setSubmitting] = React.useState(false);
  const [submitError, setSubmitError] = React.useState<string | null>(null);

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
      if (onlyDigits(f.cardNumber).length !== 16)
        e.cardNumber = "יש להזין 16 ספרות המופיעות על הכרטיס";
      if (onlyDigits(f.cvv).length !== 3) e.cvv = "יש להזין שלוש ספרות";
    }
    if (stepKey === "personal") {
      if (f.first.trim().length < 2) e.first = "שדה חובה";
      if (f.last.trim().length < 2) e.last = "שדה חובה";
      if (onlyDigits(f.id).length !== 9) e.id = "מספר זהות בן 9 ספרות";
      else if (!isValidIsraeliId(f.id)) e.id = "מספר הזהות אינו תקין — כדאי לבדוק שוב";
      if (onlyDigits(f.phone).length < 10) e.phone = "מספר טלפון נייד בן 10 ספרות";
      if (f.street.trim().length < 2) e.street = "שדה חובה";
    }
    return e;
  };

  const scrollTop = () =>
    window.scrollTo({ top: 0, behavior: prefersReducedMotion() ? "auto" : "smooth" });

  const next = async () => {
    if (stepKey === "done" || submitting) return;

    if (stepKey === "confirm") {
      if (!f.terms) {
        setTermsError(true);
        return;
      }
      setTermsError(false);
      setSubmitError(null);
      setSubmitting(true);
      try {
        await pretendRequest(true);
        setStep((s) => s + 1);
        scrollTop();
      } catch {
        setSubmitError(
          "לא הצלחנו להשלים את הפעולה כרגע. אפשר לנסות שוב, או להתקשר למוקד המועדון.",
        );
      } finally {
        setSubmitting(false);
      }
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

  const cardMasked = maskCardNumber(f.cardNumber);
  const fullName = `${f.first} ${f.last}`.trim() || "שם החבר";
  const memberId = `8032-${onlyDigits(f.id).slice(-4) || "0000"}`;

  const summary = [
    ...(isOrder ? [] : [{ k: "מספר הכרטיס", v: cardMasked }]),
    { k: "שם מלא", v: fullName },
    { k: "מספר זהות", v: f.id || "—" },
    { k: "טלפון נייד", v: f.phone || "—" },
    { k: "כתובת למשלוח", v: `${f.street ? f.street + ", " : ""}${f.city}` },
    ...(isOrder ? [{ k: "מסלול", v: planSummaryLine(f.plan) }] : []),
  ];

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

          {/* Track switch. Changing track restarts the flow.

              Not Radix Tabs, which is what this was: the form below is not a
              tabpanel — it is one form whose steps differ — so every trigger
              carried an aria-controls pointing at a panel that does not exist,
              and a screen reader announced a tab with nothing to move into.
              Two toggle buttons say exactly what this is. */}
          <div
            role="group"
            aria-label="בחירת מסלול"
            className="hc-rail flex snap-x gap-[var(--space-lg)] border-b border-[var(--color-border)] min-[640px]:gap-[var(--space-xl)]"
          >
            {(
              [
                ["activate", "הפעלת כרטיס שקיבלתי"],
                ["order", "הזמנת כרטיס חדש"],
              ] as const
            ).map(([value, label]) => {
              const on = mode === value;
              return (
                <button
                  key={value}
                  type="button"
                  aria-pressed={on}
                  onClick={() => {
                    setMode(value);
                    setStep(0);
                    setErrors({});
                    setTermsError(false);
                    setSubmitError(null);
                  }}
                  className={cn(
                    "-mb-px inline-flex min-h-11 flex-none snap-start cursor-pointer items-end",
                    "border-b-2 bg-transparent pb-3 whitespace-nowrap",
                    "text-[length:var(--text-body-md)]",
                    "transition-[color,border-color] duration-[var(--duration-base)] ease-[var(--ease-out)]",
                    on
                      ? "border-[var(--color-primary-deep)] font-bold text-[var(--color-ink)]"
                      : "border-transparent font-medium text-[var(--color-body)] hover:text-[var(--color-ink)]",
                  )}
                >
                  {label}
                </button>
              );
            })}
          </div>

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
                    <span className="text-[15px] leading-[1.6] text-[var(--color-body)]">
                      הופכים את הכרטיס. שתי שורות הספרות שמתחת לפס המגנטי הן מה שצריך כאן.
                    </span>
                  </div>

                  {/* Shown above the fields, not beside them: on a phone the person
                      is holding the card and looking for the row, and a figure that
                      sits below the inputs is a figure they scroll past. */}
                  <CardNumberGuide className="min-[1060px]:hidden" />

                  <Input
                    label="מספר הדרן קארד"
                    placeholder="0000 0000 0000 0000"
                    icon="credit-card"
                    inputMode="numeric"
                    autoComplete="off"
                    dir="ltr"
                    className="ltr text-start tnum tracking-[0.04em]"
                    maxLength={19}
                    value={formatCardNumber(f.cardNumber)}
                    onChange={(e) => set("cardNumber")(e.target.value)}
                    error={errors.cardNumber}
                    hint="16 הספרות בשורה הארוכה"
                  />
                  <Input
                    label="קוד אימות"
                    placeholder="000"
                    inputMode="numeric"
                    autoComplete="off"
                    dir="ltr"
                    className="ltr text-start tnum tracking-[0.04em]"
                    maxLength={3}
                    value={onlyDigits(f.cvv).slice(0, 3)}
                    onChange={(e) => set("cvv")(e.target.value)}
                    error={errors.cvv}
                    hint="שלוש הספרות הקצרות שמתחת למספר"
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
                      dir="ltr"
                      className="ltr text-start tnum"
                      maxLength={9}
                      value={onlyDigits(f.id).slice(0, 9)}
                      onChange={(e) => set("id")(e.target.value)}
                      error={errors.id}
                    />
                    <Input
                      label="טלפון נייד"
                      placeholder="050-0000000"
                      inputMode="tel"
                      dir="ltr"
                      className="ltr text-start tnum"
                      value={formatPhone(f.phone)}
                      onChange={(e) => set("phone")(e.target.value)}
                      error={errors.phone}
                    />
                  </div>
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
                    <span className="text-[15px] leading-[1.6] text-[var(--color-body)]">
                      שני המסלולים פותחים בדיוק את אותם שותפים, כולל החנויות הבלעדיות.
                      ההבדל היחיד הוא איך משלמים.
                    </span>
                  </div>
                  {/* One component with the home page, so the plan a visitor compared
                      before joining is literally the card they now select. */}
                  <PlanChooser
                    value={f.plan}
                    onChange={(id) => set("plan")(id)}
                    className="min-[720px]:grid-cols-1 min-[900px]:grid-cols-2"
                  />
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

                  {/* A failed submit used to be silent — the button simply did
                      nothing. This states what happened and leaves the form intact
                      so the person can retry without re-entering anything. */}
                  {submitError ? (
                    <div
                      role="alert"
                      className="flex items-start gap-2.5 rounded-[var(--radius-md)] bg-[var(--color-negative-pale)] p-3.5"
                    >
                      <span className="mt-0.5 flex-none">
                        <Icon name="circle-alert" size={18} color="var(--color-negative-deep)" />
                      </span>
                      <span className="text-[length:var(--text-body-sm)] leading-[1.5] text-[var(--color-negative-deep)]">
                        {submitError}
                      </span>
                    </div>
                  ) : null}
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
                      ? "הדרן קארד יישלח לכתובת שהזנתם תוך חמישה ימי עסקים, ללא עלות משלוח. עם קבלתו נכנסים לעמוד ההפעלה, ומאותו רגע ההנחה יורדת בקופה."
                      : "מהרגע הזה מציגים את הכרטיס בקופה וההנחה יורדת מהחשבון. את החיסכון שנצבר אפשר לראות בכל עת באזור האישי."}
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
                    <div className="flex justify-between">
                      <span className="text-[15px] text-[var(--color-mute)]">גישה להטבות</span>
                      <span className="font-bold text-[var(--color-positive)]">
                        כל השותפים, כולל הבלעדיים
                      </span>
                    </div>
                  </div>

                  <div className="flex w-full flex-col gap-3 min-[480px]:w-auto min-[480px]:flex-row min-[480px]:flex-wrap">
                    <Button as="a" href="/benefits" className="justify-center">
                      איפה מתחילים לחסוך
                    </Button>
                    <Button as="a" href="/member" variant="tertiary" className="justify-center">
                      לאזור האישי
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
                    disabled={step === 0 || submitting}
                  >
                    חזרה
                  </Button>
                  <Button
                    size="lg"
                    onClick={next}
                    disabled={submitting}
                    aria-busy={submitting || undefined}
                    icon={submitting ? "loader" : undefined}
                    className={submitting ? "[&>svg]:animate-spin" : undefined}
                  >
                    {submitting
                      ? isOrder
                        ? "שולחים את ההזמנה…"
                        : "מפעילים את הכרטיס…"
                      : stepKey === "confirm"
                        ? isOrder
                          ? "אישור והזמנה"
                          : "אישור והפעלה"
                        : "המשך"}
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

          {/* The desktop copy of the card guide. On a phone it sits inline with the
              fields instead — see the card step. */}
          {stepKey === "card" ? (
            <Card tone="plain" padding="clamp(18px,5vw,24px)" className="hidden w-full min-[1060px]:block">
              <div className="flex flex-col gap-3.5">
                <b className="text-[clamp(16px,2.4vw,18px)]">איפה המספרים על הכרטיס</b>
                <CardNumberGuide />
              </div>
            </Card>
          ) : null}

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
