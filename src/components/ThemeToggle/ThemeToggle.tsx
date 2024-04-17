import { DarkModeSwitch } from "react-toggle-dark-mode";
import React from "react";
import { useTheme } from "@/context/ThemeContext";

interface Props extends React.ComponentProps<"div"> {}

const ThemeToggle = ({ children, ...delegated }: Props) => {
  const { theme, toggleTheme } = useTheme();
  return (
    <DarkModeSwitch
      style={{ marginLeft: "2em" }}
      checked={theme === "dark"}
      onChange={toggleTheme}
      size={24}
    />
  );
};

export default ThemeToggle;
