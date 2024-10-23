import styles from "./Splash.module.css";
import Image from "next/image";
import { cookies } from "next/headers";

export interface IProps {
  delegated?: any;
}

const Splash: React.FC<React.PropsWithChildren<IProps>> = ({
  children,
  ...delegated
}) => {
  const theme = cookies().get("color-theme")?.value ?? "dark";
  const isDark = theme === "dark";
  const logoUrl = isDark ? "/images/logo.png" : "/images/logo-light.png";

  console.log(logoUrl);
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
