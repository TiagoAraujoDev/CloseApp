/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {},
  images: {
    domains: ['www.themoviedb.org', 'image.tmdb.org', 'www.gravatar.com'],
    unoptimized: true,
  },
}

module.exports = nextConfig
