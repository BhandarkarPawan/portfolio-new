"use client";
import Button from "@/components/Button";
import Highlight from "@/components/Highlight";
import Link from "@/components/Link";
import styles from "./Hero.module.css";

const Hero = () => {
  const scrollToContact = () => {
    const contact = document.getElementById("contact");
    contact!.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className={styles.hero}>
      <p className={styles.text}>
        <Highlight>Hi, my name is</Highlight>
      </p>
      <h2 className={styles.name}>Pawan Bhandarkar.</h2>
      <h3 className={styles.subText}>I build for everyone</h3>
      <p className={styles.description}>
        I’m a full-stack engineer specializing in building (and sometimes
        designing) AI-powered software for the web. Currently, I’m currently
        building something amazing at{" "}
        <Link
          href="https://www.convergelab.ai"
          target="_blank"
          rel="noreferrer noopener"
        >
          <Highlight>Converge Lab</Highlight>
        </Link>
      </p>
      <Button className={styles.callToAction} onClick={scrollToContact}>
        Get In Touch
      </Button>
    </div>
  );
};

export default Hero;
