import * as React from "react";
import styles from "./ReadableWidthWrapper.module.css";
import clsx from "clsx";

interface Props extends React.ComponentProps<"div"> {}

function ReadableWithWrapper({ children, className, ...delegated }: Props) {
  return (
    <div
      {...delegated}
      className={clsx(styles.readableWidthWrapper, className)}
    >
      {children}
    </div>
  );
}

export default ReadableWithWrapper;
