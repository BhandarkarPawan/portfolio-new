// Cross-page section links ("/#about" from a blog post) land before the home
// page's pinned sections have added their scroll distance, so the browser's
// hash jump misses. The link records its target; the home page scrolls to it
// once every ScrollTrigger is measured.

let pending: string | null = null;

export function setPendingScroll(id: string) {
  pending = id;
}

/** The section to land on: an in-app link's target, else the URL hash. */
export function takePendingScroll(): string | null {
  const id = pending ?? (location.hash ? decodeURIComponent(location.hash.slice(1)) : null);
  pending = null;
  return id;
}
