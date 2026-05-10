/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  basePath: process.env.NODE_ENV === 'production' ? '/fitforge' : '',
  images: { unoptimized: true },
  transpilePackages: ['@fitforge/shared'],
};

module.exports = nextConfig;
