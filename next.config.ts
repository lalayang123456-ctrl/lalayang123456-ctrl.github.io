import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: process.env.GITHUB_PAGES === "true" ? "export" : undefined,
};

export default nextConfig;
