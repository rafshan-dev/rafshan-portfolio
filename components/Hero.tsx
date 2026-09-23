"use client";

import { motion, useReducedMotion } from "motion/react";
import { site } from "@/lib/data";
import MagneticButton from "./MagneticButton";

const container = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.09, delayChildren: 0.15 },
  },
};

export default function Hero() {
  const shouldReduceMotion = useReducedMotion();

  const item = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 18 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
    },
  };

  return (
    <section
      id="hero"
      className="relative flex min-h-[100svh] items-center overflow-hidden pt-24"
    >
      {/* Ambient gradient glow — the single bold visual gesture on the page */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
      >
        <div className="absolute left-1/2 top-[-10%] h-[38rem] w-[38rem] -translate-x-1/2 rounded-full bg-accent/[0.08] blur-[120px]" />
        <div className="absolute inset-0 bg-grid-fade" />
      </div>

      <motion.div
        variants={container}
        initial="hidden"
        animate="visible"
        className="container-page relative"
      >
        <motion.p
          variants={item}
          className="mb-6 text-sm text-ink-muted"
        >
          {site.role} · {site.location}
        </motion.p>

        <motion.h1
          variants={item}
          className="font-display text-hero font-medium text-ink balance max-w-4xl"
        >
          {site.headline}
        </motion.h1>

        <motion.p
          variants={item}
          className="mt-8 max-w-prose text-lg leading-relaxed text-ink-muted"
        >
          {site.intro}
        </motion.p>

        <motion.div
          variants={item}
          className="mt-10 flex flex-wrap items-center gap-4"
        >
          <MagneticButton>
            <a
              href="#projects"
              className="inline-block rounded-full bg-accent px-6 py-3 text-sm font-medium text-base-deep transition-colors duration-300 hover:bg-accent-bright"
            >
              View my work
            </a>
          </MagneticButton>
          <MagneticButton>
            <a
              href="#contact"
              className="inline-block rounded-full border border-line px-6 py-3 text-sm font-medium text-ink transition-colors duration-300 hover:border-accent/50 hover:text-accent"
            >
              Get in touch
            </a>
          </MagneticButton>
        </motion.div>

        <motion.div
          variants={item}
          className="mt-12 flex items-center gap-6 text-sm text-ink-muted"
        >
          <a
            href={site.github}
            target="_blank"
            rel="noreferrer noopener"
            className="inline-flex items-center gap-2 transition-all duration-300 hover:-translate-y-0.5 hover:text-ink"
          >
            <GithubIcon />
            GitHub
          </a>
          <a
            href={site.linkedin}
            target="_blank"
            rel="noreferrer noopener"
            className="inline-flex items-center gap-2 transition-all duration-300 hover:-translate-y-0.5 hover:text-ink"
          >
            <LinkedinIcon />
            LinkedIn
          </a>
        </motion.div>
      </motion.div>

      <motion.div
        aria-hidden="true"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
        className="absolute bottom-10 left-1/2 hidden -translate-x-1/2 md:block"
      >
        <div className="h-10 w-px bg-gradient-to-b from-transparent via-line to-transparent" />
      </motion.div>
    </section>
  );
}

function GithubIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.57.1.78-.25.78-.55 0-.27-.01-1.16-.02-2.11-3.2.7-3.88-1.36-3.88-1.36-.52-1.34-1.28-1.7-1.28-1.7-1.05-.72.08-.7.08-.7 1.16.08 1.78 1.2 1.78 1.2 1.03 1.77 2.71 1.26 3.37.96.1-.75.4-1.26.73-1.55-2.56-.29-5.25-1.28-5.25-5.7 0-1.26.45-2.29 1.19-3.1-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.18 1.18a11 11 0 0 1 5.79 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.6.23 2.76.12 3.05.74.81 1.18 1.84 1.18 3.1 0 4.43-2.7 5.4-5.27 5.69.42.36.78 1.08.78 2.18 0 1.57-.01 2.84-.01 3.23 0 .3.2.66.79.55A10.51 10.51 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5Z" />
    </svg>
  );
}

function LinkedinIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.02-3.03-1.85-3.03-1.85 0-2.14 1.45-2.14 2.94v5.66H9.36V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12ZM7.12 20.45H3.56V9h3.56v11.45Z" />
    </svg>
  );
}
