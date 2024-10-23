"use client";
import Button from "@/components/Button";
import Highlight from "@/components/Highlight/Highlight";
import SectionTitle from "@/components/SectionTitle/SectionTitle";
import { MIN_WIDTH } from "breakpoints";
import styles from "./About.module.css";
import { useTheme } from "@/context/ThemeContext";

interface Props {
  delegated?: any;
}

const About = ({ ...delegated }: Props) => {
  const downloadResume = () => {
    window.open("/files/Resume.pdf", "_blank");
  };

  const { aboutUrl, aboutUrlSmall } = useTheme();

  return (
    <div className={styles.about} {...delegated} id="about">
      <div className={styles.aboutme}>
        <SectionTitle side={"left"}>About Me</SectionTitle>
        <p className={styles.description}>
          I’m passionate about building products that people want. I
          particularly enjoy delivering <Highlight>value</Highlight> through{" "}
          <Highlight>intuitive</Highlight> and{" "}
          <Highlight>visually stunning</Highlight> products that solve real
          problems.
        </p>
        <p className={styles.description}>
          I generally prioritize getting products into the hands of my customers
          quickly and iterating based on feedback, rather than sweating the
          little things and trying to always be perfect
        </p>
        <p className={styles.description}>
          I’m always looking for new challenges and opportunities to learn and
          grow as a software engineer, and I’m excited to see what the future
          holds.
        </p>
        <Button className={styles.download} onClick={downloadResume}>
          Download Resume
        </Button>
      </div>
      <picture className={styles.picture}>
        <source media={MIN_WIDTH.desktop} srcSet={aboutUrl} />
        <source media={MIN_WIDTH.tablet} srcSet={aboutUrlSmall} />
        <img src={aboutUrl} alt="Pawan Bhandarkar" />
      </picture>
    </div>
  );
};

export default About;
