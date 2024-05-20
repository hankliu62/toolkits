// module.exports = {
//   trailingComma: "es5",
//   tabWidth: 2,
//   semi: true,
//   singleQuote: false,
//   plugins: ["prettier-plugin-tailwindcss"],
//   tailwindConfig: "./tailwind.config.js",
// };

const fabric = require('@hankliu/fabric');

module.exports = {
  ...fabric.prettier,
  plugins: ["prettier-plugin-tailwindcss"],
  tailwindConfig: "./tailwind.config.js",
};
