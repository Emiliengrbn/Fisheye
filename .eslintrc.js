module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: "standard",
  overrides: [
    {
      env: {
        node: true,
      },
      files: [".eslintrc.{js,cjs}"],
      parserOptions: {
        sourceType: "script",
      },
    },
  ],
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
  },
  rules: {
    semi: ["warn", "always"],
    quotes: ["warn", "double"],
    "comma-dangle": ["error", "only-multiline"],
    "space-before-function-paren": ["off", "never"],
  },
};
