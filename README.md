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
| `/balance` | **בדיקת יתרה** | טופס — מספר כרטיס + 4 ספרות ת״ז — מציג יתרה, חיסכון שנצבר וקניות אחרונות |
| `/merchants` | **הצטרפות בתי עסק** | Landing לבעלי עסקים: קהל ממוקד, ללא עלות הקמה, אינטגרציה בקופה |
| `/faq` | **שאלות ותשובות** | Accordion עם 5 קבוצות (ההנחה · הכרטיס · בתי עסק · החברות · הכל) — ב-`lib/data/faq.ts` |
| `/member` | **אזור אישי** | חברות המשפחה, כרטיסים פעילים, היסטוריית קניות לפי חודשים עבריים, סך החיסכון |
| `/search` | **חיפוש באתר** | חיפוש רוחבי בבתי עסק, עמודים ותשובות נפוצות; זמין גם כ-Dialog גלובלי (`SearchDialog`) |

---

## ארכיטקטורת קוד

```
app/                    ← App Router routes (כל תיקייה = route, page.tsx בלבד)
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
  data/                 ← Static content שמופיע ב-page.tsx: NAV_LINKS, FOOTER_COLS,
                          PARTNERS, MEMBER_ACTIVITY, FAQ, SEARCH_INDEX
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
