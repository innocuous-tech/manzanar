const withSvgr = require('@newhighsco/next-plugin-svgr');

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  excludeDefaultMomentLocales: true,
  poweredByHeader: false,
  experimental: {
    appDir: true,
    legacyBrowsers: false,
  },
};

module.exports = withSvgr(nextConfig);
