import { fixupConfigRules, fixupPluginRules } from "@eslint/compat";
import unicorn from "eslint-plugin-unicorn";
import security from "eslint-plugin-security";
import globals from "globals";
import path from "node:path";
import { fileURLToPath } from "node:url";
import js from "@eslint/js";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
    baseDirectory: __dirname,
    recommendedConfig: js.configs.recommended,
    allConfig: js.configs.all
});

export default [...fixupConfigRules(compat.extends(
    "eslint:recommended",
    "plugin:node/recommended",
    "plugin:security/recommended",
    "plugin:import/recommended",
    "plugin:unicorn/recommended",
    "plugin:promise/recommended",
    "prettier",
)), {
    plugins: {
        unicorn: fixupPluginRules(unicorn),
        security: fixupPluginRules(security),
    },

    languageOptions: {
        globals: {
            ...globals.browser,
            ...globals.node,
        },

        ecmaVersion: 2022,
        sourceType: "module",
    },

    rules: {
        "no-restricted-syntax": ["error", "ForInStatement"],

        "no-unused-vars": ["error", {
            argsIgnorePattern: "^_",
        }],
    },
}];