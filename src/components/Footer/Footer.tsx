import styles from "./Footer.module.css";
import React from "react";

type props = React.ComponentProps<"footer">;

const Footer = ({ ...delegated }) => {
  return (
    <footer className={styles.footer} {...delegated}>
      Designed and Developed by <strong> Pawan Bhandarkar</strong>
    </footer>
  );
};

export default Footer;
