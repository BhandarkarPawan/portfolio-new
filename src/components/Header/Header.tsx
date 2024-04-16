import Navigation from "@/components/Navigation";
import { Squash as Hamburger } from "hamburger-react";
import { useState } from "react";
import { SocialIcons } from "@/components/Socials";
import styles from "./Header.module.css";
import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";

const Header = () => {
  const [showSidebar, setShowSidebar] = useState(false);
  const toggleSidebar = () => {
    setShowSidebar((prev) => !prev);
  };

  const logoUrl = "/images/logo.png";

  return (
    <>
      <div
        className={clsx(styles.overlay, showSidebar && styles.show)}
        onClick={toggleSidebar}
      >
        <aside className={clsx(styles.sidebar, showSidebar && styles.show)}>
          <div className={styles.navigationWrapper}>
            <Navigation />
          </div>
          <div className={styles.iconWrapper}>
            <SocialIcons />
          </div>
        </aside>
      </div>
      <div className={clsx(styles.wrapper)}>
        <Image
          className={styles.logo}
          width={43}
          height={41}
          src={logoUrl}
          alt="Logo"
        />
        <nav className={styles.navbar}>
          <Navigation />
          {/* <DarkModeSwitch
            style={{ marginLeft: "2em" }}
            checked={theme === "dark"}
            onChange={toggleTheme}
            size={24}
          /> */}
        </nav>

        <div className={styles.menuButton}>
          {/* <DarkModeSwitch
            style={{
              marginLeft: "auto",
              alignSelf: "center",
              marginRight: "1em",
            }}
            checked={theme === "dark"}
            onChange={toggleTheme}
            size={32}
          /> */}
          <Hamburger toggled={showSidebar} onToggle={toggleSidebar} />
        </div>
      </div>
      <div className={styles.banner}>
        I&apos;m currently building something awesome at{" "}
        <Link
          className={styles.aLink}
          target="_blank"
          href="https://www.convergelab.ai/"
        >
          Convergelab.ai
        </Link>
      </div>
    </>
  );
};

export default Header;
