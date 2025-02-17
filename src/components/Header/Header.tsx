"use client";
import Navigation from "@/components/Navigation";
import { Squash as Hamburger } from "hamburger-react";
import { SocialIcons } from "@/components/Socials";
import styles from "./Header.module.css";
import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import useDebounce from "@/hooks/use-debounce";
import ThemeToggle from "@/components/ThemeToggle";
import { useTheme } from "@/context/ThemeContext";

const Header = ({ initialTheme }: { initialTheme: string }) => {
  const [showSidebar, setShowSidebar] = React.useState(false);
  const [showHeader, setShowHeader] = React.useState(false);
  const [previousScrollY, setPreviousScrollY] = React.useState(0);
  const [scrollY, setScrollY] = useDebounce(0, 100);
  const { logoUrl } = useTheme();

  const toggleSidebar = () => {
    setShowSidebar((prev) => !prev);
  };

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
    const headerHeight = 64;
    if (scrollY < previousScrollY || scrollY < headerHeight) {
      setShowHeader(true);
    } else if (scrollY > previousScrollY) {
      setShowHeader(false);
    }
    setPreviousScrollY(scrollY);
  }, [scrollY, previousScrollY]);

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
        <Link href="/">
          <Image
            className={styles.logo}
            width={43}
            height={41}
            src={logoUrl}
            alt="Logo"
          />
        </Link>
        <nav className={styles.navbar}>
          <Navigation />
          <ThemeToggle initialTheme={initialTheme} />
        </nav>

        <div className={styles.menuButton}>
          <ThemeToggle initialTheme={initialTheme} />
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
      {/* <div className={styles.banner}>
        I&apos;m currently building something awesome at{" "}
        <Link
          className={styles.aLink}
          target="_blank"
          href="https://www.convergelab.ai/"
        >
          Convergelab.ai
        </Link>
      </div> */}
    </>
  );
};

export default Header;
