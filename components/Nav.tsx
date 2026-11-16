"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { PrismFlow } from "./prism-flow";
import { nav, site } from "@/lib/data";

export default function Nav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hoveredHref, setHoveredHref] = useState<string | null>(null);

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
    <header className="fixed inset-x-0 top-3 z-50 px-3 md:top-4 md:px-4">
      <div
        className={`relative flex h-14 items-center justify-between overflow-hidden rounded-full border border-white/10 px-4 shadow-[0_10px_35px_rgba(0,0,0,0.45),inset_0_1px_0_rgba(255,255,255,0.06)] backdrop-blur-xl transition-colors duration-300 md:h-16 md:w-fit md:gap-6 md:px-5 ${
          scrolled ? "bg-base-deep/85" : "bg-base-deep/75"
        }`}
      >
        <PrismFlow className="absolute inset-0 opacity-60" />
        <a
          href="#hero"
          aria-label={site.name}
          className="relative z-10 inline-flex shrink-0 items-center transition-opacity duration-200 hover:opacity-85"
        >
          <img
            src="/favicon.svg"
            alt={site.name}
            width={32}
            height={32}
            className="h-8 w-8 rounded-lg border border-white/10 md:h-9 md:w-9 md:rounded-xl"
          />
        </a>

        <nav
          aria-label="Primary"
          onMouseLeave={() => setHoveredHref(null)}
          className="relative z-10 hidden items-center gap-1 md:flex"
        >
          {nav.map((item) => {
            const isHovered = hoveredHref === item.href;
            return (
              <a
                key={item.href}
                href={item.href}
                onMouseEnter={() => setHoveredHref(item.href)}
                className={`relative rounded-full px-3.5 py-1.5 text-[13px] font-medium transition-colors duration-200 ${
                  isHovered ? "text-ink" : "text-ink-muted hover:text-ink"
                }`}
              >
                {item.label}
                {isHovered && (
                  <motion.span
                    layoutId="nav-hover-line"
                    transition={{ type: "spring", stiffness: 460, damping: 34 }}
                    className="absolute inset-0 -z-10 rounded-full bg-white/[0.08]"
                  />
                )}
              </a>
            );
          })}
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
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
