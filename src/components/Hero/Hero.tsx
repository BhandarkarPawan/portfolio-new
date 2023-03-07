import Button from "@/components/Button";
import { QUERIES } from "@/pages/breakpoints";
import styled from "styled-components";
import Highlight from "../Highlight";

const Hero = () => {
    return (
        <Wrapper>
            <Text>
                <Highlight>Hi, my name is</Highlight>
            </Text>
            <Name>Pawan Bhandarkar.</Name>
            <SubText>I build for everyone</SubText>
            <Text>
                I’m a full-stack engineer specialising in building (and
                sometimes designing) highly accessible, human-centered
                applications for the web. Currently, I’m pursuing a Master’s
                degree in Computer Science at{" "}
                <Highlight>Carnegie Mellon University</Highlight>
            </Text>
            <CallToAction>Get In Touch</CallToAction>
        </Wrapper>
    );
};

const Wrapper = styled.div`
    grid-area: hero;
    max-width: min-content;
`;

const Name = styled.h2`
    white-space: nowrap;
    font-size: calc(40 / 16 * 1rem);
    margin-bottom: -16px;

    ${QUERIES.tabletAndUp} {
        font-size: calc(64 / 16 * 1rem);
        margin-bottom: -32px;
    }
`;

const SubText = styled.h3`
    color: ${({ theme }) => theme.colors.text.light};
    font-size: calc(40 / 16 * 1rem);
    margin-bottom: 24px;

    ${QUERIES.tabletAndUp} {
        font-size: calc(64 / 16 * 1rem);
    }
`;

const Text = styled.p`
    color: ${({ theme }) => theme.colors.text.regular};
    font-weight: 400;
`;

const CallToAction = styled(Button)`
    margin-top: 32px;
`;

export default Hero;
