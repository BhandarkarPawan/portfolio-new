import clsx from "clsx";
import styles from "./Button.module.css";
import { ComponentProps, useEffect, useState } from "react";
import { motion, useAnimation, spring } from "framer-motion";

interface Props extends ComponentProps<"button"> {}

const Button: React.FC<Props> = ({ children, className, ...delegated }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isPressed, setIsPressed] = useState(false);

  const controls = useAnimation();

  console.log(isPressed, isHovered);

  useEffect(() => {
    if (isPressed) {
      controls.start({
        scale: 1.0,
        x: 0,
        y: 0,
        backgroundColor: "var(--color-primary)",
        color: "var(--color-background-light)",
        boxShadow: "2px 3px 0px 2px var(--color-primary-darker)",
        transition: {
          type: "spring",
          stiffness: 1000,
          damping: 25,
        },
      });
    } else if (isHovered) {
      controls.start({
        scale: 1.05,
        x: -5,
        y: -5,
        backgroundColor: "var(--color-primary)",
        color: "var(--color-background-light)",
        boxShadow: "5px 5px 0px 3px var(--color-primary-dark)",
      });
    } else {
      controls.start({
        scale: 1,
        x: 0,
        y: 0,
        color: "var(--color-primary)",
        backgroundColor: "transparent",
        boxShadow: "2px 3px 0px 2px var(--color-primary-darker)",
      });
    }
  }, [isHovered, isPressed]);

  return (
    <motion.button
      className={clsx(styles.button, className)}
      {...delegated}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      onMouseDown={() => setIsPressed(true)}
      onMouseUp={() => setIsPressed(false)}
      animate={controls}
    >
      {children}
    </motion.button>
  );
};

export default Button;
