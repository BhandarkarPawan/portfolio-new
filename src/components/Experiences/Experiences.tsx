import { ConstrainedTitle } from "@/components/SectionTitle";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import styles from "./Experiences.module.css";
import Image from "next/image";

const Experiences: React.FC = () => {
  return (
    <div className={styles.experiences}>
      <MaxWidthWrapper>
        <ConstrainedTitle side="left">Experiences</ConstrainedTitle>
        <div className={styles.items}>
          <div className={styles.timeline} />
          <div className={styles.item}>
            <Image
              className={styles.image}
              height={100}
              width={100}
              src="/images/converge.png"
              alt="converge-lab"
            />
            <div className={styles.dotPrimary}>
              <div className={styles.dotCore} />
            </div>
            <div className={styles.connector} />
            <div className={styles.info}>
              <Image
                height={100}
                width={100}
                className={styles.mobileImage}
                src="/images/converge.png"
                alt="converge-lab"
              ></Image>
              <p className={styles.time}>Jan 2024 - Present</p>
              <h4 className={styles.company}>Converge Lab</h4>
              <h4 className={styles.role}>Founding Engineer</h4>
              <p className={styles.description}>
                Building a platform that serves as an AI Co-Designer for
                Hardware Engineers to accelerate the design process of hardware
                circuits and systems
              </p>
            </div>
          </div>
          <div className={styles.item}>
            <Image
              className={styles.image}
              height={100}
              width={100}
              src="/images/tunein.png"
              alt="tunein-radio"
            />
            <div className={styles.dotPrimary}>
              <div className={styles.dotCore} />
            </div>
            <div className={styles.connector} />
            <div className={styles.info}>
              <Image
                className={styles.mobileImage}
                height={100}
                width={100}
                src="/images/tunein.png"
                alt="tunein-radio"
              />
              <p className={styles.time}>Jun 2023 - Aug 2023</p>
              <h4 className={styles.company}>TuneIn Radio</h4>
              <h4 className={styles.role}>
                Software Engineer Intern, Platform
              </h4>
              <p className={styles.description}>
                Added support for live streaming metadata for over 120K radio
                stations, which contributes to enhanced user experience and
                content discovery for search on the TuneIn platform, while
                aligning with TuneIn’s core values - Customer Centricity,
                Operational Excellence and Teamwork.
              </p>
            </div>
          </div>
          <div className={styles.item}>
            <Image
              height={100}
              width={100}
              className={styles.image}
              src="/images/aibod.png"
              alt="team aibod"
            ></Image>
            <div className={styles.connector} />
            <div className={styles.infos}>
              <div className={styles.bullet}>
                <div className={styles.dotPrimary}>
                  <div className={styles.dotCore} />
                </div>
                <div className={styles.info}>
                  <Image
                    className={styles.mobileImage}
                    height={100}
                    width={100}
                    src="/images/aibod.png"
                    alt="team aibod"
                  ></Image>
                  <p className={styles.time}>Nov 2021 - Apr 2022</p>
                  <h4 className={styles.company}>Team AIBOD Inc.</h4>
                  <h4 className={styles.role}>Software Engineer 2</h4>
                  <p className={styles.description}>
                    Led end-to-end development of several full-stack projects,
                    including a microservice that handles biometric payments for
                    an unmanned stored and a search system for Kyushu Electric
                    that allowed their employees to manage inspection
                    information about buildings.
                  </p>
                </div>
              </div>
              <div className={styles.bullet}>
                <div className={styles.dotSecondary}>
                  <div className={styles.dotCore} />
                </div>
                <div className={styles.info}>
                  <p className={styles.time}>Jul 2020 - Oct 2021</p>
                  <h4 className={styles.role}>Software Engineer 1</h4>
                  <p className={styles.description}>
                    Contributed to projects in various capacities, including
                    backend development with NodeJS and Python, Web GUI using
                    React and TypeScript and DevOps flows with AWS using EC2,
                    ECS, Docker and CloudWatch in a fast-paced Agile/SCRUM
                    environment
                  </p>
                </div>
              </div>

              <div className={styles.bullet}>
                <div className={styles.dotSecondary}>
                  <div className={styles.dotCore} />
                </div>
                <div className={styles.info}>
                  <p className={styles.time}>Feb 2020 - Jun 2020</p>
                  <h4 className={styles.role}>Software Engineer Intern</h4>

                  <p className={styles.description}>
                    Conducted AI Experiments that resulted in a 7% accuracy
                    improvement in the KNN-supervised classifier. Fine tuned a
                    BERT-based model to automate support requests in an
                    apartment intercom system.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </MaxWidthWrapper>
    </div>
  );
};

export default Experiences;
