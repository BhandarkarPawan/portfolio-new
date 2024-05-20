import * as React from "react";
import Image from "next/image";
import styles from "./BlogImage.module.css";
import Caption from "../Caption";

interface ImageWithAttributionProps extends React.ComponentProps<typeof Image> {
  attrName: string;
  attrUrl: string;
  attrHost?: string;
  attrHostUrl?: string;
}

export function ImageWithAttribution({
  attrName,
  attrUrl,
  attrHost,
  attrHostUrl,
  ...delegated
}: ImageWithAttributionProps) {
  return (
    <div className={styles.imageWithCaption}>
      <Image className={styles.image} {...delegated} />
      <Caption>
        Image by{" "}
        <a className={styles.attrLink} href={attrUrl}>
          {attrName}.
        </a>
        &nbsp;
        <AttrHost attrHost={attrHost} attrHostUrl={attrHostUrl} />
      </Caption>
    </div>
  );
}

interface CaptionedImageProps extends React.ComponentProps<typeof Image> {
  caption: string;
}

export const ImageWithCaption = ({
  caption,
  ...delegated
}: CaptionedImageProps) => {
  return (
    <div className={styles.imageWithCaption}>
      <Image className={styles.image} {...delegated} />
      <Caption>{caption}</Caption>
    </div>
  );
};

const AttrHost = ({
  attrHost,
  attrHostUrl,
}: {
  attrHost?: string;
  attrHostUrl?: string;
}) => {
  if (!attrHost) return null;

  if (attrHost && attrHostUrl)
    return (
      <span className={styles.imageAttribution}>
        Hosted on{" "}
        <a className={styles.attrLink} href={attrHostUrl}>
          {attrHost}
        </a>
      </span>
    );

  return <>Hosted on {attrHost}</>;
};
