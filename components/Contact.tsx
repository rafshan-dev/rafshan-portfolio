import Reveal from "./Reveal";
import MagneticButton from "./MagneticButton";
import { contact, site } from "@/lib/data";

export default function Contact() {
  return (
    <section id="contact" className="border-t border-line-soft py-28 md:py-40">
      <div className="container-page">
        <Reveal className="mx-auto max-w-2xl text-center">
          <h2 className="font-display text-h2 font-medium text-ink balance">
            {contact.heading}
          </h2>
          <p className="mt-6 text-lg leading-relaxed text-ink-muted">
            {contact.body}
          </p>

          <div className="mt-10 flex flex-col items-center gap-5 sm:flex-row sm:justify-center">
            <MagneticButton>
              <a
                href={`mailto:${site.email}`}
                className="inline-block rounded-full bg-accent px-7 py-3 text-sm font-medium text-base-deep transition-colors duration-300 hover:bg-accent-bright"
              >
                {site.email}
              </a>
            </MagneticButton>
          </div>

          <p className="mt-4 text-sm text-ink-faint">{site.phone}</p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-ink-muted">
            <a
              href={site.github}
              target="_blank"
              rel="noreferrer noopener"
              className="transition-all duration-300 hover:-translate-y-0.5 hover:text-ink"
            >
              GitHub
            </a>
            <span aria-hidden="true" className="text-ink-faint">
              /
            </span>
            <a
              href={site.linkedin}
              target="_blank"
              rel="noreferrer noopener"
              className="transition-all duration-300 hover:-translate-y-0.5 hover:text-ink"
            >
              LinkedIn
            </a>
            <span aria-hidden="true" className="text-ink-faint">
              /
            </span>
            <a
              href={site.gitlab}
              target="_blank"
              rel="noreferrer noopener"
              className="transition-all duration-300 hover:-translate-y-0.5 hover:text-ink"
            >
              GitLab
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
