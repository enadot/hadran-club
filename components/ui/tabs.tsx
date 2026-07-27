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

function TabsList({ className, ...props }: React.ComponentProps<typeof TabsPrimitive.List>) {
  return (
    <TabsPrimitive.List
      data-slot="tabs-list"
      className={cn(
        "flex gap-[var(--space-xl)] overflow-x-auto border-b border-[var(--color-border)]",
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
        "-mb-px cursor-pointer border-b-2 border-transparent bg-transparent pb-3 whitespace-nowrap",
        "text-[length:var(--text-body-md)] font-medium text-[var(--color-mute)]",
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
