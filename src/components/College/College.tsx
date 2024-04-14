import Tilt from "react-parallax-tilt";
import SlideUp from "@/components/SlideUp";
import styles from "./College.module.css";
import Image from "next/image";
import clsx from "clsx";
import Title from "@/components/Title";

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
  const smallImg = imgSrc.replace(".png", "-small.png");

  return (
    <div className={clsx(styles.college, styles[side])} {...delegated}>
      <SlideUp>
        <div className={styles.stretch}>
          <Tilt
            tiltMaxAngleX={3}
            tiltMaxAngleY={3}
            glareEnable={true}
            glarePosition="top"
            glareMaxOpacity={0.3}
            glareBorderRadius="8px"
          >
            <Image
              height={100}
              width={100}
              className={styles.image}
              src={imgSrc}
              alt={school}
            />
          </Tilt>
        </div>
      </SlideUp>
      <div className={clsx(styles.info, styles[side])}>
        <SlideUp delay={200}>
          <Image
            className={styles.smallImage}
            src={smallImg}
            alt={school}
            width={100}
            height={100}
          />
        </SlideUp>
        <SlideUp delay={200}>
          <h4 className={clsx(styles.degree, styles[side])}>{degree}</h4>
        </SlideUp>
        <SlideUp delay={200}>
          <h4 className={clsx(styles.school, styles[side])}>{school}</h4>
        </SlideUp>
        <ul className={clsx(styles.courses, styles[side])}>
          <Title>Courses</Title>
          {courses.map((course, i) => (
            <li className={styles.course} key={i}>
              {course}
            </li>
          ))}
        </ul>
        <SlideUp delay={200}>
          <ul className={clsx(styles.data, styles[side])}>
            <p className={styles.time}>
              {start} - {end}
            </p>
            <p className={styles.gpa}>GPA: {gpa}</p>
          </ul>
        </SlideUp>
      </div>
    </div>
  );
};

export default College;
