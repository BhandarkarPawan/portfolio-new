"use client";

import { getImageProps } from "next/image";
import { useEffect, useRef } from "react";

type Cell = { x: number; y: number; size: number; backdrop: boolean; delay: number };

const PAPER = "rgba(236, 235, 230, 0.92)";
const SIGNAL = "rgba(255, 181, 71, 0.85)";
// Each cell finishes appearing 0.3 after its delay; the last delay is 0.8.
const INTRO_END = 1.1;

/** True for the flat yellow disc painted behind the subject in the source photo. */
function isBackdrop(r: number, g: number, b: number) {
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  if (max < 170 || max === min) return false;
  const saturation = (max - min) / max;
  let hue = 0;
  if (max === r) hue = ((g - b) / (max - min)) * 60;
  else if (max === g) hue = (2 + (b - r) / (max - min)) * 60;
  if (hue < 0) hue += 360;
  return saturation > 0.45 && hue > 34 && hue < 62;
}

/**
 * The portrait as a dot-matrix halftone: the subject in paper-white dots, the
 * backdrop in signal-amber ones. The cursor is a lens that brings the actual
 * photograph into focus.
 */
export default function HalftonePortrait({
  src,
  alt,
  width,
  height,
}: {
  src: string;
  alt: string;
  width: number;
  height: number;
}) {
  const wrap = useRef<HTMLDivElement>(null);
  const canvas = useRef<HTMLCanvasElement>(null);
  // Go through the image optimizer: the lens shows the photo at up to ~2x DPR,
  // and the source PNG is several times heavier than a resized WebP.
  const optimized = getImageProps({ src, alt, width: 540, height: Math.round((540 * height) / width) }).props.src;

  useEffect(() => {
    const host = wrap.current;
    const el = canvas.current;
    const ctx = el?.getContext("2d");
    if (!host || !el || !ctx) return;

    const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
    const img = new Image();

    let cells: Cell[] = [];
    let cellSize = 8;
    let width = 0;
    let height = 0;
    let raf = 0;
    let intro = reduced ? INTRO_END : 0;
    let introStart = 0;
    const lens = { x: 0, y: 0, r: 0, tx: 0, ty: 0, tr: 0 };

    const cover = () => {
      const scale = Math.max(width / img.naturalWidth, height / img.naturalHeight);
      const w = img.naturalWidth * scale;
      const h = img.naturalHeight * scale;
      return { x: (width - w) / 2, y: (height - h) / 2, w, h };
    };

    const build = () => {
      const rect = host.getBoundingClientRect();
      // Not laid out yet (e.g. mid route transition); the ResizeObserver calls back once it is.
      if (rect.width < 1 || rect.height < 1) return;
      width = rect.width;
      height = rect.height;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      el.width = Math.round(width * dpr);
      el.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      cellSize = Math.max(5, width / 74);
      const cols = Math.floor(width / cellSize);
      const rows = Math.floor(height / cellSize);
      const sample = document.createElement("canvas");
      sample.width = cols;
      sample.height = rows;
      const sctx = sample.getContext("2d", { willReadFrequently: true })!;
      const c = cover();
      sctx.drawImage(img, c.x / cellSize, c.y / cellSize, c.w / cellSize, c.h / cellSize);
      const data = sctx.getImageData(0, 0, cols, rows).data;

      cells = [];
      for (let j = 0; j < rows; j++) {
        for (let i = 0; i < cols; i++) {
          const k = (j * cols + i) * 4;
          if (data[k + 3] < 60) continue;
          const [r, g, b] = [data[k], data[k + 1], data[k + 2]];
          const backdrop = isBackdrop(r, g, b);
          const lum = (0.2126 * r + 0.7152 * g + 0.0722 * b) / 255;
          cells.push({
            x: (i + 0.5) * cellSize,
            y: (j + 0.5) * cellSize,
            size: backdrop ? 0.34 : 0.12 + 0.88 * Math.pow(lum, 0.85),
            backdrop,
            delay: (i / cols) * 0.35 + (1 - j / rows) * 0.45,
          });
        }
      }
    };

    const draw = () => {
      ctx.clearRect(0, 0, width, height);
      const radius = cellSize * 0.5;
      const paths = { subject: new Path2D(), backdrop: new Path2D() };

      for (const cell of cells) {
        const appear = Math.min(1, Math.max(0, (intro - cell.delay) / 0.3));
        if (appear <= 0) continue;
        let { x, y } = cell;
        if (lens.r > 1) {
          const dx = x - lens.x;
          const dy = y - lens.y;
          const d = Math.hypot(dx, dy) || 1;
          if (d < lens.r) continue;
          // Dots just outside the lens bulge away from it.
          const push = Math.max(0, 1 - (d - lens.r) / (cellSize * 6)) * cellSize * 1.4;
          x += (dx / d) * push;
          y += (dy / d) * push;
        }
        const r = radius * cell.size * appear;
        const path = cell.backdrop ? paths.backdrop : paths.subject;
        path.moveTo(x + r, y);
        path.arc(x, y, r, 0, Math.PI * 2);
      }
      ctx.fillStyle = SIGNAL;
      ctx.fill(paths.backdrop);
      ctx.fillStyle = PAPER;
      ctx.fill(paths.subject);

      if (lens.r > 1) {
        ctx.save();
        ctx.beginPath();
        ctx.arc(lens.x, lens.y, lens.r, 0, Math.PI * 2);
        ctx.clip();
        const c = cover();
        ctx.drawImage(img, c.x, c.y, c.w, c.h);
        ctx.restore();
        ctx.beginPath();
        ctx.arc(lens.x, lens.y, lens.r, 0, Math.PI * 2);
        ctx.strokeStyle = "rgba(255, 181, 71, 0.9)";
        ctx.lineWidth = 1;
        ctx.stroke();
      }
    };

    const frame = (now: number) => {
      if (intro < INTRO_END) intro = Math.min(INTRO_END, ((now - introStart) / 1800) * INTRO_END);
      const ease = reduced ? 1 : 0.18;
      lens.x += (lens.tx - lens.x) * ease;
      lens.y += (lens.ty - lens.y) * ease;
      lens.r += (lens.tr - lens.r) * (reduced ? 1 : 0.12);
      draw();
      const settled =
        intro >= INTRO_END && Math.abs(lens.tr - lens.r) < 0.5 && Math.hypot(lens.tx - lens.x, lens.ty - lens.y) < 0.5;
      raf = settled ? 0 : requestAnimationFrame(frame);
    };
    const kick = () => {
      if (!raf) raf = requestAnimationFrame(frame);
    };

    const onMove = (e: PointerEvent) => {
      const rect = host.getBoundingClientRect();
      lens.tx = e.clientX - rect.left;
      lens.ty = e.clientY - rect.top;
      if (lens.r < 1) {
        lens.x = lens.tx;
        lens.y = lens.ty;
      }
      lens.tr = Math.min(width, height) * 0.2;
      kick();
    };
    const onLeave = () => {
      lens.tr = 0;
      kick();
    };

    let started = false;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || started || !img.complete) return;
        started = true;
        introStart = performance.now();
        kick();
      },
      { threshold: 0.25 },
    );

    const ro = new ResizeObserver(() => {
      if (!img.complete || !img.naturalWidth) return;
      build();
      draw();
    });

    img.onload = () => {
      build();
      draw();
      io.observe(host);
      ro.observe(host);
    };
    // Fetch the photo only as the section approaches.
    const loader = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        loader.disconnect();
        img.src = optimized;
      },
      { rootMargin: "800px 0px" },
    );
    loader.observe(host);
    host.addEventListener("pointermove", onMove);
    host.addEventListener("pointerleave", onLeave);
    window.addEventListener("scroll", onLeave, { passive: true });
    return () => {
      window.removeEventListener("scroll", onLeave);
      cancelAnimationFrame(raf);
      loader.disconnect();
      io.disconnect();
      ro.disconnect();
      host.removeEventListener("pointermove", onMove);
      host.removeEventListener("pointerleave", onLeave);
    };
  }, [optimized]);

  return (
    <div
      ref={wrap}
      data-cursor="none"
      className="relative w-full touch-pan-y"
      style={{ aspectRatio: `${width} / ${height}` }}
      role="img"
      aria-label={alt}
    >
      <canvas ref={canvas} className="absolute inset-0 h-full w-full" />
    </div>
  );
}
