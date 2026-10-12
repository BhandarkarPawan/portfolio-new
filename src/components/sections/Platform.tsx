"use client";

import { useRef } from "react";
import { gsap, MOTION_OK, SplitText, useGSAP } from "@/lib/gsap";
import { curvePoints, seeded, smooth, toPath } from "@/lib/curves";
import SectionHeader from "@/components/SectionHeader";
import Mark from "@/components/Mark";

const STAGES = [
  {
    title: "Watch the run",
    body: "Reward, loss and eval curves, checkpoint leaderboards across benchmarks, GPU-hour cost accounting, alerts, and rollouts streamed live from running jobs.",
  },
  {
    title: "Read the data",
    body: "Rollout and training-data viewers with rendered token views, regex search, dataset diffs, data-mix accounting, and lineage from dataset to checkpoint.",
  },
  {
    title: "Find the patterns",
    body: "Unsupervised conversation clustering, from LLM facet extraction through embeddings to hierarchical clusters, surfaces themes and failure modes at scale.",
  },
  {
    title: "Let agents in",
    body: "A typed Python SDK, anchored annotations and a citation graph let AI agents read research artifacts and cite their evidence.",
  },
] as const;

// ---------- Scene data (deterministic so server and client agree) ----------

const CHART_W = 600;
const CHART_H = 300;
const REWARD_RAW = curvePoints({
  width: CHART_W,
  height: CHART_H,
  points: 180,
  seed: 3,
  direction: -1,
  decay: 0.3,
  noise: 0.22,
  pad: 0.12,
});
const REWARD = toPath(REWARD_RAW);
const REWARD_SMOOTH = toPath(smooth(REWARD_RAW, 0.08));
const EVALS = smooth(REWARD_RAW, 0.08)
  .filter((_, i) => i % 18 === 9)
  .map(([x, y], i) => [x, y + (i % 2 ? 14 : -10)]);

const rolloutRand = seeded(21);
const ROLLOUTS = Array.from({ length: 6 }, (_, i) => {
  const reward = Math.round((rolloutRand() * 1.6 - 0.55) * 100) / 100;
  return {
    id: Math.floor(rolloutRand() * 0xffff)
      .toString(16)
      .padStart(4, "0"),
    roles: i % 3 === 1 ? ["user", "assistant", "tool"] : ["user", "assistant"],
    tokens: Array.from({ length: 16 + Math.floor(rolloutRand() * 10) }, () => ({
      w: 6 + Math.floor(rolloutRand() * 26),
      heat: rolloutRand(),
    })),
    reward,
  };
});

const CLUSTERS = [
  { label: "tool-call loops", x: 150, y: 95 },
  { label: "format drift", x: 450, y: 80 },
  { label: "refusals", x: 165, y: 255 },
  { label: "arithmetic slips", x: 440, y: 245 },
] as const;
const dotRand = seeded(5);
const DOTS = Array.from({ length: 84 }, (_, i) => {
  const c = CLUSTERS[i % CLUSTERS.length];
  const a = dotRand() * Math.PI * 2;
  const r = Math.sqrt(dotRand()) * 46;
  return {
    from: [20 + dotRand() * 560, 20 + dotRand() * 300],
    to: [c.x + Math.cos(a) * r * 1.35, c.y + Math.sin(a) * r * 0.8],
    cluster: i % CLUSTERS.length,
  };
});

const heat = (h: number) =>
  h > 0.82
    ? "var(--color-coral)"
    : h > 0.55
      ? "var(--color-signal)"
      : h > 0.25
        ? "rgb(236 235 230 / 0.35)"
        : "var(--color-mint)";

// ---------- Component ----------

export default function Platform() {
  const root = useRef<HTMLElement>(null);

  // Set up in the first commit (no font gating: nothing here measures text),
  // so the pin's scroll distance exists before anything below is measured.
  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        const q = gsap.utils.selector(root);
        const scenes = q("[data-scene]");
        const steps = q("[data-step]");
        const ticks = q("[data-tick]");

        gsap.set(scenes.slice(1), { autoAlpha: 0, y: 24 });
        gsap.set(steps.slice(1), { autoAlpha: 0, y: 30 });

        const counter = (el: Element, from: number, to: number, decimals: number) => {
          const value = { v: from };
          return {
            target: value,
            vars: { v: to, onUpdate: () => (el.textContent = value.v.toFixed(decimals)) },
          };
        };
        const reward = counter(q("[data-reward-value]")[0], 0.31, 0.87, 2);
        const matches = counter(q("[data-match]")[0], 0, 128, 0);

        const tl = gsap.timeline({
          defaults: { ease: "none" },
          scrollTrigger: {
            trigger: q("[data-stage]")[0],
            start: "top top",
            end: () => `+=${window.innerHeight * 4.2}`,
            pin: true,
            scrub: 0.8,
            refreshPriority: 2,
            invalidateOnRefresh: true,
          },
        });

        // Stage 1: the run draws itself.
        // The chart reveals left to right like a run logging steps. (Dash-based drawing
        // breaks here: non-scaling strokes measure dashes in screen space.)
        tl.fromTo(
          q("[data-chart]"),
          { clipPath: "inset(-10% 100% -10% 0%)" },
          { clipPath: "inset(-10% 0% -10% 0%)", duration: 1 },
          0,
        )
          .from(q("[data-eval]"), { scale: 0, stagger: 0.08, duration: 0.2 }, 0.1)
          .to(reward.target, { ...reward.vars, duration: 1 }, 0)
          .from(q("[data-toast]"), { autoAlpha: 0, y: 16, duration: 0.25, ease: "power2.out" }, 0.85)
          .to(ticks[0], { scaleX: 1, duration: 1.3 }, 0);

        const transition = (from: number, to: number, at: number) => {
          tl.to(scenes[from], { autoAlpha: 0, y: -24, duration: 0.35, ease: "power2.in" }, at)
            .to(scenes[to], { autoAlpha: 1, y: 0, duration: 0.4, ease: "power2.out" }, at + 0.25)
            .to(steps[from], { autoAlpha: 0, y: -30, duration: 0.3 }, at)
            .to(steps[to], { autoAlpha: 1, y: 0, duration: 0.35 }, at + 0.2);
        };

        // Stage 2: rollouts stream in.
        transition(0, 1, 1.4);
        tl.from(q("[data-rollout]"), { autoAlpha: 0, x: 40, stagger: 0.12, duration: 0.3, ease: "power2.out" }, 1.85)
          .from(q("[data-token]"), { scaleX: 0, transformOrigin: "left", stagger: 0.004, duration: 0.15 }, 1.9)
          .to(matches.target, { ...matches.vars, duration: 0.6 }, 1.9)
          .to(ticks[1], { scaleX: 1, duration: 1.4 }, 1.4);

        // Stage 3: points find their clusters.
        transition(1, 2, 2.9);
        q("[data-dot]").forEach((dot, i) => {
          const d = DOTS[i];
          tl.fromTo(
            dot,
            { attr: { cx: d.from[0], cy: d.from[1] } },
            { attr: { cx: d.to[0], cy: d.to[1] }, duration: 0.8, ease: "power3.inOut" },
            3.35 + (i % 12) * 0.012,
          );
        });
        tl.from(
          q("[data-hull]"),
          { autoAlpha: 0, scale: 0.6, transformOrigin: "center", stagger: 0.08, duration: 0.3, ease: "back.out(1.6)" },
          4.0,
        ).to(ticks[2], { scaleX: 1, duration: 1.4 }, 2.9);

        // Stage 4: an agent answers with citations.
        transition(2, 3, 4.4);
        const answer = SplitText.create(q("[data-answer]"), { type: "words,chars" });
        tl.from(q("[data-question]"), { autoAlpha: 0, y: 14, duration: 0.2 }, 4.8)
          .from(answer.chars, { autoAlpha: 0, stagger: 0.0045, duration: 0.01 }, 5.0)
          .from(
            q("[data-cite]"),
            { autoAlpha: 0, y: 10, scale: 0.9, stagger: 0.07, duration: 0.2, ease: "back.out(2)" },
            5.75,
          )
          .to(ticks[3], { scaleX: 1, duration: 1.4 }, 4.4)
          .to({}, { duration: 0.3 });
      });
    },
    { scope: root },
  );

  return (
    <section ref={root} id="now" className="relative">
      <div className="px-gutter pt-[clamp(6rem,14vh,10rem)]">
        <SectionHeader
          index="02"
          label="Now — Thinking Machines Lab"
          aside={<span className="hidden sm:inline">Since 2026</span>}
          title={
            <>
              Building the lab&rsquo;s research <span className="serif-em text-signal">acceleration</span> platform.
            </>
          }
        />
        <p data-fade className="mt-8 max-w-xl text-lg leading-relaxed text-paper/70 md:ml-[33%] md:mt-12">
          I created and lead the platform researchers use to inspect training runs, RL rollouts, datasets and evals, and
          built it end to end, from the database schema to the last pixel. It&rsquo;s the second one I&rsquo;ve built;
          the first was Nebula at xAI.
        </p>
      </div>

      <div data-stage className="relative flex min-h-[100svh] items-center px-gutter py-[calc(var(--nav-h)+1rem)]">
        <div className="grid w-full items-center gap-8 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-4">
            <div aria-hidden className="mb-8 grid grid-cols-4 gap-2">
              {STAGES.map((s, i) => (
                <div key={s.title} className="space-y-2">
                  <span className="mono-label text-faint">0{i + 1}</span>
                  <div className="h-px bg-line">
                    <div data-tick className="h-px origin-left scale-x-0 bg-signal [html:not(.motion)_&]:scale-x-100" />
                  </div>
                </div>
              ))}
            </div>
            <ol className="grid">
              {STAGES.map((s, i) => (
                <li
                  key={s.title}
                  data-step
                  className="[grid-area:1/1] [html:not(.motion)_&]:[grid-area:auto] [html:not(.motion)_&]:mb-8"
                >
                  <h3 className="text-[clamp(1.75rem,2.8vw,2.75rem)] font-medium leading-none tracking-[-0.035em]">
                    <span className="mono-label mr-3 align-middle text-signal">0{i + 1}</span>
                    {s.title}
                  </h3>
                  <p className="mt-4 max-w-md text-base leading-relaxed text-paper/65 md:text-lg">{s.body}</p>
                </li>
              ))}
            </ol>
          </div>

          <div className="lg:col-span-8">
            <Frame />
          </div>
        </div>
      </div>
    </section>
  );
}

function Frame() {
  return (
    <div className="overflow-hidden rounded-xl border border-line bg-ink-2 shadow-[0_40px_120px_-40px_rgb(255_181_71/0.18)]">
      <div className="flex items-center justify-between gap-4 border-b border-line px-4 py-3">
        <div className="flex items-center gap-2.5">
          <Mark className="size-4 text-paper" />
          <span className="mono-label text-dim">Research platform</span>
        </div>
        <div className="mono-label hidden flex-1 justify-center md:flex">
          <span className="rounded-md border border-line px-3 py-1 text-faint">
            ⌘K&nbsp;&nbsp;Search runs, datasets, evals
          </span>
        </div>
        <span className="mono-label rounded-full border border-line px-2 py-0.5 text-faint">Illustrative</span>
      </div>
      <div className="relative aspect-[4/3] sm:aspect-[16/10] [html:not(.motion)_&]:aspect-auto">
        <Scene index={0}>
          <WatchScene />
        </Scene>
        <Scene index={1}>
          <ReadScene />
        </Scene>
        <Scene index={2}>
          <ClusterScene />
        </Scene>
        <Scene index={3}>
          <AgentScene />
        </Scene>
      </div>
    </div>
  );
}

function Scene({ index, children }: { index: number; children: React.ReactNode }) {
  return (
    <div
      data-scene={index}
      className="absolute inset-0 bg-ink-2 p-4 sm:p-6 [html:not(.motion)_&]:relative [html:not(.motion)_&]:aspect-[16/10] [html:not(.motion)_&]:border-b [html:not(.motion)_&]:border-line"
    >
      {children}
    </div>
  );
}

function WatchScene() {
  return (
    <div className="flex h-full flex-col">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className="mono-label text-faint">reward / mean</p>
          <p data-reward-value className="display mt-1 text-4xl tabular-nums text-paper sm:text-5xl">
            0.87
          </p>
        </div>
        <div className="mono-label flex gap-2">
          <span className="flex items-center gap-1.5 rounded-full bg-mint/10 px-2.5 py-1 text-mint">
            <span className="size-1.5 animate-pulse rounded-full bg-mint" /> live
          </span>
          <span className="rounded-full border border-line px-2.5 py-1 text-dim">GPU·h 1,284</span>
        </div>
      </div>
      <div className="relative mt-3 flex-1">
        <div data-chart className="absolute inset-0">
          <svg
            viewBox={`0 0 ${CHART_W} ${CHART_H}`}
            preserveAspectRatio="none"
            className="absolute inset-0 h-full w-full overflow-visible"
          >
            {[0.2, 0.4, 0.6, 0.8].map((y) => (
              <line
                key={y}
                x1="0"
                x2={CHART_W}
                y1={CHART_H * y}
                y2={CHART_H * y}
                stroke="var(--color-line)"
                vectorEffect="non-scaling-stroke"
              />
            ))}
            <path
              d={REWARD}
              fill="none"
              stroke="var(--color-signal)"
              strokeOpacity="0.28"
              vectorEffect="non-scaling-stroke"
            />
            <path
              d={REWARD_SMOOTH}
              fill="none"
              stroke="var(--color-signal)"
              strokeWidth="2"
              vectorEffect="non-scaling-stroke"
            />
          </svg>
          {/* Dots live outside the stretched SVG so they stay round. */}
          {EVALS.map(([x, y]) => (
            <span
              key={x}
              data-eval
              className="absolute size-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-sky"
              style={{ left: `${(x / CHART_W) * 100}%`, top: `${(y / CHART_H) * 100}%` }}
            />
          ))}
        </div>
        <div className="mono-label absolute -bottom-1 left-0 flex w-full justify-between text-faint">
          <span>0</span>
          <span>step 10k</span>
          <span>20k</span>
        </div>
        <div
          data-toast
          className="mono-label absolute right-0 top-2 rounded-md border border-sky/30 bg-ink/90 px-3 py-2 text-sky backdrop-blur"
        >
          ▲ eval / math — new best
        </div>
      </div>
      <div className="mono-label mt-5 flex gap-4 text-faint">
        <span className="flex items-center gap-2">
          <i className="h-0.5 w-4 bg-signal" /> reward (ema)
        </span>
        <span className="flex items-center gap-2">
          <i className="size-2 rounded-full bg-sky" /> eval
        </span>
      </div>
    </div>
  );
}

function ReadScene() {
  return (
    <div className="flex h-full flex-col gap-3">
      <div className="mono-label flex items-center justify-between gap-3 rounded-md border border-line px-3 py-2 text-dim">
        <span>
          <span className="text-faint">regex</span> /tool_call.*timeout/
        </span>
        <span className="text-signal">
          <span data-match>128</span> matches
        </span>
      </div>
      <div className="flex flex-1 flex-col justify-between gap-1.5">
        {ROLLOUTS.map((r) => (
          <div
            key={r.id}
            data-rollout
            className="flex items-center gap-3 rounded-md border border-line/60 bg-ink/40 px-3 py-2"
          >
            <span className="mono-label w-12 shrink-0 text-faint">#{r.id}</span>
            <span className="hidden shrink-0 gap-1 sm:flex">
              {r.roles.map((role) => (
                <span key={role} className="mono-label rounded bg-paper/5 px-1.5 py-0.5 text-[0.55rem] text-dim">
                  {role}
                </span>
              ))}
            </span>
            <span className="flex min-w-0 flex-1 gap-[3px] overflow-hidden">
              {r.tokens.map((t, i) => (
                <i
                  key={i}
                  data-token
                  className="h-2.5 shrink-0 rounded-[2px]"
                  style={{ width: t.w, background: heat(t.heat), opacity: 0.85 }}
                />
              ))}
            </span>
            <span className={`mono-label w-12 shrink-0 text-right ${r.reward >= 0 ? "text-mint" : "text-coral"}`}>
              {r.reward >= 0 ? "+" : "−"}
              {Math.abs(r.reward).toFixed(2)}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

function ClusterScene() {
  return (
    <div className="flex h-full flex-col">
      <div className="mono-label flex justify-between text-faint">
        <span>facets → embeddings → clusters</span>
        <span>12,480 conversations</span>
      </div>
      <svg viewBox="0 0 600 340" className="mt-2 w-full flex-1 overflow-visible">
        {CLUSTERS.map((c) => (
          <g key={c.label} data-hull>
            <ellipse
              cx={c.x}
              cy={c.y}
              rx="92"
              ry="58"
              fill="rgb(255 181 71 / 0.04)"
              stroke="var(--color-signal)"
              strokeOpacity="0.45"
              strokeDasharray="3 5"
            />
            <text
              x={c.x}
              y={c.y - 66}
              textAnchor="middle"
              className="fill-paper font-mono text-[15px] uppercase tracking-[0.1em]"
            >
              {c.label}
            </text>
          </g>
        ))}
        {DOTS.map((d, i) => (
          <circle
            key={i}
            data-dot
            cx={d.to[0]}
            cy={d.to[1]}
            r="3.4"
            fill={d.cluster === 3 ? "var(--color-signal)" : "var(--color-paper)"}
            fillOpacity={d.cluster === 3 ? 0.95 : 0.55}
          />
        ))}
      </svg>
    </div>
  );
}

function AgentScene() {
  return (
    <div className="flex h-full flex-col justify-center gap-4 sm:gap-5">
      <div
        data-question
        className="ml-auto max-w-[80%] rounded-2xl rounded-br-sm bg-paper/8 px-4 py-3 text-sm text-paper sm:text-base"
      >
        Why did the math eval regress after step 14k?
      </div>
      <div className="max-w-[92%]">
        <p className="mono-label mb-2 flex items-center gap-2 text-signal">
          <Mark className="size-3.5 text-signal" /> agent
        </p>
        <p data-answer className="text-sm leading-relaxed text-paper/85 sm:text-base">
          The drop concentrates in one cluster: arithmetic slips inside long tool-call chains, starting with the data
          mix that landed at 14k. These rollouts show it most clearly:
        </p>
        <div className="mt-4 flex flex-wrap gap-2">
          {["rollout #a3f1", "rollout #77c0", "eval · math @14k", "dataset diff · mix v12"].map((c) => (
            <span
              key={c}
              data-cite
              className="mono-label rounded-full border border-signal/40 bg-signal/10 px-3 py-1.5 text-signal"
            >
              ↳ {c}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
