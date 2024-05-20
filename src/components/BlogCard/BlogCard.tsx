import { BlogPost } from "@/helpers/types";
import Link from "next/link";
import * as React from "react";
import styles from "./BlogCard.module.css";
import Title from "../Title";
import { BlogCardTitle } from "../BlogTitle";
import BlogText from "../BlogText";

type Props = {
  blog: BlogPost;
};

function BlogCard({ blog }: Props) {
  return (
    <Link href={`/blog/${blog.slug}`} className={styles.blogCard}>
      <BlogCardTitle>{blog.title}</BlogCardTitle>
      <BlogText>{blog.abstract}</BlogText>
      <p className={styles.readMore}> Read More</p>
    </Link>
  );
}

export default BlogCard;
