import "../styles/global.css";
import "../styles/reset.css";
import { GoogleAnalytics } from "@next/third-parties/google";
import { ThemeProvider } from "@/context/ThemeContext";
import { Metadata } from "next";

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
  return (
    <html lang="en" suppressHydrationWarning className="bg-neutral-900">
      <GoogleAnalytics gaId="G-CWWXED2451" />
      <body>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}

export default RootLayout;
