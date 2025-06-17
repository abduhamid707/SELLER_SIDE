import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'abumarket.abusahiy.uz',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'cloud.video.taobao.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'cbu01.alicdn.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'img.alicdn.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'global-img-cdn.1688.com',
        pathname: '/**',
      },
    ],
  },

  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"],
    });
    return config;
  },
};

export default nextConfig;
