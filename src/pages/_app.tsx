import GlobalStyles from "@/styles/globalStyles";
import ResetStyles from "@/styles/resetStyles";
import type { AppProps } from "next/app";
import Head from "next/head";
import { useEffect, useRef, useState } from "react";
import { ThemeProvider } from "styled-components";
import { DARK_THEME, LIGHT_THEME } from "theme";

export default function App({ Component, pageProps }: AppProps) {
    const [lastScrollTop, setLastScrollTop] = useState<number>(0);
    const [scrollDirection, setScrollDirection] = useState<string>();

    const [theme, setTheme] = useState<"light" | "dark">("dark");
    const toggleTheme = () => {
        setTheme(theme === "light" ? "dark" : "light");
    };
    const activeTheme = theme === "light" ? LIGHT_THEME : DARK_THEME;

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

    const [documentMounted, setDocumentMounted] = useState(false);
    // run after document mounted
    useEffect(() => {
        setDocumentMounted(true);
    }, []);

    if (documentMounted) {
        const body = document.querySelector("body");
        if (body) {
            body.style.backgroundColor = activeTheme.colors.background.regular;
            body.style.color = activeTheme.colors.text.regular;
        }
    }

    // return (
    //     <div>
    //         <DarkModeSwitch
    //             style={{ marginBottom: "2rem" }}
    //             checked={theme === "dark"}
    //             onChange={toggleTheme}
    //             size={80}
    //         />
    //     </div>
    // );

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

            <ThemeProvider theme={activeTheme}>
                {/* Basic OG tags */}
                <ResetStyles />
                <GlobalStyles />
                <Component
                    {...pageProps}
                    scrollDirection={scrollDirection}
                    theme={theme}
                    toggleTheme={toggleTheme}
                />
            </ThemeProvider>
        </div>
    );
}
