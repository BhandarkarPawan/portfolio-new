import { Code } from "bright";

interface Props extends React.ComponentProps<"div"> {}

const CodeBlock = ({ ...delegated }: Props) => {
  // @ts-ignore
  return <Code {...delegated} lang="py" />;
};

export default CodeBlock;
