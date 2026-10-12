import { ImageResponse } from "next/og";
import { PROFILE } from "@/data/profile";
import { contours, curve, googleFont, OG_SIZE } from "@/lib/og";

export const alt = `${PROFILE.name} — ${PROFILE.role}, ${PROFILE.company}`;
export const size = OG_SIZE;
export const contentType = "image/png";

const STATEMENT = ["I build the", "instruments", "that let researchers see inside frontier models."] as const;
const LABEL = `${PROFILE.role} — ${PROFILE.company}`.toUpperCase();

export default async function OpengraphImage() {
  const [geist, mono, serif] = await Promise.all([
    googleFont("Geist:wght@500", `${PROFILE.name}${STATEMENT[0]}${STATEMENT[2]}`),
    googleFont("Geist+Mono", `${LABEL}BHANDARKAR.ME LOSS ↓`),
    googleFont("Instrument+Serif:ital@1", STATEMENT[1]),
  ]);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "56px 64px",
          background: "#08080a",
          color: "#ecebe6",
          fontFamily: "Geist",
          position: "relative",
        }}
      >
        <img src={contours} width={660} height={600} style={{ position: "absolute", right: -60, top: 10 }} alt="" />
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            fontFamily: "Geist Mono",
            fontSize: 18,
            letterSpacing: 2.5,
            color: "#8e8c86",
          }}
        >
          <span>BHANDARKAR.ME</span>
          <span style={{ color: "#ffb547" }}>{LABEL}</span>
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{ display: "flex", flexDirection: "column", fontSize: 150, lineHeight: 0.86, letterSpacing: -6.5 }}
          >
            <span>Pawan</span>
            <span>Bhandarkar</span>
          </div>
          <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", marginTop: 40 }}>
            {/* One span per word: the renderer wraps flex items, not text runs. */}
            <div
              style={{
                display: "flex",
                alignItems: "baseline",
                fontSize: 34,
                letterSpacing: -0.6,
                color: "rgba(236,235,230,0.9)",
                maxWidth: 700,
                flexWrap: "wrap",
              }}
            >
              {STATEMENT[0].split(" ").map((w, i) => (
                <span key={`a${i}`} style={{ marginRight: 9 }}>
                  {w}
                </span>
              ))}
              <span
                style={{
                  fontFamily: "Instrument Serif",
                  fontStyle: "italic",
                  color: "#ffb547",
                  fontSize: 38,
                  marginRight: 9,
                }}
              >
                {STATEMENT[1]}
              </span>
              {STATEMENT[2].split(" ").map((w, i) => (
                <span key={`b${i}`} style={{ marginRight: 9 }}>
                  {w}
                </span>
              ))}
            </div>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end" }}>
              <img src={curve} width={300} height={70} alt="" />
              <span
                style={{ fontFamily: "Geist Mono", fontSize: 14, letterSpacing: 2, color: "#55544f", marginTop: 8 }}
              >
                LOSS ↓
              </span>
            </div>
          </div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Geist", data: geist, weight: 500, style: "normal" },
        { name: "Geist Mono", data: mono, weight: 400, style: "normal" },
        { name: "Instrument Serif", data: serif, weight: 400, style: "italic" },
      ],
    },
  );
}
