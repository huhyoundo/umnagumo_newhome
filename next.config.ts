import type { NextConfig } from "next";

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
};

export default nextConfig;
