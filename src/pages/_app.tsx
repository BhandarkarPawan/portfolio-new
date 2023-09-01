import GlobalStyles from "@/styles/globalStyles";
import ResetStyles from "@/styles/resetStyles";
import type { AppProps } from "next/app";
import { ThemeProvider } from "styled-components";
import DARK_THEME from "theme";

export default function App({ Component, pageProps }: AppProps) {
    return (
        <ThemeProvider theme={DARK_THEME}>
            {/* Basic OG tags */}
            <meta property="og:title" content="Portfolio" />
            <meta
                property="og:description"
                content="I’m a full-stack engineer specializing in building (and sometimes designing) highly accessible, human-centered applications for the web."
            />
            <meta property="og:image" content="/images/link-preview.png" />
            <meta property="og:url" content="https://bhandarkar.me/" />

            <ResetStyles />
            <GlobalStyles />
            <Component {...pageProps} />
        </ThemeProvider>
    );
}
