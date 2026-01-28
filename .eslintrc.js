// .eslintrc.js
module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  plugins: [
    'react',
    '@typescript-eslint',
    'prettier',
    'jsx-a11y',
    'import',
    'react-hooks',
  ],
  extends: [
    'eslint:recommended',
    'airbnb',
    'plugin:react/recommended',
    'prettier',
  ],
  rules: {
    'react/react-in-jsx-scope': 'off',
    'import/prefer-default-export': 'off',
    'prettier/prettier': 'error',
    'react-hooks/exhaustive-deps': 'error',
    'no-unused-expressions': 'off',
    'no-undef': 'error',
    'prettier/prettier': 'error',
    'import/extensions': [
      'error',
      'ignorePackages',
      {
        ts: 'never',
        tsx: 'never',
        js: 'never',
        jsx: 'never',
      },
    ],
    'react/jsx-filename-extension': [1, { extensions: ['.jsx', '.tsx'] }],
    "@typescript-eslint/no-unused-vars": [
      "error",
      {
        "vars": "all",
        "args": "none",
        "argsIgnorePattern": "_",
        "varsIgnorePattern": "_"
      }
    ],
  },
  settings: {
    'import/resolver': {
      alias: {
        map: [['@', './']],
        extensions: ['.ts', '.tsx', '.js', '.jsx'],
      },
    },
    react: {
      version: 'detect',
    },
  },
};
