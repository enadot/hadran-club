"use client";

import * as React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/brand/Button";
import { Card } from "@/components/brand/Card";
import { FilterChip } from "@/components/site/FilterChip";
import { Reveal } from "@/components/site/Reveal";
import { FAQ, FAQ_GROUPS } from "@/lib/data/faq";
import { SUPPORT_PHONE } from "@/lib/data/site";

/**
 * Group chips over a single-open accordion. The prototype opens the first item of the
 * current group and resets to it whenever the group changes.
 */
export function FaqBrowser() {
  // Group and open item are one piece of state, so switching group re-opens the first
  // question in the same update — the prototype's `setState({ group: g, open: 0 })`.
  const [{ group, open }, setView] = React.useState({ group: "הכל", open: "q-0" });

  const items = React.useMemo(
    () => FAQ.filter((x) => group === "הכל" || x.group === group),
    [group],
  );

  const setGroup = (g: string) => setView({ group: g, open: "q-0" });
  const setOpen = (v: string) => setView((s) => ({ ...s, open: v }));

  return (
    <section className="bg-[var(--color-canvas)] px-[clamp(16px,4vw,24px)] pt-[clamp(24px,3.6vw,32px)] pb-16">
      <div className="mx-auto flex max-w-[var(--container-narrow)] flex-col gap-6">
        {/* One scrolling line on a phone rather than three wrapped rows above the
            answers; wraps as before from 1060px, where there is room for it. */}
        <div className="hc-rail hc-rail-bleed flex snap-x gap-2 py-0.5 min-[1060px]:flex-wrap min-[1060px]:overflow-visible">
          {FAQ_GROUPS.map((g) => (
            <FilterChip
              key={g}
              selected={group === g}
              onClick={() => setGroup(g)}
              className="flex-none snap-start"
            >
              {g}
            </FilterChip>
          ))}
        </div>

        <Accordion
          type="single"
          collapsible
          value={open}
          onValueChange={setOpen}
          className="flex flex-col gap-3"
        >
          {items.map((item, i) => (
            <AccordionItem key={item.q} value={`q-${i}`}>
              <AccordionTrigger>{item.q}</AccordionTrigger>
              <AccordionContent>{item.a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>

        <Reveal>
          <Card tone="sand" padding="clamp(18px,5vw,32px)">
            <div className="flex flex-wrap items-center justify-between gap-6">
              <div className="flex flex-col gap-2.5">
                <b className="font-[family-name:var(--font-display)] text-[clamp(20px,3.6vw,26px)]">
                  לא מצאתם תשובה?
                </b>
                <span className="leading-[1.6] text-[var(--color-body)]">
                  מוקד המועדון זמין בימים א׳–ה׳ בין 9:00 ל-17:00, בטלפון{" "}
                  <span className="tnum ltr inline-block">{SUPPORT_PHONE}</span>.
                </span>
              </div>
              <Button
                as="a"
                href="/activate"
                className="w-full justify-center min-[480px]:w-auto"
              >
                להזמנת כרטיס
              </Button>
            </div>
          </Card>
        </Reveal>
      </div>
    </section>
  );
}
