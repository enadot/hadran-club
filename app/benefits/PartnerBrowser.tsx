"use client";

import * as React from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { Button } from "@/components/brand/Button";
import { EmptyState } from "@/components/brand/EmptyState";
import { Icon } from "@/components/brand/Icon";
import { Input } from "@/components/brand/Input";
import { PartnerLogo } from "@/components/brand/PartnerLogo";
import { Select } from "@/components/brand/Select";
import { FilterChip } from "@/components/site/FilterChip";
import { PartnerDetailDialog } from "@/components/site/PartnerDetailDialog";
import { BENEFIT_DISCLAIMER, EXACT_BENEFIT_CTA } from "@/lib/data/benefits";
import {
  CITY_OPTIONS,
  PARTNERS,
  PARTNER_CATEGORIES,
  SORT_OPTIONS,
  branchLabel,
  type Partner,
} from "@/lib/data/partners";
import { cn } from "@/lib/utils";

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
  /** "1" when narrowed to the club-only shops. Set by deep links, not by a chip. */
  exclusive: string;
  sort: string;
};

const DEFAULTS: Filters = {
  q: "",
  city: "all",
  cat: "כל הקטגוריות",
  exclusive: "",
  sort: "featured",
};

function readFilters(params: URLSearchParams): Filters {
  return {
    q: params.get("q") ?? DEFAULTS.q,
    city: params.get("city") ?? DEFAULTS.city,
    cat: params.get("cat") ?? DEFAULTS.cat,
    exclusive: params.get("exclusive") ?? DEFAULTS.exclusive,
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
  // in the App Router. Anyone opening a shared ?exclusive=1 link and pressing
  // "ניקוי הסינון" watched nothing happen. history.replaceState has neither
  // problem, and deep links still work because the first read seeds the state.
  const [filters, setFilters] = React.useState<Filters>(() => readFilters(params));

  const { q: query, city, cat: category, exclusive, sort } = filters;

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
    (exclusive === "1" ? 1 : 0);

  const shown = React.useMemo(() => {
    const q = query.trim();
    const list = PARTNERS.filter(
      (p) =>
        (category === DEFAULTS.cat || p.category === category) &&
        (city === "all" || p.city === city) &&
        (exclusive !== "1" || p.exclusive) &&
        (!q || p.name.includes(q) || p.category.includes(q) || p.city.includes(q)),
    );

    const sorted = [...list];
    if (sort === "name") sorted.sort((a, b) => a.name.localeCompare(b.name, "he"));
    else if (sort === "branches") sorted.sort((a, b) => b.branches - a.branches);
    else if (sort === "city") sorted.sort((a, b) => a.city.localeCompare(b.city, "he"));
    // "featured" is the club's own order: the shops that exist nowhere else first,
    // then the widest networks, then by name so the tail is still predictable.
    else
      sorted.sort(
        (a, b) =>
          Number(!!b.exclusive) - Number(!!a.exclusive) ||
          b.branches - a.branches ||
          a.name.localeCompare(b.name, "he"),
      );
    return sorted;
  }, [query, city, category, exclusive, sort]);

  const exclusiveCount = React.useMemo(() => PARTNERS.filter((p) => p.exclusive).length, []);

  return (
    <>
      <div className="sticky top-[65px] z-20 border-b border-[var(--color-border)] bg-[var(--color-canvas)] px-[clamp(16px,4vw,24px)] py-[clamp(12px,2.5vw,20px)] min-[1060px]:top-[86px]">
        <div className="mx-auto flex max-w-[var(--container-max)] flex-col gap-3">
          <div className="grid grid-cols-1 items-end gap-3 min-[560px]:grid-cols-2 min-[1060px]:grid-cols-[2fr_1fr_1fr]">
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
              onChange={(e) => apply({ city: e.target.value })}
            />
            <Select
              options={SORT_OPTIONS}
              value={sort}
              aria-label="מיון הרשימה"
              onChange={(e) => apply({ sort: e.target.value })}
              wrapperClassName="min-[560px]:col-span-2 min-[1060px]:col-span-1"
            />
          </div>

          <div
            className="hc-rail hc-rail-bleed flex snap-x items-center gap-2 py-0.5 min-[1060px]:flex-wrap min-[1060px]:overflow-visible"
            role="group"
            aria-label="סינון לפי קטגוריה"
          >
            {/* The label is desktop-only: on a phone it costs a chip's width of a
                rail that is already scrolling. */}
            <span className="hidden flex-none self-center pe-1 text-[length:var(--text-caption)] font-bold tracking-[var(--tracking-wide)] text-[var(--color-mute)] min-[1060px]:inline">
              קטגוריה
            </span>
            {PARTNER_CATEGORIES.map((c) => (
              <FilterChip
                key={c}
                selected={category === c}
                onClick={() => apply({ cat: c })}
                className="flex-none snap-start"
              >
                {c}
              </FilterChip>
            ))}
          </div>

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
          {shown.length > 0 ? (
            <ul className="m-0 flex list-none flex-col gap-2.5 p-0 min-[900px]:grid min-[900px]:grid-cols-2 min-[900px]:gap-3">
              {shown.map((p) => (
                <li key={p.name} className="min-w-0">
                  <button
                    type="button"
                    onClick={(e) => {
                      lastTrigger.current = e.currentTarget;
                      setSelected(p);
                      setDetailOpen(true);
                    }}
                    aria-label={`${p.name} — ${p.benefit}. פתיחת פרטי ההטבה`}
                    className={cn(
                      "flex w-full items-center gap-3.5 rounded-[var(--radius-xl)] border p-3.5 text-start min-[560px]:gap-4 min-[560px]:p-4",
                      "cursor-pointer bg-[var(--color-canvas)]",
                      "border-[var(--color-border)]",
                      "transition-[border-color,box-shadow,transform] duration-[var(--duration-base)] ease-[var(--ease-out)]",
                      "hover:-translate-y-0.5 hover:border-[var(--color-primary-neutral)] hover:shadow-[var(--shadow-raised)]",
                    )}
                  >
                    <PartnerLogo
                      partner={p}
                      className="size-12 text-[length:var(--text-body-md)] min-[560px]:size-14 min-[560px]:text-[length:var(--text-body-lg)]"
                    />

                    <span className="flex min-w-0 flex-1 flex-col gap-1">
                      <b className="min-w-0 truncate text-[clamp(15px,2.3vw,17px)] leading-[1.3] text-[var(--color-ink)]">
                        {p.name}
                      </b>
                      <span className="truncate text-[length:var(--text-body-sm)] text-[var(--color-mute)]">
                        {p.category} · {p.city}
                        <span className="hidden min-[560px]:inline">
                          {" · "}
                          {branchLabel(p.branches)}
                        </span>
                      </span>
                    </span>

                    <Icon
                      name="chevron-left"
                      size={20}
                      color="var(--color-mute)"
                      className="flex-none"
                    />
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
                הרשימה כאן מציגה מה נותן כל שותף. עם מספר הכרטיס רואים את ההטבה המדויקת בכל
                אחד מהם, כולל {exclusiveCount === 1 ? "החנות שזמינה" : "החנויות שזמינות"} רק
                לחברי המועדון.
              </span>
            </div>
            <div className="flex flex-col gap-2.5 min-[420px]:flex-row min-[720px]:flex-none">
              <Button as="a" href="/balance" className="justify-center">
                כניסה עם מספר כרטיס
              </Button>
              <Button as="a" href="/activate" variant="tertiary" className="justify-center">
                קבלת הדרן קארד
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
