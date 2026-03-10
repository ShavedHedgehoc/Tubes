import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  output: "standalone",
  turbopack: {
    // Ensure this is an absolute path to your repository root
    root: path.join(__dirname, ".."),
  },
};

export default nextConfig;
