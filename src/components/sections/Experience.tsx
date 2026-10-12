"use client";

import { useRef } from "react";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";
import { curvePoints, smooth, toPath } from "@/lib/curves";
import { ROLES, type Role } from "@/data/profile";
import SectionHeader from "@/components/SectionHeader";
import { useScrollTo } from "@/components/motion/SmoothScroll";

const CURVE_RAW = curvePoints({ width: 1000, height: 100, points: 360, seed: 9, decay: 0.42, noise: 0.16, pad: 0.12 });
const CURVE_POINTS = smooth(CURVE_RAW, 0.1);
const CURVE_NOISY = toPath(CURVE_RAW);
const CURVE = toPath(CURVE_POINTS);

/** Curve height (0–100) at x (0–1000), linearly interpolated. */
function curveY(x: number) {
  const step = 1000 / (CURVE_POINTS.length - 1);
  const i = Math.min(CURVE_POINTS.length - 2, Math.max(0, Math.floor(x / step)));
  const [x0, y0] = CURVE_POINTS[i];
  const [, y1] = CURVE_POINTS[i + 1];
  return y0 + ((x - x0) / step) * (y1 - y0);
}

export default function Experience() {
  const root = useRef<HTMLElement>(null);
  const scrollTo = useScrollTo();

  useGSAP(
    () => {
      const q = gsap.utils.selector(root);
      const panels = q("[data-panel]") as HTMLElement[];
      const mm = gsap.matchMedia();

      const reveal = (panel: HTMLElement, scrollTrigger: ScrollTrigger.Vars) => {
        gsap.from(panel.querySelectorAll("[data-xp-anim]"), {
          y: 40,
          autoAlpha: 0,
          duration: 1.1,
          ease: "expo.out",
          stagger: 0.06,
          scrollTrigger,
        });
        panel.querySelectorAll<HTMLElement>("[data-xp-count]").forEach((el) => {
          const to = Number(el.dataset.xpCount);
          const decimals = Number(el.dataset.decimals ?? 0);
          const value = { v: 0 };
          el.textContent = (0).toFixed(decimals);
          gsap.to(value, {
            v: to,
            duration: 2.2,
            ease: "expo.out",
            onUpdate: () => (el.textContent = value.v.toFixed(decimals)),
            scrollTrigger,
          });
        });
      };

      mm.add(
        {
          horizontal: "(min-width: 1024px) and (prefers-reduced-motion: no-preference)",
          vertical: "(max-width: 1023.98px) and (prefers-reduced-motion: no-preference)",
        },
        (context) => {
          if (!context.conditions?.horizontal) {
            panels.forEach((panel) => reveal(panel, { trigger: panel, start: "top 78%", once: true }));
            return;
          }

          const track = q("[data-track]")[0] as HTMLElement;
          const clip = q("[data-curve-clip]")[0] as HTMLElement;
          const tip = q("[data-curve-tip]")[0] as HTMLElement;
          const markers = q("[data-marker]") as HTMLElement[];
          let markerAt: number[] = [];

          // Markers sit at each panel's left edge; positions depend on layout, so recompute on refresh.
          const layout = () => {
            const width = track.scrollWidth;
            markerAt = panels.map((p) => (p.offsetLeft + 6) / width);
            markers.forEach((m, i) => {
              m.style.left = `${markerAt[i] * 100}%`;
              m.style.top = `${curveY(markerAt[i] * 1000)}%`;
            });
          };

          const follow = (progress: number) => {
            const width = track.scrollWidth;
            const view = window.innerWidth;
            const frac = gsap.utils.clamp(0, 1, (progress * (width - view) + view * 0.62) / width);
            clip.style.clipPath = `inset(-20% ${(1 - frac) * 100}% -20% 0)`;
            tip.style.left = `${frac * 100}%`;
            tip.style.top = `${curveY(frac * 1000)}%`;
            markers.forEach((m, i) => m.toggleAttribute("data-reached", frac >= markerAt[i]));
          };

          // Assigned after creation; ScrollTrigger may refresh before gsap.to returns.
          let tween: gsap.core.Tween | null = null;
          tween = gsap.to(track, {
            x: () => -(track.scrollWidth - window.innerWidth),
            ease: "none",
            onUpdate: () => follow(tween?.progress() ?? 0),
            scrollTrigger: {
              trigger: q("[data-pin]")[0],
              start: "top top",
              end: () => `+=${track.scrollWidth - window.innerWidth}`,
              pin: true,
              scrub: 0.7,
              refreshPriority: 1,
              invalidateOnRefresh: true,
              onRefresh: () => {
                layout();
                follow(tween?.progress() ?? 0);
              },
            },
          });

          panels.forEach((panel) =>
            reveal(panel, { trigger: panel, containerAnimation: tween, start: "left 72%", once: true }),
          );
          layout();
          follow(0);
        },
      );
    },
    { scope: root },
  );

  return (
    <section ref={root} id="experience" className="relative">
      <div className="px-gutter pb-10 pt-[clamp(6rem,14vh,10rem)] lg:pb-4">
        <SectionHeader
          index="03"
          label="Experience"
          aside={<span>2020 → now</span>}
          title={
            <>
              A training run in five <span className="serif-em text-signal">checkpoints</span>.
            </>
          }
        />
      </div>

      <div data-pin className="xp-pin relative">
        <div data-track className="xp-track relative">
          <div aria-hidden className="xp-band">
            <div data-curve-clip className="absolute inset-0">
              <svg
                viewBox="0 0 1000 100"
                preserveAspectRatio="none"
                className="absolute inset-0 h-full w-full overflow-visible"
              >
                <path
                  d={CURVE_NOISY}
                  fill="none"
                  stroke="var(--color-signal)"
                  strokeOpacity="0.25"
                  vectorEffect="non-scaling-stroke"
                />
                <path
                  d={CURVE}
                  fill="none"
                  stroke="var(--color-signal)"
                  strokeWidth="1.5"
                  vectorEffect="non-scaling-stroke"
                />
              </svg>
            </div>
            <svg
              viewBox="0 0 1000 100"
              preserveAspectRatio="none"
              className="absolute inset-0 h-full w-full overflow-visible"
            >
              <path
                d={CURVE}
                fill="none"
                stroke="var(--color-line)"
                vectorEffect="non-scaling-stroke"
                strokeDasharray="2 4"
              />
            </svg>
            {ROLES.map((r, i) => (
              <span key={r.id} data-marker className="xp-marker">
                <span className="xp-marker-label mono-label">ckpt {String(i + 1).padStart(2, "0")}</span>
              </span>
            ))}
            <span
              data-curve-tip
              className="absolute size-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-signal shadow-[0_0_28px_6px_rgb(255_181_71/0.55)]"
            />
          </div>

          {ROLES.map((role, i) => (
            <Panel key={role.id} role={role} index={i} />
          ))}

          <article data-panel className="xp-panel xp-panel--end">
            <div className="xp-band-space" />
            <p data-xp-anim className="mono-label text-dim">
              ckpt {String(ROLES.length + 1).padStart(2, "0")} · pending
            </p>
            <h3 data-xp-anim className="display mt-6 text-[clamp(2.75rem,min(6vw,9svh),6.5rem)]">
              Next <span className="serif-em text-signal">checkpoint</span>
              <span className="ml-2 inline-block h-[0.8em] w-[0.06em] animate-pulse bg-signal align-baseline" />
            </h3>
            <a
              data-xp-anim
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                scrollTo("#contact");
              }}
              className="mono-label mt-10 inline-flex w-fit items-center gap-3 rounded-full border border-line px-5 py-3 text-paper transition-colors hover:border-signal hover:text-signal"
            >
              Get in touch <span aria-hidden>→</span>
            </a>
          </article>
        </div>
      </div>
    </section>
  );
}

function Panel({ role, index }: { role: Role; index: number }) {
  const { metric } = role;
  return (
    <article data-panel className="xp-panel">
      <div data-xp-anim className="mono-label flex flex-wrap items-center gap-x-5 gap-y-1 text-dim">
        <span>
          <span className="text-signal">ckpt {String(index + 1).padStart(2, "0")}</span> /{" "}
          {String(ROLES.length).padStart(2, "0")}
        </span>
        <span aria-hidden className="h-px w-8 bg-line" />
        <span className="tabular-nums text-paper/80">{role.period}</span>
      </div>
      <div className="xp-band-space" />

      <h3 data-xp-anim className="display mt-6 text-[clamp(2.75rem,min(6.4vw,10svh),7.25rem)] lg:mt-0">
        {role.company}
      </h3>
      <p data-xp-anim className="mono-label mt-4 text-dim">
        {role.title} · {role.location}
      </p>

      <div className="mt-8 grid gap-10 md:grid-cols-[1.5fr_1fr] lg:mt-[min(2.5rem,4svh)] lg:flex-1">
        <div>
          <p data-xp-anim className="max-w-xl text-lg leading-snug text-paper md:text-xl">
            {role.summary}
          </p>
          <ul className="mt-6 max-w-xl space-y-3">
            {role.highlights.map((h) => (
              <li
                key={h}
                data-xp-anim
                className="relative pl-6 text-[0.95rem] leading-relaxed text-paper/60 before:absolute before:left-0 before:top-[0.75em] before:h-px before:w-3 before:bg-signal"
              >
                {h}
              </li>
            ))}
          </ul>
        </div>

        <div className="flex flex-col gap-8">
          {metric ? (
            <div data-xp-anim>
              <p className="display text-[clamp(3rem,min(5vw,8svh),5.5rem)] tabular-nums text-signal">
                {metric.kind === "count" ? (
                  <>
                    {metric.prefix}
                    <span data-xp-count={metric.value} data-decimals={metric.decimals ?? 0}>
                      {metric.value.toFixed(metric.decimals ?? 0)}
                    </span>
                    {metric.suffix}
                  </>
                ) : (
                  metric.display
                )}
              </p>
              <p className="mono-label mt-3 max-w-[22ch] text-dim">{metric.label}</p>
            </div>
          ) : null}
          {role.current ? (
            <p data-xp-anim className="mono-label flex items-center gap-2.5 text-mint">
              <span className="size-2 animate-pulse rounded-full bg-mint" /> Current checkpoint · still training
            </p>
          ) : null}
          <ul data-xp-anim className="flex flex-wrap gap-2">
            {role.stack.map((s) => (
              <li key={s} className="mono-label rounded-full border border-line px-3 py-1.5 text-dim">
                {s}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </article>
  );
}
