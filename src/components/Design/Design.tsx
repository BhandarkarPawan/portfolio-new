import { RxFigmaLogo } from "react-icons/rx";
import { IconLink } from "@/components/Socials";
import Title from "@/components/Title";
import Image from "next/image";
import styles from "./Design.module.css";
import clsx from "clsx";
export interface IProps {
  imgSrc: string;
  description: string;
  name: string;
  url: string;
  index: number;
  side: "left" | "right";
}

const Design: React.FC<IProps> = ({
  imgSrc,
  description,
  name,
  url,
  side,
  index,
}) => {
  return (
    <div className={clsx(styles.design, styles[side])}>
      <a className={styles.imageWrapper} href={url} target="_blank">
        <Image
          className={styles.image}
          height={200}
          width={200}
          src={imgSrc}
          alt={description}
        />
        <div className={styles.overlay}>
          <RxFigmaLogo size={56} />
        </div>
      </a>
      <div className={styles.outerWrapper}>
        <div className={styles.nameAndLink}>
          <Title className={styles.designName}>{name}</Title>
          <IconLink href={url} target="_blank">
            <RxFigmaLogo size={32} />
          </IconLink>
        </div>
        <div className={clsx(styles.description, styles[side])}>
          <Title className={styles.designName}>{name}</Title>
          {description}
        </div>
      </div>
    </div>
  );
};

export default Design;
