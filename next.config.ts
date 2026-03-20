import type { NextConfig } from "next";
import { headers } from "next/headers";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [{
      protocol: "https",
      hostname: "*",
      port: '',
      pathname: '/**',
    }
    ]
  },
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'Cross-Origin-Opener-Policy',
            value: 'same-origin'
          },
          {
            key: 'Cross-Origin-Embedder-Policy',
            value: 'require-corp'
          }
        ]
      }
    ]
  },
  reactStrictMode: false,
};

export default nextConfig;
