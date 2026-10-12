"use client";

import { useEffect, useRef } from "react";
import { PROFILE, SOCIALS } from "@/data/profile";
import { useScrollTo } from "@/components/motion/SmoothScroll";

export default function Footer() {
  const clock = useRef<HTMLSpanElement>(null);
  const scrollTo = useScrollTo();

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

  return (
    <footer className="border-t border-line px-gutter pb-6 pt-14">
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

      <div className="mono-label mt-16 flex justify-between gap-4 text-faint">
        <span suppressHydrationWarning>
          © {new Date().getFullYear()} {PROFILE.name}
        </span>
        <span>Loss still going down.</span>
      </div>
    </footer>
  );
}
