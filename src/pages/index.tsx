import About from "@/components/About";
import Contact from "@/components/Contact";
import Designs from "@/components/Designs";
import Education from "@/components/Education";
import Email from "@/components/Email";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Projects from "@/components/Projects";
import Socials from "@/components/Socials";
import Technical from "@/components/Technical";
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
    display: flex;
    flex-direction: column;
`;
