"use client";

import * as React from "react";
import { Button } from "@/components/brand/Button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { CallbackForm } from "./CallbackForm";

/**
 * The callback request, in a dialog — the same pattern the merchant enquiry
 * uses, and for the same reason: the page makes its case, and the fields appear
 * when the reader has decided to be called.
 */
export function CallbackDialog({
  children,
  variant = "primary",
  size = "lg",
  className,
}: {
  children: React.ReactNode;
  variant?: React.ComponentProps<typeof Button>["variant"];
  size?: React.ComponentProps<typeof Button>["size"];
  className?: string;
}) {
  const [open, setOpen] = React.useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant={variant} size={size} className={className}>
          {children}
        </Button>
      </DialogTrigger>

      <DialogContent className="max-h-[calc(100dvh-2rem)] gap-6 overflow-y-auto p-[clamp(20px,4vw,32px)] sm:max-w-[560px]">
        <DialogHeader>
          <DialogTitle className="font-[family-name:var(--font-display)] text-[clamp(21px,4vw,28px)] leading-[1.15] font-extrabold">
            שנחזור אליכם בטלפון?
          </DialogTitle>
          <DialogDescription className="text-[length:var(--text-body-md)] leading-[1.6] text-[var(--color-body)]">
            משאירים שם ומספר, ונציג הדרן חוזר אליכם ומסביר על ההצטרפות להדרן ועל הכרטיס שמגיע איתה.
          </DialogDescription>
        </DialogHeader>

        <CallbackForm onClose={() => setOpen(false)} />
      </DialogContent>
    </Dialog>
  );
}
