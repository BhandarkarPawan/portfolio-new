import * as THREE from "three";

// A loss landscape rendered as a point cloud, with optimizers descending it in
// real time. The surface is evaluated on the GPU for display and on the CPU for
// the optimizers' gradients, so both are generated from the same constants.

export type Telemetry = { step: number; loss: number; best: number; active: number };

export type Landscape = {
  start(): void;
  setPointer(clientX: number, clientY: number, inside: boolean): void;
  drop(clientX: number, clientY: number): boolean;
  setScroll(progress: number): void;
  resize(): void;
  dispose(): void;
};

type Options = {
  canvas: HTMLCanvasElement;
  labels: HTMLElement;
  reducedMotion: boolean;
  onTelemetry: (t: Telemetry) => void;
};

type Kind = "adam" | "sgd+m" | "rmsprop" | "lion";

type Optimizer = {
  kind: Kind;
  x: number;
  y: number;
  m: [number, number];
  v: [number, number];
  t: number;
  trail: Float32Array;
  head: number;
  count: number;
  anchor: [number, number];
  still: number;
  user: boolean;
  label: HTMLDivElement;
  lossEl: HTMLElement;
};

const SCALE = 4; // world units per landscape unit
const HEIGHT = 2.1;
const EXTENT = 2.1;
const PROBE_HEIGHT = 0.8;
const PROBE_WIDTH = 0.16;
const TRAIL = 140;
const MAX_USER = 3;
const SIM_DT = 1 / 60;

// [x, y, depth, width²] for each basin.
const WELLS = [
  [0.85, -0.45, 1.05, 0.32],
  [-1.05, 0.75, 0.7, 0.22],
  [-0.25, -1.25, 0.55, 0.18],
  [0.55, 1.15, 0.4, 0.14],
] as const;

const MAX_OPTIMIZERS = 3 + MAX_USER; // three resident optimizers plus visitor drops

const LR: Record<Kind, number> = { adam: 0.006, "sgd+m": 0.0007, rmsprop: 0.0055, lion: 0.005 };
const BASE_KINDS: Kind[] = ["adam", "sgd+m", "rmsprop"];
const USER_KINDS: Kind[] = ["lion", "adam", "sgd+m", "rmsprop"];

const f = (n: number) => n.toFixed(4);

const GLSL_LOSS = /* glsl */ `
float lossAt(vec2 p, float t) {
  float l = 0.16 * dot(p, p);
  ${WELLS.map(([x, y, a, s]) => `{ vec2 d = p - vec2(${f(x)}, ${f(y)}); l -= ${f(a)} * exp(-dot(d, d) / ${f(s)}); }`).join("\n  ")}
  l += 0.16 * sin(1.8 * p.x + 0.30 * t) * cos(1.4 * p.y - 0.22 * t);
  l += 0.06 * sin(3.3 * p.x - 2.6 * p.y + 0.55 * t);
  return l;
}`;

function lossAt(x: number, y: number, t: number) {
  let l = 0.16 * (x * x + y * y);
  for (const [cx, cy, a, s] of WELLS) {
    const dx = x - cx;
    const dy = y - cy;
    l -= a * Math.exp(-(dx * dx + dy * dy) / s);
  }
  l += 0.16 * Math.sin(1.8 * x + 0.3 * t) * Math.cos(1.4 * y - 0.22 * t);
  l += 0.06 * Math.sin(3.3 * x - 2.6 * y + 0.55 * t);
  return l;
}

/** What the HUD calls "loss": a positive, training-log-looking transform of the surface height. */
const displayLoss = (l: number) => 0.62 * Math.exp(1.15 * l);

const rgb = (hex: string) => {
  const n = parseInt(hex.slice(1), 16);
  return new THREE.Vector3(((n >> 16) & 255) / 255, ((n >> 8) & 255) / 255, (n & 255) / 255);
};

const POINT_FRAG = /* glsl */ `
varying vec3 vColor;
varying float vAlpha;
void main() {
  float d = length(gl_PointCoord - 0.5);
  if (d > 0.5) discard;
  gl_FragColor = vec4(vColor, smoothstep(0.5, 0.05, d) * vAlpha);
}`;

export function createLandscape({ canvas, labels, reducedMotion, onTelemetry }: Options): Landscape {
  const renderer = new THREE.WebGLRenderer({
    canvas,
    antialias: false,
    alpha: true,
    powerPreference: "high-performance",
  });
  renderer.setClearColor(0x000000, 0);

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(30, 1, 0.1, 120);
  const group = new THREE.Group();
  scene.add(group);

  const signal = rgb("#ffb547");
  const paper = rgb("#ecebe6");

  // ---------- Surface ----------
  const narrow = window.innerWidth < 768;
  const res = narrow ? 150 : 250;
  const uvs: number[] = [];
  const rands: number[] = [];
  for (let i = 0; i < res; i++) {
    for (let j = 0; j < res; j++) {
      const jitter = () => (((Math.random() - 0.5) * (2 * EXTENT)) / res) * 0.35;
      const x = -EXTENT + (2 * EXTENT * i) / (res - 1) + jitter();
      const y = -EXTENT + (2 * EXTENT * j) / (res - 1) + jitter();
      if (x * x + y * y > EXTENT * EXTENT) continue;
      uvs.push(x, y);
      rands.push(Math.random());
    }
  }
  const surfaceGeo = new THREE.BufferGeometry();
  surfaceGeo.setAttribute("position", new THREE.Float32BufferAttribute(new Float32Array((uvs.length / 2) * 3), 3));
  surfaceGeo.setAttribute("aUv", new THREE.Float32BufferAttribute(uvs, 2));
  surfaceGeo.setAttribute("aRand", new THREE.Float32BufferAttribute(rands, 1));
  // Vertices are displaced in the shader, so the CPU-side bounds are meaningless.
  surfaceGeo.boundingSphere = new THREE.Sphere(new THREE.Vector3(), 100);

  const surfaceUniforms = {
    uTime: { value: 0 },
    uIntro: { value: reducedMotion ? 2 : 0 },
    uProbe: { value: new THREE.Vector3(0, 0, 0) },
    uClick: { value: new THREE.Vector3(0, 0, -100) },
    uFade: { value: 1 },
    uSize: { value: narrow ? 40 : 32 },
    uPixelRatio: { value: 1 },
    uFog: { value: new THREE.Vector2(10, 32) },
    uBase: { value: paper.clone().multiplyScalar(0.62) },
    uSignal: { value: signal },
  };

  const surface = new THREE.Points(
    surfaceGeo,
    new THREE.ShaderMaterial({
      uniforms: surfaceUniforms,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      vertexShader: /* glsl */ `
        uniform float uTime;
        uniform float uIntro;
        uniform vec3 uProbe;
        uniform vec3 uClick;
        uniform float uFade;
        uniform float uSize;
        uniform float uPixelRatio;
        uniform vec2 uFog;
        uniform vec3 uBase;
        uniform vec3 uSignal;
        attribute vec2 aUv;
        attribute float aRand;
        varying vec3 vColor;
        varying float vAlpha;
        ${GLSL_LOSS}
        void main() {
          vec2 p = aUv;
          float r = length(p);
          float delay = r * 0.32 + aRand * 0.12;
          float e = smoothstep(delay, delay + 0.5, uIntro);
          float l = lossAt(p, uTime);
          vec2 dp = p - uProbe.xy;
          float probe = uProbe.z * exp(-dot(dp, dp) / ${f(PROBE_WIDTH)});
          float h = (l + probe * ${f(PROBE_HEIGHT)}) * ${f(HEIGHT)};
          vec3 pos = vec3(p.x * ${f(SCALE)}, mix(-2.4, h, e), p.y * ${f(SCALE)});
          vec4 mv = modelViewMatrix * vec4(pos, 1.0);
          gl_Position = projectionMatrix * mv;

          float iso = abs(fract(l * 7.0 + 0.5) - 0.5);
          float contour = 1.0 - smoothstep(0.0, 0.07, iso);
          float valley = smoothstep(-0.2, -0.95, l);
          float since = uTime - uClick.z;
          float ring = step(0.0, since) * exp(-pow(length(p - uClick.xy) - since * 1.1, 2.0) / 0.006) * exp(-since * 1.4);

          float edge = 1.0 - smoothstep(1.5, ${f(EXTENT)}, r);
          float fog = smoothstep(uFog.y, uFog.x, -mv.z);
          vColor = mix(uBase, uSignal, clamp(valley * 0.5 + contour * 0.45 + probe * 0.9 + ring, 0.0, 1.0));
          vAlpha = edge * fog * e * uFade * (0.5 + contour * 0.55 + probe * 0.8 + ring + valley * 0.2);
          gl_PointSize = uSize * uPixelRatio * (1.0 + contour * 0.35 + probe * 1.1 + ring * 1.4) / -mv.z;
        }`,
      fragmentShader: POINT_FRAG,
    }),
  );
  group.add(surface);

  // ---------- Optimizer trails and heads ----------
  const trailCount = MAX_OPTIMIZERS * TRAIL;
  const trailPos = new Float32Array(trailCount * 3);
  const trailAge = new Float32Array(trailCount).fill(1);
  const trailTone = new Float32Array(trailCount);
  const trailGeo = new THREE.BufferGeometry();
  trailGeo.setAttribute("position", new THREE.BufferAttribute(trailPos, 3).setUsage(THREE.DynamicDrawUsage));
  trailGeo.setAttribute("aAge", new THREE.BufferAttribute(trailAge, 1).setUsage(THREE.DynamicDrawUsage));
  trailGeo.setAttribute("aTone", new THREE.BufferAttribute(trailTone, 1).setUsage(THREE.DynamicDrawUsage));
  trailGeo.boundingSphere = new THREE.Sphere(new THREE.Vector3(), 100);

  const overlayUniforms = {
    uPixelRatio: surfaceUniforms.uPixelRatio,
    uFade: surfaceUniforms.uFade,
    uSignal: { value: signal },
    uPaper: { value: paper },
  };

  const trails = new THREE.Points(
    trailGeo,
    new THREE.ShaderMaterial({
      uniforms: overlayUniforms,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      vertexShader: /* glsl */ `
        uniform float uPixelRatio;
        uniform float uFade;
        uniform vec3 uSignal;
        uniform vec3 uPaper;
        attribute float aAge;
        attribute float aTone;
        varying vec3 vColor;
        varying float vAlpha;
        void main() {
          vec4 mv = modelViewMatrix * vec4(position, 1.0);
          gl_Position = projectionMatrix * mv;
          float life = 1.0 - aAge;
          vColor = mix(uSignal, uPaper, aTone);
          vAlpha = pow(life, 1.4) * uFade * step(aAge, 0.999) * 0.9;
          gl_PointSize = (1.5 + 4.5 * life * life) * uPixelRatio * 12.0 / -mv.z;
        }`,
      fragmentShader: POINT_FRAG,
    }),
  );
  group.add(trails);

  const headPos = new Float32Array(MAX_OPTIMIZERS * 3);
  const headTone = new Float32Array(MAX_OPTIMIZERS);
  const headGeo = new THREE.BufferGeometry();
  headGeo.setAttribute("position", new THREE.BufferAttribute(headPos, 3).setUsage(THREE.DynamicDrawUsage));
  headGeo.setAttribute("aTone", new THREE.BufferAttribute(headTone, 1).setUsage(THREE.DynamicDrawUsage));
  headGeo.boundingSphere = new THREE.Sphere(new THREE.Vector3(), 100);
  headGeo.setDrawRange(0, 0);

  const heads = new THREE.Points(
    headGeo,
    new THREE.ShaderMaterial({
      uniforms: overlayUniforms,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      vertexShader: /* glsl */ `
        uniform float uPixelRatio;
        uniform float uFade;
        uniform vec3 uSignal;
        uniform vec3 uPaper;
        attribute float aTone;
        varying vec3 vColor;
        varying float vAlpha;
        void main() {
          vec4 mv = modelViewMatrix * vec4(position, 1.0);
          gl_Position = projectionMatrix * mv;
          vColor = mix(uSignal, uPaper, aTone);
          vAlpha = uFade;
          gl_PointSize = 20.0 * uPixelRatio * 14.0 / -mv.z;
        }`,
      fragmentShader: /* glsl */ `
        varying vec3 vColor;
        varying float vAlpha;
        void main() {
          float d = length(gl_PointCoord - 0.5);
          if (d > 0.5) discard;
          float core = smoothstep(0.15, 0.09, d);
          float ring = smoothstep(0.035, 0.0, abs(d - 0.36)) * 0.85;
          float glow = smoothstep(0.5, 0.0, d) * 0.22;
          gl_FragColor = vec4(vColor, max(core, max(ring, glow)) * vAlpha);
        }`,
    }),
  );
  group.add(heads);

  // ---------- Simulation ----------
  let time = reducedMotion ? 14 : 0;
  let ticks = 0;
  let started = false;
  let userDrops = 0;
  const probe = { x: 0, y: 0, s: 0, tx: 0, ty: 0, ts: 0 };
  const optimizers: Optimizer[] = [];

  const surfaceLoss = (x: number, y: number) => {
    let l = lossAt(x, y, time);
    if (probe.s > 0.001) {
      const dx = x - probe.x;
      const dy = y - probe.y;
      l += probe.s * PROBE_HEIGHT * Math.exp(-(dx * dx + dy * dy) / PROBE_WIDTH);
    }
    return l;
  };

  const gradient = (x: number, y: number): [number, number] => {
    const e = 0.002;
    return [
      (surfaceLoss(x + e, y) - surfaceLoss(x - e, y)) / (2 * e),
      (surfaceLoss(x, y + e) - surfaceLoss(x, y - e)) / (2 * e),
    ];
  };

  const makeLabel = (kind: Kind) => {
    const label = document.createElement("div");
    label.className = "opt-label";
    const name = document.createElement("span");
    name.textContent = kind;
    const lossEl = document.createElement("b");
    label.append(name, lossEl);
    labels.append(label);
    return { label, lossEl };
  };

  const reset = (o: Optimizer, x: number, y: number) => {
    o.x = x;
    o.y = y;
    o.m = [0, 0];
    const [gx, gy] = gradient(x, y);
    // Adam's bias correction assumes v starts at zero; RMSProp has none, so seed
    // it with the first gradient to avoid a huge opening step.
    o.v = o.kind === "rmsprop" ? [gx * gx, gy * gy] : [0, 0];
    o.t = 0;
    o.count = 0;
    o.head = 0;
    o.anchor = [x, y];
    o.still = 0;
  };

  const highPoint = (): [number, number] => {
    let best: [number, number] = [1.6, 0];
    let bestLoss = -Infinity;
    for (let i = 0; i < 16; i++) {
      const a = Math.random() * Math.PI * 2;
      const r = 1.2 + Math.random() * 0.6;
      const x = Math.cos(a) * r;
      const y = Math.sin(a) * r;
      const l = surfaceLoss(x, y);
      if (l > bestLoss) {
        bestLoss = l;
        best = [x, y];
      }
    }
    return best;
  };

  const spawn = (kind: Kind, x: number, y: number, user: boolean) => {
    const { label, lossEl } = makeLabel(kind);
    const o: Optimizer = {
      kind,
      x,
      y,
      m: [0, 0],
      v: [0, 0],
      t: 0,
      trail: new Float32Array(TRAIL * 3),
      head: 0,
      count: 0,
      anchor: [x, y],
      still: 0,
      user,
      label,
      lossEl,
    };
    reset(o, x, y);
    optimizers.push(o);
    return o;
  };

  const remove = (o: Optimizer) => {
    o.label.remove();
    optimizers.splice(optimizers.indexOf(o), 1);
  };

  const step = (o: Optimizer) => {
    const [gx, gy] = gradient(o.x, o.y);
    const lr = LR[o.kind];
    switch (o.kind) {
      case "adam": {
        o.t += 1;
        o.m = [0.9 * o.m[0] + 0.1 * gx, 0.9 * o.m[1] + 0.1 * gy];
        o.v = [0.999 * o.v[0] + 0.001 * gx * gx, 0.999 * o.v[1] + 0.001 * gy * gy];
        const bm = 1 - 0.9 ** o.t;
        const bv = 1 - 0.999 ** o.t;
        o.x -= (lr * (o.m[0] / bm)) / (Math.sqrt(o.v[0] / bv) + 1e-8);
        o.y -= (lr * (o.m[1] / bm)) / (Math.sqrt(o.v[1] / bv) + 1e-8);
        break;
      }
      case "sgd+m": {
        o.m = [0.92 * o.m[0] - lr * gx, 0.92 * o.m[1] - lr * gy];
        o.x += o.m[0];
        o.y += o.m[1];
        break;
      }
      case "rmsprop": {
        o.v = [0.99 * o.v[0] + 0.01 * gx * gx, 0.99 * o.v[1] + 0.01 * gy * gy];
        o.x -= (lr * gx) / (Math.sqrt(o.v[0]) + 1e-8);
        o.y -= (lr * gy) / (Math.sqrt(o.v[1]) + 1e-8);
        break;
      }
      case "lion": {
        o.x -= lr * Math.sign(0.9 * o.m[0] + 0.1 * gx);
        o.y -= lr * Math.sign(0.9 * o.m[1] + 0.1 * gy);
        o.m = [0.99 * o.m[0] + 0.01 * gx, 0.99 * o.m[1] + 0.01 * gy];
        break;
      }
    }
  };

  const simulate = () => {
    probe.x += (probe.tx - probe.x) * 0.12;
    probe.y += (probe.ty - probe.y) * 0.12;
    probe.s += (probe.ts - probe.s) * 0.06;
    ticks += 1;

    for (const o of [...optimizers]) {
      step(o);
      if (ticks % 2 === 0) {
        const i = o.head * 3;
        o.trail[i] = o.x * SCALE;
        o.trail[i + 1] = surfaceLoss(o.x, o.y) * HEIGHT + 0.04;
        o.trail[i + 2] = o.y * SCALE;
        o.head = (o.head + 1) % TRAIL;
        o.count = Math.min(o.count + 1, TRAIL);
      }
      if (ticks % 30 === 0) {
        const moved = Math.hypot(o.x - o.anchor[0], o.y - o.anchor[1]);
        o.still = moved < 0.015 ? o.still + 30 : 0;
        o.anchor = [o.x, o.y];
      }
      const escaped = o.x * o.x + o.y * o.y > EXTENT * EXTENT * 0.96;
      if (o.user && (escaped || o.still > 240)) {
        remove(o);
      } else if (escaped || o.still > 150) {
        reset(o, ...highPoint());
      }
    }
  };

  // ---------- Camera ----------
  let width = 1;
  let height = 1;
  let scroll = 0;
  let distance = 15;
  const pointer = { x: 0, y: 0, tx: 0, ty: 0 };
  const target = new THREE.Vector3();

  const placeCamera = () => {
    pointer.x += (pointer.tx - pointer.x) * 0.04;
    pointer.y += (pointer.ty - pointer.y) * 0.04;
    const elev = 0.42 - scroll * 0.24 + pointer.y * 0.05;
    const azim = pointer.x * 0.14;
    const dist = distance * (1 - scroll * 0.35);
    target.set(0, -0.5 - scroll * 0.6, 0);
    camera.position.set(
      target.x + Math.sin(azim) * Math.cos(elev) * dist,
      target.y + Math.sin(elev) * dist,
      target.z + Math.cos(azim) * Math.cos(elev) * dist,
    );
    camera.lookAt(target);
    group.rotation.y = -0.35 + Math.sin(time * 0.04) * 0.12;
    surfaceUniforms.uFog.value.set(dist * 0.6, dist * 1.9);
  };

  const resize = () => {
    const rect = canvas.getBoundingClientRect();
    width = Math.max(1, rect.width);
    height = Math.max(1, rect.height);
    const ratio = Math.min(window.devicePixelRatio || 1, 1.75);
    renderer.setPixelRatio(ratio);
    renderer.setSize(width, height, false);
    surfaceUniforms.uPixelRatio.value = ratio;
    const aspect = width / height;
    const portrait = aspect < 1;
    camera.aspect = aspect;
    // Fit the landscape across the frame (a tighter crop on portrait screens),
    // then nudge the frame so the landscape sits above the hero copy.
    camera.fov = portrait ? 46 : 30;
    const span = portrait ? 9 : 13.5;
    distance = THREE.MathUtils.clamp(span / (2 * Math.tan(THREE.MathUtils.degToRad(camera.fov / 2)) * aspect), 12, 30);
    camera.setViewOffset(width, height, 0, height * (portrait ? 0.06 : 0.15), width, height);
    camera.updateProjectionMatrix();
    if (reducedMotion) render();
  };

  // ---------- Per-frame sync ----------
  const projected = new THREE.Vector3();
  let lastTelemetry = -1;
  const placed: { x: number; y: number }[] = [];

  const sync = () => {
    let cursor = 0;
    placed.length = 0;
    optimizers.forEach((o, n) => {
      const tone = o.kind === "adam" && !o.user ? 0 : 0.85;
      for (let j = 0; j < TRAIL; j++) {
        const idx = (o.head - 1 - j + TRAIL * 2) % TRAIL;
        const k = cursor + j;
        trailPos[k * 3] = o.trail[idx * 3];
        trailPos[k * 3 + 1] = o.trail[idx * 3 + 1];
        trailPos[k * 3 + 2] = o.trail[idx * 3 + 2];
        trailAge[k] = j < o.count ? j / TRAIL : 1;
        trailTone[k] = tone;
      }
      cursor += TRAIL;

      const l = surfaceLoss(o.x, o.y);
      headPos[n * 3] = o.x * SCALE;
      headPos[n * 3 + 1] = l * HEIGHT + 0.06;
      headPos[n * 3 + 2] = o.y * SCALE;
      headTone[n] = tone;

      projected.set(headPos[n * 3], headPos[n * 3 + 1], headPos[n * 3 + 2]);
      group.localToWorld(projected);
      projected.project(camera);
      const sx = (projected.x * 0.5 + 0.5) * width;
      let sy = (-projected.y * 0.5 + 0.5) * height;
      // Optimizers often share a basin; stack their labels instead of overprinting.
      while (placed.some((p) => Math.abs(p.x - sx) < 130 && Math.abs(p.y - sy) < 15)) sy += 15;
      placed.push({ x: sx, y: sy });
      const onScreen = projected.z < 1 && sx > 0 && sx < width - 140 && sy > 80 && sy < height;
      o.label.dataset.visible = String(started && onScreen && surfaceUniforms.uFade.value > 0.35);
      o.label.style.transform = `translate3d(${sx + 10}px, ${sy - 6}px, 0)`;
    });
    trailAge.fill(1, cursor);
    headGeo.setDrawRange(0, optimizers.length);
    trailGeo.attributes.position.needsUpdate = true;
    trailGeo.attributes.aAge.needsUpdate = true;
    trailGeo.attributes.aTone.needsUpdate = true;
    headGeo.attributes.position.needsUpdate = true;
    headGeo.attributes.aTone.needsUpdate = true;

    if (time - lastTelemetry > 0.1 || reducedMotion) {
      lastTelemetry = time;
      const losses = optimizers.map((o) => displayLoss(surfaceLoss(o.x, o.y)));
      for (let n = 0; n < optimizers.length; n++) optimizers[n].lossEl.textContent = losses[n].toFixed(3);
      const lead = optimizers.find((o) => o.kind === "adam" && !o.user);
      onTelemetry({
        step: Math.floor(ticks / 4),
        loss: lead ? displayLoss(surfaceLoss(lead.x, lead.y)) : 0,
        best: losses.length ? Math.min(...losses) : 0,
        active: optimizers.length,
      });
    }
  };

  const render = () => {
    surfaceUniforms.uTime.value = time;
    surfaceUniforms.uProbe.value.set(probe.x, probe.y, probe.s);
    placeCamera();
    sync();
    renderer.render(scene, camera);
  };

  // ---------- Loop ----------
  let raf = 0;
  let last = 0;
  let accumulator = 0;
  let visible = true;
  let introStart: number | null = null;

  const frame = (now: number) => {
    raf = requestAnimationFrame(frame);
    const dt = last ? Math.min((now - last) / 1000, 1 / 20) : SIM_DT;
    last = now;
    time += dt;
    if (introStart !== null) {
      const k = Math.min((now - introStart) / 2800, 1);
      surfaceUniforms.uIntro.value = 1.35 * (1 - Math.pow(1 - k, 3));
      if (k >= 1) introStart = null;
    }
    if (started) {
      accumulator += dt;
      let n = 0;
      while (accumulator >= SIM_DT && n < 4) {
        simulate();
        accumulator -= SIM_DT;
        n += 1;
      }
      if (n === 4) accumulator = 0;
    }
    render();
  };

  const play = () => {
    if (reducedMotion || raf || !visible || document.hidden) return;
    last = 0;
    raf = requestAnimationFrame(frame);
  };
  const pause = () => {
    cancelAnimationFrame(raf);
    raf = 0;
  };

  const io = new IntersectionObserver(([entry]) => {
    visible = entry.isIntersecting;
    if (visible) play();
    else pause();
  });
  io.observe(canvas);
  const onVisibility = () => (document.hidden ? pause() : play());
  document.addEventListener("visibilitychange", onVisibility);

  // ---------- Public API ----------
  const raycaster = new THREE.Raycaster();
  const plane = new THREE.Plane(new THREE.Vector3(0, 1, 0), 0);
  const hit = new THREE.Vector3();
  const ndc = new THREE.Vector2();

  const toSurface = (clientX: number, clientY: number): [number, number] | null => {
    const rect = canvas.getBoundingClientRect();
    ndc.set(((clientX - rect.left) / rect.width) * 2 - 1, -((clientY - rect.top) / rect.height) * 2 + 1);
    raycaster.setFromCamera(ndc, camera);
    // A few fixed-point passes against the surface height converge at this scale.
    let uv: [number, number] | null = null;
    let h = 0;
    for (let pass = 0; pass < 3; pass++) {
      plane.constant = -h;
      if (!raycaster.ray.intersectPlane(plane, hit)) return null;
      const local = group.worldToLocal(hit.clone());
      uv = [local.x / SCALE, local.z / SCALE];
      h = lossAt(uv[0], uv[1], time) * HEIGHT;
    }
    return uv;
  };

  BASE_KINDS.forEach((kind) => {
    const [x, y] = highPoint();
    spawn(kind, x, y, false);
  });

  resize();

  return {
    start() {
      if (started) return;
      started = true;
      if (reducedMotion) {
        for (let i = 0; i < 420; i++) simulate();
        render();
        return;
      }
      introStart = performance.now();
      play();
    },
    setPointer(clientX, clientY, inside) {
      const rect = canvas.getBoundingClientRect();
      pointer.tx = ((clientX - rect.left) / rect.width) * 2 - 1;
      pointer.ty = ((clientY - rect.top) / rect.height) * 2 - 1;
      const uv = inside && !reducedMotion ? toSurface(clientX, clientY) : null;
      if (uv && uv[0] * uv[0] + uv[1] * uv[1] < EXTENT * EXTENT) {
        probe.tx = uv[0];
        probe.ty = uv[1];
        probe.ts = 1;
      } else {
        probe.ts = 0;
      }
    },
    drop(clientX, clientY) {
      if (reducedMotion || !started) return false;
      const uv = toSurface(clientX, clientY);
      if (!uv || uv[0] * uv[0] + uv[1] * uv[1] > 1.9 * 1.9) return false;
      const user = optimizers.filter((o) => o.user);
      if (user.length >= MAX_USER) remove(user[0]);
      spawn(USER_KINDS[userDrops++ % USER_KINDS.length], uv[0], uv[1], true);
      surfaceUniforms.uClick.value.set(uv[0], uv[1], time);
      return true;
    },
    setScroll(progress) {
      scroll = progress;
      surfaceUniforms.uFade.value = 1 - Math.min(1, progress * 1.25);
      if (reducedMotion) render();
    },
    resize,
    dispose() {
      pause();
      io.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
      for (const o of optimizers) o.label.remove();
      surfaceGeo.dispose();
      trailGeo.dispose();
      headGeo.dispose();
      (surface.material as THREE.Material).dispose();
      (trails.material as THREE.Material).dispose();
      (heads.material as THREE.Material).dispose();
      renderer.dispose();
    },
  };
}
