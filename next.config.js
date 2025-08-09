const path = require('path');

/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    reactCompiler: true,
  },
  output: 'standalone',
  webpack: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      '@': path.resolve(__dirname, 'src'),
    };
    return config;
  },
  async rewrites() {
    return [
      {
        source: '/api/v1/:path*',
        destination: process.env.BACKEND_URL || 'http://localhost:3001/api/v1/:path*',
      },
      // Proxy backend API calls
      // {
      //   source: '/api/backend/:path*',
      //   destination: (process.env.BACKEND_URL || 'http://localhost:3001') + '/:path*',
      // },
    ];
  },
  async headers() {
    return [
      {
        source: '/api/v1/:path*',
        headers: [
          { key: 'Access-Control-Allow-Credentials', value: 'true' },
          { key: 'Access-Control-Allow-Origin', value: '*' },
          { key: 'Access-Control-Allow-Methods', value: 'GET,DELETE,PATCH,POST,PUT' },
          { key: 'Access-Control-Allow-Headers', value: 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, Authorization' },
        ],
      },
      // {
      //   source: '/api/backend/:path*',
      //   headers: [
      //     { key: 'Access-Control-Allow-Credentials', value: 'true' },
      //     { key: 'Access-Control-Allow-Origin', value: '*' },
      //     { key: 'Access-Control-Allow-Methods', value: 'GET,DELETE,PATCH,POST,PUT' },
      //     { key: 'Access-Control-Allow-Headers', value: 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, Authorization, X-User-Id' },
      //   ],
      // },
    ];
  },
};

module.exports = nextConfig;