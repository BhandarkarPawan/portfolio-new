import { permanentRedirect } from "next/navigation";

const LinkedInRedirect = () => {
  return permanentRedirect("/files/Resume.pdf");
};

export default LinkedInRedirect;
