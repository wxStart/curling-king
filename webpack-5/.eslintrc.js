module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
  },
  extends: ["eslint:recommended" /*"plugin:prettier/recommended"*/],
  parser: "@babel/eslint-parser",
  rules: {
    "no-var": 2,
    "no-console": "off",
    "no-debugger": "off",
  },
  parserOptions: {
    ecmaVersion: 6,
    sourceType: "module",
  },
};
