import College from "@/components/College";
import MaxWidthWrapper from "../MaxWidthWrapper";
import { ConstrainedTitle } from "@/components/SectionTitle";
import styles from "./Education.module.css";

const COLLEGES = [
  {
    degree: "Master of Science in Software Engineering",
    school: "Carnegie Mellon University",
    courses: [
      "Cloud Computing",
      "Foundations of Software Engineering",
      "Data Science for Software Engineering",
      "Software Requirements & Ix Design",
      // "Software Engineering Methods",
      "Software Verification & Testing",
      "HCI & User Experience",
    ],
    start: 2022,
    end: 2023,
    gpa: "4.0",
    imgSrc: "/images/cmusv.png",
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
    imgSrc: "/images/nmamit.png",
  },
];

const Education: React.FC = () => {
  return (
    <div className={styles.education}>
      <MaxWidthWrapper>
        <ConstrainedTitle side="left">Education</ConstrainedTitle>
        <div className={styles.collegeList}>
          <College {...COLLEGES[0]} side="left" />
          <College {...COLLEGES[1]} side="right" />
        </div>
      </MaxWidthWrapper>
    </div>
  );
};

export default Education;
