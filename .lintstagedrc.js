const path = require("path");

const buildEslintCommand = (filenames) =>
  `next lint --fix --file ${filenames
    .map((f) => path.relative(process.cwd(), f))
    .join(" --file ")}`;

module.exports = {
  "**/*.{js,jsx,ts,tsx,md,html,css,scss,json}": ["prettier --write", "git add"],
  "**/*.{js,jsx,ts,tsx}": [buildEslintCommand, "git add"],
  "**/*.{css,scss}": ["stylelint"],
};
