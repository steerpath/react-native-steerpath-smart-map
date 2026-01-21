/**
 * Metro configuration for React Native
 * https://github.com/facebook/react-native
 *
 * @format
 */

const {getDefaultConfig, mergeConfig} = require('@react-native/metro-config');
const path = require('path');

// 1. Find the root of your library (one level up from the example app)
const libraryRoot = path.resolve(__dirname, '..');

/**
 * Metro configuration
 * https://reactnative.dev/docs/metro
 *
 * @type {import('metro-config').MetroConfig}
 */
const config = {
  // 2. Watch the library source code for changes
  watchFolders: [libraryRoot],
  
  resolver: {
    // 3. Prevent Metro from getting confused if both app and library have their own node_modules
    nodeModulesPaths: [
      path.resolve(__dirname, 'node_modules'),
      path.resolve(libraryRoot, 'node_modules'),
    ],
  },
  
  transformer: {
    getTransformOptions: async () => ({
      transform: {
        experimentalImportSupport: false,
        // Inline requires are usually handled by the default config now
        inlineRequires: true, 
      },
    }),
  },
};

module.exports = mergeConfig(getDefaultConfig(__dirname), config);