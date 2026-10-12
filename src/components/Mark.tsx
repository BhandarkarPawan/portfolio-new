/** Contours converging on a minimum: the site's mark. */
export default function Mark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" aria-hidden className={className}>
      <g fill="none" stroke="currentColor" strokeWidth="1.25" transform="rotate(-24 16 16)">
        <ellipse cx="16" cy="16" rx="14.25" ry="9.25" opacity="0.35" />
        <ellipse cx="17.25" cy="16.5" rx="9" ry="5.75" opacity="0.65" />
        <ellipse cx="18.25" cy="16.9" rx="4.25" ry="2.6" />
      </g>
      <circle cx="18.6" cy="17.4" r="1.7" fill="var(--color-signal)" />
    </svg>
  );
}
