"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";

type State = "default" | "link" | "label" | "probe";

export default function Cursor() {
  const dot = useRef<HTMLDivElement>(null);
  const ring = useRef<HTMLDivElement>(null);
  const label = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const fine = matchMedia("(hover: hover) and (pointer: fine)").matches;
    const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || reduced || !dot.current || !ring.current || !label.current) return;

    const html = document.documentElement;
    html.classList.add("has-cursor");
    const dotX = gsap.quickSetter(dot.current, "x", "px");
    const dotY = gsap.quickSetter(dot.current, "y", "px");
    const ringX = gsap.quickTo(ring.current, "x", { duration: 0.5, ease: "power3.out" });
    const ringY = gsap.quickTo(ring.current, "y", { duration: 0.5, ease: "power3.out" });
    let visible = false;
    let current: State = "default";
    const last = { x: -1, y: -1 };

    const setState = (state: State, text: string) => {
      if (state === current && label.current!.textContent === text) return;
      current = state;
      ring.current!.dataset.state = state;
      label.current!.textContent = text;
    };

    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      if (!visible) {
        visible = true;
        gsap.to([dot.current, ring.current], { autoAlpha: 1, duration: 0.3 });
        gsap.set(ring.current, { x: e.clientX, y: e.clientY });
      }
      dotX(e.clientX);
      dotY(e.clientY);
      ringX(e.clientX);
      ringY(e.clientY);
      last.x = e.clientX;
      last.y = e.clientY;
      resolve(e.target as Element);
    };

    const resolve = (target: Element | null) => {
      const el = target?.closest<HTMLElement>("a, button, [data-cursor]");
      if (!el) return setState("default", "");
      const kind = el.dataset.cursor;
      if (kind === "probe") return setState("probe", el.dataset.cursorLabel ?? "");
      if (el.dataset.cursorLabel) return setState("label", el.dataset.cursorLabel);
      if (kind === "none") return setState("default", "");
      setState("link", "");
    };
    // Content scrolls under a resting pointer; re-check what it is over.
    const onScroll = () => {
      if (visible) resolve(document.elementFromPoint(last.x, last.y));
    };
    const onLeave = () => {
      visible = false;
      gsap.to([dot.current, ring.current], { autoAlpha: 0, duration: 0.3 });
    };
    const onDown = () => gsap.to(ring.current, { scale: 0.82, duration: 0.15 });
    const onUp = () => gsap.to(ring.current, { scale: 1, duration: 0.5, ease: "elastic.out(1, 0.5)" });

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("scroll", onScroll, { passive: true });
    document.documentElement.addEventListener("pointerleave", onLeave);
    window.addEventListener("pointerdown", onDown);
    window.addEventListener("pointerup", onUp);
    return () => {
      html.classList.remove("has-cursor");
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("scroll", onScroll);
      document.documentElement.removeEventListener("pointerleave", onLeave);
      window.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointerup", onUp);
    };
  }, []);

  return (
    <div aria-hidden>
      <div ref={dot} className="cursor cursor-dot invisible opacity-0" />
      <div ref={ring} className="cursor cursor-ring invisible opacity-0" data-state="default">
        <span ref={label} className="cursor-label" />
      </div>
    </div>
  );
}
