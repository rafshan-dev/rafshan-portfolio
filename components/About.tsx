import Reveal from "./Reveal";
import SpotlightCard from "./SpotlightCard";
import { AnnotationText } from "./annotation-text";
import { ContourLines } from "./contour-lines";
import { about } from "@/lib/data";

export default function About() {
  return (
    <section
      id="about"
      className="relative overflow-hidden border-t border-line-soft py-28 md:py-36"
    >
      <ContourLines className="absolute inset-0" />
      <div className="container-page relative z-10">
        <div className="grid gap-10 md:grid-cols-[1fr_2fr] md:gap-16">
          <div className="space-y-6">
            <Reveal>
              <p className="mb-3 text-xs font-medium uppercase tracking-[0.18em] text-accent">
                01 / About
              </p>
              <h2 className="font-display text-h2 font-medium text-ink">
                About
              </h2>
            </Reveal>

            <Reveal delay={0.12}>
              <SpotlightCard className="rounded-2xl border border-white/10 bg-base-card/45 p-6 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.08),0_20px_50px_-20px_rgba(0,0,0,0.7)] backdrop-blur-md">
                <p className="flex items-center gap-2 text-xs font-medium uppercase tracking-[0.16em] text-accent">
                  <span
                    aria-hidden="true"
                    className="h-1.5 w-1.5 rounded-full bg-accent"
                  />
                  {about.drives.question}
                </p>
                <p className="mt-3 text-base leading-relaxed text-ink">
                  {about.drives.answer}
                </p>
              </SpotlightCard>
            </Reveal>
          </div>

          <div className="max-w-2xl space-y-7 rounded-3xl border border-white/10 bg-base/55 p-6 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.07),0_24px_60px_-24px_rgba(0,0,0,0.75)] backdrop-blur-md md:p-8">
            <Reveal>
              <p className="font-display text-2xl font-medium leading-snug text-ink md:text-3xl">
                My focus is on{" "}
                <AnnotationText
                  type="underline"
                  color="#F15B55"
                  duration={1.1}
                  delay={0.2}
                >
                  frontend engineering
                </AnnotationText>{" "}
                and UI architecture, turning complex ideas into fast,{" "}
                <AnnotationText
                  type="underline"
                  color="#FF817A"
                  duration={1.1}
                  delay={0.6}
                >
                  intuitive
                </AnnotationText>{" "}
                web experiences.
              </p>
            </Reveal>

            <div className="space-y-5">
              {about.paragraphs.map((p, i) => (
                <Reveal key={i} delay={0.08 * (i + 1)}>
                  <p className="text-base leading-relaxed text-ink/85 md:text-lg">
                    {p}
                  </p>
                </Reveal>
              ))}
            </div>

            <Reveal delay={0.25}>
              <div className="grid gap-4 pt-2 sm:grid-cols-3">
                {about.pillars.map((pillar) => (
                  <SpotlightCard
                    key={pillar.label}
                    className="rounded-xl border border-white/10 bg-base-elevated/45 p-4 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.06)] backdrop-blur-md transition-colors duration-300 hover:border-accent/40"
                  >
                    <p className="text-sm font-medium text-ink">
                      {pillar.label}
                    </p>
                    <p className="mt-1.5 text-xs leading-relaxed text-ink/75">
                      {pillar.detail}
                    </p>
                  </SpotlightCard>
                ))}
              </div>
            </Reveal>

            <Reveal delay={0.3}>
              <p className="border-l-2 border-accent/60 pl-4 text-base italic leading-relaxed text-ink/80">
                {about.closing}
              </p>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
