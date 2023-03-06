import { QUERIES } from "@/pages/breakpoints";
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
            <Github onClick={() => window.open(GITHUB_URL, "_blank")} />
            <Instagram onClick={() => window.open(INSTAGRAM_URL, "_blank")} />
            <Twitter onClick={() => window.open(TWITTER_URL, "_blank")} />
            <Linkedin onClick={() => window.open(LINKEDIN_URL, "_blank")} />
            <Codepen onClick={() => window.open(CODEPEN_URL, "_blank")} />
            <Line />
        </Wrapper>
    );
};

const Wrapper = styled.div`
    position: fixed;
    display: flex;
    align-items: center;
    flex-direction: column;
    gap: 16px;

    left: 52px;
    bottom: 0;

    color: ${({ theme }) => theme.colors.text.light};
`;

const iconStyle = `
    display: none;
    cursor: pointer;

    ${QUERIES.tabletAndUp} {
        display: block;
        font-size: 24px;
    }
`;

const Github = styled(GoOctoface)`
    ${iconStyle}

    &:hover {
        color: ${({ theme }) => theme.colors.primary};
    }
`;

const Instagram = styled(AiFillInstagram)`
    ${iconStyle}

    &:hover {
        color: ${({ theme }) => theme.colors.primary};
    }
`;

const Twitter = styled(AiOutlineTwitter)`
    ${iconStyle}

    &:hover {
        color: ${({ theme }) => theme.colors.primary};
    }
`;

const Linkedin = styled(FaLinkedinIn)`
    ${iconStyle}

    &:hover {
        color: ${({ theme }) => theme.colors.primary};
    }
`;

const Codepen = styled(AiOutlineCodepen)`
    ${iconStyle}

    &:hover {
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
