import Reveal from "./Reveal";
import SpotlightCard from "./SpotlightCard";
import { moreWork } from "@/lib/data";

export default function MoreWork() {
  return (
    <div className="mt-28 md:mt-36">
      <Reveal>
        <h3 className="font-display text-h3 font-medium text-ink">More work</h3>
      </Reveal>
      <ul className="mt-10 grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
        {moreWork.map((item, i) => (
          <li key={item.name} className="bg-base-card">
            <Reveal delay={(i % 3) * 0.08} y={16}>
              <SpotlightCard className="h-full p-7">
                <h4 className="font-display text-lg font-medium text-ink">
                  {item.name}
                </h4>
                <p className="mt-3 text-sm leading-relaxed text-ink-muted">
                  {item.description}
                </p>
                <ul className="mt-5 flex flex-wrap gap-1.5">
                  {item.stack.map((s) => (
                    <li
                      key={s}
                      className="rounded-full border border-line px-2.5 py-0.5 text-xs text-ink-faint"
                    >
                      {s}
                    </li>
                  ))}
                </ul>
                {item.links && item.links.length > 0 && (
                  <div className="mt-5 flex gap-4">
                    {item.links.map((l) => (
                      <a
                        key={l.url}
                        href={l.url}
                        target="_blank"
                        rel="noreferrer noopener"
                        className="text-sm text-accent transition-colors hover:text-accent-bright"
                      >
                        {l.label}
                      </a>
                    ))}
                  </div>
                )}
              </SpotlightCard>
            </Reveal>
          </li>
        ))}
      </ul>
    </div>
  );
}
