import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    rules: {
      "no-var": "off",
      "@typescript-eslint/no-unused-vars": [
        "warn", // O "error" si prefieres advertencias
        {
          argsIgnorePattern: "^_", // Permite variables que comienzan con "_"
          varsIgnorePattern: "^_", // Permite variables que comienzan con "_"
        },
      ],
      "@typescript-eslint/ban-types": [
        "warn",
        {
          types: {
            "{}": false, // Permite usar "{}" o context sin tipo explícito
          },
          extendDefaults: true,
        },
      ],
    },
  },
];

export default eslintConfig;
