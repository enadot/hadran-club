"use client";

import * as React from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { Button } from "@/components/brand/Button";
import { EmptyState } from "@/components/brand/EmptyState";
import { Icon } from "@/components/brand/Icon";
import { Input } from "@/components/brand/Input";
import { Select } from "@/components/brand/Select";
import { BenefitsGate } from "@/components/site/BenefitsGate";
import { FilterSheet } from "@/components/site/FilterSheet";
import { PartnerCard } from "@/components/site/PartnerCard";
import { PartnerDetailDialog } from "@/components/site/PartnerDetailDialog";
import {
  BENEFIT_DISCLAIMER,
  BENEFIT_TIERS,
  BENEFIT_TIER_ORDER,
  type BenefitTier,
} from "@/lib/data/benefits";
import {
  categoriesOf,
  citiesOf,
  partnerFromLiveStore,
  servesCity,
  type LiveStore,
} from "@/lib/data/live-benefits";
import { PARTNERS, SORT_OPTIONS, type Partner } from "@/lib/data/partners";

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
 *
 * Since the platform opened a per-card benefits endpoint the page has two sources.
 * Without a card it lists the club's static directory — who the partners are, and
 * nothing about what any one member gets. With a card, the gate at the top swaps the
 * whole list for the platform's answer for that card: the same tiles, but each
 * carrying the benefit its merchant actually wrote, and the exclusivity flag and
 * branch addresses that only exist per-card. The card number never enters the URL —
 * the filters are shareable, a card is not.
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
  // ?tier= is checked against the real tiers rather than cast to one. A URL is
  // whatever someone types into it, and the value is now looked up in
  // BENEFIT_TIERS to label the active-filter pill — an unchecked cast turned
  // ?tier=foo from a filter that matched nothing into a render that threw.
  const rawTier = params.get("tier");
  const tier = BENEFIT_TIER_ORDER.includes(rawTier as BenefitTier)
    ? (rawTier as BenefitTier)
    : DEFAULTS.tier;

  return {
    q: params.get("q") ?? DEFAULTS.q,
    city: params.get("city") ?? DEFAULTS.city,
    cat: params.get("cat") ?? DEFAULTS.cat,
    tier,
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

  /** The platform's answer for a card, or null while the page is a shop window. */
  const [live, setLive] = React.useState<LiveStore[] | null>(null);

  const source = React.useMemo<Partner[]>(
    () => (live ? live.map(partnerFromLiveStore) : PARTNERS),
    [live],
  );

  // The two sources do not carry the same towns or the same trades, so the pickers
  // are built from whatever list is on screen. Declaring them once meant a filter
  // could offer a city no visible partner was in — and, after a lookup, hide every
  // partner in a city the static list happened not to name.
  const cityOptions = React.useMemo(
    () => [
      { value: "all", label: "כל הערים" },
      ...citiesOf(source).map((c) => ({ value: c, label: c })),
    ],
    [source],
  );

  const categoryOptions = React.useMemo(
    () => [DEFAULTS.cat, ...categoriesOf(source)],
    [source],
  );

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

  /**
   * Swapping the source invalidates everything downstream of it: a city or category
   * chosen against the old list may not exist in the new one, and the open dialog is
   * showing a record that is about to be replaced by a different object for the same
   * shop. The free-text query survives — it is the one filter that means the same
   * thing to both lists.
   */
  const receive = React.useCallback(
    (stores: LiveStore[] | null) => {
      setLive(stores);
      setDetailOpen(false);
      setSelected(null);
      apply({ city: DEFAULTS.city, cat: DEFAULTS.cat, tier: DEFAULTS.tier });
    },
    [apply],
  );

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
    const list = source.filter(
      (p) =>
        (category === DEFAULTS.cat || p.category === category) &&
        (city === "all" || servesCity(p, city)) &&
        (tier === "all" || p.tier === tier) &&
        (!q ||
          p.name.includes(q) ||
          (p.category?.includes(q) ?? false) ||
          (p.trade?.includes(q) ?? false) ||
          // With a card loaded the benefit is the text a member is most likely to
          // search — "כפל מבצעים", "עדשות" — and it exists nowhere else on the page.
          (p.benefit?.includes(q) ?? false) ||
          (p.cities?.some((c) => c.includes(q)) ?? false) ||
          (p.city?.includes(q) ?? false)),
    );

    const firstCity = (p: Partner) => p.cities?.[0] ?? p.city ?? "";

    const sorted = [...list];
    if (sort === "name") sorted.sort((a, b) => a.name.localeCompare(b.name, "he"));
    else if (sort === "city")
      sorted.sort((a, b) => firstCity(a).localeCompare(firstCity(b), "he"));
    // "מומלצים": exclusive shops first, then the ones the platform itself pins,
    // then depth, then name.
    else
      sorted.sort(
        (a, b) =>
          // Partners without a tier sort last rather than first: an unranked
          // shop is not the club's pick, it is a shop we have no depth for yet.
          (a.tier ? TIER_RANK[a.tier] : 9) - (b.tier ? TIER_RANK[b.tier] : 9) ||
          Number(!!b.featured) - Number(!!a.featured) ||
          a.name.localeCompare(b.name, "he"),
      );
    return sorted;
  }, [source, query, city, category, tier, sort]);

  // Only the tiers the list on screen actually splits on. The static directory
  // carries none, and a card's list carries them only where the platform flags a
  // partner exclusive — an axis with one value is not a filter.
  const tiers = React.useMemo(
    () => BENEFIT_TIER_ORDER.filter((t) => source.some((p) => p.tier === t)),
    [source],
  );

  const [sheetOpen, setSheetOpen] = React.useState(false);

  /**
   * The bar tucks itself behind the nav on a downward scroll and returns on an
   * upward one — the pattern every directory app on a phone uses, and the direct
   * answer to a control surface that was covering the content it controls.
   *
   * Deliberately not an IntersectionObserver: the thing being watched is the
   * reader's intent, which is the sign of the delta, not whether some sentinel is on
   * screen. The 6px gate ignores the jitter of a rubber-band scroll, and nothing
   * tucks in the first screenful, where the bar has not yet had a chance to stick.
   */
  const [tucked, setTucked] = React.useState(false);
  React.useEffect(() => {
    let last = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      const dy = y - last;
      if (Math.abs(dy) < 6) return;
      last = y;
      setTucked(y > 280 && dy > 0);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /** The filters in force, each as its own removable pill. */
  const activeChips = [
    query ? { key: "q", label: `“${query}”`, clear: () => apply({ q: "" }) } : null,
    city !== DEFAULTS.city ? { key: "city", label: city, clear: () => apply({ city: DEFAULTS.city }) } : null,
    category !== DEFAULTS.cat
      ? { key: "cat", label: category, clear: () => apply({ cat: DEFAULTS.cat }) }
      : null,
    tier !== "all"
      ? { key: "tier", label: BENEFIT_TIERS[tier].label, clear: () => apply({ tier: "all" }) }
      : null,
  ].filter(Boolean) as { key: string; label: string; clear: () => void }[];

  return (
    <>
      {/* The page's one gold rung on the surface ladder, and the only ask it makes.
          It sits above the filter bar rather than under the list: with a card in
          hand the list below it is a different list, so the entry point belongs
          before the thing it changes, not after it. */}
      <div className="bg-[var(--color-canvas)] px-[clamp(16px,4vw,24px)] pt-[clamp(16px,3vw,28px)] pb-[clamp(8px,2vw,16px)]">
        <div className="mx-auto max-w-[var(--container-max)]">
          <BenefitsGate onLoaded={receive} loadedCount={live ? shown.length : null} />
        </div>
      </div>

      {/* One row, and it gets out of the way.
       *
       * The four stacked controls this replaces measured 303px of permanently sticky
       * chrome on a phone — with the 65px nav above them, half of a 360x740 screen
       * was filter while the other half was the grid the filter is for. Everything
       * except the search box now lives in FilterSheet behind a single control that
       * carries the active count, and the bar itself slides up behind the nav on a
       * downward scroll and comes back the moment the reader scrolls up. */}
      <div
        data-tucked={tucked ? "" : undefined}
        // Tabbing into a control that is sliding off screen. Capture, so it fires
        // for the search box, the filter button and the pickers alike.
        onFocusCapture={() => setTucked(false)}
        className={[
          "sticky top-[65px] z-20 border-b border-[var(--color-border)] bg-[var(--color-canvas)]",
          "px-[clamp(16px,4vw,24px)] py-[clamp(10px,2vw,16px)] min-[1060px]:top-[86px]",
          "transition-transform duration-[var(--duration-base)] ease-[var(--ease-out)]",
          "data-tucked:-translate-y-full min-[900px]:data-tucked:translate-y-0",
          "motion-reduce:transition-none",
        ].join(" ")}
      >
        <div className="mx-auto flex max-w-[var(--container-max)] items-center gap-2.5 min-[900px]:gap-3">
          <Input
            icon="search"
            placeholder="שם בית עסק, קטגוריה או עיר"
            aria-label="חיפוש בית עסק"
            value={query}
            onChange={(e) => apply({ q: e.target.value })}
            wrapperClassName="min-w-0 flex-1"
            suffix={
              query ? (
                <button
                  type="button"
                  onClick={() => apply({ q: "" })}
                  aria-label="ניקוי החיפוש"
                  className="-me-1 flex cursor-pointer items-center rounded-full p-1 text-[var(--color-mute)] transition-colors duration-[var(--duration-fast)] hover:bg-[var(--color-canvas-soft)] hover:text-[var(--color-ink)]"
                >
                  <Icon name="x" size={16} />
                </button>
              ) : null
            }
          />

          {/* Below 900px this is the whole rest of the bar. */}
          <button
            type="button"
            onClick={() => setSheetOpen(true)}
            aria-label={
              activeCount > 0 ? `סינון ומיון, ${activeCount} פעילים` : "סינון ומיון"
            }
            className={[
              "relative flex size-[52px] flex-none cursor-pointer items-center justify-center",
              "rounded-[var(--radius-lg)] border transition-[background-color,border-color]",
              "duration-[var(--duration-base)] ease-[var(--ease-out)] min-[900px]:hidden",
              activeCount > 0
                ? "border-[var(--color-ink)] bg-[var(--color-ink)] text-[var(--color-primary)]"
                : "border-[var(--color-border)] bg-[var(--color-canvas)] text-[var(--color-ink)]",
            ].join(" ")}
          >
            <Icon name="sliders" size={20} />
            {activeCount > 0 ? (
              <span className="tnum absolute -top-1.5 -end-1.5 grid size-5 place-items-center rounded-full bg-[var(--color-primary)] text-[11px] font-bold text-[var(--color-on-primary)]">
                {activeCount}
              </span>
            ) : null}
          </button>

          {/* From 900px the pickers stay in the open — a directory on a desktop
              should not hide three controls behind a button when the row has space
              for them. They are pills, not fields: at the field's weight and height
              the four controls read as four things of equal importance, when only
              the search box is what a visitor came to use. Faire, Skillshare, Whop,
              Selfridges, Base44 and Kit all draw the same line. */}
          <div className="hidden flex-none items-center gap-2 min-[900px]:flex">
            <Select
              size="sm"
              active={city !== DEFAULTS.city}
              options={cityOptions}
              value={city}
              aria-label="סינון לפי עיר"
              onValueChange={(v) => apply({ city: v })}
            />
            <Select
              size="sm"
              active={category !== DEFAULTS.cat}
              options={categoryOptions}
              value={category}
              aria-label="סינון לפי קטגוריה"
              onValueChange={(v) => apply({ cat: v })}
            />
            {tiers.length ? (
              <Select
                size="sm"
                active={tier !== "all"}
                options={[
                  { value: "all", label: "כל ההטבות" },
                  ...tiers.map((t) => ({ value: t, label: BENEFIT_TIERS[t].label })),
                ]}
                value={tier}
                aria-label="סינון לפי סוג ההטבה"
                onValueChange={(v) => apply({ tier: v as BenefitTier | "all" })}
              />
            ) : null}
            <Select
              size="sm"
              options={SORT_OPTIONS}
              value={sort}
              aria-label="מיון הרשימה"
              onValueChange={(v) => apply({ sort: v })}
            />
          </div>
        </div>
      </div>

      <div className="bg-[var(--color-canvas)] px-[clamp(16px,4vw,24px)] pt-[clamp(16px,3vw,32px)] pb-16">
        <div className="mx-auto flex max-w-[var(--container-max)] flex-col gap-5">
          {/* The count and what is in force, in the scroll flow rather than pinned.
              This is the half of the old bar that was pure feedback: it has to be
              read once after a change, not kept on screen for the length of a
              directory. Each filter is its own pill so a reader can drop one
              without opening the sheet to find it. */}
          <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
            <span
              className="text-[length:var(--text-body-sm)] text-[var(--color-mute)]"
              aria-live="polite"
            >
              <b className="tnum text-[var(--color-ink)]">{shown.length}</b>
              {shown.length === 1 ? " בית עסק" : " בתי עסק"}
            </span>

            {activeChips.map((c) => (
              <button
                key={c.key}
                type="button"
                onClick={c.clear}
                aria-label={`הסרת הסינון ${c.label}`}
                className="inline-flex cursor-pointer items-center gap-1.5 rounded-full border border-[var(--color-border)] bg-[var(--color-canvas)] py-1.5 pe-3 ps-2.5 text-[length:var(--text-body-sm)] font-semibold text-[var(--color-body)] transition-[background-color,border-color] duration-[var(--duration-fast)] ease-[var(--ease-out)] hover:border-[var(--color-ink)] hover:bg-[var(--color-canvas-soft)]"
              >
                <Icon name="x" size={14} color="var(--color-mute)" />
                {c.label}
              </button>
            ))}

            {activeCount > 1 ? (
              <Button variant="ghost" size="sm" onClick={reset}>
                ניקוי הכל
              </Button>
            ) : null}
          </div>

          {/* The logo is the card. Two columns on a phone, up to five on a wide
              screen — a directory of marks a family recognises, not a list of
              names with a stamp beside each. */}
          {shown.length > 0 ? (
            <ul className="m-0 grid list-none grid-cols-2 gap-3 p-0 min-[560px]:grid-cols-3 min-[900px]:grid-cols-4 min-[1200px]:grid-cols-5 min-[560px]:gap-4">
              {shown.map((p) => (
                <li key={`${p.name}-${p.trade ?? ""}`} className="min-w-0">
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
              title={
                live && activeCount === 0 ? "לא נמצאו הטבות לכרטיס הזה" : "לא נמצאו בתי עסק"
              }
              description={
                live && activeCount === 0
                  ? "יכול להיות שהכרטיס עדיין לא שויך למועדון. אפשר לנסות כרטיס אחר, או לפנות אלינו דרך אפליקציית שירות ותמיכה."
                  : "אפשר לנקות את הסינון ולהתחיל מחדש, או לספר לנו איפה אתם קונים כדי שנפנה לבית העסק."
              }
              action={
                <div className="flex flex-wrap justify-center gap-2.5">
                  {activeCount > 0 ? <Button onClick={reset}>ניקוי הסינון</Button> : null}
                  <Button as="a" href="/merchants" variant="tertiary">
                    הצטרפות בתי עסק
                  </Button>
                </div>
              }
            />
          )}

          {/* The ask itself moved to the gate at the top of the page, where it can
              actually change the list. What is left here is the one case the gate
              cannot serve: a card that has arrived but was never activated, which
              the platform will not answer for. It is a hairline note, not a second
              gold panel — the page gets one rung on the ladder and the gate has it. */}
          {live ? null : (
          <div className="mt-2 flex flex-col gap-4 rounded-[var(--radius-xl)] border border-[var(--color-border)] bg-[var(--color-canvas)] p-[var(--card-padding)] min-[720px]:flex-row min-[720px]:items-center min-[720px]:justify-between">
            <div className="flex flex-col gap-1.5">
              <b className="text-[clamp(16px,2.4vw,19px)]">הכרטיס עדיין לא הופעל?</b>
              <span className="text-[length:var(--text-body-sm)] leading-[1.6] text-[var(--color-body)]">
                מפעילים אותו פעם אחת, ומשם ההטבות בכל הרשימה נפתחות.
              </span>
            </div>
            <div className="flex flex-col gap-2.5 min-[420px]:flex-row min-[720px]:flex-none">
              <Button as="a" href="/activate" variant="tertiary" className="justify-center">
                הפעלת כרטיס
              </Button>
            </div>
          </div>
          )}

          <span className="text-[length:var(--text-caption)] text-[var(--color-mute)]">
            {BENEFIT_DISCLAIMER}
          </span>
        </div>
      </div>

      <FilterSheet
        open={sheetOpen}
        onOpenChange={setSheetOpen}
        city={city}
        category={category}
        tier={tier}
        sort={sort}
        cityOptions={cityOptions}
        categoryOptions={categoryOptions}
        tiers={tiers}
        resultCount={shown.length}
        activeCount={activeCount}
        onChange={apply}
        onReset={reset}
      />

      <PartnerDetailDialog
        partner={selected}
        open={detailOpen}
        onOpenChange={setDetailOpen}
        restoreFocusTo={lastTrigger}
        live={live !== null}
      />
    </>
  );
}
