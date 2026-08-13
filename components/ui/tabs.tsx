"use client";

import * as React from "react";
import { Tabs as TabsPrimitive } from "radix-ui";

import { cn } from "@/lib/utils";

/**
 * shadcn/ui's Tabs, restyled to components/navigation/Tabs.jsx from the design system:
 * an underline strip, 24px gaps, a hairline rule along the bottom, and a 2px
 * --color-primary-deep marker under the active tab which also goes bold ink.
 *
 * shadcn's default pill/line variants and semantic colours are replaced; Radix keeps
 * the tab/panel wiring and arrow-key navigation, which is direction-aware in RTL.
 */
function Tabs({ className, ...props }: React.ComponentProps<typeof TabsPrimitive.Root>) {
  return (
    <TabsPrimitive.Root
      data-slot="tabs"
      className={cn("flex flex-col gap-6", className)}
      {...props}
    />
  );
}

/**
 * The strip scrolls sideways rather than wrapping, which is right for tabs — but a
 * plain `overflow-x-auto` left the last tab sliced through mid-word with a scrollbar
 * as the only hint. `hc-rail` hides that scrollbar, snapping gives each tab a resting
 * position, and the gap tightens on a phone so four tabs come closer to fitting
 * outright. Callers on a full-width page can add `hc-rail-bleed` to run the strip to
 * the screen edges, which is what makes the overflow legible.
 */
function TabsList({ className, ...props }: React.ComponentProps<typeof TabsPrimitive.List>) {
  return (
    <TabsPrimitive.List
      data-slot="tabs-list"
      className={cn(
        "hc-rail flex snap-x snap-mandatory gap-[var(--space-lg)]",
        "border-b border-[var(--color-border)] min-[640px]:gap-[var(--space-xl)]",
        "font-[family-name:var(--font-ui)]",
        className,
      )}
      {...props}
    />
  );
}

function TabsTrigger({ className, ...props }: React.ComponentProps<typeof TabsPrimitive.Trigger>) {
  return (
    <TabsPrimitive.Trigger
      data-slot="tabs-trigger"
      className={cn(
        "-mb-px flex-none snap-start cursor-pointer border-b-2 border-transparent bg-transparent",
        // inline-flex + items-end so the 44px touch target grows upward and the
        // active underline stays tight under the label.
        "inline-flex min-h-11 items-end pb-3 whitespace-nowrap",
        // --color-body, not --color-mute: an inactive tab is an interactive
        // control, and --color-mute is 3.67:1 on canvas, below WCAG AA. See
        // PROPOSED_ADDITIONS.md §1 — the token itself is left alone here.
        "text-[length:var(--text-body-md)] font-medium text-[var(--color-body)]",
        "transition-[color,border-color] duration-[var(--duration-base)] ease-[var(--ease-out)]",
        "hover:text-[var(--color-ink)]",
        "data-[state=active]:border-[var(--color-primary-deep)] data-[state=active]:font-bold data-[state=active]:text-[var(--color-ink)]",
        className,
      )}
      {...props}
    />
  );
}

function TabsContent({ className, ...props }: React.ComponentProps<typeof TabsPrimitive.Content>) {
  return (
    <TabsPrimitive.Content
      data-slot="tabs-content"
      className={cn("flex-1 outline-none", className)}
      {...props}
    />
  );
}

export { Tabs, TabsList, TabsTrigger, TabsContent };
