import clsx from "clsx";
import styles from "./SectionTitle.module.css";
import { ComponentProps } from "react";

interface Props extends ComponentProps<"div"> {
  side: "left" | "right";
  delegated?: any;
}

const SectionTitle = ({ side, children, ...delegated }: Props) => {
  return (
    <div className={clsx(styles.sectionTitle, styles[side])} {...delegated}>
      {children}
      <hr className={styles.line} />
    </div>
  );
};

export default SectionTitle;
