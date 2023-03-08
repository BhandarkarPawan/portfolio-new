import { QUERIES } from "breakpoints";
import {
    AiFillInstagram,
    AiOutlineCodepen,
    AiOutlineTwitter,
} from "react-icons/ai";
import { FaLinkedinIn } from "react-icons/fa";
import { GoOctoface } from "react-icons/go";
import styled from "styled-components";

const GITHUB_URL = "http://github.com/BhandarkarPawan";
const INSTAGRAM_URL = "https://www.instagram.com/radioactive.poop/";
const TWITTER_URL = "https://twitter.com/BhandarkarPawan";
const LINKEDIN_URL = "https://www.linkedin.com/in/bhandarkar";
const CODEPEN_URL = "https://codepen.io/bhandarkarpawan";

const Socials: React.FC = () => {
    return (
        <Wrapper>
            <HoverIconLink href={GITHUB_URL} target="_blank">
                <GoOctoface />
            </HoverIconLink>
            <HoverIconLink href={INSTAGRAM_URL} target="_blank">
                <AiFillInstagram />
            </HoverIconLink>
            <HoverIconLink href={TWITTER_URL} target="_blank">
                <AiOutlineTwitter />
            </HoverIconLink>
            <HoverIconLink href={LINKEDIN_URL} target="_blank">
                <FaLinkedinIn />
            </HoverIconLink>
            <HoverIconLink href={CODEPEN_URL} target="_blank">
                <AiOutlineCodepen />
            </HoverIconLink>
            <Line />
        </Wrapper>
    );
};

const Wrapper = styled.div`
    position: fixed;
    display: none;
    align-items: center;
    flex-direction: column;
    gap: 16px;
    font-size: 24px;

    bottom: 0;
    color: ${({ theme }) => theme.colors.text.light};
    cursor: pointer;

    ${QUERIES.tabletAndUp} {
        display: flex;
        left: 16px;
    }

    ${QUERIES.desktopAndUp} {
        left: 32px;
    }
`;

export const HoverIconLink = styled.a`
    text-decoration: none;
    color: ${({ theme }) => theme.colors.text.light};
    cursor: pointer;

    & > * {
        transition: var(--transition);
    }

    &:hover > * {
        transform: scale(1.2) translateY(-4px);
        color: ${({ theme }) => theme.colors.primary};
    }
`;

const Line = styled.div`
    display: none;

    ${QUERIES.tabletAndUp} {
        display: block;
        border: 1px solid ${({ theme }) => theme.colors.text.light};
        height: 100px;
        width: 0px;
    }
`;

export default Socials;
