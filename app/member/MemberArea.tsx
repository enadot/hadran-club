"use client";

import * as React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/brand/Badge";
import { BenefitRow } from "@/components/brand/BenefitRow";
import { Button } from "@/components/brand/Button";
import { Card } from "@/components/brand/Card";
import { Checkbox } from "@/components/brand/Checkbox";
import { Figure } from "@/components/brand/Figure";
import { Input } from "@/components/brand/Input";
import { MemberCard } from "@/components/brand/MemberCard";
import { SavingsMeter } from "@/components/brand/SavingsMeter";
import { Select } from "@/components/brand/Select";
import {
  MEMBER_ACTIVITY,
  MEMBER_CITY_OPTIONS,
  MONTH_OPTIONS,
  monthSavings,
} from "@/lib/data/member";

const EMPTY_DETAILS = {
  first: "יעקב",
  last: "כהן",
  phone: "050-0000000",
  email: "family@example.com",
  city: "בני ברק",
  street: "רבי עקיבא 12",
  news: true,
  sms: false,
};

const TABS = [
  { value: "overview", label: "סקירה" },
  { value: "history", label: "היסטוריית שימושים" },
  { value: "card", label: "הכרטיס שלי" },
  { value: "details", label: "פרטים אישיים" },
];

/**
 * The logged-in member area: four tabs over static sample data.
 *
 * The quick-action buttons in the overview jump between tabs, which is why the tab
 * state lives here rather than inside Radix's uncontrolled default.
 */
export function MemberArea() {
  const [tab, setTab] = React.useState("overview");
  const [month, setMonth] = React.useState("tamuz");
  const [details, setDetails] = React.useState(EMPTY_DETAILS);
  const [saved, setSaved] = React.useState(false);

  const history = MEMBER_ACTIVITY[month] ?? [];
  const recent = MEMBER_ACTIVITY.tamuz.slice(0, 4);

  const set =
    <K extends keyof typeof EMPTY_DETAILS>(k: K) =>
    (value: (typeof EMPTY_DETAILS)[K]) => {
      setDetails((s) => ({ ...s, [k]: value }));
      setSaved(false);
    };

  return (
    <div className="bg-[var(--color-canvas-soft)]">
      {/* ── Header + tab strip ───────────────────────────────────────────── */}
      <Tabs value={tab} onValueChange={setTab} className="gap-0">
        <div className="border-b border-[var(--color-border)] bg-[var(--color-canvas)] px-[clamp(16px,4vw,24px)] pt-[clamp(24px,4vw,36px)]">
          <div className="mx-auto flex max-w-[var(--container-max)] flex-col gap-6">
            <div className="flex flex-wrap items-end justify-between gap-6">
              <div className="flex flex-col gap-2">
                <span className="text-[13px] font-bold tracking-[var(--tracking-wide)] text-[var(--color-primary-deep)]">
                  אזור אישי
                </span>
                <h1 className="m-0 text-[clamp(26px,5.5vw,40px)] leading-[1.1]">שלום, משפחת כהן</h1>
                <span className="tnum text-[length:var(--text-body-sm)] text-[var(--color-mute)]">
                  מספר חבר 8032-4471 · חברי מועדון מאז תשפ״ד
                </span>
              </div>
              <div className="flex flex-wrap items-center gap-3">
                <Badge tone="positive" icon="check">
                  כרטיס פעיל
                </Badge>
                <Button as="a" href="/" variant="tertiary" size="sm" icon="log-out">
                  יציאה
                </Button>
              </div>
            </div>

            <TabsList>
              {TABS.map((t) => (
                <TabsTrigger key={t.value} value={t.value}>
                  {t.label}
                </TabsTrigger>
              ))}
            </TabsList>
          </div>
        </div>

        <div className="px-[clamp(16px,4vw,24px)] pt-[clamp(24px,4.4vw,40px)] pb-16">
          <div className="mx-auto max-w-[var(--container-max)]">
            {/* ── Overview ─────────────────────────────────────────────── */}
            <TabsContent value="overview">
              <div className="grid grid-cols-[repeat(auto-fit,minmax(min(340px,100%),1fr))] items-start gap-6">
                <div className="flex flex-col gap-6">
                  <Card tone="plain" padding="clamp(18px,5vw,28px)">
                    <div className="flex flex-col gap-[22px]">
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex flex-col gap-1.5">
                          <span className="text-[15px] font-semibold text-[var(--color-mute)]">
                            יתרה זמינה בכרטיס
                          </span>
                          <span className="tnum font-[family-name:var(--font-display)] text-[clamp(32px,7.5vw,56px)] leading-none font-extrabold">
                            <Figure value={1240} prefix="₪" />
                          </span>
                        </div>
                        <span className="text-end text-[13px] text-[var(--color-mute)]">
                          עודכן היום
                          <br />
                          כ״ג בתמוז, 9:40
                        </span>
                      </div>

                      <SavingsMeter
                        value={286}
                        max={400}
                        label="נחסך החודש"
                        caption="הסכומים להמחשה. היתרה מתעדכנת בתום כל יום עסקים."
                      />

                      <div className="grid grid-cols-[repeat(auto-fit,minmax(min(120px,100%),1fr))] gap-4 border-t border-[var(--color-border)] pt-[18px]">
                        <div className="flex flex-col gap-1">
                          <span className="text-[length:var(--text-body-sm)] text-[var(--color-mute)]">
                            נחסך החודש
                          </span>
                          <span className="tnum font-[family-name:var(--font-display)] text-[clamp(20px,3.6vw,26px)] font-extrabold text-[var(--color-positive)]">
                            ₪286
                          </span>
                        </div>
                        <div className="flex flex-col gap-1">
                          <span className="text-[length:var(--text-body-sm)] text-[var(--color-mute)]">
                            מתחילת השנה
                          </span>
                          <span className="tnum font-[family-name:var(--font-display)] text-[clamp(20px,3.6vw,26px)] font-extrabold">
                            ₪2,914
                          </span>
                        </div>
                        <div className="flex flex-col gap-1">
                          <span className="text-[length:var(--text-body-sm)] text-[var(--color-mute)]">
                            קניות החודש
                          </span>
                          <span className="tnum font-[family-name:var(--font-display)] text-[clamp(20px,3.6vw,26px)] font-extrabold">
                            14
                          </span>
                        </div>
                      </div>
                    </div>
                  </Card>

                  <Card tone="plain" padding="clamp(18px,5vw,28px)">
                    <div className="flex flex-col gap-4">
                      <div className="flex items-center justify-between">
                        <b className="text-[clamp(17px,2.5vw,20px)]">הקניות האחרונות</b>
                        <Button
                          variant="ghost"
                          size="sm"
                          iconAfter="arrow-left"
                          onClick={() => setTab("history")}
                        >
                          לכל ההיסטוריה
                        </Button>
                      </div>
                      <div className="flex flex-col">
                        {recent.map((r, i) => (
                          <BenefitRow
                            key={`${r.title}-${r.meta}`}
                            title={r.title}
                            meta={r.meta}
                            amount={r.amount}
                            saved={r.saved}
                            icon="shopping-bag"
                            divider={i < recent.length - 1}
                          />
                        ))}
                      </div>
                    </div>
                  </Card>
                </div>

                <div className="flex flex-col items-center gap-6">
                  <MemberCard
                    holder="משפחת כהן"
                    tier="חבר מועדון · הדרן קארד"
                    width="min(400px, calc(100vw - 48px))"
                  />

                  <Card tone="plain" padding="24px" className="w-full">
                    <div className="flex flex-col gap-3.5">
                      <b className="text-[clamp(16px,2.3vw,18px)]">פעולות מהירות</b>
                      <Button as="a" href="/benefits" variant="secondary" fullWidth icon="store">
                        רשימת בתי העסק
                      </Button>
                      <Button
                        variant="tertiary"
                        fullWidth
                        icon="credit-card"
                        onClick={() => setTab("card")}
                      >
                        הכרטיס שלי
                      </Button>
                      <Button
                        variant="tertiary"
                        fullWidth
                        icon="user"
                        onClick={() => setTab("details")}
                      >
                        עדכון פרטים אישיים
                      </Button>
                    </div>
                  </Card>

                  <Card tone="gold" padding="24px" className="w-full">
                    <div className="flex flex-col items-start gap-2.5">
                      <b className="text-[clamp(16px,2.3vw,18px)]">7 בתי עסק חדשים החודש</b>
                      <span className="text-[15px] leading-[1.6] text-[var(--color-ink-deep)]">
                        נוספו רשת מזון בירושלים, שתי חנויות ביגוד ובית עסק לכלי בית בבית שמש.
                      </span>
                      <Button as="a" href="/benefits" variant="tertiary" size="sm">
                        מה נוסף
                      </Button>
                    </div>
                  </Card>
                </div>
              </div>
            </TabsContent>

            {/* ── History ──────────────────────────────────────────────── */}
            <TabsContent value="history">
              <div className="flex max-w-[860px] flex-col gap-6">
                <Card tone="plain" padding="clamp(18px,5vw,28px)">
                  <div className="flex flex-col gap-5">
                    <div className="flex flex-wrap items-end justify-between gap-4">
                      <div className="flex flex-col gap-1.5">
                        <b className="text-[clamp(18px,2.8vw,22px)]">היסטוריית שימושים</b>
                        <span className="text-[15px] text-[var(--color-body)]">
                          כל קנייה שבה מומשה ההנחה, לפי חודש
                        </span>
                      </div>
                      <div className="min-w-[200px]">
                        <Select
                          options={MONTH_OPTIONS}
                          value={month}
                          aria-label="בחירת חודש"
                          onChange={(e) => setMonth(e.target.value)}
                        />
                      </div>
                    </div>

                    <div className="flex flex-col">
                      {history.map((r, i) => (
                        <BenefitRow
                          key={`${r.title}-${r.meta}`}
                          title={r.title}
                          meta={r.meta}
                          amount={r.amount}
                          saved={r.saved}
                          icon="shopping-bag"
                          divider={i < history.length - 1}
                        />
                      ))}
                    </div>

                    <div className="flex items-baseline justify-between border-t-2 border-[var(--color-ink)] pt-[18px]">
                      <span className="text-[clamp(16px,2.3vw,18px)] font-bold">
                        סך החיסכון בחודש שנבחר
                      </span>
                      <span className="tnum font-[family-name:var(--font-display)] text-[34px] font-extrabold text-[var(--color-positive)]">
                        {monthSavings(history)}
                      </span>
                    </div>
                  </div>
                </Card>
                <span className="text-[length:var(--text-caption)] text-[var(--color-mute)]">
                  הנתונים להמחשה. רישום הקניות מתעדכן בתום כל יום עסקים. ט.ל.ח.
                </span>
              </div>
            </TabsContent>

            {/* ── My card ──────────────────────────────────────────────── */}
            <TabsContent value="card">
              <div className="grid grid-cols-[repeat(auto-fit,minmax(min(340px,100%),1fr))] items-start gap-8">
                <div className="flex flex-col items-center gap-5">
                  <MemberCard
                    holder="משפחת כהן"
                    tier="חבר מועדון · הדרן קארד"
                    width="min(400px, calc(100vw - 48px))"
                  />
                  <span className="text-center text-[length:var(--text-body-sm)] text-[var(--color-mute)]">
                    מציגים את הכרטיס בקופה לפני התשלום. אין צורך באפליקציה או בקוד.
                  </span>
                </div>

                <div className="flex flex-col gap-5">
                  <Card tone="plain" padding="clamp(18px,5vw,28px)">
                    <div className="flex flex-col gap-4">
                      <b className="text-[clamp(17px,2.5vw,20px)]">פרטי הכרטיס</b>
                      <div className="flex justify-between border-b border-[var(--color-border)] pb-3">
                        <span className="text-[var(--color-mute)]">מספר כרטיס</span>
                        <span className="tnum ltr font-semibold">4271 •••• •••• 8032</span>
                      </div>
                      <div className="flex justify-between border-b border-[var(--color-border)] pb-3">
                        <span className="text-[var(--color-mute)]">מסלול</span>
                        <span className="font-semibold">שנתי · ₪249</span>
                      </div>
                      <div className="flex justify-between border-b border-[var(--color-border)] pb-3">
                        <span className="text-[var(--color-mute)]">בתוקף עד</span>
                        <span className="tnum font-semibold">08/2027</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-[var(--color-mute)]">הנחה בכל בית עסק שותף</span>
                        <span className="font-bold text-[var(--color-positive)]">5%</span>
                      </div>
                    </div>
                  </Card>

                  <Card tone="plain" padding="clamp(18px,5vw,28px)">
                    <div className="flex flex-col gap-3.5">
                      <b className="text-[clamp(17px,2.5vw,20px)]">ניהול הכרטיס</b>
                      <Button variant="secondary" fullWidth icon="user-plus">
                        הזמנת כרטיס לבן/בת הזוג
                      </Button>
                      <Button variant="tertiary" fullWidth icon="refresh-cw">
                        הנפקת כרטיס חלופי
                      </Button>
                      <Button variant="danger" fullWidth icon="shield-alert">
                        חסימת הכרטיס
                      </Button>
                      <span className="text-[length:var(--text-caption)] text-[var(--color-mute)]">
                        חסימה מיידית. כרטיס חלופי נשלח תוך חמישה ימי עסקים והחיסכון נשמר.
                      </span>
                    </div>
                  </Card>
                </div>
              </div>
            </TabsContent>

            {/* ── Personal details ─────────────────────────────────────── */}
            <TabsContent value="details">
              <div className="flex max-w-[640px] flex-col gap-5">
                <Card tone="plain" padding="clamp(18px,5vw,32px)">
                  <form
                    className="flex flex-col gap-5"
                    onSubmit={(e) => {
                      e.preventDefault();
                      setSaved(true);
                    }}
                  >
                    <div className="flex flex-col gap-1.5">
                      <b className="text-[clamp(18px,2.8vw,22px)]">פרטים אישיים</b>
                      <span className="text-[15px] text-[var(--color-body)]">
                        עדכון הפרטים משפיע על משלוח הכרטיס ועל עדכוני המועדון.
                      </span>
                    </div>

                    <div className="grid grid-cols-[repeat(auto-fit,minmax(min(180px,100%),1fr))] gap-4">
                      <Input
                        label="שם פרטי"
                        value={details.first}
                        onChange={(e) => set("first")(e.target.value)}
                      />
                      <Input
                        label="שם משפחה"
                        value={details.last}
                        onChange={(e) => set("last")(e.target.value)}
                      />
                    </div>

                    <div className="grid grid-cols-[repeat(auto-fit,minmax(min(180px,100%),1fr))] gap-4">
                      <Input
                        label="טלפון נייד"
                        inputMode="tel"
                        value={details.phone}
                        onChange={(e) => set("phone")(e.target.value)}
                      />
                      <Input
                        label="דואר אלקטרוני"
                        type="email"
                        value={details.email}
                        onChange={(e) => set("email")(e.target.value)}
                      />
                    </div>

                    <div className="grid grid-cols-[repeat(auto-fit,minmax(min(180px,100%),1fr))] gap-4">
                      <Select
                        label="עיר"
                        options={MEMBER_CITY_OPTIONS}
                        value={details.city}
                        onChange={(e) => set("city")(e.target.value)}
                      />
                      <Input
                        label="רחוב ומספר"
                        value={details.street}
                        onChange={(e) => set("street")(e.target.value)}
                      />
                    </div>

                    <div className="h-px bg-[var(--color-border)]" />

                    <Checkbox
                      label="עדכון חודשי על בתי עסק חדשים במועדון"
                      checked={details.news}
                      onChange={(e) => set("news")(e.target.checked)}
                    />
                    <Checkbox
                      label="הודעת SMS על החיסכון שנצבר בסוף כל חודש"
                      checked={details.sms}
                      onChange={(e) => set("sms")(e.target.checked)}
                    />

                    <div className="flex flex-wrap items-center gap-3">
                      <Button type="submit">שמירת הפרטים</Button>
                      {saved ? (
                        <span aria-live="polite">
                          <Badge tone="positive" icon="check">
                            הפרטים נשמרו
                          </Badge>
                        </span>
                      ) : null}
                    </div>
                  </form>
                </Card>
              </div>
            </TabsContent>
          </div>
        </div>
      </Tabs>
    </div>
  );
}
