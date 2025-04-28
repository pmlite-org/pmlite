import globals from "globals";
import eslint from "@eslint/js";
import tseslint from "typescript-eslint";
import eslintConfigPrettier from "eslint-config-prettier";
import * as eslintPluginImport from "eslint-plugin-import";
import eslintPluginUnusedImports from "eslint-plugin-unused-imports";
import eslintPluginOnlyWarn from "eslint-plugin-only-warn";

export default tseslint.config(
  {
    name: "pmlite/ignore-globally",
    ignores: [
      "**/node_modules",
      "**/dist",
      "**/.next",
      "**/migration",
    ],
  },
  {
    name: "pmlite/load-plugins",
    languageOptions: {
      sourceType: "module",
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
    plugins: {
      import: eslintPluginImport,
      "unused-imports": eslintPluginUnusedImports,
      "only-warn": eslintPluginOnlyWarn,
    },
  },

  {
    name: "pmlite/global-tuning",
    extends: [eslint.configs.recommended],
    rules: {
      "import/order": "error",
    },
  },
  {
    name: "pmlite/for-typescript",
    files: ["**/*.ts", "**/*.tsx"],
    extends: [tseslint.configs.strict],
    rules: {
      "@typescript-eslint/no-unused-vars": [
        "error",
        {
          vars: "all",
          varsIgnorePattern: "^_",
          args: "after-used",
          argsIgnorePattern: "^_",
        },
      ],
      "@typescript-eslint/no-namespace": "off",
      "@typescript-eslint/no-extraneous-class": "off",
    },
  },

  {
    name: "eslint-config-prettier",
    ...eslintConfigPrettier,
  }
);
