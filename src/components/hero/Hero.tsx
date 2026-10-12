"use client";

import { useEffect, useRef } from "react";
import { gsap, MOTION_OK, ScrollTrigger, SplitText, useGSAP } from "@/lib/gsap";
import { onIntroDone } from "@/lib/intro";
import { PROFILE } from "@/data/profile";
import { useFontsReady } from "@/lib/useFontsReady";
import type { Landscape, Telemetry } from "./landscape";

const STEP_FORMAT = new Intl.NumberFormat("en-US", { minimumIntegerDigits: 6 });

export default function Hero() {
  const root = useRef<HTMLElement>(null);
  const canvas = useRef<HTMLCanvasElement>(null);
  const labels = useRef<HTMLDivElement>(null);
  const content = useRef<HTMLDivElement>(null);
  const name = useRef<HTMLHeadingElement>(null);
  const statement = useRef<HTMLParagraphElement>(null);
  const clock = useRef<HTMLSpanElement>(null);
  const stepEl = useRef<HTMLSpanElement>(null);
  const lossEl = useRef<HTMLSpanElement>(null);
  const bestEl = useRef<HTMLSpanElement>(null);
  const landscape = useRef<Landscape | null>(null);
  const fontsReady = useFontsReady();

  // WebGL landscape: loaded lazily so three.js stays out of the first chunk.
  useEffect(() => {
    let disposed = false;
    let unsubscribe = () => {};
    const reducedMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;

    const onTelemetry = (t: Telemetry) => {
      if (stepEl.current) stepEl.current.textContent = STEP_FORMAT.format(t.step);
      if (lossEl.current) lossEl.current.textContent = t.loss.toFixed(4);
      if (bestEl.current) bestEl.current.textContent = t.best.toFixed(4);
    };

    import("./landscape").then(({ createLandscape }) => {
      if (disposed || !canvas.current || !labels.current) return;
      try {
        landscape.current = createLandscape({
          canvas: canvas.current,
          labels: labels.current,
          reducedMotion,
          onTelemetry,
        });
      } catch (error) {
        // No WebGL: the hero still stands on its typography alone.
        console.warn("Hero landscape disabled:", error);
        root.current?.setAttribute("data-webgl", "off");
        return;
      }
      unsubscribe = onIntroDone(() => landscape.current?.start());
    });

    const onResize = () => landscape.current?.resize();
    window.addEventListener("resize", onResize);
    return () => {
      disposed = true;
      unsubscribe();
      window.removeEventListener("resize", onResize);
      landscape.current?.dispose();
      landscape.current = null;
    };
  }, []);

  // Local clock in the HUD.
  useEffect(() => {
    const format = new Intl.DateTimeFormat("en-US", {
      timeZone: PROFILE.timeZone,
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
      timeZoneName: "short",
    });
    const tick = () => {
      if (clock.current) clock.current.textContent = format.format(new Date());
    };
    tick();
    const id = window.setInterval(tick, 1000);
    return () => window.clearInterval(id);
  }, []);

  useGSAP(
    () => {
      // The statement splits into measured lines; the copy stays hidden until then.
      if (!fontsReady) return;
      const section = root.current!;
      const hidden = section.querySelectorAll<HTMLElement>(".js-hide");
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set(hidden, { visibility: "visible" });
        // The landscape is a still frame, so there is nothing to click.
        gsap.set(section.querySelectorAll("[data-motion-only]"), { visibility: "hidden" });
      });

      mm.add(MOTION_OK, () => {
        const nameSplit = SplitText.create(name.current!, { type: "chars", mask: "chars" });
        const lineSplit = SplitText.create(statement.current!, { type: "lines", mask: "lines" });
        lineSplit.masks.forEach((m) => m.classList.add("split-mask"));

        const tl = gsap.timeline({ paused: true, defaults: { ease: "expo.out" } });
        tl.set(hidden, { visibility: "visible" })
          .from(nameSplit.chars, { yPercent: 118, rotate: 7, duration: 1.5, stagger: 0.032 })
          .from("[data-hero='eyebrow']", { autoAlpha: 0, y: 14, duration: 1.1 }, 0.25)
          .from(lineSplit.lines, { yPercent: 110, duration: 1.3, stagger: 0.09 }, 0.4)
          .from("[data-hero='hud']", { autoAlpha: 0, y: 10, duration: 1, stagger: 0.07 }, 0.55)
          .from("[data-hero='cue']", { autoAlpha: 0, y: 10, duration: 1 }, 0.9)
          // Let the name's letters respond to the cursor once they have landed,
          // and hand the statement back to normal line wrapping.
          .add(() => {
            nameSplit.masks.forEach((m) => ((m as HTMLElement).style.overflow = "visible"));
            lineSplit.revert();
          });

        const off = onIntroDone(() => tl.play());

        // Letters near the cursor lift and catch the signal colour.
        const chars = nameSplit.chars as HTMLElement[];
        const lifts = chars.map((c) => gsap.quickTo(c, "y", { duration: 0.6, ease: "power3.out" }));
        let centers: { x: number; y: number }[] = [];
        const measure = () => {
          centers = chars.map((c) => {
            const r = c.getBoundingClientRect();
            return { x: r.left + r.width / 2, y: r.top + r.height / 2 };
          });
        };
        const onMove = (e: PointerEvent) => {
          landscape.current?.setPointer(e.clientX, e.clientY, true);
          if (!centers.length) measure();
          const fontSize = parseFloat(getComputedStyle(name.current!).fontSize);
          chars.forEach((c, i) => {
            const d = Math.hypot(e.clientX - centers[i].x, e.clientY - centers[i].y);
            const k = Math.max(0, 1 - d / (fontSize * 1.1));
            lifts[i](-k * fontSize * 0.09);
            c.style.color = k > 0.45 ? "var(--color-signal)" : "";
          });
        };
        const onLeave = (e: PointerEvent) => {
          landscape.current?.setPointer(e.clientX, e.clientY, false);
          lifts.forEach((lift) => lift(0));
          chars.forEach((c) => (c.style.color = ""));
        };
        // click, not pointerdown: a touch that turns into a scroll never clicks.
        const onClick = (e: MouseEvent) => {
          if ((e.target as Element).closest("a, button")) return;
          landscape.current?.drop(e.clientX, e.clientY);
        };
        const onScroll = () => (centers = []);

        section.addEventListener("pointermove", onMove);
        section.addEventListener("pointerleave", onLeave);
        section.addEventListener("click", onClick);
        window.addEventListener("scroll", onScroll, { passive: true });
        window.addEventListener("resize", onScroll);

        // Scrolling away dives the camera into the surface and lifts the copy.
        ScrollTrigger.create({
          trigger: section,
          start: "top top",
          end: "bottom top",
          scrub: true,
          onUpdate: (self) => landscape.current?.setScroll(self.progress),
        });
        gsap.to(content.current, {
          yPercent: -14,
          autoAlpha: 0.2,
          ease: "none",
          scrollTrigger: { trigger: section, start: "top top", end: "bottom top", scrub: true },
        });

        return () => {
          off();
          section.removeEventListener("pointermove", onMove);
          section.removeEventListener("pointerleave", onLeave);
          section.removeEventListener("click", onClick);
          window.removeEventListener("scroll", onScroll);
          window.removeEventListener("resize", onScroll);
        };
      });
    },
    { scope: root, dependencies: [fontsReady] },
  );

  return (
    <section
      ref={root}
      id="top"
      data-cursor="probe"
      data-cursor-label="Click · drop optimizer"
      className="relative h-[100svh] min-h-[660px] overflow-hidden"
    >
      <canvas ref={canvas} aria-hidden className="absolute inset-0 h-full w-full touch-pan-y" />
      <div ref={labels} aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden" />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-[55%] bg-linear-to-t from-ink via-ink/70 to-transparent"
      />

      <div
        ref={content}
        className="pointer-events-none relative z-10 flex h-full flex-col justify-between px-gutter pb-7 pt-[calc(var(--nav-h)+1.25rem)]"
      >
        <div className="mono-label grid grid-cols-2 gap-x-6 gap-y-3 text-dim md:grid-cols-4">
          <p data-hero="hud" className="js-hide">
            {PROFILE.location}
            <br />
            <span ref={clock} className="text-paper tabular-nums">
              --:--:--
            </span>
          </p>
          <p data-hero="hud" className="js-hide">
            {PROFILE.coordinates.lat}
            <br />
            {PROFILE.coordinates.lon}
          </p>
          <p data-hero="hud" className="js-hide hidden tabular-nums md:block">
            step{" "}
            <span ref={stepEl} className="text-paper">
              000,000
            </span>
            <br />
            loss{" "}
            <span ref={lossEl} className="text-signal">
              —
            </span>{" "}
            · best{" "}
            <span ref={bestEl} className="text-paper">
              —
            </span>
          </p>
          <p data-hero="hud" data-motion-only className="js-hide hidden text-right md:block">
            Click the surface
            <br />
            to drop an optimizer
          </p>
        </div>

        <div className="relative">
          <p data-hero="eyebrow" className="js-hide mono-label mb-5 flex items-center gap-3 text-dim md:mb-7">
            <span className="relative flex size-2">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-signal opacity-60" />
              <span className="relative inline-flex size-2 rounded-full bg-signal" />
            </span>
            {PROFILE.role} — {PROFILE.company}
          </p>

          <h1 ref={name} className="js-hide display text-[clamp(3.6rem,15.4vw,17.5rem)] text-paper">
            <span className="block">Pawan</span>
            <span className="block md:pl-[0.06em]">Bhandarkar</span>
          </h1>

          <div className="mt-7 flex flex-col gap-6 md:absolute md:right-0 md:top-[clamp(3rem,6.2vw,7.5rem)] md:mt-0 md:w-[min(31vw,30rem)] md:items-end">
            <p
              ref={statement}
              className="js-hide text-[clamp(1.15rem,1.65vw,1.7rem)] leading-[1.22] tracking-[-0.018em] text-paper/90 md:text-right"
            >
              I build the <em className="serif-em text-signal">instruments</em> that let researchers see inside frontier
              models.
            </p>
            <a
              href="#thesis"
              data-hero="cue"
              data-cursor="link"
              className="js-hide mono-label pointer-events-auto group flex items-center gap-3 text-dim transition-colors hover:text-paper"
            >
              Scroll to explore
              <span className="relative h-px w-14 overflow-hidden bg-line">
                <span className="absolute inset-0 origin-left animate-[cue_2.4s_var(--ease-expo-in-out)_infinite] bg-signal" />
              </span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
