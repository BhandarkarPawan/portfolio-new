import * as React from "react";
import styles from "./Caption.module.css";

interface Props extends React.ComponentProps<"p"> {}

function Caption({ children, ...delegated }: Props) {
  return (
    <p className={styles.caption} {...delegated}>
      {children}
    </p>
  );
}

export default Caption;
