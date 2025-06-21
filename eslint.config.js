// eslint.config.js
import { defineConfig } from 'eslint/config'
import js from '@eslint/js'
import globals from 'globals'
import react from 'eslint-plugin-react'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import tsEslint from 'typescript-eslint'
import prettierRecommended from 'eslint-plugin-prettier/recommended'
import eslintConfigPrettier from 'eslint-config-prettier'
import jsxA11y from 'eslint-plugin-jsx-a11y'
import unicorn from 'eslint-plugin-unicorn'
import importPlugin from 'eslint-plugin-import'
import sonarjs from 'eslint-plugin-sonarjs'
import promise from 'eslint-plugin-promise'
import { FlatCompat } from '@eslint/eslintrc'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all,
})

/** @type {import("eslint").FlatConfig[]} */
export default defineConfig([
  ...compat.extends('@react-native'),
  // 🌱 Global ignores
  { ignores: ['dist/**', 'scripts/**', './eslint.config.js'] },

  // ESLint & TypeScript core recommendations
  js.configs.recommended,

  // Plugins
  ...tsEslint.configs.recommended,
  reactRefresh.configs.recommended,
  unicorn.configs.recommended,
  sonarjs.configs.recommended,
  promise.configs['flat/recommended'],

  // Style/formatting
  eslintConfigPrettier,
  prettierRecommended,

  // Import plugin (TS only)
  {
    files: ['**/*.{ts,tsx}'],
    extends: [importPlugin.flatConfigs.typescript],
  },

  // React Native compat for TS/TSX

  // Project-specific overrides for TS/TSX
  {
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      sourceType: 'module',
      globals: globals.browser,
      parserOptions: { jsx: true, project: 'tsconfig.json' },
    },
    plugins: { react, 'jsx-a11y': jsxA11y },
    rules: {
      ...reactHooks.configs.recommended.rules,
      'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
      'prettier/prettier': 'warn',
      'unicorn/prevent-abbreviations': 'off',
      'unicorn/filename-case': 'off',
      'unicorn/prefer-logical-operator-over-ternary': 'off',
      'unicorn/prefer-module': 'off',
      'unicorn/no-null': 'off',
      'sonarjs/no-unused-vars': 'off',
      'sonarjs/prefer-read-only-props': 'off',
      '@typescript-eslint/no-require-imports': 'off',
    },
    settings: { react: { version: 'detect' } },
  },
])
