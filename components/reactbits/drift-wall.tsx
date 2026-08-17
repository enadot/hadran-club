"use client";

import * as React from "react";
import "./drift-wall.css";

/**
 * React Bits — DriftWall. A wall of tiles drifting in perspective, columns moving
 * against each other, with a pointer-follow tilt.
 *
 * Ported to TypeScript and given a `decorative` mode. The published component makes
 * every tile focusable with `role="button"`, which is right for a gallery and wrong
 * for a backdrop: behind the hero it would put sixty tab stops in front of the first
 * real control on the page. In decorative mode the tiles are inert spans and the
 * whole wall is hidden from assistive technology, while the drift and the parallax
 * still run.
 *
 * Motion respects prefers-reduced-motion: the wall composes and then holds still.
 */

export type DriftWallItem = {
  image: string;
  title?: string;
  href?: string;
};

export type DriftWallProps = {
  items?: DriftWallItem[];
  columns?: number;
  tileWidth?: number;
  tileHeight?: number;
  gap?: number;
  radius?: number;
  /** Perspective pitch of the wall (rotateX, degrees). */
  tilt?: number;
  /** Perspective yaw of the wall (rotateY, degrees). */
  turn?: number;
  /** In-plane rotation (rotateZ, degrees). */
  roll?: number;
  perspective?: number;
  /** How far the wall sits back from the viewer, in pixels. */
  depth?: number;
  /** Base drift speed in pixels per second. */
  speed?: number;
  direction?: "up" | "down";
  /** How much column speeds differ from each other (0–1). */
  variance?: number;
  /** Pointer-follow tilt strength; 0 disables it. */
  parallax?: number;
  pauseOnHover?: boolean;
  /** How far a hovered tile lifts toward the viewer, in pixels. */
  lift?: number;
  /** Strength of the edge and depth dissolve (0–1). */
  fade?: number;
  /** Resting opacity of unhovered tiles (0–1). */
  dim?: number;
  grayscale?: boolean;
  /** Tint laid over resting tiles, cleared on hover. */
  overlayColor?: string;
  /** Resting opacity of that tint. */
  overlayOpacity?: number;
  /** object-fit for a tile image. `contain` for logos, `cover` for photography. */
  fit?: "cover" | "contain";
  /** The plate a tile sits on. */
  tileBackground?: string;
  /** Inset around the image inside its plate, in pixels. */
  padding?: number;
  /** Backdrop mode: inert tiles, hidden from assistive technology. */
  decorative?: boolean;
  className?: string;
  style?: React.CSSProperties;
};

const DEFAULT_ITEMS: DriftWallItem[] = Array.from({ length: 15 }, (_, i) => {
  const ids = [1015, 1025, 1039, 1043, 1044, 1050, 1062, 1069, 1074, 1080, 1084, 106, 110, 133, 164];
  return { image: `https://picsum.photos/id/${ids[i % ids.length]}/600/400`, title: `Tile ${i + 1}` };
});

const REDUCED_MOTION_QUERY = "(prefers-reduced-motion: reduce)";

/** Read as an external store rather than state-in-an-effect, so the first client
 *  render already knows the answer and the server render has a defined one. */
const subscribeReducedMotion = (onChange: () => void) => {
  const mq = window.matchMedia(REDUCED_MOTION_QUERY);
  mq.addEventListener("change", onChange);
  return () => mq.removeEventListener("change", onChange);
};
const getReducedMotion = () => window.matchMedia(REDUCED_MOTION_QUERY).matches;

/** A stable per-column speed multiplier, spread by the golden ratio. */
const columnFactor = (index: number, variance: number) => {
  const pseudo = ((index * 0.6180339887 + 0.35) % 1) * 2 - 1;
  return 1 + variance * pseudo;
};

export function DriftWall({
  items = DEFAULT_ITEMS,
  columns = 5,
  tileWidth = 200,
  tileHeight = 132,
  gap = 18,
  radius = 14,
  tilt = 16,
  turn = -14,
  roll = 0,
  perspective = 1200,
  depth = 120,
  speed = 42,
  direction = "up",
  variance = 0.45,
  parallax = 0.6,
  pauseOnHover = false,
  lift = 64,
  fade = 0.6,
  dim = 0.55,
  grayscale = false,
  overlayColor = "#060010",
  overlayOpacity = 0.42,
  fit = "cover",
  tileBackground = "#0b0b12",
  padding = 0,
  decorative = false,
  className = "",
  style,
}: DriftWallProps) {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const planeRef = React.useRef<HTMLDivElement>(null);
  const trackRefs = React.useRef<(HTMLDivElement | null)[]>([]);
  const rafRef = React.useRef<number | null>(null);

  const offsetsRef = React.useRef<number[]>([]);
  const velocitiesRef = React.useRef<number[]>([]);
  const hoveredColRef = React.useRef(-1);
  const wallHoveredRef = React.useRef(false);
  const pointerRef = React.useRef({ x: 0, y: 0 });
  const pointerDampedRef = React.useRef({ x: 0, y: 0 });
  const lastTsRef = React.useRef<number | null>(null);

  const [containerHeight, setContainerHeight] = React.useState(600);
  const [activeId, setActiveId] = React.useState<string | null>(null);
  const activeIdRef = React.useRef<string | null>(null);
  const reduced = React.useSyncExternalStore(subscribeReducedMotion, getReducedMotion, () => false);

  const columnItems = React.useMemo(() => {
    const cols: DriftWallItem[][] = Array.from({ length: columns }, () => []);
    items.forEach((item, i) => cols[i % columns].push(item));
    return cols.map((col) => (col.length ? col : items.slice(0, 1)));
  }, [items, columns]);

  const columnMeta = React.useMemo(() => {
    const unit = tileHeight + gap;
    return columnItems.map((col) => {
      const copyHeight = Math.max(unit, col.length * unit);
      const copies = Math.max(2, Math.ceil((containerHeight * 1.6) / copyHeight) + 1);
      return { copyHeight, copies };
    });
  }, [columnItems, tileHeight, gap, containerHeight]);

  // useEffect rather than the library's useLayoutEffect: this component is rendered on
  // the server too, where a layout effect only produces a warning. ResizeObserver
  // reports the first box synchronously after observe, so nothing is lost.
  React.useEffect(() => {
    if (!containerRef.current) return;
    const ro = new ResizeObserver(([entry]) => {
      setContainerHeight(entry.contentRect.height || 600);
    });
    ro.observe(containerRef.current);
    return () => ro.disconnect();
  }, []);

  const baseVelocities = React.useMemo(() => {
    const dirSign = direction === "up" ? 1 : -1;
    return columnItems.map((_, c) => {
      const altSign = c % 2 === 0 ? 1 : -1;
      return speed * columnFactor(c, variance) * dirSign * altSign;
    });
  }, [columnItems, speed, direction, variance]);

  React.useEffect(() => {
    offsetsRef.current = columnMeta.map((meta, c) => meta.copyHeight * ((c * 0.37) % 1));
    velocitiesRef.current = columnItems.map(() => 0);
  }, [columnMeta, columnItems]);

  const applyPlaneTransform = React.useCallback(
    (px: number, py: number) => {
      const plane = planeRef.current;
      if (!plane) return;
      plane.style.transform =
        `translate(-50%, -50%) scale(1.18) ` +
        `rotateX(${tilt + py}deg) rotateY(${turn + px}deg) rotateZ(${roll}deg) ` +
        `translateZ(${-depth}px)`;
    },
    [tilt, turn, roll, depth],
  );

  React.useEffect(() => {
    const animate = (ts: number) => {
      if (lastTsRef.current === null) lastTsRef.current = ts;
      const dt = Math.min(0.05, Math.max(0, ts - lastTsRef.current) / 1000);
      lastTsRef.current = ts;

      const maxTilt = parallax * 8;
      const targetX = pointerRef.current.x * maxTilt;
      const targetY = -pointerRef.current.y * maxTilt;
      const damp = 1 - Math.exp(-dt / 0.12);
      pointerDampedRef.current.x += (targetX - pointerDampedRef.current.x) * damp;
      pointerDampedRef.current.y += (targetY - pointerDampedRef.current.y) * damp;
      applyPlaneTransform(pointerDampedRef.current.x, pointerDampedRef.current.y);

      for (let c = 0; c < trackRefs.current.length; c++) {
        const meta = columnMeta[c];
        if (!meta) continue;
        const el = trackRefs.current[c];

        if (!reduced) {
          const paused = wallHoveredRef.current && pauseOnHover;
          const factor = paused || hoveredColRef.current === c ? 0 : 1;
          const target = baseVelocities[c] * factor;

          const ease = 1 - Math.exp(-dt / (target === 0 ? 0.16 : 0.28));
          velocitiesRef.current[c] += (target - velocitiesRef.current[c]) * ease;
          let next = (offsetsRef.current[c] ?? 0) + velocitiesRef.current[c] * dt;
          next = ((next % meta.copyHeight) + meta.copyHeight) % meta.copyHeight;
          offsetsRef.current[c] = next;
        }

        if (el) el.style.transform = `translate3d(0, ${-(offsetsRef.current[c] ?? 0)}px, 0)`;
      }

      rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
      lastTsRef.current = null;
    };
  }, [baseVelocities, columnMeta, pauseOnHover, parallax, reduced, applyPlaneTransform]);

  const activate = React.useCallback((id: string, index: number) => {
    activeIdRef.current = id;
    hoveredColRef.current = index;
    setActiveId(id);
  }, []);

  const release = React.useCallback(() => {
    activeIdRef.current = null;
    hoveredColRef.current = -1;
    setActiveId(null);
  }, []);

  const handlePointerMove = React.useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      const rect = containerRef.current?.getBoundingClientRect();
      if (!rect) return;
      if (parallax > 0 && !reduced) {
        pointerRef.current = {
          x: (e.clientX - rect.left) / rect.width - 0.5,
          y: (e.clientY - rect.top) / rect.height - 0.5,
        };
      }
      if (decorative) return;

      const hit = document.elementFromPoint(e.clientX, e.clientY);
      const tile = hit?.closest?.("[data-tile-id]") as HTMLElement | null;
      if (!tile) return;
      const id = tile.dataset.tileId;
      if (!id || id === activeIdRef.current) return;
      activate(id, Number(tile.dataset.col));
    },
    [parallax, reduced, decorative, activate],
  );

  const handlePointerLeaveWall = React.useCallback(() => {
    wallHoveredRef.current = false;
    pointerRef.current = { x: 0, y: 0 };
    release();
  }, [release]);

  const cssVars = React.useMemo(
    () =>
      ({
        "--dw-tile-w": `${tileWidth}px`,
        "--dw-tile-h": `${tileHeight}px`,
        "--dw-gap": `${gap}px`,
        "--dw-radius": `${radius}px`,
        "--dw-perspective": `${perspective}px`,
        "--dw-lift": `${lift}px`,
        "--dw-dim": dim,
        "--dw-gray": grayscale ? 1 : 0,
        "--dw-overlay": overlayColor,
        "--dw-overlay-o": overlayOpacity,
        "--dw-edge": `${Math.max(0, (1 - fade) * 100)}%`,
        "--dw-fit": fit,
        "--dw-tile-bg": tileBackground,
        "--dw-pad": `${padding}px`,
        ...style,
      }) as React.CSSProperties,
    [
      tileWidth,
      tileHeight,
      gap,
      radius,
      perspective,
      lift,
      dim,
      grayscale,
      overlayColor,
      overlayOpacity,
      fade,
      fit,
      tileBackground,
      padding,
      style,
    ],
  );

  const renderTile = (item: DriftWallItem, id: string, colIndex: number) => {
    const inner = (
      <span className="drift-wall__inner">
        <img
          src={item.image}
          alt={decorative ? "" : (item.title ?? "")}
          loading="lazy"
          decoding="async"
          draggable={false}
        />
        <span className="drift-wall__overlay" aria-hidden="true" />
      </span>
    );

    // A backdrop is not a control. No tab stop, no role, no hover state to manage.
    if (decorative) {
      return (
        <span key={id} className="drift-wall__tile">
          {inner}
        </span>
      );
    }

    const commonProps = {
      className: `drift-wall__tile${activeId === id ? " is-active" : ""}`,
      "data-tile-id": id,
      "data-col": colIndex,
      onFocus: () => activate(id, colIndex),
      onBlur: release,
    };

    if (item.href) {
      return (
        <a key={id} href={item.href} target="_blank" rel="noreferrer noopener" {...commonProps}>
          {inner}
        </a>
      );
    }
    return (
      <div key={id} tabIndex={0} role="button" aria-label={item.title ?? "tile"} {...commonProps}>
        {inner}
      </div>
    );
  };

  const rootClass = [
    "drift-wall",
    reduced ? "drift-wall--reduced" : "",
    decorative ? "drift-wall--decorative" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div
      ref={containerRef}
      className={rootClass}
      style={cssVars}
      onPointerMove={handlePointerMove}
      onPointerEnter={() => {
        wallHoveredRef.current = true;
      }}
      onPointerLeave={handlePointerLeaveWall}
      {...(decorative
        ? { "aria-hidden": true as const }
        : { role: "group", "aria-label": "Drifting wall of tiles" })}
    >
      <div ref={planeRef} className="drift-wall__plane">
        {columnItems.map((col, c) => {
          const meta = columnMeta[c];
          return (
            <div className="drift-wall__col" key={`col-${c}`}>
              <div
                className="drift-wall__track"
                ref={(el) => {
                  trackRefs.current[c] = el;
                }}
              >
                {Array.from({ length: meta.copies }).map((_, copyIndex) =>
                  col.map((item, itemIndex) => renderTile(item, `${c}-${copyIndex}-${itemIndex}`, c)),
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default DriftWall;
