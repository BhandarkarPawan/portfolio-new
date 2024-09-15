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
      {React.Children.map(children, (child, index) => {
        if (React.isValidElement(child) && child.type === "li") {
          return React.cloneElement(child, {
            className: `${styles.blogListItem} ${child.props.className || ""}`,
            key: child.key || index,
          });
        }
        return child;
      })}
    </ul>
  );
});

BlogList.displayName = "BlogList";

export default BlogList;
