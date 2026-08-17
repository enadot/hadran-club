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
import { MerchantJoinForm } from "./MerchantJoinForm";

/**
 * The merchant enquiry, in a dialog.
 *
 * The form used to occupy a full band at the foot of the page, which meant the page
 * ended on a wall of fields whether or not the reader had decided anything. It opens
 * from a button now: the page argues its case, and the form appears when a business
 * owner is ready to fill it in.
 *
 * Radix takes the focus trap, the Esc handler and the scroll lock; RtlProvider feeds
 * it the direction, so the close button sits on the correct side in Hebrew.
 */
export function MerchantJoinDialog({
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

      {/* Wider than the shadcn default: the form pairs its fields two to a row from
          560px up, and at sm:max-w-lg they never get there. The dialog scrolls
          inside itself rather than growing past a short viewport. */}
      <DialogContent className="max-h-[calc(100dvh-2rem)] gap-6 overflow-y-auto p-[clamp(20px,4vw,32px)] sm:max-w-[620px]">
        <DialogHeader>
          <DialogTitle className="font-[family-name:var(--font-display)] text-[clamp(21px,4vw,28px)] leading-[1.15] font-extrabold">
            נשמח לשמוע על העסק
          </DialogTitle>
          <DialogDescription className="text-[length:var(--text-body-md)] leading-[1.6] text-[var(--color-body)]">
            משאירים פרטים ונציג המועדון חוזר אליכם בתוך יום עסקים אחד. אין עלות הצטרפות ואין
            התחייבות לתקופה.
          </DialogDescription>
        </DialogHeader>

        <MerchantJoinForm onClose={() => setOpen(false)} />
      </DialogContent>
    </Dialog>
  );
}
