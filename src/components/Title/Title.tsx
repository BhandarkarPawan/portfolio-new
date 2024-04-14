import * as React from "react";
import styles from "./Title.module.css";

interface Props extends React.ComponentProps<"h4"> {}

const Title = ({ children }: Props) => {
  return <h4 className={styles.title}>{children}</h4>;
};

export default Title;
