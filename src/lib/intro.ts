// The preloader hands off to the hero through one DOM event. The boot script
// also sets `intro-done` on <html> when the preloader is skipped (repeat visit
// or reduced motion), so late subscribers fire immediately.

const EVENT = "pb:intro-done";

export function finishIntro() {
  document.documentElement.classList.add("intro-done");
  // Dispatch outside the caller's stack: when called from a GSAP callback,
  // tweens created by listeners would otherwise join the caller's gsap.context.
  queueMicrotask(() => window.dispatchEvent(new Event(EVENT)));
}

export function onIntroDone(callback: () => void): () => void {
  if (document.documentElement.classList.contains("intro-done")) {
    callback();
    return () => {};
  }
  window.addEventListener(EVENT, callback, { once: true });
  return () => window.removeEventListener(EVENT, callback);
}
