import GlobalStyles from "@/styles/globalStyles";
import ResetStyles from "@/styles/resetStyles";
import type { AppProps } from "next/app";
import { Helmet } from "react-helmet";
import { ThemeProvider } from "styled-components";
import DARK_THEME from "theme";

export default function App({ Component, pageProps }: AppProps) {
    return (
        <div className="App">
            <Helmet>
                <meta charSet="utf-8" />
                <title>My Portfolio</title>
                <meta
                    name="description"
                    content="I'm a full-stack engineer specializing in building (and sometimes designing) highly accessible, human-centered applications for the web."
                />
                <meta
                    name="keywords"
                    content="HTML, CSS, JavaScript, Go, React, TypeScript"
                />
                <meta name="image" content="/images/link-preview.png" />
                <meta name="author" content="Pawan Bhandarkar" />
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1"
                />
            </Helmet>
            <ThemeProvider theme={DARK_THEME}>
                {/* Basic OG tags */}
                <ResetStyles />
                <GlobalStyles />
                <Component {...pageProps} />
            </ThemeProvider>
        </div>
    );
}
