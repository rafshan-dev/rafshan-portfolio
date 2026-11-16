"use client";

import type { ReactNode } from "react";
import { motion, useReducedMotion } from "motion/react";

export type AnnotationType =
  | "circle"
  | "underline"
  | "strike"
  | "box"
  | "highlight";

export interface AnnotationTextProps {
  children: ReactNode;
  type?: AnnotationType;
  color?: string;
  duration?: number;
  delay?: number;
  strokeWidth?: number;
  className?: string;
}

const PATH_CONFIG: Record<
  AnnotationType,
  {
    d: string;
    secondaryD?: string;
    viewBox: string;
    strokeWidthMultiplier?: number;
  }
> = {
  circle: {
    d: "M 14 26 C 8 10, 48 2, 106 4 C 168 6, 196 18, 192 32 C 188 46, 140 52, 92 50 C 38 48, 4 38, 10 22 C 14 11, 44 5, 84 4",
    viewBox: "0 0 200 54",
  },
  underline: {
    d: "M 2 47 C 52 42, 122 50, 198 44",
    secondaryD: "M 22 52 C 74 49, 138 53, 186 49",
    viewBox: "0 0 200 54",
  },
  strike: {
    d: "M 2 27 Q 65 23, 130 27 T 198 25",
    viewBox: "0 0 200 50",
  },
  box: {
    d: "M 6 8 L 194 6 L 196 44 L 4 46 Z",
    viewBox: "0 0 200 52",
  },
  highlight: {
    d: "M 4 27 L 196 25",
    viewBox: "0 0 200 50",
    strokeWidthMultiplier: 12,
  },
};

export function AnnotationText({
  children,
  type = "underline",
  color = "currentColor",
  duration = 1.4,
  delay = 0,
  strokeWidth = 2.2,
  className = "",
}: AnnotationTextProps) {
  const shouldReduceMotion = useReducedMotion();
  const { d, secondaryD, viewBox, strokeWidthMultiplier = 1 } =
    PATH_CONFIG[type];
  const isHighlight = type === "highlight";

  return (
    <span className={`relative inline-block whitespace-nowrap ${className}`}>
      <span className="relative z-10">{children}</span>
      <svg
        aria-hidden="true"
        viewBox={viewBox}
        preserveAspectRatio="none"
        className={`pointer-events-none absolute ${
          type === "circle" || type === "box"
            ? "-inset-x-2 -inset-y-1.5 h-[calc(100%+0.75rem)] w-[calc(100%+1rem)]"
            : "inset-0 h-full w-full"
        } overflow-visible ${isHighlight ? "z-0 opacity-30" : "z-20"}`}
        style={
          type === "underline"
            ? { filter: `drop-shadow(0 0 6px ${color}55)` }
            : undefined
        }
        fill="none"
      >
        <motion.path
          d={d}
          stroke={color}
          strokeWidth={strokeWidth * strokeWidthMultiplier}
          strokeLinecap="round"
          strokeLinejoin="round"
          vectorEffect={isHighlight ? undefined : "non-scaling-stroke"}
          initial={
            shouldReduceMotion
              ? { pathLength: 1, opacity: 1 }
              : { pathLength: 0, opacity: 0 }
          }
          whileInView={{ pathLength: 1, opacity: 1 }}
          viewport={{ once: true, amount: "some" }}
          transition={
            shouldReduceMotion
              ? { duration: 0 }
              : {
                  pathLength: {
                    duration,
                    delay,
                    ease: [0.4, 0, 0.2, 1],
                  },
                  opacity: { duration: 0.2, delay },
                }
          }
        />
        {secondaryD && (
          <motion.path
            d={secondaryD}
            stroke={color}
            strokeOpacity={0.45}
            strokeWidth={Math.max(1.2, strokeWidth * 0.65)}
            strokeLinecap="round"
            strokeLinejoin="round"
            vectorEffect="non-scaling-stroke"
            initial={
              shouldReduceMotion
                ? { pathLength: 1, opacity: 1 }
                : { pathLength: 0, opacity: 0 }
            }
            whileInView={{ pathLength: 1, opacity: 1 }}
            viewport={{ once: true, amount: "some" }}
            transition={
              shouldReduceMotion
                ? { duration: 0 }
                : {
                    pathLength: {
                      duration: duration * 0.9,
                      delay: delay + 0.25,
                      ease: [0.4, 0, 0.2, 1],
                    },
                    opacity: { duration: 0.2, delay: delay + 0.25 },
                  }
            }
          />
        )}
      </svg>
    </span>
  );
}

