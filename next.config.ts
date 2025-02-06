import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: false,
  images: {
    domains: ["cdn.discordapp.com", "res.cloudinary.com"],
  },
};

export default nextConfig;
