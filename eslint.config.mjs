import eslintConfigPrettier from "eslint-config-prettier";
import globals from "globals";
import pluginJs from "@eslint/js";
import pluginVue from "eslint-plugin-vue";

/** @type {import('eslint').Linter.Config[]} */
export default [
  {
    languageOptions: {
      globals: {
        ...globals.browser,
        lucide: "readonly",
        LZString: "readonly",
      },
    },
  },
  pluginJs.configs.all,
  ...pluginVue.configs["flat/recommended"],
  {
    rules: {
      "no-magic-numbers": "off",
      "sort-keys": "off",
      "no-warning-comments": "off",
      "no-ternary": "off",
      "one-var": "off",
      "max-statements": ["warn", 50],
      "max-params": ["warn", 5],
      "max-lines": "off",
      "no-eval": "off",
    },
  },
  eslintConfigPrettier,
];
