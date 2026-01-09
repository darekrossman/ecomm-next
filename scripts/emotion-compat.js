#!/usr/bin/env node
/**
 * Emotion v10 to v11 Compatibility Shims
 * 
 * This script creates shim modules for legacy Emotion packages that have been
 * renamed/merged in v11. Required for compatibility with third-party packages
 * that still depend on the old package names.
 * 
 * - @emotion/core -> @emotion/react (renamed in v11)
 * - emotion-theming -> @emotion/react (merged in v11)
 */

const fs = require('fs');
const path = require('path');

const nodeModules = path.join(__dirname, '..', 'node_modules');

// Create @emotion/core shim
const emotionCorePath = path.join(nodeModules, '@emotion', 'core');
if (!fs.existsSync(emotionCorePath)) {
  fs.mkdirSync(emotionCorePath, { recursive: true });
}

fs.writeFileSync(
  path.join(emotionCorePath, 'package.json'),
  JSON.stringify({
    name: '@emotion/core',
    version: '11.0.0',
    description: 'Compatibility shim - @emotion/core was renamed to @emotion/react in v11',
    main: 'index.js'
  }, null, 2)
);

fs.writeFileSync(
  path.join(emotionCorePath, 'index.js'),
  `// Compatibility shim: @emotion/core was renamed to @emotion/react in v11
// Re-export everything from @emotion/react for backwards compatibility
module.exports = require('@emotion/react');
`
);

// Create emotion-theming shim
const emotionThemingPath = path.join(nodeModules, 'emotion-theming');
if (!fs.existsSync(emotionThemingPath)) {
  fs.mkdirSync(emotionThemingPath, { recursive: true });
}

fs.writeFileSync(
  path.join(emotionThemingPath, 'package.json'),
  JSON.stringify({
    name: 'emotion-theming',
    version: '11.0.0',
    description: 'Compatibility shim - emotion-theming was merged into @emotion/react in v11',
    main: 'index.js'
  }, null, 2)
);

fs.writeFileSync(
  path.join(emotionThemingPath, 'index.js'),
  `// Compatibility shim: emotion-theming was merged into @emotion/react in v11
// Re-export ThemeProvider and other theming utilities from @emotion/react
module.exports = require('@emotion/react');
`
);

console.log('✓ Emotion v10->v11 compatibility shims created');
