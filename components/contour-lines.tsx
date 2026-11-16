"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "motion/react";

export interface ContourLinesProps {
  className?: string;
  lineColor?: string;
  accentColor?: string;
  levels?: number;
  cellSize?: number;
}

export function ContourLines({
  className = "",
  lineColor = "139, 147, 160",
  accentColor = "241, 91, 85",
  levels = 9,
  cellSize = 18,
}: ContourLinesProps) {
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
    let pointerX = -9999;
    let pointerY = -9999;

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

    const field = (x: number, y: number, t: number) => {
      const nx = x * 0.0042;
      const ny = y * 0.0042;
      let v =
        Math.sin(nx + t * 0.35) * Math.cos(ny - t * 0.28) +
        0.55 * Math.sin(nx * 1.9 - ny * 1.4 + t * 0.22) +
        0.35 * Math.cos(nx * 2.7 + ny * 2.1 - t * 0.18);

      if (pointerX > -1000) {
        const dx = x - pointerX;
        const dy = y - pointerY;
        const d2 = dx * dx + dy * dy;
        if (d2 < 38000) {
          v += Math.exp(-d2 / 14000) * 0.65;
        }
      }
      return v;
    };

    const drawContours = (t: number) => {
      if (width <= 0 || height <= 0) return;
      ctx.clearRect(0, 0, width, height);

      const cols = Math.ceil(width / cellSize) + 1;
      const rows = Math.ceil(height / cellSize) + 1;
      const grid = new Float32Array(cols * rows);

      for (let r = 0; r < rows; r++) {
        const y = r * cellSize;
        for (let c = 0; c < cols; c++) {
          grid[r * cols + c] = field(c * cellSize, y, t);
        }
      }

      const minV = -1.4;
      const maxV = 1.4;

      for (let l = 0; l < levels; l++) {
        const threshold = minV + ((l + 0.5) / levels) * (maxV - minV);
        const isAccent = l % 3 === 1;
        ctx.strokeStyle = isAccent
          ? `rgba(${accentColor}, 0.28)`
          : `rgba(${lineColor}, 0.14)`;
        ctx.lineWidth = isAccent ? 1.35 : 1;
        ctx.beginPath();

        for (let r = 0; r < rows - 1; r++) {
          const y0 = r * cellSize;
          const y1 = y0 + cellSize;
          for (let c = 0; c < cols - 1; c++) {
            const x0 = c * cellSize;
            const x1 = x0 + cellSize;

            const v0 = grid[r * cols + c];
            const v1 = grid[r * cols + c + 1];
            const v2 = grid[(r + 1) * cols + c + 1];
            const v3 = grid[(r + 1) * cols + c];

            const b0 = v0 >= threshold ? 1 : 0;
            const b1 = v1 >= threshold ? 2 : 0;
            const b2 = v2 >= threshold ? 4 : 0;
            const b3 = v3 >= threshold ? 8 : 0;
            const mask = b0 | b1 | b2 | b3;

            if (mask === 0 || mask === 15) continue;

            const interp = (a: number, b: number) => {
              const d = b - a;
              return Math.abs(d) < 1e-5 ? 0.5 : (threshold - a) / d;
            };

            const topX = x0 + interp(v0, v1) * cellSize;
            const rightY = y0 + interp(v1, v2) * cellSize;
            const bottomX = x0 + interp(v3, v2) * cellSize;
            const leftY = y0 + interp(v0, v3) * cellSize;

            const seg = (ax: number, ay: number, bx: number, by: number) => {
              ctx.moveTo(ax, ay);
              ctx.lineTo(bx, by);
            };

            switch (mask) {
              case 1:
              case 14:
                seg(x0, leftY, topX, y0);
                break;
              case 2:
              case 13:
                seg(topX, y0, x1, rightY);
                break;
              case 3:
              case 12:
                seg(x0, leftY, x1, rightY);
                break;
              case 4:
              case 11:
                seg(x1, rightY, bottomX, y1);
                break;
              case 5:
                seg(x0, leftY, topX, y0);
                seg(x1, rightY, bottomX, y1);
                break;
              case 6:
              case 9:
                seg(topX, y0, bottomX, y1);
                break;
              case 7:
              case 8:
                seg(x0, leftY, bottomX, y1);
                break;
              case 10:
                seg(topX, y0, x1, rightY);
                seg(x0, leftY, bottomX, y1);
                break;
            }
          }
        }
        ctx.stroke();
      }
    };

    if (shouldReduceMotion) {
      drawContours(0);
      const onResize = () => {
        resize();
        drawContours(0);
      };
      window.addEventListener("resize", onResize);
      return () => window.removeEventListener("resize", onResize);
    }

    const onPointerMove = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      if (x >= 0 && x <= width && y >= 0 && y <= height) {
        pointerX = x;
        pointerY = y;
      } else {
        pointerX = -9999;
        pointerY = -9999;
      }
    };

    const render = (now: number) => {
      drawContours(now * 0.001);
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
  }, [accentColor, cellSize, levels, lineColor, shouldReduceMotion]);

  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none overflow-hidden [mask-image:radial-gradient(ellipse_at_center,black_65%,transparent_100%)] ${className}`}
    >
      <canvas ref={canvasRef} className="h-full w-full" />
    </div>
  );
}

