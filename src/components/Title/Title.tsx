import * as React from "react";
import styles from "./Title.module.css";
import clsx from "clsx";

type HeadingLevel = "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
interface Props extends React.ComponentProps<"h1"> {
  as?: HeadingLevel;
}

const Title = ({
  children,
  className,
  as: Component = "h1",
  ...delegated
}: Props) => {
  const fontSizeClass = styles[Component];

  return (
    <Component className={clsx(styles.title, fontSizeClass, className)}>
      {children}
    </Component>
  );
};

export default Title;
