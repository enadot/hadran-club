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
          {
            name: "אשכול הסלולר",
            address: "פארן 7, רמת אשכול",
            phones: ["02-536-4888"],
          },
          { name: "מאסטר פון", address: "שמגר 23, רוממה" },
          {
            name: "פלא אור",
            address: "פינס 4 (דוידקה)",
            phones: ["02-536-4888"],
          },
        ],
      },
      {
        city: "בית שמש",
        stores: [
          { name: "יהושע — סוכן הדיגיטל", phones: ["052-769-6101"] },
          {
            name: "idphone",
            address: "נחל קישון 19 (בחניה)",
            phones: ["02-650-0393"],
          },
        ],
      },
      {
        city: "ביתר עילית",
        stores: [
          {
            name: "המעבדה של ביתר",
            address: "בניין דוד 21 (מפלס עליון)",
            phones: ["052-766-9400"],
          },
        ],
      },
      {
        city: "מודיעין עילית",
        stores: [
          {
            name: "סים טק",
            address: "נתיבות המשפט 19",
            phones: ["055-996-5036", "0722-71-2009"],
          },
        ],
      },
    ],
  },
  {
    region: "אזור המרכז",
    cities: [
      {
        city: "בני ברק",
        stores: [
          {
            name: "הדרן",
            address: "רבי עקיבא 81 (קומת כניסה)",
            phones: ["077-993-4471"],
          },
          { name: "תקשורת אישית", phones: ["052-500-1010"] },
        ],
      },
      {
        city: "רחובות",
        stores: [
          {
            name: "דודי פון",
            address: "יוסף וינר 2 (קומה שנייה)",
            phones: ["052-717-4700"],
          },
        ],
      },
      {
        city: "אלעד",
        stores: [
          {
            name: "tech-K",
            address: "רבי יהודה הנשיא 92",
            phones: ["03-693-1010"],
          },
        ],
      },
      {
        city: "רמת גן",
        stores: [{ name: "סים שלום", address: 'אצ"ל 42', phones: ["055-770-3770"] }],
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
            phones: ["052-769-7777", "055-709-0000"],
          },
        ],
      },
      {
        city: "חדרה",
        stores: [
          {
            name: "נעם שיח",
            address: "ישראל ישעיהו 10",
            phones: ["052-404-3644"],
          },
        ],
      },
      {
        city: "חריש",
        stores: [
          {
            name: "פון אבר",
            address: "חברותא 13, מרכז מסחרי בצוותא",
            phones: ["058-540-6343"],
          },
        ],
      },
      {
        city: "חיפה",
        stores: [{ name: "ישי נוימן", phones: ["052-371-1350"] }],
      },
      {
        city: "קרית אתא",
        stores: [{ name: "אלקטרומיקס", phones: ["053-717-3783"] }],
      },
      {
        city: "צפת",
        stores: [
          {
            name: "קניון החשמל",
            address: "ירושלים",
            phones: ["04-682-245691"],
          },
        ],
      },
    ],
  },
  {
    region: "אזור הדרום",
    cities: [
      {
        city: "אשקלון",
        stores: [
          {
            name: "ישראטק",
            address: "שפירא 17 (מאחורי הבניין)",
            phones: ["052-710-5398"],
          },
        ],
      },
      {
        city: "אשדוד",
        stores: [
          { name: "Tech Ok", address: "בתיאום מראש", phones: ["08-850-5000"] },
          {
            name: "נקסט פון",
            address: "גשר עד הלום, ליד מכבי שירותי בריאות",
            phones: ["050-415-5159"],
          },
          { name: "מרכז הסלולר", phones: ["055-677-7772"] },
        ],
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
