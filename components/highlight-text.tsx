"use client";

import { Fragment } from "react";
import { motion, useReducedMotion } from "motion/react";

export interface HighlightTextProps {
  text: string;
  highlights: string[];
  color?: string;
  duration?: number;
  delay?: number;
  className?: string;
  highlightClassName?: string;
}

function escapeRegExp(value: string) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

export function HighlightText({
  text,
  highlights,
  color = "#fde68a",
  duration = 0.5,
  delay = 0,
  className = "",
  highlightClassName = "text-neutral-950",
}: HighlightTextProps) {
  const shouldReduceMotion = useReducedMotion();

  const validHighlights = highlights.filter((h) => h.length > 0);
  if (validHighlights.length === 0) {
    return <span className={className}>{text}</span>;
  }

  const pattern = new RegExp(
    `(${validHighlights
      .slice()
      .sort((a, b) => b.length - a.length)
      .map(escapeRegExp)
      .join("|")})`,
    "g",
  );

  const parts = text.split(pattern);
  const highlightSet = new Set(validHighlights);
  let matchIndex = 0;

  return (
    <span className={className}>
      {parts.map((part, index) => {
        if (!part) return null;

        if (!highlightSet.has(part)) {
          return <Fragment key={index}>{part}</Fragment>;
        }

        const itemDelay = delay + matchIndex * (duration * 0.6);
        matchIndex += 1;

        return (
          <span
            key={index}
            className={`relative inline-block px-1 py-0.5 ${highlightClassName}`}
          >
            <motion.span
              aria-hidden="true"
              className="absolute inset-0 -z-0 rounded-sm"
              style={{ backgroundColor: color, transformOrigin: "left center" }}
              initial={shouldReduceMotion ? { scaleX: 1 } : { scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true, amount: "some" }}
              transition={
                shouldReduceMotion
                  ? { duration: 0 }
                  : {
                      duration,
                      delay: itemDelay,
                      ease: [0.22, 1, 0.36, 1],
                    }
              }
            />
            <span className="relative z-10">{part}</span>
          </span>
        );
      })}
    </span>
  );
}

