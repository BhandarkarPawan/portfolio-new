"use client";

import Lenis from "lenis";
import { useCallback, useEffect, useSyncExternalStore } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { onIntroDone } from "@/lib/intro";

// The Lenis instance is created after mount, so it is exposed as an external store.
let current: Lenis | null = null;
const listeners = new Set<() => void>();
const publish = (lenis: Lenis | null) => {
  current = lenis;
  listeners.forEach((notify) => notify());
};
const subscribe = (notify: () => void) => {
  listeners.add(notify);
  return () => listeners.delete(notify);
};

export function useLenis() {
  return useSyncExternalStore(
    subscribe,
    () => current,
    () => null,
  );
}

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const lenis = new Lenis({ autoRaf: false, lerp: 0.09 });
    lenis.on("scroll", ScrollTrigger.update);
    const raf = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);

    lenis.stop();
    const off = onIntroDone(() => lenis.start());
    publish(lenis);
    return () => {
      off();
      gsap.ticker.remove(raf);
      lenis.destroy();
      publish(null);
    };
  }, []);

  useEffect(() => {
    document.fonts.ready.then(() => ScrollTrigger.refresh());
  }, []);

  return children;
}

/** Smoothly scrolls to an in-page target, falling back to native scrolling without Lenis. */
export function useScrollTo() {
  const lenis = useLenis();
  return useCallback(
    (target: string | number) => {
      if (lenis) {
        lenis.scrollTo(target, { duration: 1.6, easing: (t) => 1 - Math.pow(1 - t, 4) });
        return;
      }
      if (typeof target === "number") window.scrollTo({ top: target });
      else document.querySelector(target)?.scrollIntoView();
    },
    [lenis],
  );
}
