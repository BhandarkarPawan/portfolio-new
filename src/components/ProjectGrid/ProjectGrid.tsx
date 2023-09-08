import { QUERIES } from "breakpoints";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { FaArrowLeft, FaWindowClose } from "react-icons/fa";
import styled from "styled-components";
import { School } from "../College/College";
import {
    Feature,
    Github,
    IProject,
    Links,
    Tech,
    Techs,
    Website,
} from "../Project/Project";
import { HoverIconLink } from "../Socials/Socials";

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

    const calculateTranslationOnMouseEnter = (
        e: React.MouseEvent,
        bgRef: React.RefObject<HTMLDivElement>
    ) => {
        const target = e.target as HTMLImageElement;
        const rect = target.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const translationX = (x - rect.width / 2) / 20;
        const translationY = (y - rect.height / 2) / 20;

        // Calculate scale factor based on distance from center
        const scaleFactor = Math.sqrt(
            Math.pow(x - rect.width / 2, 2) + Math.pow(y - rect.height / 2, 2)
        );

        bgRef.current!.style.transform = `translate(${-translationX}px, ${-translationY}px)`;
        target.style.transform = `translate(${translationX}px, ${translationY}px) `;
    };

    const clearTranslationOnMouseLeave = (
        e: React.MouseEvent,
        bgRef: React.RefObject<HTMLDivElement>
    ) => {
        const target = e.target as HTMLImageElement;
        bgRef.current!.style.transform = `translate(0px, 0px) rotate(0deg)`;
        target.style.transform = `translate(0px, 0px) rotate(0deg)`;
    };

    const updateTranslationOnMouseMove = (
        e: React.MouseEvent,
        bgRef: React.RefObject<HTMLDivElement>
    ) => {
        const target = e.target as HTMLImageElement;
        const rect = target.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const translationX = (x - rect.width / 2) / 20;
        const translationY = (y - rect.height / 2) / 20;

        bgRef.current!.style.transform = `translate(${-translationX}px, ${-translationY}px) `;
        target.style.transform = `translate(${translationX}px, ${translationY}px) `;
    };

    const [selectedProject, setSelectedProject] = useState<IProject | null>(
        null
    );

    const SelectedProject = (selectedProject: IProject) => (
        <HighlightedProject isProjectSelected={selectedProject !== null}>
            <Toolbar>
                <BackButton onClick={() => setSelectedProject(null)}>
                    <BackArrow />
                    Back
                </BackButton>
                <CloseButton onClick={() => setSelectedProject(null)}>
                    <CloseIcon />
                </CloseButton>
            </Toolbar>
            <Info>
                <ProjectImage
                    src={selectedProject?.imgSrc}
                    alt={selectedProject?.name}
                />
                <Details>
                    <FloatingHeader>
                        <Name side="right">{selectedProject.name}</Name>
                        <Feature side="right">{selectedProject.type}</Feature>
                    </FloatingHeader>
                    <Description>{selectedProject.description}</Description>

                    <FloatingFooter>
                        <Links side="right">
                            {selectedProject.github.length > 0 && (
                                <HoverIconLink
                                    href={selectedProject.github}
                                    target="_blank"
                                >
                                    <Github size={32} />
                                </HoverIconLink>
                            )}

                            <HoverIconLink
                                href={selectedProject.website}
                                target="_blank"
                            >
                                <Website size={32} />
                            </HoverIconLink>
                        </Links>
                        <WrappingTechs side="right">
                            {selectedProject.techs.map((tech, idx) => (
                                <Tech key={tech}>{tech}</Tech>
                            ))}
                        </WrappingTechs>
                    </FloatingFooter>
                </Details>
            </Info>
        </HighlightedProject>
    );
    const refArray = [
        useRef<HTMLDivElement>(null),
        useRef<HTMLDivElement>(null),
        useRef<HTMLDivElement>(null),
        useRef<HTMLDivElement>(null),
        useRef<HTMLDivElement>(null),
        useRef<HTMLDivElement>(null),
    ] as React.RefObject<HTMLDivElement>[];

    return (
        <Wrapper id="other-projects">
            <SubTitle>
                Other Projects
                <SubText>Tap on a project to learn more!</SubText>
            </SubTitle>

            <Grid {...delegated}>
                {projects.map((project, idx) => {
                    return (
                        <ThumbnailWrapper key={idx}>
                            <Background ref={refArray[idx]} />
                            <ProjectThumbnail
                                onClick={() => setSelectedProject(project)}
                                onMouseEnter={(e) =>
                                    calculateTranslationOnMouseEnter(
                                        e,
                                        refArray[idx]
                                    )
                                }
                                onMouseLeave={(e) =>
                                    clearTranslationOnMouseLeave(
                                        e,
                                        refArray[idx]
                                    )
                                }
                                onMouseMove={(e) =>
                                    updateTranslationOnMouseMove(
                                        e,
                                        refArray[idx]
                                    )
                                }
                                src={project.imgSrc}
                                alt={project.name}
                            />
                        </ThumbnailWrapper>
                    );
                })}
            </Grid>

            {selectedProject && (
                <NonModalWrapper>
                    <SelectedProject {...selectedProject} />
                </NonModalWrapper>
            )}
            {documentMounted &&
                selectedProject &&
                (createPortal(
                    <ModalWrapper>
                        {/* <Overlay onClick={() => setSelectedProject(null)} /> */}
                        <Modal>
                            <SelectedProject {...selectedProject} />
                        </Modal>
                    </ModalWrapper>,
                    document.body
                ) as React.ReactPortal)}
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
    padding: 32px;
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

const ModalWrapper = styled.div`
    ${QUERIES.tabletAndUp} {
        display: none;
    }

    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    overflow-y: auto;
    z-index: 999;
    background: rgba(0, 0, 0, 0.4);
    backdrop-filter: blur(4px);
`;

const Modal = styled.div`
    position: absolute;
    top: 16px;
    left: 16px;
    right: 16px;
    bottom: 16px;
    z-index: 3;
`;

const NonModalWrapper = styled.div`
    display: none;

    ${QUERIES.tabletAndUp} {
        display: block;
    }
`;

const FloatingHeader = styled.div`
    ${QUERIES.tabletAndUp} {
        position: absolute;
        top: -8px;
        left: 32px;
        right: 32px;

        transform: translateY(-100%);
        flex-direction: row;
    }

    display: flex;
    flex-direction: column-reverse;
    justify-content: space-between;
    align-items: baseline;
`;

const FloatingFooter = styled.div`
    ${QUERIES.tabletAndUp} {
        position: absolute;
        bottom: -8px;
        left: 0px;
        right: 32px;
        transform: translateY(100%);

        justify-content: space-between;
        flex-direction: row;
        align-items: baseline;
    }

    display: flex;
    flex-direction: column-reverse;
`;

export const Description = styled.div`
    font-weight: 400;

    margin-top: 16px;

    ${QUERIES.desktopAndUp} {
        margin-top: 0px;
        margin-left: 32px;
    }
`;

const Name = styled(School)`
    margin: 0px;
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
    color: white;
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
    object-fit: cover;
    border-radius: 8px;

    width: 100%;
    ${QUERIES.desktopAndUp} {
        height: 100%;
    }
`;

const WrappingTechs = styled(Techs)`
    flex-wrap: wrap;
`;

export const Details = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
`;

const BackArrow = styled(FaArrowLeft)``;

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

const ProjectThumbnail = styled.img`
    border-radius: 8px;
    display: inline;
    object-fit: cover;
    height: 100%;
    transition: transform 0.3s ease-in;
    &:hover {
        transition: transform 0.1s ease-out;
    }
    z-index: 2;
`;

const ThumbnailWrapper = styled.div`
    position: relative;
    width: 100%;
    height: 100%;
    cursor: pointer;
    z-index: 1;
`;

const Background = styled.div`
    width: 100%;
    height: 100%;
    border-radius: 8px;
    background-color: black;
    opacity: 0.3;
    position: absolute;
    z-index: -1;

    transition: transform 0.3s ease-in;
    &:hover {
        transition: transform 0.1s ease-out;
    }
`;

export default ProjectGrid;