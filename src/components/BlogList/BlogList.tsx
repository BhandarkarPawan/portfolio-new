import * as React from "react";
import styles from "./BlogList.module.css";

const BlogList = React.forwardRef<
  HTMLUListElement,
  React.HTMLAttributes<HTMLUListElement>
>(({ children, className, ...props }, ref) => {
  return (
    <ul
      ref={ref}
      className={`${styles.blogList} ${className || ""}`}
      {...props}
    >
      {children}
    </ul>
  );
});

BlogList.displayName = "BlogList";

export default BlogList;
