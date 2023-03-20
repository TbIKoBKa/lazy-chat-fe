/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    WEBSOCKET_URL: process.env.WEBSOCKET_URL,
  },
};

module.exports = nextConfig;
