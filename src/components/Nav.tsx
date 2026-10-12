"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { gsap, MOTION_OK, ScrollTrigger, useGSAP } from "@/lib/gsap";
import { onIntroDone } from "@/lib/intro";
import { scramble } from "@/lib/scramble";
import { setPendingScroll } from "@/lib/pendingScroll";
import { PROFILE, SOCIALS } from "@/data/profile";
import { useLenis, useScrollTo } from "@/components/motion/SmoothScroll";
import Mark from "@/components/Mark";

const LINKS = [
  { id: "now", label: "Now" },
  { id: "xai", label: "xAI" },
  { id: "experience", label: "Experience" },
  { id: "about", label: "About" },
  { id: "work", label: "Work" },
  { id: "writing", label: "Writing" },
] as const;

export default function Nav() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const scrollTo = useScrollTo();
  const lenis = useLenis();
  const [open, setOpen] = useState(false);
  const root = useRef<HTMLDivElement>(null);
  const header = useRef<HTMLElement>(null);
  const bar = useRef<HTMLDivElement>(null);
  const menu = useRef<HTMLDivElement>(null);
  const menuTl = useRef<gsap.core.Timeline | null>(null);

  const go = (id: string) => (e: React.MouseEvent) => {
    setOpen(false);
    if (!isHome) {
      setPendingScroll(id);
      return;
    }
    e.preventDefault();
    // Opening the menu stopped Lenis, and a stopped Lenis ignores scrollTo.
    lenis?.start();
    scrollTo(`#${id}`);
    history.replaceState(null, "", `#${id}`);
  };

  const hidden = useRef(false);
  const menuOpened = useRef(false);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        const items = root.current!.querySelectorAll("[data-nav-item]");
        return onIntroDone(() =>
          gsap.from(items, {
            yPercent: -120,
            autoAlpha: 0,
            duration: 1.1,
            ease: "expo.out",
            stagger: 0.05,
            delay: 0.35,
          }),
        );
      });

      // Hide on scroll down, reveal on scroll up. "max" is re-measured on every
      // refresh, which Reveals triggers after each navigation.
      ScrollTrigger.create({
        start: 0,
        end: "max",
        onUpdate: (self) => {
          const el = header.current!;
          el.dataset.scrolled = String(self.scroll() > 40);
          const hide = self.direction === 1 && self.scroll() > window.innerHeight * 0.7 && !el.dataset.menu;
          if (hide !== hidden.current) {
            hidden.current = hide;
            gsap.to(el, { yPercent: hide ? -110 : 0, duration: 0.7, ease: "expo.out", overwrite: true });
          }
        },
      });
      gsap.fromTo(
        bar.current,
        { scaleX: 0 },
        { scaleX: 1, ease: "none", scrollTrigger: { start: 0, end: "max", scrub: 0.3 } },
      );

      menuTl.current = gsap
        .timeline({ paused: true, defaults: { ease: "expo.inOut" } })
        .set(menu.current, { visibility: "visible" })
        .fromTo(menu.current, { clipPath: "inset(0% 0% 100% 0%)" }, { clipPath: "inset(0% 0% 0% 0%)", duration: 0.9 })
        .from("[data-menu-link]", { yPercent: 110, duration: 0.9, ease: "expo.out", stagger: 0.05 }, "-=0.45")
        .from("[data-menu-meta]", { autoAlpha: 0, y: 12, duration: 0.6, ease: "expo.out" }, "-=0.6");
    },
    { scope: root },
  );

  // A new page starts at the top, so the bar must be shown even if the
  // previous page had scrolled it away.
  useEffect(() => {
    hidden.current = false;
    gsap.to(header.current, { yPercent: 0, duration: 0.5, ease: "expo.out", overwrite: true });
  }, [pathname]);

  useEffect(() => {
    const tl = menuTl.current;
    if (!tl) return;
    header.current!.dataset.menu = open ? "open" : "";
    if (open) {
      menuOpened.current = true;
      lenis?.stop();
      tl.timeScale(1).play();
    } else if (menuOpened.current) {
      // Only undo what opening did; Lenis is also paused during the intro.
      lenis?.start();
      tl.timeScale(1.6).reverse();
    }
  }, [open, lenis]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    // The menu lives outside <header>: the header's transform and backdrop-filter
    // would otherwise become the containing block of the fixed-position menu.
    <div ref={root} className="contents">
      <header
        ref={header}
        className="group/nav fixed inset-x-0 top-0 z-[60] flex h-[var(--nav-h)] items-center justify-between px-gutter transition-[background-color,backdrop-filter] duration-500 data-[scrolled=true]:bg-ink/70 data-[scrolled=true]:backdrop-blur-md"
      >
        <Link
          href="/"
          data-nav-item
          aria-label={`${PROFILE.name}, home`}
          onClick={isHome ? go("top") : undefined}
          className="relative z-10 flex items-center gap-3 text-paper"
        >
          <Mark className="size-7" />
          <span className="mono-label hidden sm:inline">{PROFILE.name}</span>
        </Link>

        <nav aria-label="Primary" className="hidden lg:block">
          <ul className="flex gap-9">
            {LINKS.map(({ id, label }) => (
              <li key={id} data-nav-item>
                <Link
                  href={`/#${id}`}
                  onClick={go(id)}
                  onMouseEnter={(e) => scramble(e.currentTarget, label.toUpperCase())}
                  className="mono-label block text-dim transition-colors hover:text-paper"
                >
                  {label.toUpperCase()}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="relative z-10 flex items-center gap-3">
          <a
            data-nav-item
            href={PROFILE.resumeUrl}
            target="_blank"
            rel="noreferrer"
            className="mono-label hidden items-center gap-2 rounded-full border border-line px-4 py-2.5 text-paper transition-colors duration-300 hover:border-paper hover:bg-paper hover:text-ink md:inline-flex"
          >
            Résumé <span aria-hidden>↗</span>
          </a>
          <button
            data-nav-item
            type="button"
            onClick={() => setOpen((o) => !o)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            className="mono-label rounded-full border border-line px-4 py-2.5 text-paper lg:hidden"
          >
            {open ? "Close" : "Menu"}
          </button>
        </div>

        <div ref={bar} aria-hidden className="absolute inset-x-0 bottom-0 h-px origin-left scale-x-0 bg-signal/60" />
      </header>

      <div
        ref={menu}
        id="mobile-menu"
        className="invisible fixed inset-0 z-[55] flex flex-col justify-between bg-ink px-gutter pb-8 pt-[calc(var(--nav-h)+2rem)] lg:hidden"
        inert={!open}
      >
        <ul className="flex flex-col gap-1">
          {LINKS.map(({ id, label }, i) => (
            <li key={id} className="overflow-hidden pb-[0.1em]">
              <Link
                data-menu-link
                href={`/#${id}`}
                onClick={go(id)}
                className="display flex items-baseline gap-4 text-[clamp(3rem,15vw,6rem)] text-paper"
              >
                <span className="mono-label text-signal">0{i + 1}</span>
                {label}
              </Link>
            </li>
          ))}
        </ul>
        <div data-menu-meta className="mono-label flex flex-wrap gap-x-6 gap-y-3 text-dim">
          <a href={`mailto:${PROFILE.email}`} className="text-paper">
            {PROFILE.email}
          </a>
          <a href={PROFILE.resumeUrl} target="_blank" rel="noreferrer">
            Résumé ↗
          </a>
          {SOCIALS.map((s) => (
            <a key={s.label} href={s.href} target="_blank" rel="noreferrer">
              {s.label} ↗
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
