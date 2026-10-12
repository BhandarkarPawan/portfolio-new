"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, SplitText, useGSAP);
  // Mobile address bars resize the viewport on scroll; refreshing on that thrashes pinned sections.
  ScrollTrigger.config({ ignoreMobileResize: true });
}

export const EASE_OUT = "expo.out";
export const EASE_IN_OUT = "expo.inOut";

/** Media query for every decorative animation; reduced-motion users get final states. */
export const MOTION_OK = "(prefers-reduced-motion: no-preference)";

export { gsap, ScrollTrigger, SplitText, useGSAP };
