import { QUERIES } from "@/pages/breakpoints";
import { GoOctoface } from "react-icons/go";
import { IoOpen } from "react-icons/io5";
import styled from "styled-components";
import {
    Wrapper as CollegeWrapper,
    Courses,
    Data,
    Degree,
    Image,
    Info,
    School,
    Stretch,
} from "../College/College";
import { HoverIconLink } from "../Socials/Socials";

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
            <StretchedProject>
                <Image src={imgSrc} alt={name} />
            </StretchedProject>
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
                    <HoverIconLink href={github} target="_blank">
                        <Github size={32} />
                    </HoverIconLink>
                    <HoverIconLink href={website} target="_blank">
                        <Website size={32} />
                    </HoverIconLink>
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
    
    ${QUERIES.tabletAndUp} {
        margin-left: 32px;
    }

    ${QUERIES.desktopAndUp} {
        margin-left: ${({ side }) => (side === "left" ? "0" : "32px")};
        margin-right: ${({ side }) => (side === "right" ? "0" : "32px")};
        align-self: ${({ side }) =>
            side === "left" ? "flex-end" : "flex-start"};
    }

    &  > * {
        transition var(--transition);
    }
`;

const StretchedProject = styled(Stretch)`
    display: flex;
    justify-content: center;
`;

const Github = styled(GoOctoface)`
    ${iconStyle}
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

const Wrapper = styled(CollegeWrapper)``;

const Feature = styled(Degree)``;

const Tech = styled.p`
    font-weight: 400;
    color: ${({ theme }) => theme.colors.primary};
    text-transform: lowercase;
    font-size: calc(14 / 16 * 1rem);
`;

const Name = styled(School)``;

const Description = styled(Courses)`
    font-weight: 400;
`;
const Techs = styled(Data)`
    gap: 16px;
    display: flex;
    flex-wrap: wrap;
`;

export default Project;
