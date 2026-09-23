import Reveal from "./Reveal";
import ProjectCard from "./ProjectCard";
import { projects } from "@/lib/data";

export default function Projects() {
  return (
    <section
      id="projects"
      className="border-t border-line-soft py-28 md:py-36"
    >
      <div className="container-page">
        <Reveal>
          <h2 className="font-display text-h2 font-medium text-ink max-w-xl">
            Featured projects
          </h2>
          <p className="mt-4 max-w-prose text-ink-muted">
            A selection of applications I've built or contributed to,
            spanning tooling, community platforms, and product sites.
          </p>
        </Reveal>

        <div className="mt-20 space-y-24 md:space-y-32">
          {projects.map((project, i) => (
            <Reveal key={project.slug} delay={i === 0 ? 0 : 0.05} as="section">
              <ProjectCard project={project} reversed={i % 2 === 1} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
