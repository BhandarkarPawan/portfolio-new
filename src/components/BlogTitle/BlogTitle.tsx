import * as React from "react";
import styles from "./BlogTitle.module.css";
import clsx from "clsx";
import Title from "@/components/Title";

interface Props extends React.ComponentProps<"h1"> {
  publishedOn: string;
}

const BlogTitle = ({
  children,
  publishedOn,
  className,
  ...delegated
}: Props) => {
  const publishDate = new Date(publishedOn);
  const publishedDateString = publishDate.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <Title className={clsx(styles.blogTitle, className)} as="h1" {...delegated}>
      {children}
      <p className={styles.date}>{publishedDateString}</p>
    </Title>
  );
};

interface BlogCardTitleProps extends React.ComponentProps<"h2"> {}

export const BlogCardTitle = ({
  children,
  className,
  ...delegated
}: BlogCardTitleProps) => {
  return (
    <Title
      className={clsx(styles.blogCardTitle, className)}
      as="h2"
      {...delegated}
    >
      {children}
    </Title>
  );
};

export default BlogTitle;
