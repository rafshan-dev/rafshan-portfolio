"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "motion/react";

export interface PixelBlastProps {
  className?: string;
  color?: string;
  baseColor?: string;
  gap?: number;
  pixelSize?: number;
}

interface Ripple {
  x: number;
  y: number;
  start: number;
}

export function PixelBlast({
  className = "",
  color = "241, 91, 85",
  baseColor = "139, 147, 160",
  gap = 16,
  pixelSize = 3.5,
}: PixelBlastProps) {
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
    const ripples: Ripple[] = [];
    let lastRippleAt = 0;

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

    const drawStatic = () => {
      ctx.clearRect(0, 0, width, height);
      for (let x = gap / 2; x < width; x += gap) {
        for (let y = gap / 2; y < height; y += gap) {
          ctx.fillStyle = `rgba(${baseColor}, 0.16)`;
          ctx.fillRect(x, y, pixelSize, pixelSize);
        }
      }
    };

    if (shouldReduceMotion) {
      drawStatic();
      const onResize = () => {
        resize();
        drawStatic();
      };
      window.addEventListener("resize", onResize);
      return () => window.removeEventListener("resize", onResize);
    }

    const onPointerMove = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      if (x < 0 || x > width || y < 0 || y > height) return;
      const now = performance.now();
      if (now - lastRippleAt > 90) {
        lastRippleAt = now;
        ripples.push({ x, y, start: now });
        if (ripples.length > 8) ripples.shift();
      }
    };

    let lastAutoBlast = 0;

    const render = (now: number) => {
      ctx.clearRect(0, 0, width, height);

      // Gentle periodic ambient blast so the effect is visible even before hover
      if (width > 0 && height > 0 && now - lastAutoBlast > 2200) {
        lastAutoBlast = now;
        ripples.push({
          x: width * (0.25 + ((now * 0.00017) % 0.5)),
          y: height * (0.25 + ((now * 0.00023) % 0.5)),
          start: now,
        });
        if (ripples.length > 8) ripples.shift();
      }

      // Prune finished ripples (> 1600ms)
      while (ripples.length > 0 && now - ripples[0].start > 1600) {
        ripples.shift();
      }

      const t = now * 0.001;

      for (let x = gap / 2; x < width; x += gap) {
        for (let y = gap / 2; y < height; y += gap) {
          // Subtle ambient shimmer
          const wave = Math.sin(x * 0.015 + t * 0.9) * Math.cos(y * 0.015 - t * 0.7);
          const ambient = Math.max(0, wave) * 0.18;

          // Interactive & ambient ripple blast
          let blast = 0;
          for (let r = 0; r < ripples.length; r++) {
            const ripple = ripples[r];
            const age = (now - ripple.start) / 1600;
            const radius = age * 260;
            const dist = Math.hypot(x - ripple.x, y - ripple.y);
            const ring = Math.max(0, 1 - Math.abs(dist - radius) / 56);
            blast = Math.max(blast, ring * (1 - age) * 0.85);
          }

          if (blast > 0.02) {
            ctx.fillStyle = `rgba(${color}, ${Math.min(0.85, blast + 0.18)})`;
            const s = pixelSize + blast * 3;
            ctx.fillRect(x - (s - pixelSize) / 2, y - (s - pixelSize) / 2, s, s);
          } else {
            ctx.fillStyle = `rgba(${baseColor}, ${0.14 + ambient})`;
            ctx.fillRect(x, y, pixelSize, pixelSize);
          }
        }
      }

      raf = requestAnimationFrame(render);
    };

    window.addEventListener("resize", resize);
    window.addEventListener("pointermove", onPointerMove, { passive: true });
    raf = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onPointerMove);
    };
  }, [baseColor, color, gap, pixelSize, shouldReduceMotion]);

  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none overflow-hidden [mask-image:radial-gradient(ellipse_at_center,black_65%,transparent_100%)] ${className}`}
    >
      <canvas ref={canvasRef} className="h-full w-full" />
    </div>
  );
}

