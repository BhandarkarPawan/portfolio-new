import { Code } from "bright";
import styles from "./CodeBlock.module.css";

interface Props extends React.ComponentProps<"div"> {}

Code.theme = {
  dark: "github-dark",
  light: "github-light",
};

const CodeBlock = ({ ...delegated }: Props) => {
  // @ts-ignore
  return <Code className={styles.codeBlock} {...delegated} lineNumbers />;
};

export default CodeBlock;
