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
      "@typescript-eslint/no-explicit-any": "off", // Si tienes un tipo `any`
      "@typescript-eslint/ban-types": "off", // Si estás usando un tipo no permitido
      "@typescript-eslint/no-inferrable-types": "off", // Para deshabilitar tipos inferribles
      "@typescript-eslint/no-unused-vars": "off", // Para deshabilitar advertencias de variable
      "no-var": "off",
      "@typescript-eslint/no-unused-vars": [
        "warn", // O "error" si prefieres advertencias
        {
          argsIgnorePattern: "^_", // Permite variables que comienzan con "_"
          varsIgnorePattern: "^_", // Permite variables que comienzan con "_"
        },
      ],
    },
  },
];

export default eslintConfig;
