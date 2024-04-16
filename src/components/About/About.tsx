import Button from "@/components/Button";
import Highlight from "@/components/Highlight/Highlight";
import SectionTitle from "@/components/SectionTitle/SectionTitle";
import { MIN_WIDTH } from "breakpoints";
import SlideUp from "@/components/SlideUp";
import styles from "./About.module.css";

interface Props {
  delegated?: any;
}

const About = ({ ...delegated }: Props) => {
  const downloadResume = () => {
    window.open("/files/resume.pdf", "_blank");
  };

  const aboutUrl = "images/pawan-2.png";
  const aboutUrlSmall = "images/pawan-small.png";

  return (
    <div className={styles.about} {...delegated} id="about">
      <div className={styles.aboutme}>
        <SlideUp>
          <SectionTitle side={"left"}>About Me</SectionTitle>
        </SlideUp>
        <SlideUp>
          <p className={styles.description}>
            Hi there! My name is Pawan, and I’m passionate about building
            full-stack web applications that are not only{" "}
            <Highlight>functional</Highlight> but also{" "}
            <Highlight>intuitive</Highlight> and{" "}
            <Highlight>visually stunning</Highlight>.
          </p>
        </SlideUp>
        <SlideUp>
          <p className={styles.description}>
            I have 2+ years of experience working as a Full-Stack developer and
            recently, I’ve been diving deeper into Cloud Technology through my
            course work at Carnegie Mellon University. My goal is to not only
            write code that is <Highlight>clean, modular</Highlight>, and{" "}
            <Highlight>well-tested</Highlight> but to build products that are{" "}
            <Highlight>usable</Highlight>, <Highlight>performant</Highlight> and
            can <Highlight>scale</Highlight> to meet the needs of your dynamic
            business.
          </p>
        </SlideUp>
        <SlideUp>
          <p className={styles.description}>
            I’m always looking for new challenges and opportunities to learn and
            grow as a software engineer, and I’m excited to see what the future
            holds.
          </p>
        </SlideUp>
        <SlideUp>
          <Button className={styles.download} onClick={downloadResume}>
            Download Resume
          </Button>
        </SlideUp>
      </div>
      <picture className={styles.picture}>
        <source media={MIN_WIDTH.desktop} srcSet={aboutUrl} />
        <source media={MIN_WIDTH.tablet} srcSet="images/pawan-small.png" />
        <img src={aboutUrl} alt="Pawan Bhandarkar" />
      </picture>
    </div>
  );
};

export default About;
