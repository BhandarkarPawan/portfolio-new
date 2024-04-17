import Head from "next/head";
import "../styles/global.css";
import "../styles/reset.css";
import { GoogleAnalytics } from "@next/third-parties/google";
import { ThemeProvider } from "@/context/ThemeContext";

function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning className="bg-neutral-900">
      <Head>
        <meta charSet="utf-8" />
        <meta name="title" property="og:title" content="Pawan Bhandarkar" />
        <meta
          name="description"
          property="og:description"
          content="I'm a full-stack engineer specializing in building (and sometimes designing) highly accessible, human-centered applications for the web."
        />
        <meta name="image" property="og:image" content="/images/hero.png" />
        <link rel="canonical" href="https:bhandarkar.me" />
        <meta property="og:url" content="https:bhandarkar.me" />
        <meta property="og:type" content="website" />

        <script
          async
          src="https:www.googletagmanager.com/gtag/js?id=G-CWWXED2451"
        />
      </Head>
      <GoogleAnalytics gaId="G-CWWXED2451" />
      <body>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}

export default RootLayout;
