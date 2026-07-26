/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  i18n: {
    locales: ['zh', 'en', 'ja', 'ru'],
    defaultLocale: 'zh',
    localeDetection: true,
  },
  images: {
    remotePatterns: [
      { hostname: 'localhost' },
      { hostname: '*.githubusercontent.com' },
      { hostname: '*.cloudinary.com' },
    ],
  },
  env: {
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001',
  },
};

module.exports = nextConfig;
