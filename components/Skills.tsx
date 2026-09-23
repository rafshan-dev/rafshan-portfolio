import Reveal from "./Reveal";
import SpotlightCard from "./SpotlightCard";
import { skillGroups } from "@/lib/data";

export default function Skills() {
  return (
    <section id="skills" className="border-t border-line-soft py-28 md:py-36">
      <div className="container-page">
        <Reveal>
          <h2 className="font-display text-h2 font-medium text-ink max-w-xl">
            What I work with
          </h2>
        </Reveal>

        <div className="mt-16 grid gap-px overflow-hidden rounded-2xl border border-line bg-line md:grid-cols-3">
          {skillGroups.map((group, i) => (
            <Reveal key={group.title} delay={i * 0.1}>
              <SpotlightCard className="h-full bg-base-card p-8 md:p-10">
                <h3 className="font-display text-h3 font-medium text-ink">
                  {group.title}
                </h3>
                <p className="mt-2 text-sm text-ink-muted">
                  {group.description}
                </p>
                <ul className="mt-8 flex flex-wrap gap-2.5">
                  {group.skills.map((skill) => (
                    <li
                      key={skill}
                      className="rounded-full border border-line px-3.5 py-1.5 text-sm text-ink-muted transition-all duration-300 hover:-translate-y-0.5 hover:border-accent/40 hover:text-accent"
                    >
                      {skill}
                    </li>
                  ))}
                </ul>
              </SpotlightCard>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
