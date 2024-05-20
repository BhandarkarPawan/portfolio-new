import fs from "fs/promises";
import path from "path";
import matter from "gray-matter";
import { BlogPost } from "./types";

export async function getBlogPostList() {
  const fileNames = await readDirectory("/content");
  const blogPosts: BlogPost[] = [];

  for (let fileName of fileNames) {
    try {
      const rawContent = await readFile(`/content/${fileName}/content.mdx`);

      const { data: frontmatter } = matter(rawContent);

      blogPosts.push({
        slug: fileName.replace(".mdx", ""),
        title: frontmatter.title,
        publishedOn: frontmatter.publishedOn,
        tags: frontmatter.tags,
        abstract: frontmatter.abstract,
      });
    } catch (e) {
      console.log(e);
    }
  }

  return blogPosts.sort((p1, p2) => (p1.publishedOn < p2.publishedOn ? 1 : -1));
}

export async function loadBlogPost(slug: string) {
  const rawContent = await readFile(`/content/${slug}/content.mdx`);

  const { data: frontmatter, content } = matter(rawContent);

  return { frontmatter, content };
}

function readFile(localPath: string) {
  return fs.readFile(path.join(process.cwd(), localPath), "utf8");
}

function readDirectory(localPath: string) {
  return fs.readdir(path.join(process.cwd(), localPath));
}
