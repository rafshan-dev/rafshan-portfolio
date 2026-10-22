"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { nav, site } from "@/lib/data";

export default function Nav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className="fixed inset-x-0 top-3 z-50 px-3 md:top-4 md:px-6"
    >
      <div
        className={`mx-auto flex h-14 max-w-6xl items-center justify-between rounded-full border px-4 transition-all duration-300 md:h-[4.5rem] md:px-6 ${
          scrolled
            ? "border-line bg-base-deep/90 shadow-lg shadow-black/10 backdrop-blur-xl"
            : "border-line/70 bg-base-deep/65 backdrop-blur-lg"
        }`}
      >
        <a
          href="#hero"
          className="font-display text-sm font-semibold tracking-tight text-ink transition-colors hover:text-accent md:text-base"
        >
          {site.name}
        </a>

        <nav
          aria-label="Primary"
          className="hidden md:flex items-center gap-8"
        >
          {nav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="group/nav relative text-sm text-ink-muted transition-colors hover:text-ink"
            >
              {item.label}
              <span
                aria-hidden="true"
                className="absolute -bottom-1 left-0 h-px w-full origin-left scale-x-0 bg-accent transition-transform duration-300 ease-out-expo group-hover/nav:scale-x-100"
              />
            </a>
          ))}
          <a
            href="#contact"
            className="rounded-full border border-accent/40 px-4 py-2 text-sm text-accent hover:bg-accent/10 transition-colors"
          >
            Get in touch
          </a>
        </nav>

        <button
          type="button"
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((v) => !v)}
          className="md:hidden relative z-[70] flex h-10 w-10 flex-col items-center justify-center gap-1.5"
        >
          <span
            className={`block h-px w-6 bg-ink transition-transform duration-300 ${
              open ? "translate-y-[3.5px] rotate-45" : ""
            }`}
          />
          <span
            className={`block h-px w-6 bg-ink transition-opacity duration-300 ${
              open ? "opacity-0" : "opacity-100"
            }`}
          />
          <span
            className={`block h-px w-6 bg-ink transition-transform duration-300 ${
              open ? "-translate-y-[5px] -rotate-45" : ""
            }`}
          />
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[60] bg-base-deep md:hidden"
          >
            <nav
              aria-label="Mobile"
              className="flex h-full flex-col items-start justify-center gap-8 px-8"
            >
              {nav.map((item, i) => (
                <motion.a
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.05 * i, duration: 0.35 }}
                  className="font-display text-3xl text-ink hover:text-accent transition-colors"
                >
                  {item.label}
                </motion.a>
              ))}
              <motion.a
                href="#contact"
                onClick={() => setOpen(false)}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.05 * nav.length, duration: 0.35 }}
                className="mt-4 rounded-full border border-accent/40 px-5 py-2.5 text-accent"
              >
                Get in touch
              </motion.a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
