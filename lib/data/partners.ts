/**
 * The partner directory for /benefits — verbatim from PARTNERS in Benefits.dc.html.
 * The prototype's tiles are titled by category, not by trade name: no partner names
 * or logos were supplied with the handoff.
 */
export type Partner = {
  category: string;
  city: string;
  branches: string;
};

export const PARTNERS: Partner[] = [
  { category: "רשת מזון ומכולת", city: "בני ברק", branches: "4 סניפים" },
  { category: "רשת מזון ומכולת", city: "ירושלים", branches: "7 סניפים" },
  { category: "רשת מזון ומכולת", city: "בית שמש", branches: "2 סניפים" },
  { category: "מכולת שכונתית", city: "מודיעין עילית", branches: "סניף אחד" },
  { category: "בשר, עוף ודגים", city: "בני ברק", branches: "3 סניפים" },
  { category: "בשר, עוף ודגים", city: "ירושלים", branches: "סניף אחד" },
  { category: "ביגוד והנעלה", city: "בני ברק", branches: "2 סניפים" },
  { category: "ביגוד והנעלה", city: "אלעד", branches: "סניף אחד" },
  { category: "ספרי קודש ויודאיקה", city: "ירושלים", branches: "3 סניפים" },
  { category: "ספרי קודש ויודאיקה", city: "בני ברק", branches: "סניף אחד" },
  { category: "כלי בית וריהוט", city: "בית שמש", branches: "2 סניפים" },
  { category: "כלי בית וריהוט", city: "ביתר עילית", branches: "סניף אחד" },
  { category: "צעצועים ומתנות", city: "בני ברק", branches: "סניף אחד" },
  { category: "פארמה וטיפוח", city: "ירושלים", branches: "4 סניפים" },
  { category: "אופטיקה", city: "מודיעין עילית", branches: "סניף אחד" },
  { category: "צרכי כתיבה ומשרד", city: "אלעד", branches: "2 סניפים" },
];

export const PARTNER_CATEGORIES = [
  "הכל",
  "רשת מזון ומכולת",
  "בשר, עוף ודגים",
  "ביגוד והנעלה",
  "ספרי קודש ויודאיקה",
  "כלי בית וריהוט",
  "פארמה וטיפוח",
];

export const CITY_OPTIONS = [
  { value: "all", label: "כל הערים" },
  { value: "בני ברק", label: "בני ברק" },
  { value: "ירושלים", label: "ירושלים" },
  { value: "בית שמש", label: "בית שמש" },
  { value: "מודיעין עילית", label: "מודיעין עילית" },
  { value: "אלעד", label: "אלעד" },
  { value: "ביתר עילית", label: "ביתר עילית" },
];

/** Icon per category, for the tile placeholder where a logo would sit. */
export const CATEGORY_ICON: Record<string, string> = {
  "רשת מזון ומכולת": "shopping-cart",
  "מכולת שכונתית": "store",
  "בשר, עוף ודגים": "utensils",
  "ביגוד והנעלה": "shirt",
  "ספרי קודש ויודאיקה": "book",
  "כלי בית וריהוט": "package",
  "צעצועים ומתנות": "gift",
  "פארמה וטיפוח": "sparkles",
  אופטיקה: "search",
  "צרכי כתיבה ומשרד": "pencil",
};
