"use client";

import { motion, useReducedMotion, Variants } from "motion/react";
import { ReactNode } from "react";

type RevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  as?: "div" | "li" | "section";
  once?: boolean;
};

/**
 * Fades and lifts content into place as it scrolls into view.
 * Falls back to a static, fully-visible render when the visitor
 * has requested reduced motion.
 */
export default function Reveal({
  children,
  className,
  delay = 0,
  y = 24,
  as = "div",
  once = true,
}: RevealProps) {
  const shouldReduceMotion = useReducedMotion();

  const variants: Variants = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : y },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: shouldReduceMotion ? 0.01 : 0.7,
        delay: shouldReduceMotion ? 0 : delay,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  };

  const sharedProps = {
    className,
    initial: "hidden" as const,
    whileInView: "visible" as const,
    viewport: { once, margin: "-10% 0px -10% 0px" },
    variants,
  };

  if (as === "li") {
    return <motion.li {...sharedProps}>{children}</motion.li>;
  }
  if (as === "section") {
    return <motion.section {...sharedProps}>{children}</motion.section>;
  }
  return <motion.div {...sharedProps}>{children}</motion.div>;
}
