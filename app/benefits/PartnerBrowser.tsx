"use client";

import * as React from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Badge } from "@/components/brand/Badge";
import { Button } from "@/components/brand/Button";
import { EmptyState } from "@/components/brand/EmptyState";
import { Icon } from "@/components/brand/Icon";
import { Input } from "@/components/brand/Input";
import { Select } from "@/components/brand/Select";
import { FilterChip } from "@/components/site/FilterChip";
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
  branchLabel,
  partnerInitials,
  type Partner,
} from "@/lib/data/partners";
import { cn } from "@/lib/utils";

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
export function PartnerBrowser() {
  const router = useRouter();
  const pathname = usePathname();
  const params = useSearchParams();

  const query = params.get("q") ?? "";
  const city = params.get("city") ?? "all";
  const category = params.get("cat") ?? "הכל";
  const tier = (params.get("tier") ?? "all") as BenefitTier | "all";
  const sort = params.get("sort") ?? "featured";

  const [selected, setSelected] = React.useState<Partner | null>(null);

  /** Writes filter state to the URL. `replace` so filtering does not fill the
   *  back stack — Back should leave the directory, not undo one chip. */
  const setParam = React.useCallback(
    (patch: Record<string, string>) => {
      const next = new URLSearchParams(params.toString());
      for (const [k, v] of Object.entries(patch)) {
        // Defaults are absent from the URL rather than spelled out, so a shared
        // link carries only what was actually chosen.
        if (!v || v === "all" || v === "הכל" || v === "featured") next.delete(k);
        else next.set(k, v);
      }
      const qs = next.toString();
      router.replace(qs ? `${pathname}?${qs}` : pathname, { scroll: false });
    },
    [params, pathname, router],
  );

  const activeCount =
    (query ? 1 : 0) +
    (city !== "all" ? 1 : 0) +
    (category !== "הכל" ? 1 : 0) +
    (tier !== "all" ? 1 : 0);

  const shown = React.useMemo(() => {
    const q = query.trim();
    const list = PARTNERS.filter(
      (p) =>
        (category === "הכל" || p.category === category) &&
        (city === "all" || p.city === city) &&
        (tier === "all" || p.tier === tier) &&
        (!q || p.name.includes(q) || p.category.includes(q) || p.city.includes(q)),
    );

    const sorted = [...list];
    if (sort === "name") sorted.sort((a, b) => a.name.localeCompare(b.name, "he"));
    else if (sort === "branches") sorted.sort((a, b) => b.branches - a.branches);
    else if (sort === "city") sorted.sort((a, b) => a.city.localeCompare(b.city, "he"));
    // "featured" is the club's own order: exclusive shops first, then depth, then name.
    else
      sorted.sort(
        (a, b) =>
          TIER_RANK[a.tier] - TIER_RANK[b.tier] || a.name.localeCompare(b.name, "he"),
      );
    return sorted;
  }, [query, city, category, tier, sort]);

  const exclusiveCount = React.useMemo(
    () => PARTNERS.filter((p) => p.tier === "exclusive").length,
    [],
  );

  return (
    <>
      <div className="sticky top-[65px] z-20 border-b border-[var(--color-border)] bg-[var(--color-canvas)] px-[clamp(16px,4vw,24px)] py-[clamp(12px,2.5vw,20px)] min-[1060px]:top-[86px]">
        <div className="mx-auto flex max-w-[var(--container-max)] flex-col gap-3">
          <div className="grid grid-cols-1 items-end gap-3 min-[560px]:grid-cols-[2fr_1fr] min-[1060px]:grid-cols-[2fr_1fr_1fr]">
            <Input
              icon="search"
              placeholder="שם בית עסק, קטגוריה או עיר"
              aria-label="חיפוש בית עסק"
              value={query}
              onChange={(e) => setParam({ q: e.target.value })}
            />
            <Select
              options={CITY_OPTIONS}
              value={city}
              aria-label="סינון לפי עיר"
              onChange={(e) => setParam({ city: e.target.value })}
            />
            <Select
              options={SORT_OPTIONS}
              value={sort}
              aria-label="מיון הרשימה"
              onChange={(e) => setParam({ sort: e.target.value })}
              wrapperClassName="hidden min-[1060px]:flex"
            />
          </div>

          {/* Tier chips lead, because "בלעדי" is the club's actual argument and it
              was not filterable — or even visible — before. */}
          <div className="hc-rail hc-rail-bleed flex snap-x items-center gap-2 py-0.5 min-[1060px]:flex-wrap min-[1060px]:overflow-visible">
            <FilterChip
              selected={tier === "all"}
              onClick={() => setParam({ tier: "all" })}
              className="flex-none snap-start"
            >
              כל ההטבות
            </FilterChip>
            {BENEFIT_TIER_ORDER.map((t) => (
              <FilterChip
                key={t}
                selected={tier === t}
                onClick={() => setParam({ tier: t })}
                className="flex-none snap-start"
              >
                {BENEFIT_TIERS[t].label}
              </FilterChip>
            ))}

            <span
              aria-hidden="true"
              className="mx-1 h-6 w-px flex-none self-center bg-[var(--color-border)]"
            />

            {PARTNER_CATEGORIES.map((c) => (
              <FilterChip
                key={c}
                selected={category === c}
                onClick={() => setParam({ cat: c })}
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
                onClick={() => router.replace(pathname, { scroll: false })}
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
              {shown.map((p) => {
                const meta = BENEFIT_TIERS[p.tier];
                return (
                  <li key={p.name} className="min-w-0">
                    <button
                      type="button"
                      onClick={() => setSelected(p)}
                      aria-label={`${p.name} — ${meta.label}. פתיחת פרטי ההטבה`}
                      className={cn(
                        "flex w-full items-center gap-3.5 rounded-[var(--radius-xl)] border p-3.5 text-start min-[560px]:gap-4 min-[560px]:p-4",
                        "cursor-pointer bg-[var(--color-canvas)]",
                        "transition-[border-color,box-shadow,transform] duration-[var(--duration-base)] ease-[var(--ease-out)]",
                        "hover:-translate-y-0.5 hover:shadow-[var(--shadow-raised)]",
                        // Exclusive shops carry an ink hairline so they read as a
                        // different class of thing while scrolling past, not only
                        // once the badge is read.
                        p.tier === "exclusive"
                          ? "border-[var(--color-ink)]"
                          : "border-[var(--color-border)] hover:border-[var(--color-primary-neutral)]",
                      )}
                    >
                      <span className="grid size-12 flex-none place-items-center overflow-hidden rounded-[var(--radius-lg)] bg-[var(--color-canvas-soft)] font-[family-name:var(--font-display)] text-[17px] font-extrabold text-[var(--color-primary-deep)] min-[560px]:size-14 min-[560px]:text-xl">
                        {partnerInitials(p.name)}
                      </span>

                      <span className="flex min-w-0 flex-1 flex-col gap-1">
                        <span className="flex flex-wrap items-center gap-x-2 gap-y-1">
                          <b className="text-[clamp(15px,2.3vw,17px)] leading-[1.3] text-[var(--color-ink)]">
                            {p.name}
                          </b>
                          <Badge tone={meta.tone} icon={meta.icon} className="text-[13px]">
                            {meta.label}
                          </Badge>
                        </span>
                        <span className="truncate text-[length:var(--text-body-sm)] text-[var(--color-mute)]">
                          {p.category} · {p.city} · {branchLabel(p.branches)}
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
                );
              })}
            </ul>
          ) : (
            <EmptyState
              icon="store"
              title="לא נמצאו בתי עסק"
              description="אפשר לנקות את הסינון ולהתחיל מחדש, או לספר לנו איפה אתם קונים כדי שנפנה לבית העסק."
              action={
                <div className="flex flex-wrap justify-center gap-2.5">
                  <Button onClick={() => router.replace(pathname, { scroll: false })}>
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
                הרשימה כאן מציגה את סוג ההטבה. עם מספר הכרטיס רואים את ההטבה המדויקת בכל שותף,
                כולל {exclusiveCount === 1 ? "החנות הבלעדית" : "החנויות הבלעדיות"} למועדון.
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

      <PartnerDetailDialog partner={selected} onOpenChange={(o) => !o && setSelected(null)} />
    </>
  );
}
