"use client";
import styles from "./Splash.module.css";
import Image from "next/image";

export interface IProps {
  delegated?: any;
}

const Splash: React.FC<React.PropsWithChildren<IProps>> = ({
  children,
  ...delegated
}) => {
  return (
    <div className={styles.splash} {...delegated}>
      <Image
        className={styles.logo}
        width={172}
        height={160}
        src="/images/logo.png"
        alt="Logo"
      />
    </div>
  );
};

export default Splash;
