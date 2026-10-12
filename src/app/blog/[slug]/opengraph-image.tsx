import { ImageResponse } from "next/og";
import { PROFILE } from "@/data/profile";
import { formatDate, getPost, getPosts } from "@/lib/blog";
import { contours, googleFont, OG_SIZE } from "@/lib/og";

export const alt = "Blog post by Pawan Bhandarkar";
export const size = OG_SIZE;
export const contentType = "image/png";

// Render at build time like the posts themselves, so serving never depends on Google Fonts.
export async function generateStaticParams() {
  const posts = await getPosts();
  return posts.map((p) => ({ slug: p.slug }));
}

export default async function PostImage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const { meta } = await getPost(slug);
  const byline = `${PROFILE.name} · ${formatDate(meta.publishedOn)}`;
  const [geist, mono] = await Promise.all([
    googleFont("Geist:wght@500", `${meta.title}${byline}`),
    googleFont("Geist+Mono", "BHANDARKAR.ME WRITING"),
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
        <img
          src={contours}
          width={660}
          height={600}
          style={{ position: "absolute", right: -160, top: 60, opacity: 0.55 }}
          alt=""
        />
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
          <span style={{ color: "#ffb547" }}>WRITING</span>
        </div>
        <div
          style={{
            display: "flex",
            fontSize: meta.title.length > 60 ? 64 : 80,
            lineHeight: 1.02,
            letterSpacing: -2.5,
            maxWidth: 960,
          }}
        >
          {meta.title}
        </div>
        <div style={{ display: "flex", fontSize: 26, color: "rgba(236,235,230,0.7)" }}>{byline}</div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Geist", data: geist, weight: 500, style: "normal" },
        { name: "Geist Mono", data: mono, weight: 400, style: "normal" },
      ],
    },
  );
}
