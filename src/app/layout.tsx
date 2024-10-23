import "../styles/global.css";
import "../styles/reset.css";
import { GoogleAnalytics } from "@next/third-parties/google";
import { ThemeProvider } from "@/context/ThemeContext";
import { Metadata } from "next";
import { cookies } from "next/headers";
import { DARK_COLORS, LIGHT_COLORS } from "@/theme";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Splash from "@/components/Splash";

export const metadata: Metadata = {
  title: "Pawan Bhandarkar",
  description:
    " I’m a full-stack engineer specializing in building (and sometimes designing) AI-powered software for the web",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https:bhandarkar.me",
    title: "Pawan Bhandarkar",
    images: ["https://bhandarkar.me/images/Hero.png"],
  },
};

function RootLayout({ children }: { children: React.ReactNode }) {
  const theme = cookies().get("color-theme")?.value ?? "dark";
  const themeColors = theme === "light" ? LIGHT_COLORS : DARK_COLORS;
  const logoUrl =
    theme === "light" ? "/images/logo-light.png" : "/images/logo.png";
  const showSplash = cookies().get("show-splash")?.value !== "false";

  return (
    <html
      lang="en"
      suppressHydrationWarning
      className="bg-neutral-900"
      data-theme={theme}
      //@ts-ignore
      style={themeColors}
    >
      <GoogleAnalytics gaId="G-CWWXED2451" />
      <body>
        <ThemeProvider initialTheme={theme}>
          <Header initialTheme={theme} />
          {children}
          <Footer />
          {/* <Splash logoUrl={logoUrl} /> */}
        </ThemeProvider>
      </body>
    </html>
  );
}

export default RootLayout;
