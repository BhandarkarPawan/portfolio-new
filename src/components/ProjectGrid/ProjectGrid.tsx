import Tilt from "react-parallax-tilt";
import { IProject } from "@/components/Project";
import styles from "./ProjectGrid.module.css";
import Image from "next/image";
export interface IProps {
  projects: IProject[];
}

const ProjectGrid: React.FC<React.PropsWithChildren<IProps>> = ({
  projects,
  children,
  ...delegated
}) => {
  return (
    <div className={styles.projectGrid} id="other-projects">
      <h2 className={styles.subTitle}>
        Other Projects
        <p className={styles.subText}>Tap on a project to learn more!</p>
      </h2>

      <div className={styles.grid} {...delegated}>
        {projects.map((project, idx) => {
          return (
            <Tilt
              key={idx}
              tiltMaxAngleX={3}
              tiltMaxAngleY={3}
              glareEnable={false}
            >
              <Image
                className={styles.projectThumbnail}
                height={400}
                width={300}
                key={idx}
                src={project.imgSrc}
                alt={project.name}
              />
            </Tilt>
          );
        })}
      </div>
    </div>
  );
};

export default ProjectGrid;
