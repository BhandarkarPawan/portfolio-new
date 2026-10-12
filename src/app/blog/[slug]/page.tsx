import type { Metadata } from "next";
import Link from "next/link";
import { MDXRemote } from "next-mdx-remote/rsc";
import { formatDate, getPost, getPosts } from "@/lib/blog";
import { mdxComponents } from "@/components/blog/mdx";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export async function generateStaticParams() {
  const posts = await getPosts();
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const { meta } = await getPost(slug);
  return {
    title: meta.title,
    description: meta.abstract,
    openGraph: { type: "article", title: meta.title, description: meta.abstract, publishedTime: meta.publishedOn },
  };
}

export default async function BlogPost({ params }: Props) {
  const { slug } = await params;
  const { meta, content } = await getPost(slug);
  const minutes = Math.max(1, Math.round(content.split(/\s+/).length / 230));

  return (
    <main id="main" className="pb-28 pt-[calc(var(--nav-h)+4rem)]">
      <header className="px-gutter">
        <Link href="/blog" className="mono-label text-dim transition-colors hover:text-paper">
          ← All writing
        </Link>
        <p className="mono-label mt-14 text-dim">
          {formatDate(meta.publishedOn)} · {minutes} min read
        </p>
        <h1 data-split="lines" className="display mt-6 max-w-[20ch] text-[clamp(2.5rem,6vw,6.25rem)] leading-[0.95]">
          {meta.title}
        </h1>
        <p data-fade className="mt-8 max-w-2xl text-xl leading-snug text-paper/65">
          {meta.abstract}
        </p>
        <div data-rule aria-hidden className="mt-14 h-px bg-line" />
      </header>
      <article className="prose-pb mx-auto mt-16 max-w-[68ch] px-gutter">
        <MDXRemote source={content} components={mdxComponents} options={{ blockJS: false }} />
      </article>
      <div className="mx-auto mt-24 max-w-[68ch] px-gutter">
        <Link
          href="/blog"
          className="mono-label inline-flex items-center gap-2 rounded-full border border-line px-5 py-3 text-paper transition-colors hover:border-signal hover:text-signal"
        >
          ← More writing
        </Link>
      </div>
    </main>
  );
}
