/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enable React Strict Mode for better development experience
  reactStrictMode: true,

  // Transpile specific packages that may need it
  transpilePackages: ['@64labs/ui', '@64labs/ess', '@64labs/hooks'],

  // Configure compiler options for Emotion CSS-in-JS
  compiler: {
    emotion: true,
  },

  // Webpack configuration
  webpack: (config, { isServer }) => {
    // Add any necessary webpack customizations here
    return config
  },
}

module.exports = nextConfig
