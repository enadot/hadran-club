import { SpotlightCard } from "@/components/reactbits/spotlight-card";
import { Button } from "@/components/brand/Button";
import { Icon } from "@/components/brand/Icon";
import { MEMBERSHIP } from "@/lib/data/membership";
import { cn } from "@/lib/utils";

/**
 * What the membership includes, in one card used twice: on the home page with a
 * call to action, and inside /activate as the summary above the order form.
 *
 * This replaced a two-track chooser. The club has no fee and no levels, so there
 * is nothing to select — a radiogroup asking a visitor to pick between identical
 * free options is a step that only costs them time.
 */
export type MembershipCardProps = {
  /** Hides the call to action where the surrounding flow already has one. */
  withCta?: boolean;
  className?: string;
};

export function MembershipCard({ withCta = false, className }: MembershipCardProps) {
  return (
    // Pointer-only warmth on the surface a visitor is deciding on. Nothing moves
    // until a cursor is on the card, and nothing at all on a phone or under
    // prefers-reduced-motion.
    <SpotlightCard
      spotlightColor="var(--gold-200)"
      className={cn("rounded-[var(--radius-xl)]", className)}
    >
      <div className="flex h-full flex-col gap-4 rounded-[var(--radius-xl)] border border-[var(--color-border)] bg-[var(--color-canvas)] p-[clamp(20px,4vw,28px)]">
        <b className="text-[clamp(17px,2.6vw,21px)]">{MEMBERSHIP.name}</b>

        <span className="font-[family-name:var(--font-display)] text-[clamp(32px,7vw,48px)] leading-none font-extrabold">
          {MEMBERSHIP.price}
        </span>

        <span className="text-[length:var(--text-body-sm)] leading-[1.6] text-[var(--color-body)]">
          {MEMBERSHIP.summary}
        </span>

        <ul className="m-0 grid flex-1 list-none grid-cols-1 gap-2.5 border-t border-[var(--color-border)] p-0 pt-4 min-[720px]:grid-cols-2">
          {MEMBERSHIP.includes.map((item) => (
            <li key={item.text} className="flex items-start gap-2.5">
              <span className="mt-0.5 flex-none">
                <Icon name={item.icon} size={17} color="var(--color-primary-deep)" />
              </span>
              <span className="text-[length:var(--text-body-sm)] leading-[1.5] text-[var(--color-body)]">
                {item.text}
              </span>
            </li>
          ))}
        </ul>

        {withCta ? (
          <Button as="a" href="/activate" fullWidth className="justify-center">
            להזמנת כרטיס
          </Button>
        ) : null}
      </div>
    </SpotlightCard>
  );
}
