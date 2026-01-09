const path = require('path')

module.exports = {
  // Turbopack config with aliases for emotion compatibility
  turbopack: {
    resolveAlias: {
      '@emotion/core': '@emotion/react',
      'emotion-theming': '@emotion/react',
    },
  },
  // Keep webpack config for fallback compatibility
  webpack: (config, { buildId, dev, isServer, defaultLoaders }) => {
    config.resolve = Object.assign({}, config.resolve, {
      alias: Object.assign({}, config.resolve.alias, {
        react: path.resolve(path.join(__dirname, './node_modules/react')),
        '@emotion/core': '@emotion/react',
        'emotion-theming': '@emotion/react',
      })
    })

    return config
  }
}
