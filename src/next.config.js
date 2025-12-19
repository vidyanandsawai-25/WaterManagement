/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: [],
  },
  // Disable static exports for SSR
  output: undefined,
};

module.exports = nextConfig;
