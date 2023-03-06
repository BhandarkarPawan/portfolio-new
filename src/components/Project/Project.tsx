import { QUERIES } from "@/pages/breakpoints";
import { GoOctoface } from "react-icons/go";
import { IoOpen } from "react-icons/io5";
import styled from "styled-components";

export interface IProps {
    name: string;
    techs: string[];
    description: string;
    github: string;
    website: string;
    imgSrc: string;
    side: "left" | "right";
}

const Project: React.FC<IProps> = ({
    name,
    techs,
    description,
    github,
    website,
    imgSrc,
    side,
    ...delegated
}) => {
    return (
        <Wrapper side={side} {...delegated}>
            <Stretch>
                <Image src={imgSrc} alt={name} />
            </Stretch>
            <Info side={side}>
                <Feature side={side}>Featured Project</Feature>
                <Name side={side}>{name}</Name>
                <Description side={side}>{description}</Description>
                <Techs side={side}>
                    {techs.map((tech) => (
                        <Tech key={tech}>{tech}</Tech>
                    ))}
                </Techs>
                <Links side={side}>
                    <Github onClick={() => window.open(github)} />
                    <Website onClick={() => window.open(website)} />
                </Links>
            </Info>
        </Wrapper>
    );
};

const iconStyle = `
    cursor: pointer;

    ${QUERIES.tabletAndUp} {
        font-size: 24px;
    }
`;

const Links = styled.div<StyledProps>`
    flex-shrink: 0;
    display: flex;
    gap: 32px;
    margin-top: 16px;
    color: ${({ theme }) => theme.colors.text.light};
    margin-left: 32px;

    ${QUERIES.tabletAndUp} {
        margin-left: ${({ side }) => (side === "left" ? "0" : "32px")};
        margin-right: ${({ side }) => (side === "right" ? "0" : "32px")};
        align-self: ${({ side }) =>
            side === "left" ? "flex-end" : "flex-start"};
    }
`;

const Github = styled(GoOctoface)`
    ${iconStyle}

    &:hover {
        color: ${({ theme }) => theme.colors.primary};
    }
`;

const Website = styled(IoOpen)`
    ${iconStyle}

    &:hover {
        color: ${({ theme }) => theme.colors.primary};
    }
`;

interface StyledProps {
    side: "left" | "right";
}

const Wrapper = styled.div<StyledProps>`
    display: flex;
    isolation: isolate;
    justify-content: center;
    flex-direction: column;
    align-items: center;

    ${QUERIES.tabletAndUp} {
        flex-direction: ${({ side }) =>
            side === "left" ? "row" : "row-reverse"};
    }
`;

const Stretch = styled.div`
    margin-left: -32px;
    margin-right: -32px;
    ${QUERIES.tabletAndUp} {
        margin-left: 0;
        margin-right: 0;
    }
`;

const Image = styled.img`
    margin-bottom: 32px;
    max-width: 500px;

    ${QUERIES.tabletAndUp} {
        object-fit: cover;
        z-index: 1;
        display: block;
        border-radius: 8px;
        margin-bottom: 0;
    }
`;

const Info = styled.div<StyledProps>`
    display: flex;
    flex-direction: column;
    z-index: 2;
    width: 500px;

    ${QUERIES.tabletAndUp} {
        align-items: ${({ side }) =>
            side === "left" ? "flex-end" : "flex-start"};
        margin-left: ${({ side }) => (side === "left" ? "-32px" : "0")};
        margin-right: ${({ side }) => (side === "right" ? "-32px" : "0")};
        margin-top: auto;
        margin-bottom: auto;
    }
`;

const Feature = styled.h3<StyledProps>`
    color: ${({ theme }) => theme.colors.primary};
    margin-left: 32px;
    font-size: calc(14 / 16 * 1rem);
    margin-bottom: -4px;

    ${QUERIES.tabletAndUp} {
        margin-left: ${({ side }) => (side === "left" ? "0" : "32px")};
        margin-right: ${({ side }) => (side === "right" ? "0" : "32px")};
    }
`;

const Tech = styled.li`
    font-weight: 400;
    color: ${({ theme }) => theme.colors.primary};
    text-transform: lowercase;
    font-size: calc(14 / 16 * 1rem);
`;

const Name = styled.h4<StyledProps>`
    font-size: calc(28 / 16 * 1rem);
    font-weight: 900;
    margin-bottom: 16px;

    margin-left: 32px;

    ${QUERIES.tabletAndUp} {
        margin-left: ${({ side }) => (side === "left" ? "0" : "32px")};
        margin-right: ${({ side }) => (side === "right" ? "0" : "32px")};
    }
`;

const Description = styled.p<StyledProps>`
    font-weight: 400;
    padding: 32px;
    background-color: ${({ theme }) => theme.colors.background.light};
    border-radius: 8px;
`;

const Techs = styled.ul<StyledProps>`
    margin-top: 16px;
    display: flex;
    gap: 32px;

    margin-left: 32px;

    ${QUERIES.tabletAndUp} {
        margin-left: ${({ side }) => (side === "left" ? "0" : "32px")};
        margin-right: ${({ side }) => (side === "right" ? "0" : "32px")};
        align-self: ${({ side }) =>
            side === "left" ? "flex-end" : "flex-start"};
    }
`;

export default Project;
