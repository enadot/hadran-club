"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Icon } from "@/components/brand/Icon";
import { IconButton } from "@/components/brand/IconButton";
import { Button } from "@/components/brand/Button";
import { cn } from "@/lib/utils";
import {
  CHIP_QUERY,
  RECENT_SEARCHES,
  SEARCH_CHIPS,
  searchAll,
  type SearchResult,
} from "@/lib/data/search";

type SearchContextValue = { open: () => void; close: () => void; isOpen: boolean };

const SearchContext = React.createContext<SearchContextValue | null>(null);

export function useSearch() {
  const ctx = React.useContext(SearchContext);
  if (!ctx) throw new Error("useSearch must be used inside <SearchProvider>");
  return ctx;
}

/**
 * The global site search from Search.dc.html — a centred overlay opened from the nav
 * or with `/` from anywhere. Arrow keys move the active row, Enter opens it, Esc
 * closes. Chips stand in for a query; clearing the query brings back the recent list.
 */
export function SearchProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [isOpen, setIsOpen] = React.useState(false);
  const [query, setQuery] = React.useState("");
  const [chip, setChip] = React.useState<string>("הכל");
  const [active, setActive] = React.useState(0);
  const inputRef = React.useRef<HTMLInputElement>(null);
  const restoreFocus = React.useRef<HTMLElement | null>(null);

  const open = React.useCallback(() => {
    restoreFocus.current = document.activeElement as HTMLElement | null;
    setIsOpen(true);
  }, []);
  const close = React.useCallback(() => {
    setIsOpen(false);
    restoreFocus.current?.focus();
  }, []);

  // The effective query: what was typed, else whatever the selected chip stands for.
  const effectiveQuery = (query.trim() || CHIP_QUERY[chip] || "").trim();
  const groups = React.useMemo(() => searchAll(effectiveQuery), [effectiveQuery]);
  const flat = React.useMemo<SearchResult[]>(
    () => groups.flatMap((g) => g.items),
    [groups],
  );

  const showRecent = !effectiveQuery;
  const isEmpty = !!effectiveQuery && flat.length === 0;

  // `/` opens from anywhere — unless the caret is already in a text field.
  React.useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement | null;
      const typing =
        !!target &&
        (target.tagName === "INPUT" ||
          target.tagName === "TEXTAREA" ||
          target.tagName === "SELECT" ||
          target.isContentEditable);

      if (e.key === "/" && !isOpen && !typing) {
        e.preventDefault();
        open();
        return;
      }
      if (!isOpen) return;

      if (e.key === "Escape") {
        e.preventDefault();
        close();
      } else if (e.key === "ArrowDown" || e.key === "ArrowUp") {
        e.preventDefault();
        if (!flat.length) return;
        const d = e.key === "ArrowDown" ? 1 : -1;
        setActive((a) => (a + d + flat.length) % flat.length);
      } else if (e.key === "Enter") {
        const it = flat[active];
        if (it) {
          e.preventDefault();
          close();
          router.push(it.href);
        }
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen, flat, active, open, close, router]);

  // Focus the field on open and lock the page behind the overlay.
  React.useEffect(() => {
    if (!isOpen) {
      document.body.style.overflow = "";
      return;
    }
    document.body.style.overflow = "hidden";
    const t = window.setTimeout(() => inputRef.current?.focus(), 60);
    return () => {
      window.clearTimeout(t);
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const value = React.useMemo(() => ({ open, close, isOpen }), [open, close, isOpen]);

  // Arrow-key selection runs across the flattened result list, so each group needs the
  // index its first item occupies in that list.
  const groupOffsets = React.useMemo(
    () =>
      groups.map((_, i) => groups.slice(0, i).reduce((n, g) => n + g.items.length, 0)),
    [groups],
  );

  return (
    <SearchContext.Provider value={value}>
      {children}

      {isOpen ? (
        // On a phone this is a sheet, not a floating box: the original 51px top
        // inset plus a 46vh result list left it hovering over half a screen of
        // dimmed page with only three results visible.
        <div
          onClick={close}
          className="hc-scrim fixed inset-0 z-[60] flex items-start justify-center bg-[rgba(18,16,11,.45)] px-[clamp(8px,4vw,24px)] pt-[clamp(12px,9.8vw,88px)] pb-[clamp(8px,2vw,24px)]"
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-label="חיפוש באתר"
            onClick={(e) => e.stopPropagation()}
            className="hc-modal flex max-h-full w-full max-w-[660px] flex-col overflow-hidden rounded-[var(--radius-xl)] bg-[var(--color-canvas)] shadow-[var(--shadow-overlay)]"
          >
            {/* Query row */}
            <div className="flex items-center gap-3 border-b border-[var(--color-border)] px-[clamp(16px,4vw,24px)] py-4 min-[640px]:gap-3.5 min-[640px]:py-5">
              <Icon name="search" size={22} color="var(--color-primary-deep)" />
              <input
                ref={inputRef}
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setActive(0);
                }}
                placeholder="שם בית עסק, קטגוריה, עיר או שאלה"
                aria-label="חיפוש"
                className="min-w-0 flex-1 border-none bg-transparent font-[family-name:var(--font-ui)] text-[clamp(16px,2.5vw,20px)] font-medium text-[var(--color-ink)] outline-none placeholder:text-[var(--color-mute)]"
              />
              {query ? (
                <IconButton
                  icon="x"
                  label="ניקוי החיפוש"
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    setQuery("");
                    setChip("הכל");
                    setActive(0);
                    inputRef.current?.focus();
                  }}
                />
              ) : null}
              {/* "Esc" means nothing on a touch screen and there is no other way out
                  of the sheet there but tapping the scrim, so a phone gets a real
                  close button and a pointer device keeps the key hint. */}
              <button
                type="button"
                onClick={close}
                aria-label="סגירת החיפוש"
                className="grid size-11 flex-none place-items-center rounded-full border border-[var(--color-border)] text-[var(--color-ink)] min-[640px]:hidden"
              >
                <Icon name="x" size={20} />
              </button>
              <span className="hidden whitespace-nowrap rounded-[var(--radius-sm)] border border-[var(--color-border)] px-2 py-1 text-[length:var(--text-caption)] font-semibold text-[var(--color-mute)] min-[640px]:inline">
                Esc
              </span>
            </div>

            {/* Chips */}
            <div className="hc-rail hc-rail-gutter flex snap-x gap-2 border-b border-[var(--color-border)] py-3.5">
              {SEARCH_CHIPS.map((label) => {
                const on = chip === label && !query;
                return (
                  <button
                    key={label}
                    type="button"
                    onClick={() => {
                      setChip(label);
                      setQuery("");
                      setActive(0);
                    }}
                    className={cn(
                      "flex-none snap-start cursor-pointer rounded-full border px-3.5 py-2",
                      "font-[family-name:var(--font-ui)] text-[length:var(--text-body-sm)] font-semibold",
                      "transition-[background-color,color,border-color] duration-[var(--duration-base)] ease-[var(--ease-out)]",
                      on
                        ? "border-[var(--color-primary)] bg-[var(--color-primary)] text-[var(--color-ink)]"
                        : "border-[var(--color-border)] bg-[var(--color-canvas)] text-[var(--color-body)] hover:bg-[var(--color-canvas-soft)]",
                    )}
                  >
                    {label}
                  </button>
                );
              })}
            </div>

            {/* Results. `flex-1` lets the list take whatever the sheet has left on a
                phone; the 46vh cap is kept from 640px up, where the dialog floats. */}
            <div className="hc-scroll min-h-[160px] flex-1 overflow-y-auto py-2 min-[640px]:max-h-[46vh] min-[640px]:flex-none">
              {showRecent ? (
                <>
                  <div className="flex items-center justify-between gap-3 px-[clamp(16px,4vw,24px)] pt-2.5 pb-1">
                    <span className="text-[length:var(--text-caption)] font-bold tracking-[var(--tracking-wide)] text-[var(--color-mute)]">
                      חיפושים אחרונים
                    </span>
                  </div>
                  {RECENT_SEARCHES.map((label) => (
                    <button
                      key={label}
                      type="button"
                      onClick={() => {
                        setQuery(label);
                        setChip("הכל");
                        setActive(0);
                        inputRef.current?.focus();
                      }}
                      className="flex w-full cursor-pointer items-center gap-3 border-none bg-transparent px-[clamp(16px,4vw,24px)] py-3 text-start font-[family-name:var(--font-ui)] text-[length:var(--text-body-md)] text-[var(--color-ink)] hover:bg-[var(--color-canvas-soft)]"
                    >
                      <Icon name="history" size={18} color="var(--color-mute)" />
                      <span>{label}</span>
                    </button>
                  ))}
                </>
              ) : null}

              {groups.map((group, gi) => (
                <div key={group.kind}>
                  <div className="flex items-center gap-2.5 px-[clamp(16px,4vw,24px)] pt-3.5 pb-1.5">
                    <span className="text-[length:var(--text-caption)] font-bold tracking-[var(--tracking-wide)] text-[var(--color-mute)]">
                      {group.title}
                    </span>
                    <span className="tnum text-[length:var(--text-caption)] font-semibold text-[var(--color-mute)]">
                      {group.items.length}
                    </span>
                  </div>
                  {group.items.map((it, i) => {
                    const idx = groupOffsets[gi] + i;
                    const on = idx === active;
                    return (
                      <Link
                        key={`${group.kind}-${it.name}`}
                        href={it.href}
                        onClick={close}
                        onMouseEnter={() => setActive(idx)}
                        className={cn(
                          "flex items-center gap-3.5 px-[clamp(16px,4vw,24px)] py-3 no-underline",
                          "border-s-[3px] text-[var(--color-ink)]",
                          on
                            ? "border-s-[var(--color-primary)] bg-[var(--color-canvas-soft)]"
                            : "border-s-transparent bg-transparent",
                        )}
                      >
                        <span className="grid size-11 flex-none place-items-center rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-canvas-soft)] font-[family-name:var(--font-display)] text-base font-extrabold text-[var(--color-primary-deep)]">
                          {it.initials}
                        </span>
                        <span className="flex min-w-0 flex-1 flex-col gap-[3px]">
                          <b className="text-[clamp(15px,2.2vw,17px)] leading-[1.25] font-bold">
                            {it.name}
                          </b>
                          <span className="text-[length:var(--text-body-sm)] text-[var(--color-body)]">
                            {it.meta}
                          </span>
                        </span>
                        {it.benefitLabel ? (
                          <span className="hidden flex-none text-[length:var(--text-body-sm)] font-semibold text-[var(--color-primary-deep)] min-[480px]:inline">
                            {it.benefitLabel}
                          </span>
                        ) : null}
                        <Icon name="chevron-left" size={18} color="var(--color-mute)" />
                      </Link>
                    );
                  })}
                </div>
              ))}

              {isEmpty ? (
                <div className="flex flex-col items-center gap-3.5 px-[clamp(16px,4vw,24px)] py-[clamp(24px,3.6vw,32px)] text-center">
                  <span className="grid size-14 place-items-center rounded-full bg-[var(--gold-50)]">
                    <Icon name="store" size={26} color="var(--color-primary-deep)" />
                  </span>
                  <b className="font-[family-name:var(--font-display)] text-[clamp(18px,2.8vw,22px)]">
                    לא מצאנו התאמה ל״{effectiveQuery}״
                  </b>
                  <p className="m-0 max-w-[380px] text-[length:var(--text-body-md)] leading-[1.6] text-[var(--color-body)]">
                    אפשר לחפש לפי קטגוריה או עיר, או לעבור לרשימת בתי העסק המלאה ולסנן משם.
                  </p>
                  <div className="flex flex-wrap justify-center gap-2.5">
                    <Button as="a" href="/benefits" variant="tertiary" onClick={close}>
                      לרשימת בתי העסק
                    </Button>
                    <Button as="a" href="/merchants" variant="ghost" onClick={close}>
                      הצטרפות בית עסק
                    </Button>
                  </div>
                </div>
              ) : null}
            </div>

            {/* Keyboard legend — hidden on a phone, where it is a row of instructions
                for keys the reader does not have. The link to the full list stays. */}
            <div className="flex flex-none items-center justify-between gap-4 border-t border-[var(--color-border)] bg-[var(--color-canvas-soft)] px-[clamp(16px,4vw,24px)] py-3.5">
              <div className="hidden flex-wrap gap-4 text-[length:var(--text-caption)] text-[var(--color-mute)] min-[640px]:flex">
                <span className="flex items-center gap-1.5">
                  <b className="font-bold text-[var(--color-ink)]">↑ ↓</b> ניווט
                </span>
                <span className="flex items-center gap-1.5">
                  <b className="font-bold text-[var(--color-ink)]">Enter</b> פתיחה
                </span>
              </div>
              <Link
                href="/benefits"
                onClick={close}
                className="text-[13px] font-bold text-[var(--color-primary-deep)] no-underline"
              >
                לרשימת בתי העסק המלאה
              </Link>
            </div>
          </div>
        </div>
      ) : null}
    </SearchContext.Provider>
  );
}
