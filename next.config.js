/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    env: {
        LOCAL_MODE: process.env.LOCAL_MODE,
    },
};

module.exports = nextConfig;
