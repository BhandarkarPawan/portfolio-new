import About from "@/components/About";
import Contact from "@/components/Contact";
import Designs from "@/components/Designs";
import Dots from "@/components/Dots";
import Education from "@/components/Education";
import Email from "@/components/Email";
import Experiences from "@/components/Experiences";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Projects from "@/components/Projects";
import Socials from "@/components/Socials";
import Splash from "@/components/Splash";
import Technical from "@/components/Technical";
import styles from "./Home.module.css";

const App = () => {
  return (
    <>
      <Socials />
      <Email />
      <div className={styles.grid}>
        <Header />
        <Dots>
          <Hero />
        </Dots>
        <About />
        <Experiences />
        <Projects />
        <Technical />
        <Education />
        <Designs />
        <Contact />
        <Footer />
      </div>
      <Splash />
    </>
  );
};

export default App;
