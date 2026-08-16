"use client";

import * as React from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { Button } from "@/components/brand/Button";
import { EmptyState } from "@/components/brand/EmptyState";
import { Input } from "@/components/brand/Input";
import { Select } from "@/components/brand/Select";
import { FilterChip } from "@/components/site/FilterChip";
import { PartnerCard } from "@/components/site/PartnerCard";
import { PartnerDetailDialog } from "@/components/site/PartnerDetailDialog";
import {
  BENEFIT_DISCLAIMER,
  BENEFIT_TIERS,
  BENEFIT_TIER_ORDER,
  EXACT_BENEFIT_CTA,
  type BenefitTier,
} from "@/lib/data/benefits";
import {
  CITY_OPTIONS,
  PARTNERS,
  PARTNER_CATEGORIES,
  SORT_OPTIONS,
  type Partner,
} from "@/lib/data/partners";

const TIER_RANK: Record<BenefitTier, number> = { exclusive: 0, deep: 1, basic: 2 };

/**
 * The partner directory — "מנוע החיסכון האישי" in the brief.
 *
 * Three things changed from the handoff, all of them structural:
 *
 * 1. Rows, not tiles. Every tile carried the same icon plate and the same badge, so a
 *    grid of them was sixteen near-identical squares — nothing to scan for. The
 *    information here is textual (name, category, city, what the benefit is), and a
 *    row fits roughly twice as many of them on a phone.
 * 2. The filters have a state. There is a count of what is active, one control to
 *    clear it, and a sort — none of which existed, so a filtered list could not be
 *    reasoned about or undone except by reloading.
 * 3. The state lives in the URL. A filtered directory is the thing a member sends to
 *    a neighbour; before this it was unshareable, and the search dialog had nowhere
 *    to deep-link to.
 */
type Filters = {
  q: string;
  city: string;
  cat: string;
  tier: BenefitTier | "all";
  sort: string;
};

const DEFAULTS: Filters = {
  q: "",
  city: "all",
  cat: "כל הקטגוריות",
  tier: "all",
  sort: "featured",
};

function readFilters(params: URLSearchParams): Filters {
  return {
    q: params.get("q") ?? DEFAULTS.q,
    city: params.get("city") ?? DEFAULTS.city,
    cat: params.get("cat") ?? DEFAULTS.cat,
    tier: (params.get("tier") as BenefitTier | null) ?? DEFAULTS.tier,
    sort: params.get("sort") ?? DEFAULTS.sort,
  };
}

/** Only what was actually chosen ends up in the URL, so a shared link is short
 *  and a cleared filter leaves no trace of itself. */
function toQuery(f: Filters) {
  const p = new URLSearchParams();
  for (const k of Object.keys(DEFAULTS) as (keyof Filters)[]) {
    if (f[k] !== DEFAULTS[k] && f[k]) p.set(k, String(f[k]));
  }
  return p.toString();
}

export function PartnerBrowser() {
  const pathname = usePathname();
  const params = useSearchParams();

  // The filters are React state mirrored into the URL, not state derived from it.
  //
  // Deriving them meant every keystroke in the search box went through
  // router.replace and cost an RSC round trip — and, worse, replacing with a
  // bare pathname from a page that was *loaded* with a query string is a no-op
  // in the App Router. Anyone opening a shared ?tier=exclusive link and pressing
  // "ניקוי הסינון" watched nothing happen. history.replaceState has neither
  // problem, and deep links still work because the first read seeds the state.
  const [filters, setFilters] = React.useState<Filters>(() => readFilters(params));

  const { q: query, city, cat: category, tier, sort } = filters;

  const [selected, setSelected] = React.useState<Partner | null>(null);
  const [detailOpen, setDetailOpen] = React.useState(false);
  const lastTrigger = React.useRef<HTMLButtonElement | null>(null);

  const apply = React.useCallback(
    (patch: Partial<Filters>) => {
      setFilters((prev) => {
        const next = { ...prev, ...patch };
        const qs = toQuery(next);
        window.history.replaceState(null, "", qs ? `${pathname}?${qs}` : pathname);
        return next;
      });
    },
    [pathname],
  );

  const reset = React.useCallback(() => {
    setFilters(DEFAULTS);
    window.history.replaceState(null, "", pathname);
  }, [pathname]);

  // Back/forward still move through whatever the URL says.
  React.useEffect(() => {
    const onPop = () =>
      setFilters(readFilters(new URLSearchParams(window.location.search)));
    window.addEventListener("popstate", onPop);
    return () => window.removeEventListener("popstate", onPop);
  }, []);

  const activeCount =
    (query ? 1 : 0) +
    (city !== "all" ? 1 : 0) +
    (category !== DEFAULTS.cat ? 1 : 0) +
    (tier !== "all" ? 1 : 0);

  const shown = React.useMemo(() => {
    const q = query.trim();
    const list = PARTNERS.filter(
      (p) =>
        (category === DEFAULTS.cat || p.category === category) &&
        (city === "all" || p.city === city) &&
        (tier === "all" || p.tier === tier) &&
        (!q ||
          p.name.includes(q) ||
          (p.category?.includes(q) ?? false) ||
          (p.trade?.includes(q) ?? false) ||
          (p.city?.includes(q) ?? false)),
    );

    const sorted = [...list];
    if (sort === "name") sorted.sort((a, b) => a.name.localeCompare(b.name, "he"));
    else if (sort === "city")
      sorted.sort((a, b) => (a.city ?? "").localeCompare(b.city ?? "", "he"));
    // "featured" is the club's own order: exclusive shops first, then depth, then name.
    else
      sorted.sort(
        (a, b) =>
          // Partners without a tier sort last rather than first: an unranked
          // shop is not the club's pick, it is a shop we have no depth for yet.
          (a.tier ? TIER_RANK[a.tier] : 9) - (b.tier ? TIER_RANK[b.tier] : 9) ||
          a.name.localeCompare(b.name, "he"),
      );
    return sorted;
  }, [query, city, category, tier, sort]);

  // Tier data has not landed for the directory yet; the axis hides itself until
  // any partner carries one.
  const anyTiered = React.useMemo(() => PARTNERS.some((p) => p.tier), []);

  return (
    <>
      <div className="sticky top-[65px] z-20 border-b border-[var(--color-border)] bg-[var(--color-canvas)] px-[clamp(16px,4vw,24px)] py-[clamp(12px,2.5vw,20px)] min-[1060px]:top-[86px]">
        <div className="mx-auto flex max-w-[var(--container-max)] flex-col gap-3">
          <div className="grid grid-cols-1 items-end gap-3 min-[560px]:grid-cols-2 min-[1060px]:grid-cols-[1.6fr_1fr_1fr_1fr]">
            <Input
              icon="search"
              placeholder="שם בית עסק, קטגוריה או עיר"
              aria-label="חיפוש בית עסק"
              value={query}
              onChange={(e) => apply({ q: e.target.value })}
            />
            <Select
              options={CITY_OPTIONS}
              value={city}
              aria-label="סינון לפי עיר"
              onValueChange={(v) => apply({ city: v })}
            />
            <Select
              options={PARTNER_CATEGORIES}
              value={category}
              aria-label="סינון לפי קטגוריה"
              onValueChange={(v) => apply({ cat: v })}
            />
            <Select
              options={SORT_OPTIONS}
              value={sort}
              aria-label="מיון הרשימה"
              onValueChange={(v) => apply({ sort: v })}
            />
          </div>

          {/* One rail, one axis. Tier is the club's own vocabulary and the filter
              a visitor actually browses by, so it stays visible; category and
              city are ordinary pickers and sit in the selects above. */}
          {anyTiered ? (
            <div
              className="hc-rail hc-rail-bleed flex snap-x items-center gap-2 py-0.5 min-[1060px]:flex-wrap min-[1060px]:overflow-visible"
              role="group"
              aria-label="סינון לפי סוג ההטבה"
            >
              <FilterChip
                selected={tier === "all"}
                onClick={() => apply({ tier: "all" })}
                className="flex-none snap-start"
              >
                כל ההטבות
              </FilterChip>
              {BENEFIT_TIER_ORDER.map((t) => (
                <FilterChip
                  key={t}
                  selected={tier === t}
                  onClick={() => apply({ tier: t })}
                  className="flex-none snap-start"
                >
                  {BENEFIT_TIERS[t].label}
                </FilterChip>
              ))}
            </div>
          ) : null}

          {/* Result count and reset. Announced, because filtering changes the list
              below without moving focus. */}
          <div className="flex flex-wrap items-center justify-between gap-3">
            <span
              className="text-[length:var(--text-body-sm)] text-[var(--color-mute)]"
              aria-live="polite"
            >
              <b className="tnum text-[var(--color-ink)]">{shown.length}</b>
              {shown.length === 1 ? " בית עסק" : " בתי עסק"}
              {activeCount > 0 ? (
                <span className="text-[var(--color-mute)]">
                  {" · "}
                  {activeCount === 1 ? "סינון אחד פעיל" : `${activeCount} סינונים פעילים`}
                </span>
              ) : null}
            </span>

            {activeCount > 0 ? (
              <Button
                variant="ghost"
                size="sm"
                icon="x"
                onClick={reset}
              >
                ניקוי הסינון
              </Button>
            ) : null}
          </div>
        </div>
      </div>

      <div className="bg-[var(--color-canvas)] px-[clamp(16px,4vw,24px)] pt-[clamp(16px,3vw,32px)] pb-16">
        <div className="mx-auto flex max-w-[var(--container-max)] flex-col gap-5">
          {/* The logo is the card. Two columns on a phone, up to five on a wide
              screen — a directory of marks a family recognises, not a list of
              names with a stamp beside each. */}
          {shown.length > 0 ? (
            <ul className="m-0 grid list-none grid-cols-2 gap-3 p-0 min-[560px]:grid-cols-3 min-[900px]:grid-cols-4 min-[1200px]:grid-cols-5 min-[560px]:gap-4">
              {shown.map((p) => (
                <li key={p.name} className="min-w-0">
                  <button
                    type="button"
                    onClick={(e) => {
                      lastTrigger.current = e.currentTarget;
                      setSelected(p);
                      setDetailOpen(true);
                    }}
                    aria-label={`${p.name}${
                      p.tier ? ` — ${BENEFIT_TIERS[p.tier].label}` : ""
                    }. פתיחת פרטי ההטבה`}
                    className="group h-full w-full cursor-pointer text-start"
                  >
                    <PartnerCard partner={p} />
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <EmptyState
              icon="store"
              title="לא נמצאו בתי עסק"
              description="אפשר לנקות את הסינון ולהתחיל מחדש, או לספר לנו איפה אתם קונים כדי שנפנה לבית העסק."
              action={
                <div className="flex flex-wrap justify-center gap-2.5">
                  <Button onClick={reset}>
                    ניקוי הסינון
                  </Button>
                  <Button as="a" href="/merchants" variant="tertiary">
                    הצטרפות בתי עסק
                  </Button>
                </div>
              }
            />
          )}

          {/* The list is a shop window until the member can see their own number on
              it. This is the brief's "הזינו מספר כרטיס לצפייה בהטבה המדויקת שלכם". */}
          <div className="mt-2 flex flex-col gap-4 rounded-[var(--radius-xl)] bg-[var(--color-canvas-soft)] p-[clamp(18px,4vw,28px)] min-[720px]:flex-row min-[720px]:items-center min-[720px]:justify-between">
            <div className="flex flex-col gap-1.5">
              <b className="text-[clamp(17px,2.6vw,20px)]">{EXACT_BENEFIT_CTA}</b>
              <span className="text-[length:var(--text-body-sm)] leading-[1.6] text-[var(--color-body)]">
                {anyTiered
                  ? "הרשימה כאן מציגה את סוג ההטבה. עם מספר הכרטיס רואים את ההטבה המדויקת בכל שותף, כולל החנויות הבלעדיות למועדון."
                  : "עם מספר הכרטיס רואים את ההטבה המדויקת בכל אחד מבתי העסק ברשימה."}
              </span>
            </div>
            <div className="flex flex-col gap-2.5 min-[420px]:flex-row min-[720px]:flex-none">
              <Button as="a" href="/balance" className="justify-center">
                כניסה עם מספר כרטיס
              </Button>
              <Button as="a" href="/activate" variant="tertiary" className="justify-center">
                להזמנת כרטיס
              </Button>
            </div>
          </div>

          <span className="text-[length:var(--text-caption)] text-[var(--color-mute)]">
            {BENEFIT_DISCLAIMER}
          </span>
        </div>
      </div>

      <PartnerDetailDialog
        partner={selected}
        open={detailOpen}
        onOpenChange={setDetailOpen}
        restoreFocusTo={lastTrigger}
      />
    </>
  );
}
