/** @type {import('tailwindcss').Config} */
module.exports = {
  presets: [require('@syntrac/frontend-web-theme/tailwind').preset],
  content: ['./src/**/*.{js,ts,jsx,tsx}', './node_modules/@syntrac/frontend-web-atoms/dist/**/*/*.{js,ts,jsx,tsx}'],
};
