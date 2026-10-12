"use client";

import { usePathname } from "next/navigation";
import { gsap, MOTION_OK, ScrollTrigger, SplitText, useGSAP } from "@/lib/gsap";
import { useFontsReady } from "@/lib/useFontsReady";
import { takePendingScroll } from "@/lib/pendingScroll";

/**
 * Declarative scroll reveals for server-rendered markup:
 *   data-split="lines|words|chars"  masked text reveal
 *   data-fade                        rise and fade in (data-delay="0.2")
 *   data-rule                        horizontal rule draws in
 *   data-count="7.5"                 counts up (data-decimals="1")
 *   data-scrub-words                 words brighten as they scroll through the viewport
 */
export default function Reveals() {
  const pathname = usePathname();
  const fontsReady = useFontsReady();

  useGSAP(
    () => {
      if (!fontsReady) return;
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        const once = (trigger: Element, start = "top 86%") => ({ trigger, start, once: true });

        gsap.utils.toArray<HTMLElement>("[data-split]").forEach((el) => {
          const type = el.dataset.split as "lines" | "words" | "chars";
          const split = SplitText.create(el, { type: type === "chars" ? "words,chars" : type, mask: type });
          split.masks.forEach((m) => m.classList.add("split-mask"));
          gsap.from(split[type], {
            yPercent: 115,
            duration: type === "chars" ? 1.2 : 1.25,
            ease: "expo.out",
            stagger: type === "chars" ? 0.022 : type === "words" ? 0.04 : 0.09,
            delay: Number(el.dataset.delay ?? 0),
            scrollTrigger: once(el),
            // Line breaks are frozen while split; hand the text back to layout once revealed.
            onComplete: () => split.revert(),
          });
        });

        // Opacity, not autoAlpha: visibility:hidden would drop not-yet-revealed links
        // from the tab order, while a transparent one can still take focus.
        gsap.utils.toArray<HTMLElement>("[data-fade]").forEach((el) => {
          gsap.from(el, {
            y: 36,
            opacity: 0,
            duration: 1.2,
            ease: "expo.out",
            delay: Number(el.dataset.delay ?? 0),
            scrollTrigger: once(el, "top 90%"),
          });
        });

        gsap.utils.toArray<HTMLElement>("[data-rule]").forEach((el) => {
          gsap.from(el, {
            scaleX: 0,
            transformOrigin: "left center",
            duration: 1.6,
            ease: "expo.inOut",
            scrollTrigger: once(el, "top 94%"),
          });
        });

        gsap.utils.toArray<HTMLElement>("[data-scrub-words]").forEach((el) => {
          const split = SplitText.create(el, { type: "words" });
          gsap.fromTo(
            split.words,
            { opacity: 0.14 },
            {
              opacity: 1,
              ease: "none",
              stagger: 0.1,
              scrollTrigger: { trigger: el, start: "top 80%", end: "bottom 55%", scrub: true },
            },
          );
        });
      });

      // Counters run regardless of motion preference; reduced motion just lands instantly.
      gsap.utils.toArray<HTMLElement>("[data-count]").forEach((el) => {
        const to = Number(el.dataset.count);
        const decimals = Number(el.dataset.decimals ?? 0);
        const value = { v: 0 };
        const render = () => (el.textContent = value.v.toFixed(decimals));
        const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
        if (reduced) return;
        render();
        gsap.to(value, {
          v: to,
          duration: 2,
          ease: "expo.out",
          onUpdate: render,
          scrollTrigger: { trigger: el, start: "top 90%", once: true },
        });
      });

      ScrollTrigger.refresh();

      // Pins add scroll distance after the browser's own jump to a #hash, so
      // re-land on the target once every trigger is measured.
      const id = takePendingScroll();
      const target = id ? document.getElementById(id) : null;
      if (!target) return;
      const land = () =>
        window.scrollTo({ top: target.getBoundingClientRect().top + window.scrollY, behavior: "instant" });
      land();
      // Late refreshes (fonts, images) can still move the target; follow it briefly.
      ScrollTrigger.addEventListener("refresh", land);
      const stop = () => ScrollTrigger.removeEventListener("refresh", land);
      const timer = window.setTimeout(stop, 1500);
      return () => {
        window.clearTimeout(timer);
        stop();
      };
    },
    { dependencies: [pathname, fontsReady], revertOnUpdate: true },
  );

  return null;
}
