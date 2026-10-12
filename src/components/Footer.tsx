"use client";

import { useEffect, useRef } from "react";
import { gsap, MOTION_OK, SplitText, useGSAP } from "@/lib/gsap";
import { useFontsReady } from "@/lib/useFontsReady";
import { PROFILE, SOCIALS } from "@/data/profile";
import { useScrollTo } from "@/components/motion/SmoothScroll";

export default function Footer() {
  const root = useRef<HTMLElement>(null);
  const word = useRef<HTMLDivElement>(null);
  const clock = useRef<HTMLSpanElement>(null);
  const fontsReady = useFontsReady();
  const scrollTo = useScrollTo();

  // Size the wordmark so it spans the full content width at any viewport.
  useEffect(() => {
    const el = word.current;
    if (!el || !fontsReady) return;
    const fit = () => {
      el.style.fontSize = "100px";
      const natural = el.scrollWidth;
      const available = el.parentElement!.clientWidth;
      el.style.fontSize = `${(available / natural) * 100}px`;
    };
    fit();
    const ro = new ResizeObserver(fit);
    ro.observe(el.parentElement!);
    return () => ro.disconnect();
  }, [fontsReady]);

  useEffect(() => {
    const format = new Intl.DateTimeFormat("en-US", {
      timeZone: PROFILE.timeZone,
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
      timeZoneName: "short",
    });
    const tick = () => clock.current && (clock.current.textContent = format.format(new Date()));
    tick();
    const id = window.setInterval(tick, 15_000);
    return () => window.clearInterval(id);
  }, []);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        const split = SplitText.create(word.current!, { type: "chars", mask: "chars" });
        gsap.from(split.chars, {
          yPercent: 100,
          ease: "none",
          stagger: 0.06,
          scrollTrigger: { trigger: root.current, start: "top bottom", end: "bottom bottom", scrub: 0.6 },
        });
      });
    },
    { scope: root },
  );

  return (
    <footer ref={root} className="relative overflow-hidden border-t border-line px-gutter pb-6 pt-14">
      <div className="mono-label grid grid-cols-2 gap-x-6 gap-y-10 text-dim md:grid-cols-4">
        <div>
          <p className="text-faint">Elsewhere</p>
          <ul className="mt-3 space-y-1.5">
            {SOCIALS.map((s) => (
              <li key={s.label}>
                <a href={s.href} target="_blank" rel="noreferrer" className="transition-colors hover:text-paper">
                  {s.label} ↗
                </a>
              </li>
            ))}
            <li>
              <a
                href={PROFILE.resumeUrl}
                target="_blank"
                rel="noreferrer"
                className="transition-colors hover:text-paper"
              >
                Résumé ↗
              </a>
            </li>
          </ul>
        </div>
        <div>
          <p className="text-faint">Local time</p>
          <p className="mt-3 text-paper">
            <span ref={clock}>--:--</span>
          </p>
          <p className="mt-1.5">{PROFILE.location}</p>
        </div>
        <div className="col-span-2 md:col-span-1">
          <p className="text-faint">Colophon</p>
          <p className="mt-3 max-w-[30ch] leading-relaxed">
            Set in Geist &amp; Instrument Serif. Built with Next.js, GSAP, Lenis and three.js.
          </p>
        </div>
        <div className="md:text-right">
          <button
            type="button"
            onClick={() => scrollTo(0)}
            className="inline-flex items-center gap-2 transition-colors hover:text-paper"
          >
            Back to top <span aria-hidden>↑</span>
          </button>
        </div>
      </div>

      <div aria-hidden className="mt-16 select-none md:mt-24">
        <div ref={word} className="display inline-block whitespace-nowrap leading-[0.8] tracking-[-0.055em] text-paper">
          Bhandarkar
        </div>
      </div>

      <div className="mono-label mt-6 flex justify-between gap-4 text-faint">
        <span suppressHydrationWarning>
          © {new Date().getFullYear()} {PROFILE.name}
        </span>
        <span>Loss still going down.</span>
      </div>
    </footer>
  );
}
