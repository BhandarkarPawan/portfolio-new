"use client";

import { useState } from "react";
import { PROFILE } from "@/data/profile";
import SectionHeader from "@/components/SectionHeader";
import Magnetic from "@/components/motion/Magnetic";

export default function Contact() {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(PROFILE.email);
    } catch {
      // Clipboard access can be denied; fall back to the mail client.
      window.location.href = `mailto:${PROFILE.email}`;
      return;
    }
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1800);
  };

  return (
    <section id="contact" className="relative px-gutter pb-[clamp(5rem,12vh,8rem)] pt-[clamp(5rem,12vh,8.5rem)]">
      <SectionHeader index="09" label="Contact" />
      <h2 data-split="chars" className="display mt-10 text-[clamp(4.5rem,17.5vw,20rem)] leading-[0.82]">
        Let&rsquo;s talk<span className="text-signal">.</span>
      </h2>
      <div className="mt-12 grid items-end gap-10 md:mt-16 md:grid-cols-12">
        <p data-fade className="max-w-md text-xl leading-snug text-paper/70 md:col-span-5">
          Say hello about research tooling, interfaces for AI, or whatever you&rsquo;re building.
        </p>
        <div data-fade className="flex flex-wrap items-center gap-4 md:col-span-7 md:justify-end">
          <Magnetic strength={0.25}>
            <button
              type="button"
              onClick={copy}
              data-cursor-label={copied ? "Copied" : "Copy"}
              className="group flex items-center gap-4 rounded-full border border-line py-3 pl-6 pr-3 text-left transition-colors duration-300 hover:border-signal"
            >
              <span className="text-lg tracking-tight md:text-2xl">{PROFILE.email}</span>
              <span
                className={`mono-label rounded-full px-3 py-2 transition-colors ${copied ? "bg-mint text-ink" : "bg-paper/10 text-dim group-hover:bg-signal group-hover:text-ink"}`}
                aria-live="polite"
              >
                {copied ? "Copied" : "Copy"}
              </span>
            </button>
          </Magnetic>
          <Magnetic strength={0.25}>
            <a
              href={`mailto:${PROFILE.email}`}
              className="mono-label inline-flex items-center gap-2 rounded-full bg-paper px-6 py-4 text-ink transition-colors hover:bg-signal"
            >
              Write an email <span aria-hidden>↗</span>
            </a>
          </Magnetic>
        </div>
      </div>
    </section>
  );
}
