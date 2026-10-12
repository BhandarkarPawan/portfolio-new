// Shared pieces for the build-time Open Graph images.

import { curvePoints, smooth, toPath } from "@/lib/curves";

export const OG_SIZE = { width: 1200, height: 630 };

/** Fetches a subset of a Google font as TrueType, which the OG renderer needs (it can't read WOFF2). */
export async function googleFont(family: string, text: string) {
  const css = await (
    await fetch(`https://fonts.googleapis.com/css2?family=${family}&text=${encodeURIComponent(text)}`)
  ).text();
  const url = css.match(/src: url\((.+?)\) format\('(?:opentype|truetype)'\)/)?.[1];
  if (!url) throw new Error(`No TrueType source for Google font ${family}`);
  return (await fetch(url)).arrayBuffer();
}

export const contours = (() => {
  const rings = [1, 0.78, 0.58, 0.4, 0.24, 0.12]
    .map(
      (k, i) =>
        `<ellipse cx="${330 + (1 - k) * 60}" cy="${300 + (1 - k) * 22}" rx="${320 * k}" ry="${190 * k}" fill="none" stroke="#ffb547" stroke-opacity="${0.12 + i * 0.1}" stroke-width="1.5" transform="rotate(-24 330 300)"/>`,
    )
    .join("");
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="660" height="600" viewBox="0 0 660 600">${rings}<circle cx="388" cy="322" r="7" fill="#ffb547"/></svg>`;
  return `data:image/svg+xml;base64,${Buffer.from(svg).toString("base64")}`;
})();

export const curve = (() => {
  const path = toPath(
    smooth(curvePoints({ width: 300, height: 70, points: 120, seed: 11, decay: 0.22, noise: 0.18 }), 0.15),
  );
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="300" height="70" viewBox="0 0 300 70"><path d="${path}" fill="none" stroke="#ffb547" stroke-width="2"/></svg>`;
  return `data:image/svg+xml;base64,${Buffer.from(svg).toString("base64")}`;
})();
