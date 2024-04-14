const jest = require("eslint-plugin-jest");
const jestDom = require("eslint-plugin-jest-dom");
const prettier = require("eslint-plugin-prettier");
const promise = require("eslint-plugin-promise");
const simpleImportSort = require("eslint-plugin-simple-import-sort");
const testingLibrary = require("eslint-plugin-testing-library");
const unicorn = require("eslint-plugin-unicorn");
const typescript = require("@typescript-eslint/eslint-plugin");
const jsxA11y = require("eslint-plugin-jsx-a11y");
const reactHooks = require("eslint-plugin-react-hooks");
// const next = require("eslint-config-next");
const importPlugin = require("eslint-plugin-import");

const typescriptParser = require("@typescript-eslint/parser");

module.exports = [
  {
    plugins: {
      jest,
      "jest-dom": jestDom,
      prettier,
      promise,
      "simple-import-sort": simpleImportSort,
      "testing-library": testingLibrary,
      unicorn,
      "@typescript-eslint": typescript,
      "jsx-a11y": jsxA11y,
      "react-hooks": reactHooks,
      // '@next/next': next,
      import: importPlugin,
    },
    languageOptions: {
      parser: typescriptParser,
    },
    // "extends": [
    //   "next/core-web-vitals",
    //   // "eslint:recommended",
    //   // Disables conflicting rules from eslint:recommended
    //   "plugin:@typescript-eslint/eslint-recommended",
    //   "plugin:@typescript-eslint/recommended",
    //   "plugin:import/typescript",
    //   "plugin:react/recommended",
    //   "plugin:react/jsx-runtime",
    //   "plugin:react-hooks/recommended",
    //   "plugin:unicorn/recommended",
    //   "plugin:promise/recommended",
    //   // "plugin:jest/recommended",
    //   // "plugin:jest-dom/recommended",
    //   "plugin:testing-library/react",
    //   "plugin:jsx-a11y/recommended",
    //   "plugin:@next/next/recommended",
    //   "prettier"
    // ],
    settings: {
      react: {
        pragma: "React",
        version: "detect",
      },
    },
    rules: {
      /**
       * eslint
       **/
      "no-case-declarations": "off",
      eqeqeq: "error",
      /**
       * @typescript-eslint
       **/
      "@typescript-eslint/explicit-module-boundary-types": "off",
      "@typescript-eslint/no-unused-vars": "warn",
      "@typescript-eslint/no-var-requires": "off",
      "@typescript-eslint/no-non-null-assertion": "off",
      "@typescript-eslint/no-empty-function": "off",
      /**
       * eslint-plugin-import
       **/
      "import/first": "error",
      "import/newline-after-import": "off",
      "import/no-duplicates": "error",
      /**
       * eslint-plugin-simple-import-sort
       **/
      "simple-import-sort/exports": "error",
      "simple-import-sort/imports": "error",
      /**
       * eslint-plugin-unicorn
       **/
      "unicorn/filename-case": "off",
      "unicorn/no-null": "off",
      "unicorn/no-useless-undefined": "off",
      "unicorn/prefer-module": "off",
      "unicorn/prevent-abbreviations": "off",
      "unicorn/consistent-function-scoping": "off",
      /**
       * eslint-plugin-promise
       **/
      "promise/always-return": "off",
      "promise/catch-or-return": ["error", { allowFinally: true }],
      /**
       * eslint-plugin-prettier
       **/
      "prettier/prettier": "warn",
      /**
       * eslint-plugin-next
       **/
      // "@next/next/no-html-link-for-pages": "error",
      // "@next/next/no-img-element": "off",
      /**
       * eslint-plugin-jest
       **/
      // "jest/no-done-callback": "off",
      /**
       * jsx-a11yeslint-plugin-jsx-a11y
       */
      // This rule clashes with nextjs Link component so we turn it off
      "jsx-a11y/anchor-is-valid": "off",
    },
    files: ["src/**/*.ts", "src/**/*.tsx", "src/**/*.js"],
    ignores: ["public/*", "out/*", "docs/*"],
  },
];
