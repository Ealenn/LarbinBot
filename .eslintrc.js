module.exports = {
  "env": {
    "es2021": true,
    "node": true
  },
  "extends": [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended"
  ],
  "parser": "@typescript-eslint/parser",
  "parserOptions": {
    "ecmaVersion": 12
  },
  "plugins": [
    "@typescript-eslint"
  ],
  "rules": {
    "indent": ["error", 2],
    "no-console": "error",
    "no-inline-comments": "warn",
    "quotes": ["error", "single"]
  },
  "ignorePatterns": ["**/*.js", "**/tests/*", "**/dist/*"]
};
