"use client";

import * as React from "react";
import { Accordion as AccordionPrimitive } from "radix-ui";

import { cn } from "@/lib/utils";

/**
 * shadcn/ui's Accordion, restyled to the design system.
 *
 * The FAQ in Faq.dc.html is not the default shadcn look: each question is a
 * self-contained box that turns pale gold with an ink border when open, and
 * the affordance is a +/− sign rather than a chevron. The default border-b + chevron
 * markup is therefore replaced; the Radix behaviour (single-open, collapsible,
 * roving focus, correct ARIA) is what is being kept.
 */
function Accordion({ className, ...props }: React.ComponentProps<typeof AccordionPrimitive.Root>) {
  return (
    <AccordionPrimitive.Root
      data-slot="accordion"
      className={cn("flex flex-col gap-3", className)}
      {...props}
    />
  );
}

function AccordionItem({
  className,
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Item>) {
  return (
    <AccordionPrimitive.Item
      data-slot="accordion-item"
      className={cn(
        // The card radius, not a 20px one-off: an accordion item is a card that
        // opens, and it is the only surface on the site that used its own value.
        "rounded-[var(--radius-xl)] border px-[clamp(20px,4vw,28px)] py-[clamp(18px,3.5vw,24px)]",
        "transition-[background-color,border-color] duration-[var(--duration-fast)] ease-[var(--ease-out)]",
        "border-[var(--color-border)] bg-[var(--color-canvas)]",
        "data-[state=open]:border-[var(--color-ink)] data-[state=open]:bg-[var(--color-canvas-pale)]",
        className,
      )}
      {...props}
    />
  );
}

function AccordionTrigger({
  className,
  children,
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Trigger>) {
  return (
    <AccordionPrimitive.Header className="flex">
      <AccordionPrimitive.Trigger
        data-slot="accordion-trigger"
        className={cn(
          "group flex w-full cursor-pointer items-center justify-between gap-4",
          "border-none bg-transparent p-0 text-start outline-none",
          "text-lg leading-[1.4] font-bold text-[var(--color-ink)]",
          className,
        )}
        {...props}
      >
        {children}
        {/* +/− rather than a rotating chevron, as the design specifies. */}
        <span
          aria-hidden="true"
          className="flex-shrink-0 text-2xl leading-none font-bold text-[var(--color-primary-deep)]"
        >
          <span className="group-data-[state=open]:hidden">+</span>
          <span className="hidden group-data-[state=open]:inline">−</span>
        </span>
      </AccordionPrimitive.Trigger>
    </AccordionPrimitive.Header>
  );
}

function AccordionContent({
  className,
  children,
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Content>) {
  return (
    <AccordionPrimitive.Content
      data-slot="accordion-content"
      className="overflow-hidden data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down"
      {...props}
    >
      <p
        className={cn(
          "mt-3.5 mb-0 text-[length:var(--text-body-md)] leading-[1.65] text-[var(--color-body)]",
          className,
        )}
      >
        {children}
      </p>
    </AccordionPrimitive.Content>
  );
}

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent };
