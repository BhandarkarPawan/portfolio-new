import { permanentRedirect } from "next/navigation";

const LinkedInRedirect = () => {
  return permanentRedirect("/files/resume.pdf");
};

export default LinkedInRedirect;
