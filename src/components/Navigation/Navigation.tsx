import Link from "next/link";
import { FaDownload } from "react-icons/fa";
import styles from "./Navigation.module.css";

const Navigation = () => {
  return (
    <>
      <Link className={styles.navLink} href="/#about">
        <p className={styles.navText}>about</p>
        about
      </Link>
      <Link className={styles.navLink} href="/#projects">
        <p className={styles.navText}>projects</p>
        projects
      </Link>
      <Link className={styles.navLink} href="/#designs">
        <p className={styles.navText}>designs</p>
        designs
      </Link>
      <Link className={styles.navLink} href="/#contact">
        <p className={styles.navText}>contact</p>
        contact
      </Link>
      <Link className={styles.navLink} href="/blog">
        <p className={styles.navText}>blog</p>
        blog
      </Link>
      <a className={styles.downloadLink} href="files/resume.pdf" download>
        resume
        <FaDownload />
      </a>
    </>
  );
};

export default Navigation;
