import Reveal from "./Reveal";
import { education } from "@/lib/data";

export default function Education() {
  return (
    <section id="education" className="border-t border-line-soft py-28 md:py-36">
      <div className="container-page">
        <Reveal>
          <h2 className="font-display text-h2 font-medium text-ink">Education</h2>
        </Reveal>
        <div className="mt-10 space-y-6">
          {education.map((entry, i) => (
            <Reveal key={entry.institution} delay={i * 0.08}>
              <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between">
                <h3 className="font-medium text-ink">{entry.degree}</h3>
                <span className="text-sm text-ink-faint">
                  {entry.start} to {entry.end}
                </span>
              </div>
              <p className="mt-1 text-sm text-accent/90">
                {entry.institution} ({entry.detail})
              </p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
