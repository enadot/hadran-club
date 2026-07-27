# הדרן קלאב · Hadran Club — Design System

מערכת העיצוב של **הדרן קלאב** — מועדון ההטבות והחיסכון החכם של המגזר החרדי.

Hadran Club is a savings-and-benefits club for Israel's Haredi (ultra-Orthodox) community. The product is built around three surfaces:

1. **כרטיס פיזי** — a physical membership card that gives an immediate **5% discount at the register** in partner chains and shops. No points, no coupons, no cashback delay: the discount comes off the bill on the spot.
2. **אתר אישי** — a personal member area for managing benefits, tracking savings, browsing partner businesses and handling the membership.
3. **ממשק דיגיטלי** — a lightweight balance / activity view (mobile-first) for checking what you have saved and where the card works.

Everything the club ships is **Hebrew, right-to-left**, and speaks to a family audience that values plainness, trust and modesty over hype.

## Sources used to build this system

| Source | What was taken from it |
|---|---|
| `uploads/לוגו הדרן קלאב.svg` (client-supplied logo) | The full lockup, the gift-box mark, the wordmark, and the gold gradient (`#966e33 → #f0d996`) that seeds the whole colour system. The uploaded file had lost its `<style>` block, so class-based fills rendered black; the repaired versions live in `assets/`. |
| Client-supplied brand fonts (`afek-*.woff2`, 5 weights) | **Afek** — installed as the brand face for both display and UI. |
| A written design brief (Wise-style token spec) supplied by the client | The *architecture* of the system: token naming, the 24px pill radius language, surface-contrast elevation, the two-face type story, semantic colour families, and the component inventory. |

No codebase, Figma file or existing screens were provided — the UI kits in this project are the first visual interpretation of the brand, built from the logo, the fonts and the brief. Treat them as a proposal to react to, not a recreation of something that exists.

---

## CONTENT FUNDAMENTALS

**Language.** Hebrew only, always RTL. Latin appears only in card numbers, phone numbers, currency figures and technical identifiers — those stay `direction: ltr`.

**Voice.** Practical, warm, respectful. The club talks like a trusted neighbour who found a good deal, not like a bank and not like a startup. No slang, no English loanwords where a Hebrew word exists (`מועדון` not `קלאב` in body copy — the brand name is the exception), no exclamation-mark stacking.

**Person.** Address the member in plural-polite second person: *הצטרפו*, *הציגו את הכרטיס בקופה*, *חסכתם החודש*. Where a form needs a neutral address, use the inclusive slash form: *אני מאשר/ת את התקנון*. The club refers to itself as *המועדון* or *הדרן קלאב* — never "אנחנו" in a chatty way.

**Numbers are the argument.** Every claim is a number: *5% הנחה מיידית*, *₪1,240 נחסכו החודש*, *312 בתי עסק שותפים*. Shekel sign before the figure (`₪1,240`), tabular figures so columns align, thousands separator with a comma.

**Dates.** Hebrew dates in member-facing content where it feels natural (*כ״ג בתמוז*), Gregorian in billing and legal contexts. Never mix the two in one line.

**Casing & punctuation.** Hebrew has no case — hierarchy comes from weight and size only. Use the Hebrew gershayim (״) and geresh (׳) in abbreviations, and the maqaf-free plain hyphen in numbers. Sentence-final periods are dropped in headlines and buttons, kept in body copy and fine print.

**Buttons** are verbs, 1–3 words: `הצטרפו למועדון`, `הפעלת הכרטיס`, `לרשימת בתי העסק`. Never "לחץ כאן".

**Fine print** is honest and short: *בכפוף לתקנון המועדון. ט.ל.ח.* Legal disclaimers sit in `caption` size, mute colour, never hidden behind a hover.

**Emoji: never.** Not in product, not in marketing, not in email. Iconography carries that job. Unicode symbols are limited to ₪, ״, ׳, · and ✔/✘ in do/don't documentation only.

**Sensitivity.** The audience is family-oriented and modest. Imagery shows products, storefronts, shopping baskets and the card itself — not faces in close-up, not fashion imagery, not anything requiring modesty judgement. When in doubt, show the card.

---

## VISUAL FOUNDATIONS

**The idea in one line:** a warm, quiet, paper-like page — sand and white — with one gold object on it.

### Colour
- **Gold is identity, not decoration.** The ramp (`--gold-900` … `--gold-50`) is sampled straight from the logo gradient. `--color-primary` `#f0d996` is the CTA fill; `--color-primary-deep` `#966e33` is for icons, links, active indicators and small type on light surfaces (the light gold fails contrast as a text colour — never set text in `#f0d996` on white).
- **The gradient** `linear-gradient(135deg,#966e33,#f0d996)` is reserved: the membership card, progress fills, and at most one brand moment per page. It is never a page background and never sits behind body text.
- **Neutrals are warm.** Sand `#f1ece3` is the page canvas; white is what cards are made of; ink `#12100b` is a near-black with an olive-brown cast. There is no cool grey anywhere in the system.
- **Semantic colours are muted**, one step down in saturation from a typical web palette, so they never out-shout the gold: `#2e8f4e` positive, `#e3a712` warning, `#c93a35` negative. Savings are always framed as a positive gain in green — never as a negative number.
- **Tertiary accents** (navy, burgundy, olive) exist for charts and illustrations only. They are never a button, never a badge, never a link.
- **Two background colours per page, maximum:** sand and white. A single ink band is allowed as the closing footer or one promo card.

### Type
- **Afek** (client-supplied, 400–800) is the whole system. **Afek 800** is the display voice — every headline, every big number, the same weight as the logo wordmark. **Afek 400/500/600** carries UI and body.
- **Frank Ruhl Libre** is the ceremonial serif: pull-quotes, testimonials, a blessing line. Two uses per page at most, never for UI.
- Display sizes are tight (`line-height` 1.02–1.2) because Hebrew has no ascenders or descenders; body sizes are loose (1.5–1.6) for readability at small sizes.
- Letterspacing: `-0.01em` on display, `0` on body, `+0.08em` only on small caps-style eyebrows.
- Never set a headline below weight 700. Never set body copy above weight 600.

### Layout
- Container 1200px, narrow reading column 760px.
- Bands alternate sand → white → sand. Section padding 48px vertical on desktop, 24px horizontal.
- Card interior padding 24px; 16px on mobile.
- Grids: 3-up feature rows on desktop, 2-up on tablet, 1-up on mobile. Hero splits headline (start/right) against the membership card artwork (end/left) and stacks on mobile.
- RTL rules: use logical properties (`inset-inline-start`, `margin-inline`) everywhere. Icons sit at the start (right) of a label; values and chevrons sit at the end (left). "Back" is `chevron-right`.

### Shape
- `24px` (`--radius-xl`) is the signature radius — every button and every card. `32px` for the membership card artwork and full-bleed hero surfaces. `12px` for form inputs, `8px` for small chips, `9999px` for pills and circular icon buttons. Sharp corners appear only on full-bleed bands.

### Elevation, borders & transparency
- **Surface contrast is the elevation.** A white card on the sand canvas needs no shadow.
- Hairline borders `1px solid #e4ddd0` define inputs, partner rows and lists. A `1px solid ink` border is the tertiary button and the focused input.
- Real shadows exist only for things that float: `--shadow-raised` on card hover, `--shadow-overlay` for dialogs and toasts, `--shadow-gold` under the membership card.
- Transparency and blur are essentially unused. The one exception is the modal scrim, `rgba(18,16,11,.45)` — warm, not neutral black. No glassmorphism, no gradient overlays on photography.

### Motion
- Short and calm: 120ms for colour/hover, 200ms for buttons and cards, 320ms for progress fills and overlays. Easing is always `cubic-bezier(.2,.8,.2,1)` — fast out, soft landing. No bounce, no spring, no parallax, no auto-playing carousels.
- **Hover:** buttons go *lighter* (gold → `#f7e8c4`), neutral surfaces go one step *darker* (sand → `#e4ddd0`); cards lift 2px and gain `--shadow-raised`.
- **Press:** 1px downward translate plus the darker gold `#dfc27d`. No scale-down.
- **Focus:** 2px ink outline, offset 2px, plus a soft gold ring `0 0 0 3px rgba(150,110,51,.35)` on inputs.
- Respect `prefers-reduced-motion` by dropping transforms and keeping only colour fades.

### Imagery
- Photography is sparse and warm: storefronts, groceries, the card in a wallet. Neutral-warm grade, no heavy filters, no grain, no duotone.
- Illustration is not part of the identity — where a picture would go and none exists, use a sand panel with a gold icon disc (`EmptyState`) rather than inventing artwork.
- The membership card render is the brand's hero image. When you need one image and have nothing, show the card.

---

## ICONOGRAPHY

- The client supplied no icon set. The system uses **Lucide** (2px stroke, rounded caps, 24px grid) as a documented substitute — it matches the geometry of the logo's rounded gift-box forms. **Flagged: swap this out if the client has a house icon set.**
- Icons are loaded from the Lucide static CDN and tinted with `currentColor` via a CSS mask, so they inherit text colour and never need re-export: see `components/core/Icon.jsx`.
- Sizes: **16px** inline with 14px text, **20px** default (buttons, list rows), **24px** for navigation and feature bullets. Stroke weight is never changed.
- Icons are decorative — the label carries the meaning. Icon-only buttons must pass an accessible `label`.
- Frequently used names: `badge-percent` (the discount), `credit-card` / `wallet` (the card), `store` / `shopping-bag` / `receipt` (partners and purchases), `gift` (benefits), `users` (family plan), `shield-check` (trust), `qr-code` (card scanning), `map-pin` (branches).
- **No emoji, ever.** No hand-drawn SVG illustration. Partner logos come from the partner; when one is missing, show two Hebrew initials on a sand square (`PartnerTile`).

---

## Index

### Root
- `styles.css` — the single entry point consumers link. Imports only.
- `thumbnail.html` — project tile.
- `SKILL.md` — Agent-Skills wrapper.
- `readme.md` — this file.

### `tokens/`
`fonts.css` (Afek `@font-face` + Google fallbacks) · `colors.css` · `typography.css` · `spacing.css` · `radius.css` · `elevation.css` · `motion.css` · `base.css` (RTL document defaults).

### `assets/`
`logo-lockup.svg` (primary) · `logo-lockup-on-dark.svg` · `logo-mark.svg` · `logo-wordmark.svg` (inherits `currentColor`) · `logo-source.svg` (unmodified client file) · `fonts/afek-*.woff2`.

### `guidelines/` — foundation cards
Brand: logo lockup, mark & wordmark, iconography, RTL rules. Colors: gold ramp, brand, gradient, surfaces, text, semantic, tertiary. Type: display scale, body scale, ceremonial serif, numerals & currency. Spacing: scale, spacing in use. Shapes: radius, elevation, motion.

### `components/` — reusable primitives
- **core/** — `Button`, `IconButton`, `Card`, `Badge`, `Tag`, `Icon`
- **forms/** — `Input`, `Select`, `Checkbox`, `Radio`, `Switch`
- **navigation/** — `NavBar`, `Tabs`, `TabBar`, `Footer`
- **feedback/** — `Dialog`, `Toast`, `Tooltip`, `EmptyState`
- **brand/** — `MemberCard`, `PartnerTile`, `StatBlock`, `BenefitRow`, `SavingsMeter`

Each component ships `<Name>.jsx`, `<Name>.d.ts` (props contract) and `<Name>.prompt.md` (what & when + usage).

**Intentional additions.** No component library was supplied, so the standard set above was authored from the brief. The five `brand/` components are additions specific to this product: the club sells a physical card and a savings number, and both need a first-class primitive (`MemberCard`, `StatBlock`, `SavingsMeter`), plus the partner directory row (`PartnerTile`) and the activity row (`BenefitRow`).

### `ui_kits/`
- **`website/`** — the public marketing site: hero with the membership card, how-it-works, partner directory, plans, join form.
- **`member-area/`** — the logged-in personal area and the mobile balance view.

---

## Caveats & substitutions

- **Icon set is substituted** (Lucide). Flagged above.
- **Frank Ruhl Libre and Heebo/Assistant load from Google Fonts** — Afek is vendored locally and always wins; the Google faces are fallbacks and the ceremonial serif.
- **Afek tops out at weight 800**, so `--weight-black` is 800, not 900.
- Semantic and tertiary palettes were derived to harmonise with the gold; they are not client-supplied. Partner names, savings figures and testimonials in the UI kits are placeholders.
