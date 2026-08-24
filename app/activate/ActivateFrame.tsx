"use client";

import * as React from "react";
import { Alert } from "@/components/brand/Alert";
import { Button } from "@/components/brand/Button";
import { Icon } from "@/components/brand/Icon";
import { CARD_ACTIVATION_URL } from "@/lib/data/site";

/**
 * The operator's activation screen, framed full-bleed.
 *
 * Nothing here can reach inside the frame: it is a different origin, so the height
 * cannot be measured, the submit cannot be observed, the success state cannot be
 * read, and — the part worth being blunt about — their markup cannot be edited.
 * Every decision below follows from that.
 *
 * - **The way out is always visible.** A framed third-party screen can fail in ways
 *   this page will never hear about: the operator can refuse to be embedded, drop a
 *   redirect, or need a cookie a browser will not hand a third-party frame. The
 *   button that opens the same address in a tab sits above the frame at all times,
 *   not behind an error state that may never fire.
 * - **The load timeout is a floor, not a detector.** A browser that refuses the
 *   embed still fires `load` on its own error page, so this catches only a frame
 *   that never resolves at all.
 *
 * ## Cropping the operator's chrome
 *
 * Their screen carries its own badge, title and step indicator above the form, and
 * the club's page already says all three things in its own header. There is no way
 * to select one part of a cross-origin document — so the only technique available is
 * to render the frame taller than the visible window and slide it up behind a clip,
 * which hides the top band without touching their page.
 *
 * That is a **measurement against someone else's layout**, and it will drift the
 * first time they reflow their header. So it is off by default and lives in
 * environment variables rather than in this file: an operator can dial it in against
 * the live page, at the widths that matter, without a code change or a deploy.
 *
 *   NEXT_PUBLIC_CARD_ACTIVATION_CROP_TOP     px hidden off the top (their chrome)
 *   NEXT_PUBLIC_CARD_ACTIVATION_CROP_BOTTOM  px hidden off the bottom (their footer)
 *   NEXT_PUBLIC_CARD_ACTIVATION_FRAME_HEIGHT px the <iframe> itself renders at
 *
 * The frame height matters once anything is cropped: the point of the tall frame is
 * that their page fits inside it with no internal scrollbar, so what is clipped is
 * clipped and what is left never has to be scrolled to. Too short and the end of
 * their form is cut off with no way to scroll to it — hence the generous default,
 * and hence the button to open the page in a tab, which stays there whatever these
 * three numbers say.
 *
 * The durable fix is not here: it is the operator serving an embeddable variant of
 * the screen (`?embed=1`, their chrome omitted). Worth asking them for.
 */
const LOAD_TIMEOUT_MS = 12_000;

/** Tall enough that their form fits with no internal scrollbar. Only used when a crop is set. */
const CROPPED_FRAME_HEIGHT = 1600;

function px(value: string | undefined) {
  const n = Number(value);
  return Number.isFinite(n) && n > 0 ? Math.floor(n) : 0;
}

// Read statically so Next inlines them into the client bundle at build time.
const CROP_TOP = px(process.env.NEXT_PUBLIC_CARD_ACTIVATION_CROP_TOP);
const CROP_BOTTOM = px(process.env.NEXT_PUBLIC_CARD_ACTIVATION_CROP_BOTTOM);
const CONFIGURED_HEIGHT = px(process.env.NEXT_PUBLIC_CARD_ACTIVATION_FRAME_HEIGHT);

const cropped = CROP_TOP > 0 || CROP_BOTTOM > 0;
const frameHeight = CONFIGURED_HEIGHT || (cropped ? CROPPED_FRAME_HEIGHT : 0);
/** What is left of the frame once both crops are taken off it. */
const windowHeight = Math.max(320, frameHeight - CROP_TOP - CROP_BOTTOM);

/** Uncropped, the frame fits the viewport and scrolls its own content.
 *  Spaces around the minus are load-bearing: `calc(100svh-200px)` is invalid CSS, the
 *  declaration is dropped, and the iframe falls back to its 150px HTML default. A
 *  Tailwind arbitrary value gets away with writing it closed up because Tailwind
 *  normalises the maths on the way out; an inline style is handed to the parser as
 *  typed. */
const FLUID_HEIGHT = "clamp(680px, calc(100svh - 200px), 1080px)";

/**
 * Whether the document has finished loading, subframes included.
 *
 * This is the missing half of the frame's own `onLoad`. The iframe ships in the
 * server-rendered HTML, so the browser starts fetching it immediately — and on a
 * warm connection it finishes *before* React hydrates and attaches the handler. The
 * event is gone by then, the loaded flag never flips, and the loading panel covers a
 * form that is sitting there ready. Which is exactly what it did.
 *
 * `document.readyState` does not reach "complete" until every subframe has finished,
 * so it answers at mount the question the missed event would have; `window.load`
 * answers it later when the page is still loading. Read through
 * useSyncExternalStore because that is what this is — browser state this component
 * subscribes to, not state it owns. The server snapshot is `false`: there is no
 * document to ask, and the markup has to match what the client renders first.
 */
function subscribeToDocumentLoad(onChange: () => void) {
  window.addEventListener("load", onChange);
  return () => window.removeEventListener("load", onChange);
}
const readDocumentLoaded = () => document.readyState === "complete";
const documentLoadedOnServer = () => false;

export function ActivateFrame() {
  const [frameLoaded, setFrameLoaded] = React.useState(false);
  const [slow, setSlow] = React.useState(false);

  const documentLoaded = React.useSyncExternalStore(
    subscribeToDocumentLoad,
    readDocumentLoaded,
    documentLoadedOnServer,
  );

  // Either signal is enough, and between them every ordering is covered.
  const loaded = frameLoaded || documentLoaded;

  React.useEffect(() => {
    if (loaded) return;
    const timer = window.setTimeout(() => setSlow(true), LOAD_TIMEOUT_MS);
    return () => window.clearTimeout(timer);
  }, [loaded]);

  return (
    <div className="flex flex-col gap-4">
      {/* The frame's own chrome, held to the page's container while the frame below
          it runs the full width. It says whose screen this is — a member is about to
          type a card number into it, and a form that appears inside the club's
          layout with no attribution is a form nobody should trust. */}
      <div className="mx-auto flex w-full max-w-[var(--container-max)] flex-wrap items-center justify-between gap-3 px-[clamp(16px,4vw,24px)]">
        <span className="flex items-center gap-2 text-[length:var(--text-body-sm)] text-[var(--color-mute)]">
          <Icon name="shield-check" size={18} color="var(--color-primary-deep)" />
          ההפעלה מתבצעת במערכת המאובטחת של קהילות קארד
        </span>
        <Button
          as="a"
          href={CARD_ACTIVATION_URL}
          target="_blank"
          rel="noopener noreferrer"
          variant="tertiary"
          size="sm"
          iconAfter="external-link"
        >
          פתיחה בחלון נפרד
        </Button>
      </div>

      {slow && !loaded ? (
        <div className="mx-auto w-full max-w-[var(--container-max)] px-[clamp(16px,4vw,24px)]">
          <Alert tone="warning">
            מסך ההפעלה מתעכב בטעינה. אפשר להמתין עוד רגע, או לפתוח אותו בחלון נפרד בכפתור שלמעלה.
          </Alert>
        </div>
      ) : null}

      {/* Full width, edge to edge. Their screen centres its own form in whatever
          width it is given, so a narrow column here only squeezed their layout into
          its phone breakpoint on a desktop. Hairlines top and bottom instead of a
          box: at this width a border and a radius would be drawing a card around the
          whole viewport, which is not a card. */}
      <div
        className="relative w-full overflow-hidden border-y border-[var(--color-border)] bg-[var(--color-canvas)]"
        style={{ height: cropped ? windowHeight : undefined }}
      >
        {!loaded ? (
          <div
            aria-hidden
            className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-3 bg-[var(--color-canvas)]"
          >
            <Icon name="loader" size={28} color="var(--color-primary-deep)" className="animate-spin" />
            <span className="text-[length:var(--text-body-sm)] text-[var(--color-mute)]">
              טוענים את מסך ההפעלה…
            </span>
          </div>
        ) : null}

        <iframe
          src={CARD_ACTIVATION_URL}
          title="הפעלת הדרן קארד — מערכת קהילות קארד"
          onLoad={() => setFrameLoaded(true)}
          loading="eager"
          referrerPolicy="strict-origin-when-cross-origin"
          className="block w-full border-0 bg-[var(--color-canvas)]"
          style={{
            height: frameHeight ? `${frameHeight}px` : FLUID_HEIGHT,
            // Slides their header up behind the clip. Zero unless a crop is set.
            marginTop: CROP_TOP ? -CROP_TOP : undefined,
          }}
        />
      </div>
    </div>
  );
}
