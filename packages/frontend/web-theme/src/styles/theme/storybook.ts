import lightTheme from '@syntrac/frontend-shared-theme/configs/lightTheme.json';
import baseTheme from '@syntrac/frontend-shared-theme/configs/baseTheme.json';

export const storybookTheme = {
  base: 'light',
  brandTitle: 'syntrac',
  brandUrl: 'https://syntrac.io',
  brandImage: 'https://static-images-syntrac.s3-ap-southeast-2.amazonaws.com/full_logo_black.png',
  // UI
  appBg: lightTheme.colors.background.shade,
  appContentBg: lightTheme.colors.background.default,
  appBorderColor: lightTheme.colors.mono.light,
  //Text color
  textColor: lightTheme.colors.mono.dark,
  textInverseColor: lightTheme.colors.mono.xxxlight,
  // Typography
  fontBase: `"${baseTheme.fonts.family.main}", "Open Sans", sans-serif`,
  fontCode: 'monospace',
  // Form colors
  inputBg: lightTheme.colors.background.default,
  inputBorder: lightTheme.colors.mono.xxlight,
  inputTextColor: lightTheme.colors.mono.light,
  inputBorderRadius: 4,
};
