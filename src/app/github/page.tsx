import { permanentRedirect } from "next/navigation";

const GithubRedirect = () => {
  return permanentRedirect("https://github.com/BhandarkarPawan");
};

export default GithubRedirect;
