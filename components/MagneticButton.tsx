"use client";

import { useRef } from "react";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from "motion/react";
import type { ReactNode } from "react";

/**
 * Wraps a button/link so it drifts slightly toward the cursor on hover —
 * a small, tasteful nod that the element is interactive. Disabled entirely
 * under prefers-reduced-motion.
 */
export interface MagneticSpring {
  stiffness?: number;
  damping?: number;
  mass?: number;
}

export function MagneticButton({
  children,
  className,
  strength = 0.35,
  labelStrength = 0,
  spring = { stiffness: 200, damping: 15, mass: 0.4 },
}: {
  children: ReactNode;
  className?: string;
  strength?: number;
  labelStrength?: number;
  spring?: MagneticSpring;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const springConfig = {
    stiffness: spring.stiffness ?? 200,
    damping: spring.damping ?? 15,
    mass: spring.mass ?? 0.4,
  };

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const labelX = useMotionValue(0);
  const labelY = useMotionValue(0);

  const springX = useSpring(x, springConfig);
  const springY = useSpring(y, springConfig);
  const springLabelX = useSpring(labelX, springConfig);
  const springLabelY = useSpring(labelY, springConfig);

  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (shouldReduceMotion || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const relX = e.clientX - rect.left - rect.width / 2;
    const relY = e.clientY - rect.top - rect.height / 2;
    x.set(relX * strength);
    y.set(relY * strength);
    if (labelStrength) {
      labelX.set(relX * labelStrength);
      labelY.set(relY * labelStrength);
    }
  };

  const handleLeave = () => {
    x.set(0);
    y.set(0);
    labelX.set(0);
    labelY.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      style={{ x: springX, y: springY }}
      className={`inline-block ${className ?? ""}`}
    >
      {labelStrength ? (
        <motion.span
          style={{ x: springLabelX, y: springLabelY }}
          className="inline-block"
        >
          {children}
        </motion.span>
      ) : (
        children
      )}
    </motion.div>
  );
}

export default MagneticButton;
