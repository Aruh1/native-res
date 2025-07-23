import plugin from "@tailwindcss/typography";

/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
        appDir: true
    },
    plugins: [
        plugin(require('@tailwindcss/typography'))
    ],
};

export default nextConfig;
