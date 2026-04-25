/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    // Fix for Next.js 15.5 bug with route groups in Vercel
    // See: https://github.com/vercel/next.js/issues/71572
    serverSourceMaps: false,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn-s.acuityscheduling.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'placehold.co',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'static.wixstatic.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'musclebeachclassic.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'officialalphaland.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'summershredding.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'cdn.shopify.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
};

module.exports = nextConfig;
