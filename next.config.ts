import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: false,
  images: {
    remotePatterns: [
      new URL("https://cdn.sanity.io/images/**"),
    ]
  }
};

export default nextConfig;
