// @ts-nocheck
import { MDXRemote } from "next-mdx-remote/rsc";
import React from "react";
import { loadBlogPost } from "@/helpers/file-helpers";
import CodeBlock from "@/components/CodeBlock";
import { ImageWithAttribution, ImageWithCaption } from "@/components/BlogImage";
import ReadableWithWrapper from "@/components/ReadableWidthWrapper";
import Title from "@/components/Title";
import Paragraph from "@/components/Paragraph";
import BlogTitle from "@/components/BlogTitle";
import BlogText from "@/components/BlogText";
import SideBySideCode from "@/components/SideBySideCode";
import Caption from "@/components/Caption";
import BlogList from "@/components/BlogList";
import BlogCode from "@/components/BlogCode";
import styles from "./blogPost.module.css";
import Link from "@/components/Link";

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
    <ReadableWithWrapper>
      <article className={styles.blogPost}>
        <MDXRemote
          source={content}
          components={{
            Caption,
            pre: CodeBlock,
            SideBySideCode,
            ImageWithAttribution,
            ImageWithCaption,
            h1: (props) => (
              <BlogTitle publishedOn={frontmatter.publishedOn} {...props} />
            ),
            h2: (props) => <Title as="h2" {...props} />,
            h3: (props) => <Title as="h3" {...props} />,
            h4: (props) => <Title as="h4" {...props} />,
            h5: (props) => <Title as="h5" {...props} />,
            h6: (props) => <Title as="h6" {...props} />,
            Paragraph,
            p: BlogText,
            ul: BlogList,
            code: BlogCode,
            a: Link,
          }}
        />
      </article>
    </ReadableWithWrapper>
  );
}

export default BlogPost;
