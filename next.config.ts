import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  experimental: {
    turbopackFileSystemCacheForDev: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: '10.10.20.41',
        port: '6021',
        pathname: '/public/images/**',
      },
    ],
  },
};

export default nextConfig;
