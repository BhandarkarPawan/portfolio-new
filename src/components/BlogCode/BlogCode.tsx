import React from "react";
import styles from "./BlogCode.module.css";

interface BlogCodeProps extends React.HTMLAttributes<HTMLElement> {
  children: React.ReactNode;
}

const BlogCode: React.FC<BlogCodeProps> = ({
  children,
  className,
  ...props
}) => {
  return (
    <code className={`${styles.blogCode} ${className || ""}`} {...props}>
      {children}
    </code>
  );
};

export default BlogCode;
