import { FlatCompat } from "@eslint/eslintrc";
import pluginPrettier from "eslint-plugin-prettier";
import { dirname } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript", "prettier"),
  {
    plugins: {
      prettier: pluginPrettier,
    },
    rules: {
      "prettier/prettier": [
        "error",
        {
          bracketSameLine: false, 
          printWidth: 100, 
          jsxSingleQuote: false, 
          trailingComma: "es5",
        },
      ],
      "react/jsx-indent": ["error", 2],
      "react/jsx-tag-spacing": ["error", { beforeSelfClosing: "always" }],
    },
  },
];

export default eslintConfig;
