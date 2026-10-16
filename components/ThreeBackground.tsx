"use client";

import { useEffect, useRef } from "react";

/**
 * Fixed, full-viewport Three.js scene behind the page. A single point cloud
 * morphs between six shapes as the visitor scrolls (one per section), while
 * the cloud rotates and drifts left/right so it stays clear of the text.
 *
 * - three.js is loaded lazily on the client, so it never blocks first paint.
 * - Morphing runs in the vertex shader; the CPU only updates a few uniforms.
 * - Under prefers-reduced-motion it renders one static frame and stops.
 * - If WebGL is unavailable, it silently renders nothing.
 */

const SECTION_IDS = ["hero", "about", "skills", "projects", "experience", "contact"];
const SHAPE_COUNT = SECTION_IDS.length;

// Deterministic PRNG so shapes are identical between renders.
function mulberry32(seed: number) {
  let a = seed;
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function buildShapes(n: number): Float32Array[] {
  const rnd = mulberry32(42);
  const shapes = Array.from({ length: SHAPE_COUNT }, () => new Float32Array(n * 3));

  for (let i = 0; i < n; i++) {
    const i3 = i * 3;

    // 0: sphere (fibonacci)
    {
      const y = 1 - (i / (n - 1)) * 2;
      const r = Math.sqrt(1 - y * y);
      const th = i * 2.399963;
      shapes[0][i3] = Math.cos(th) * r * 2.1;
      shapes[0][i3 + 1] = y * 2.1;
      shapes[0][i3 + 2] = Math.sin(th) * r * 2.1;
    }
    // 1: torus
    {
      const u = rnd() * Math.PI * 2;
      const v = rnd() * Math.PI * 2;
      const R = 1.9;
      const r = 0.7;
      shapes[1][i3] = (R + r * Math.cos(v)) * Math.cos(u);
      shapes[1][i3 + 1] = r * Math.sin(v) * 1.2;
      shapes[1][i3 + 2] = (R + r * Math.cos(v)) * Math.sin(u);
    }
    // 2: lattice cube
    {
      const side = Math.ceil(Math.cbrt(n));
      const x = i % side;
      const y = Math.floor(i / side) % side;
      const z = Math.floor(i / (side * side)) % side;
      const s = 3.4 / (side - 1);
      shapes[2][i3] = x * s - 1.7 + (rnd() - 0.5) * 0.04;
      shapes[2][i3 + 1] = y * s - 1.7 + (rnd() - 0.5) * 0.04;
      shapes[2][i3 + 2] = z * s - 1.7 + (rnd() - 0.5) * 0.04;
    }
    // 3: double helix
    {
      const t = (i / n) * Math.PI * 8;
      const strand = i % 2 === 0 ? 0 : Math.PI;
      const rad = 1.3 + (rnd() - 0.5) * 0.15;
      shapes[3][i3] = Math.cos(t + strand) * rad;
      shapes[3][i3 + 1] = (i / n - 0.5) * 5.2;
      shapes[3][i3 + 2] = Math.sin(t + strand) * rad;
    }
    // 4: wave plane
    {
      const side = Math.ceil(Math.sqrt(n));
      const gx = i % side;
      const gz = Math.floor(i / side);
      const x = (gx / (side - 1) - 0.5) * 6;
      const z = (gz / (side - 1) - 0.5) * 6;
      shapes[4][i3] = x;
      shapes[4][i3 + 1] = Math.sin(x * 1.4) * Math.cos(z * 1.4) * 0.55 - 0.6;
      shapes[4][i3 + 2] = z;
    }
    // 5: spiral galaxy
    {
      const r = Math.pow(rnd(), 0.6) * 3;
      const arm = (i % 3) * ((Math.PI * 2) / 3);
      const a = r * 1.6 + arm + (rnd() - 0.5) * 0.5;
      shapes[5][i3] = Math.cos(a) * r;
      shapes[5][i3 + 1] = (rnd() - 0.5) * 0.35 * (1 - r / 3.4);
      shapes[5][i3 + 2] = Math.sin(a) * r;
    }
  }
  return shapes;
}

const VERTEX = /* glsl */ `
  uniform float uProgress;
  uniform float uTime;
  uniform float uSize;
  uniform float uPixelRatio;
  attribute vec3 aShape1;
  attribute vec3 aShape2;
  attribute vec3 aShape3;
  attribute vec3 aShape4;
  attribute vec3 aShape5;
  attribute float aRand;
  varying float vMix;

  vec3 pick(float i) {
    if (i < 0.5) return position;
    if (i < 1.5) return aShape1;
    if (i < 2.5) return aShape2;
    if (i < 3.5) return aShape3;
    if (i < 4.5) return aShape4;
    return aShape5;
  }

  void main() {
    float p = clamp(uProgress, 0.0, 5.0);
    float i = floor(p);
    float f = fract(p);
    // Stagger each point's transition a little so the morph feels fluid.
    float t = smoothstep(0.0, 1.0, clamp(f * 1.5 - aRand * 0.5, 0.0, 1.0));
    vec3 pos = mix(pick(i), pick(min(i + 1.0, 5.0)), t);
    pos += 0.04 * vec3(
      sin(uTime * 0.6 + aRand * 40.0),
      cos(uTime * 0.5 + aRand * 31.0),
      sin(uTime * 0.7 + aRand * 17.0)
    );
    vec4 mv = modelViewMatrix * vec4(pos, 1.0);
    gl_Position = projectionMatrix * mv;
    gl_PointSize = uSize * uPixelRatio * (6.0 / -mv.z);
    vMix = aRand;
  }
`;

const FRAGMENT = /* glsl */ `
  uniform vec3 uColorA;
  uniform vec3 uColorB;
  uniform float uOpacity;
  varying float vMix;

  void main() {
    float d = length(gl_PointCoord - 0.5);
    if (d > 0.5) discard;
    float a = smoothstep(0.5, 0.0, d);
    gl_FragColor = vec4(mix(uColorA, uColorB, vMix), a * uOpacity);
    #include <colorspace_fragment>
  }
`;

export default function ThreeBackground() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    let disposed = false;
    let cleanup: (() => void) | undefined;

    (async () => {
      const THREE = await import("three");
      if (disposed) return;

      const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const canHover = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
      const isMobile = () => window.innerWidth < 768;

      let renderer: InstanceType<typeof THREE.WebGLRenderer>;
      try {
        renderer = new THREE.WebGLRenderer({ alpha: true, antialias: false, powerPreference: "low-power" });
      } catch {
        return; // WebGL unavailable: page works without the scene
      }

      const count = isMobile() ? 1800 : 4000;
      const shapes = buildShapes(count);
      const rand = new Float32Array(count);
      const rnd = mulberry32(7);
      for (let i = 0; i < count; i++) rand[i] = rnd();

      const geometry = new THREE.BufferGeometry();
      geometry.setAttribute("position", new THREE.BufferAttribute(shapes[0], 3));
      for (let s = 1; s < SHAPE_COUNT; s++) {
        geometry.setAttribute(`aShape${s}`, new THREE.BufferAttribute(shapes[s], 3));
      }
      geometry.setAttribute("aRand", new THREE.BufferAttribute(rand, 1));

      const material = new THREE.ShaderMaterial({
        vertexShader: VERTEX,
        fragmentShader: FRAGMENT,
        transparent: true,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
        uniforms: {
          uProgress: { value: 0 },
          uTime: { value: 0 },
          uSize: { value: 2.4 },
          uPixelRatio: { value: 1 },
          uOpacity: { value: 0.55 },
          uColorA: { value: new THREE.Color("#3FD6C6") },
          uColorB: { value: new THREE.Color("#7EEFE2") },
        },
      });

      const points = new THREE.Points(geometry, material);
      const scene = new THREE.Scene();
      scene.add(points);
      const camera = new THREE.PerspectiveCamera(50, 1, 0.1, 50);
      camera.position.z = 7;

      renderer.domElement.setAttribute("aria-hidden", "true");
      renderer.domElement.style.display = "block";
      mount.appendChild(renderer.domElement);

      // Scroll -> shape progress, based on where each section actually sits.
      let tops: number[] = [];
      const measure = () => {
        tops = SECTION_IDS.map((id) => {
          const el = document.getElementById(id);
          return el ? el.getBoundingClientRect().top + window.scrollY : 0;
        });
      };
      const targetProgress = () => {
        const y = window.scrollY + window.innerHeight * 0.45;
        if (y <= tops[0]) return 0;
        for (let i = 0; i < tops.length - 1; i++) {
          if (y < tops[i + 1]) return i + (y - tops[i]) / Math.max(1, tops[i + 1] - tops[i]);
        }
        return SHAPE_COUNT - 1;
      };

      const resize = () => {
        const w = window.innerWidth;
        const h = window.innerHeight;
        const dpr = Math.min(window.devicePixelRatio || 1, isMobile() ? 1.5 : 2);
        renderer.setPixelRatio(dpr);
        renderer.setSize(w, h);
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
        material.uniforms.uPixelRatio.value = dpr;
        material.uniforms.uOpacity.value = isMobile() ? 0.4 : 0.55;
        measure();
      };
      resize();

      // Horizontal drift per shape keeps the cloud off the text column.
      const xOffsets = [2.4, -2.4, 0.0, 2.4, -2.4, 0.0];
      const sampleOffset = (p: number) => {
        const i = Math.min(Math.floor(p), SHAPE_COUNT - 2);
        const f = p - i;
        const e = f * f * (3 - 2 * f);
        return xOffsets[i] + (xOffsets[i + 1] - xOffsets[i]) * e;
      };

      let current = 0;
      let pointerX = 0;
      let pointerY = 0;
      let raf = 0;
      const clock = new THREE.Clock();

      const frame = () => {
        const dt = Math.min(clock.getDelta(), 0.05);
        const elapsed = clock.elapsedTime;
        const target = targetProgress();
        current += (target - current) * Math.min(1, dt * 4);

        material.uniforms.uProgress.value = current;
        material.uniforms.uTime.value = elapsed;

        const amp = isMobile() ? 0.35 : 1;
        points.position.x += (sampleOffset(current) * amp - points.position.x) * Math.min(1, dt * 3);
        points.rotation.y = elapsed * 0.08 + current * 0.9 + pointerX * 0.25;
        points.rotation.x = Math.sin(current * 0.8) * 0.35 + pointerY * 0.15;
        camera.position.z = 7 - Math.sin((current / (SHAPE_COUNT - 1)) * Math.PI) * 0.8;

        renderer.render(scene, camera);
        raf = requestAnimationFrame(frame);
      };

      const onPointer = (e: PointerEvent) => {
        pointerX = (e.clientX / window.innerWidth - 0.5) * 2;
        pointerY = (e.clientY / window.innerHeight - 0.5) * 2;
      };

      if (reduceMotion) {
        // One static frame; re-render only when the viewport changes.
        const still = () => {
          resize();
          renderer.render(scene, camera);
        };
        points.position.x = xOffsets[0] * (isMobile() ? 0.35 : 1);
        points.rotation.y = 0.4;
        still();
        window.addEventListener("resize", still);
        cleanup = () => {
          window.removeEventListener("resize", still);
        };
      } else {
        window.addEventListener("resize", resize);
        // Layout can shift after fonts/images load; re-measure shortly after.
        const remeasure = window.setTimeout(measure, 800);
        window.addEventListener("load", measure);
        if (canHover) window.addEventListener("pointermove", onPointer, { passive: true });
        raf = requestAnimationFrame(frame);
        cleanup = () => {
          cancelAnimationFrame(raf);
          window.clearTimeout(remeasure);
          window.removeEventListener("resize", resize);
          window.removeEventListener("load", measure);
          window.removeEventListener("pointermove", onPointer);
        };
      }

      const prevCleanup = cleanup;
      cleanup = () => {
        prevCleanup?.();
        geometry.dispose();
        material.dispose();
        renderer.dispose();
        renderer.domElement.remove();
      };
    })();

    return () => {
      disposed = true;
      cleanup?.();
    };
  }, []);

  return (
    <div
      ref={mountRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0"
    />
  );
}
