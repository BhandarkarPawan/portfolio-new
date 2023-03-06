import { QUERIES } from "@/pages/breakpoints";
import styled from "styled-components";

export interface IProps {
    imgSrc: string;
    description: string;
}

const Design: React.FC<IProps> = ({ imgSrc, description }) => {
    return (
        <Wrapper>
            <Image src={imgSrc} alt={description} />
            <Description>{description}</Description>
        </Wrapper>
    );
};

const Wrapper = styled.div`
    isolation: isolate;
    display: flex;
    align-items: center;

    ${QUERIES.tabletAndUp} {
        flex-direction: column;
        width: 300px;
    }
`;

const Image = styled.img`
    flex-shrink: 0;
    z-index: 2;
    border-radius: 8px;
    overflow: hidden;
    object-fit: cover;
    line-height: 0;

    width: 270px;
    height: 250px;

    ${QUERIES.tabletAndUp} {
    }
`;

const Description = styled.p`
    z-index: 1;
    background-color: ${({ theme }) => theme.colors.background.light};
    font-weight: 400;
    border-radius: 8px;
    width: 100%;
    height: 220px;

    padding: 32px;
    padding-top: 48px;
    padding-left: 64px;

    margin-left: -32px;

    ${QUERIES.tabletAndUp} {
        padding-left: 32px;
        margin-left: 0;
        margin-top: -32px;
    }
`;

export default Design;
