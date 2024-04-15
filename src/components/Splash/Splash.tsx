import { useState } from "react";
import styles from "./Splash.module.css";
import Image from "next/image";

export interface IProps {
  delegated?: any;
}

const Splash: React.FC<React.PropsWithChildren<IProps>> = ({
  children,
  ...delegated
}) => {
  setTimeout(() => {
    setDisplay(false);
  }, 5000);

  const [display, setDisplay] = useState(true);

  return display ? (
    <div className={styles.splash} {...delegated}>
      <Image
        className={styles.logo}
        width={172}
        height={160}
        src="/images/logo.png"
        alt="Logo"
      />
    </div>
  ) : null;
};

interface SplashProps {
  show: boolean;
}

export default Splash;
