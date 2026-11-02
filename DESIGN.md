# הדרן קלאב · Design System

מסמך מערכת העיצוב של הדרן קלאב, נגזר מהקוד כפי שהוא משוחרר (`styles/tokens/*.css`,
`components/brand/*`, `components/site/*`). הבריף האסטרטגי והתוכני נמצא ב-`CLAUDE.md`;
המסמך הזה מתאר **איך האתר נראה ולמה**.

---

## 1. עקרונות

1. **זהב על ניטרלים חמים.** הזהות היא הגרדיאנט של הלוגו (`#966e33 → #f0d996`) על רקעי שמנת.
2. **עומק = גוון, לא צל.** כל משטח יושב שלב אחד מהמשטח שמאחוריו בסולם המשטחים. צל שמור לשכבות צפות בלבד.
3. **RTL-first.** עברית היא השפה של כל משטח; כל הפריסות, הגרדיאנטים והקלטים מתוכננים לימין-לשמאל.
4. **יוקרתי אך נגיש.** "מועדון זהב" שאינו סנובי. הזהב הוא רמז לאיכות, לא קישוט.
5. **רגע-קסם אחד לעמוד.** כל תנועה אחרת היא פידבק פונקציונלי.
6. **אין hex ב-JSX.** כל ערך עובר דרך טוקן: `bg-[var(--color-*)]`.

---

## 2. צבע

### ראמפ הזהב (מהלוגו)

| טוקן | ערך | הערה |
| --- | --- | --- |
| `--gold-900` | `#5c4318` | |
| `--gold-800` | `#7a5824` | |
| `--gold-700` | `#966e33` | עצירה כהה של הגרדיאנט · `--color-primary-deep` · focus |
| `--gold-600` | `#b08a45` | |
| `--gold-500` | `#c9a35c` | הקו של ה-Eyebrow |
| `--gold-400` | `#dfc27d` | press של כפתור ראשי |
| `--gold-300` | `#f0d996` | **המילוי הראשי** · `--color-primary` |
| `--gold-200` | `#f5e6bd` | |
| `--gold-100` | `#faf1da` | `--color-primary-pale` · surface-4 |
| `--gold-50` | `#fdf9f0` | surface-3 |

### ניטרלים חמים

| טוקן | ערך | שימוש |
| --- | --- | --- |
| `--sand-100` | `#f7f4ee` | surface-1 |
| `--sand-200` | `#f1ece3` | surface-2 · `--color-on-ink` |
| `--sand-300` | `#e4ddd0` | `--color-border` |
| `--sand-400` | `#cfc7b8` | |
| `--grey-500` | `#8a857b` | `--color-mute` |
| `--grey-600` | `#6b665e` | |
| `--grey-700` | `#4a463f` | `--color-body` |
| `--ink-900` | `#12100b` | `--color-ink` · משטח ה-ink |

### טקסט

| טוקן | שימוש |
| --- | --- |
| `--color-ink` | כותרות, טקסט ראשי |
| `--color-body` | גוף טקסט |
| `--color-mute` | מטא, עזר |
| `--color-ink-deep` (`#4a3410`) | טקסט על משטחי זהב |
| `--color-on-ink` | טקסט על ink |
| `--color-primary-deep` | קישורים, Eyebrow |

### סמנטי

| משפחה | בסיס | deep | pale |
| --- | --- | --- | --- |
| Positive (חיסכון) | `#2e8f4e` | `#0d4d28` | `#e6f3ea` |
| Warning | `#e3a712` | `#8a5a00` | `#fdf1d6` |
| Negative | `#c93a35` | `#96231f` | `#fbeae9` (bg כהה: `#2e0b0a`) |

**אקסנטים שלישוניים** — `--color-accent-navy`, `-burgundy`, `-olive` — לאיור ונתונים בלבד, **לעולם לא ל-CTA**.

### כללי ניגודיות

- טקסט ראשי על canvas עומד ב-WCAG AA.
- **זהב אינו משמש לטקסט קטן על לבן** — רק ל-accents, מספרים גדולים ו-Eyebrow (`gold-700`).

---

## 3. סולם המשטחים (Surface Ladder)

| שלב | טוקן | Alias | ערך | שימוש |
| --- | --- | --- | --- | --- |
| 0 | `--surface-0` | `--color-canvas` | לבן | רקע הדף |
| 1 | `--surface-1` | `--color-canvas-warm` | sand-100 | משטחי קריאה ארוכים (מסמכים משפטיים) |
| 2 | `--surface-2` | `--color-canvas-soft` | sand-200 | גוון סקשן רגיל |
| 3 | `--surface-3` | `--color-canvas-pale` | gold-50 | **רצועה אחת בעמוד** — הסקשן שהעמוד באמת עליו |
| 4 | `--surface-4` | `--color-canvas-wash` | gold-100 | פאנל בודד, החם ביותר |
| — | — | `--color-canvas-ink` | ink-900 | המשטח הכהה היחיד בעמוד (footer או פרומו סוגר) |

**כללים**

- רצועות **הולכות על הסולם** (0 → 2 → 0 → 3 …), לא מתחלפות בין שני גוונים.
- **כרטיס לבן על רצועה לבנה אינו כרטיס.** פאנל יושב שלב אחד מהרצועה שמתחתיו.
- שתי רצועות סמוכות במרחק שלב אחד מקבלות `divided` (hairline עליון) כדי שהתפר ייקרא כמעבר סקשן.

### גרדיאנטים

| טוקן | שימוש |
| --- | --- |
| `--gradient-brand` | 135°, gold-700 → gold-300 |
| `--gradient-brand-soft` | 135°, gold-200 → gold-50 |
| `--gradient-hero` | רשת ה-Hero בדף הבית — שמנת בצד הטקסט (ימין), זהב פורח מאחורי הכרטיס (שמאל) |
| `--gradient-hero-bloom` | הילה חמה מאחורי ה-PNG של הכרטיס (במקום צל) |
| `--gradient-header` | ה-wash של `PageHero` בעמודי משנה — פריחה אחת בפינה הימנית-עליונה |

`background-position` פיזי ואינו מתהפך — כל הגרדיאנטים ממוקמים ידנית לפריסת ה-RTL.

---

## 4. גבולות, טבעות וצללים

| טוקן | ערך | שימוש |
| --- | --- | --- |
| `--color-border` | sand-300 | מפריד כרטיס ממה שמאחוריו |
| `--color-border-soft` | sand-200 | שורות **בתוך** כרטיס |
| `--color-border-strong` | ink-900 | |
| `--ring-hairline` | `0 0 0 1px border` | קצה עדין |
| `--ring-gold` | `0 0 0 1px gold-300` | הדגשה |
| `--ring-gold-soft` | gold-300 + הילת gold-100 ברוחב 6px | ההרמה המותגית (כרטיס חבר, פאנל מודגש) |
| `--ring-ink` | `0 0 0 1px ink` | |
| `--shadow-overlay` | `0 16px 48px rgba(18,16,11,.16)` | **רק** Dialog, drawer, פאנל של Select |
| `--focus-ring` | `0 0 0 3px rgba(150,110,51,.35)` | |

טבעת נמשכת **מחוץ** לגבול — הדגשה בלי הזזת layout.
`--shadow-card`, `--shadow-raised`, `--shadow-gold` — **deprecated**, aliases לטבעות. אין להשתמש בהם בקוד חדש.

---

## 5. טיפוגרפיה

### משפחות

| טוקן | פונט | שימוש |
| --- | --- | --- |
| `--font-display` | **Afek** (מקומי, `public/fonts/`) → Heebo → Arial Hebrew | כותרות, weight 800 |
| `--font-ui` | **Afek** → Assistant → Arial Hebrew | גוף ו-UI, 400/500/600 |
| `--font-serif` | **Frank Ruhl Libre** | פול-קוואטים בלבד, **עד פעמיים בעמוד** |

כל הפונטים עם `display: swap`. אין להוסיף פונטים.

### סולם

| טוקן | גודל | line-height |
| --- | --- | --- |
| `--text-display-mega` | 104px | 1.02 |
| `--text-display-xxl` | 80px | 1.04 |
| `--text-display-xl` | 64px | 1.06 |
| `--text-display-lg` | 48px | 1.1 |
| `--text-display-md` | 40px | 1.12 |
| `--text-display-sm` | 32px | 1.2 |
| `--text-display-xs` | 24px | 1.3 |
| `--text-body-lg` | 20px | 1.6 |
| `--text-body-md` | 16px | 1.6 |
| `--text-body-sm` | 14px | 1.5 |
| `--text-caption` | 12px | 1.4 |
| `--text-button` | 16px | 1.5 |

לעברית אין ascenders/descenders משמעותיים — הריווח צפוף מסולם לטיני בגדלי תצוגה ומעט רחב יותר בגוף.

**גדלים רספונסיביים מקובעים:**
- כותרת סקשן (`SectionTitle`): `clamp(27px, 6vw, 44px)`
- Lead (`SectionLead`): `clamp(16px, 2.4vw, 19px)`, `max-width: 62ch`

### Weights

`400` regular · `500` medium · `600` semibold (כפתורים) · `700` bold (Eyebrow) · `800` black (כותרות)

### Tracking — מתהדק עם הגודל

| טוקן | ערך | טווח |
| --- | --- | --- |
| `--tracking-display-sm` | -0.005em | 24–32px |
| `--tracking-display` | -0.012em | 40–48px |
| `--tracking-display-lg` | -0.022em | 56–68px |
| `--tracking-display-xl` | -0.03em | 80px+ |
| `--tracking-wide` | 0.08em | Eyebrow בלבד |

### מספרים

כל המספרים ב-`tnum` (tabular numerals). שקלים: `₪120` — בלי רווח.

---

## 6. ריווח ופריסה

בסיס 4px.

| טוקן | ערך |
| --- | --- |
| `--space-xxs` | 2px |
| `--space-xs` | 4px |
| `--space-sm` | 8px |
| `--space-md` | 12px |
| `--space-lg` | 16px |
| `--space-xl` | 24px |
| `--space-2xl` | 32px |
| `--space-3xl` | 48px |
| `--space-4xl` | 64px |
| `--space-5xl` | 96px |

| טוקן פריסה | ערך |
| --- | --- |
| `--container-max` | 1200px |
| `--container-narrow` | 760px (עמודת קריאה) |
| `--card-padding-sm` | `clamp(20px, 4vw, 26px)` — אריח ברשת צפופה |
| `--card-padding` | `clamp(22px, 5vw, 32px)` — פאנל ברירת מחדל |
| `--card-padding-lg` | `clamp(24px, 5vw, 44px)` — פאנל רחב / טופס |
| `--section-gap` | `clamp(32px, 6vw, 56px)` — בין כותרת סקשן לתוכן |
| `--stack-gap` | `clamp(24px, 4vw, 36px)` — בין בלוקים בתוך סקשן |

**Band padding:** `py: clamp(56px, 10vw, 104px)` · `px: clamp(16px, 4vw, 24px)`.
ריפוד כרטיס לעולם לא מתחת ל-20px — מתחת לזה המשטח מפסיק להיקרא כפאנל.

**נקודת שבירה מרכזית:** 900px (סרגל הסינון ב-`/benefits`). קיר הלוגואים ב-Hero מוסתר מתחת ל-560px.

---

## 7. רדיוסים

| טוקן | ערך | שימוש |
| --- | --- | --- |
| `--radius-sm` | 8px | |
| `--radius-md` | 12px | |
| `--radius-lg` | 16px | כפתור `sm` |
| `--radius-xl` | 24px | **רדיוס קנוני — כפתורים וכרטיסים** |
| `--radius-2xl` | 32px | משטחי Hero, כרטיס החבר |
| `--radius-pill` | 9999px | תגיות, צ׳יפים |

---

## 8. תנועה

| טוקן | ערך |
| --- | --- |
| `--duration-fast` | 120ms |
| `--duration-base` | 200ms |
| `--duration-slow` | 320ms |
| `--ease-out` | `cubic-bezier(.2,.8,.2,1)` |
| `--ease-in-out` | `cubic-bezier(.4,0,.2,1)` |

**תקציב התנועה**

- **רגע-קסם אחד לעמוד.** בדף הבית: `HeroLogoWall` (מעל `DriftWall`) — `aria-hidden`, `pointer-events: none`, מוסתר מתחת ל-560px, עוצר תחת `prefers-reduced-motion`.
- **Reveal** — fade-in-up רך על סקשנים (לא על ה-Hero); `stagger` לילדים.
- **NumberTicker** — ספרות ה-KPI עולות מ-0 בכניסה לתצוגה.
- **AnimatedShinyText** — shimmer דיסקרטי על תג ה-Hero.
- **BorderBeam** — לכל היותר פעם אחת בעמוד.
- ❌ parallax, scroll-hijacking, קרוסלות אוטומטיות, ספירות לאחור מזויפות.
- כל תנועה מכבדת `prefers-reduced-motion`.

---

## 9. רכיבים

### Button (`components/brand/Button.tsx`)

| Variant | רקע | Hover | Press |
| --- | --- | --- | --- |
| `primary` | gold-300, טקסט ink | **בהיר יותר** (`#f7e8c4`) | gold-400 |
| `secondary` | canvas-soft | sand-300 | sand-400 |
| `tertiary` | canvas + גבול ink | canvas-soft | sand-300 |
| `ghost` | שקוף | canvas-soft | sand-300 |
| `danger` | negative | negative-deep | negative-deep |

| Size | טקסט | ריפוד | גובה מינ׳ |
| --- | --- | --- | --- |
| `sm` | 14px | 16×8 | 36px (radius-lg) |
| `md` | 16px | 24×12 | 48px |
| `lg` | 20px | 32×16 | 56px |

Press = `translate-y-px` — **אף פעם לא scale-down**. Disabled: sand-200 + mute. Semibold, radius-xl.

### Card (`components/brand/Card.tsx`)

Tones לפי הסולם: `plain` · `warm` · `sand` · `pale` · `gold` · `ink` · `outline` · `hairline`.
`interactive` — עלייה של 2px + hairline זהב, **בלי צל**. ריפוד: `sm` / `md` / `lg`.

### Badge (`components/brand/Badge.tsx`)

Pill של 4×12px, 14px semibold. Tones: `gold` · `positive` · `warning` · `negative` · `neutral` · `ink`.
**תגית "בלעדי להדרן קלאב"** = `ink` (זהב על ink) — בולטת, לא נחבאת.

### Band / Container / Eyebrow / SectionTitle / SectionLead (`components/site/Band.tsx`)

- **Band** — tones: `white` · `warm` · `sand` · `pale` · `wash` · `ink`; `divided` לתפר.
- **Container** — 1200px, או 760px עם `narrow`.
- **Eyebrow** — 13px bold, `tracking-wide`, gold-700, עם **קו זהב של 24px** לפני הטקסט. עברית אין לה אותיות גדולות — הקו מחזיר לסימן את הצורה שלו. אין לכתוב eyebrow ידני.

### PageHero (`components/site/PageHero.tsx`)

Header אחיד לכל עמוד משנה: eyebrow, כותרת, lead, meta, actions, aside, על `--gradient-header`.
**חריג:** `/benefits` — בלי PageHero; שער הכרטיס (`BenefitsGate`, על surface-3) פותח את העמוד.

### שאר הרכיבים

`components/brand/`: Alert, BenefitRow, Checkbox, EmptyState, Figure, Icon, IconButton, Input, MemberCard, PartnerLogo, PartnerTile, Radio, RemoteLogo, SavingsMeter, Select, StatBlock, Tag, Textarea.
`components/ui/`: Radix/shadcn primitives (accordion, dialog, select, tabs …), מוזרמים ל-RTL דרך `RtlProvider`.

### לוגואים של שותפים

על plate ניטרלי (canvas-soft), כדי שלא ישתלטו על הפלטה המותגית.

---

## 10. RTL וקלט

- `<html lang="he" dir="rtl">`; `RtlProvider` מזרים כיוון ל-Radix.
- **כל שדות הקלט RTL, כולל placeholder.** אין `dir="ltr"` על `Input`.
- **חריג יחיד:** שדה שמחזיק מספר מקובץ ברווחים (מספר כרטיס מלא) מקבל `.numeric-field` — סדר לטיני, יישור לימין. רק לשדות בלי placeholder עברי.

---

## 11. נגישות

- Focus: `outline: 2px solid var(--color-focus)` (gold-700), `offset: 2px`.
- אייקונים דקורטיביים — `aria-hidden` דרך `<Icon>`; כפתורי אייקון — `aria-label` דרך `<IconButton>`.
- תמונת הכרטיס ב-Hero דקורטיבית (`alt=""`).
- כל אנימציה עוצרת תחת `prefers-reduced-motion`.

---

## 12. Do / Don't

| ✅ | ❌ |
| --- | --- |
| טוקן לכל צבע (`[var(--color-*)]`) | hex ב-JSX |
| עומק דרך סולם המשטחים וטבעות | `box-shadow` על כרטיסים |
| רצועת gold-50 אחת לעמוד | כמה רצועות זהב באותו עמוד |
| משטח ink אחד לעמוד | footer ink + פרומו ink |
| Hover בהיר יותר, press של 1px | scale-down בלחיצה |
| `<Eyebrow>`, `<PageHero>`, `<Band>` | header או eyebrow ידניים |
| Frank Ruhl עד פעמיים בעמוד | פונטים נוספים |
| זהב ל-accents ומספרים גדולים | זהב לטקסט קטן על לבן |
| רגע-קסם אחד לעמוד | parallax, קרוסלות, BorderBeam כפול |
| emoji-free UI | emoji ב-copy או בהערות קוד |
