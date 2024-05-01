import * as React from "react";
import Image from "next/image";

interface Props extends React.ComponentProps<typeof Image> {}

function ImageWithAttribution({ ...delegated }: Props) {
  return (
    <div className="image-with-attribution">
      <Image {...delegated} />
      <span className="image-attribution">
        Image by{" "}
        <a
          href="https://www.freepik.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          Freepik
        </a>
      </span>
    </div>
  );
}

export default ImageWithAttribution;
