const lodashTransformer = require('esbuild-plugin-lodash');

module.exports = ({ entry, out, debug, external, exclude } = {}) => {
  return {
    entryPoints: [entry],
    outfile: out,
    outputFileExtension: '.js',
    bundle: true,
    sourcemap: true,
    write: false,
    minify: !debug,
    target: 'esnext',
    format: 'esm',
    keepNames: true,
    legalComments: 'none',
    treeShaking: true,
    logLevel: 'error',
    external,
    exclude,
    splitting: true,
    conditions: ['import', 'default', 'require'],
    mainFields: ['module', 'main'],
    plugins: [lodashTransformer()],
  };
};
