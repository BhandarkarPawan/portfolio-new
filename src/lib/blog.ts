import fs from "fs/promises";
import path from "path";
import matter from "gray-matter";
import { cache } from "react";

export type PostMeta = {
  slug: string;
  title: string;
  abstract: string;
  publishedOn: string;
};

const CONTENT_DIR = path.join(process.cwd(), "content");

function toMeta(slug: string, data: Record<string, unknown>): PostMeta {
  const { title, abstract, publishedOn } = data;
  if (typeof title !== "string" || typeof abstract !== "string" || typeof publishedOn !== "string") {
    throw new Error(`content/${slug}/content.mdx is missing title, abstract or publishedOn frontmatter`);
  }
  return { slug, title, abstract, publishedOn };
}

export const getPosts = cache(async (): Promise<PostMeta[]> => {
  const slugs = await fs.readdir(CONTENT_DIR);
  const posts = await Promise.all(
    slugs.map(async (slug) => {
      const raw = await fs.readFile(path.join(CONTENT_DIR, slug, "content.mdx"), "utf8");
      return toMeta(slug, matter(raw).data);
    }),
  );
  return posts.sort((a, b) => (a.publishedOn < b.publishedOn ? 1 : -1));
});

export const getPost = cache(async (slug: string) => {
  const raw = await fs.readFile(path.join(CONTENT_DIR, slug, "content.mdx"), "utf8");
  const { data, content } = matter(raw);
  return { meta: toMeta(slug, data), content };
});

export function formatDate(iso: string, month: "long" | "short" = "long") {
  return new Date(iso).toLocaleDateString("en-US", { year: "numeric", month, day: "numeric", timeZone: "UTC" });
}
