const lodashTransformer = require('esbuild-plugin-lodash');
const {
  NodeModulesPolyfillPlugin,
} = require('@esbuild-plugins/node-modules-polyfill');

module.exports = ({
  entry,
  outfile,
  outdir,
  debug,
  external,
  edge,
  plugins,
} = {}) => {
  return {
    entryPoints: [entry],
    outfile,
    outdir,
    conditions: edge ? ['worker', 'browser'] : [],
    bundle: true,
    sourcemap: true,
    minify: !debug,
    target: 'es2020',
    format: 'esm',
    keepNames: true,
    legalComments: 'none',
    treeShaking: true,
    logLevel: 'error',
    external,
    ...(edge ? {} : { platform: 'node' }),
    plugins: [
      ...(edge ? [NodeModulesPolyfillPlugin()] : []),
      lodashTransformer(),
      ...(plugins || []),
    ],
  };
};
