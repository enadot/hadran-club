"use client";

import * as React from "react";
import { Card } from "@/components/brand/Card";
import { EmptyState } from "@/components/brand/EmptyState";
import { Icon } from "@/components/brand/Icon";
import { Input } from "@/components/brand/Input";
import { FilterChip } from "@/components/site/FilterChip";
import { onlyDigits } from "@/lib/forms";
import {
  KOSHER_SALE_HOTLINE,
  KOSHER_SALE_LABEL,
  REGIONS,
  RESELLER_JOIN_PHONES,
  type Store,
  type StoreRegion,
} from "@/lib/data/stores";

/**
 * The reseller directory, region by region — with a region filter over it.
 *
 * Both /stores and /join-hadran render it: the counter that hands over a club
 * card is the counter that signs a new customer up for Hadran, so duplicating
 * the list into two components would only let them drift apart.
 *
 * Thirty shops over four regions is past the point where a reader scrolls
 * looking for their own town. The chip row narrows the page to one region in a
 * tap — the store-locator pattern, minus the map, which needs coordinates
 * nobody has supplied — and the free-text field catches the reader who knows
 * the shop or street but not which region the list files it under. The count
 * line under the controls is what tells them the filter did something.
 *
 * A card per city rather than a row per shop: most cities carry one or two
 * shops, and the city is what the reader is scanning for.
 *
 * Phone numbers run LTR inside an RTL page. `.numeric-field` keeps the digit
 * groups in Latin order while the line stays right-aligned — the same rule the
 * card-number fields use.
 */

const ALL = "all";

/** Matching ignores the separators a reader may or may not type: a search for
 *  "0527" should find "052-769-6101". */
const normalise = (v: string) => v.trim().toLowerCase();

function storeMatches(store: Store, city: string, q: string, qDigits: string) {
  if (qDigits.length >= 3 && store.phones?.some((p) => onlyDigits(p).includes(qDigits))) {
    return true;
  }
  return [store.name, store.address, store.note, city].some((field) => normalise(field ?? "").includes(q));
}

/** Narrows the tree to what matches, dropping cities and regions left empty.
 *  Returns the same shape it was given, so the render below stays one path. */
function filterRegions(regions: StoreRegion[], region: string, query: string): StoreRegion[] {
  const q = normalise(query);
  const qDigits = onlyDigits(query);

  return regions
    .filter((r) => region === ALL || r.region === region)
    .map((r) => ({
      ...r,
      cities: r.cities
        .map((c) => ({
          ...c,
          stores: q ? c.stores.filter((s) => storeMatches(s, c.city, q, qDigits)) : c.stores,
        }))
        .filter((c) => c.stores.length > 0),
    }))
    .filter((r) => r.cities.length > 0);
}

function countStores(regions: StoreRegion[]) {
  return regions.reduce(
    (n, r) => n + r.cities.reduce((m, c) => m + c.stores.length, 0),
    0,
  );
}

function PhoneLink({ value }: { value: string }) {
  // "*3230" dials as typed; everything else strips its separators for the href.
  const href = value.startsWith("*") ? `tel:${value}` : `tel:${onlyDigits(value)}`;

  return (
    <a
      href={href}
      className="numeric-field inline-block font-semibold text-[var(--color-primary-deep)] tabular-nums underline-offset-4 hover:underline"
    >
      {value}
    </a>
  );
}

function StoreRow({ store }: { store: Store }) {
  return (
    <li className="flex flex-col gap-1 border-t border-[var(--color-border)] pt-3 first:border-0 first:pt-0">
      <b className="text-[length:var(--text-body-md)] leading-[1.4] font-bold">{store.name}</b>

      {store.address ? (
        <span className="text-[length:var(--text-body-sm)] leading-[1.5] text-[var(--color-body)]">
          {store.address}
        </span>
      ) : null}

      {/* "בתיאום מראש" is the difference between a visit and a wasted drive, so
          it is a tag rather than another grey line under the address. */}
      {store.note ? (
        <span className="mt-0.5 inline-flex w-fit items-center gap-1.5 rounded-full bg-[var(--color-canvas-soft)] px-2.5 py-1 text-[length:var(--text-caption)] font-semibold text-[var(--color-primary-deep)]">
          <Icon name="clock" size={13} color="var(--color-primary-deep)" />
          {store.note}
        </span>
      ) : null}

      {store.phones?.length ? (
        <span className="flex flex-wrap items-center gap-x-3 gap-y-1">
          {store.phones.map((phone) => (
            <PhoneLink key={phone} value={phone} />
          ))}
        </span>
      ) : null}
    </li>
  );
}

export function StoreDirectory() {
  const [region, setRegion] = React.useState<string>(ALL);
  const [query, setQuery] = React.useState("");

  const shown = React.useMemo(() => filterRegions(REGIONS, region, query), [region, query]);
  const shownCount = countStores(shown);
  const cityCount = shown.reduce((n, r) => n + r.cities.length, 0);

  return (
    <div className="flex flex-col gap-[clamp(24px,4vw,36px)]">
      {/* Controls. One row of chips and one field — the filter sheet /benefits
          needs is for four dimensions; this page has one. */}
      <div className="flex flex-col gap-4">
        <Input
          icon="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="חיפוש לפי עיר, שם החנות או כתובת"
          aria-label="חיפוש חנות משווקת"
          wrapperClassName="max-w-[420px]"
        />

        {/* Wraps; it does not scroll sideways. A full-bleed horizontal scroller
            read as the page itself sliding — a swipe that was meant to go down
            dragged the strip, and in RTL it starts mid-track — for five chips
            whose labels are one or two words. Two rows cost less than that. */}
        <div className="flex flex-wrap gap-2">
          <FilterChip size="sm" selected={region === ALL} onClick={() => setRegion(ALL)}>
            כל האזורים
          </FilterChip>
          {REGIONS.map((r) => (
            <FilterChip
              key={r.region}
              size="sm"
              selected={region === r.region}
              onClick={() => setRegion(r.region)}
            >
              {r.region.replace(/^אזור /, "")}
            </FilterChip>
          ))}
        </div>

        <span
          aria-live="polite"
          className="text-[length:var(--text-body-sm)] text-[var(--color-body)]"
        >
          {shownCount === 0
            ? "לא נמצאו חנויות"
            : `${shownCount} חנויות ב-${cityCount} ${cityCount === 1 ? "עיר" : "ערים"}`}
        </span>
      </div>

      {shown.length === 0 ? (
        <EmptyState
          icon="store"
          title="לא מצאנו חנות שמתאימה לחיפוש"
          description="אפשר לנקות את החיפוש ולעבור בין האזורים, או להתקשר למוקד כשר סייל בטלפון *3230."
        />
      ) : (
        <div className="flex flex-col gap-[clamp(28px,4vw,44px)]">
          {shown.map((r) => (
            <section key={r.region} className="flex flex-col gap-5">
              <h2 className="m-0 flex items-center gap-2.5 text-[clamp(20px,3.4vw,26px)] leading-[1.2] tracking-[var(--tracking-display-sm)]">
                <Icon name="map-pin" size={20} color="var(--color-primary-deep)" />
                {r.region}
              </h2>

              <div className="grid grid-cols-[repeat(auto-fill,minmax(min(288px,100%),1fr))] gap-4">
                {r.cities.map((city) => (
                  <Card key={city.city} className="flex flex-col gap-4">
                    <span className="text-[length:var(--text-body-sm)] font-bold tracking-[0.04em] text-[var(--color-primary-deep)]">
                      {city.city}
                    </span>

                    <ul className="m-0 flex list-none flex-col gap-3 p-0">
                      {city.stores.map((store) => (
                        <StoreRow key={`${city.city}-${store.name}`} store={store} />
                      ))}
                    </ul>
                  </Card>
                ))}
              </div>
            </section>
          ))}
        </div>
      )}

      {/* Neither line belongs to a city, so both sit under the directory rather
          than inside one of the region blocks — and both stay put under a
          filter, since neither is regional. */}
      <div className="grid grid-cols-[repeat(auto-fit,minmax(min(288px,100%),1fr))] gap-4">
        <Card tone="sand" className="flex flex-col gap-2">
          <span className="flex items-center gap-2 text-[length:var(--text-body-sm)] font-bold text-[var(--color-primary-deep)]">
            <Icon name="phone" size={16} color="var(--color-primary-deep)" />
            {KOSHER_SALE_LABEL}
          </span>
          <PhoneLink value={KOSHER_SALE_HOTLINE} />
        </Card>

        <Card tone="sand" className="flex flex-col gap-2">
          <span className="flex items-center gap-2 text-[length:var(--text-body-sm)] font-bold text-[var(--color-primary-deep)]">
            <Icon name="store" size={16} color="var(--color-primary-deep)" />
            להצטרפות משווקים חדשים
          </span>
          <span className="flex flex-wrap gap-x-4 gap-y-1">
            {RESELLER_JOIN_PHONES.map((phone) => (
              <PhoneLink key={phone} value={phone} />
            ))}
          </span>
        </Card>
      </div>
    </div>
  );
}
