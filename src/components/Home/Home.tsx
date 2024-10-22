import About from "@/components/About";
import Contact from "@/components/Contact";
import Designs from "@/components/Designs";
import Education from "@/components/Education";
import Email from "@/components/Email";
import Experiences from "@/components/Experiences";
import Hero from "@/components/Hero";
import Projects from "@/components/Projects";
import Socials from "@/components/Socials";
import Splash from "@/components/Splash";
import Technical from "@/components/Technical";
import Particles from "@/components/Particles";
import styles from "./Home.module.css";
import { cookies } from "next/headers";
import ProjectGrid from "@/components/ProjectGrid";
import PROJECTS from "@/data/projects.json";

const App = () => {
  const savedTheme = cookies().get("color-theme")?.value ?? "light";

  return (
    <>
      <Splash />
      <Socials />
      <Email />
      <div className={styles.grid}>
        <Particles />
        <Hero />
        <About />
        <Experiences />
        <Projects />
        <ProjectGrid projects={PROJECTS.slice(2)} />
        <Designs />
        <Technical />
        <Education />
        <Contact />
      </div>
    </>
  );
};

export default App;
