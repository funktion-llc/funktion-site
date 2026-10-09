"use client";

import { useEffect } from "react";

const M: number[][] = [[20, 60, 144.5, 82.0, 75.1, 93.9], [36.4, 130.7, 146.6, 142, 119.1, 121.9], [103.2, 142, 44.5, 72.1, 122.2, 119.1], [65.9, 142, -6, 117.4, 10, 55.2], [-6, 128.0, 131.2, 85.9, 184.8, 80.9], [286.0, 68.1, 298.2, 18.3, 190.2, 5.8], [265.3, 12.7, 146.7, -22, 125.4, 24.5], [188.0, 27.4, 263.7, 97.4, 151.9, 70.4], [189.8, 142, 73.5, -22, 69.4, 20.3], [20.9, 77.9, 66.5, 142, 130.3, 118.3], [212.7, 142, 229.7, -22, 230.8, 12.3], [285.7, 22.6, 319.1, -10.3, 249.5, 9.4], [192.9, -22, 330.0, -22, 230.1, 7.7], [160.8, -8.4, 108.4, 142, 132.3, 112.0], [218.9, 142, 253.8, 97.3, 182.7, 20.2], [245.5, 101.1, 366, 133.1, 334.8, 112.1], [258.8, 142, 231.6, 142, 223.1, 124.6], [171.3, 136.5, 180.5, 128.0, 281.1, 84.9], [366, 102.6, 174.8, 123.6, 233.9, 121.7], [223.0, 46.9, 340, 60, 360, 60]];
const F: number[][] = [[6.0, 60, 12.0, 60, 18.0, 60], [24.0, 60, 30.0, 60, 36.0, 60], [42.0, 60, 48.0, 60, 54.0, 60], [60.0, 60, 66.0, 60, 72.0, 60], [78.0, 60, 84.0, 60, 90.0, 60], [96.0, 60, 102.0, 60, 108.0, 60], [114.0, 60, 120.0, 60, 126.0, 60], [132.0, 60, 138.0, 60, 144.0, 60], [150.0, 60, 156.0, 60, 162.0, 60], [168.0, 60, 174.0, 60, 180.0, 60], [186.0, 60, 192.0, 60, 198.0, 60], [204.0, 60, 210.0, 60, 216.0, 60], [222.0, 60, 228.0, 60, 234.0, 60], [240.0, 60, 246.0, 60, 252.0, 60], [258.0, 60, 264.0, 60, 270.0, 60], [276.0, 60, 282.0, 60, 288.0, 60], [294.0, 60, 300.0, 60, 306.0, 60], [312.0, 60, 318.0, 60, 324.0, 60], [330.0, 60, 336.0, 60, 342.0, 60], [348.0, 60, 354.0, 60, 360.0, 60]];

const N = M.length;

function cl(x: number) {
  return x < 0 ? 0 : x > 1 ? 1 : x;
}
function ease(x: number) {
  x = cl(x);
  return x * x * (3 - 2 * x);
}
function path(t: number) {
  let d = "M0 60";
  for (let i = 0; i < N; i++) {
    const k = ease(t * 1.6 - (i / N) * 0.6);
    d += " C";
    for (let j = 0; j < 6; j++) d += (j ? " " : "") + (M[i][j] + (F[i][j] - M[i][j]) * k).toFixed(1);
  }
  return d;
}

/** Footer: the tangle pulls taut into a workflow. Hover on desktop, scroll on touch. */
export function useFixMorph() {
  useEffect(() => {
    const svg = document.querySelector<SVGSVGElement>(".fx-fix");
    if (!svg) return;
    const foot = (svg.closest("footer") as HTMLElement) || svg;
    const line = svg.querySelector<SVGPathElement>(".fx-fix__line")!;
    const shadow = svg.querySelector<SVGPathElement>(".fx-fix__shadow")!;
    const nodes = Array.from(svg.querySelectorAll<SVGGElement>(".fx-fix__node"));
    const hov = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let hover = false;
    let t = 0;
    let last = -1;
    let lastD = "";
    let raf = 0;
    const on = () => (hover = true);
    const off = () => (hover = false);
    foot.addEventListener("mouseenter", on);
    foot.addEventListener("mouseleave", off);

    const frame = () => {
      raf = requestAnimationFrame(frame);
      const r = svg.getBoundingClientRect();
      const vh = window.innerHeight || 800;
      if (r.bottom < -50 || r.top > vh + 50) return;
      const target = reduce ? 1 : hov ? (hover ? 1 : 0) : cl((vh * 0.9 - r.top) / (vh * 0.42));
      t += (target - t) * (hov ? 0.055 : 0.2);
      if (Math.abs(target - t) < 0.0005) t = target;
      if (Math.abs(t - last) < 0.0002 && line.getAttribute("d") === lastD) return;
      last = t;
      const d = path(t);
      lastD = d;
      line.setAttribute("d", d);
      shadow.setAttribute("d", d);
      for (const n of nodes) {
        const x = Number(n.dataset.x);
        const k = ease((t * 1.6 - (x / 360) * 0.6 - 0.8) / 0.2);
        n.style.opacity = String(k);
        n.style.transform = "scale(" + (0.4 + 0.6 * k) + ")";
      }
      svg.classList.toggle("is-flat", t > 0.97);
    };
    frame();
    return () => {
      cancelAnimationFrame(raf);
      foot.removeEventListener("mouseenter", on);
      foot.removeEventListener("mouseleave", off);
    };
  }, []);
}
