import styles from "./Splash.module.css";
import Image from "next/image";
import Cookies from "js-cookie";

export interface IProps {
  logoUrl: string;
  delegated?: any;
}

const Splash: React.FC<React.PropsWithChildren<IProps>> = ({
  logoUrl,
  children,
  ...delegated
}) => {
  return (
    <div className={styles.splash} {...delegated}>
      <Image
        className={styles.logo}
        width={172}
        height={160}
        src={logoUrl}
        alt="Logo"
      />
    </div>
  );
};

export default Splash;
