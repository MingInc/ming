import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "cdn.prod.website-files.com",
      },
      {
        protocol: "https",
        hostname: "ethglobal.b-cdn.net",
      },
      {
        protocol: "https",
        hostname: "ethglobal.notion.site",
      },
    ],
  },
};

export default nextConfig;
