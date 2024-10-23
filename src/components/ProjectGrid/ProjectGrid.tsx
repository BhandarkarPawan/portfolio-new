"use client";

import { IProject } from "@/components/Project";
import styles from "./ProjectGrid.module.css";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { FaGithub } from "react-icons/fa";
import { IoOpen } from "react-icons/io5";
import { IconLink } from "@/components/Socials";
export interface IProps {
  projects: IProject[];
}

const ActiveProject = ({
  selectedProject,
  setSelectedProject,
}: {
  selectedProject: IProject | null;
  setSelectedProject: (project: IProject | null) => void;
}) => {
  const backgroundVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.3 } },
  };

  const contentVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (custom: number) => ({
      opacity: 1,
      y: 0,
      transition: { delay: 0.5 + custom * 0.1, duration: 0.3 },
    }),
  };

  return (
    <AnimatePresence>
      {selectedProject && (
        <motion.div
          className={styles.overlay}
          onClick={() => setSelectedProject(null)}
          initial="hidden"
          animate="visible"
          exit="hidden"
          variants={backgroundVariants}
        >
          <motion.div
            className={styles.active}
            onClick={(e) => e.stopPropagation()}
            variants={backgroundVariants}
          >
            <div className={styles.activeContent}>
              <motion.div
                layoutId={`image-${selectedProject.name}`}
                className={styles.activeImageWrapper}
              >
                <Image
                  className={styles.activeImage}
                  src={selectedProject.imgSrc}
                  alt={selectedProject.name}
                  width={600}
                  height={400}
                  objectFit="cover"
                />
              </motion.div>
              <div className={styles.projectDetails}>
                <motion.h4
                  className={styles.projectType}
                  variants={contentVariants}
                  custom={0}
                >
                  {selectedProject.type}
                </motion.h4>
                <motion.h2
                  className={styles.projectName}
                  variants={contentVariants}
                  custom={1}
                >
                  {selectedProject.name}
                </motion.h2>
                <motion.p
                  className={styles.projectDescription}
                  variants={contentVariants}
                  custom={2}
                >
                  {selectedProject.description}
                </motion.p>
                <motion.ul
                  className={styles.projectTechs}
                  variants={contentVariants}
                  custom={3}
                >
                  {selectedProject.techs.map((tech) => (
                    <li key={tech} className={styles.tech}>
                      {tech}
                    </li>
                  ))}
                </motion.ul>
                <motion.ul
                  className={styles.projectLinks}
                  variants={contentVariants}
                  custom={4}
                >
                  {selectedProject.github && (
                    <IconLink href={selectedProject.github} target="_blank">
                      <FaGithub size={32} />
                    </IconLink>
                  )}
                  {selectedProject.website && (
                    <IconLink href={selectedProject.website} target="_blank">
                      <IoOpen size={32} />
                    </IconLink>
                  )}
                </motion.ul>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

const ProjectGridCard = ({
  project,
  setSelectedProject,
}: {
  project: IProject;
  setSelectedProject: (project: IProject) => void;
}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.button
      key={project.name}
      onClick={() => setSelectedProject(project)}
      className={styles.projectButton}
      whileHover={{
        scale: 1.05,
        transition: { type: "spring", stiffness: 250, damping: 10 },
      }}
    >
      <motion.div
        layoutId={`image-${project.name}`}
        className={styles.imageWrapper}
      >
        <motion.div
          animate={{
            opacity: isHovered ? 1 : 0,
            background: isHovered
              ? "linear-gradient(to top left, rgba(0, 0, 0, 0.7), transparent)"
              : "linear-gradient(to top left, rgba(0, 0, 0, 0), transparent)",
          }}
          transition={{ delay: 0.3, duration: 0.3 }}
          onHoverStart={() => setIsHovered(true)}
          onHoverEnd={() => setIsHovered(false)}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
          }}
        />
        <motion.p
          className={styles.imageOverlayText}
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 1 : 0 }}
          transition={{ delay: 0.5, duration: 0.1 }}
        >
          View Project
        </motion.p>
        <Image
          className={styles.image}
          src={project.imgSrc}
          alt={project.name}
          width={400}
          height={300}
          objectFit="cover"
          style={{}}
        />
      </motion.div>
    </motion.button>
  );
};

const ProjectGrid: React.FC<React.PropsWithChildren<IProps>> = ({
  projects,
  children,
  ...delegated
}) => {
  const [selectedProject, setSelectedProject] = useState<IProject | null>(null);

  return (
    <div className={styles.container}>
      <ActiveProject
        selectedProject={selectedProject}
        setSelectedProject={setSelectedProject}
      />
      {projects.map((project) => (
        <ProjectGridCard
          key={project.name}
          project={project}
          setSelectedProject={setSelectedProject}
        />
      ))}
    </div>
  );
};

export default ProjectGrid;
