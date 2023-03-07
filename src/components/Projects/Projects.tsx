import { QUERIES } from "@/pages/breakpoints";
import styled from "styled-components";
import { ContraintedTitle, MaxWidthWrapper } from "../Education/Education";
import Project from "../Project/Project";
import SectionTitle from "../SectionTitle/SectionTitle";

const PROJECTS = [
    {
        name: "Kanban Task Manager",
        techs: ["React", "TypeScript", "NodeJS", "MongoDB", "Express"],
        description:
            "Lorem ipsum dolor sit amet consectetur. Tincidunt vulputate blandit elit ultrices quis orci curabitur. Sit volutpat amet aliquet faucibus maecenas.Sit volutpat amet aliquet faucibus maecenas.",
        github: "https://github.com/BhandarkarPawan/kanban-task-management",
        website: "https://kanbhan.netlify.app",
        imgSrc: "/images/kanban.png",
    },
    {
        name: "Kanban Task Manager",
        techs: ["React", "TypeScript", "Styled Components"],
        description:
            "Lorem ipsum dolor sit amet consectetur. Tincidunt vulputate blandit elit ultrices quis orci curabitur. Sit volutpat amet aliquet faucibus maecenas.Sit volutpat amet aliquet faucibus maecenas.",
        github: "https://github.com/BhandarkarPawan/kanban-task-management",
        website: "https://kanbhan.netlify.app",
        imgSrc: "/images/kanban.png",
    },
];

const Projects: React.FC = () => {
    return (
        <Wrapper>
            <MaxWidthWrapper>
                <ContraintedTitle label="Things I've built" side="left" />
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
