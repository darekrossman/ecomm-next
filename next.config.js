/** @type {import('next').NextConfig} */
const nextConfig = {
  // Configure Turbopack (default bundler in Next.js 16)
  // The React deduplication alias from webpack is no longer needed with
  // modern npm dependency resolution and Turbopack's built-in handling
  turbopack: {}
}

module.exports = nextConfig
