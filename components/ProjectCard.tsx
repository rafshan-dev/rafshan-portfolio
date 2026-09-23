"use client";

import { useRef } from "react";
import Image from "next/image";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "motion/react";
import type { Project } from "@/lib/data";

export default function ProjectCard({
  project,
  reversed = false,
}: {
  project: Project;
  reversed?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const previewRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const parallaxY = useTransform(
    scrollYProgress,
    [0, 1],
    shouldReduceMotion ? [0, 0] : [-24, 24]
  );

  // Subtle cursor-driven tilt on the preview card.
  const tiltX = useMotionValue(0);
  const tiltY = useMotionValue(0);
  const springTiltX = useSpring(tiltX, { stiffness: 150, damping: 18 });
  const springTiltY = useSpring(tiltY, { stiffness: 150, damping: 18 });

  const handlePreviewMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (shouldReduceMotion || !previewRef.current) return;
    const rect = previewRef.current.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    tiltY.set(px * 6);
    tiltX.set(py * -6);
  };

  const handlePreviewLeave = () => {
    tiltX.set(0);
    tiltY.set(0);
  };

  return (
    <div
      ref={ref}
      className={`grid gap-8 md:grid-cols-2 md:gap-14 md:items-center ${
        reversed ? "md:[&>*:first-child]:order-2" : ""
      }`}
    >
      {/* Preview */}
      <div style={{ perspective: 1200 }}>
        <motion.div
          ref={previewRef}
          onMouseMove={handlePreviewMove}
          onMouseLeave={handlePreviewLeave}
          style={{ rotateX: springTiltX, rotateY: springTiltY }}
          className="group relative overflow-hidden rounded-2xl border border-line bg-base-card"
        >
          <div className="relative aspect-[3/2] overflow-hidden">
            <motion.div style={{ y: parallaxY }} className="absolute inset-0 -m-6">
              <Image
                src={project.image}
                alt={`${project.name} preview`}
                fill
                className="object-cover transition-transform duration-500 ease-out-expo group-hover:scale-[1.03]"
                sizes="(min-width: 768px) 40vw, 90vw"
              />
            </motion.div>
            <div className="absolute inset-0 bg-gradient-to-t from-base-card/60 via-transparent to-transparent" />
            <div className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 ring-1 ring-inset ring-accent/30 transition-opacity duration-500 group-hover:opacity-100" />
          </div>
        </motion.div>
      </div>

      {/* Content */}
      <div>
        <h3 className="font-display text-h3 font-medium text-ink">
          {project.name}
        </h3>
        <p className="mt-2 text-accent/90 text-sm">{project.tagline}</p>

        <dl className="mt-6 space-y-5">
          <div>
            <dt className="text-xs text-ink-faint uppercase tracking-wide">
              Problem
            </dt>
            <dd className="mt-1.5 text-ink-muted leading-relaxed">
              {project.problem}
            </dd>
          </div>
          <div>
            <dt className="text-xs text-ink-faint uppercase tracking-wide">
              My contribution
            </dt>
            <dd className="mt-1.5 text-ink-muted leading-relaxed">
              {project.contribution}
            </dd>
          </div>
          <div>
            <dt className="text-xs text-ink-faint uppercase tracking-wide">
              Key features
            </dt>
            <dd className="mt-2">
              <ul className="space-y-1.5">
                {project.features.map((f) => (
                  <li
                    key={f}
                    className="flex gap-2.5 text-ink-muted leading-relaxed"
                  >
                    <span
                      aria-hidden="true"
                      className="mt-[0.6em] h-1 w-1 shrink-0 rounded-full bg-accent/70"
                    />
                    {f}
                  </li>
                ))}
              </ul>
            </dd>
          </div>
        </dl>

        <ul className="mt-6 flex flex-wrap gap-2">
          {project.stack.map((tech) => (
            <li
              key={tech}
              className="rounded-full border border-line px-3 py-1 text-xs text-ink-muted"
            >
              {tech}
            </li>
          ))}
        </ul>

        {(project.demoUrl || project.sourceUrl) && (
          <div className="mt-7 flex flex-wrap gap-5">
            {project.demoUrl && (
              <a
                href={project.demoUrl}
                target="_blank"
                rel="noreferrer noopener"
                className="group/link inline-flex items-center gap-1.5 text-sm font-medium text-accent transition-colors hover:text-accent-bright"
              >
                Live demo
                <span
                  aria-hidden="true"
                  className="inline-block transition-transform duration-300 ease-out-expo group-hover/link:translate-x-1"
                >
                  →
                </span>
              </a>
            )}
            {project.sourceUrl && (
              <a
                href={project.sourceUrl}
                target="_blank"
                rel="noreferrer noopener"
                className="group/link inline-flex items-center gap-1.5 text-sm font-medium text-ink-muted transition-colors hover:text-ink"
              >
                Source code
                <span
                  aria-hidden="true"
                  className="inline-block transition-transform duration-300 ease-out-expo group-hover/link:translate-x-1"
                >
                  →
                </span>
              </a>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
