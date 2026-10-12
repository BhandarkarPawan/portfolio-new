"use client";

import { useRef } from "react";
import { gsap, MOTION_OK, ScrollTrigger, useGSAP } from "@/lib/gsap";
import { SKILLS } from "@/data/profile";
import SectionHeader from "@/components/SectionHeader";

export default function Toolkit() {
  const root = useRef<HTMLElement>(null);

  // Each row loops forever; scrolling speeds it up, flips it with scroll
  // direction, and shears the whole block with velocity.
  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        const rows = gsap.utils.toArray<HTMLElement>("[data-marquee]");
        const loops = rows.map((row, i) => {
          const track = row.querySelector("[data-track]")!;
          const loop =
            i % 2 === 0
              ? gsap.fromTo(track, { xPercent: 0 }, { xPercent: -50, duration: 38 + i * 6, ease: "none", repeat: -1 })
              : gsap.fromTo(track, { xPercent: -50 }, { xPercent: 0, duration: 38 + i * 6, ease: "none", repeat: -1 });
          // Start deep into the repeat so playing in reverse never hits time zero.
          loop.totalTime(loop.duration() * 500);
          return loop;
        });
        const skew = gsap.quickTo("[data-skew]", "skewX", { duration: 0.5, ease: "power3" });

        ScrollTrigger.create({
          trigger: root.current,
          start: "top bottom",
          end: "bottom top",
          onUpdate: (self) => {
            const velocity = self.getVelocity();
            const boost = 1 + Math.min(Math.abs(velocity) / 300, 7);
            loops.forEach((loop) =>
              gsap.to(loop, {
                timeScale: self.direction * boost,
                duration: 0.25,
                overwrite: true,
                onComplete: () => {
                  gsap.to(loop, { timeScale: self.direction, duration: 1.4, ease: "power2.out" });
                },
              }),
            );
            skew(gsap.utils.clamp(-9, 9, velocity / -280));
          },
          onLeave: () => skew(0),
          onLeaveBack: () => skew(0),
        });
      });
    },
    { scope: root },
  );

  return (
    <section ref={root} id="toolkit" className="overflow-hidden py-[clamp(5rem,12vh,8rem)]">
      <div className="px-gutter">
        <SectionHeader index="07" label="Toolkit" aside={<span className="hidden sm:inline">Daily drivers</span>} />
      </div>
      <div data-skew className="mt-14 space-y-4 md:mt-20">
        {SKILLS.map((group) => (
          <div key={group.group} data-marquee className="border-y border-line/60 py-3">
            <p className="sr-only">
              {group.group}: {group.items.join(", ")}
            </p>
            <div data-track aria-hidden className="marquee-track">
              {[0, 1].map((copy) => (
                <div key={copy} className="flex shrink-0 items-center">
                  <span className="mono-label px-6 text-signal">{group.group}</span>
                  {group.items.map((item) => (
                    <span key={item} className="flex items-center">
                      <span className="display whitespace-nowrap px-5 text-[clamp(2.25rem,6vw,6rem)] text-paper/90 md:px-8">
                        {item}
                      </span>
                      <span className="text-[clamp(1rem,2vw,1.75rem)] text-faint">✳</span>
                    </span>
                  ))}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
