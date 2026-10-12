"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { finishIntro } from "@/lib/intro";
import { curvePoints, toPath } from "@/lib/curves";

const STATUS = ["Initializing weights", "Loading checkpoint", "Warming up kernels", "Ready"];
const CURVE = toPath(curvePoints({ width: 1000, height: 200, points: 220, seed: 11, decay: 0.2, noise: 0.16 }));

export default function Preloader() {
  const root = useRef<HTMLDivElement>(null);
  const count = useRef<HTMLSpanElement>(null);
  const status = useRef<HTMLSpanElement>(null);
  const path = useRef<SVGPathElement>(null);
  const reveal = useRef<HTMLDivElement>(null);
  const tip = useRef<HTMLSpanElement>(null);

  useGSAP(
    () => {
      if (document.documentElement.classList.contains("intro-skip")) return;
      const line = path.current!;
      const length = line.getTotalLength();

      const progress = { value: 0 };
      const tl = gsap.timeline({
        onComplete: () => {
          try {
            sessionStorage.setItem("pb-intro", "1");
          } catch {
            // Storage can be blocked; the intro just plays again next time.
          }
        },
      });

      tl.to(progress, {
        value: 1,
        duration: 2.1,
        ease: "power2.inOut",
        onUpdate: () => {
          const v = progress.value;
          count.current!.textContent = String(Math.round(v * 100)).padStart(3, "0");
          const point = line.getPointAtLength(length * v);
          reveal.current!.style.clipPath = `inset(-20% ${100 - point.x / 10}% -20% 0%)`;
          tip.current!.style.left = `${point.x / 10}%`;
          tip.current!.style.top = `${point.y / 2}%`;
          status.current!.textContent = STATUS[Math.min(STATUS.length - 1, Math.floor(v * STATUS.length))];
        },
      })
        .to("[data-pre='fade']", { autoAlpha: 0, y: -24, duration: 0.7, ease: "expo.in", stagger: 0.04 }, "+=0.15")
        .add(finishIntro, "-=0.2")
        .to(root.current, { clipPath: "inset(0% 0% 100% 0%)", duration: 1.15, ease: "expo.inOut" }, "<")
        .set(root.current, { display: "none" });
    },
    { scope: root },
  );

  return (
    <div
      ref={root}
      aria-hidden
      className="preloader fixed inset-0 z-[80] flex flex-col justify-between bg-ink px-gutter py-6 [clip-path:inset(0%_0%_0%_0%)]"
    >
      <div data-pre="fade" className="mono-label flex justify-between text-dim">
        <span>Pawan Bhandarkar</span>
        <span>bhandarkar.me — 2026</span>
      </div>

      <div data-pre="fade" className="flex flex-col gap-4">
        <span ref={count} className="display text-[clamp(6rem,24vw,22rem)] tabular-nums text-paper">
          000
        </span>
        <span className="mono-label flex items-center gap-2 text-dim">
          <span className="inline-block size-1.5 animate-pulse rounded-full bg-signal" />
          <span ref={status}>{STATUS[0]}</span>
        </span>
      </div>

      <div data-pre="fade" className="relative h-[18vh] w-full">
        <svg
          viewBox="0 0 1000 200"
          preserveAspectRatio="none"
          className="absolute inset-0 h-full w-full overflow-visible"
        >
          <path d="M0 200 H1000" stroke="var(--color-line)" vectorEffect="non-scaling-stroke" fill="none" />
        </svg>
        <div ref={reveal} className="absolute inset-0 [clip-path:inset(-20%_100%_-20%_0%)]">
          <svg
            viewBox="0 0 1000 200"
            preserveAspectRatio="none"
            className="absolute inset-0 h-full w-full overflow-visible"
          >
            <path
              ref={path}
              d={CURVE}
              stroke="var(--color-signal)"
              strokeWidth={1.25}
              vectorEffect="non-scaling-stroke"
              fill="none"
            />
          </svg>
        </div>
        <span
          ref={tip}
          className="absolute size-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-signal shadow-[0_0_24px_4px_rgb(255_181_71/0.6)]"
          style={{ left: "0%", top: "8%" }}
        />
        <span className="mono-label absolute -bottom-5 left-0 text-faint">step</span>
        <span className="mono-label absolute -bottom-5 right-0 text-faint">loss ↓</span>
      </div>
    </div>
  );
}
