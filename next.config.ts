import type { NextConfig } from 'next';

// Use env so you can change protocol/host/port on environment
// const API_PROTOCOL = process.env.NEXT_PUBLIC_API_PROTOCOL || 'http';
// const API_HOST = process.env.NEXT_PUBLIC_API_HOST || '10.10.20.41';
// const API_PORT = process.env.NEXT_PUBLIC_API_PORT || '6021';

const nextConfig: NextConfig = {
  experimental: {
    turbopackFileSystemCacheForDev: true,
  },
  images: {
    remotePatterns: [
      // {
      //   protocol: API_PROTOCOL as 'http' | 'https',
      //   hostname: API_HOST,
      //   port: API_PORT,
      //   pathname: '/public/**',
      // },
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
      },
    ],
  },
};

export default nextConfig;
