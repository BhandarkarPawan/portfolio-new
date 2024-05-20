import { getBlogPostList } from "@/helpers/file-helpers";
import React from "react";
import BlogCard from "@/components/BlogCard";
import styles from "./blog.module.css";
import ReadableWidthWrapper from "@/components/ReadableWidthWrapper";

const Blog = async () => {
  const blogs = await getBlogPostList();
  return (
    <ReadableWidthWrapper className={styles.blog}>
      {blogs.map((blog) => (
        <BlogCard key={blog.slug} blog={blog} />
      ))}
    </ReadableWidthWrapper>
  );
};

export default Blog;
