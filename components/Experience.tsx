"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import Reveal from "./Reveal";
import { experience } from "@/lib/data";

export default function Experience() {
  const ref = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 80%", "end 60%"],
  });
  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section id="experience" className="border-t border-line-soft py-28 md:py-36">
      <div className="container-page">
        <Reveal>
          <h2 className="font-display text-h2 font-medium text-ink max-w-xl">
            Experience
          </h2>
        </Reveal>

        <div ref={ref} className="relative mt-20 pl-8 md:pl-10">
          <div className="absolute left-0 top-2 bottom-2 w-px bg-line" />
          <motion.div
            style={{ height: shouldReduceMotion ? "100%" : lineHeight }}
            className="absolute left-0 top-2 w-px bg-gradient-to-b from-accent to-accent/20"
          />

          <ol className="space-y-20">
            {experience.map((entry, i) => (
              <Reveal as="li" key={entry.company} delay={i * 0.08} y={16}>
                <div className="relative">
                  <span
                    aria-hidden="true"
                    className="absolute -left-[2.35rem] top-2 h-2.5 w-2.5 rounded-full bg-accent shadow-[0_0_0_4px_rgba(63,214,198,0.15)] md:-left-[2.6rem]"
                  />
                  <h3 className="font-display text-h3 font-medium text-ink">
                    {entry.company}
                  </h3>

                  <div className="mt-6 space-y-10">
                    {entry.roles.map((role) => (
                      <div key={role.title}>
                        <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between">
                          <p className="text-accent/90">{role.title}</p>
                          <span className="text-sm text-ink-faint">
                            {role.start} to {role.end}
                          </span>
                        </div>
                        <ul className="mt-4 space-y-2">
                          {role.highlights.map((h) => (
                            <li
                              key={h}
                              className="flex gap-2.5 text-sm leading-relaxed text-ink-muted"
                            >
                              <span
                                aria-hidden="true"
                                className="mt-[0.6em] h-1 w-1 shrink-0 rounded-full bg-ink-faint"
                              />
                              {h}
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>
              </Reveal>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
