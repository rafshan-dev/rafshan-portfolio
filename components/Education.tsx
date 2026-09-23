import Reveal from "./Reveal";
import { certificates, education, languages } from "@/lib/data";

export default function Education() {
  return (
    <section
      id="education"
      className="border-t border-line-soft py-28 md:py-36"
    >
      <div className="container-page">
        <div className="grid gap-14 md:grid-cols-2 md:gap-16">
          <div>
            <Reveal>
              <h2 className="font-display text-h2 font-medium text-ink">
                Education
              </h2>
            </Reveal>

            <div className="mt-8 space-y-6">
              {education.map((entry, i) => (
                <Reveal key={entry.institution} delay={i * 0.08}>
                  <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between">
                    <h3 className="font-medium text-ink">{entry.degree}</h3>
                    <span className="text-sm text-ink-faint">
                      {entry.start} — {entry.end}
                    </span>
                  </div>
                  <p className="mt-1 text-accent/90 text-sm">
                    {entry.institution} · {entry.location}
                  </p>
                </Reveal>
              ))}
            </div>
          </div>

          <div>
            <Reveal>
              <h2 className="font-display text-h2 font-medium text-ink">
                Certificates
              </h2>
            </Reveal>

            <Reveal delay={0.08}>
              <ul className="mt-8 space-y-3">
                {certificates.map((cert) => (
                  <li
                    key={cert}
                    className="flex gap-2.5 text-ink-muted leading-relaxed transition-colors duration-300 hover:text-ink"
                  >
                    <span
                      aria-hidden="true"
                      className="mt-[0.5em] h-1 w-1 shrink-0 rounded-full bg-accent/70"
                    />
                    {cert}
                  </li>
                ))}
              </ul>
            </Reveal>

            <Reveal delay={0.14}>
              <p className="mt-8 text-sm text-ink-faint">
                Languages: {languages.join(" · ")}
              </p>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
