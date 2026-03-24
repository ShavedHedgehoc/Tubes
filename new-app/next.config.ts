import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  reactCompiler: true,
  output: "standalone",
  turbopack: {
    root: path.join(__dirname, ".."),
  },

  async rewrites() {
    if (process.env.NODE_ENV !== "production") {
      return [
        {
          source: "/images/:path*",
          destination: "http://localhost:8000/uploads/:path*",
        },
      ];
    }
    return [];
  },
};

export default nextConfig;
