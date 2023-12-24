/** @type {import('next').NextConfig} */
const dotenv = require("dotenv");
dotenv.config();

const nextConfig = {};

module.exports = {
    env: {
        ALCHEMY_API_KEY: process.env.ALCHEMY_API_KEY,
    },
    ...nextConfig,
};
