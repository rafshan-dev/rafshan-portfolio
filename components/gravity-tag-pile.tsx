"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "motion/react";

export type GravityTagInput =
  | string
  | {
      label: string;
      group?: number;
    };

export interface GravityTagPileProps {
  tags: GravityTagInput[];
  groupLabels?: string[];
  pattern?: "pile" | "grid";
  theme?: "color" | "mono";
  squash?: number;
  className?: string;
}

interface Body {
  x: number;
  y: number;
  vx: number;
  vy: number;
  w: number;
  h: number;
  angle: number;
  va: number;
  scaleX: number;
  scaleY: number;
  stillFrames: number;
  asleep: boolean;
}

const COLOR_STYLES = [
  "border-accent/50 bg-accent text-base-deep",
  "border-white/15 bg-base-elevated text-ink",
  "border-white/25 bg-ink text-base-deep",
];

const MONO_STYLES = [
  "border-black/10 bg-[#F7F7F8] text-[#111318]",
  "border-white/15 bg-[#16181D] text-[#F4F5F6]",
  "border-black/10 bg-[#E2E4E9] text-[#111318]",
];

const COLOR_DOTS = ["bg-accent", "bg-base-elevated border border-white/30", "bg-ink"];
const MONO_DOTS = ["bg-[#F7F7F8]", "bg-[#16181D] border border-white/30", "bg-[#E2E4E9]"];

export function GravityTagPile({
  tags,
  groupLabels,
  pattern = "grid",
  theme = "mono",
  squash = 0.8,
  className = "",
}: GravityTagPileProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const tagRefs = useRef<(HTMLDivElement | null)[]>([]);
  const shouldReduceMotion = useReducedMotion();
  const [inView, setInView] = useState(false);
  const [dropKey, setDropKey] = useState(0);

  const normalizedTags = tags.map((t, i) =>
    typeof t === "string"
      ? { label: t, group: i % 3 }
      : { label: t.label, group: t.group ?? 0 },
  );

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.35 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    if (!container || !inView) return;

    const rect = container.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    if (width <= 0 || height <= 0) return;

    if (shouldReduceMotion) {
      let curX = 20;
      let curY = height - 56;
      tagRefs.current.forEach((el) => {
        if (!el) return;
        const w = el.offsetWidth || 96;
        const h = el.offsetHeight || 38;
        if (curX + w > width - 20) {
          curX = 20;
          curY -= h + 10;
        }
        el.style.transform = `translate3d(${curX}px, ${Math.max(56, curY)}px, 0)`;
        curX += w + 8;
      });
      return;
    }

    const bodies: Body[] = normalizedTags.map((_, i) => {
      const el = tagRefs.current[i];
      const w = el ? el.offsetWidth : 96;
      const h = el ? el.offsetHeight : 38;
      const spread = Math.max(120, width - w - 32);
      const frac = ((i * 37 + 11) % 97) / 97;
      const x = 16 + frac * spread;
      const y = -45 - i * 32;
      return {
        x,
        y,
        vx: (((i * 19) % 11) - 5) * 0.45,
        vy: 0,
        w,
        h,
        angle: (((i * 23) % 19) - 9) * 0.08,
        va: (((i * 13) % 11) - 5) * 0.008,
        scaleX: 1,
        scaleY: 1,
        stillFrames: 0,
        asleep: false,
      };
    });

    let dragIndex = -1;
    let dragOffsetX = 0;
    let dragOffsetY = 0;
    let lastPointerX = 0;
    let lastPointerY = 0;
    let pointerVx = 0;
    let pointerVy = 0;

    const onPointerDown = (e: PointerEvent) => {
      const cRect = container.getBoundingClientRect();
      const px = e.clientX - cRect.left;
      const py = e.clientY - cRect.top;

      for (let i = bodies.length - 1; i >= 0; i--) {
        const b = bodies[i];
        const cx = b.x + b.w / 2;
        const cy = b.y + b.h / 2;
        const r = Math.max(b.w, b.h) * 0.55;
        if (Math.hypot(px - cx, py - cy) <= r) {
          dragIndex = i;
          b.asleep = false;
          b.stillFrames = 0;
          dragOffsetX = px - b.x;
          dragOffsetY = py - b.y;
          lastPointerX = px;
          lastPointerY = py;
          pointerVx = 0;
          pointerVy = 0;
          tagRefs.current[i]?.setAttribute("data-dragging", "true");
          break;
        }
      }
    };

    const onPointerMove = (e: PointerEvent) => {
      if (dragIndex === -1) return;
      const cRect = container.getBoundingClientRect();
      const px = e.clientX - cRect.left;
      const py = e.clientY - cRect.top;
      pointerVx = (px - lastPointerX) * 0.85;
      pointerVy = (py - lastPointerY) * 0.85;
      lastPointerX = px;
      lastPointerY = py;

      const b = bodies[dragIndex];
      b.x = Math.max(8, Math.min(width - b.w - 8, px - dragOffsetX));
      b.y = Math.max(8, Math.min(height - b.h - 8, py - dragOffsetY));
      b.vx = 0;
      b.vy = 0;
    };

    const onPointerUp = () => {
      if (dragIndex === -1) return;
      const b = bodies[dragIndex];
      b.vx = Math.max(-18, Math.min(18, pointerVx));
      b.vy = Math.max(-18, Math.min(18, pointerVy));
      b.va = b.vx * 0.008;
      tagRefs.current[dragIndex]?.removeAttribute("data-dragging");
      dragIndex = -1;
    };

    container.addEventListener("pointerdown", onPointerDown);
    window.addEventListener("pointermove", onPointerMove);
    window.addEventListener("pointerup", onPointerUp);

    // Approximate each capsule pill with 3 circles along its rotated major axis
    // so tags tumble, lean, and nest organically like in a real physics engine.
    const getCircles = (b: Body) => {
      const r = b.h * 0.5;
      const cx = b.x + b.w / 2;
      const cy = b.y + b.h / 2;
      const halfSpan = Math.max(0, b.w / 2 - r);
      const cos = Math.cos(b.angle);
      const sin = Math.sin(b.angle);
      return [
        { x: cx - halfSpan * cos, y: cy - halfSpan * sin, r },
        { x: cx, y: cy, r },
        { x: cx + halfSpan * cos, y: cy + halfSpan * sin, r },
      ];
    };

    let raf = 0;
    const gravity = 0.36;
    const restitution = 0.25;
    const friction = 0.96;

    const prevPos = bodies.map((b) => ({ x: b.x, y: b.y, angle: b.angle }));

    const step = () => {
      const cRect = container.getBoundingClientRect();
      const curW = cRect.width;
      const curH = cRect.height;

      for (let i = 0; i < bodies.length; i++) {
        const b = bodies[i];
        prevPos[i].x = b.x;
        prevPos[i].y = b.y;
        prevPos[i].angle = b.angle;

        if (i === dragIndex || b.asleep) {
          b.scaleX += (1 - b.scaleX) * 0.25;
          b.scaleY += (1 - b.scaleY) * 0.25;
          continue;
        }

        b.vy += gravity;
        b.vx *= friction;
        b.va *= 0.85;

        if (Math.abs(b.vx) < 0.04) b.vx = 0;
        if (Math.abs(b.va) < 0.001) b.va = 0;

        b.x += b.vx;
        b.y += b.vy;
        b.angle += b.va;

        b.scaleX += (1 - b.scaleX) * 0.22;
        b.scaleY += (1 - b.scaleY) * 0.22;

        const circles = getCircles(b);
        for (let c = 0; c < circles.length; c++) {
          const p = circles[c];
          if (p.x - p.r < 6) {
            const dx = 6 - (p.x - p.r);
            b.x += dx;
            b.vx = Math.abs(b.vx) > 0.5 ? Math.abs(b.vx) * restitution : 0;
          } else if (p.x + p.r > curW - 6) {
            const dx = curW - 6 - (p.x + p.r);
            b.x += dx;
            b.vx = Math.abs(b.vx) > 0.5 ? -Math.abs(b.vx) * restitution : 0;
          }

          if (p.y + p.r > curH - 6) {
            const dy = curH - 6 - (p.y + p.r);
            b.y += dy;
            const impact = Math.abs(b.vy);
            if (impact > 1.8) {
              const amount = Math.min(0.22, (impact / 18) * 0.24 * squash);
              b.scaleX = 1 + amount;
              b.scaleY = 1 - amount;
              b.vy = -b.vy * restitution;
              const leverX = p.x - (b.x + b.w / 2);
              b.va -= leverX * 0.0003;
            } else {
              b.vy = 0;
            }
            b.vx *= 0.82;
            b.va *= 0.78;
          }
        }
      }

      // Multi-circle capsule collision resolution for natural tumbling & calm settling
      for (let iter = 0; iter < 4; iter++) {
        for (let i = 0; i < bodies.length; i++) {
          for (let j = i + 1; j < bodies.length; j++) {
            const a = bodies[i];
            const b = bodies[j];
            if (a.asleep && b.asleep) continue;

            const ca = getCircles(a);
            const cb = getCircles(b);

            for (let ia = 0; ia < 3; ia++) {
              for (let ib = 0; ib < 3; ib++) {
                const p1 = ca[ia];
                const p2 = cb[ib];
                const dx = p2.x - p1.x;
                const dy = p2.y - p1.y;
                const minDist = p1.r + p2.r + 1;
                const distSq = dx * dx + dy * dy;

                if (distSq < minDist * minDist && distSq > 0.0001) {
                  const dist = Math.sqrt(distSq);
                  const penetration = minDist - dist;
                  if (penetration < 0.35) continue;

                  const overlap = penetration * 0.35;
                  const nx = dx / dist;
                  const ny = dy / dist;

                  const aFree = i !== dragIndex && !a.asleep;
                  const bFree = j !== dragIndex && !b.asleep;

                  if (aFree && bFree) {
                    a.x -= nx * overlap;
                    a.y -= ny * overlap;
                    b.x += nx * overlap;
                    b.y += ny * overlap;
                  } else if (aFree) {
                    a.x -= nx * overlap * 1.4;
                    a.y -= ny * overlap * 1.4;
                  } else if (bFree) {
                    b.x += nx * overlap * 1.4;
                    b.y += ny * overlap * 1.4;
                  }

                  const rvx = b.vx - a.vx;
                  const rvy = b.vy - a.vy;
                  const velAlongNormal = rvx * nx + rvy * ny;
                  if (velAlongNormal < 0) {
                    const bounce = velAlongNormal < -1.0 ? 0.15 : 0;
                    const impulse = -(1 + bounce) * velAlongNormal * 0.5;
                    if (aFree) {
                      a.vx -= impulse * nx;
                      a.vy -= impulse * ny;
                      if (velAlongNormal < -0.6) {
                        const armA =
                          (p1.x - (a.x + a.w / 2)) * ny -
                          (p1.y - (a.y + a.h / 2)) * nx;
                        a.va -= armA * impulse * 0.00035;
                      }
                    }
                    if (bFree) {
                      b.vx += impulse * nx;
                      b.vy += impulse * ny;
                      if (velAlongNormal < -0.6) {
                        const armB =
                          (p2.x - (b.x + b.w / 2)) * ny -
                          (p2.y - (b.y + b.h / 2)) * nx;
                        b.va += armB * impulse * 0.00035;
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }

      // Put settled bodies to sleep so they never jitter
      for (let i = 0; i < bodies.length; i++) {
        const b = bodies[i];
        if (i === dragIndex || b.asleep || b.y < 10) continue;
        const moved =
          Math.abs(b.x - prevPos[i].x) +
          Math.abs(b.y - prevPos[i].y) +
          Math.abs(b.angle - prevPos[i].angle) * 40;
        if (moved < 0.35) {
          b.stillFrames += 1;
          if (b.stillFrames > 14) {
            b.asleep = true;
            b.vx = 0;
            b.vy = 0;
            b.va = 0;
          }
        } else {
          b.stillFrames = 0;
        }
      }

      for (let i = 0; i < bodies.length; i++) {
        const el = tagRefs.current[i];
        if (!el) continue;
        const b = bodies[i];
        el.style.transform = `translate3d(${b.x}px, ${b.y}px, 0) rotate(${b.angle}rad) scale(${b.scaleX}, ${b.scaleY})`;
      }

      raf = requestAnimationFrame(step);
    };

    raf = requestAnimationFrame(step);

    return () => {
      cancelAnimationFrame(raf);
      container.removeEventListener("pointerdown", onPointerDown);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerup", onPointerUp);
    };
  }, [dropKey, inView, normalizedTags, shouldReduceMotion, squash]);

  const dots = theme === "mono" ? MONO_DOTS : COLOR_DOTS;
  const styles = theme === "mono" ? MONO_STYLES : COLOR_STYLES;

  return (
    <div
      ref={containerRef}
      className={`relative select-none overflow-hidden rounded-3xl border border-white/10 bg-base-card/15 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)] ${
        pattern === "grid"
          ? "bg-[linear-gradient(to_right,rgba(255,255,255,0.045)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.045)_1px,transparent_1px)] bg-[size:32px_32px]"
          : ""
      } ${className}`}
    >
      <div className="pointer-events-none absolute inset-x-0 top-0 z-10 flex flex-wrap items-center justify-between gap-3 px-5 py-4 text-xs text-ink-faint">
        {groupLabels && groupLabels.length > 0 ? (
          <div className="flex flex-wrap items-center gap-4">
            {groupLabels.map((label, idx) => (
              <span
                key={label}
                className="inline-flex items-center gap-1.5 text-[11px] font-medium text-ink-muted"
              >
                <span
                  aria-hidden="true"
                  className={`h-2 w-2 rounded-full ${dots[idx % dots.length]}`}
                />
                {label}
              </span>
            ))}
          </div>
        ) : (
          <span className="uppercase tracking-[0.16em]">Interactive Stack</span>
        )}
        <button
          type="button"
          onClick={() => setDropKey((k) => k + 1)}
          className="pointer-events-auto rounded-full border border-white/10 bg-base-elevated/80 px-3 py-1 text-[11px] font-medium text-ink-muted transition-colors hover:border-accent/40 hover:text-accent"
        >
          Drop again
        </button>
      </div>

      {normalizedTags.map((tag, i) => {
        const styleClass = styles[tag.group % styles.length];
        return (
          <div
            key={`${tag.label}-${dropKey}`}
            ref={(el) => {
              tagRefs.current[i] = el;
            }}
            className={`absolute left-0 top-0 cursor-grab whitespace-nowrap rounded-full border px-4 py-2 text-xs font-medium shadow-[0_6px_20px_rgba(0,0,0,0.35)] transition-opacity duration-200 active:cursor-grabbing data-[dragging=true]:z-20 md:text-sm ${
              inView ? "opacity-100" : "opacity-0"
            } ${styleClass}`}
          >
            {tag.label}
          </div>
        );
      })}
    </div>
  );
}
