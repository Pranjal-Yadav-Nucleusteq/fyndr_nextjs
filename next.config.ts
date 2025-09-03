import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    serverActions: {
      bodySizeLimit: "3mb",
    },
  },
  staticPageGenerationTimeout: 300,
  serverExternalPackages: ["pino", "pino-pretty"],
  // eslint: { ignoreDuringBuilds: true },
  // typescript: { ignoreBuildErrors: true },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "biz-logo.s3.us-west-1.amazonaws.com",
        port: "",
      },
      { protocol: "https", hostname: "s3.us-west-1.amazonaws.com", port: "" },
      { protocol: "https", hostname: "s3-us-west-1.amazonaws.com", port: "" },
      {
        protocol: "https",
        hostname: "biz-logo.s3.us-west-1.amazonaws.com",
        port: "",
      },
      {
        protocol: "https",
        hostname: "fyndr-comments-dev.s3.us-west-1.amazonaws.com",
        port: "",
      },
      { protocol: "https", hostname: "lh3.googleusercontent.com", port: "" },
      { protocol: "https", hostname: "png.pngtree.com", port: "" },
      { protocol: "https", hostname: "github.com", port: "" },
    ],
  },
  logging: { fetches: { fullUrl: true } },
  // output: "standalone",
};

export default nextConfig;
