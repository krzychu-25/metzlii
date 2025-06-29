// next.config.js
const path = require('path');

/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack(config) {
    config.resolve.alias['@'] = path.resolve(__dirname);
    return config;
  },
  reactStrictMode: true,
};

module.exports = nextConfig;
