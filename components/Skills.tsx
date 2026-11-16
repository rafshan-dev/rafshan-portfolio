import Reveal from "./Reveal";
import SpotlightCard from "./SpotlightCard";
import { GravityTagPile } from "./gravity-tag-pile";
import { skillGroups } from "@/lib/data";

const allSkills = skillGroups.flatMap((group, groupIndex) =>
  group.skills.map((skill) => ({ label: skill, group: groupIndex })),
);
const groupLabels = skillGroups.map((group) => group.title);

export default function Skills() {
  return (
    <section id="skills" className="border-t border-line-soft py-28 md:py-36">
      <div className="container-page">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <Reveal>
            <p className="mb-3 text-xs font-medium uppercase tracking-[0.18em] text-accent">
              02 / Stack
            </p>
            <h2 className="font-display text-h2 font-medium text-ink max-w-xl">
              What I work with
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="max-w-sm text-sm leading-relaxed text-ink-muted">
              Drag, toss, or re-drop the stack—built around React, Next.js,
              TypeScript, and modern UI architecture.
            </p>
          </Reveal>
        </div>

        <Reveal delay={0.12}>
          <GravityTagPile
            theme="mono"
            pattern="grid"
            squash={0.8}
            tags={allSkills}
            groupLabels={groupLabels}
            className="mt-12 h-[440px] md:h-[480px]"
          />
        </Reveal>

        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {skillGroups.map((group, i) => (
            <Reveal key={group.title} delay={0.08 * (i + 1)}>
              <SpotlightCard className="h-full rounded-2xl border border-white/10 bg-base-card/35 p-6 backdrop-blur-sm">
                <h3 className="font-display text-lg font-medium text-ink">
                  {group.title}
                </h3>
                <p className="mt-1.5 text-sm leading-relaxed text-ink-muted">
                  {group.description}
                </p>
              </SpotlightCard>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
