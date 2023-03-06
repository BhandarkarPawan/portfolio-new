import styled from "styled-components";

export interface IProps {
    label: string;
    side: "left" | "right";
    delegated?: any;
}

const SectionTitle = ({ label, side, ...delegated }: IProps) => {
    return (
        <Wrapper {...delegated} side={side}>
            {label}
            <Line />
        </Wrapper>
    );
};

interface StyledProps {
    side: "left" | "right";
}

const Wrapper = styled.h2<StyledProps>`
    font-size: calc(24 / 16 * 1rem);
    color: ${({ theme }) => theme.colors.primary};
    display: flex;
    align-items: center;
    gap: 32px;

    flex-direction: ${({ side }) => (side === "left" ? "row" : "row-reverse")};
`;

const Line = styled.div`
    height: 1px;
    flex-grow: 1;
    background-color: ${({ theme }) => theme.colors.primary};
`;

export default SectionTitle;
