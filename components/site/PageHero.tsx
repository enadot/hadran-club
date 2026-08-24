import * as React from "react";
import { Container, Eyebrow } from "@/components/site/Band";
import { cn } from "@/lib/utils";

/**
 * The header every page below the home page opens on.
 *
 * There were six of these, hand-written one page at a time: /balance, /activate,
 * /benefits, /faq, /search and the three legal documents each declared their own
 * eyebrow span, their own clamp for the h1 and their own flat sand background. No
 * two agreed — the eyebrow was 13px bold in four of them and missing in two, the
 * title clamp came in three different sizes for headings of the same rank, and the
 * gutter and top padding drifted by page.
 *
 * One component instead, so a sub-page header is a decision made once. It carries
 * the quiet version of the home page's gradient (--gradient-header), which is what
 * ties a sub-page back to the hero without borrowing the animation or the artwork
 * that only the home page earns.
 *
 * Tracking is set from the size band it renders at: --tracking-display-lg, since
 * these titles top out around 52px. See the ladder in styles/tokens/typography.css.
 */
export type PageHeroProps = {
  eyebrow?: React.ReactNode;
  title: React.ReactNode;
  lead?: React.ReactNode;
  /** Buttons or chips under the lead. */
  actions?: React.ReactNode;
  /** A meta line under the lead — the legal pages put "עודכן לאחרונה" here. */
  meta?: React.ReactNode;
  /** Sits beside the copy from 900px up; stacks under it below that. */
  aside?: React.ReactNode;
  /** Uses the 760px reading column instead of the 1200px container. */
  narrow?: boolean;
  /** Drops the bottom padding, for a header a sticky filter bar sits directly under. */
  flush?: boolean;
  className?: string;
};

export function PageHero({
  eyebrow,
  title,
  lead,
  actions,
  meta,
  aside,
  narrow,
  flush,
  className,
}: PageHeroProps) {
  return (
    <section
      className={cn(
        "border-b border-[var(--color-border)] bg-[image:var(--gradient-header)]",
        "px-[clamp(16px,4vw,24px)] pt-[clamp(32px,6vw,64px)]",
        flush ? "pb-[clamp(24px,4vw,40px)]" : "pb-[clamp(36px,7vw,72px)]",
        className,
      )}
    >
      <Container
        narrow={narrow}
        className={cn(
          aside &&
            "grid items-end gap-[clamp(28px,5vw,48px)] min-[900px]:grid-cols-[minmax(0,1fr)_auto]",
        )}
      >
        <div className="flex flex-col items-start gap-4">
          {eyebrow ? <Eyebrow>{eyebrow}</Eyebrow> : null}

          <h1 className="m-0 max-w-[20ch] text-[clamp(30px,7vw,52px)] leading-[1.06] tracking-[var(--tracking-display-lg)]">
            {title}
          </h1>

          {lead ? (
            <p className="m-0 max-w-[58ch] text-[clamp(16px,2.4vw,19px)] leading-[1.6] text-[var(--color-body)]">
              {lead}
            </p>
          ) : null}

          {meta ? (
            <span className="text-[length:var(--text-caption)] text-[var(--color-mute)]">
              {meta}
            </span>
          ) : null}

          {actions ? (
            <div className="mt-1 flex w-full flex-col gap-3 min-[480px]:w-auto min-[480px]:flex-row min-[480px]:flex-wrap">
              {actions}
            </div>
          ) : null}
        </div>

        {aside ? <div className="min-w-0">{aside}</div> : null}
      </Container>
    </section>
  );
}
