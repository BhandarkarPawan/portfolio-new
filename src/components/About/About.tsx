import Button from "@/components/Button/Button";
import Highlight from "@/components/Highlight/Highlight";
import SectionTitle from "@/components/SectionTitle/SectionTitle";
import { MIN_WIDTH, QUERIES } from "breakpoints";
import styled from "styled-components";
import SlideUp from "../SlideUp";

export interface IProps {
    delegated?: any;
}

const About: React.FC<React.PropsWithChildren<IProps>> = ({
    children,
    ...delegated
}) => {
    const downloadResume = () => {
        window.open("/files/resume.pdf", "_blank");
    };

    return (
        <Wrapper {...delegated} id="about">
            <AboutMe>
                <SlideUp>
                    <SectionTitle label={"About Me "} side={"left"} />
                </SlideUp>
                <SlideUp>
                    <Description>
                        Hi there! My name is Pawan, and I’m passionate about
                        building full-stack web applications that are not only{" "}
                        <Highlight>functional</Highlight> but also{" "}
                        <Highlight>intuitive</Highlight> and{" "}
                        <Highlight>visually stunning</Highlight>.
                    </Description>
                </SlideUp>
                <SlideUp>
                    <Description>
                        I have 2+ years of experience working as a Full-Stack
                        developer and recently, I’ve been diving deeper into UX
                        design through my course work at Carnegie Mellon
                        University. My goal is to not only write code that is{" "}
                        <Highlight>clean, modular</Highlight>, and{" "}
                        <Highlight>well-tested</Highlight> but to build products
                        that are <Highlight>feasible</Highlight>,{" "}
                        <Highlight>usable</Highlight> and{" "}
                        <Highlight>useful</Highlight> to the customer.
                    </Description>
                </SlideUp>
                <SlideUp>
                    <Description>
                        I’m always looking for new challenges and opportunities
                        to learn and grow as a software engineer, and I’m
                        excited to see what the future holds.
                    </Description>
                </SlideUp>
                <SlideUp>
                    <Download onClick={downloadResume}>
                        Download Resume
                    </Download>
                </SlideUp>
            </AboutMe>
            <Picture>
                <Source media={MIN_WIDTH.desktop} srcSet="images/pawan.png" />
                <Source
                    media={MIN_WIDTH.tablet}
                    srcSet="images/pawan-small.png"
                />
                <Image src="images/pawan.png" alt="Pawan Bhandarkar" />
            </Picture>
        </Wrapper>
    );
};

const Wrapper = styled.div`
    display: grid;
    padding: 32px;
    padding-bottom: 0px;
    row-gap: 80px;
    grid-template-areas:
        "aboutme"
        "picture";

    ${QUERIES.tabletAndUp} {
        grid-template-areas: "picture aboutme";
        grid-template-columns: 1fr 1fr;
        column-gap: 0px;
        padding: 64px;
    }

    ${QUERIES.desktopAndUp} {
        column-gap: 80px;
        padding-bottom: 0px;
    }
`;

const AboutMe = styled.div`
    grid-area: aboutme;
    display: flex;
    flex-direction: column;
    gap: 16px;

    ${QUERIES.tabletAndUp} {
        justify-self: start;
        max-width: min(400px, 100%);
    }
`;

const Description = styled.p`
    font-weight: 400;
`;

const Picture = styled.picture`
    grid-area: picture;
    justify-self: center;
    width: 300px;

    ${QUERIES.tabletAndUp} {
        width: min(50vw, 250px);
    }

    ${QUERIES.desktopAndUp} {
        justify-self: end;
        width: min(50vw, 500px);
    }
`;

const Source = styled.source``;

const Image = styled.img``;

const Download = styled(Button)`
    align-self: start;
    margin-top: 32px;
`;

export default About;
