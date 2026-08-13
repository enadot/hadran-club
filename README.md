# הדרן קלאב · Hadran Club

אתר החזית של **הדרן קלאב** — מועדון ההטבות של רשת הדרן. הצעת הערך המרכזית של המועדון היא כרטיס פיזי אחד (**הדרן קארד**) שמוריד **5% הנחה מיידית בקופה** בבתי העסק השותפים — בלי צבירת נקודות, בלי קופונים ובלי טעינה מראש.

האתר בעברית (RTL), פונה בעיקר לקהילה החרדית במרכזי בני ברק, ירושלים, בית שמש, מודיעין עילית, אלעד וביתר עילית.

---

## Tech Stack

| שכבה | טכנולוגיה |
| --- | --- |
| Framework | **Next.js 16** (App Router, React Server Components) |
| Runtime | **React 19** + **TypeScript 5.9** (strict) |
| Styling | **Tailwind CSS v4** (`@tailwindcss/postcss`) על גבי CSS design tokens |
| UI primitives | **Radix UI** (Accordion, Checkbox, Dialog, Label, Select, Tabs) + **shadcn/ui** conventions |
| Motion | **Framer Motion (`motion`)** לסקרול-רוול; **GSAP + `@gsap/react`** לאפקטים ממוקדים; רכיבי **Magic UI** (BorderBeam, AnimatedShinyText, NumberTicker) |
| Icons | **Lucide React** |
| Fonts | **Afek (א.א.א)** — הפונט המותגי (weights 400–800), נטען מקומית מ-`public/fonts`. פולבק: Heebo / Assistant.<br>**Frank Ruhl Libre** — סריף טקסי לפול-קוואטס, נטען מ-Google Fonts. |
| Linting | ESLint 9 + `eslint-config-next` |
| Deploy | Vercel |

מקור העיצוב הוא **Claude Design handoff** — פרוטוטייפים ב-HTML/CSS/JS ב-`project/` (לא נכללים ב-build; ראו `next.config.ts`).

---

## מבנה האתר

התפריט הראשי (מוגדר ב-`lib/data/site.ts`, מוצג ב-`components/site/SiteNav.tsx`):

| נתיב | עמוד | תכולה |
| --- | --- | --- |
| `/` | **דף הבית** | Hero עם הדרן קארד + BorderBeam · רצועת ארבעה נתוני-מפתח (StatBlock עם NumberTicker) · שלושה שלבי הצטרפות · מחשבון חיסכון אינטראקטיבי · סל קניות שבועי לפני/אחרי · ארבע קטגוריות שותפים · שלוש קהלי-יעד · ציטוט לקוח · CTA סוגר |
| `/benefits` | **בתי העסק השותפים** | רשימת שותפים (16 ערכים ב-`lib/data/partners.ts`) עם סינון לפי קטגוריה ועיר |
| `/activate` | **הפעלת הדרן קארד** | טופס הפעלת כרטיס פיזי + מסלול להזמנת כרטיס חדש |
| `/balance` | **בדיקת יתרה** | הזנת מספר כרטיס מציגה יתרה זמינה וסטטוס מה-API הציבורי, ומאפשרת טעינה בכרטיס אשראי |
| `/merchants` | **הצטרפות בתי עסק** | Landing לבעלי עסקים: קהל ממוקד, ללא עלות הקמה, אינטגרציה בקופה |
| `/faq` | **שאלות ותשובות** | Accordion עם 5 קבוצות (ההנחה · הכרטיס · בתי עסק · החברות · הכל) — ב-`lib/data/faq.ts` |
| `/search` | **חיפוש באתר** | חיפוש רוחבי בבתי עסק, עמודים ותשובות נפוצות; זמין גם כ-Dialog גלובלי (`SearchDialog`) |

**האזור האישי אינו חלק מהאתר.** הוא מתופעל על ידי **קהילות קארד** במערכת שלהם, וכל הפניה אליו
באתר — בתפריט, ב-footer, בדף הבית, בסיום ההפעלה ובתוצאת בדיקת היתרה — היא קישור יוצא הנפתח
בלשונית חדשה. הכתובת נקבעת ב-`MEMBER_AREA_URL` (`lib/data/site.ts`) ונשלטת דרך משתנה הסביבה
`NEXT_PUBLIC_MEMBER_AREA_URL`, כך שהמפעיל מעדכן אותה בלי שינוי קוד.

---

## ארכיטקטורת קוד

```
app/                    ← App Router routes (כל תיקייה = route, page.tsx בלבד)
  api/card/             ← Route handlers שמתווכים ל-API הציבורי של קהילות קארד
components/
  brand/                ← אבני-הבניין המותגיות: Button, Card, Badge, MemberCard,
                          StatBlock, Figure, SavingsMeter, BenefitRow, PartnerTile,
                          Input/Select/Checkbox/Radio, Tag, EmptyState, Icon, IconButton
  site/                 ← chrome + מולטי-סקשן: SiteNav, Footer, Band+Container,
                          SearchDialog (Radix Dialog + KBD-shortcut), SavingsCalculator,
                          Reveal (scroll-in motion wrapper), RtlProvider
  magic/                ← Magic UI ports: BorderBeam, AnimatedShinyText, NumberTicker
  ui/                   ← Radix wrappers (accordion, tabs) בסגנון shadcn
lib/
  api/                  ← שכבת השירות מול קהילות קארד: kehilot.ts (שרת) + client.ts (דפדפן)
  card.ts               ← ולידציה ופורמט של מספר כרטיס, טלפון, דוא״ל, סכומים וסטטוס
  data/                 ← Static content שמופיע ב-page.tsx: NAV_LINKS, FOOTER_COLS,
                          PARTNERS, FAQ, SEARCH_INDEX, MEMBER_AREA_URL
  fonts.ts              ← next/font declarations (Afek local, Frank Ruhl Libre)
  motion.ts             ← easings + duration presets משותפים
  utils.ts              ← cn() helper (clsx + tailwind-merge)
styles/tokens/          ← CSS variables מותגיים המיובאים ב-globals.css:
                          colors · typography · spacing · radius · elevation · motion · base
public/
  fonts/                ← Afek woff2 files (5 weights)
  ...                   ← assets נוספים מה-handoff
project/                ← Claude Design source-of-truth prototypes (HTML/CSS/JS).
                          לא נכלל ב-build (outputFileTracingExcludes).
```

### Design tokens

כל הצבעים, הרווחים, ה-typography, ה-radius וה-easing חיים ב-`styles/tokens/*.css` כ-CSS custom properties (`--color-primary-deep`, `--gold-500`, `--font-display`, `--radius-2xl`, וכו׳). הקוד ב-JSX משתמש בהם ישירות דרך `[var(--...)]` של Tailwind arbitrary values — אין hard-coded צבעים ב-components.

### RTL

האתר עברית מלאה: `<html lang="he" dir="rtl">` ב-`app/layout.tsx`, ו-`RtlProvider` (context) מעביר את הכיוון ל-Radix primitives כדי שה-Dialog/Select/Tabs יפתחו לצד הנכון.

### תנועה (Motion)

- **`<Reveal>`** (`components/site/Reveal.tsx`) — עוטף בלוקים ומחיל fade-in-up כשה-viewport מגיע אליהם. עם `stagger` הילדים נחשפים בהדרגה. נבנה על `motion` (Framer Motion).
- **BorderBeam** — קרן זהב חלקה שסובבת סביב כרטיס החבר ב-Hero. מוגבל לרגע מיתוגי אחד בעמוד.
- **AnimatedShinyText** — shimmer עדין על תגי-הכותרת של ה-Hero.
- **`<Figure>` + NumberTicker** — ספרות ה-KPI (`312`, `1,240`, `24,800`) עולות מ-0 בזמן הכניסה לתצוגה.
- ה-Hero **לא** עטוף ב-Reveal — הוא מעל-הקפל וכל השהיה פוגעת ב-LCP.

---

## חיבור ל-API של קהילות קארד

הדרן קלאב הוא ה-White Label; **קהילות קארד** היא הפלטפורמה מאחוריו. שלושת ה-Endpoints הציבוריים
שלה — אלה שמחזיק כרטיס רשאי לקרוא עבור הכרטיס של עצמו — מוטמעים באתר. **אין מפתח API בקוד**, לא
בצד שרת ולא בצד לקוח.

### שכבות

| שכבה | קובץ | תפקיד |
| --- | --- | --- |
| Server client | `lib/api/kehilot.ts` | `fetch` אל `kehilotcard.co.il`, timeout של 12 שניות, מיפוי כל שגיאה להודעה בעברית |
| Route handlers | `app/api/card/{balance,activate,topup}/route.ts` | Proxy מצד השרת + ולידציה חוזרת של הקלט |
| Browser client | `lib/api/client.ts` | הרכיבים קוראים רק לנתיבים המקומיים ומקבלים `ClientResult` |
| Validation | `lib/card.ts` | `card_code` (8 ספרות אחרונות), טלפון, דוא״ל, סכומי טעינה, מיפוי סטטוס כרטיס |

הקריאות עוברות דרך ה-route handlers ולא ישירות מהדפדפן משלוש סיבות: המארח החיצוני לא צריך לפתוח
CORS למקור הזה, כתובת ה-API לא נכנסת ל-bundle של הלקוח, ואם בעתיד יידרש מפתח פרטי — הוא ייכנס
בשכבת השרת בלבד, בלי לגעת באף רכיב.

### Endpoints

| נתיב מקומי | Upstream | שימוש ב-UI |
| --- | --- | --- |
| `GET /api/card/balance?card_code=` | `GET /public/balance` | `/balance` — יתרה זמינה, מטבע וסטטוס כרטיס |
| `POST /api/card/activate` | `POST /public/activate` | `/activate` — שיוך כרטיס פיזי לחבר (שם, טלפון, דוא״ל) |
| `POST /api/card/topup` | `POST /public/topup` | `TopUpPanel` — הפניה לדף הסליקה המאובטח של המערכת |

### משתני סביבה

```bash
KEHILOT_API_BASE=https://kehilotcard.co.il/api/v1   # ברירת מחדל; דורסים רק לסביבת בדיקות
NEXT_PUBLIC_MEMBER_AREA_URL=https://kehilotcard.co.il  # יעד הקישור "אזור אישי"
```

### טיפול בשגיאות

כל קריאה חוזרת כ-`{ ok: true, data }` או `{ ok: false, status, message }` — הרכיבים לא צריכים
`try/catch`. ההודעות בעברית ומוצגות ב-`<Alert>` צמוד לפעולה שנכשלה:

| מצב | הודעה |
| --- | --- |
| `exists: false` | הכרטיס לא נמצא במערכת, אנא וודאו את המספר |
| 400 / 422 | נתונים לא תקינים, אנא בדקו את מספר הכרטיס (או הודעה ממוקדת לשדה שנכשל) |
| 404 | הכרטיס לא נמצא |
| 408 / timeout | הבקשה ארכה זמן רב מדי, אנא נסו שוב |
| 429 | בוצעו יותר מדי בקשות. אנא נסו שוב בעוד מספר רגעים. |
| 5xx | שגיאת שרת, אנא נסו שוב מאוחר יותר |
| כשל רשת | לא הצלחנו להתחבר לשרת. אנא בדקו את החיבור לאינטרנט ונסו שוב. |

הודעה שמגיעה מה-upstream מוצגת כלשונה **רק אם היא בעברית**; אחרת נעשה שימוש בטבלה שלמעלה.

---

## Scripts

```bash
npm install           # התקנת תלויות
npm run dev           # שרת פיתוח על http://localhost:3000
npm run build         # production build של Next
npm start             # הרצת production build
npm run lint          # ESLint
npm run typecheck     # tsc --noEmit
```

Node ≥ 20 מומלץ (תואם ל-Next 16).

---

## מוסכמות פיתוח

- **Server Components כברירת מחדל**. מוסיפים `"use client"` רק כשמצריך אינטראקטיביות (Radix, motion, טפסים).
- **תוכן שאינו chrome חי ב-`lib/data/`** — ה-page.tsx מייבאים ממנו ולא מחזיקים ליטרלים ארוכים.
- **אין hard-coded palette**. תמיד `var(--color-*)` דרך Tailwind arbitrary values.
- **`cn(...)`** (`lib/utils.ts`) — מיזוג class-lists ב-Tailwind בבטחה.
- **Handoff parity** — כל `page.tsx` שומר על הסדר, ההיררכיה והמלל של המסמך המקביל ב-`project/*.dc.html`. שינויי מלל צריכים להיות בכוונה.
- **הפרוטוטייפים ב-`project/`** הם ה-visual source of truth. כשמוסיפים section, פותחים את ה-HTML המקביל וקוראים אותו לפני שכותבים JSX.

---

## Deployment

Vercel — הפרויקט כולל `Vercel plugin for coding agents` תחת `.claude/settings.json`. הענף הראשי הוא `main`. אחרי push ל-`main`, Vercel בונה ופורס אוטומטית.

---

## Handoff origin

הפרויקט התחיל כ-Claude Design handoff bundle (`untitled/project/…`). קבצי המקור נשמרו תחת `project/` כרפרנס עיצובי, ואינם חלק מ-runtime — ה-build של Next מדלג עליהם דרך `outputFileTracingExcludes` ב-`next.config.ts`.
