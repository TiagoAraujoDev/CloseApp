/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  images: {
    domains: ["www.themoviedb.org", "image.tmdb.org"],
  },
};

module.exports = nextConfig;
