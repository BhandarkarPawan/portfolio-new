import About from "@/components/About";
import Education from "@/components/Education/Education";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Projects from "@/components/Projects/Projects";
import Socials from "@/components/Socials";
import Technical from "@/components/Technical/Technical";
import Designs from "@/components/Template copy/Designs";
import styled from "styled-components";

export default function Home() {
    return (
        <>
            <Socials />
            <Grid>
                <Header />
                <Hero />
                <About />
                <Education />
                <Technical />
                <Projects />
                <Designs />
            </Grid>
        </>
    );
}

const Grid = styled.div`
    display: grid;
    grid-template-areas:
        "header"
        "banner"
        "hero"
        "about"
        "education"
        "education"
        "technical"
        "projects"
        "designs"; ;
`;
