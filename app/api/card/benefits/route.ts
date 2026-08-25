import { NextResponse } from "next/server";
import {
  ASSET_BASE,
  getPublicBenefits,
  messageForStatus,
  type PublicBenefitBranch,
  type PublicBenefitStore,
} from "@/lib/api/kehilot";
import { CARD_CODE_LENGTH, onlyDigits } from "@/lib/card";
import {
  clubCategory,
  localLogoFor,
  normalizeCity,
  type LiveBranch,
  type LiveStore,
} from "@/lib/data/live-benefits";

/** Never prerendered or cached — the answer is per-card. */
export const dynamic = "force-dynamic";

const clean = (v: string | null | undefined) => (v ?? "").replace(/\s+/g, " ").trim();

/**
 * The club's own file where the directory already carries the partner, the
 * platform's otherwise. `logo_url` comes back relative to the platform host.
 */
function resolveLogo(name: string, logoUrl: string | null | undefined) {
  const local = localLogoFor(name);
  if (local) return local;
  const url = clean(logoUrl);
  if (!url) return undefined;
  return /^https?:\/\//i.test(url) ? url : `${ASSET_BASE}${url.startsWith("/") ? "" : "/"}${url}`;
}

/**
 * A branch, minus its phone number.
 *
 * The platform stores one for some 43 addresses and the club publishes none: the
 * brief is unconditional that no page carries a phone or an email, and a merchant's
 * line on a club page is still a number on a club page. It is dropped here rather
 * than hidden in the UI so it never reaches the browser at all.
 */
function toBranch(b: PublicBenefitBranch, knownCities: Set<string>): LiveBranch | null {
  const name = clean(b.name);
  const address = clean(b.address);
  // Seventy of the six hundred addresses carry no city of their own, and a
  // fifteenth of those are named after one — "בית שמש", "רעננה". Reading the name
  // as the city where it matches a town the payload itself lists puts those shops
  // back into the city filter; a branch named after a street stays uncredited
  // rather than inventing a town out of "ברנפלד".
  const city = normalizeCity(b.city) ?? (knownCities.has(name) ? normalizeCity(name) : undefined);
  const hours = clean(b.opening_hours);
  if (!name && !address && !city) return null;
  return {
    ...(name ? { name } : {}),
    ...(address ? { address } : {}),
    ...(city ? { city } : {}),
    ...(hours ? { hours } : {}),
  };
}

function toStore(s: PublicBenefitStore, knownCities: Set<string>): LiveStore | null {
  const name = clean(s.name);
  if (!name) return null;

  const branches = (s.branches ?? [])
    .map((b) => toBranch(b, knownCities))
    .filter((b): b is LiveBranch => b !== null);

  // The store's own `cities` and its branches' can disagree — a branch may name a
  // town the summary omits. The union of both, normalised, is what the filter needs.
  const cities = new Set<string>();
  for (const c of s.cities ?? []) {
    const city = normalizeCity(c);
    if (city) cities.add(city);
  }
  for (const b of branches) if (b.city) cities.add(b.city);

  const trade = clean(s.category_name) || undefined;

  return {
    id: typeof s.store_id === "number" ? s.store_id : NaN,
    name,
    logo: resolveLogo(name, s.logo_url),
    trade,
    category: clubCategory(trade),
    exclusive: s.exclusive === true,
    featured: s.pinned === true,
    benefit: clean(s.benefit_text),
    branchCount: typeof s.branch_count === "number" ? s.branch_count : branches.length,
    cities: [...cities].sort((a, b) => a.localeCompare(b, "he")),
    branches,
  };
}

/**
 * GET /api/card/benefits?card_code=06206220
 *
 * Proxies the platform's public per-card benefit list. What comes back is the partner
 * list, the benefit each merchant wrote and where its branches are — and nothing else:
 * the operating club's name, logo and slug and the card's balance and points are all
 * in the upstream body and all dropped here. Hadran Club is the front the member sees,
 * the balance has its own page, and neither belongs in a benefits list.
 */
export async function GET(request: Request) {
  const raw = new URL(request.url).searchParams.get("card_code") ?? "";
  const cardCode = onlyDigits(raw).slice(-CARD_CODE_LENGTH);

  if (cardCode.length !== CARD_CODE_LENGTH) {
    return NextResponse.json({ message: messageForStatus(400) }, { status: 400 });
  }

  const result = await getPublicBenefits(cardCode);

  // A card the platform does not know is a normal outcome of a lookup, not a failure
  // of it — the gate reads `exists` and says so in its own words.
  if (!result.ok && result.status === 404) {
    return NextResponse.json({ exists: false, stores: [] });
  }

  if (!result.ok) {
    return NextResponse.json(
      { message: result.message },
      { status: result.status === 0 ? 502 : result.status },
    );
  }

  // The payload's own list of towns, as typed, so a branch named after one can be
  // recognised before the aliases in normalizeCity collapse the spellings.
  const knownCities = new Set((result.data.cities ?? []).map(clean).filter(Boolean));

  const stores = (result.data.stores ?? [])
    .map((s) => toStore(s, knownCities))
    .filter((s): s is LiveStore => s !== null);

  return NextResponse.json({ exists: true, stores });
}
