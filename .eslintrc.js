module.exports = {
  env: {
    es2021: true,
    node: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: ['react', '@typescript-eslint'],
  rules: {
    semi: 1,
    '@typescript-eslint/no-explicit-any': 1,
    'no-console': 1,
    'no-use-before-define': 0,
    '@typescript-eslint/no-use-before-define': 0,
  },
};
