import * as React from "react";
import styles from "./Paragraph.module.css";

interface Props extends React.ComponentProps<"div"> {}

function Paragraph({ children, ...delegated }: Props) {
  return (
    <div className={styles.paragraph} {...delegated}>
      {children}
    </div>
  );
}

export default Paragraph;
