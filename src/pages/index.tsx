import About from "@/components/About";
import Education from "@/components/Education/Education";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Socials from "@/components/Socials";
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
        "education";
`;
