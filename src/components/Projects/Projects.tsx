import styled from "styled-components";
import Project from "../Project/Project";
import SectionTitle from "../SectionTitle/SectionTitle";

const PROJECTS = [
    {
        name: "Kanban Task Manager",
        techs: ["React", "TypeScript", "Styled Components"],
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
            <Title label="Things I've built" side="left" />
            <Kanban1 {...PROJECTS[0]} side="left" />
            <Kanban2 {...PROJECTS[1]} side="right" />
        </Wrapper>
    );
};

const Wrapper = styled.div`
    grid-area: projects;

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

const Kanban1 = styled(Project)`
    grid-column: 2 / 3;
    grid-row: 2 / 3;
`;

const Kanban2 = styled(Project)`
    grid-column: 2 / 3;
    grid-row: 3 / 4;
`;

export default Projects;
