"use client";

import { useEffect, useState } from "react";

/** SplitText measures glyphs, so splitting before web fonts land produces wrong line breaks. */
export function useFontsReady() {
  // After the first page, fonts are already loaded: start ready so animations
  // set up in the same commit, in document order. Only effects read this.
  const [ready, setReady] = useState(() => typeof document !== "undefined" && document.fonts.status === "loaded");
  useEffect(() => {
    let alive = true;
    document.fonts.ready.then(() => alive && setReady(true));
    return () => {
      alive = false;
    };
  }, []);
  return ready;
}
