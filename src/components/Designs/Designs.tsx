import { QUERIES } from "@/pages/breakpoints";
import styled from "styled-components";
import Design from "../Design";
import SectionTitle from "../SectionTitle/SectionTitle";

const DESIGNS = [
    {
        imgSrc: "/images/esn.png",
        description:
            "I designed the user interface for the Emergency Social Network project I built for my Foundations of Software Engineering Course at Carnegie Mellon University.",
    },
    {
        imgSrc: "/images/refriendo.png",
        description:
            "Refriendo  was a freelancing project I took up for a startup in my home town. I designed the mobile UI using Figma and built the frontend using React and Ionic Capacitor.",
    },
    {
        imgSrc: "/images/portfolio.png",
        description:
            "Every element of this portfolio was designed and developed from scratch with inspirations taken from multiple other web developers’ portfolios.",
    },
];

const Designs: React.FC = () => {
    return (
        <Wrapper>
            <TitleWrapper label="Figma Designs" side="right" />
            <Articles>
                {DESIGNS.map((design, index) => (
                    <Design
                        key={index}
                        imgSrc={design.imgSrc}
                        description={design.description}
                    />
                ))}
            </Articles>
        </Wrapper>
    );
};

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    gap: 16px;
    max-width: 968px;

    margin: 32px;
    place-self: center;
    place-items: center;
`;

const TitleWrapper = styled(SectionTitle)`
    display: flex;
    justify-content: flex-end;
    width: 100%;
    margin-bottom: 32px;
`;

const Articles = styled.div`
    display: flex;
    flex-wrap: wrap;
    flex-direction: column;
    width: 100%;
    gap: 32px;

    ${QUERIES.tabletAndUp} {
        flex-direction: row;
        justify-content: space-between;
    }
`;

export default Designs;
