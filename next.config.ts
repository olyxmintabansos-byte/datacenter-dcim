import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  output: 'export',
  basePath: '/datacenter-dcim',
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
