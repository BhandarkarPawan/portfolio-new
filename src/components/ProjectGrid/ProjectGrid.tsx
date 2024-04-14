import { QUERIES } from "breakpoints";
import { useEffect, useState } from "react";
import { FaWindowClose } from "react-icons/fa";
import Tilt from "react-parallax-tilt";
import styled from "styled-components";
import { IProject } from "@/components/Project";

export interface IProps {
  projects: IProject[];
}

const ProjectGrid: React.FC<React.PropsWithChildren<IProps>> = ({
  projects,
  children,
  ...delegated
}) => {
  const [documentMounted, setDocumentMounted] = useState(false);
  // run after document mounted
  useEffect(() => {
    setDocumentMounted(true);
  }, []);

  const [selectedProject, setSelectedProject] = useState<IProject | null>(null);

  return (
    <Wrapper id="other-projects">
      <SubTitle>
        Other Projects
        <SubText>Tap on a project to learn more!</SubText>
      </SubTitle>

      <Grid {...delegated}>
        {projects.map((project, idx) => {
          return (
            <Tilt
              key={idx}
              tiltMaxAngleX={3}
              tiltMaxAngleY={3}
              glareEnable={false}
            >
              <ProjectThumbnail
                selected={!!selectedProject}
                key={idx}
                onClick={() => setSelectedProject(project)}
                src={project.imgSrc}
                alt={project.name}
              />
            </Tilt>
          );
        })}
      </Grid>
    </Wrapper>
  );
};

const SubTitle = styled.h2`
  /* align-self: center; */
  margin-bottom: 32px;
  color: ${({ theme }) => theme.colors.primary};
`;

export const HighlightedProject = styled.div<{
  isProjectSelected: boolean;
}>`
  position: absolute;
  display: flex;
  flex-direction: column;
  z-index: 1;
  background-color: ${({ theme }) => theme.colors.background.light};

  /* opacity: 0.9; */
  padding: 24px;
  border-radius: 8px;

  ${QUERIES.tabletAndUp} {
    top: 16px;
    left: 16px;
    bottom: 16px;
    right: 16px;
  }

  ${QUERIES.desktopAndUp} {
    top: 32px;
    left: 32px;
    bottom: 32px;
    right: 32px;
  }
`;

export const Description = styled.div`
  font-weight: 400;

  margin-top: 16px;

  ${QUERIES.desktopAndUp} {
    margin-top: 0px;
    margin-left: 32px;
  }
`;

export const Toolbar = styled.div`
  width: 100%;
  display: flex;
  padding-bottom: 24px;
  color: ${({ theme }) => theme.colors.primary};
`;

export const BackButton = styled.button`
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const CloseButton = styled.button`
  margin-left: auto;
`;

const SubText = styled.p`
  color: ${({ theme }) => theme.colors.text.light};
  font-size: calc(18 / 16 * 1rem);

  ${QUERIES.desktopAndUp} {
    display: none;
  }
`;

export const CloseIcon = styled(FaWindowClose)``;

export const Info = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  flex-grow: 1;

  flex-direction: column;

  ${QUERIES.desktopAndUp} {
    flex-direction: row;
  }
`;

export const ProjectImage = styled.img`
  width: 100%;
  height: 100%;
  max-width: 100%;
  object-fit: cover;
`;

const CustomTilt = styled(Tilt)`
  border-radius: 8px;
  ${QUERIES.desktopAndUp} {
    height: 100%;
  }

  ${QUERIES.desktopAndUp} {
    min-width: max-content;
  }
`;

export const Details = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  margin: auto;

  z-index: 3;
  ${QUERIES.tabletAndUp} {
    margin-top: 24px;
    padding: 16px;
  }

  ${QUERIES.desktopAndUp} {
    margin-top: 64px;
    padding: 32px;
  }
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  max-width: 1080px;
  gap: 16px;
  background-color: transparent;
  border-radius: 8px;

  ${QUERIES.tabletAndUp} {
    gap: 24px;
    grid-template-columns: repeat(2, 1fr);
  }

  ${QUERIES.desktopAndUp} {
    gap: 24px;
    grid-template-columns: repeat(3, 1fr);
  }
`;

const ProjectThumbnail = styled.img<{ selected: boolean }>`
  position: relative;
  z-index: 1;

  border-radius: 8px;
  display: inline;
  object-fit: cover;
  height: 100%;
  transition: all 0.3s ease-in;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.6);

  opacity: ${(props) => (props.selected ? 0 : 1)};

  &:hover {
    cursor: pointer;
    transition: transform 0.1s ease-out;
    transform: translateY(-8px) scale(1.02);
    box-shadow: 0px 8px 16px rgba(0, 0, 0, 0.4);
  }
`;

export default ProjectGrid;
