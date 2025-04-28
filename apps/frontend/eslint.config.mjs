import tseslint from "typescript-eslint";
import eslintPluginReact from "eslint-plugin-react";
import eslintPluginReactHooks from "eslint-plugin-react-hooks";
import eslintPluginNext from "@next/eslint-plugin-next";
import eslintPluginTailwindCSS from "eslint-plugin-tailwindcss";
import baselint from "../../eslint.config.mjs";

export default tseslint.config(
  {
    name: "pmlite/baselint",
    extends: [baselint],
  },

  {
    name: "pmlite/for-nextjs",
    files: ["apps/next-app/**/*.{ts,tsx,js,jsx}"],
    extends: [
      ...eslintPluginTailwindCSS.configs["flat/recommended"],
      eslintPluginReact.configs.flat.recommended,
      eslintPluginReact.configs.flat["jsx-runtime"],
    ],
    plugins: {
      react: eslintPluginReact,
      "react-hooks": eslintPluginReactHooks,
      "@next/next": eslintPluginNext,
      tailwindcss: eslintPluginTailwindCSS,
    },
    settings: {
      tailwindcss: {
        callees: ["cn"],
        config: "apps/next-app/tailwind.config.ts",
      },
      react: {
        version: "detect",
      },
      next: {
        rootDir: "./*",
      },
    },
    rules: {
      "no-restricted-imports": [
        "error",
        {
          paths: [
            {
              name: "next/link",
              importNames: ["default"],
              message:
                "Please use NextLink from '@/components/next-link' instead.",
            },
          ],
        },
      ],
      "react/prop-types": "off",
      ...eslintPluginReactHooks.configs.recommended.rules,
      "@next/next/no-img-element": "off",
      ...eslintPluginNext.configs.recommended.rules,
      ...eslintPluginNext.configs["core-web-vitals"].rules,
    },
  }
);
