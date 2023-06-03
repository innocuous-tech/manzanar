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
  async headers() {
    return [
      {
        source: '/api/initInworld',
        headers: [
          {
            key: 'Cache-Control',
            value: 'max-age=240, stale-while-revalidate=60',
          },
        ],
      },
    ];
  },

};

module.exports = withSvgr(nextConfig);
