import type { Metadata } from "next";
import { getPosts } from "@/lib/blog";
import { PostList } from "@/components/sections/Writing";

export const metadata: Metadata = {
  title: "Writing",
  description: "Notes on engineering, tooling and the craft of building software.",
};

export default async function BlogIndex() {
  const posts = await getPosts();
  return (
    <main id="main" className="px-gutter pb-28 pt-[calc(var(--nav-h)+5rem)]">
      <p className="mono-label flex items-center gap-4 text-dim">
        <span className="text-signal">(08)</span> Writing
        <span data-rule aria-hidden className="h-px flex-1 bg-line" />
      </p>
      <h1 data-split="chars" className="display mt-10 text-[clamp(4.5rem,16vw,16rem)] leading-[0.85]">
        Writing<span className="text-signal">.</span>
      </h1>
      <p data-fade className="mt-8 max-w-xl text-xl text-paper/70">
        Occasional notes on engineering, tooling and the craft of building software.
      </p>
      <PostList posts={posts} className="mt-20" />
    </main>
  );
}
