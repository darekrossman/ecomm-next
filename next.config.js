/** @type {import('next').NextConfig} */
const nextConfig = {
  // Configure Turbopack (default bundler in Next.js 16)
  turbopack: {
    resolveAlias: {
      // Emotion v10 to v11 compatibility aliases
      // @emotion/core was renamed to @emotion/react in v11
      '@emotion/core': '@emotion/react',
      // emotion-theming was merged into @emotion/react in v11
      'emotion-theming': '@emotion/react'
    }
  }
}

module.exports = nextConfig
