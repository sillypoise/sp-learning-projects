/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    swcMinify: true,
    images: {
        domains: ["source.unsplash.com", "unsplash.com"],
        formats: ["image/avif", "image/webp"],
    },
    experimental: { images: { layoutRaw: true } },
};

module.exports = nextConfig;
