"use client";

import { motion, useReducedMotion } from "motion/react";

export interface WaveTextProps {
  text: string;
  className?: string;
  delay?: number;
  duration?: number;
  stagger?: number;
}

export function WaveText({
  text,
  className = "",
  delay = 0,
  duration = 0.65,
  stagger = 0.025,
}: WaveTextProps) {
  const shouldReduceMotion = useReducedMotion();
  const words = text.split(" ");
  let charIndex = 0;

  return (
    <span className={className}>
      {words.map((word, wordIdx) => {
        const chars = Array.from(word);
        return (
          <span key={`${word}-${wordIdx}`} className="inline-block whitespace-nowrap">
            {chars.map((char, cIdx) => {
              const idx = charIndex++;
              return (
                <motion.span
                  key={`${char}-${cIdx}`}
                  className="inline-block"
                  initial={
                    shouldReduceMotion
                      ? { opacity: 1, y: 0 }
                      : { opacity: 0, y: 14 }
                  }
                  animate={
                    shouldReduceMotion
                      ? { opacity: 1, y: 0 }
                      : { opacity: [0, 1, 1], y: [14, -6, 0] }
                  }
                  transition={
                    shouldReduceMotion
                      ? { duration: 0 }
                      : {
                          duration,
                          delay: delay + idx * stagger,
                          times: [0, 0.55, 1],
                          ease: [0.22, 1, 0.36, 1],
                        }
                  }
                >
                  {char}
                </motion.span>
              );
            })}
            {wordIdx < words.length - 1 ? "\u00A0" : ""}
          </span>
        );
      })}
    </span>
  );
}

