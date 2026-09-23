"use client";

import { useRef } from "react";
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
} from "motion/react";
import type { ReactNode } from "react";

/**
 * Renders a soft glow that follows the cursor within the card's bounds
 * on hover, layered beneath the card's own content. Purely decorative
 * and inert under prefers-reduced-motion or on touch (no hover) devices.
 */
export default function SpotlightCard({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const mouseX = useMotionValue(-200);
  const mouseY = useMotionValue(-200);

  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (shouldReduceMotion || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
  };

  const background = useMotionTemplate`radial-gradient(240px circle at ${mouseX}px ${mouseY}px, rgba(63,214,198,0.12), transparent 75%)`;

  return (
    <div
      ref={ref}
      onMouseMove={handleMove}
      className={`group relative isolate ${className ?? ""}`}
    >
      {!shouldReduceMotion && (
        <motion.div
          aria-hidden="true"
          style={{ background }}
          className="pointer-events-none absolute inset-0 -z-10 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        />
      )}
      {children}
    </div>
  );
}
