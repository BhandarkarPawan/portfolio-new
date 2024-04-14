import styles from "./MaxWidthWrapper.module.css";

interface Props extends React.ComponentProps<"div"> {}

const MaxWidthWrapper = ({ children, ...delegated }: Props) => {
  return (
    <div className={styles.maxWidthWrapper} {...delegated}>
      {children}
    </div>
  );
};

export default MaxWidthWrapper;
