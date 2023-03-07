import { QUERIES } from "@/pages/breakpoints";
import { FiFigma } from "react-icons/fi";
import styled from "styled-components";
import { Title } from "../College/College";
import { HoverIconLink } from "../Socials/Socials";
export interface IProps {
    imgSrc: string;
    description: string;
    name: string;
    url: string;
    side: "left" | "right";
}

const Design: React.FC<IProps> = ({ imgSrc, description, name, url, side }) => {
    return (
        <Wrapper side={side}>
            <Image src={imgSrc} alt={description} />
            <OuterWrapper>
                <NameAndLink>
                    <Title>{name}</Title>
                    <HoverIconLink href={url} target="_blank">
                        <FiFigma />
                    </HoverIconLink>
                </NameAndLink>
                <Description side={side}>
                    <DesignName>{name}</DesignName>
                    {description}
                </Description>
            </OuterWrapper>
        </Wrapper>
    );
};

interface StyledProps {
    side: "left" | "right";
}

const Wrapper = styled.div<StyledProps>`
    isolation: isolate;
    display: flex;
    align-items: center;
    position: relative;

    flex-direction: ${({ side }) => (side === "left" ? "row" : "row-reverse")};

    /* margin-left: -32px;
    margin-right: -32px; */
    ${QUERIES.tabletAndUp} {
    }

    ${QUERIES.desktopAndUp} {
        flex-direction: column;
        width: 300px;
    }
`;

const DesignName = styled(Title)`
    margin-bottom: 16px;

    ${QUERIES.tabletAndUp} {
        display: none;
    }
`;

const NameAndLink = styled.div`
    display: none;
    font-size: calc(24 / 16 * 1rem);
    padding: 0px 32px;
    align-items: center;
    justify-content: space-between;

    ${QUERIES.tabletAndUp} {
        display: flex;
        margin-bottom: 16px;
    }

    ${QUERIES.desktopAndUp} {
        display: none;
    }
`;

const Image = styled.img`
    flex-shrink: 0;
    z-index: 2;
    border-radius: 8px;
    overflow: hidden;
    object-fit: cover;
    line-height: 0;

    width: 100px;
    height: 100px;

    position: absolute;
    right: 32px;
    top: 0px;
    margin-top: -44px;
    border: 2px solid ${({ theme }) => theme.colors.primary};

    ${QUERIES.tabletAndUp} {
        margin-top: 0px;
        width: 250px;
        height: 250px;
        position: static;
        border: none;
    }

    ${QUERIES.desktopAndUp} {
        width: 270px;
        height: 250px;
    }
`;

const OuterWrapper = styled.div`
    margin-bottom: 16px;
`;

const Description = styled.p<StyledProps>`
    z-index: 1;
    background-color: ${({ theme }) => theme.colors.background.light};
    font-weight: 400;
    width: 100%;
    padding: 32px;

    ${QUERIES.tabletAndUp} {
        padding-top: 32px;

        border-top-left-radius: ${({ side }) =>
            side === "right" ? "8px" : "0"};
        border-bottom-left-radius: ${({ side }) =>
            side === "right" ? "8px" : "0"};
        border-top-right-radius: ${({ side }) =>
            side === "left" ? "8px" : "0"};
        border-bottom-right-radius: ${({ side }) =>
            side === "left" ? "8px" : "0"};
    }

    ${QUERIES.desktopAndUp} {
        padding-left: 32px;
        margin-left: 0;
        margin-top: -32px;
        height: 220px;
        padding-top: 48px;
        border-radius: 8px;
    }
`;

export default Design;
