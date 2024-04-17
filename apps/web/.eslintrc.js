// This is a workaround for https://github.com/eslint/eslint/issues/3458
require('@rushstack/eslint-config/patch/modern-module-resolution');

module.exports = {
  parserOptions: {
    tsconfigRootDir: __dirname,
  },
  extends: [
    './node_modules/@syntrac/rig-eslint-config/configs/react.js',
    'plugin:@next/next/recommended',
  ],
  rules: {
    'react/react-in-jsx-scope': 'off',
  },
};
