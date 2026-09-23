import { nav, site } from "@/lib/data";

export default function Footer() {
  return (
    <footer className="border-t border-line-soft py-10">
      <div className="container-page flex flex-col items-center gap-6 text-sm text-ink-faint sm:flex-row sm:justify-between">
        <p>{site.name}</p>
        <nav aria-label="Footer" className="flex flex-wrap justify-center gap-6">
          {nav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="hover:text-ink-muted transition-colors"
            >
              {item.label}
            </a>
          ))}
        </nav>
        <p>© {new Date().getFullYear()} {site.name}. All rights reserved.</p>
      </div>
    </footer>
  );
}
