import College from "@/components/College";
import styled from "styled-components";
import SectionTitle from "../SectionTitle/SectionTitle";

const COLLEGES = [
    {
        degree: "Master of Science in Software Engineering",
        school: "Carnegie Mellon University",
        courses: [
            "Foundations of Software Engineering",
            "Data Science for Software Engineering",
            "Software Requirements & Interaction Design",
            "Human-Computer Interaction & User Experience",
            // "Software Engineering Methods",
            // "Software Verification & Testing",
        ],
        start: 2022,
        end: 2023,
        gpa: "4.0",
        imgSrc: "images/cmusv.jpeg",
    },
    {
        degree: "Bachelor of Engineering in Computer Science",
        school: "NMAM Institute of Technology",
        courses: [
            "Data Structures & Algorithms",
            "Object Oriented Modeling & Design",
            "Operating Systems",
            "Computer Networks",
            "Database Systems",
        ],
        start: 2016,
        end: 2020,
        gpa: "4.0",
        imgSrc: "images/nmamit.png",
    },
];

const Education: React.FC = () => {
    return (
        <Wrapper>
            <Title label="Education" side="left" />
            <CMU {...COLLEGES[0]} side="left" />
            <NMAMIT {...COLLEGES[1]} side="right" />
        </Wrapper>
    );
};

const Wrapper = styled.div`
    grid-area: education;

    display: grid;
    grid-template-columns: auto max-content auto;
    row-gap: 64px;

    padding: 64px 32px;
    background-color: ${({ theme }) => theme.colors.background.dark};
`;

const Title = styled(SectionTitle)`
    grid-column: 2 / 3;
    grid-row: 1 / 2;
`;

const CMU = styled(College)`
    grid-column: 2 / 3;
    grid-row: 2 / 3;
`;

const NMAMIT = styled(College)`
    grid-column: 2 / 3;
    grid-row: 3 / 4;
`;

export default Education;
