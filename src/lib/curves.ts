// Deterministic "training curve" paths, so server and client render identical SVG.

export function seeded(seed: number) {
  let a = seed;
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export type CurveOptions = {
  width: number;
  height: number;
  points?: number;
  seed?: number;
  /** 1 descends like a loss curve, -1 rises like a reward curve. */
  direction?: 1 | -1;
  decay?: number;
  noise?: number;
  pad?: number;
};

export function curvePoints({
  width,
  height,
  points = 160,
  seed = 7,
  direction = 1,
  decay = 0.22,
  noise = 0.08,
  pad = 0.08,
}: CurveOptions): [number, number][] {
  const rand = seeded(seed);
  const top = height * pad;
  const span = height * (1 - 2 * pad);
  const out: [number, number][] = [];
  for (let i = 0; i < points; i++) {
    const t = i / (points - 1);
    const settle = Math.exp(-t / decay);
    const jitter = (rand() - 0.5) * noise * (0.35 + settle);
    const level = direction === 1 ? 1 - settle : settle;
    const y = top + span * Math.min(1, Math.max(0, level + jitter));
    out.push([t * width, y]);
  }
  return out;
}

export function toPath(points: [number, number][]) {
  return points.map(([x, y], i) => `${i ? "L" : "M"}${x.toFixed(1)} ${y.toFixed(1)}`).join(" ");
}

/** Exponential moving average, the way training dashboards smooth noisy curves. */
export function smooth(points: [number, number][], alpha = 0.12): [number, number][] {
  let acc = points[0]?.[1] ?? 0;
  return points.map(([x, y]) => {
    acc = acc + alpha * (y - acc);
    return [x, acc];
  });
}
