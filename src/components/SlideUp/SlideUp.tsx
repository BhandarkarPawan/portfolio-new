import React, { ComponentProps } from "react";
import { useInView } from "react-intersection-observer";
import styles from "./SlideUp.module.css";

interface Props extends ComponentProps<"div"> {
  delay?: number;
}

const SlideUp = ({ children, delay, ...delegated }: Props) => {
  const [ref, inView, entry] = useInView({ threshold: 0 });
  const [visible, setVisible] = React.useState(false);

  React.useEffect(() => {
    if (inView) {
      setVisible(true);
    }
  }, [inView]);

  // TODO: avoid needed extra dom here, pass classnames to children directly
  return (
    <div ref={ref}>
      {visible ? (
        <div className={styles.slideUp} {...delegated} data-delay={delay}>
          {children}
        </div>
      ) : null}
    </div>
  );
};

export default SlideUp;
