import type { NextConfig } from "next";

 
import { initOpenNextCloudflareForDev } from "@opennextjs/cloudflare";
initOpenNextCloudflareForDev();

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: false,
  logging: {
    fetches: {
      fullUrl: true,
    },
  },
  images: {
    remotePatterns: [
      new URL("https://cdn.sanity.io/images/**"),
    ]
  }
};

export default nextConfig;
