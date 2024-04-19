// @ts-nocheck
import { MDXRemote } from "next-mdx-remote/rsc";
import styles from "./slug.module.css";
import React from "react";
import { loadBlogPost } from "@/helpers/file-helpers";
import CodeBlock from "@/components/CodeBlock";

const getBlogData = React.cache(async (slug: string) => {
  return await loadBlogPost(slug);
});

type Props = {
  params: {
    slug: string;
  };
};

async function BlogPost({ params }: Props) {
  const { frontmatter, content } = await getBlogData(params.slug);

  return (
    <article className={styles.wrapper}>
      <div className={styles.page}>
        <MDXRemote
          source={content}
          components={{
            pre: CodeBlock,
          }}
        />
      </div>
    </article>
  );
}

export default BlogPost;
