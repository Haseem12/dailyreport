
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  output: 'export', // Enable static export for cPanel compatibility
  assetPrefix: './', // Ensure relative paths for static assets
  basePath: '', // Ensure no base path is prepended
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    unoptimized: true, // Required for static hosting (disables Next.js image optimization)
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'placehold.co',
        port: '',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
