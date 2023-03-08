import { QUERIES } from "@/pages/breakpoints";
import styled from "styled-components";
import Design from "../Design";
import SectionTitle from "../SectionTitle/SectionTitle";

const DESIGNS = [
    {
        name: "ESN",
        imgSrc: "/images/esn.png",
        url: "https://www.figma.com/file/Y2LTeml0FY0tTxUA2LxpRF/Emergency-Social-Network?t=6lIRluuxx4iJU2Oj-6",
        description:
            "I designed the user interface for the Emergency Social Network project I built for my Foundations of Software Engineering Course at Carnegie Mellon University.",
    },
    {
        name: "Refriendo",
        imgSrc: "/images/refriendo.png",
        url: "https://www.figma.com/file/FpWVddCZKdJz5V7ADe4eb5/Refriendo?node-id=0%3A1",
        description:
            "Refriendo  was a freelancing project I took up for a startup in my home town. I designed the mobile UI using Figma and built the frontend using React and Ionic Capacitor.",
    },
    {
        name: "Portfolio",
        imgSrc: "/images/portfolio.png",
        url: "https://www.figma.com/file/AhZNeemQhvbr9sf25PwA57/Portfolio-NEW?node-id=1%3A2",
        description:
            "Every element of this portfolio was designed and developed from scratch with inspirations taken from multiple other web developers’ portfolios.",
    },
];

const Designs: React.FC = () => {
    return (
        <Wrapper>
            <DesktopTitle label="Figma Designs" side="right" />
            <MobileTitle label="Figma Designs" side="left" />
            <Articles>
                {DESIGNS.map((design, index) => (
                    <Stretched key={index}>
                        <Design
                            imgSrc={design.imgSrc}
                            description={design.description}
                            name={design.name}
                            url={design.url}
                            side={index % 2 === 0 ? "left" : "right"}
                        />
                    </Stretched>
                ))}
            </Articles>
        </Wrapper>
    );
};

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 16px;
    background-color: ${({ theme }) => theme.colors.background.dark};
    padding: 32px;

    ${QUERIES.tabletAndUp} {
        padding: 64px;
    }
`;

const DesktopTitle = styled(SectionTitle)`
    display: none;
    justify-content: flex-end;
    width: 100%;
    margin-bottom: 64px;
    max-width: 968px;

    ${QUERIES.tabletAndUp} {
        margin-bottom: 32px;
    }

    ${QUERIES.desktopAndUp} {
        display: flex;
    }
`;

const Stretched = styled.div`
    margin-left: -32px;
    margin-right: -32px;
    /* width: 100%; */

    ${QUERIES.tabletAndUp} {
        margin: 0px;
    }
`;

const MobileTitle = styled(DesktopTitle)`
    display: flex;

    ${QUERIES.desktopAndUp} {
        display: none;
    }
`;

const Articles = styled.div`
    display: flex;
    flex-wrap: wrap;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 64px;

    ${QUERIES.tabletAndUp} {
        gap: 32px;
    }

    ${QUERIES.desktopAndUp} {
        flex-direction: row;
        gap: 32px;
    }
`;

export default Designs;
