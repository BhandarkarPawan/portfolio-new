import { QUERIES } from "breakpoints";
import styled from "styled-components";
import { ContraintedTitle, MaxWidthWrapper } from "../Education/Education";
import Project from "../Project/Project";
import SectionTitle from "../SectionTitle/SectionTitle";
import SlideUp from "../SlideUp";

const PROJECTS = [
    {
        name: "Kanban Task Manager",
        techs: ["React", "Docker", "NodeJS", "MongoDB", "EC2", "ECS"],
        description:
            "An accessible, responsive Kanban Task Manager built using Client-Server architecture with dynamic theming and drag-and-drop UI. Backend deployed on AWS and frontend on Netlify via CI/CD on using Github Actions. Security handled with HTTPS/SSL on AWS Application Load Balancer.",
        github: "https://github.com/BhandarkarPawan/kanban-task-management",
        website: "https://kanbhan.netlify.app",
        imgSrc: "/images/kanban.png",
    },
    {
        name: "Emergency Social Network",
        techs: ["HTML", "CSS", "NodeJS", "MongoDB", "figma"],
        description:
            "An emergency communication system for real-time SOS messaging during earthquakes. Built in a fast paced Agile environment with a team of 5. The app was designed and developed the project using Object Oriented Analysis and Programming principles.",
        github: "",
        website: "https://esn.onrender.com",
        imgSrc: "/images/esn-app.png",
    },
];

const Projects: React.FC = () => {
    return (
        <Wrapper>
            <MaxWidthWrapper>
                <SlideUp>
                    <ContraintedTitle label="Things I've Built" side="left" />
                </SlideUp>
                <Project {...PROJECTS[0]} side="left" />
            </MaxWidthWrapper>
            <Project {...PROJECTS[1]} side="right" />
        </Wrapper>
    );
};

const Wrapper = styled.div`
    background-color: ${({ theme }) => theme.colors.background.dark};
    padding: 32px 32px;
    display: flex;
    flex-direction: column;
    gap: 64px;

    ${QUERIES.tabletAndUp} {
        padding: 64px 64px;
    }

    ${QUERIES.desktopAndUp} {
        gap: 32px;
    }
`;

const Title = styled(SectionTitle)``;
export default Projects;
