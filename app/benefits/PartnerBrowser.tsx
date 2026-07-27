"use client";

import * as React from "react";
import { Badge } from "@/components/brand/Badge";
import { Card } from "@/components/brand/Card";
import { EmptyState } from "@/components/brand/EmptyState";
import { Icon } from "@/components/brand/Icon";
import { Input } from "@/components/brand/Input";
import { Select } from "@/components/brand/Select";
import { FilterChip } from "@/components/site/FilterChip";
import {
  CATEGORY_ICON,
  CITY_OPTIONS,
  PARTNERS,
  PARTNER_CATEGORIES,
} from "@/lib/data/partners";

/**
 * The partner directory: free-text search, a city select and category chips, all
 * ANDed together exactly as Benefits.dc.html filters them. The free-text term matches
 * category or city.
 *
 * The filter bar is sticky beneath the nav. The nav is 86px on desktop and 65px on
 * mobile, so the offset is set per breakpoint rather than at the prototype's flat 86px,
 * which would leave a gap on small screens.
 */
export function PartnerBrowser() {
  const [query, setQuery] = React.useState("");
  const [city, setCity] = React.useState("all");
  const [category, setCategory] = React.useState("הכל");

  const shown = React.useMemo(() => {
    const q = query.trim();
    return PARTNERS.filter(
      (p) =>
        (category === "הכל" || p.category === category) &&
        (city === "all" || p.city === city) &&
        (!q || p.category.includes(q) || p.city.includes(q)),
    );
  }, [query, city, category]);

  return (
    <>
      <div className="sticky top-[65px] z-20 border-b border-[var(--color-border)] bg-[var(--color-canvas)] p-6 min-[1060px]:top-[86px]">
        <div className="mx-auto flex max-w-[var(--container-max)] flex-col gap-4">
          <div className="grid grid-cols-[repeat(auto-fit,minmax(min(240px,100%),1fr))] items-end gap-4">
            <Input
              icon="search"
              placeholder="חיפוש לפי קטגוריה או עיר"
              aria-label="חיפוש לפי קטגוריה או עיר"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            <Select
              options={CITY_OPTIONS}
              value={city}
              aria-label="סינון לפי עיר"
              onChange={(e) => setCity(e.target.value)}
            />
            <div
              className="flex items-center justify-end gap-2.5 text-[length:var(--text-body-sm)] text-[var(--color-mute)]"
              aria-live="polite"
            >
              <span className="tnum font-bold text-[var(--color-ink)]">{shown.length}</span>
              <span>בתי עסק מוצגים</span>
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            {PARTNER_CATEGORIES.map((c) => (
              <FilterChip key={c} selected={category === c} onClick={() => setCategory(c)}>
                {c}
              </FilterChip>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-[var(--color-canvas)] px-[clamp(16px,4vw,24px)] pt-[clamp(24px,4.4vw,40px)] pb-16">
        <div className="mx-auto flex max-w-[var(--container-max)] flex-col gap-6">
          {shown.length > 0 ? (
            <div className="grid grid-cols-[repeat(auto-fit,minmax(min(230px,100%),1fr))] gap-4">
              {shown.map((p, i) => (
                <Card
                  key={`${p.category}-${p.city}-${i}`}
                  tone="hairline"
                  padding="18px"
                  interactive
                >
                  <div className="flex flex-col gap-3.5">
                    {/* Where the partner's logo goes. None were supplied with the
                        handoff, so this is the design system's sand-panel fallback. */}
                    <div className="rounded-[12px] bg-[var(--color-canvas-warm)] p-2.5">
                      <div className="grid h-[72px] place-items-center rounded-lg bg-[var(--color-canvas-soft)]">
                        <Icon
                          name={CATEGORY_ICON[p.category] ?? "store"}
                          size={26}
                          color="var(--color-primary-deep)"
                        />
                        <span className="sr-only">לוגו בית העסק</span>
                      </div>
                    </div>

                    <div className="flex flex-col gap-1">
                      <b className="text-[clamp(15px,2.2vw,17px)]">{p.category}</b>
                      <span className="text-[length:var(--text-body-sm)] text-[var(--color-mute)]">
                        {p.city}
                      </span>
                    </div>

                    <div className="flex items-center justify-between border-t border-[var(--color-border)] pt-3">
                      <span className="text-[13px] text-[var(--color-mute)]">{p.branches}</span>
                      <Badge tone="gold">5% הנחה</Badge>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          ) : (
            <EmptyState
              icon="store"
              title="לא נמצאו בתי עסק"
              description="נסו לנקות את הסינון או לחפש קטגוריה אחרת. הרשימה מתעדכנת מדי חודש עם בתי עסק חדשים."
            />
          )}

          <span className="text-[length:var(--text-caption)] text-[var(--color-mute)]">
            הרשימה להמחשה. ההנחה בכפוף לתקנון המועדון ולתנאי בית העסק. ט.ל.ח.
          </span>
        </div>
      </div>
    </>
  );
}
