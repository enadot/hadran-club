/**
 * The home page contact form — its heading and its one picker.
 *
 * The subject a visitor picks is what routes the enquiry: two of the three
 * options are the paths the site already has an answer for (ordering a card,
 * joining as a business), and the third opens a free-text field rather than
 * sending someone to look for a different form.
 */
export const CONTACT = {
  eyebrow: "יצירת קשר",
  title: "מדברים איתנו",
  lead: "משאירים פרטים, ונציג המועדון חוזר אליכם בתוך יום עסקים אחד.",
  /** The three routes an enquiry can take. `other` opens the free-text field. */
  subjects: [
    { value: "card", label: "מעוניין בכרטיס" },
    { value: "business", label: "אני רוצה להצטרף כעסק" },
    { value: "other", label: "נושא אחר" },
  ],
  /** The value that opens the message field. Kept here so the form has one source. */
  otherValue: "other",
  messageLabel: "ספרו לנו כיצד נוכל לעזור",
  cta: "שליחת הפנייה",
  /** Shown in the fine print under the button. */
  note: "הפרטים משמשים ליצירת קשר בנוגע לפנייה בלבד. בכפוף לתקנון המועדון. ט.ל.ח.",
};
