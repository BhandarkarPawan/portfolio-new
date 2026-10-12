import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, Instrument_Serif } from "next/font/google";
import { GoogleAnalytics } from "@next/third-parties/google";
import { PROFILE } from "@/data/profile";
import SmoothScroll from "@/components/motion/SmoothScroll";
import Reveals from "@/components/motion/Reveals";
import Cursor from "@/components/motion/Cursor";
import Preloader from "@/components/Preloader";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import "./globals.css";

const geist = Geist({ subsets: ["latin"], variable: "--font-geist", display: "swap" });
const geistMono = Geist_Mono({ subsets: ["latin"], variable: "--font-geist-mono", display: "swap" });
const instrument = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--font-instrument",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://bhandarkar.me"),
  title: { default: PROFILE.name, template: `%s — ${PROFILE.name}` },
  description: PROFILE.description,
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://bhandarkar.me",
    siteName: PROFILE.name,
    title: PROFILE.name,
    description: PROFILE.description,
  },
  twitter: { card: "summary_large_image", creator: "@BhandarkarPawan" },
};

export const viewport: Viewport = {
  themeColor: "#08080a",
  colorScheme: "dark",
};

// Runs before first paint: flags JS and motion support, and skips the
// preloader for repeat visits and reduced-motion users.
const BOOT = `(function(){var d=document.documentElement;d.classList.add('js');var skip=true;try{var rm=matchMedia('(prefers-reduced-motion: reduce)').matches;if(!rm)d.classList.add('motion');skip=rm||!!sessionStorage.getItem('pb-intro')}catch(e){}if(skip)d.classList.add('intro-skip','intro-done');setTimeout(function(){d.classList.add('reveal-all')},6000)})();`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: BOOT }} />
      </head>
      <body className={`${geist.variable} ${geistMono.variable} ${instrument.variable}`}>
        <a
          href="#main"
          className="mono-label fixed left-4 top-4 z-[100] -translate-y-20 rounded-full bg-paper px-4 py-2 text-ink focus:translate-y-0"
        >
          Skip to content
        </a>
        <SmoothScroll>
          <Preloader />
          <Nav />
          {children}
          <Footer />
          <Reveals />
        </SmoothScroll>
        <Cursor />
        <div aria-hidden className="grain" />
      </body>
      <GoogleAnalytics gaId="G-CWWXED2451" />
    </html>
  );
}
