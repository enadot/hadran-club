"use client";

import * as React from "react";
import { Badge } from "@/components/brand/Badge";
import { Button } from "@/components/brand/Button";
import { Card } from "@/components/brand/Card";
import { Icon } from "@/components/brand/Icon";
import { Input } from "@/components/brand/Input";
import { Select } from "@/components/brand/Select";
import { Textarea } from "@/components/brand/Textarea";
import { CONTACT } from "@/lib/data/contact";
import { formatPhone, pretendRequest } from "@/lib/forms";

const EMPTY = {
  name: "",
  phone: "",
  email: "",
  city: "",
  subject: CONTACT.subjects[0].value,
  message: "",
};

type Field = keyof typeof EMPTY;
type Errors = Partial<Record<Field, string>>;

/**
 * The home page enquiry form.
 *
 * It validates the way the merchant form does — two characters for a name, nine
 * digits for a phone, something that looks like an address for the email — so a
 * visitor who fills both forms is told the same thing the same way. The message
 * field only exists when the subject is "נושא אחר", and it is only required
 * then; the other two subjects say everything the club needs to route the call.
 */
export function ContactForm() {
  const [done, setDone] = React.useState(false);
  const [f, setF] = React.useState(EMPTY);
  const [errors, setErrors] = React.useState<Errors>({});
  const [sending, setSending] = React.useState(false);
  const [sendError, setSendError] = React.useState<string | null>(null);
  const doneRef = React.useRef<HTMLDivElement>(null);

  const isOther = f.subject === CONTACT.otherValue;

  const set =
    <K extends Field>(k: K) =>
    (value: (typeof EMPTY)[K]) => {
      setF((s) => ({ ...s, [k]: value }));
      setErrors((e) => ({ ...e, [k]: undefined }));
    };

  const submit = async () => {
    if (sending) return;
    const e: Errors = {};
    if (f.name.trim().length < 2) e.name = "שדה חובה";
    if (f.phone.replace(/\D/g, "").length < 9) e.phone = "מספר טלפון";
    if (!/.+@.+\..+/.test(f.email)) e.email = "כתובת דואר אלקטרוני תקינה";
    if (f.city.trim().length < 2) e.city = "שדה חובה";
    if (isOther && f.message.trim().length < 5) e.message = "כמה מילים על הפנייה";

    if (Object.keys(e).length) {
      setErrors(e);
      return;
    }
    setErrors({});
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

  return (
    <Card tone="plain" padding="clamp(18px,5vw,32px)">
      {done ? (
        <div
          ref={doneRef}
          tabIndex={-1}
          aria-live="polite"
          className="flex flex-col items-start gap-[18px] outline-none"
        >
          <Badge tone="positive" icon="check">
            הפנייה נשלחה
          </Badge>
          <b className="font-[family-name:var(--font-display)] text-[clamp(23px,4.5vw,32px)] leading-[1.15]">
            תודה, נחזור אליכם מהר
          </b>
          <p className="m-0 text-[clamp(15px,2.2vw,17px)] leading-[1.6] text-[var(--color-body)]">
            נציג המועדון חוזר אליכם בתוך יום עסקים אחד. עד אז אפשר לעבור על רשימת בתי העסק
            ולראות איפה הכרטיס עובד.
          </p>
          <div className="flex flex-wrap gap-3">
            <Button
              variant="tertiary"
              onClick={() => {
                setDone(false);
                setF(EMPTY);
              }}
            >
              שליחת פנייה נוספת
            </Button>
            <Button as="a" href="/benefits" variant="ghost">
              לרשימת בתי העסק
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
          <div className="grid grid-cols-[repeat(auto-fit,minmax(min(200px,100%),1fr))] gap-4">
            <Input
              label="שם"
              autoComplete="name"
              value={f.name}
              onChange={(e) => set("name")(e.target.value)}
              error={errors.name}
            />
            <Input
              label="טלפון"
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

          <div className="grid grid-cols-[repeat(auto-fit,minmax(min(200px,100%),1fr))] gap-4">
            <Input
              label="דואר אלקטרוני"
              type="email"
              autoComplete="email"
              value={f.email}
              onChange={(e) => set("email")(e.target.value)}
              error={errors.email}
            />
            <Input
              label="עיר מגורים"
              autoComplete="address-level2"
              value={f.city}
              onChange={(e) => set("city")(e.target.value)}
              error={errors.city}
            />
          </div>

          <Select
            label="נושא הפנייה"
            options={CONTACT.subjects}
            value={f.subject}
            onValueChange={(value) => {
              set("subject")(value);
              // The message field is only validated while it is on screen, so a
              // message typed and then abandoned never blocks the send.
              if (value !== CONTACT.otherValue) {
                setErrors((e) => ({ ...e, message: undefined }));
              }
            }}
          />

          {isOther ? (
            <Textarea
              label={CONTACT.messageLabel}
              rows={4}
              value={f.message}
              onChange={(e) => set("message")(e.target.value)}
              error={errors.message}
            />
          ) : null}

          {sendError ? (
            <div
              role="alert"
              className="flex items-start gap-2.5 rounded-[var(--radius-md)] bg-[var(--color-negative-pale)] p-3.5"
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
            {sending ? "שולחים…" : CONTACT.cta}
          </Button>

          <span className="text-[length:var(--text-caption)] text-[var(--color-mute)]">
            {CONTACT.note}
          </span>
        </form>
      )}
    </Card>
  );
}
