/**
 * The Hadran reseller directory — the shops a member walks into.
 *
 * Two things happen at the same counter, so the same list serves both pages:
 * /stores, where a Hadran customer picks up the club card, and /join-hadran,
 * where someone who is not a Hadran customer yet signs up for Hadran itself.
 * Should the two lists diverge, split them here and not in the pages.
 *
 * This is the one place on the site that carries telephone numbers. Club service
 * still runs through SUPPORT_CHANNEL and nothing here is a service line: these
 * are the shops' own numbers, and a directory a member cannot ring is a
 * directory they have to look up somewhere else.
 *
 * The list below is the interim one supplied by Hadran; the updated directory
 * replaces the REGIONS array and nothing else.
 */

export type Store = {
  name: string;
  /** Street address as the shop gives it. Missing where none was supplied. */
  address?: string;
  /** Printed in the order supplied; a shop may list more than one line. */
  phones?: string[];
  /** A condition on the visit rather than a place — "בתיאום מראש". Shown as a
   *  tag, since a reader who misses it drives to a closed counter. */
  note?: string;
};

export type StoreCity = {
  city: string;
  stores: Store[];
};

export type StoreRegion = {
  region: string;
  cities: StoreCity[];
};

export const REGIONS: StoreRegion[] = [
  {
    region: "אזור ירושלים",
    cities: [
      {
        city: "ירושלים",
        stores: [
          { name: "פלא אור", address: "פינס 4 (דוידקה)" },
          { name: "מאסטר פון", address: "שמגר 23" },
        ],
      },
      {
        city: "בית שמש",
        stores: [
          {
            name: "יהושע דייטש",
            address: "תלמוד בבלי 58",
            note: "בתיאום מראש",
            phones: ["052-769-6101"],
          },
        ],
      },
      {
        city: "ביתר",
        stores: [{ name: "המעבדה של ביתר", address: "בניין דוד 21 (מפלס עליון)" }],
      },
      {
        city: "מודיעין עילית",
        stores: [{ name: "סים טק", address: "נתיבות המשפט 19" }],
      },
    ],
  },
  {
    region: "אזור המרכז",
    cities: [
      {
        city: "בני ברק",
        stores: [{ name: "הדרן בני ברק", address: "רבי עקיבא 81" }],
      },
      {
        city: "אלעד",
        stores: [{ name: "K-tech", address: "רבי יהודה הנשיא 92" }],
      },
      {
        city: "רחובות",
        stores: [{ name: "דודיפון", address: "יוסף וינר 2 (קומה שנייה)" }],
      },
    ],
  },
  {
    region: "אזור השרון והצפון",
    cities: [
      {
        city: "נתניה",
        stores: [
          {
            name: "ניסים פתרונות מחשוב וסלולר",
            note: "בתיאום מראש",
            phones: ["052-769-7777"],
          },
        ],
      },
      {
        city: "חדרה",
        stores: [{ name: "נעם שיח", address: "ישראל ישעיהו 10" }],
      },
      {
        city: "חריש",
        stores: [{ name: "פון אבר", address: "חברותא 13, מרכז מסחרי בצוותא" }],
      },
      {
        city: "חיפה",
        stores: [{ name: "ישי נוימן", phones: ["052-371-1350"] }],
      },
      {
        city: "קרית אתא",
        stores: [
          { name: "אלקטרומיקס", note: "בתיאום מראש", phones: ["053-717-3783"] },
          { name: "שומר מסך", address: "המייסדים 4" },
        ],
      },
      {
        city: "טבריה",
        stores: [{ name: "סים פלוס", address: "ז'בוטינסקי 1" }],
      },
      {
        city: "צפת",
        stores: [{ name: "קניון החשמל", address: "ירושלים 91" }],
      },
    ],
  },
  {
    region: "אזור הדרום",
    cities: [
      {
        city: "אשדוד",
        stores: [
          { name: "מרכז הסלולר", address: "יהודה הנשיא 8" },
          { name: "Ok Tech", note: "בתיאום מראש", phones: ["08-850-5000"] },
        ],
      },
      {
        city: "אשקלון",
        stores: [{ name: "ישראטק", address: "שפירא 17 (מאחורי הבניין)" }],
      },
    ],
  },
];

/** The nationwide ordering line, printed under the directory rather than inside
 *  a region: it is not a shop and it does not belong to one city. */
export const KOSHER_SALE_HOTLINE = "*3230";
export const KOSHER_SALE_LABEL = "מוקד כשר סייל";

/** For shopkeepers who want to become a Hadran reseller. Not a member channel —
 *  it sits at the foot of the directory, under its own heading. */
export const RESELLER_JOIN_PHONES = ["055-995-6944", "055-995-4484"];

export const STORE_COUNT = REGIONS.reduce(
  (n, region) => n + region.cities.reduce((m, city) => m + city.stores.length, 0),
  0,
);

export const STORE_CITY_COUNT = REGIONS.reduce((n, region) => n + region.cities.length, 0);
