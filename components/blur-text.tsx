"use client";

import { motion, useReducedMotion } from "motion/react";

export interface BlurTextProps {
  text: string;
  className?: string;
  delay?: number;
  stepDelay?: number;
  duration?: number;
}

export function BlurText({
  text,
  className = "",
  delay = 0,
  stepDelay = 0.18,
  duration = 1.4,
}: BlurTextProps) {
  const shouldReduceMotion = useReducedMotion();
  const words = text.split(" ").filter(Boolean);

  return (
    <span className={className}>
      {words.map((word, index) => (
        <motion.span
          key={`${word}-${index}`}
          className="inline-block"
          initial={
            shouldReduceMotion
              ? { opacity: 1, filter: "blur(0px)", y: 0 }
              : { opacity: 0, filter: "blur(12px)", y: 12 }
          }
          animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
          transition={
            shouldReduceMotion
              ? { duration: 0 }
              : {
                  duration,
                  delay: delay + index * stepDelay,
                  ease: [0.4, 0, 0.2, 1],
                }
          }
        >
          {word}
          {index < words.length - 1 ? "\u00A0" : ""}
        </motion.span>
      ))}
    </span>
  );
}

