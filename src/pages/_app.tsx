import GlobalStyles from "@/styles/globalStyles";
import ResetStyles from "@/styles/resetStyles";
import type { AppProps } from "next/app";
import Head from "next/head";
import { useRef, useState } from "react";
import { ThemeProvider } from "styled-components";
import DARK_THEME from "theme";

export default function App({ Component, pageProps }: AppProps) {
    const [lastScrollTop, setLastScrollTop] = useState<number>(0);
    const [scrollDirection, setScrollDirection] = useState<string>();

    const ref = useRef<HTMLDivElement>(null);
    const handleScroll = () => {
        const scrollTop = ref.current?.scrollTop || 0;
        // only update if the scroll is more than 5px
        if (Math.abs(scrollTop - lastScrollTop) < 100) {
            return;
        }

        console.log(scrollTop, lastScrollTop);
        if (scrollTop > lastScrollTop) {
            setScrollDirection("down");
        } else {
            setScrollDirection("up");
        }
        setLastScrollTop(scrollTop <= 0 ? 0 : scrollTop);
    };

    return (
        <div className="App" onScroll={handleScroll} ref={ref}>
            <Head>
                <meta charSet="utf-8" />
                <meta
                    name="title"
                    property="og:title"
                    content="Pawan Bhandarkar"
                />
                <meta
                    name="description"
                    property="og:description"
                    content="I'm a full-stack engineer specializing in building (and sometimes designing) highly accessible, human-centered applications for the web."
                />
                <meta
                    name="image"
                    property="og:image"
                    content="/images/hero.png"
                />
                <link rel="canonical" href="https://bhandarkar.me" />
                <meta property="og:url" content="https://bhandarkar.me" />
                <meta property="og:type" content="website" />

                <script
                    async
                    src="https://www.googletagmanager.com/gtag/js?id=G-CWWXED2451"
                />
                <script id="google-analytics">
                    {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', 'G-CWWXED2451');
                `}
                </script>
            </Head>

            <ThemeProvider theme={DARK_THEME}>
                {/* Basic OG tags */}
                <ResetStyles />
                <GlobalStyles />
                <Component {...pageProps} scrollDirection={scrollDirection} />
            </ThemeProvider>
        </div>
    );
}
