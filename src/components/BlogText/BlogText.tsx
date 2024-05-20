import * as React from "react";
import styles from "./BlogText.module.css";
import clsx from "clsx";

interface Props extends React.ComponentProps<"h1"> {}

const BlogText = ({ children, className, ...delegated }: Props) => {
  return (
    <p className={clsx(styles.blogText, className)} {...delegated}>
      {children}
    </p>
  );
};

export default BlogText;
