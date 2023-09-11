import About from "@/components/About";
import Contact from "@/components/Contact";
import Designs from "@/components/Designs";
import Education from "@/components/Education";
import Email from "@/components/Email";
import Experiences from "@/components/Experiences";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Projects from "@/components/Projects";
import Socials from "@/components/Socials";
import Splash from "@/components/Splash";
import Technical from "@/components/Technical";
import styled from "styled-components";

export default function Home({
    scrollDirection,
    theme,
    toggleTheme,
}: {
    scrollDirection: "up" | "down" | undefined;
    theme: "light" | "dark";
    toggleTheme: () => void;
}) {
    return (
        <>
            <Splash />
            <Socials />
            <Email />
            <Grid>
                <Header
                    theme={theme}
                    scrollDirection={scrollDirection}
                    toggleTheme={toggleTheme}
                />
                <Hero theme={theme} />
                <About theme={theme} />
                <Experiences />
                <Projects />
                <Technical />
                <Education />
                <Designs />
                <Contact />
                <Footer />
            </Grid>
        </>
    );
}

const Grid = styled.div`
    display: flex;
    flex-direction: column;
`;
