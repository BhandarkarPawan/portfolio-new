import GlobalStyles from "@/styles/globalStyles";
import ResetStyles from "@/styles/resetStyles";
import type { AppProps } from "next/app";
import { ThemeProvider } from "styled-components";
import DARK_THEME from "theme";

export default function App({ Component, pageProps }: AppProps) {
    return (
        <ThemeProvider theme={DARK_THEME}>
            <ResetStyles />
            <GlobalStyles />
            <Component {...pageProps} />
        </ThemeProvider>
    );
}
