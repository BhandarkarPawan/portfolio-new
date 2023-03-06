import { QUERIES } from "@/pages/breakpoints";
import styled from "styled-components";

export interface IProps {
    degree: string;
    school: string;
    courses: string[];
    start: number;
    end: number;
    gpa: string;
    imgSrc: string;
    side: "left" | "right";
}

const College: React.FC<IProps> = ({
    degree,
    school,
    courses,
    start,
    end,
    gpa,
    imgSrc,
    side,
    ...delegated
}) => {
    return (
        <Wrapper side={side} {...delegated}>
            <Image src={imgSrc} alt={school} />
            <Info side={side}>
                <Degree side={side}>{degree}</Degree>
                <School side={side}>{school}</School>
                <Courses side={side}>
                    <Title>Courses</Title>
                    {courses.map((course, i) => (
                        <Course key={i}>{course}</Course>
                    ))}
                </Courses>
                <Data side={side}>
                    <Time>
                        {start} - {end}
                    </Time>
                    <GPA>GPA: {gpa}</GPA>
                </Data>
            </Info>
        </Wrapper>
    );
};

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

const Image = styled.img`
    margin-bottom: 32px;
    max-width: 600px;
    max-height: 500px;

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

const Degree = styled.h3<StyledProps>`
    color: ${({ theme }) => theme.colors.primary};
    font-weight: 400;

    margin-left: 32px;

    ${QUERIES.tabletAndUp} {
        margin-left: ${({ side }) => (side === "left" ? "0" : "32px")};
        margin-right: ${({ side }) => (side === "right" ? "0" : "32px")};
    }
`;

const School = styled.h4<StyledProps>`
    font-size: calc(28 / 16 * 1rem);
    font-weight: 900;
    margin-bottom: 16px;

    margin-left: 32px;

    ${QUERIES.tabletAndUp} {
        margin-left: ${({ side }) => (side === "left" ? "0" : "32px")};
        margin-right: ${({ side }) => (side === "right" ? "0" : "32px")};
    }
`;

const Courses = styled.ul<StyledProps>`
    background-color: ${({ theme }) => theme.colors.background.light};
    padding: 32px;
    border-radius: 8px;
    display: flex;
    flex-direction: column;
    width: 100%;

    ${QUERIES.tabletAndUp} {
        align-items: ${({ side }) =>
            side === "left" ? "flex-end" : "flex-start"};
    }
`;

const Title = styled.h5`
    color: ${({ theme }) => theme.colors.primary};
    margin-bottom: 8px;
    font-size: calc(20 / 16 * 1rem);
`;

const Course = styled.li`
    font-weight: 400;
`;

const Data = styled.div<StyledProps>`
    margin-top: 16px;
    display: flex;
    gap: 64px;
    font-size: calc(20 / 16 * 1rem);

    margin-left: 32px;

    ${QUERIES.tabletAndUp} {
        margin-left: ${({ side }) => (side === "left" ? "0" : "32px")};
        margin-right: ${({ side }) => (side === "right" ? "0" : "32px")};
        align-self: ${({ side }) =>
            side === "left" ? "flex-end" : "flex-start"};
    }
`;

const Time = styled.p`
    font-weight: 400;
`;

const GPA = styled.p`
    color: ${({ theme }) => theme.colors.primary};
`;

export default College;
