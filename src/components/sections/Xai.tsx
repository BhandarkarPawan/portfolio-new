"use client";

import { useRef } from "react";
import { gsap, MOTION_OK, useGSAP } from "@/lib/gsap";
import { seeded } from "@/lib/curves";
import { XAI_PLATFORMS, type XaiPlatform } from "@/data/profile";
import SectionHeader from "@/components/SectionHeader";

export default function Xai() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add({ motion: MOTION_OK, wide: "(min-width: 1024px)" }, (context) => {
        const { motion, wide } = context.conditions ?? {};
        if (!motion) return;
        const cards = gsap.utils.toArray<HTMLElement>("[data-stack-card]");

        // Each card's illustration assembles as the card arrives.
        cards.forEach((card) => {
          const tl = gsap.timeline({ scrollTrigger: { trigger: card, start: "top 70%", once: true } });
          tl.from(card.querySelectorAll("[data-grow]"), {
            scaleX: 0,
            transformOrigin: "left center",
            duration: 0.9,
            ease: "expo.out",
            stagger: 0.04,
          }).from(
            card.querySelectorAll("[data-pop]"),
            { autoAlpha: 0, y: 12, duration: 0.6, ease: "expo.out", stagger: 0.08 },
            0.2,
          );
        });

        // On wide screens the cards stack: each one sticks under the nav while the
        // next slides over it, and the covered card recedes.
        if (!wide) return;
        cards.slice(0, -1).forEach((card, i) => {
          const next = cards[i + 1];
          gsap
            .timeline({ scrollTrigger: { trigger: next, start: "top bottom", end: "top top+=120", scrub: true } })
            .to(card.querySelector("[data-stack-inner]"), { scale: 0.93, ease: "none" }, 0)
            .to(card.querySelector("[data-stack-shade]"), { opacity: 0.6, ease: "none" }, 0);
        });
      });
    },
    { scope: root },
  );

  return (
    <section ref={root} id="xai" className="relative px-gutter pb-[clamp(4rem,10vh,7rem)] pt-[clamp(5rem,12vh,8.5rem)]">
      <SectionHeader
        index="03"
        label="Previously — xAI"
        aside={<span className="hidden sm:inline">2024 — 2026</span>}
        title={
          <>
            The tools behind <span className="serif-em text-signal">Grok</span>.
          </>
        }
      />
      <p data-fade className="mt-8 max-w-xl text-lg leading-relaxed text-paper/70 md:ml-[33%] md:mt-12">
        Before Thinking Machines, I built this kind of instrument for the first time at xAI, along with the platform
        that produced Grok&rsquo;s human data and the agents researchers worked alongside.
      </p>

      <div className="mt-16 space-y-6 md:mt-24 lg:space-y-[14vh]">
        {XAI_PLATFORMS.map((platform, i) => (
          <article
            key={platform.id}
            data-stack-card
            className="lg:sticky"
            style={{ top: `calc(var(--nav-h) + ${1 + i * 1.1}rem)` }}
          >
            <div
              data-stack-inner
              className="relative grid origin-top overflow-hidden rounded-2xl border border-line bg-ink-2 lg:min-h-[min(74svh,760px)] lg:grid-cols-[1.05fr_1fr]"
            >
              <div className="flex flex-col justify-between gap-10 p-7 md:p-10 lg:p-12">
                <div>
                  <p className="mono-label flex items-center gap-3 text-dim">
                    <span className="text-signal">0{i + 1}</span>
                    <span aria-hidden className="h-px w-6 bg-line" />
                    {platform.kind}
                  </p>
                  <h3 className="display mt-6 text-[clamp(3rem,6.5vw,7rem)]">{platform.name}</h3>
                  <p className="mt-6 max-w-lg text-lg leading-snug text-paper/85 md:text-xl">{platform.summary}</p>
                  <ul className="mt-8 max-w-lg space-y-3">
                    {platform.points.map((point) => (
                      <li
                        key={point}
                        className="relative pl-6 text-[0.95rem] leading-relaxed text-paper/60 before:absolute before:left-0 before:top-[0.75em] before:h-px before:w-3 before:bg-signal"
                      >
                        {point}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <p className="display text-[clamp(2.75rem,4.5vw,4.75rem)] text-signal">{platform.stat.value}</p>
                  <p className="mono-label mt-3 text-dim">{platform.stat.label}</p>
                </div>
              </div>
              <div className="relative min-h-[300px] border-t border-line bg-ink lg:border-l lg:border-t-0">
                <Visual id={platform.id} />
                <span className="mono-label absolute right-4 top-4 rounded-full border border-line px-2 py-0.5 text-faint">
                  Illustrative
                </span>
              </div>
              <div data-stack-shade aria-hidden className="pointer-events-none absolute inset-0 bg-ink opacity-0" />
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

function Visual({ id }: { id: XaiPlatform["id"] }) {
  if (id === "nebula") return <TraceVisual />;
  if (id === "starfleet") return <ArenaVisual />;
  return <AgentVisual />;
}

// ---------- Nebula: a trace waterfall ----------

const SPANS = [
  { label: "episode", depth: 0, start: 0, width: 100 },
  { label: "turn 1", depth: 1, start: 0, width: 26 },
  { label: "model.generate", depth: 2, start: 1, width: 17 },
  { label: "tool · python", depth: 2, start: 19, width: 6 },
  { label: "turn 2", depth: 1, start: 27, width: 38 },
  { label: "model.generate", depth: 2, start: 28, width: 21 },
  { label: "tool · search", depth: 2, start: 50, width: 12 },
  { label: "turn 3", depth: 1, start: 66, width: 22 },
  { label: "model.generate", depth: 2, start: 67, width: 14, hot: true },
  { label: "grader", depth: 1, start: 89, width: 8 },
  { label: "reward", depth: 1, start: 97.5, width: 2.5 },
] as const;

function TraceVisual() {
  return (
    <div className="flex h-full flex-col p-6 pt-14 md:p-8 md:pt-16">
      <p className="mono-label text-faint">trace · rollout #8812 · 3 turns · 11 spans</p>
      <div className="mono-label mt-5 flex justify-between border-b border-line pb-2 text-faint">
        <span>0s</span>
        <span>12s</span>
        <span>24s</span>
        <span>36s</span>
      </div>
      <div className="mt-3 flex flex-1 flex-col justify-between gap-1.5">
        {SPANS.map((span, i) => (
          <div key={i} className="grid grid-cols-[8.5rem_1fr] items-center gap-3">
            <span className="mono-label truncate text-dim" style={{ paddingLeft: `${span.depth * 0.75}rem` }}>
              {span.label}
            </span>
            <span className="relative h-3">
              <span
                data-grow
                className={`absolute inset-y-0 rounded-sm ${"hot" in span ? "bg-signal" : span.depth === 0 ? "bg-paper/15" : span.depth === 1 ? "bg-paper/35" : "bg-sky/70"}`}
                style={{ left: `${span.start}%`, width: `${span.width}%` }}
              />
            </span>
          </div>
        ))}
      </div>
      <div
        data-pop
        className="mono-label mt-5 flex items-center justify-between rounded-md border border-signal/40 bg-signal/10 px-3 py-2 text-signal"
      >
        <span>model.generate · 4,812 tokens · 6.1s</span>
        <span>grader 0.82</span>
      </div>
    </div>
  );
}

// ---------- Starfleet: a side-by-side arena ----------

const lineRand = seeded(17);
const ARENA_LINES = [0, 1].map(() => Array.from({ length: 9 }, () => 45 + Math.round(lineRand() * 55)));
const RUBRIC = [
  ["helpfulness", 4],
  ["tone", 5],
  ["accuracy", 4],
  ["concision", 3],
] as const;
const CHOICES = ["A ≫ B", "A > B", "Tie", "B > A", "B ≫ A"] as const;

function ArenaVisual() {
  return (
    <div className="flex h-full flex-col justify-center p-6 pt-14 md:p-8 md:pt-16">
      <p className="mono-label text-faint">arena · task #1047 · personality</p>
      <div className="mt-5 grid grid-cols-2 gap-3">
        {ARENA_LINES.map((lines, i) => (
          <div key={i} className="flex flex-col gap-2.5 rounded-lg border border-line bg-ink-2 p-4">
            <p className="mono-label text-dim">Response {i === 0 ? "A" : "B"}</p>
            {lines.map((w, j) => (
              <span key={j} data-grow className="h-2 rounded-full bg-paper/20" style={{ width: `${w}%` }} />
            ))}
          </div>
        ))}
      </div>
      <div className="mt-4 grid grid-cols-5 gap-2">
        {CHOICES.map((choice) => (
          <span
            key={choice}
            data-pop
            className={`mono-label rounded-md border px-2 py-2 text-center ${choice === "A > B" ? "border-signal bg-signal text-ink" : "border-line text-dim"}`}
          >
            {choice}
          </span>
        ))}
      </div>
      <div className="mt-4 grid grid-cols-2 gap-x-6 gap-y-2">
        {RUBRIC.map(([label, score]) => (
          <div key={label} data-pop className="mono-label flex items-center justify-between text-dim">
            <span>{label}</span>
            <span className="tracking-[0.3em] text-signal">
              {"●".repeat(score)}
              <span className="text-faint">{"●".repeat(5 - score)}</span>
            </span>
          </div>
        ))}
      </div>
      <div className="mono-label mt-5 flex flex-wrap gap-2">
        <span data-pop className="rounded-full bg-mint/10 px-3 py-1.5 text-mint">
          QA ✓ 2 of 2 reviewers
        </span>
        <span data-pop className="rounded-full border border-line px-3 py-1.5 text-dim">
          auto-grader 0.91
        </span>
        <span data-pop className="rounded-full border border-line px-3 py-1.5 text-dim">
          throughput ▲ 12%
        </span>
      </div>
    </div>
  );
}

// ---------- Agents: a research assistant at work ----------

function AgentVisual() {
  return (
    <div className="flex h-full flex-col justify-center gap-4 p-6 pt-14 font-mono text-[0.8rem] leading-relaxed md:p-8 md:pt-16">
      <p data-pop className="text-paper">
        <span className="text-signal">›</span> @run-8812 why did reward collapse at step 3k?
      </p>
      <div className="space-y-1.5 text-dim">
        <p data-pop>→ rollouts.query(run=8812, steps=2900..3100)</p>
        <p data-pop>→ cluster(by=&quot;failure_mode&quot;)</p>
        <p data-pop>→ notebook.open(&quot;reward-debug&quot;, cell=12)</p>
      </div>
      <div className="space-y-2">
        {[92, 78, 85, 40].map((w, i) => (
          <span key={i} data-grow className="block h-2 rounded-full bg-paper/20" style={{ width: `${w}%` }} />
        ))}
      </div>
      <div data-pop className="flex items-center gap-3 rounded-md border border-mint/30 bg-mint/10 px-3 py-2 text-mint">
        <span className="size-1.5 rounded-full bg-mint" /> devbot opened a PR · fix reward clipping
      </div>
    </div>
  );
}
