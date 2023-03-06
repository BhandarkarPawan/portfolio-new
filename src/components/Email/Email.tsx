import { QUERIES } from "@/pages/breakpoints";
import styled from "styled-components";

const Email: React.FC = () => {
    return (
        <Wrapper>
            <Link href="mailto:pawan@bhandarkar.me">pawan@bhandarkar.me</Link>
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

    right: 52px;
    bottom: 0;

    color: ${({ theme }) => theme.colors.text.light};
`;

const Link = styled.a`
    color: ${({ theme }) => theme.colors.text.light};
    transform: rotate(-90deg) translateX(50%) translateY(-10%);
    text-decoration: none;
    font-weight: 400;
    letter-spacing: 1px;

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

export default Email;
