"use client";

import * as React from "react";
import { Alert } from "@/components/brand/Alert";
import { Button } from "@/components/brand/Button";
import { Icon } from "@/components/brand/Icon";
import { CARD_ACTIVATION_URL } from "@/lib/data/site";

/**
 * The operator's activation screen, framed.
 *
 * Nothing here can reach inside the frame: it is a different origin, so the height
 * cannot be measured, the submit cannot be observed and the success state cannot be
 * read. Every decision below follows from that.
 *
 * - **Height** is given, not measured. Tall enough for a form of this length on a
 *   phone, capped so it never outgrows a desktop viewport, and the frame scrolls
 *   internally past that. A short frame that scrolls a long form in a 400px slot is
 *   the worst version of this pattern.
 * - **The way out is always visible.** A framed third-party screen can fail in ways
 *   this page will never hear about — the operator can refuse to be embedded, drop
 *   a redirect, or need a cookie a browser will not hand a third-party frame. The
 *   button to open the same address in a tab sits above the frame at all times, not
 *   behind an error state that may never fire.
 * - **The load timeout is a floor, not a detector.** A browser that refuses the
 *   embed still fires `load` on its own error page, so this catches only a frame
 *   that never resolves at all. It is worth having for that case and is not relied
 *   on for anything else.
 */
const LOAD_TIMEOUT_MS = 12_000;

export function ActivateFrame() {
  const [loaded, setLoaded] = React.useState(false);
  const [slow, setSlow] = React.useState(false);

  React.useEffect(() => {
    if (loaded) return;
    const timer = window.setTimeout(() => setSlow(true), LOAD_TIMEOUT_MS);
    return () => window.clearTimeout(timer);
  }, [loaded]);

  return (
    <div className="flex flex-col gap-4">
      {/* The frame's own chrome. It says whose screen this is — the member is about
          to type a card number into it, and a form that appears inside the club's
          layout with no attribution is a form nobody should trust. */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <span className="flex items-center gap-2 text-[length:var(--text-body-sm)] text-[var(--color-mute)]">
          <Icon name="shield-check" size={18} color="var(--color-primary-deep)" />
          ההפעלה מתבצעת במערכת המאובטחת של קהילות קארד
        </span>
        <Button
          as="a"
          href={CARD_ACTIVATION_URL}
          target="_blank"
          rel="noopener noreferrer"
          variant="tertiary"
          size="sm"
          iconAfter="external-link"
        >
          פתיחה בחלון נפרד
        </Button>
      </div>

      {slow && !loaded ? (
        <Alert tone="warning">
          מסך ההפעלה מתעכב בטעינה. אפשר להמתין עוד רגע, או לפתוח אותו בחלון נפרד בכפתור שלמעלה.
        </Alert>
      ) : null}

      {/* A flat panel one rung up the surface ladder, with a hairline — the same
          treatment every other panel on the site gets, so the framed screen sits in
          the page instead of on top of it. `overflow-hidden` is what actually clips
          the frame's own square corners to the panel radius. */}
      <div className="relative overflow-hidden rounded-[var(--radius-xl)] border border-[var(--color-border)] bg-[var(--color-canvas)]">
        {!loaded ? (
          <div
            aria-hidden
            className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-3 bg-[var(--color-canvas)]"
          >
            <Icon name="loader" size={28} color="var(--color-primary-deep)" className="animate-spin" />
            <span className="text-[length:var(--text-body-sm)] text-[var(--color-mute)]">
              טוענים את מסך ההפעלה…
            </span>
          </div>
        ) : null}

        <iframe
          src={CARD_ACTIVATION_URL}
          title="הפעלת הדרן קארד — מערכת קהילות קארד"
          onLoad={() => setLoaded(true)}
          loading="eager"
          referrerPolicy="strict-origin-when-cross-origin"
          className="block h-[clamp(680px,calc(100svh-220px),1080px)] w-full border-0 bg-[var(--color-canvas)]"
        />
      </div>
    </div>
  );
}
