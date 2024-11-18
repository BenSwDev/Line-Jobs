// next.config.ts
import type { NextConfig } from 'next';
const withPWA = require('next-pwa')({
  dest: 'public',
  register: true,
  skipWaiting: true,
  disable: process.env.NODE_ENV === 'development',
});

const nextConfig: NextConfig = {
  reactStrictMode: true,
  swcMinify: true, // Ensure this is correctly placed
  // Add any other Next.js config options here
  // Example: images: { domains: ['example.com'] },
};

export default withPWA(nextConfig);
