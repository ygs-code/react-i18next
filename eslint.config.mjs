import { defineConfig, globalIgnores } from 'eslint/config';
import react from 'eslint-plugin-react';
import jsxA11Y from 'eslint-plugin-jsx-a11y';
import _import from 'eslint-plugin-import';
import babel from '@babel/eslint-plugin';
import typescriptEslint from '@typescript-eslint/eslint-plugin';
import { fixupPluginRules } from '@eslint/compat';
import globals from 'globals';
import tsParser from '@typescript-eslint/parser';
import jsParser from '@babel/eslint-parser';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import js from '@eslint/js';
import { FlatCompat } from '@eslint/eslintrc';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all,
});

export default defineConfig([
  globalIgnores(['**/dist/**/*', '**/node_modules/**/*']),
  {
    extends: compat.extends(
      'eslint:recommended',
      'plugin:react/recommended',
      'plugin:@typescript-eslint/eslint-recommended',
      'plugin:@typescript-eslint/recommended',
    ),

    plugins: {
      react,
      'jsx-a11y': jsxA11Y,
      import: fixupPluginRules(_import),
      '@babel': babel,
      '@typescript-eslint': typescriptEslint,
    },

    languageOptions: {
      globals: {
        ...globals.node,
        ...globals.commonjs,
        ...globals.amd,
        ...globals.mocha,
        ...globals.browser,
      },

      // ts 编译检查
      parser: tsParser,
      // js 编译检查
      // parser: jsParser,

      ecmaVersion: 2020,
      sourceType: 'module',

      parserOptions: {
        requireConfigFile: false,

        ecmaFeatures: {
          jsx: true,
          modules: true,
          experimentalObjectRestSpread: true,
        },
      },
    },

    settings: {
      react: {
        pragma: 'React',
        // version: '15.6.1',
        "version": "detect", // React版本自动检测
      },
    },

    rules: {
      "no-debugger":'warn',
      '@typescript-eslint/no-unused-vars': 'off',
      'react/prop-types': 'off',
      'no-prototype-builtins': 0,
      'comma-dangle': 0,
      'react/jsx-uses-vars': 1,
      'react/display-name': 0,
      'no-unused-vars': 'warn',
      '@typescript-eslint/no-unused-vars': 'warn',
      'no-console': 'warn',
      'no-unexpected-multiline': 'warn',
      eqeqeq: ['warn', 'always'],
      'no-undef': 'error',
      '@babel/new-cap': 'error',
      '@babel/no-invalid-this': 'error',
      '@babel/no-unused-expressions': 'error',
      '@babel/object-curly-spacing': 'off',
      '@babel/semi': 'error',
    },
  },
]);
