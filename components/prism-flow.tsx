"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "motion/react";

export interface PrismFlowProps {
  className?: string;
  colors?: [string, string, string];
}

export function PrismFlow({
  className = "",
  colors = [
    "rgba(241, 91, 85, 0.34)",
    "rgba(255, 129, 122, 0.24)",
    "rgba(200, 68, 64, 0.28)",
  ],
}: PrismFlowProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = 0;
    let height = 0;
    let dpr = 1;
    let raf = 0;

    const resize = () => {
      const parent = canvas.parentElement;
      if (!parent) return;
      const rect = parent.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.max(1, Math.floor(width * dpr));
      canvas.height = Math.max(1, Math.floor(height * dpr));
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    resize();

    const draw = (t: number) => {
      if (width <= 0 || height <= 0) return;
      ctx.clearRect(0, 0, width, height);

      ctx.save();
      ctx.globalCompositeOperation = "screen";

      // Three flowing refractive prism bands
      for (let i = 0; i < 3; i++) {
        const phase = t * (0.35 + i * 0.12) + i * 2.1;
        const cx = width * (0.25 + 0.25 * i + Math.sin(phase) * 0.18);
        const cy = height * (0.5 + Math.cos(phase * 0.8) * 0.25);
        const rx = Math.max(width * 0.32, 160);
        const ry = Math.max(height * 1.15, 70);

        ctx.save();
        ctx.translate(cx, cy);
        ctx.rotate(Math.sin(phase * 0.5) * 0.25 + (i - 1) * 0.2);
        ctx.scale(1, ry / rx);

        const grad = ctx.createRadialGradient(0, 0, 0, 0, 0, rx);
        grad.addColorStop(0, colors[i]);
        grad.addColorStop(0.55, colors[i].replace(/[\d.]+\)$/, "0.08)"));
        grad.addColorStop(1, "rgba(0, 0, 0, 0)");

        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(0, 0, rx, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }

      // Subtle diagonal prism sheen
      const sheenX = ((t * 0.12) % 1.6 - 0.3) * width;
      const sheen = ctx.createLinearGradient(
        sheenX - 120,
        0,
        sheenX + 120,
        height,
      );
      sheen.addColorStop(0, "rgba(233, 236, 239, 0)");
      sheen.addColorStop(0.5, "rgba(233, 236, 239, 0.07)");
      sheen.addColorStop(1, "rgba(233, 236, 239, 0)");
      ctx.fillStyle = sheen;
      ctx.fillRect(0, 0, width, height);

      ctx.restore();
    };

    if (shouldReduceMotion) {
      draw(0);
      const onResize = () => {
        resize();
        draw(0);
      };
      window.addEventListener("resize", onResize);
      return () => window.removeEventListener("resize", onResize);
    }

    const render = (now: number) => {
      draw(now * 0.001);
      raf = requestAnimationFrame(render);
    };

    window.addEventListener("resize", resize);
    raf = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, [colors, shouldReduceMotion]);

  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none overflow-hidden ${className}`}
    >
      <canvas ref={canvasRef} className="h-full w-full" />
    </div>
  );
}
