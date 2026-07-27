"use client";

import * as React from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { Container, Eyebrow, SectionLead, SectionTitle } from "./Band";
import { Card } from "@/components/brand/Card";
import { Button } from "@/components/brand/Button";
import { SavingsMeter } from "@/components/brand/SavingsMeter";
import { shekel } from "@/lib/utils";
import { DURATION, prefersReducedMotion } from "@/lib/motion";

/**
 * The savings calculator from Home.dc.html.
 *
 * Monthly spend runs 1,000–15,000 in steps of 100 and starts at 4,200 — the
 * prototype's initial state. Monthly saving is a flat 5%; the meter reads against a
 * 750 target. The slider stays a native range with `accent-color: var(--gold-700)`,
 * which is how the design draws it.
 *
 * Both output figures are tweened rather than snapped, so dragging the slider reads
 * as a dial settling rather than digits flickering.
 */
const MIN = 1000;
const MAX = 15000;
const STEP = 100;
const RATE = 0.05;
const METER_MAX = 750;

export function SavingsCalculator() {
  const [spend, setSpend] = React.useState(4200);

  const monthly = Math.round(spend * RATE);
  const yearly = monthly * 12;

  const monthlyRef = React.useRef<HTMLSpanElement>(null);
  const yearlyRef = React.useRef<HTMLSpanElement>(null);
  const scope = React.useRef<HTMLDivElement>(null);
  // Tween from the previously displayed figures, not from zero.
  const shown = React.useRef({ monthly, yearly });

  useGSAP(
    () => {
      const write = (m: number, y: number) => {
        if (monthlyRef.current) monthlyRef.current.textContent = shekel(m);
        if (yearlyRef.current) yearlyRef.current.textContent = shekel(y);
      };

      if (prefersReducedMotion()) {
        shown.current = { monthly, yearly };
        write(monthly, yearly);
        return;
      }

      const state = { ...shown.current };
      const tween = gsap.to(state, {
        monthly,
        yearly,
        duration: DURATION.slow,
        ease: "power2.out",
        onUpdate: () => write(state.monthly, state.yearly),
        onComplete: () => {
          shown.current = { monthly, yearly };
        },
      });
      return () => tween.kill();
    },
    { dependencies: [monthly, yearly], scope },
  );

  return (
    <Container
      ref={scope}
      className="grid grid-cols-[repeat(auto-fit,minmax(min(380px,100%),1fr))] items-start gap-12"
    >
      <div className="flex flex-col gap-5">
        <Eyebrow>מחשבון חיסכון</Eyebrow>
        <SectionTitle>כמה תחסכו בשנה?</SectionTitle>
        <SectionLead>
          גררו לפי ההוצאה החודשית של הבית על מזון, ביגוד וצרכי בית אצל בתי העסק השותפים.
        </SectionLead>

        <div className="mt-2 flex flex-col gap-2.5">
          <div className="flex items-baseline justify-between">
            <label
              htmlFor="spend"
              className="text-[15px] font-semibold text-[var(--color-body)]"
            >
              הוצאה חודשית
            </label>
            <span className="tnum font-[family-name:var(--font-display)] text-[clamp(22px,4.2vw,30px)] font-extrabold">
              {shekel(spend)}
            </span>
          </div>

          <input
            id="spend"
            type="range"
            min={MIN}
            max={MAX}
            step={STEP}
            value={spend}
            onChange={(e) => setSpend(Number(e.target.value))}
            aria-valuetext={`${shekel(spend)} בחודש`}
            className="w-full"
          />

          {/* Max on the start (right) edge, min on the end — as in the prototype. */}
          <div className="tnum flex justify-between text-[length:var(--text-caption)] text-[var(--color-mute)]">
            <span>{shekel(MAX)}</span>
            <span>{shekel(MIN)}</span>
          </div>
        </div>
      </div>

      <Card tone="plain" padding="clamp(18px,5vw,32px)">
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-1.5">
            <span className="text-[length:var(--text-body-sm)] font-semibold text-[var(--color-mute)]">
              חיסכון חודשי
            </span>
            <span
              ref={monthlyRef}
              className="tnum font-[family-name:var(--font-display)] text-[clamp(26px,5.5vw,40px)] leading-none font-extrabold text-[var(--color-positive)]"
            >
              {shekel(monthly)}
            </span>
          </div>

          <div className="h-px bg-[var(--color-border)]" />

          <div className="flex flex-col gap-1.5">
            <span className="text-[length:var(--text-body-sm)] font-semibold text-[var(--color-mute)]">
              חיסכון בשנה
            </span>
            <span
              ref={yearlyRef}
              className="tnum font-[family-name:var(--font-display)] text-[clamp(36px,8.5vw,64px)] leading-none font-extrabold text-[var(--color-ink)]"
            >
              {shekel(yearly)}
            </span>
          </div>

          <SavingsMeter
            value={monthly}
            max={METER_MAX}
            label="מהיעד החודשי במועדון"
            caption="החישוב לפי 5% הנחה על כלל הקניות בבתי העסק השותפים. הנתון להמחשה בלבד."
          />

          <Button as="a" href="/activate" fullWidth>
            רוצים להתחיל לחסוך
          </Button>
        </div>
      </Card>
    </Container>
  );
}
