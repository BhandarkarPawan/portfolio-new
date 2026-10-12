const GLYPHS = "!<>-_\\/[]{}=+*^?#01";
const running = new WeakMap<HTMLElement, number>();

/** Decodes `text` into `el` left to right through random glyphs; best on monospace text. */
export function scramble(el: HTMLElement, text: string, duration = 520) {
  cancelAnimationFrame(running.get(el) ?? 0);
  const start = performance.now();
  const frame = (now: number) => {
    const progress = Math.min((now - start) / duration, 1);
    const settled = Math.floor(progress * text.length);
    let out = "";
    for (let i = 0; i < text.length; i++) {
      out += i < settled || text[i] === " " ? text[i] : GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
    }
    el.textContent = out;
    if (progress < 1) running.set(el, requestAnimationFrame(frame));
    else running.delete(el);
  };
  running.set(el, requestAnimationFrame(frame));
}
