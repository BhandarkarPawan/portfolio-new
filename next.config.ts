import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [{ protocol: "https", hostname: "images.unsplash.com" }],
  },
  // The résumé PDF links to these short URLs, so they must keep resolving.
  async redirects() {
    return [
      { source: "/github", destination: "https://github.com/BhandarkarPawan", permanent: true },
      { source: "/linkedin", destination: "https://www.linkedin.com/in/bhandarkar", permanent: true },
      { source: "/resume", destination: "/files/Resume.pdf", permanent: true },
    ];
  },
};

export default nextConfig;
