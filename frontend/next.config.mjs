/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  basePath: '/talentforge-ai-',
  images: {
    unoptimized: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;


