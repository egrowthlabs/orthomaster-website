import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // Allow images from the WP domain
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'www.orthomaster.com.mx',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'orthomaster.com.mx',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'javierh48.sg-host.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'via.placeholder.com',
        pathname: '/**',
      },
    ],
    formats: ['image/webp', 'image/avif'],
  },
  // Strict mode for better React error detection
  reactStrictMode: true,
};

export default nextConfig;
