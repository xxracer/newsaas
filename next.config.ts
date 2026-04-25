/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async rewrites() {
    return {
      beforeFiles: [
        // Public site pages (formerly in (main) route group)
        { source: '/about', destination: '/site/about' },
        { source: '/services', destination: '/site/services' },
        { source: '/book', destination: '/site/book' },
        { source: '/schedule', destination: '/site/schedule' },
        { source: '/specials', destination: '/site/specials' },
        { source: '/training', destination: '/site/training' },
      ],
    };
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
