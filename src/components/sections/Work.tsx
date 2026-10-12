"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { ARCHIVE, PROJECTS } from "@/data/profile";
import SectionHeader from "@/components/SectionHeader";

export default function Work() {
  const root = useRef<HTMLElement>(null);
  const preview = useRef<HTMLDivElement>(null);
  const strip = useRef<HTMLDivElement>(null);
  // The floating preview sits in the viewport (fixed, hidden), so lazy loading
  // can't defer its images; mount them only once the section is close.
  const [previewReady, setPreviewReady] = useState(false);

  useEffect(() => {
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        io.disconnect();
        setPreviewReady(true);
      },
      { rootMargin: "600px 0px" },
    );
    io.observe(root.current!);
    return () => io.disconnect();
  }, []);

  // A floating preview follows the cursor over the list, tilting with its velocity.
  useGSAP(
    () => {
      if (!matchMedia("(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)").matches) return;
      const list = root.current!.querySelector<HTMLElement>("[data-list]")!;
      const rows = gsap.utils.toArray<HTMLElement>("[data-row]", list);
      gsap.set(preview.current, { xPercent: -50, yPercent: -50, scale: 0.4, autoAlpha: 0 });
      const xTo = gsap.quickTo(preview.current, "x", { duration: 0.7, ease: "power3" });
      const yTo = gsap.quickTo(preview.current, "y", { duration: 0.7, ease: "power3" });
      const tilt = gsap.quickTo(preview.current, "rotation", { duration: 0.9, ease: "power3" });
      let lastX = 0;

      const enter = (i: number) => () => {
        gsap.to(strip.current, { yPercent: (-100 / PROJECTS.length) * i, duration: 0.8, ease: "expo.out" });
        gsap.to(preview.current, { scale: 1, autoAlpha: 1, duration: 0.6, ease: "expo.out" });
      };
      const leave = () => gsap.to(preview.current, { scale: 0.4, autoAlpha: 0, duration: 0.45, ease: "expo.out" });
      const move = (e: PointerEvent) => {
        xTo(e.clientX);
        yTo(e.clientY);
        tilt(gsap.utils.clamp(-14, 14, (e.clientX - lastX) * 0.7));
        lastX = e.clientX;
      };

      const handlers = rows.map((row, i) => {
        const h = enter(i);
        row.addEventListener("pointerenter", h);
        return () => row.removeEventListener("pointerenter", h);
      });
      list.addEventListener("pointerleave", leave);
      list.addEventListener("pointermove", move);
      return () => {
        handlers.forEach((off) => off());
        list.removeEventListener("pointerleave", leave);
        list.removeEventListener("pointermove", move);
      };
    },
    { scope: root },
  );

  return (
    <section ref={root} id="work" className="px-gutter py-[clamp(5rem,12vh,8.5rem)]">
      <SectionHeader
        index="05"
        label="Selected work"
        aside={<span className="hidden sm:inline">Before the labs</span>}
        title={
          <>
            Things I&rsquo;ve <span className="serif-em text-signal">shipped</span> along the way.
          </>
        }
      />

      <ul data-list className="group/list mt-16 border-t border-line md:mt-24">
        {PROJECTS.map((p, i) => {
          const body = (
            <>
              <div className="relative mb-6 aspect-[16/10] overflow-hidden rounded-lg border border-line md:hidden">
                <Image src={p.image} alt="" fill sizes="100vw" className="object-cover object-top" />
              </div>
              <span className="mono-label pt-3 text-faint md:col-span-1">{String(i + 1).padStart(2, "0")}</span>
              <span className="md:col-span-6">
                <span className="display block text-[clamp(2.25rem,5vw,4.75rem)] transition-transform duration-700 ease-[var(--ease-expo)] md:group-hover:translate-x-5">
                  {p.name}
                  {p.href ? (
                    <span
                      aria-hidden
                      className="ml-3 inline-block align-top text-[0.35em] text-signal opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                    >
                      ↗
                    </span>
                  ) : null}
                </span>
                <span className="mt-3 block max-w-[46ch] text-paper/55">{p.blurb}</span>
              </span>
              <span className="mono-label pt-3 text-dim md:col-span-2">{p.org}</span>
              <span className="mono-label hidden pt-3 text-right leading-relaxed text-faint md:col-span-3 md:block">
                {p.stack.join(" · ")}
              </span>
            </>
          );
          const rowClass =
            "group grid grid-cols-1 gap-x-6 gap-y-2 border-b border-line py-8 transition-opacity duration-500 md:grid-cols-12 md:py-10 md:group-hover/list:opacity-35 md:hover:!opacity-100";
          return (
            <li key={p.name} data-row>
              {p.href ? (
                <a href={p.href} target="_blank" rel="noreferrer" data-cursor-label="Visit" className={rowClass}>
                  {body}
                </a>
              ) : (
                <div className={rowClass}>{body}</div>
              )}
            </li>
          );
        })}
      </ul>

      <div
        ref={preview}
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-40 hidden aspect-[16/11] w-[min(30vw,440px)] overflow-hidden rounded-lg border border-line bg-ink-2 shadow-2xl md:block"
        style={{ visibility: "hidden" }}
      >
        <div ref={strip} className="flex flex-col" style={{ height: `${PROJECTS.length * 100}%` }}>
          {PROJECTS.map((p) => (
            <div key={p.name} className="relative w-full flex-1">
              {previewReady ? (
                <Image src={p.image} alt="" fill sizes="440px" className="object-cover object-top" />
              ) : null}
            </div>
          ))}
        </div>
      </div>

      <div className="mt-24 grid gap-10 md:grid-cols-12">
        <h3 data-fade className="mono-label text-dim md:col-span-3">
          Archive &amp; experiments
        </h3>
        <ul className="md:col-span-9">
          {ARCHIVE.map((a) => {
            const inner = (
              <>
                <span className="text-lg tracking-tight text-paper">{a.name}</span>
                <span className="text-right text-sm text-dim">
                  {a.kind}
                  {a.href ? <span className="ml-2 text-signal">↗</span> : null}
                </span>
              </>
            );
            const cls = "flex items-baseline justify-between gap-6 border-b border-line py-4";
            return (
              <li key={a.name} data-fade>
                {a.href ? (
                  <a
                    href={a.href}
                    target="_blank"
                    rel="noreferrer"
                    className={`${cls} transition-colors hover:border-signal/60`}
                  >
                    {inner}
                  </a>
                ) : (
                  <div className={cls}>{inner}</div>
                )}
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
