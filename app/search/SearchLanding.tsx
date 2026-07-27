"use client";

import * as React from "react";
import { Button } from "@/components/brand/Button";
import { useSearch } from "@/components/site/SearchDialog";

/**
 * The /search landing page.
 *
 * In the prototype this screen ships with the dialog already open, because the dialog
 * *is* the page's subject. Here the dialog is global chrome, so opening it on mount
 * reproduces that while keeping a real page behind it to close back to.
 */
export function SearchLanding() {
  const search = useSearch();
  const opened = React.useRef(false);

  React.useEffect(() => {
    if (opened.current) return;
    opened.current = true;
    search.open();
  }, [search]);

  return (
    <div className="flex flex-wrap items-center gap-3">
      <Button size="lg" icon="search" onClick={search.open}>
        פתיחת החיפוש
      </Button>
      <span className="text-[length:var(--text-body-sm)] text-[var(--color-mute)]">
        או הקישו{" "}
        <b className="font-[family-name:var(--font-ui)] text-[var(--color-ink)]">/</b> מכל מקום בעמוד
      </span>
    </div>
  );
}
