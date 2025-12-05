import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: "8000",
        pathname: "/storage/uploads/**",
      },
      {
      protocol: "https",
      hostname: "amzn-s3-booking-web.s3.ap-southeast-1.amazonaws.com",
      }
    ],
  },
};

export default nextConfig;
