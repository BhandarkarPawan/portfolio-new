import styles from "./Template.module.css";

interface Props extends React.ComponentProps<"div"> {}

const Template = ({ children, ...delegated }: Props) => {
  return (
    <div className={styles.template} {...delegated}>
      {children}
    </div>
  );
};

export default Template;
