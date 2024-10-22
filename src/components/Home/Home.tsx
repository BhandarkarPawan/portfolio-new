import About from "@/components/About";
import Contact from "@/components/Contact";
import Designs from "@/components/Designs";
import Dots from "@/components/Dots";
import Education from "@/components/Education";
import Email from "@/components/Email";
import Experiences from "@/components/Experiences";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import Projects from "@/components/Projects";
import Socials from "@/components/Socials";
import Splash from "@/components/Splash";
import Technical from "@/components/Technical";
import Particles from "@/components/Particles";
import styles from "./Home.module.css";
import { cookies } from "next/headers";

const App = () => {
  const savedTheme = cookies().get("color-theme")?.value ?? "light";

  return (
    <>
      <Socials />
      <Email />
      <div className={styles.grid}>
        <Particles />
        {/* <Dots> */}
        <Hero />
        {/* </Dots> */}
        <About />
        <Experiences />
        <Projects />
        <Technical />
        <Education />
        <Designs />
        <Contact />
      </div>
    </>
  );
};

export default App;
