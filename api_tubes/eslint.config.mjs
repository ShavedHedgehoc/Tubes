// // @ts-check
// import eslint from "@eslint/js";
// import eslintPluginPrettierRecommended from "eslint-plugin-prettier/recommended";
// import globals from "globals";
// import tseslint from "typescript-eslint";

// export default tseslint.config(
//   {
//     ignores: ["eslint.config.mjs"],
//   },
//   eslint.configs.recommended,
//   ...tseslint.configs.recommendedTypeChecked,
//   eslintPluginPrettierRecommended,
//   {
//     languageOptions: {
//       globals: {
//         ...globals.node,
//         ...globals.jest,
//       },
//       ecmaVersion: 5,
//       sourceType: "module",
//       parserOptions: {
//         projectService: true,
//         tsconfigRootDir: import.meta.dirname,
//       },
//     },
//   },
//   {
//     rules: {
//       "@typescript-eslint/no-deprecated": "off",
//       "@typescript-eslint/no-explicit-any": "off",
//       "@typescript-eslint/no-floating-promises": "warn",
//       "@typescript-eslint/no-unsafe-argument": "warn",
//     },
//   }
// );
module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: 'tsconfig.json',
    tsconfigRootDir: __dirname,
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint/eslint-plugin'],
  extends: [
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended', // Интеграция с Prettier
  ],
  root: true,
  env: {
    node: true,
    jest: true,
  },
  ignorePatterns: ['.eslintrc.js'],
  rules: {
    // Настройки под NestJS
    '@typescript-eslint/interface-name-prefix': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off', // Можно включить для строгой типизации API
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-explicit-any': 'warn', // Вместо ошибки лучше ставить warning на время разработки

    // Полезные дополнения
    'no-console': 'warn', // Чтобы не забывать console.log в коде
    '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }], // Игнорировать переменные с подчеркиванием
  },
};
