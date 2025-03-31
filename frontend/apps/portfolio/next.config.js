/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ['@lib'],
  experimental: {
    externalDir: true,
  },
};

module.exports = nextConfig;
