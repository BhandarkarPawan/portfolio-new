import GlobalStyles from "@/styles/globalStyles";
import ResetStyles from "@/styles/resetStyles";
import type { AppProps } from "next/app";
import Head from "next/head";
import { ThemeProvider } from "styled-components";
import DARK_THEME from "theme";

export default function App({ Component, pageProps }: AppProps) {
    return (
        <div className="App">
            <Head>
                <meta charSet="utf-8" />
                <meta name="title" property="og:title" content="Portfolio" />
                <meta
                    name="description"
                    property="og:description"
                    content="I'm a full-stack engineer specializing in building (and sometimes designing) highly accessible, human-centered applications for the web."
                />
                <meta
                    name="image"
                    property="og:image"
                    content="/images/link-preview.png"
                />
                <link rel="canonical" href="https://bhandarkar.me" />
                <meta property="og:url" content="https://bhandarkar.me" />
                <meta property="og:type" content="website" />
            </Head>

            <ThemeProvider theme={DARK_THEME}>
                {/* Basic OG tags */}
                <ResetStyles />
                <GlobalStyles />
                <Component {...pageProps} />
            </ThemeProvider>
        </div>
    );
}
