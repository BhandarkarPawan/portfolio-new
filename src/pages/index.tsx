import About from "@/components/About";
import Contact from "@/components/Contact/Contact";
import Designs from "@/components/Designs/Designs";
import Education from "@/components/Education/Education";
import Email from "@/components/Email";
import Footer from "@/components/Footer/Footer";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Projects from "@/components/Projects/Projects";
import Socials from "@/components/Socials";
import Technical from "@/components/Technical/Technical";
import styled from "styled-components";

export default function Home() {
    return (
        <>
            <Socials />
            <Email />
            <Grid>
                <Header />
                <Hero />
                <About />
                <Education />
                <Technical />
                <Projects />
                <Designs />
                <Contact />
                <Footer />
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
        "designs"
        "contact";
`;
