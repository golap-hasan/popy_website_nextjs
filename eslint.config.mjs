import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";
import globals from "globals";
import js from "@eslint/js";
import importPlugin from "eslint-plugin-import";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  js.configs.recommended,
  ...compat.extends("next/core-web-vitals"),
  ...compat.extends("next/typescript"),
  // {
  //   files: ["**/*.js", "**/*.jsx"],
  //   plugins: {
  //     import: importPlugin,
  //   },
  //   rules: {
  //     "no-unused-vars": ["error", { args: "after-used", ignoreRestSiblings: true }],
  //     "no-undef": "error",
  //     // "import/no-unresolved": ["error", { commonjs: true, amd: true }],
  //     "import/named": "error",
  //     "import/default": "error",
  //     "import/namespace": "error",
  //     "import/no-duplicates": "error",
  //     "no-unreachable": "error",
  //     // "no-console": "warn",
  //     "no-debugger": "error",
  //     "no-extra-semi": "error",
  //     "no-var": "error",
  //     "object-shorthand": "warn",
  //     "prefer-arrow-callback": "warn",
  //   },
  //   languageOptions: {
  //     globals: {
  //       ...globals.node,
  //     },
  //     parserOptions: {
  //       ecmaVersion: 2021,
  //       sourceType: "module",
  //       ecmaFeatures: {
  //         jsx: true,
  //       },
  //     },
  //   },
  //   settings: {
  //     react: {
  //       version: "detect",
  //     },
  //     "import/resolver": {
  //       node: {
  //         extensions: [".js", ".jsx"],
  //       },
  //     },
  //   },
  // },
  {
    files: ["**/*.ts", "**/*.tsx"],
    plugins: {
      import: importPlugin,
    },
    rules: {
      "no-unused-vars": ["error", { args: "after-used", ignoreRestSiblings: true }],
      "no-undef": "error",
      // "import/no-unresolved": ["error", { commonjs: true, amd: true }],
      "import/named": "error",
      "import/default": "error",
      "import/namespace": "error",
      "import/no-duplicates": "error",
      "no-unreachable": "error",
      // "no-console": "warn",
      "no-debugger": "error",
      "no-extra-semi": "error",
      "no-var": "error",
      "object-shorthand": "warn",
      "prefer-arrow-callback": "warn",
    },
    languageOptions: {
      globals: {
        ...globals.node,
        ...globals.browser,
      },
      parserOptions: {
        ecmaVersion: 2021,
        sourceType: "module",
        ecmaFeatures: { jsx: true },
        // Enable type-aware linting if a tsconfig is present
        project: true,
      },
    },
    settings: {
      react: { version: "detect" },
      "import/resolver": {
        node: { extensions: [".ts", ".tsx", ".d.ts", ".js", ".jsx"] },
      },
    },
  },
];

export default eslintConfig;

