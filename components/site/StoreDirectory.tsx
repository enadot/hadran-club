import { Card } from "@/components/brand/Card";
import { Icon } from "@/components/brand/Icon";
import { onlyDigits } from "@/lib/forms";
import {
  KOSHER_SALE_HOTLINE,
  KOSHER_SALE_LABEL,
  REGIONS,
  RESELLER_JOIN_PHONES,
  type Store,
} from "@/lib/data/stores";

/**
 * The reseller directory, region by region.
 *
 * Both /stores and /join-hadran render it: the counter that hands over a club
 * card is the counter that signs a new customer up for Hadran, so duplicating
 * the list into two components would only let them drift apart.
 *
 * A card per city rather than a row per shop. The list is long, most cities
 * carry one or two shops, and a flat list of thirty rows gives the reader
 * nothing to aim at; the city is what they are scanning for.
 *
 * Phone numbers run LTR inside an RTL page. `.numeric-field` keeps the digit
 * groups in Latin order while the line stays right-aligned — the same rule the
 * card-number fields use.
 */

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
  return (
    <div className="flex flex-col gap-[clamp(32px,5vw,52px)]">
      {REGIONS.map((region) => (
        <section key={region.region} className="flex flex-col gap-5">
          <h2 className="m-0 flex items-center gap-2.5 text-[clamp(20px,3.4vw,26px)] leading-[1.2] tracking-[var(--tracking-display-sm)]">
            <Icon name="map-pin" size={20} color="var(--color-primary-deep)" />
            {region.region}
          </h2>

          <div className="grid grid-cols-[repeat(auto-fill,minmax(min(288px,100%),1fr))] gap-4">
            {region.cities.map((city) => (
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

      {/* Neither line belongs to a city, so both sit under the directory rather
          than inside one of the region blocks. */}
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
