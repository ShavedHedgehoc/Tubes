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
          // Когда вызываете /uploads/image.jpg на фронте
          source: "/uploads/:path*",
          // Проксируем на ваш API контейнер (или http://172.17.63.110*)
          destination: "http://api_tubes:7100/uploads/:path*",
        },
      ];
    }
    return [];
  },

};

export default nextConfig;
