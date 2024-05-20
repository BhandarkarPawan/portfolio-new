import fs from "fs/promises";
import path from "path";
import matter from "gray-matter";
import { BlogPost } from "./types";

export async function getBlogPostList() {
  const contentDir = path.join(process.cwd(), "content");
  const fileNames = await readDirectory(contentDir);
  const blogPosts: BlogPost[] = [];

  for (let fileName of fileNames) {
    try {
      const rawContent = await readFile(
        path.join(contentDir, fileName, "content.mdx")
      );
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
  const contentDir = path.join(process.cwd(), "content");
  const rawContent = await readFile(path.join(contentDir, slug, "content.mdx"));

  const { data: frontmatter, content } = matter(rawContent);

  return { frontmatter, content };
}

function readFile(filePath: string) {
  return fs.readFile(filePath, "utf8");
}

function readDirectory(dirPath: string) {
  return fs.readdir(dirPath);
}
