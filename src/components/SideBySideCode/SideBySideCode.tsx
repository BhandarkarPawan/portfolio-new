import * as React from "react";
import styles from "./SideBySideCode.module.css";
import Caption from "../Caption";

interface Props extends React.ComponentProps<"div"> {
  caption: string;
}

function SideBySideCode({ children, caption, ...delegated }: Props) {
  return (
    <div {...delegated} className={styles.sideBySideCodeWrapper}>
      <div className={styles.sideBySideCode}>{children}</div>
      <Caption>{caption}</Caption>
    </div>
  );
}

export default SideBySideCode;
