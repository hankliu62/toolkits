/** @type {import('tailwindcss').Config} */
module.exports = {
  corePlugins: {
    preflight: false,
  },
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "common-border": "#d9d9d9",
      },
      keyframes: {
        continue: {
          "16%": { content: '"."' },
          "33%": { content: '".."' },
          "50%": { content: '"..."' },
          "66%": { content: '"...."' },
          "83%": { content: '"....."' },
          "100%": { content: '"......"' },
        },
      },
      screens: {
        "3xl": "1920px",
      },
    },
  },
  plugins: [
    require("tailwindcss-textshadow"),
  ],
};
