"use client";

import { motion, useReducedMotion } from "motion/react";
import { AnnotationText } from "@/components/annotation-text";
import { BlurText } from "@/components/blur-text";
import { WaveText } from "@/components/wave-text";
import { site } from "@/lib/data";
import MagneticButton from "./MagneticButton";

const container = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.09, delayChildren: 1.05 },
  },
};

export default function Hero() {
  const shouldReduceMotion = useReducedMotion();
  const [firstName, ...remainingName] = site.name.split(" ");
  const familyName = remainingName.join(" ");

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
      className="relative flex min-h-[100svh] items-end overflow-hidden pb-16 pt-32 md:items-center md:pb-0 md:pt-24"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
      >
        <div className="absolute left-1/2 top-[-10%] h-[38rem] w-[38rem] -translate-x-1/2 rounded-full bg-accent/[0.07] blur-[120px]" />
        <div className="hero-grid absolute inset-0" />
      </div>

      <motion.div
        variants={container}
        initial="hidden"
        animate="visible"
        className="container-page relative w-full"
      >
        <motion.p
          variants={item}
          className="mb-7 inline-flex items-center gap-2.5 rounded-full border border-line bg-base-deep/60 px-4 py-2 text-xs font-medium uppercase tracking-[0.16em] text-ink-muted"
        >
          <span
            aria-hidden="true"
            className="h-2 w-2 rounded-full bg-accent shadow-[0_0_12px_rgba(241,91,85,0.55)]"
          />
          {site.role} <span className="text-ink-faint">/</span> {site.location}
        </motion.p>

        <h1 className="font-display text-[clamp(3.75rem,13.6vw,12rem)] font-semibold uppercase leading-[0.79] tracking-[-0.085em] text-ink">
          <BlurText
            text={firstName}
            className="block"
            delay={0.95}
            duration={1.4}
            stepDelay={0.18}
          />
          <BlurText
            text={familyName}
            className="mt-2 block text-accent"
            delay={1.2}
            duration={1.4}
            stepDelay={0.18}
          />
        </h1>

        <div className="mt-10 grid gap-8 border-t border-line/80 pt-7 md:mt-12 md:grid-cols-12 md:gap-10 md:pt-8">
          <motion.div variants={item} className="md:col-span-5">
            <p className="max-w-lg font-display text-2xl font-medium leading-snug text-ink md:text-3xl">
              <WaveText
                text={site.headline}
                delay={2.2}
                duration={0.55}
                stagger={0.018}
              />
            </p>
          </motion.div>

          <motion.div variants={item} className="md:col-span-6 md:col-start-7">
            <p className="max-w-prose text-base leading-relaxed text-ink-muted md:text-lg">
              I build{" "}
              <AnnotationText
                type="circle"
                color="#F15B55"
                duration={1.1}
                delay={1.5}
                className="text-ink"
              >
                fast
              </AnnotationText>
              , accessible{" "}
              <AnnotationText
                type="underline"
                color="#FF817A"
                duration={0.9}
                delay={2.1}
                className="text-ink"
              >
                React
              </AnnotationText>{" "}
              and{" "}
              <AnnotationText
                type="underline"
                color="#FF817A"
                duration={0.9}
                delay={2.5}
                className="text-ink"
              >
                Next.js
              </AnnotationText>{" "}
              experiences and collaborate with AI product teams to turn
              integrations into{" "}
              <AnnotationText
                type="underline"
                color="#FF817A"
                duration={1.0}
                delay={3.0}
                className="text-ink"
              >
                intuitive
              </AnnotationText>{" "}
              web interfaces.
            </p>

            <div className="mt-7 flex flex-wrap items-center gap-4">
              <MagneticButton
                strength={0.45}
                labelStrength={0.25}
                spring={{ stiffness: 530, damping: 25, mass: 0.6 }}
              >
                <a
                  href="#projects"
                  className="group inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 text-sm font-medium text-base-deep transition-colors duration-300 hover:bg-accent-bright"
                >
                  View my work
                  <svg
                    aria-hidden="true"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5"
                  >
                    <path d="M5 12h14" />
                    <path d="m12 5 7 7-7 7" />
                  </svg>
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
            </div>

            <div className="mt-7 flex items-center gap-6 text-sm text-ink-muted">
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
            </div>
          </motion.div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
        className="absolute bottom-10 right-10 hidden md:block"
      >
        <a
          href="#about"
          className="flex items-center gap-3 text-[10px] uppercase tracking-[0.18em] text-ink-faint transition-colors hover:text-ink-muted"
        >
          Scroll to explore
          <span className="h-8 w-px bg-gradient-to-b from-accent/70 to-transparent" />
        </a>
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
