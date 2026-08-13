"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Icon } from "@/components/brand/Icon";
import { IconButton } from "@/components/brand/IconButton";
import { Button } from "@/components/brand/Button";
import { useSearch } from "./SearchDialog";
import { NAV_LINKS, SUPPORT_HOURS, SUPPORT_PHONE } from "@/lib/data/site";
import { cn } from "@/lib/utils";

/**
 * Mirrors SiteNav.dc.html: above 1060px the desktop NavBar, below it a compact bar
 * plus a drawer that slides in from the inline-start edge.
 *
 * The 1060px switch is a matchMedia query in the prototype rather than a CSS
 * breakpoint, because the two layouts are different component trees. That is kept —
 * it also means only one of the two is ever mounted.
 */
const DESKTOP_QUERY = "(min-width: 1060px)";

export function SiteNav() {
  const pathname = usePathname();
  const router = useRouter();
  const search = useSearch();

  // Start undefined so neither tree renders until the query is known, which avoids
  // a flash of the wrong nav on first paint.
  const [isDesktop, setIsDesktop] = React.useState<boolean | null>(null);
  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    const mq = window.matchMedia(DESKTOP_QUERY);
    const sync = () => {
      setIsDesktop(mq.matches);
      setOpen(false);
    };
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  // Esc closes the drawer; body scroll is locked while it is open.
  React.useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  const isActive = (href: string, external?: boolean) =>
    external ? false : href === "/" ? pathname === "/" : pathname.startsWith(href);

  const goActivate = () => {
    setOpen(false);
    router.push("/activate");
  };

  // Reserve the nav's height before the media query resolves so the page below does
  // not jump. Desktop is 86px, mobile 65px; 86px is the safe reservation.
  if (isDesktop === null) {
    return <div className="h-[65px] min-[1060px]:h-[86px]" aria-hidden="true" />;
  }

  if (isDesktop) {
    return (
      <header className="sticky top-0 z-40 border-b border-[var(--color-border)] bg-[var(--color-canvas)] font-[family-name:var(--font-ui)]">
        <div className="mx-auto flex max-w-[var(--container-max)] items-center gap-[var(--space-2xl)] px-[var(--space-xl)] py-[var(--space-md)]">
          <Link href="/" aria-label="הדרן קלאב · דף הבית" className="flex items-center">
            <img src="/logo-lockup.svg" alt="הדרן קלאב" className="h-[38px]" />
          </Link>

          <nav className="flex flex-1 items-center gap-[var(--space-xl)]">
            {NAV_LINKS.map((l) => {
              const on = isActive(l.href, l.external);
              const className = cn(
                "whitespace-nowrap border-b-2 pb-0.5 text-[length:var(--text-body-sm)] font-semibold no-underline",
                "transition-colors duration-[var(--duration-fast)] ease-[var(--ease-out)]",
                on
                  ? "border-[var(--color-primary-deep)] text-[var(--color-ink)]"
                  : "border-transparent text-[var(--color-body)] hover:text-[var(--color-ink)]",
              );

              if (l.external) {
                return (
                  <a
                    key={l.label}
                    href={l.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={cn(className, "inline-flex items-center gap-1.5")}
                  >
                    {l.label}
                    <Icon name="external-link" size={14} color="var(--color-mute)" />
                  </a>
                );
              }

              return (
                <Link key={l.label} href={l.href} aria-current={on ? "page" : undefined} className={className}>
                  {l.label}
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-[var(--space-md)]">
            <IconButton icon="search" label="חיפוש" variant="ghost" size="sm" onClick={search.open} />
            <Button size="sm" onClick={goActivate}>
              קבלת כרטיס
            </Button>
          </div>
        </div>
      </header>
    );
  }

  return (
    <>
      <header className="sticky top-0 z-40 border-b border-[var(--color-border)] bg-[var(--color-canvas)] font-[family-name:var(--font-ui)]">
        <div className="flex items-center justify-between gap-3 px-4 py-2.5">
          <Link href="/" aria-label="הדרן קלאב · דף הבית" className="flex items-center">
            <img src="/logo-lockup.svg" alt="הדרן קלאב" className="h-8" />
          </Link>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={search.open}
              aria-label="חיפוש"
              className="grid size-11 place-items-center rounded-full text-[var(--color-ink)]"
            >
              <Icon name="search" size={22} />
            </button>
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-label="תפריט"
              aria-expanded={open}
              className="grid size-11 cursor-pointer place-items-center rounded-full border border-[var(--color-border)] bg-[var(--color-canvas)] text-[var(--color-ink)] transition-[background-color] duration-[var(--duration-base)] ease-[var(--ease-out)] hover:bg-[var(--color-canvas-soft)]"
            >
              <Icon name={open ? "x" : "menu"} size={24} />
            </button>
          </div>
        </div>
      </header>

      {open ? (
        <>
          <div
            className="hc-scrim fixed inset-0 z-[70] bg-[rgba(18,16,11,.45)]"
            onClick={() => setOpen(false)}
          />
          <aside
            role="dialog"
            aria-modal="true"
            aria-label="תפריט האתר"
            className="hc-drawer fixed inset-y-0 start-0 z-[71] flex w-[min(86vw,340px)] flex-col bg-[var(--color-canvas)] font-[family-name:var(--font-ui)] shadow-[var(--shadow-overlay)]"
          >
            <div className="flex items-center justify-between gap-3 border-b border-[var(--color-border)] px-[18px] py-3.5">
              <img src="/logo-lockup.svg" alt="הדרן קלאב" className="h-8" />
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="סגירת התפריט"
                className="grid size-11 cursor-pointer place-items-center rounded-full border border-[var(--color-border)] bg-[var(--color-canvas)] text-[var(--color-ink)]"
              >
                <Icon name="x" size={22} />
              </button>
            </div>

            <nav className="flex-1 overflow-y-auto py-2">
              {NAV_LINKS.map((l) => {
                const on = isActive(l.href, l.external);
                const className = cn(
                  "flex min-h-14 items-center gap-3.5 border-s-[3px] px-[18px] py-2",
                  "text-lg text-[var(--color-ink)] no-underline",
                  on
                    ? "border-s-[var(--color-primary)] bg-[var(--color-canvas-soft)] font-bold"
                    : "border-s-transparent bg-transparent font-medium",
                );
                const body = (
                  <>
                    <span className="grid size-9 flex-none place-items-center rounded-full bg-[var(--color-canvas-soft)] text-[var(--color-primary-deep)]">
                      <Icon name={l.icon} size={20} />
                    </span>
                    <span className="flex-1">{l.label}</span>
                    <Icon
                      name={l.external ? "external-link" : "chevron-left"}
                      size={18}
                      color="var(--color-mute)"
                    />
                  </>
                );

                if (l.external) {
                  return (
                    <a
                      key={l.label}
                      href={l.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => setOpen(false)}
                      className={className}
                    >
                      {body}
                    </a>
                  );
                }

                return (
                  <Link
                    key={l.label}
                    href={l.href}
                    onClick={() => setOpen(false)}
                    aria-current={on ? "page" : undefined}
                    className={className}
                  >
                    {body}
                  </Link>
                );
              })}
            </nav>

            <div className="flex flex-col gap-3 border-t border-[var(--color-border)] bg-[var(--color-canvas-soft)] p-[18px]">
              <Button size="lg" fullWidth onClick={goActivate}>
                קבלת כרטיס
              </Button>
              <a
                href={`tel:${SUPPORT_PHONE.replace(/-/g, "")}`}
                className="flex min-h-11 items-center justify-center gap-2 text-[15px] font-semibold text-[var(--color-primary-deep)] no-underline"
              >
                <Icon name="phone" size={18} />
                <span className="tnum ltr">{SUPPORT_PHONE}</span>
              </a>
              <span className="text-center text-[length:var(--text-caption)] text-[var(--color-mute)]">
                {SUPPORT_HOURS}
              </span>
            </div>
          </aside>
        </>
      ) : null}
    </>
  );
}
