import Link from "next/link";

export default function NotFound() {
  return (
    <main id="main" className="flex min-h-[100svh] flex-col justify-end px-gutter pb-16 pt-32">
      <p className="mono-label text-coral">Training diverged · step 404</p>
      <h1 className="display mt-6 text-[clamp(5rem,22vw,22rem)]">
        loss: <span className="serif-em text-signal">NaN</span>
      </h1>
      <div className="mt-10 flex flex-wrap items-center justify-between gap-6">
        <p className="max-w-md text-xl text-paper/70">
          This page doesn&rsquo;t exist. Restoring from the last good checkpoint is one click away.
        </p>
        <Link
          href="/"
          className="mono-label rounded-full bg-paper px-6 py-4 text-ink transition-colors hover:bg-signal"
        >
          Restore checkpoint ←
        </Link>
      </div>
    </main>
  );
}
