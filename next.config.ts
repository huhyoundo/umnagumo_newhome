import type { NextConfig } from "next";

// Force restart 2024-12-30


const nextConfig: NextConfig = {
  poweredByHeader: false,
  output: "standalone",
  images: {
    qualities: [75, 95, 100],
  },
  turbopack: {
    root: process.cwd(),
  },
  async redirects() {
    return [
      {
        source: "/:path*",
        has: [{ type: "host", value: "bust1.com" }],
        destination: "https://www.bust1.com/:path*",
        permanent: true,
      },
    ];
  },
  async headers() {
    return [
      {
        source: "/폰트/:path*",
        headers: [{ key: "Cache-Control", value: "public, max-age=31536000, immutable" }],
      },
    ];
  },
};

export default nextConfig;
