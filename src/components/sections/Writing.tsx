import Link from "next/link";
import { formatDate, getPosts } from "@/lib/blog";
import SectionHeader from "@/components/SectionHeader";

export default async function Writing() {
  const posts = await getPosts();
  return (
    <section id="writing" className="px-gutter py-[clamp(5rem,12vh,8.5rem)]">
      <SectionHeader
        index="08"
        label="Writing"
        aside={
          <Link href="/blog" className="transition-colors hover:text-paper">
            All posts →
          </Link>
        }
        title={
          <>
            Notes from the <span className="serif-em text-signal">workbench</span>.
          </>
        }
      />
      <PostList posts={posts} className="mt-16 md:mt-24" />
    </section>
  );
}

export function PostList({
  posts,
  className = "",
}: {
  posts: Awaited<ReturnType<typeof getPosts>>;
  className?: string;
}) {
  return (
    <ul className={`border-t border-line ${className}`}>
      {posts.map((post) => (
        <li key={post.slug} data-fade>
          <Link
            href={`/blog/${post.slug}`}
            data-cursor-label="Read"
            className="group relative grid gap-3 overflow-hidden border-b border-line px-2 py-8 md:grid-cols-12 md:items-baseline md:gap-6 md:px-4 md:py-10"
          >
            <span
              aria-hidden
              className="absolute inset-0 origin-bottom scale-y-0 bg-paper transition-transform duration-700 ease-[var(--ease-expo)] group-hover:scale-y-100"
            />
            <span className="mono-label relative text-dim transition-colors duration-500 group-hover:text-ink/60 md:col-span-2">
              {formatDate(post.publishedOn, "short")}
            </span>
            <span className="relative text-2xl font-medium leading-tight tracking-[-0.03em] transition-colors duration-500 group-hover:text-ink md:col-span-8 md:text-4xl">
              {post.title}
            </span>
            <span aria-hidden className="relative hidden justify-end md:col-span-2 md:flex">
              <span className="inline-block text-3xl text-signal transition-[color,transform] duration-700 ease-[var(--ease-expo)] group-hover:-rotate-45 group-hover:text-ink">
                →
              </span>
            </span>
          </Link>
        </li>
      ))}
    </ul>
  );
}
