module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
    'next',
    'next/core-web-vitals',
  ],
  plugins: [
    'react',
    '@typescript-eslint',
  ],
  rules: {

  },
  settings: {
    react: {
      version: 'detect',
    },
  },
};
