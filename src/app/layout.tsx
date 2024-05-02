import "../styles/global.css";
import "../styles/reset.css";
import { GoogleAnalytics } from "@next/third-parties/google";
import { ThemeProvider } from "@/context/ThemeContext";
import { Metadata } from "next";
import { cookies } from "next/headers";
import { DARK_COLORS, LIGHT_COLORS } from "@/theme";

export const metadata: Metadata = {
  title: "Pawan Bhandarkar",
  description:
    "I'm a full-stack engineer specializing in building (and sometimes designing) highly accessible, human-centered applications for the web.",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https:bhandarkar.me",
    title: "Pawan Bhandarkar",
    images: ["https://bhandarkar.me/images/hero.png"],
  },
};

function RootLayout({ children }: { children: React.ReactNode }) {
  const theme = cookies().get("color-theme")?.value ?? "light";
  const themeColors = theme === "light" ? LIGHT_COLORS : DARK_COLORS;

  return (
    <html
      lang="en"
      suppressHydrationWarning
      className="bg-neutral-900"
      data-color-theme={theme}
      //@ts-ignore
      style={themeColors}
    >
      <GoogleAnalytics gaId="G-CWWXED2451" />
      <body>
        <ThemeProvider initialTheme={theme}>{children}</ThemeProvider>
      </body>
    </html>
  );
}

export default RootLayout;
