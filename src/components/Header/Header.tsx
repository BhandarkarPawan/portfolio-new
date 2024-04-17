import Navigation from "@/components/Navigation";
import { Squash as Hamburger } from "hamburger-react";
import { useState } from "react";
import { SocialIcons } from "@/components/Socials";
import styles from "./Header.module.css";
import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import useDebounce from "@/hooks/use-debounce";

const Header = () => {
  const [showSidebar, setShowSidebar] = useState(false);
  const [showHeader, setShowHeader] = useState(false);
  const [scrollY, setScrollY] = useDebounce(0, 100);
  const [previousScrollY, setPreviousScrollY] = useState(0);
  const toggleSidebar = () => {
    setShowSidebar((prev) => !prev);
  };

  const logoUrl = "/images/logo.png";

  React.useEffect(() => {
    const handleScroll = () => {
      window.addEventListener("scroll", () => {
        setScrollY(window.scrollY);
      });
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  });

  React.useEffect(() => {
    if (scrollY < previousScrollY || scrollY === 0) {
      setShowHeader(true);
    } else {
      setShowHeader(false);
    }
    setPreviousScrollY(scrollY);
  }, [scrollY]);

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
      <div className={clsx(styles.wrapper, showHeader && styles.show)}>
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
