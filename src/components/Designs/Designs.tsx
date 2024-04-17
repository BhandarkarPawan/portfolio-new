import Design from "@/components/Design";
import DESIGNS from "@/data/designs.json";
import styles from "./Designs.module.css";
import { DesktopTitle, MobileTitle } from "@/components/SectionTitle";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";

const Designs: React.FC = () => {
  return (
    <div className={styles.designs} id="designs">
      <MaxWidthWrapper className={styles.maxWidthWrapper}>
        <DesktopTitle side="left">Figma Designs</DesktopTitle>
        <MobileTitle side="left">Figma Designs</MobileTitle>
        <div className={styles.designList}>
          {DESIGNS.map((design, index) => (
            <Design
              key={design.name}
              index={index}
              imgSrc={design.imgSrc}
              description={design.description}
              name={design.name}
              url={design.url}
              side={index % 2 === 0 ? "left" : "right"}
            />
          ))}
        </div>
      </MaxWidthWrapper>
    </div>
  );
};
export default Designs;
